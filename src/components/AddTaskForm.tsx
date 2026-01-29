import { Field } from "./Field";
import { Controller, useForm } from "react-hook-form";
import stylesRadio from './Radio.module.css'
import { TagsField } from "./TagsField";
import { api } from "../dal/api";
import { useState } from "react";
import styles from './AddTaskForm.module.css';
import { Button } from "./Button";

type AddTaskFormPropsType = {
    refreshTasks: () => void
    setSearchQuery: (searchQuery: string) => void
}

export const AddTaskForm = ({refreshTasks, setSearchQuery}: AddTaskFormPropsType) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')

    const {
        register,
        handleSubmit,
        control,
        reset,
        setFocus,
        formState: { errors },
    } = useForm()

    const onSubmit = async (newTask: any) => {
        setIsSubmitting(true)
        try {
            await api.addTask(newTask)
            reset()
            refreshTasks()
            setSearchQuery('')
        } catch (error) {
            setServerError(error as any)
            alert(`${serverError}. Please try again!`)
        } finally {
            setIsSubmitting(false)
            setTimeout(() => {
                setFocus('content')
            }, 100)
        }
    }

    const requiredMessage = 'Field is required'

    return (
        <div className={styles['add-task']}>
            <h2 className={styles['add-task__title']}>New task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['add-task__form']}>
                <Field 
                    {...register('content', {
                        required: requiredMessage,
                        minLength: {
                            value: 1,
                            message: 'Min length is 1 symbol'
                        }
                    })} 
                    id="task" 
                    label="Task" 
                    placeholder="Learn React"
                    error={errors.content?.message as string}
                    disabled={isSubmitting}
                />
                <Field 
                    {...register('description', {
                        maxLength: {
                            value: 150,
                            message: 'Max length is 150 symbols'
                        }
                    })}
                    id="description"
                    label="Description"
                    error={errors.description?.message as string}
                    element="textarea"
                    disabled={isSubmitting}
                />
                <Field 
                    {...register('due_date')}
                    id="dueDate"
                    label="Complete by"
                    error={errors.dueDate?.message as string}
                    type="datetime-local"
                    disabled={isSubmitting}
                />
                <fieldset className={stylesRadio.radio}>
                    <legend>Priority:</legend>
                    <label>
                        <input 
                        {...register('priority')}
                            type="radio" 
                            value="1" 
                            disabled={isSubmitting}
                        />
                        Low
                    </label>
                    <label>
                        <input 
                        {...register('priority')}
                            type="radio" 
                            value="2" 
                            disabled={isSubmitting}
                        />
                        Medium
                    </label>
                    <label>
                        <input 
                        {...register('priority')}
                            type="radio" 
                            value="3" 
                            disabled={isSubmitting}
                        />
                        High
                    </label>
                    <label>
                        <input 
                        {...register('priority')}
                            type="radio" 
                            value="4" 
                            disabled={isSubmitting}
                        />
                        Critical
                    </label>
                    <span className={stylesRadio.radio__error}>{errors.priority?.message as string}</span>
                </fieldset>
                <Controller 
                    name="labels"
                    control={control}
                    render={({field}) => (
                        <TagsField
                            name={field.name}
                            onChange={field.onChange}
                            value={field.value || []}
                            ref={field.ref}
                            disabled={isSubmitting}
                        />
                    )}
                />
                {/* <button type="submit" disabled={isSubmitting}>Add new task</button> */}
                <Button type="submit" disabled={isSubmitting} className={styles['add-task__form-button']}>Add new task</Button>
            </form>
        </div>
    )
}