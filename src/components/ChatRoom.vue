<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMatrixStore } from "@/store/matrixStore";

const store = useMatrixStore();
const route = useRoute();
const roomId = ref(route.params.id);
const messages = ref([]);

onMounted(async () => {
  messages.value = await store.getMessages(roomId.value);
});
</script>

<template>
  <div class="chat-room">
    <h2>Чат</h2>
    <div v-for="msg in messages" :key="msg.id" class="message">
      <strong>{{ msg.sender }}:</strong> {{ msg.text }}
    </div>
  </div>
</template>

<style scoped>
.chat-room {
  max-width: 500px;
  margin: auto;
}
.message {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}
</style>
