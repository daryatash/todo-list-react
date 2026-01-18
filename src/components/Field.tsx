import { forwardRef } from 'react';
import styles from './Field.module.css'

type FieldPropsType = {
    id: string
    label: string
    placeholder?: string
    type?: string
    error?: string
    disabled?: boolean
    element?: 'input' | 'textarea'
} & React.InputHTMLAttributes<HTMLInputElement> &
React.TextareaHTMLAttributes<HTMLTextAreaElement>;


export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldPropsType>((props, ref) => {
    const {
        id,
        label,
        placeholder = '',
        type = 'text',
        error,
        disabled,
        element = 'input',
        ...inputProps
    } = props

    return (
        <div className={styles.field}>
            <label className={styles.field__label} htmlFor={id}>{label}</label>
            {element === 'textarea' 
                ? <textarea
                    className={styles.field__input}
                    id={id} 
                    placeholder={placeholder} 
                    autoComplete="off" 
                    disabled={disabled}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    {...inputProps}
                ></textarea>
                : <input 
                    className={styles.field__input}
                    id={id} 
                    placeholder={placeholder} 
                    autoComplete="off" 
                    type={type} 
                    disabled={disabled}
                    ref={ref as React.Ref<HTMLInputElement>}
                    {...inputProps}
                />
            }
            {error && <span className={styles.field__error}>{error}</span>}
        </div>
    )
})

