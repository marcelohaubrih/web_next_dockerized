import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  _id: string;
  title: string;
}

const Home: React.FC = () => {
  const token = process.env.userToken;
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

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
        <title>Homepage</title>
      </Head>
       <div>
         <section>
           <h1>Rotas</h1>
           <p><a href="/">"/" - Página principal</a></p>
           <p><a href="/csf">"/csf" - Página C.S.F - Client Side Fetching</a></p>
           <p><a href="/ssr">"/ssr" - Página S.S.R - Server Side Rendering</a></p>
           <p><a href="/ssg">"/ssg" - Página S.S.G - Static Site Generation</a></p>
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
       </div>
    </Container>
  )
}

export default Home
