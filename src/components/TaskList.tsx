import { TaskItem } from "./TaskItem";
import styles from './Tasks.module.css'
import type { TaskType } from "../types/types";

type TaskListPropsType = {
    tasks: TaskType[] | null
    isLoading: boolean
    selectedTask: TaskType | null
    setSelectedTask: (task: TaskType | null) => void
}

export function TaskList({tasks, isLoading, setSelectedTask, selectedTask}: TaskListPropsType) {

    if (tasks === null || isLoading) {
        return <div>Loading...</div>
    }

    if (tasks.length === 0) {
        return <div>No tasks</div>
    }
    
    return (
        <>
            <ul className={styles.tasks__list}>
                {tasks.map((task) => <TaskItem 
                                        key={task._id} 
                                        task={task} 
                                        isSelected={selectedTask?._id === task._id}
                                        setSelectedTask={setSelectedTask}
                                    />)}
            </ul>
        </>
    )
}