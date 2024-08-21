import { useGlobalStore } from "~/store/useGlobal"

export const requestCore = (url: string, method = "GET", data: any, opts: any) => {
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()

  return useFetch(url, {
    baseURL: config.public.baseURL,
    method,
    onRequest({ options }) {
      if (method === "GET" || method === "DELETE") {
        options.params = data;
      }
      if (method === "POST" || method === "PUT") {
        options.body = data;
      }
      const token = useUserStore().token
      options.headers = options?.headers || {}
      options.headers = {
        Authorization: token,
        ...options?.headers
      }
    },
    onResponse({ response }) {
      if (response.status >= 200 && response.status < 300) {
        const code = response._data.code
        if (code !== 200) {
          if (import.meta.client) {
            useGlobalStore().openSnackbar(`${response._data.message} ${response._data.code}`)
          }

          // 10000 为基础错误 仅提示即可 例如参数错误 其他错误 无法处理则跳转到error page
          if (code !== 10000) {
            // TODO 非200 错误场景调整至错误页面
            nuxtApp.runWithContext(() => {
              navigateTo({
                path: '/err',
                query: {
                  code: response._data.code,
                  message: response._data.message
                }
              })
            })
          }
        }
      }
    },
    // statusCode 非2开头则走入error
    onResponseError({ response }) {
      if (response.status === 401) {
        // TODO unLogin
      }
      nuxtApp.runWithContext(() => {
        navigateTo({
          path: '/err',
          query: {
            code: response._data.code,
            message: response._data.message
          }
        })
      })
    },
    ...opts
  })
}


export const GetApi = (url: string, params: any, options?: any) => {
  return new Promise((resolve, reject) => {
    requestCore(url, "GET", params, {
      ...options
    }).then((res: any) => {
      resolve(res.data.value)
    }).catch(err => {
      reject(err)
    })
  })
}

export const PostApi = (url: string, data?: any, options?: any) => {
  return new Promise((resolve, reject) => {
    requestCore(url, "POST", data, {
      ...options
    }).then((res: any) => {
      resolve(res.data.value)
    }).catch(err => {
      reject(err)
    })
  })
}
