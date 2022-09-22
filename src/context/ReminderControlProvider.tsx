import { createContext, FC, useEffect, useState, useContext } from 'react'
import { useAsyncStorage } from '@hooks/useAsyncStorage'
import { IReminderData } from '@Types/TReminder'

interface IReminderControlContext {
    createReminder: (reminder:IReminderData) => void
    updateReminder: (id: string, data:IReminderData) => void
    removeReminder: (id: string) => void
    selectReminder: (reminderSelected:IReminderData) => void
    removeAllReminders: () => void
    removeSelectedReminders: () => void
    removeAllSelectedRemindersById: () => void
    reminders: IReminderData[]
    selectedReminders:IReminderData[]
}

const defaultState:IReminderControlContext = {
  createReminder: () => {},
  updateReminder: () => {},
  removeReminder: () => {},
  selectReminder: () => {},
  removeSelectedReminders: () => {},
  removeAllReminders: () => {},
  removeAllSelectedRemindersById: () => {},
  reminders: [],
  selectedReminders: []
}

export const ReminderControlContext = createContext<IReminderControlContext>(defaultState)

export const ReminderControlProvider:FC = ({ children }) => {
  const [reminders, setReminders] = useAsyncStorage<IReminderData[]>({ key: 'reminder', initialValue: [] })

  const [selectedReminders, setSelectedReminders] = useState<IReminderData[]>([])

  const selectReminder = (reminderSelected:IReminderData) => {
    const currentIdReminder = reminderSelected.id

    const isExist = selectedReminders.some(item => item.id === currentIdReminder)

    if (isExist) {
      setSelectedReminders(selectedReminders.filter(item => item.id !== currentIdReminder))
    } else {
      setSelectedReminders([...selectedReminders, reminderSelected])
    }
  }

  const removeSelectedReminders = () => setSelectedReminders([])

  const removeAllSelectedRemindersById = async () => {
    setReminders(reminders.filter(item => !selectedReminders.some(itemSelected => itemSelected.id === item.id)))
  }

  const createReminder = (reminderData:IReminderData) => {
    setReminders([...reminders, reminderData])
  }

  const updateReminder = (id: string, data:IReminderData) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        return { ...reminder, ...data }
      }

      return reminder
    }))
  }

  const removeReminder = (id: string) =>
    setReminders(reminders.filter(rmd => rmd.id !== id))

  const removeAllReminders = () =>
    setReminders([])

  return (
        <ReminderControlContext.Provider value={{
          createReminder,
          updateReminder,
          removeReminder,
          removeAllReminders,
          selectReminder,
          removeSelectedReminders,
          removeAllSelectedRemindersById,
          selectedReminders,
          reminders
        }}>
            {children}
        </ReminderControlContext.Provider>
  )
}
