import { useState, useEffect } from 'react'

/**
 * Retorna un true si la key esta en el objeto, y si no, lanza un error
 * para que se verifique que la key esta en el objeto.
 *
 * @param {T[]} data - Datos que va filtrar para encontrar la key.
 * @param {string} searchKey - La key que se va a buscar.
 * @returns Retorna un true si la key esta en el objeto, y si no, lanza un error
 */
const filterByKey = <T>(data: T[], searchKey: string):boolean => {
  const keyExist = data.some((element: any) => {
    return Object.keys(element).some((key: string) =>
      key === searchKey
    )
  })

  if (keyExist) return keyExist
  throw new Error(`La key ${searchKey} no existe en el objeto`)
}

/**
 * Toma los datos para recorrerlos y filtrarlos segun el termino de busqueda,
 * y el key para un filtrado mas especifico por elemento.
 *
 * @param {T[]} data - Datos de la lista a filtrar.
 * @param {string} [search] - Tu input de busqueda.
 * @param {string} [searchKey] - El key del elemento específico, si este no se especifica, se filtra por todo el elemento.
 * @returns Retorna un array con los datos filtrados del tipo que especifique.
 */

export const useSearchFilter = <T>(data: T[], search:string = '', searchKey?:string) => {
  const [filterData, setFilterData] = useState<T[]>(data)

  const keyFilter = (k:string):string =>
    searchKey && filterByKey<T>(data, searchKey) ? searchKey : k

  useEffect(() => {
    if (search !== '') {
      const filter = data.filter(item =>
        Object.keys(item).some(key =>
          String(item[keyFilter(key)])
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      )

      setFilterData(filter)
    } else setFilterData(data)
  }, [search, data])

  return [
    filterData
  ]
}
