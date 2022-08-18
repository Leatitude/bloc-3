<script setup>
const { data: products } = await useFetch("/api/products");
const center = ref({ lat: 47.414827, lng: 2.52515 });
const zoom = ref(5);

const goToProduct = (product) => {
  navigateTo("/products/" + product.id);
};
</script>

<template>
  <div class="p-products">
    <NuxtLayout>
      <div v-if="products">
        <h1>Liste des produits</h1>
        <ul>
          <li v-for="product in products">
            <NuxtLink :to="'/products/' + product.id">
              {{ product.name }}
            </NuxtLink>
          </li>
        </ul>

        <GMapMap
          :center="center"
          :zoom="zoom"
          map-type-id="terrain"
          style="width: 40rem; height: 30rem"
        >
          <GMapCluster :zoomOnClick="true">
            <GMapMarker
              :key="product.id"
              v-for="(product, index) in products"
              :position="product.position"
              :clickable="true"
              @click="goToProduct(product)"
            />
          </GMapCluster>
        </GMapMap>

        <details>
          <summary>DEBUG DATA</summary>
          <pre>{{ products }}</pre>
        </details>
      </div>
    </NuxtLayout>
  </div>
</template>
