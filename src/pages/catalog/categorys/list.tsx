import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Container } from '../../../styles/pages/Home'

interface ICategory {
  _id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
}

interface listProps {
  categorys: ICategory[];
}

export default function List({ categorys }: listProps) {
  return (
    <Container>
      <Head>
        <title>S.S.G - Static Site Generation</title>
      </Head>
       <div>
         <section>
           <h1>Categorys</h1>
           <ul>
             {categorys.map(descCategory => {
               return (
                 <li key={descCategory._id}>
                   <a href={`/catalog/product/${descCategory._id}`}>{descCategory.title}</a>
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
  const response = await fetch('https://servelx-api.duckdns.org:3001/api/categorys', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });
  const categorys = await response.json();

  return {
    props: {
      categorys,
    },
    revalidate: 15,
  }
}
