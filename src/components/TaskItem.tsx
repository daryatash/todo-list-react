import { clsx } from "clsx"
import type { TaskType } from "../types/types"
import styles from './Tasks.module.css'
import { DateTime } from "./DateTime"
import { api } from "../dal/api"
import { useState } from "react"

type TaskItemPropsType = {
    task: TaskType
    isSelected: boolean
    setSelectedTask: (task: TaskType) => void
    refreshTasks: () => void
}

export function TaskItem({task, setSelectedTask, isSelected, refreshTasks}: TaskItemPropsType) {

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

    return (
        <li 
            className={clsx({
                [styles.task]: true,
                [styles.selected]: isSelected
            })}
        >
            <h2 
                className={clsx({
                    [styles.task__title]: true,
                    [styles.completed]: task.checked
                })}
                onClick={() => {
                    setSelectedTask(task)
                }}
            >{task.content}</h2>
            <div>
                Status:
                <input type="checkbox" checked={task.checked}/>
            </div>
            <div>Complete by: {task.due && task.due.date && <DateTime date={task.due.date}/>}</div>
            <button disabled={isDeleting} onClick={() => onTaskDelete(task.id)}>Delete task</button>
        </li>
    )
}
