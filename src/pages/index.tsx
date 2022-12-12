import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from '../styles/pages/home'
import shirt1 from '../assets/shirt_1.png'
import shirt2 from '../assets/shirt_2.png'
import shirt3 from '../assets/shirt_3.png'
import shirt4 from '../assets/shirt_4.png'

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({ slides: { perView: 3, spacing: 48 } })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt2} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt3} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta Z</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={shirt4} alt="" width={520} height={480} />
        <footer>
          <strong>Camiseta A</strong>
          <span>R$ 79.90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
