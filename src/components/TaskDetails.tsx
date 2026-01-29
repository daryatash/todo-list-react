import type { TaskType } from "../types/types";
import { DateTime } from "./DateTime";
import styles from './Tasks.module.css'

type TaskDetailsPropsType = {
    selectedTask: TaskType | null
}

export const TaskDetails = ({selectedTask}: TaskDetailsPropsType) => {    

    const convertPriority = selectedTask && (selectedTask.priority === 1 
        ? 'Low' 
        : selectedTask.priority === 2
            ? 'Medium'
            : selectedTask.priority === 3
                ? 'High'
                : 'Critical'
    )
    
    return (
        <div className={styles['task-details']}>
            <h2>Details</h2>
            {!selectedTask && 'Task is not selected'}
            {selectedTask && <div>
                    <div><b>Task:</b> {selectedTask.content}</div>
                    <div><b>Description:</b> {!!selectedTask.description ? selectedTask.description : '-'} </div>
                    <div><b>Complete by:</b> {selectedTask.due && selectedTask.due.date ? <DateTime date={selectedTask.due.date}/> : '-'}</div>
                    <div><b>Priority:</b> {convertPriority}</div>
                    <div>
                        <b>Tags:</b>
                        <ul className={styles['task-details__tags-list']}>
                            {selectedTask.labels.map(tag => { 
                                if (tag !== 'completed') {
                                    return <li key={tag} className={styles['task-details__tags-item']}>{tag}</li>
                                }
                            }) 
                        }
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}