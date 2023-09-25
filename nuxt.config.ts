// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  app : {
    head: {
      title: 'QuyneApp ~ Gestiona tu dinero, paga tus facturas, crea bolsillos, ¡y más!',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'favicon.png'
        }
      ]
    }
  },
  css: [
    '~/assets/css/reset.css', // Resetear estilos por defecto
    '~/assets/css/app.css', // Estilos generales de la App
  ],
})
