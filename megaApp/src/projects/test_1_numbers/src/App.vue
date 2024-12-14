<script setup>
import { ref, watch, onMounted } from "vue";
import StartScreen from "./components/StartScreen.vue";
import Countdown from "./components/Countdown.vue";
import Remembering from "./components/Remembering.vue";
import Guessing from "./components/Guessing.vue";

const correct = ref(0);
const wrong = ref(0);
const currentLevel = ref(2);
const grid = ref([]);
const MAX_LEVEL = 5;

const currentState = ref("start");

const handleStateChange = (newState) => {
  currentState.value = newState;
};

const updateGrid = (newGrid) => {
  grid.value = newGrid;
};

const countCorrect = () => {
  correct.value += 1;
};
const countWrong = () => {
  wrong.value += 1;
};
const increaseCurrentLevel = () => {
  currentLevel.value += 1;
};

onMounted(() => {
  currentState.value = "start";
});

watch(currentLevel, () => {
  if (currentLevel.value > MAX_LEVEL) {
    currentState.value = "end";
    return;
  }
});

const restart = () => {
  currentLevel.value = 2;
  correct.value = 0;
  wrong.value = 0;
  currentState.value = "countdown";
};
</script>

<template>
  <div id="app">
    <div v-if="currentState === 'start'">
      <StartScreen @handleClick="handleStateChange"></StartScreen>
    </div>
    <div v-if="currentState === 'end'">
      <h2>Игра окончена</h2>
      <button @click="restart">Начать сначала</button>
    </div>
    <div v-if="currentState === 'countdown'">
      <Countdown
        :currentState="currentState"
        @updateCurrentState="handleStateChange"
      ></Countdown>
    </div>
    <div v-if="currentState === 'remembering'">
      <Remembering
        :currentState="currentState"
        :currentLevel="currentLevel"
        :grid="grid"
        @updateCurrentState="handleStateChange"
        @updateGrid="updateGrid"
      ></Remembering>
    </div>
    <div v-if="currentState === 'guessing'">
      <Guessing
        :currentState="currentState"
        :currentLevel="currentLevel"
        :grid="grid"
        @updateCurrentState="handleStateChange"
        @updateGrid="updateGrid"
        @countCorrect="countCorrect"
        @countWrong="countWrong"
        @increaseCurrentLevel="increaseCurrentLevel"
      ></Guessing>
    </div>

    <div class="panel" v-if="currentState !== 'start'">
      <div class="panel__elt">
        <svg
          class="adnn-tick-icon"
          enable-background="new 0 0 24 24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m.828 13.336c-.261.304-.388.691-.357 1.091s.215.764.52 1.024l7.403 6.346c.275.235.616.361.974.361.044 0 .089-.002.134-.006.405-.036.77-.229 1.028-.542l12.662-15.411c.254-.31.373-.7.334-1.099-.04-.399-.231-.759-.541-1.014l-2.318-1.904c-.639-.524-1.585-.432-2.111.207l-9.745 11.861-3.916-3.355c-.628-.536-1.576-.465-2.115.163z"
          ></path>
        </svg>
        <span>{{ correct }}</span>
      </div>
      <div class="panel__elt">
        <svg
          class="adnn-cross-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
        >
          <path
            d="M28 22.398L19.594 14 28 5.602 22.398 0 14 8.402 5.598 0 0 5.602 8.398 14 0 22.398 5.598 28 14 19.598 22.398 28z"
            fill="#030104"
          ></path>
        </svg>
        <span>{{ wrong }}</span>
      </div>
      <div class="panel__elt">
        <p>{{ currentLevel - 1 }} / {{ MAX_LEVEL }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.adnn-tick-icon,
.adnn-cross-icon {
  width: 23px;
  margin-right: 10px;
}

.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  margin-top: 1rem;
  font-size: 1.5rem;
}
.panel__elt {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.panel > :last-child {
  margin-left: auto;
}
</style>
