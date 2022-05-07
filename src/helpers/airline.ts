import {SegmentType} from '../types/types'

const airline = (segments: SegmentType[]) => {
    const airlines: string[] = []
    segments.forEach(item => {
        if (!airlines.includes(item.airline.caption)) {
            airlines.push(item.airline.caption)
        }
    })
    let res: string = ''
    airlines.forEach((item, index) => {
        if (index + 1 === airlines.length) {
            res = `${res} ${item}`
        } else {
            res = `${res} ${item},`
        }
    })
    return res
}

export default airline