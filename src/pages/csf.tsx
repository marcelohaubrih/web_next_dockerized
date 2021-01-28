import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

const Csf: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGUxYjI1NWE3Njg0MDAxY2RmOTMwNyIsImVtYWlsIjoibWFyY2Vsb2hhdWJyaWhAZ21haWwuY29tIiwiaWF0IjoxNjExNzg2OTUxLCJleHAiOjE2MTE4NzMzNTF9.bYUb4G9u0okyGKlY8JZ4nDB9zp4kn4n_s9TzEZ8xASs';
  useEffect(() => {
    fetch('http://servelx-api.duckdns.org:3001/api/products', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': 'servelx-api.duckdns.org'
      }
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

export default Csf
