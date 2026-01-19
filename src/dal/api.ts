import type { ResponseType } from "../types/types"

const API_TOKEN = '15f65933e119030d03e67678a5c051578f74eab9'

export const api = {
    getTasks: async (): Promise<ResponseType> => {
        const response = await fetch('https://api.todoist.com/api/v1/tasks', {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    },
    addTask: async (newTask: any) => {
        const response = await fetch('https://api.todoist.com/api/v1/tasks', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    },
    deleteTask: async (id: string) => {
        console.log(`[API] DELETE request for ID: ${id}`)
        const response = await fetch(`https://api.todoist.com/api/v1/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`)
        }

        // const data = await response.json()

        // return data
    }
}