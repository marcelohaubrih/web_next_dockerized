import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

const Client_side_fetch: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      })
    });
  }, []);

  return (
    <Container>
      <Head>
        <title>C.S.F - Client Side Fetching</title>
      </Head>
      {/* <img src={logo} alt=""/>
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by ServeLX.</p>
       */}
       <div>
         <h1>C.S.F - Client Side Fetching</h1>
         <p>Página utilizando o sistema de CSF só se utiliza quando os dados tem que ser renderizados ao cliente de forma real-time</p>
         <h4><b>OBS:</b> esses dados geram uma requisição a cada vez que se é mostrado a pagina. nenhum desses dados são capturados pelos robots dos indexadores (GOOGLE, etc)</h4>
         <section>
           <h1>Products</h1>
           <ul>
             {recommendedProducts.map(recommendedProduct => {
               return (
                 <li key={recommendedProduct.id}>
                   {recommendedProduct.title}
                 </li>
               )
             })

             }
           </ul>
         </section>
       </div>
    </Container>
  )
}

export default Client_side_fetch
