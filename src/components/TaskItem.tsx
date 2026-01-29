import { clsx } from "clsx"
import type { TaskType } from "../types/types"
import styles from './Tasks.module.css'
import { api } from "../dal/api"
import { useState } from "react"
import { Button } from "./Button"

type TaskItemPropsType = {
    task: TaskType
    isSelected: boolean
    setSelectedTask: (task: TaskType) => void
    refreshTasks: () => void
    ref: any
}

export const TaskItem = (props: TaskItemPropsType) => {

    const {
        task, 
        setSelectedTask, 
        isSelected, 
        refreshTasks, 
        ref
    } = props
    
    const [isDeleting, setIsDeleting] = useState(false)

    const onTaskDelete = async (id: string) => {
        setIsDeleting(true)
        try {
            await api.deleteTask(id)
        } catch (error) {
            console.log(error)
        } finally {
            setIsDeleting(false)
            refreshTasks()
        }
    }

    const onTaskCheck = async () => {
        const completedLabel = 'completed'
        const currentLabels = task.labels || []
        const isChecked = currentLabels.includes(completedLabel)

        let newLabels

        if (!isChecked) {
            newLabels = [...currentLabels, completedLabel]
        } else {
            newLabels = currentLabels.filter(label => label !== completedLabel)
        }

        try {
            await api.updateTask(task.id, { labels: newLabels });
            refreshTasks();
        } catch (error) {
            console.error('Ошибка при обновлении статуса задачи:', error);
        }
    }

    const isTaskChecked = (task.labels || []).includes('completed');

    return (
        <li 
            className={clsx({
                [styles.task]: true,
                [styles.selected]: isSelected
            })}

            ref={ref}
        >
            <div className={styles.task__content}>
                <input 
                    type="checkbox" 
                    checked={isTaskChecked}
                    onChange={onTaskCheck}
                />
                <h2 
                    className={clsx({
                        [styles.task__title]: true,
                        [styles.completed]: isTaskChecked
                    })}
                >{task.content}</h2>
            </div>
            <div className={styles.task__actions}>
                <Button disabled={isSelected} onClick={() => setSelectedTask(task)} className={styles['task__button-details']}>Show details</Button>
                <Button disabled={isDeleting} onClick={() => onTaskDelete(task.id)} className={styles['task__button-delete']}>Delete</Button>
            </div>
        </li>
    )
}
