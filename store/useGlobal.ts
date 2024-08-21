import { getDefaultMessageConfig, type GlobalStore } from "./helper"

export const useGlobalStore = defineStore('global', {
  state: (): GlobalStore => ({
    snackbarQueue: []
  }),

  getters: {
    messageColor: (state: GlobalStore) => {
      return ""
    }
  },

  actions: {
    openSnackbar(options: any) {
      const optionsType = typeof options
      if (optionsType === 'string') options = { text: options }
      const config = Object.assign(getDefaultMessageConfig(), options)
      this.snackbarQueue.push(config)
    },

    closeSnackbar(key: string) {
      this.snackbarQueue = this.snackbarQueue.filter((item) => item.key !== key)
    }
  },
})
