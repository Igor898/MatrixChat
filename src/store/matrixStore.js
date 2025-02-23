import { defineStore } from "pinia";
import * as sdk from "matrix-js-sdk";

export const useMatrixStore = defineStore("matrix", {
  state: () => ({
    client: null,
    rooms: [],
  }),

  actions: {
    async login(homeServer, username, password) {
      this.client = sdk.createClient({ baseUrl: homeServer });
      const { access_token, user_id, device_id } = await this.client.loginWithPassword(username, password);
      
      this.client = sdk.createClient({
        baseUrl: homeServer,
        accessToken: access_token,
        userId: user_id,
        deviceId: device_id,
      });

      localStorage.setItem("matrix_token", access_token);
      await this.client.startClient();
      this.fetchRooms();
    },

    async fetchRooms() {
      if (!this.client) return;

      const rooms = this.client.getRooms();
      this.rooms = rooms.map((room) => ({
        roomId: room.roomId,
        name: room.name || "Без названия",
        lastEvent: room.timeline?.length ? room.timeline[room.timeline.length - 1]?.event?.content?.body : "Нет сообщений",
        unreadCount: room.getUnreadNotificationCount(),
        avatar: room.getAvatarUrl(this.client.baseUrl, 40, 40, "crop"),
      }));
    },

    async getMessages(roomId) {
      if (!this.client) return [];

      const room = this.client.getRoom(roomId);
      if (!room) return [];

      return room.timeline.map((event) => ({
        id: event.getId(),
        sender: event.getSender(),
        text: event.getContent().body || "",
      }));
    },
  },
});
