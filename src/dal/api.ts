import type { ResponseType } from "../types/types"

const API_TOKEN = 'fa3359193afa23f9d8e476a9ed7676f01ee14356'

const URL = 'https://api.todoist.com/api/v1/tasks'

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
}

export const api = {
    getTasks: async (): Promise<ResponseType> => {
        const response = await fetch(URL, {
                    headers
                })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    },
    addTask: async (newTask: any) => {
        const response = await fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(newTask)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    },
    deleteTask: async (id: string) => {
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`)
        }
    },
    updateTask: async (id: string, updatedData: any) => {
        const response = await fetch(`${URL}/${id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(updatedData)
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`)
        }

        const data = await response.json()

        return data
    },
}