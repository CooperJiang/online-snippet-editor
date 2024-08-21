import 'virtual:svg-icons-register'
import svgIcon from '~/components/G-svgIcon.vue'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('svg-icon', svgIcon)
})
