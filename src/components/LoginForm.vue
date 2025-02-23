<script setup>
import { ref } from "vue";
import { useMatrixStore } from "@/store/matrixStore";

const store = useMatrixStore();
const homeServer = ref("https://matrix.org");
const username = ref("");
const password = ref("");

const login = async () => {
  await store.login(homeServer.value, username.value, password.value);
};
</script>

<template>
  <div class="login-form">
    <h2>Вход в Matrix</h2>
    <input v-model="homeServer" placeholder="Домашний сервер" />
    <input v-model="username" placeholder="Логин" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>
