import type { TaskType } from "../types/types"

export const api = {
    getTasks: () => {
        const promise: Promise<TaskType[]> = fetch('https://shrimo.com/fake-api/todos', {
                    /*headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',*/
                })
                .then((response) => response.json())
        return promise
    }
}