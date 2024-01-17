import { readDatabase } from "@/db/readDatabase"
import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ params: { todoIndex } }) => {
  const todos = await readDatabase()
  const todo = todos[todoIndex] || null

  return {
    props: {
      index: todoIndex,
      todo,
    },
  }
}
const validationSchema = yup.object({
  description: yup.string().min(1).required().label("Description"),
})
const TodoEditPage = ({ todo, index }) => {
  const router = useRouter()
  const initialValues = {
    description: todo,
  }
  const handleSubmit = async ({ description }) => {
    await axios.patch(`/api/todos/${index}`, { description })

    router.push("/todos")
  }

  if (!todo) {
    return "404 - Not found"
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Editing todo #{index}</h1>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form noValidate className="flex flex-col gap-4">
          <Field
            name="description"
            className="border-2 px-3 py-2"
            placeholder="Enter a description"
          />
          <ErrorMessage name="description" className="text-sm text-red-500" />
          <button
            type="submit"
            className="bg-blue-600 active:bg-blue-700 font-semibold text-white px-3 py-2 text-lg"
          >
            SUBMIT
          </button>
        </Form>
      </Formik>
    </>
  )
}

export default TodoEditPage
