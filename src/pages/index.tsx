import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Container } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

const AddToCartModal = dynamic(
  () => import('@/components/addToCartModal'),
  {loading: () => <p>Carregando...</p> }
)

interface IProduct {
  _id: string;
  title: string;
}

const Home: React.FC = () => {
  //console.log(`Nível Superior ${process.env.NEXT_PUBLIC_userToken}`)
  const token = process.env.NEXT_PUBLIC_userToken;
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  // Função com importação Dinamica
  async function handleSum() {
  const math = (await import('@/lib/math')).default;
    alert(math.sum(4, 5));
  }

  const [isAddToCartModalVisible, setIsAddToCartVisible] = useState(false);
  function handleAddToCart() {
    setIsAddToCartVisible(true);
  }

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
      <SEO title="Home page Principal, a home page de teste" shouldExcludeTitleSuffix />
       <div>
         { isAddToCartModalVisible && <AddToCartModal /> }
         <section>
           <h1>Rotas</h1>
           <p><Link href="/"><a>"/" - Página principal</a></Link></p>
           <p><Link href="/csf"><a>"/csf" - Página C.S.F - Client Side Fetching</a></Link></p>
           <p><Link href="/ssr"><a>"/ssr" - Página S.S.R - Server Side Rendering</a></Link></p>
           <p><Link href="/ssg"><a>"/ssg" - Página S.S.G - Static Site Generation</a></Link></p>
           <p><Link href="/catalog/products/list"><a>"/catalog/products/list" - Página Listagem de Produtos</a></Link></p>
           <p><Link href="/catalog/categorys/list"><a>"/catalog/categorys/list" - Página Listagem de Categorias</a></Link></p>
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
         <button onClick={handleSum}>Sum!</button>
         <button onClick={handleAddToCart}>Add To Cart</button>
       </div>
    </Container>
  )
}

export default Home
