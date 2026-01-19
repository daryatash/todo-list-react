import styles from './Field.module.css'

type SearchTaskFormPropsType = {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export function SearchTaskForm(props: SearchTaskFormPropsType) {
    const {
        searchQuery, 
        setSearchQuery
    } = props

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <label className={styles['visually-hidden']} htmlFor="search">Search tasks</label>
            <input 
                name="search" 
                id="search" 
                placeholder='Search' 
                value={searchQuery} 
                onInput={(event) => setSearchQuery(event.currentTarget.value)}
            />
        </form>
    )
}