const getTitle = (reminder:string):string => {
    const lines = reminder.split('\n')
    const title = lines.find(line => line.trim().length > 0) || ''
    return title
}

  //obtener la fecha despues de la palabra #fecha
const getDate = (reminder:string):string => {
    const lines = reminder.split('\n')
    const date = lines.find(line => line.includes('#fecha'))
    if(date){
        return date.replace('#fecha', '')
    }
    return ''

}

export {
    getTitle,
    getDate
}