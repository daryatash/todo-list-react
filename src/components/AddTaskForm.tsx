import { Field } from "./Field";
import { Controller, useForm } from "react-hook-form";
import stylesRadio from './Radio.module.css'
import { TagsField } from "./TagsField";
import { api } from "../dal/api";
import { useState } from "react";

export function AddTaskForm({refreshTasks}: any) {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (newTask: any) => {
        setIsSubmitting(true)
        try {
            const json = await api.addTask(newTask)
            console.log(json)
            reset()
            refreshTasks()
        } catch (error) {
            setServerError(error as any)
            alert(`${serverError}. Please try again!`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const requiredMessage = 'Field is required'

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field 
                {...register('title', {
                    required: requiredMessage,
                    minLength: {
                        value: 1,
                        message: 'Min length is 1 symbol'
                    }
                })} 
                id="task" 
                label="Task" 
                placeholder="Learn React"
                error={errors.title?.message as string}
                disabled={isSubmitting}
            />
            <Field 
                {...register('description', {
                    required: requiredMessage,
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
                {...register('dueDate', {
                    required: requiredMessage,
                })}
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
                    {...register('priority', {required: 'Field is required'})}
                        type="radio" 
                        value="Low" 
                        disabled={isSubmitting}
                    />
                    Low
                </label>
                <label>
                    <input 
                    {...register('priority', {required: 'Field is required'})}
                        type="radio" 
                        value="Medium" 
                        disabled={isSubmitting}
                    />
                    Medium
                </label>
                <label>
                    <input 
                    {...register('priority', {required: 'Field is required'})}
                        type="radio" 
                        value="High" 
                        disabled={isSubmitting}
                    />
                    High
                </label>
                <label>
                    <input 
                    {...register('priority', {required: 'Field is required'})}
                        type="radio" 
                        value="Critical" 
                        disabled={isSubmitting}
                    />
                    Critical
                </label>
                <span className={stylesRadio.radio__error}>{errors.priority?.message as string}</span>
            </fieldset>
            <fieldset className={stylesRadio.radio}>
                <legend>Status:</legend>
                <label>
                    <input 
                    {...register('status', {required: 'Field is required'})}
                        type="radio" 
                        value="Not Started" 
                        disabled={isSubmitting}
                    />
                    Not Started
                </label>
                <label>
                    <input 
                    {...register('status', {required: 'Field is required'})}
                        type="radio" 
                        value="In Progress" 
                        disabled={isSubmitting}
                    />
                    In Progress
                </label>
                <label>
                    <input 
                    {...register('status', {required: 'Field is required'})}
                        type="radio" 
                        value="Completed" 
                        disabled={isSubmitting}
                    />
                    Completed
                </label>
                <span>{errors.status?.message as string}</span>
            </fieldset>
            <Controller 
                name="tags"
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
            <button type="submit" disabled={isSubmitting}>Add new task</button>
        </form>
    )
}