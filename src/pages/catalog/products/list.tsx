import SEO from '@/components/SEO'
import { GetStaticProps } from 'next'
import Link from 'next/link'
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
      <SEO title="S.S.G - Static Site Generation"/>
       <div>
         <section>
           <h1>Products</h1>
           <ul>
             {products.map(descProduct => {
               return (
                 <li key={descProduct._id}>
                   <Link href={`/catalog/product/${descProduct._id}`}><a>{descProduct.title}</a></Link>
                 </li>
               )
             })

             }
           </ul>
         </section>
         <p><Link href="/"><a>"/" - Página principal</a></Link></p>
       </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<listProps> = async (context) => {
  const token = process.env.NEXT_PUBLIC_userToken;
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
