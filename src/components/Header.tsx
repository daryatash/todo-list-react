import { SearchTaskForm } from "./SearchTaskForm"
import styles from './Header.module.css'

type HeaderPropsType = {
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
}

export const Header = ({searchQuery, setSearchQuery}: HeaderPropsType) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.header__title}>Todo List</h1>
            <SearchTaskForm 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />
        </div>
    )
}