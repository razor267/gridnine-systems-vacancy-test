const travelTime = (arrival:string, departure:string) => {
    return Date.parse(arrival) - Date.parse(departure) - 7200000
}

export default travelTime
