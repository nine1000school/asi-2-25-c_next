import clsx from "clsx"

export const Button = ({ className, ...otherProps }) => (
  <button
    className={clsx(
      "bg-blue-600 active:bg-blue-700 font-semibold text-white px-3 py-2 text-lg",
      className,
    )}
    {...otherProps}
  />
)
