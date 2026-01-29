import { forwardRef, useEffect, useState } from "react";
import styles from './TagsField.module.css';
import { Button } from "./Button";

type TagsFieldPropsType = {
    name: string
    onChange: (tags: string[]) => void
    disabled?: boolean
    value: string[]
}

export const TagsField = forwardRef<HTMLInputElement, TagsFieldPropsType>((props, ref) => {
    const {
        name, 
        onChange,
        disabled,
        value
    } = props

    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setTags(value)
    }, [value])

    const addTag = () => {
        const trimmedInput = tagInput.trim();
        setError('');

        if (trimmedInput.length === 0) return;

        if (tags && tags.includes(trimmedInput)) {
            setError('Tag already added');
            return;
        }

        let newTags = []

        if (tags) {
            newTags = [...tags, trimmedInput]
        } else newTags = [trimmedInput];

        setTags(newTags)
        onChange(newTags)
        setTagInput('');
    };

    const deleteTag = (currentTag: string) => {
        let newTags: string[] = []

        if (tags) {
            newTags = tags.filter((tag) => tag !== currentTag)
        }
        setTags(newTags)
        onChange(newTags)
    }

    return (
        <div className={styles['tags-field']}>
            <label className={styles['tags-field__label']} htmlFor={name}>Tags</label>
            <div className={styles['tags-field__main']}>
                <input
                    className={styles['tags-field__input']}
                    id={name}
                    value={tagInput}
                    disabled={disabled}
                    onChange={(event) => setTagInput(event.target.value)} 
                />
                <Button className={styles['tags-field__button']} disabled={disabled} onClick={addTag}>Add tag</Button>
            </div>
            {error && <span>{error}</span>}
            <ul className={styles['tags-field__list']}>
                {tags && tags.map((tag) => {
                    return <li key={tag}
                            className={styles['tags-field__item']}>
                                {tag}
                                <button 
                                    onClick={() => {deleteTag(tag)}}
                                    className={styles['tags-field__button-delete']}
                                ></button>
                            </li>;
                })}
            </ul>
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(tags)}
                ref={ref}
            />
        </div>
    );
});
