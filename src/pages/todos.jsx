import { readDatabase } from "@/db/readDatabase"

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
          #{index} {todo}
        </li>
      ))}
    </ul>
  </div>
)

export default TodosPage
