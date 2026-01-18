import { useState } from 'react'
import { TaskList } from './TaskList'
import { TaskDetails } from './TaskDetails'
import styles from './Tasks.module.css'
import type { TaskType } from '../types/types'
import { AddTaskForm } from './AddTaskForm'
import { SearchTaskForm } from './SearchTaskForm'
import { useTasks } from '../bll/useTasks'

export function Tasks() {
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)

    const { tasks, isLoading, refreshTasks } = useTasks()

    return (
        <>
        <div className={styles.container}>
            <div className={styles.tasks}>
                <div>
                    <AddTaskForm refreshTasks={refreshTasks}/>
                    <SearchTaskForm />
                    <TaskList 
                        tasks={tasks}
                        isLoading={isLoading}
                        selectedTask={selectedTask} 
                        setSelectedTask={setSelectedTask}
                    />
                </div>
                <div>
                    <TaskDetails selectedTask={selectedTask}/>
                    <button className={styles.button_reset} onClick={() => setSelectedTask(null)}>Сбросить выбор</button>
                </div>
            </div>
        </div>
        </>
    )
}