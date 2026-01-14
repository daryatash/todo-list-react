type DateTimePropsType = {
    date: string
}

export function DateTime({ date }: DateTimePropsType) {
    const newDate = new Date(date)

    const formatter = new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    })

    const formattedDate = formatter.format(newDate)

    return (
        <>{formattedDate}</>
    )
}
