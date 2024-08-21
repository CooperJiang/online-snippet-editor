import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'


export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify', 'pinia-plugin-persistedstate'],
  },
  modules: [
    "@vueuse/nuxt",
    "nuxt-codemirror",
    "@nuxtjs/style-resources",
    "@nuxt/icon",
    "nuxt-lodash",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (!config.plugins) return;
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },

    server: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:8888',
          changeOrigin: true
        }
      }
    },

    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/svg')]
      })
    ]
  },

  runtimeConfig: {
    isServer: false,
    public: {
      baseURL: process.env.NUXT_BASE_URL
    },
  },

  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },


  styleResources: {
    less: [
      './assets/styles/global.less'
    ]
  },

  css: [
    './assets/styles/global.less',
  ]

})
