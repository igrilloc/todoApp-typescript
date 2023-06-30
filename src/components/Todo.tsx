import { useEffect, useRef, useState } from 'react'

interface Props {
  id: string
  title: string
  completed: boolean
  setCompleted: (id: string, completed: boolean) => void
  setTitle: (params: { id: string, title: string }) => void
  isEditing: string
  setIsEditing: (completed: string) => void
  removeTodo: (id: string) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, isEditing, setCompleted, setTitle, removeTodo, setIsEditing }) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') removeTodo(id)

      setIsEditing('')
    }

    if (event.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(event) => { setCompleted(id, event.target.checked) }}
        />
        <label>{title}</label>
        <button className='destroy' onClick={() => { removeTodo(id) }}></button>
      </div>

      <input
        className='edit'
        value={editedTitle}
        onChange={(event) => { setEditedTitle(event.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}
