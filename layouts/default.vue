<template>
  <div class="l-default">
    <header>
      <h1>HEADER</h1>
      <ul>
        <li><NuxtLink to="/">accueil</NuxtLink></li>
        <li><NuxtLink to="/products">produits</NuxtLink></li>
        <li><NuxtLink to="/products/search">recherche</NuxtLink></li>
      </ul>
    </header>
    <main><slot /></main>
    <footer>FOOTER</footer>
  </div>
</template>

<style>
header {
  background: #999;
}
</style>
