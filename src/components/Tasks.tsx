import { useState } from 'react'
import { TaskList } from './TaskList'
import { TaskDetails } from './TaskDetails'
import styles from './Tasks.module.css'
import type { TaskType } from '../types/types'

export function Tasks() {
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)

    return (
        <>
        <div className={styles.container}>
            <button className={styles.button_reset} onClick={() => setSelectedTask(null)}>Сбросить выбор</button>
            <div className={styles.tasks}>
                <TaskList selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                <TaskDetails selectedTask={selectedTask}/>
            </div>
        </div>
        </>
    )
}