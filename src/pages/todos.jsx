import { Button } from "@/components/Button"
import { readDatabase } from "@/db/readDatabase"
import axios from "axios"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

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
const TodosPage = ({ todos: initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos)
  const [toBeDeleteId, setToBeDeletedIt] = useState(null)
  const handleDelete = (id) => async () => {
    setToBeDeletedIt(id)
    await axios.delete(`/api/todos/${id}`)
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <table className="w-full">
        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.id}
              className={clsx(
                "odd:bg-slate-100 duration-500 transition-opacity",
                {
                  "opacity-40": todo.id === toBeDeleteId,
                },
              )}
            >
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.isDone ? "✅" : ""}</TableCell>
              <TableCell className="w-full">{todo.description}</TableCell>
              <TableCell>
                <Button
                  disabled={todo.id === toBeDeleteId}
                  onClick={handleDelete(todo.id)}
                >
                  DELETE
                </Button>
              </TableCell>
              <TableCell>
                <Link href={`/todos/${todo.id}/edit`}>Edit</Link>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodosPage
