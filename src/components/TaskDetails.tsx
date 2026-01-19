import type { TaskType } from "../types/types";
import styles from './Tasks.module.css'

type TaskDetailsPropsType = {
    selectedTask: TaskType | null
}

export function TaskDetails({selectedTask}: TaskDetailsPropsType) {    
    return (
        <div className={styles.task__details}>
            <h2>Details</h2>
            {!selectedTask && 'Task is not selected'}
            {selectedTask && <div>
                    <div>{selectedTask.title}</div>
                    <div>Description: {!!selectedTask.description ? selectedTask.description : '-'} </div>
                    <div>Priority: {selectedTask.priority}</div>
                    <div>
                        Tags: {selectedTask.tags.map(tag => { 
                                return <div key={tag}>{tag}</div>
                            }) 
                        }
                    </div>
                </div>
            }
        </div>
    )
}