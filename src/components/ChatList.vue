<script setup>
import { computed } from "vue";
import { useMatrixStore } from "../store/matrixStore";
import { useRouter } from "vue-router";

const store = useMatrixStore();
const router = useRouter();

const rooms = computed(() => store.rooms);

const openChat = (roomId) => {
  router.push(`/chat/${roomId}`);
};
</script>

<template>
  <div class="chat-list">
    <h2>Чаты</h2>
    <ul>
      <li v-for="room in rooms" :key="room.roomId" @click="openChat(room.roomId)">
        <img :src="room.avatar" class="avatar" v-if="room.avatar" />
        <div class="chat-info">
          <h3>{{ room.name }}</h3>
          <p>{{ room.lastEvent }}</p>
        </div>
        <span v-if="room.unreadCount" class="unread">{{ room.unreadCount }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.chat-list {
  max-width: 400px;
  margin: auto;
}
li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.unread {
  background: red;
  color: white;
  padding: 3px 6px;
  border-radius: 50%;
}
</style>
