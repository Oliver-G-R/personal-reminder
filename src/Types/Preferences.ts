
type TViewReminder = 'list' | 'grid'

interface IpreferenceContext{
    viewRminder: {
        typeViewReminder: TViewReminder,
        setTypeViewReminder: (typeViewReminder: TViewReminder) => void
    }
}
interface IStatePreferences{
    viewRminder: {
        typeViewReminder: TViewReminder
    }
}

export {
  TViewReminder,
  IpreferenceContext,
  IStatePreferences
}
