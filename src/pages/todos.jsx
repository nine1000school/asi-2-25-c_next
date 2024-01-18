import { readDatabase } from "@/db/readDatabase"
import clsx from "clsx"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { todos } = await readDatabase()

  return {
    props: {
      todos: Object.values(todos),
    },
  }
}
const TableCell = ({ className, ...otherProps }) => (
  <td className={clsx("p-3", className)} {...otherProps} />
)
const TodosPage = ({ todos }) => (
  <div>
    <table className="w-full">
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id} className="odd:bg-slate-100">
            <TableCell>{todo.id}</TableCell>
            <TableCell>{todo.isDone ? "✅" : ""}</TableCell>
            <TableCell className="w-full">{todo.description}</TableCell>
            <TableCell>
              <Link href={`/todos/${todo.id}/edit`}>Edit</Link>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TodosPage
