import clsx from "clsx"
import { ErrorMessage, Field } from "formik"

export const FormField = ({ className, name, ...otherProps }) => (
  <>
    <Field
      name={name}
      className={clsx("border-2 px-3 py-2", className)}
      {...otherProps}
    />
    <ErrorMessage name={name} className="text-sm text-red-500" />
  </>
)
