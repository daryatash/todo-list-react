import styles from './Button.module.css'

type ButtonPropsType = {
  children: string
  type?: 'button' | 'submit' | 'reset'
  className: string
  disabled?: boolean
  onClick?: () => void
}

export const Button = (props: ButtonPropsType) => {
  const {
    children,
    type = 'button',
    className,
    disabled = false,
    onClick
  } = props

  return (
    <button
      type={type}
      className={`${className} ${styles.button}`}
      disabled={disabled}
      onClick={onClick}
    >{children}</button>
  )
}