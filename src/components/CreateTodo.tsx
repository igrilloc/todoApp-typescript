import { useState } from 'react'

interface Props {
  saveTodo: (title: string) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && inputValue !== '') {
      saveTodo(inputValue)
      setInputValue('')
    }
  }

  return (
    <input
      className='new-todo'
      value={inputValue}
      onChange={(event) => { setInputValue(event.target.value) }}
      onKeyDown={handleKeyDown}
      placeholder='¿Qué quieres hacer?'
      autoFocus
    />
  )
}
