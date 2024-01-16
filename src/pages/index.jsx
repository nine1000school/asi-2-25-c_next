import Link from "next/link"

const HomePage = () => (
  <div>
    <h1 className="text-4xl">Hello</h1>
    <ul>
      <li>
        - <Link href="/todos">Todos</Link>
      </li>
    </ul>
  </div>
)

export default HomePage
