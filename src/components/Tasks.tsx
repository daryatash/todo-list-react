import { useEffect, useRef, useState } from 'react'
import { TaskList } from './TaskList'
import { TaskDetails } from './TaskDetails'
import styles from './Tasks.module.css'
import type { TaskType } from '../types/types'
import { AddTaskForm } from './AddTaskForm'
import { useTasks } from '../bll/useTasks'
import { Header } from './Header'
import { Button } from './Button'

export const Tasks = () => {
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const { tasks, isLoading, refreshTasks } = useTasks()

    const firstIncompleteTaskRef = useRef<HTMLLIElement>(null)
    const firstIncompleteTaskId = tasks?.find(task => !task.labels.includes('completed'))?.id || null
    

    useEffect(() => {
        if (selectedTask && tasks) {
            const updatedTask = tasks.find(t => t.id === selectedTask.id)
            setSelectedTask(updatedTask || null)
        }
    }, [tasks])

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = tasks && clearSearchQuery.length > 0 
        ? tasks?.filter((task) => task.content.toLowerCase().includes(clearSearchQuery))
        : null

    return (
        <>
        <div className={styles.container}>
            <Header 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
            />
            <div className={styles.tasks}>
                <div>
                    <h2>All tasks</h2>
                    <div className={styles.tasks__total}>Total: {tasks ? tasks.length : 0}</div>
                    <Button 
                        className={styles.tasks__button}
                        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth'})}
                    >
                        Show first incomplete task
                    </Button>
                    <TaskList 
                        tasks={tasks}
                        filteredTasks={filteredTasks}
                        isLoading={isLoading}
                        selectedTask={selectedTask} 
                        setSelectedTask={setSelectedTask}
                        refreshTasks={refreshTasks}
                        firstIncompleteTaskRef={firstIncompleteTaskRef}
                        firstIncompleteTaskId={firstIncompleteTaskId}
                    />
                </div>
                <div>
                    <TaskDetails selectedTask={selectedTask}/>
                    <Button disabled={selectedTask ? false : true} className={styles['tasks__button-reset']} onClick={() => setSelectedTask(null)}>Reset</Button>
                </div>
                <AddTaskForm refreshTasks={refreshTasks} setSearchQuery={setSearchQuery}/>
            </div>
        </div>
        </>
    )
}