<script setup>
import { watch, ref, onMounted } from "vue";
import StartScreen from "./components/StartScreen.vue";
import TimerLine from "./components/TimerLine.vue";
import Table from "./components/Table.vue";
import EndScreen from "./components/EndScreen.vue";

const INIT_TIME = 15;
const timer = ref(INIT_TIME);
const points = ref(0);
const gameState = ref("startscreen");
const tableKey = ref(0);

let timerInterval;

const guessCorrect = () => {
  points.value += 1;
  tableKey.value += 1;
};

const startGame = () => {
  points.value = 0;
  tableKey.value = 0;
  gameState.value = "game";
};

watch(gameState, (newState) => {
  if (newState === "game") {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timer.value = INIT_TIME;

    timerInterval = setInterval(() => {
      if (timer.value > 0) {
        timer.value -= 1;
      } else {
        gameState.value = "end";
        clearInterval(timerInterval);
      }
    }, 1000);
  }
});
</script>

<template>
  <div v-if="gameState === 'startscreen'">
    <StartScreen :INIT_TIME="INIT_TIME" @startGame="startGame"></StartScreen>
  </div>

  <div v-if="gameState === 'game'">
    <div class="panel">
      <div class="panel__timer">
        <span>{{ timer }}</span>
        <TimerLine :timer="timer" :INIT_TIME="INIT_TIME"></TimerLine>
      </div>

      <div>
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
          <span>{{ points }}</span>
        </div>
      </div>
    </div>

    <Table
      :key="tableKey"
      :points="points"
      @guessCorrect="guessCorrect"
    ></Table>
  </div>

  <div v-if="gameState === 'end'">
    <EndScreen :points="points" @startGame="startGame"></EndScreen>
  </div>
</template>

<style scoped>
.adnn-tick-icon,
.adnn-cross-icon {
  width: 23px;
  margin-right: 10px;
}
.panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.25rem;
}
.panel__timer {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
}
.panel__elt {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
