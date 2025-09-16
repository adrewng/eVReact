import type { InputHTMLAttributes } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface PropsInput<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string
  errorClassName?: string
  errorMsg?: string
  labelClassName?: string
  register?: UseFormRegister<T>
  rules?: RegisterOptions<T, FieldPath<T>>
  label: string
  name: FieldPath<T>
}

export default function Input<T extends FieldValues = FieldValues>({
  className = 'mb-1',
  errorClassName = 'mt-1 text-red-600 min-h-[1rem] text-sm',
  inputClassName = 'w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-500',
  labelClassName = 'ml-2 text-sm font-medium text-zinc-700',
  errorMsg,
  register,
  rules,
  label,
  name,
  ...rest
}: PropsInput<T>) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <label className={labelClassName}>{label}</label>
      <input className={inputClassName} {...registerResult} {...rest} />
      <div className={errorClassName}>{errorMsg}</div>
    </div>
  )
}
