import { useState, useEffect } from 'react'
import { useAsyncStorage } from '@react-native-community/async-storage'

interface IuseAsyncStorage {
    key: string
    initialValue: any
}

const useSyncStorage = <T>({ key, initialValue }:IuseAsyncStorage): [T, (value:T) => void, string] => {
  const { getItem, setItem } = useAsyncStorage(key)
  const [error, setError] = useState<string>('')
  const [storageItem, setStorageItem] = useState(initialValue)

  useEffect(() => {
    getItem().then(item =>
      typeof item === 'string' && setStorageItem(JSON.parse(item))
    ).catch(() => setError('Error al obtener los datos del almacenamiento local'))
  }, [])

  const setStorageLocalValue = (value:T) => {
    setItem(JSON.stringify(value))
      .then(() => setStorageItem(value))
      .catch(() => setError('Error al actualizar los datos del almacenamiento local'))
  }

  return [
    storageItem !== null ? storageItem : initialValue,
    setStorageLocalValue,
    error
  ]
}

export { useSyncStorage as useAsyncStorage }
