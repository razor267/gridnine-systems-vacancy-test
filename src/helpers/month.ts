const month = (num: number) => {
    switch (num) {
        case 0:
            return 'янв.'
        case 1:
            return 'фев.'
        case 2:
            return 'март'
        case 3:
            return 'апр.'
        case 4:
            return 'май'
        case 5:
            return 'июнь'
        case 6:
            return 'июль'
        case 7:
            return 'авг.'
        case 8:
            return 'сен.'
        case 9:
            return 'окт.'
        case 10:
            return 'ноя.'
        case 11:
            return 'дек.'
        default:
            return null
    }
}

export default month