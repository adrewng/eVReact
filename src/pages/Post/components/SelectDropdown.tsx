import { useEffect, useId, useRef, useState, type SelectHTMLAttributes } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface PropsSelectDropdown<T extends FieldValues> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  selectClassName?: string
  errorClassName?: string
  errorMsg?: string
  labelClassName?: string
  register?: UseFormRegister<T>
  rules?: RegisterOptions<T, FieldPath<T>>
  label: string
  name: FieldPath<T>
  options: SelectOption[]
  placeholder?: string
}

export default function SelectDropdown<T extends FieldValues = FieldValues>({
  className = '',
  errorClassName = 'overflow-hidden transition-all duration-200 mt-1 text-xs text-red-600 min-h-[1.25rem]',
  selectClassName = '',
  labelClassName = '',
  errorMsg,
  register,
  rules,
  label,
  name,
  options,
  placeholder = 'Vui lòng chọn...',
  ...rest
}: PropsSelectDropdown<T>) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const registerResult = register && name ? register(name, rules) : undefined
  const hasError = Boolean(errorMsg)

  const selectedOption = options.find((option) => option.value === selectedValue)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)

    // Trigger form change event
    if (registerResult?.onChange) {
      const event = {
        target: { value, name },
        type: 'change'
      }
      registerResult.onChange(event as unknown as React.ChangeEvent<HTMLSelectElement>)
    }
  }

  return (
    <div ref={dropdownRef} className={`group relative ${className}`}>
      {/* Label */}
      <label
        htmlFor={id}
        className={`
          block text-sm font-medium text-zinc-700 mb-2
          ${hasError ? 'text-red-600' : ''}
          ${labelClassName}
        `}
      >
        {label}
      </label>

      {/* Hidden select for form integration */}
      <select
        {...registerResult}
        {...rest}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className='hidden'
      />

      {/* Custom dropdown trigger */}
      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`
            peer block w-full bg-transparent px-0 py-3 border-0 border-b outline-none text-sm md:text-base
            transition-[border-color] duration-200 focus:ring-0 text-left
            ${
              hasError
                ? 'border-b-red-500 focus:border-b-red-600'
                : 'border-b-zinc-300 hover:border-b-zinc-400 focus:border-b-black'
            }
            ${selectedValue ? 'text-zinc-900' : 'text-zinc-500'}
            ${selectClassName}
          `}
        >
          <span className={selectedValue ? 'text-zinc-900' : 'text-zinc-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className='absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-zinc-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto'>
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-zinc-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                  selectedValue === option.value ? 'bg-zinc-100 text-black font-medium' : 'text-zinc-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ERROR */}
      <div className={`${errorClassName} ${hasError ? ' opacity-100' : 'opacity-0'}`}>{errorMsg}</div>
    </div>
  )
}
