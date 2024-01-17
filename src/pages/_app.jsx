import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <main>
    <header className="border-b-2 border-stone-200 bg-stone-50">
      <div className="max-w-2xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Todos App
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/todos/create" className="underline">
                Create
              </Link>
            </li>
            <li>
              <Link href="/todos" className="underline">
                List
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <section>
      <div className="max-w-2xl mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App
