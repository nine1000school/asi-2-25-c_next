import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { Title } from "@/components/Title"
import { readDatabase } from "@/db/readDatabase"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ params: { todoId } }) => {
  const db = await readDatabase()
  const todo = db.todos[todoId] || null

  return {
    props: {
      todo,
    },
  }
}
const validationSchema = yup.object({
  description: yup.string().min(1).required().label("Description"),
})
const TodoEditPage = ({ todo }) => {
  const router = useRouter()
  const initialValues = {
    description: todo.description,
    isDone: todo.isDone,
  }
  const handleSubmit = async (data) => {
    await axios.patch(`/api/todos/${todo.id}`, data)

    router.push("/todos")
  }

  if (!todo) {
    return "404 - Not found"
  }

  return (
    <>
      <Title>Editing todo #{todo.id}</Title>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField name="description" placeholder="Enter a description" />
          <label className="flex gap-2">
            <FormField name="isDone" type="checkbox" />
            <span>Done</span>
          </label>
          <Button type="submit">SUBMIT</Button>
        </Form>
      </Formik>
    </>
  )
}

export default TodoEditPage
