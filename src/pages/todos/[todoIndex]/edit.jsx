import { readDatabase } from "@/db/readDatabase"
import { ErrorMessage, Field, Form, Formik } from "formik"
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
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().min(8).required().label("Password"),
})
const TodoEditPage = ({ todo, index }) => {
  const initialValues = {
    email: index,
    password: "",
  }
  const handleSubmit = (values) => {
    console.log("SUBMITTED!", values)
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
            name="email"
            type="email"
            className="border-2 px-3 py-2"
            placeholder="E-mail"
          />
          <ErrorMessage name="email" className="text-sm text-red-500" />
          <Field
            name="password"
            type="password"
            className="border-2 px-3 py-2"
            placeholder="Password"
          />
          <ErrorMessage name="password" className="text-sm text-red-500" />
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
