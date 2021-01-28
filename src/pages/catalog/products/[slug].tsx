import { useRouter } from "next/dist/client/router"

export default function Products() {
  const router = useRouter();

  return (
    <h1>Product - {router.query.slug}</h1>
  )
}
