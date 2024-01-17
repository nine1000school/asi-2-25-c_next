import { readDatabase } from "@/db/readDatabase"
import Link from "next/link"

export const getServerSideProps = async () => {
  const todos = await readDatabase()

  return {
    props: {
      todos,
    },
  }
}
const TodosPage = ({ todos }) => (
  <div>
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <Link href={`/todos/${index}/edit`}>
            #{index} {todo}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default TodosPage
