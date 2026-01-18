import { forwardRef, useEffect, useState } from "react";

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
        <div>
            <label htmlFor={name}>Tags</label>
            <input
                id={name}
                value={tagInput}
                disabled={disabled}
                onChange={(event) => setTagInput(event.target.value)} 
            />
            <button type='button' disabled={disabled} onClick={addTag}>Add tag</button>
            {error && <span>{error}</span>}
            {tags && tags.map((tag) => {
                return <div key={tag}>
                            {tag}
                            <button onClick={() => {deleteTag(tag)}}>х</button>
                        </div>;
            })}
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(tags)}
                ref={ref}
            />
        </div>
    );
});
