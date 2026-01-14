export type TaskType = {
    _id: string
    title: string
    description: string
    dueDate: string
    priority: 'Low' | 'Medium' | 'High' | 'Critical'
    status: 'Not Started' | 'In Progress' | 'Completed'
    tags: Array<string>
}
