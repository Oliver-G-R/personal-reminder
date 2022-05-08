import { createContext, FC, useEffect } from 'react'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { IReminderData } from '../Types/TReminder'

interface IReminderControlContext {
    createReminder: (reminder:IReminderData) => void
    updateReminder: (id: string) => void
    removeReminder: (id: string) => void
    reminders: IReminderData[]
}

const defaultState:IReminderControlContext = {
  createReminder: () => {},
  updateReminder: () => {},
  removeReminder: () => {},
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

  const removeReminder = (id: string) => {}

  return (
        <ReminderControlContext.Provider value={{
          reminders,
          createReminder,
          updateReminder,
          removeReminder
        }}>
            {children}
        </ReminderControlContext.Provider>
  )
}
