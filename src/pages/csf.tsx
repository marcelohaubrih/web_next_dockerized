import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  _id: string;
  title: string;
}

const Csf: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  const token = process.env.userToken;
  useEffect(() => {
    fetch('https://servelx-api.duckdns.org:3001/api/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
        console.log(data);
      })
  });
  }, []);

  return (
    <Container>
      <Head>
        <title>C.S.F - Client Side Fetching</title>
      </Head>
       <div>
         <h1>C.S.F - Client Side Fetching - Real-time</h1>
         <p>Página utilizando o sistema de CSF só se utiliza quando os dados tem que ser renderizados ao cliente de forma real-time</p>
         <h4><b>OBS:</b> esses dados geram uma requisição a cada vez que se é mostrado a pagina. nenhum desses dados são capturados pelos robots dos indexadores (GOOGLE, etc)</h4>
         <section>
           <h1>Products</h1>
           <ul>
             {recommendedProducts.map(recommendedProduct => {
               return (
                 <li key={recommendedProduct._id}>
                   {recommendedProduct.title}
                 </li>
               )
             })

             }
           </ul>
         </section>
         <p><a href="/">"/" - Página principal</a></p>
       </div>
    </Container>
  )
}

export default Csf
