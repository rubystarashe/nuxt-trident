import { loadNuxt, buildNuxt } from '@nuxt/kit'

async function nuxtInit() {
  const nuxt = await loadNuxt({
    dev: true,
    overrides: {
      modules: ['./module'],
      trident: {
        componentsPrefix: 'trident'
      }
    }
  })
  buildNuxt(nuxt)
  nuxt.server.listen(3000)
}
nuxtInit()
