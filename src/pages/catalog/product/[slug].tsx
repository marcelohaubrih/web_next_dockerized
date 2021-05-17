import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from "next/dist/client/router"
import { Container } from '../../../styles/pages/Home'
import SEO from '@/components/SEO';
import Link from 'next/link';

interface IProduct {
  _id: string;
  title: string;
  description: string;
  url: string;
  createdAt: string;
  category: string;
  price: string;
}

interface productProps {
  product: IProduct;
}


export default function Products({ product }: productProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <SEO title="S.S.G - Static Site Generation" />
      <h1>Product - {router.query.slug}</h1>
      <section>
           <h1>Product</h1>
           <h3>ID: {product._id}</h3>
           <h3>Title: {product.title}</h3>
           <h3>Category: {product.category}</h3>
           <h3>Description: {product.description}</h3>
           <h3>URL: {product.url}</h3>
           <h3>Price: {product.price}</h3>
           <h3>CreatedAt: {product.createdAt}</h3>

      </section>
      <p><Link href="/catalog/products/list"><a>"/catalog/products/list" - Página Listagem de Produtos</a></Link></p>
    </Container>
  )
}

// Função para retornar quais páginas gerar estaticamente
export const getStaticPaths: GetStaticPaths = async () => {
  const token = process.env.NEXT_PUBLIC_userToken;
  const response = await fetch(`https://servelx-api.duckdns.org:3001/api/products`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });
  const products = await response.json();

  const paths = products.map(productList => {
    return {
      params: { slug: productList._id }
    }
  })

  return {
    paths,
    fallback: true,
  }
}
// Fim Função

// Função para gerar a página estaticamente
export const getStaticProps: GetStaticProps<productProps> = async (context) => {
  const { slug } = context.params;
  const token = process.env.NEXT_PUBLIC_userToken;
  const response = await fetch(`https://servelx-api.duckdns.org:3001/api/products/${slug}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  const product = await response.json();

  return {
    props: {
      product,
    },
    revalidate: 15,
  }
}
// Fim função
