<script setup>
const { data: products } = await useFetch("/api/products");

const maxPrice = computed(() => {
  return Math.max(...products.value.map((product) => Math.ceil(product.price)));
});
const search = ref("");
const minPriceSearch = ref(0);
const maxPriceSearch = ref(maxPrice.value);

const foundProducts = computed(() => {
  const searchReg = new RegExp(search.value, "i");
  return products.value
    .filter((product) => searchReg.test(product.name))
    .filter(
      (product) =>
        product.price >= minPriceSearch.value &&
        product.price <= maxPriceSearch.value
    );
});
</script>

<template>
  <div class="p-products">
    <NuxtLayout>
      <div v-if="products">
        <h1>Recherche produits</h1>
        <label>
          nom:
          <input type="search" v-model="search" />
        </label>

        <label>
          Prix min:
          <input
            type="range"
            min="0"
            :max="maxPrice"
            v-model="minPriceSearch"
          />
          ({{ minPriceSearch }}€)
        </label>

        <label>
          Prix max:
          <input
            type="range"
            min="0"
            :max="maxPrice"
            v-model="maxPriceSearch"
          />
          ({{ maxPriceSearch }}€)
        </label>

        <h2>Résultats</h2>
        <transition-group name="list" tag="ul">
          <li v-for="product in foundProducts" :key="product.id">
            <NuxtLink :to="'/products/' + product.id">
              {{ product.name }} ({{ product.price }}€)
            </NuxtLink>
          </li>
        </transition-group>

        <details>
          <summary>DEBUG DATA</summary>
          <pre>{{ products }}</pre>
        </details>
      </div>
    </NuxtLayout>
  </div>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
