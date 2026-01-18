import { forwardRef } from "react";
import styles from './Radio.module.css';

type RadioPropsType = {
    legend: string
    id: string[]
    label: string[]
    values: string[]
    error: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Radio = forwardRef<HTMLInputElement, RadioPropsType>((props, ref) => {
    const {
        legend,
        id,
        label,
        values,
        error,
        ...inputProps
    } = props

    return (
        <fieldset className={styles.radio}>
            <legend>{legend}</legend>
            {id.map((elementId, index) => {
                return <div key={elementId} className={styles.radio__group}>
                        <label htmlFor={elementId}>{label[index]}</label>
                        <input 
                            type="radio" 
                            id={elementId} 
                            value={values[index]}
                            checked={index === 0 ? true : false}
                            ref={ref}
                            {...inputProps}
                        />
                    </div>
                    })}
        </fieldset>
    )
})