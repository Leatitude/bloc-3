import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig().public;
  const config = {
    language: "fr",
  };

  if (runtimeConfig.GOOGLE_MAPS_API_KEY) {
    config.key = runtimeConfig.GOOGLE_MAPS_API_KEY;
  }

  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: config,
  });
});
