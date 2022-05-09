import { createContext, FC, useEffect } from 'react'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { IReminderData } from '../Types/TReminder'

interface IReminderControlContext {
    createReminder: (reminder:IReminderData) => void
    updateReminder: (id: string) => void
    removeReminder: (id: string) => void
    reminders: IReminderData[]
    removeAllReminders: () => void
}

const defaultState:IReminderControlContext = {
  createReminder: () => {},
  updateReminder: () => {},
  removeReminder: () => {},
  removeAllReminders: () => {},
  reminders: []
}

export const ReminderControlContext = createContext<IReminderControlContext>(defaultState)

export const ReminderControlProvider:FC = ({ children }) => {
  const [reminders, setReminders] = useAsyncStorage<IReminderData[]>({ key: 'reminder', initialValue: [] })

  const createReminder = (reminderData:IReminderData) => {
    setReminders([...reminders, reminderData])
  }

  useEffect(() => console.log(reminders), [reminders])

  const updateReminder = (id: string) => {}

  const removeReminder = (id: string) =>
    setReminders(reminders.filter(rmd => rmd.id !== id))

  const removeAllReminders = () =>
    setReminders([])

  return (
        <ReminderControlContext.Provider value={{
          reminders,
          createReminder,
          updateReminder,
          removeReminder,
          removeAllReminders
        }}>
            {children}
        </ReminderControlContext.Provider>
  )
}
