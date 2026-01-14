import { useEffect, useState } from "react"
import type { TaskType } from "../types/types"
import { api } from "../dal/api"

export const useTasks = () => {
    const [tasks, setTasks] = useState<TaskType[] | null>(null)
    
    useEffect(() => {
        api.getTasks().then((json) => {
            setTasks(json)
        })
    }, [])

    return {
        tasks
    }
}