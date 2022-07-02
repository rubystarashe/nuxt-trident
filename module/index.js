import { defineNuxtModule } from '@nuxt/kit'
import { resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: '@nuxt/trident',
    configKey: 'trident'
  },
  defaults: {
    pagePath: '/trident',
    componentsPrefix: 'trident',
    backendEngine: 'express'
  },
  setup (options, nuxt) {
    const {
      pagePath,
      componentsPrefix
    } = options

    const { https, host, port } = nuxt.options.server
    const server = `${https ? 'https' : 'http'}://${host}:${port}`
    
    nuxt.options.runtimeConfig.public.trident = {
      ...options,
      server
    }

    const runtimeDir = resolve(__dirname, './runtime')

    nuxt.hook('app:resolve', app => {
      app.mainComponent = resolve(runtimeDir, 'app2.vue')
    })
    nuxt.hook('autoImports:dirs', dirs => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
    nuxt.hook('pages:extend', dirs => {
      dirs.push({
        name: 'trident',
        path: `${pagePath}/:routes(.*)*`,
        file: resolve(runtimeDir, 'pages/index.vue'),
        children: []
      })
    })

    nuxt.hook('components:dirs', dirs => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        prefix: componentsPrefix
      })
    })
  }
})
