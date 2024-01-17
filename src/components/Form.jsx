import clsx from "clsx"
import { Form as FormikForm } from "formik"

export const Form = ({ className, ...otherProps }) => (
  <FormikForm
    noValidate
    className={clsx("flex flex-col gap-4", className)}
    {...otherProps}
  />
)
