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
    '~/assets/fonts/fontawesome-free-6.4.2-web/css/all.min.css', // Cargar íconos de FontAwesome
    '~/assets/css/app.css', // Estilos generales de la App
    '~/assets/css/index.css' // Estilos de la página de inicio (landing page), página de registro e inicio de sesión
  ],
})
