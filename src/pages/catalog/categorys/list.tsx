import SEO from '@/components/SEO'
import { GetStaticProps } from 'next'
import Link from 'next/link'
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
      <SEO title="S.S.G - Static Site Generation" />
       <div>
         <section>
           <h1>Categorys</h1>
           <ul>
             {categorys.map(descCategory => {
               return (
                 <li key={descCategory._id}>
                   <Link href={`/catalog/product/${descCategory._id}`}><a>{descCategory.title}</a></Link>
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
