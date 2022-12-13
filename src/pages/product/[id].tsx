import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import { GetStaticProps, GetServerSideProps, GetStaticPaths } from 'next'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import axios from 'axios'
import { useState } from 'react'
import Head from 'next/head'
interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({
  product: { name, imageUrl, price, description, defaultPriceId },
}: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const router = useRouter()
  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: defaultPriceId,
      })
      const { checkoutUrl } = response.data
      // url Internas
      // router.push('/checkout')

      // url Externas
      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }
  return (
    <>
      <Head>
        <title>{name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} width={520} height={480} alt=""></Image>
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{price}</span>

          <p>{description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyButton}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_MxvdhAPFivvmUd' },
      },
    ],
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  // export const getServerSideProps: GetServerSideProps<
  //   any,
  //   { id: string }
  // > = async ({ params }) => {
  const productId: any = (params as ParsedUrlQuery).id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        defaultPriceId: price.id,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount as number) / 100),
      },
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  }
}
