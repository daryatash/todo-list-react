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
    const [searchQuery, setSearchQuery] = useState('')

    const { tasks, isLoading, refreshTasks } = useTasks()

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = tasks && clearSearchQuery.length > 0 
        ? tasks?.filter((task) => task.content.toLowerCase().includes(clearSearchQuery))
        : null

    return (
        <>
        <div className={styles.container}>
            <div className={styles.tasks}>
                <div>
                    <AddTaskForm refreshTasks={refreshTasks}/>
                    <SearchTaskForm 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery} 
                    />
                    <TaskList 
                        tasks={tasks}
                        filteredTasks={filteredTasks}
                        isLoading={isLoading}
                        selectedTask={selectedTask} 
                        setSelectedTask={setSelectedTask}
                        refreshTasks={refreshTasks}
                    />
                </div>
                <div>
                    <TaskDetails selectedTask={selectedTask}/>
                    <button className={styles.button_reset} onClick={() => setSelectedTask(null)}>Reset</button>
                </div>
            </div>
        </div>
        </>
    )
}