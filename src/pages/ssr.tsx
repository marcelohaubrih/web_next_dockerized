import { GetServerSideProps } from 'next'
import Head from 'next/head'

import logo from '../assets/logo.png'
import { Container } from '../styles/pages/Home'

interface IProduct {
  _id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Ssr({ recommendedProducts }: HomeProps) {
  return (
    <Container>
      <Head>
        <title>S.S.R - Server Side Rendering</title>
      </Head>
      {/* <img src={logo} alt=""/>
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by ServeLX.</p>
       */}
       <div>
         <h1>S.S.R - Server Side Rendering</h1>
         <p>Página utilizando o sistema de SSR só se utiliza quando os dados tem que ser indexados pelos motores de busca e seus dados não necessitam de atualização real-time</p>
         <p>Dessa forma a pagina é gerada em html somente depois de carregar todos os dados até os dados de API, isso da um atraso para o cliente de acordo com o servidor de API</p>
         <h4><b>OBS:</b> esses dados geram uma requisição a cada vez que se é realizado o build da aplicação e enviado ao servidor. todos esses dados são capturados pelos robots dos indexadores (GOOGLE, etc)</h4>
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
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
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}