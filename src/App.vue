<script setup lang="ts">
// import { provide } from 'vue'
// import type { InjectionKey } from 'vue'

import { RouterLink, RouterView } from 'vue-router'
// import ProjectTable from './views/ProjectTable.vue'

// const key = Symbol('api') as InjectionKey<string>

// provide(key, 'http://localhost:3000/')
</script>

<template>
  <!-- <header> -->
  <!-- <img alt="Github" class="logo" src="@/assets/github.svg" width="125" height="125" /> -->
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Projects</RouterLink>
      <RouterLink to="/tasks">Tasks</RouterLink>
    </nav>
  </div>
  <!-- </header> -->

  <!-- <ProjectTable /> -->

  <RouterView />
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
