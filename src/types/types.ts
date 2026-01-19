// export type TaskType = {
//     _id: string
//     title: string
//     description: string
//     dueDate: string
//     priority: 'Low' | 'Medium' | 'High' | 'Critical'
//     status: 'Not Started' | 'In Progress' | 'Completed'
//     tags: string[]
// }

export type TaskType = {
    user_id: string,
    id: string,
    project_id: string,
    section_id: string | null,
    parent_id: string | null,
    added_by_uid: string | null,
    assigned_by_uid: string | null,
    responsible_uid: string | null,
    labels: string[],
    deadline: {
        property1: string,
        property2: string,
    } | null,
    duration: {
        property1: number,
        property2: number,
    } | null,
    checked: boolean,
    is_deleted: boolean,
    added_at: string | null,
    completed_at: string | null,
    completed_by_uid: string | null,
    updated_at: string | null,
    due: { 
        date: string | null,
        is_recurring: boolean,
        lang: string,
        string: string | null,
        timezone: string | null,
    } | null,
    priority: number,
    child_order: number,
    content: string,
    description: string,
    note_count: number,
    day_order: number,
    is_collapsed: boolean
}


export type ResponseType = {
    results: TaskType[],
	next_cursor: string | null
}

export type PayloadType = {
    content: string,
    description: string | null,
    project_id: string | null,
    section_id: string | null,
    parent_id: string | null,
    order: number | null,
    labels: string[] | null,
    priority: 1 | 2 | 3 | 4 | null,
    assignee_id: number | null,
    due_string: string,
    due_date: string | null,
    due_datetime: string  | null,
    due_lang: string | null,
    duration: number | null,
    duration_unit: string | null,
    deadline_date: string | null
}