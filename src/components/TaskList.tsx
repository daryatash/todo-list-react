import { TaskItem } from "./TaskItem";
import styles from './Tasks.module.css'
import type { TaskType } from "../types/types";

type TaskListPropsType = {
    tasks: TaskType[] | null
    filteredTasks: TaskType[] | null
    isLoading: boolean
    selectedTask: TaskType | null
    setSelectedTask: (task: TaskType | null) => void
    refreshTasks: () => void
}

export function TaskList({tasks, filteredTasks, isLoading, setSelectedTask, selectedTask, refreshTasks}: TaskListPropsType) {

    console.log(tasks)
    if (tasks === null || isLoading) {
        return <div>Loading...</div>
    }

    if (tasks.length === 0) {
        return <div>No tasks</div>
    }

    if (filteredTasks?.length === 0) {
        return <div>Tasks not found</div>
    }
    
    return (
        <>
            <ul className={styles.tasks__list}>
                {(filteredTasks ?? tasks).map((task) => <TaskItem 
                                        key={task.id} 
                                        task={task} 
                                        isSelected={selectedTask?.id === task.id}
                                        setSelectedTask={setSelectedTask}
                                        refreshTasks={refreshTasks}
                                    />)}
            </ul>
        </>
    )
}