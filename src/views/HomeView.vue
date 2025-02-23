<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MatrixClient } from "matrix-js-sdk";

const router = useRouter();
const homeServer = ref("https://matrix.org");
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  try {
    const client = MatrixClient({
      baseUrl: homeServer.value,
    });

    const response = await client.loginWithPassword(username.value, password.value);
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("user_id", response.user_id);

    router.push("/home");
  } catch (error) {
    errorMessage.value = "Ошибка авторизации. Проверьте логин и пароль.";
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Вход в Matrix</h2>
    <input v-model="homeServer" placeholder="Домашний сервер" />
    <input v-model="username" placeholder="Логин" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.error {
  color: red;
}
</style>