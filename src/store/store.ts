import State from '../types/state'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: (): State => ({
    testState: {},
  }),

  actions: {},
})
