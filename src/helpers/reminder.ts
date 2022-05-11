import moment from 'moment'
const getTitle = (reminder:string):string => {
  const lines = reminder.split('\n')
  const title = lines.find(line => line.trim().length > 0) || ''
  return title
}

const getUUID = ():string =>
  'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })

const validateDate = (date: Date):boolean => {
  if (moment(date).isSame(moment(), 'day')) {
    return true
  } else if (moment(date).isAfter(moment())) {
    return true
  }

  return false
}
export {
  getTitle,
  getUUID,
  validateDate
}
