const transfer = (col: number) => {
    if (col === 1) {
        return 'пересадка'
    } else if (col < 5) {
        return 'пересадки'
    } else return 'пересадок'
}

export default transfer