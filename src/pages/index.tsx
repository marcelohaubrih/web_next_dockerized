import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  _id: string;
  title: string;
}

const Home: React.FC = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGUxYjI1NWE3Njg0MDAxY2RmOTMwNyIsImVtYWlsIjoibWFyY2Vsb2hhdWJyaWhAZ21haWwuY29tIiwiaWF0IjoxNjExNzg2OTUxLCJleHAiOjE2MTE4NzMzNTF9.bYUb4G9u0okyGKlY8JZ4nDB9zp4kn4n_s9TzEZ8xASs';

  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

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
    }).then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
        console.log(data);
      })
  });
  }, []);

  // useEffect(() => {
  //     fetch('http://servelx-api.duckdns.org:3001/api/products', {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + token,
  //           'Host': 'servelx-api.duckdns.org'
  //         }
  //       })
  // }, []);

  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
       <div>
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
       </div>
    </Container>
  )
}

export default Home
