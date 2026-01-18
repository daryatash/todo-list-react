export const api = {
    getTasks: async () => {
        const response = await fetch('https://shrimo.com/fake-api/todos', {
                    headers: { 'Content-Type': 'application/json' },
                })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    },
    addTask: async (newTask: any) => {
        const response = await fetch('https://shrimo.com/fake-api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    }
}