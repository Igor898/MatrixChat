<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <header>
      <h1>Matrix Chat</h1>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

header {
  background: #2c3e50;
  color: white;
  padding: 10px;
}

main {
  padding: 20px;
}
</style>
