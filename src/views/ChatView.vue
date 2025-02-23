<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { MatrixClient } from "matrix-js-sdk";
import ChatList from "../components/ChatList.vue";

const router = useRouter();
const client = ref(null);
const rooms = ref([]);

onMounted(async () => {
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  if (!accessToken || !userId) {
    router.push("/");
    return;
  }

  client.value = MatrixClient({
    baseUrl: "https://matrix.org",
    accessToken,
    userId,
  });

  await client.value.startClient();
  rooms.value = client.value.getRooms();
});
</script>

<template>
  <div>
    <h2>Ваши чаты</h2>
    <ChatList :rooms="rooms" />
  </div>
</template>