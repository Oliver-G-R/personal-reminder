import { createContext, FC, useState } from 'react'
import { IReminderData } from '../Types/TReminder'

interface IReminderControlContext {
    createReminder: (reminder:IReminderData) => void
    updateReminder: (id: string) => void
    removeReminder: (id: string) => void
    reminder: IReminderData[]
}

export const ReminderControlContext = createContext<Partial<IReminderControlContext>>({})

export const ReminderControlProvider:FC = ({ children }) => {
  const [reminder, setReminder] = useState<IReminderData[]>()

  const createReminder = (reminder:IReminderData) => {}

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
