<template>
  <div></div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "~/store/useGlobal"

onMounted(() => {
  const route = useRoute()
  const { code, message } = route.query
  switch (code) {
    case "401":
      useUserStore().removeToken()
      useGlobalStore().openSnackbar({ text: "未登录" })
      break
    case "403":
      useGlobalStore().openSnackbar({ text: "权限不足" })
      break
    default:
      useGlobalStore().openSnackbar({ text: "服务端错误" })
      break
  }
})
</script>

<style scoped></style>
