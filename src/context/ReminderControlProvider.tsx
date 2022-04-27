import { createContext, FC, useEffect } from 'react'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { IReminderData } from '../Types/TReminder'

interface IReminderControlContext {
    createReminder: (reminder:IReminderData) => void
    updateReminder: (id: string) => void
    removeReminder: (id: string) => void
    reminder: IReminderData[]
}

const defaultState:IReminderControlContext = {
  createReminder: () => {},
  updateReminder: () => {},
  removeReminder: () => {},
  reminder: []
}

export const ReminderControlContext = createContext<IReminderControlContext>(defaultState)

export const ReminderControlProvider:FC = ({ children }) => {
  const [reminder, setReminder] = useAsyncStorage<IReminderData[]>({ key: 'reminder', initialValue: [] })

  const createReminder = (reminderData:IReminderData) => {
    setReminder([...reminder, reminderData])
  }

  useEffect(() => console.log(reminder), [reminder])

  const updateReminder = (id: string) => {}

  const removeReminder = (id: string) => {}

  return (
        <ReminderControlContext.Provider value={{
          reminder,
          createReminder,
          updateReminder,
          removeReminder
        }}>
            {children}
        </ReminderControlContext.Provider>
  )
}
