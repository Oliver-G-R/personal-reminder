import { createContext, FC } from 'react'
import { useAsyncStorage } from '@hooks/useAsyncStorage'
import { IpreferenceContext, IStatePreferences, TViewReminder } from '@Types/Preferences'

const inititalStateContext:IpreferenceContext = {
  viewRminder: {
    typeViewReminder: 'list',
    setTypeViewReminder: () => {}
  }
}

const initialStatePreference: IStatePreferences = {
  viewRminder: {
    typeViewReminder: 'list'
  }
}

export const PreferencesContext = createContext<IpreferenceContext>(inititalStateContext)

export const PreferencesProvider:FC = ({ children }) => {
  const [preference, setPreference] = useAsyncStorage<IStatePreferences>({ key: 'preferences', initialValue: initialStatePreference })

  const { viewRminder } = preference

  const setTypeViewReminder = (preferenceView: TViewReminder) =>
    setPreference({
      ...preference,
      viewRminder: {
        typeViewReminder: preferenceView
      }
    })

  return (
    <PreferencesContext.Provider value={{
      viewRminder: {
        typeViewReminder: viewRminder.typeViewReminder,
        setTypeViewReminder
      }
    }}>
        {children}
    </PreferencesContext.Provider>
  )
}
