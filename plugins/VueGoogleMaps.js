import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      // key: 'YOUR_API_KEY_COMES_HERE',
      language: 'fr', 
  },
  })
})