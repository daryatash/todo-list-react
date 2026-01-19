import { useEffect, useState } from "react"
import type { TaskType } from "../types/types"
import { api } from "../dal/api"

export const useTasks = () => {
    const [tasks, setTasks] = useState<TaskType[] | null>(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const refreshTasks = () => {
        setRefreshTrigger(prev => prev + 1);
    }

    const fetchTasks = async () => {
        setIsLoading(true)
        try {
            const json = await api.getTasks()
            setTasks(json.results)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchTasks()
    }, [refreshTrigger])

    return {
        tasks,
        isLoading,
        refreshTasks
    }
}