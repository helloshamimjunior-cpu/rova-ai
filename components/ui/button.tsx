import * as React from "react"
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className="", variant="default", ...props }, ref) => {
    const base="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition"
    const styles=variant==="outline"?"border border-gray-300 bg-white hover:bg-gray-50":"bg-gray-900 text-white hover:bg-gray-800"
    return <button ref={ref} className={`${base} ${styles} ${className}`} {...props} />
  }
)
Button.displayName="Button"
