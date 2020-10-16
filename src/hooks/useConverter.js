import { useContext } from 'react'
import { ConverterContext } from 'contexts/Converter'

export const useConverter = () => {
  const converter = useContext(ConverterContext)
  return converter
}