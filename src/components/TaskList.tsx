import { TaskItem } from "./TaskItem";
import { useTasks } from "../bll/useTasks";
import styles from './Tasks.module.css'
import type { TaskType } from "../types/types";

type TaskListPropsType = {
    selectedTask: TaskType | null
    setSelectedTask: (task: TaskType | null) => void
}

export function TaskList({setSelectedTask, selectedTask}: TaskListPropsType) {
    const { tasks } = useTasks()

    if (tasks === null) {
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