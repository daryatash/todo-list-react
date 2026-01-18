import type { TaskType } from "../types/types";
import styles from './Tasks.module.css'

type TaskDetailsPropsType = {
    selectedTask: TaskType | null
}

export function TaskDetails({selectedTask}: TaskDetailsPropsType) {    
    return (
        <div className={styles.task__details}>
            <h2>Подробнее</h2>
            {!selectedTask && 'Задача не выбрана'}
            {selectedTask && <div>
                    <div>{selectedTask.title}</div>
                    <div>Описание: {!!selectedTask.description ? selectedTask.description : '-'} </div>
                    <div>Приоритет: {selectedTask.priority}</div>
                    <div>
                        Тэги: {selectedTask.tags.map(tag => { 
                                return <div key={tag}>{tag}</div>
                            }) 
                        }
                    </div>
                </div>
            }
        </div>
    )
}