import { clsx } from "clsx"
import type { TaskType } from "../types/types"
import styles from './Tasks.module.css'
import { DateTime } from "./DateTime"

type TaskItemPropsType = {
    task: TaskType
    isSelected: boolean
    setSelectedTask: (task: TaskType) => void
}

export function TaskItem({task, setSelectedTask, isSelected}: TaskItemPropsType) {
    return (
        <li 
            onClick={() => {
                setSelectedTask(task)
            }}
            className={clsx({
                [styles.task]: true,
                [styles.selected]: isSelected
            })}
        >
            <h2 className={clsx({
                [styles.task__title]: true,
                [styles.completed]: task.status === 'Completed'
            })}>{task.title}</h2>
            <div>Статус выполнения: <input type='checkbox' checked={task.status === 'Completed'} /></div>
            <div>Выполнить до: <DateTime date={task.dueDate}/></div>

        </li>
    )
}
