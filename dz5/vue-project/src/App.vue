<template>
  <div id="app">
    <div class="space">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>

      <div class="content">
        <h1>NASA Media Search</h1>

        <div>
          <label for="q">Search Query:</label>
          <input
            type="text"
            id="q"
            v-model="searchParams.q"
            placeholder="Enter search terms"
          />
        </div>

        <div>
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            v-model="searchParams.title"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            v-model="searchParams.description"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label for="page_size">Results per page:</label>
          <input
            type="range"
            min="1"
            max="20"
            id="page_size"
            v-model="searchParams.page_size"
          />
          <span>{{ searchParams.page_size }}</span>
        </div>

        <div>
          <button @click="fetchMedia">Get results!</button>
        </div>

        <div v-if="media.length > 0">
          <h2>Results:</h2>
          <ul class="items">
            <li class="item" v-for="item in media" :key="item.nasa_id">
              <h2>{{ item.data[0].title }}</h2>
              <p>{{ item.data[0].description }}</p>
              <img
                v-if="item.data[0].media_type === 'image'"
                :src="item.links[0].href"
                :alt="item.title"
              />
            </li>
          </ul>
        </div>

        <div v-if="errorMessage" class="error">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./app.css";
import { ref } from "vue";
import mediaService from "./mediaservice"; 

export default {
  name: "App",
  setup() {
    const searchParams = ref({
      q: "",
      description: "",
      title: "",
      media_type: "image", 
      page_size: 10,
    });

    const media = ref([]);
    const errorMessage = ref("");

    const fetchMedia = async () => {
      try {
        errorMessage.value = ""; 
        const response = await mediaService.search(searchParams.value);
        console.log("RESPONSE", response);
        media.value = response.collection.items;
        console.log("media.value", media.value);
        console.log("media", media);
      } catch (error) {
        errorMessage.value = "Failed to fetch data. Please try again.";
      }
    };

    return {
      searchParams,
      media,
      errorMessage,
      fetchMedia,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
