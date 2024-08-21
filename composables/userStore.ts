import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref("")

  const setToken = (t: string) => {
    token.value = t;
  }

  const getToken = () => {
    return token.value;
  }

  const removeToken = () => {
    token.value = "";
  }

  return { token, setToken, getToken, removeToken }
}, {
  persist: true
})
