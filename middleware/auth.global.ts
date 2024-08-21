import { useGlobalStore } from "~/store/useGlobal"

const whiteList: string[] = ['/', '/login']

export default defineNuxtRouteMiddleware((to, from) => {
  // if (!whiteList.includes(to.path)) {
  //   const token = useUserStore().getToken()
  //   if (import.meta.client) {
  //     if (!token) {
  //       useGlobalStore().openSnackbar({ text: "请先登录!" })
  //       return navigateTo('/login')
  //     }
  //   }
  // }
})
