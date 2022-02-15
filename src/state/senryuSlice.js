import { createSlice } from '@reduxjs/toolkit'
import { checkFormattedSenryu } from '../components/SenryuChecker'


const defaultSenryu = {
  firstLine: 'Click me to update',
  secondLine: 'Or type your very senryu',
  thirdLine: "Make sure it's proper",
}

export const senryuSlice = createSlice({
  name: 'senryu',

  initialState: {
    value: defaultSenryu
  },

  reducers: {
    update: (state, action) => {
      state.value = checkFormattedSenryu(action.payload) ? action.payload : defaultSenryu
    }
  }
})

export const { update } = senryuSlice.actions

export default senryuSlice.reducer