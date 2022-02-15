import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../state/senryuSlice'
import { checkSenryu } from './SenryuChecker'

export default function SenryuTypeArea() {
  const [textAreaValue, setTextAreaValue] = useState('')
  const senryu = useSelector((state) => state.senryu.value)
  const dispatch = useDispatch()

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      setValue(e.target.value)
    }
  }

  const handleChange = (event) => {
    setTextAreaValue(event.target.value)
  }

  const setValue = (value) => {
    let formattedSenryu = checkSenryu(value)
    if (formattedSenryu) {
      dispatch(update(formattedSenryu))
    } else {
      alert('Your text typed must be a senryu')
    }
  }

  return (
    <div>
      <textarea
        value={textAreaValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}