import { GetStaticProps } from 'next'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  _id: string;
  title: string;
}

interface ssgProps {
  products: IProduct[];
}

export default function ssg({ products }: ssgProps) {
  return (
    <Container>
      <Head>
        <title>S.S.G - Static Site Generation</title>
      </Head>
      {/* <img src={logo} alt=""/>
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by ServeLX.</p>
       */}
       <div>
         <h1>S.S.G - Static Site Generation</h1>
         <p>Página utilizando o sistema de SSG só se utiliza quando os dados tem que ser indexados pelos motores de busca e seus dados não necessitam de atualização real-time</p>
         <h4><b>OBS:</b>Dessa forma a pagina é gerada em html a cada tempo predefinido em código isso redux o tempo de atualização dos dados e a carga do Servidor de API. Todos esses dados são capturados pelos robots dos indexadores (GOOGLE, etc)</h4>
         <section>
           <h1>Products</h1>
           <ul>
             {products.map(descProduct => {
               return (
                 <li key={descProduct._id}>
                   {descProduct.title}
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

export const getStaticProps: GetStaticProps<ssgProps> = async (context) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGUxYjI1NWE3Njg0MDAxY2RmOTMwNyIsImVtYWlsIjoibWFyY2Vsb2hhdWJyaWhAZ21haWwuY29tIiwiaWF0IjoxNjExNzg2OTUxLCJleHAiOjE2MTE4NzMzNTF9.bYUb4G9u0okyGKlY8JZ4nDB9zp4kn4n_s9TzEZ8xASs';
  const response = await fetch('http://servelx-api.duckdns.org:3001/api/products', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Host': 'servelx-api.duckdns.org'
    }
  });
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 15,
  }
}
