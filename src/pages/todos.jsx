import { Button } from "@/components/Button"
import axios from "axios"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

export const getServerSideProps = async () => {
  const { data: todos } = await axios("http://localhost:3000/api/todos")

  return {
    props: {
      todos,
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
    setTodos(todos.filter((todo) => todo._id !== id))
  }

  return (
    <div>
      <table className="w-full">
        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo._id}
              className={clsx(
                "odd:bg-slate-100 duration-500 transition-opacity",
                {
                  "opacity-40": todo._id === toBeDeleteId,
                },
              )}
            >
              <TableCell>{todo._id}</TableCell>
              <TableCell>{todo.isDone ? "✅" : ""}</TableCell>
              <TableCell className="w-full">{todo.description}</TableCell>
              <TableCell>
                <Button
                  disabled={todo._id === toBeDeleteId}
                  onClick={handleDelete(todo._id)}
                >
                  DELETE
                </Button>
              </TableCell>
              <TableCell>
                <Link href={`/todos/${todo._id}/edit`}>Edit</Link>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodosPage
