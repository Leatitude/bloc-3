<script setup>
const route = useRoute();
const { data: product } = await useFetch(
  () => `/api/products/${route.params.productId}`,
  { initialCache: false }
);
// handle 404
watch(
  product,
  () => {
    if (!product.value) {
      throw createError({ statusCode: 404, message: "Product not found" });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <NuxtLayout>
      <div v-if="product">
        <h1>{{ product.name }}</h1>
        <img v-if="product.image" :src="product.image" alt="" />

        <div v-if="product.similarProducts && product.similarProducts.length">
          <h2>Produits similaire</h2>
          <ul>
            <li v-for="similarProduct in product.similarProducts">
              <NuxtLink :to="'/products/' + similarProduct.id">
                <img :src="similarProduct.image" alt="" width="50" />
                {{ similarProduct.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <details>
          <summary>DATA detail</summary>
          <pre>{{ product }}</pre>
        </details>
      </div>
    </NuxtLayout>
  </div>
</template>
