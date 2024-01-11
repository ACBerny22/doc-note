import Link from "../../node_modules/next/link"

export default function Home() {
  
  return (
    <main>
      <h1>Main Page</h1>
      <Link href={'/dashboard'}>
        <p>Dashboard</p>
      </Link>
    </main>
  )
}
