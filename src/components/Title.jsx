import clsx from "clsx"

export const Title = ({ className, ...otherProps }) => (
  <h1 className={clsx("text-2xl font-bold mb-8", className)} {...otherProps} />
)
