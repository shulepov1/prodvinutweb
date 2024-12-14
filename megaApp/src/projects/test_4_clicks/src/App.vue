<script setup>
import Game from "./components/Game.vue";
import Start from "./components/Start.vue";
import Results from "./components/Results.vue";
import { ref } from "vue";

const gameState = ref("start");
const results = ref([]);
const duration = ref(1);

const setDuration = (value) => {
  duration.value = value;
};

const menu = () => {
  gameState.value = "start";
};

const startGame = () => {
  gameState.value = "game";
  console.log("startGAme");
};

const gameOver = (value) => {
  gameState.value = "gameover";
  results.value.push(value);
};
</script>

<template>
  <div class="wrapper">
    <div v-if="gameState === 'start'">
      <Start @startGame="startGame" @setDuration="setDuration"></Start>
    </div>
    <div v-if="gameState === 'game'">
      <Game @gameIsOver="gameOver" :duration="duration"></Game>
    </div>
    <div v-if="gameState === 'gameover'">
      <Results :results="results" @startGame="menu"></Results>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.wrapper,
.wrapper > * {
  max-width: 100vw;
  /* height: 100vh; */

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
