import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Container } from '../../../styles/pages/Home'

interface IProduct {
  _id: string;
  title: string;
  description: string;
  url: string;
}

interface listProps {
  products: IProduct[];
}

export default function List({ products }: listProps) {
  return (
    <Container>
      <Head>
        <title>S.S.G - Static Site Generation</title>
      </Head>
       <div>
         <section>
           <h1>Products</h1>
           <ul>
             {products.map(descProduct => {
               return (
                 <li key={descProduct._id}>
                   <a href={`/catalog/product/${descProduct._id}`}>{descProduct.title}</a>
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

export const getStaticProps: GetStaticProps<listProps> = async (context) => {
  const token = process.env.userToken;
  const response = await fetch('https://servelx-api.duckdns.org:3001/api/products', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
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
