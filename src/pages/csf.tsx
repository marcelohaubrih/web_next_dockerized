import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '../styles/pages/Home'
import SEO from '@/components/SEO'

interface IProduct {
  _id: string;
  title: string;
}

const Csf: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  const token = process.env.NEXT_PUBLIC_userToken;
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
      <SEO title="C.S.F - Client Side Fetching"/>
       <div>
         <h1>C.S.F - Client Side Fetching - Real-time</h1>
         <p>Página utilizando o sistema de CSF só se utiliza quando os dados tem que ser renderizados ao cliente de forma real-time</p>
         <h4><b>OBS:</b> esses dados geram uma requisição a cada vez que se é mostrado a pagina. nenhum desses dados são capturados pelos robots dos indexadores (GOOGLE, etc)</h4>
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
         <p><Link href="/"><a>"/" - Página principal</a></Link></p>
       </div>
    </Container>
  )
}

export default Csf
