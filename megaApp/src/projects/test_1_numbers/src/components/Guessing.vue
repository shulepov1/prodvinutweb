<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  currentState: String,
  currentLevel: Number,
  grid: Array,
});
const emit = defineEmits([
  "updateCurrentState",
  "updateGrid",
  "countCorrect",
  "countWrong",
  "increaseCurrentLevel",
]);

const valuesToGuess = ref(
  Array.from({ length: props.currentLevel }, (_, index) => index + 1)
);

const roundState = ref("ok");

const generateGrid = () => {};

onMounted(() => {
  generateGrid();
});

const handleClick = (e, cell, index) => {
  if (roundState.value !== "ok") {
    return;
  }
  if (!e.currentTarget.classList.contains("hidden")) {
    return;
  }
  if (cell === valuesToGuess.value[0]) {
    e.currentTarget.classList.remove("hidden");
    e.currentTarget.removeEventListener("click", handleClick);
    valuesToGuess.value.shift();

    if (valuesToGuess.value.length === 0) {
      emit("countCorrect");

      setTimeout(() => {
        emit("increaseCurrentLevel");
        emit("updateCurrentState", "countdown");
      }, 1000);
    }
  } else {
    e.currentTarget.classList.remove("hidden");
    e.currentTarget.removeEventListener("click", handleClick);
    roundState.value = "lost";

    emit("countWrong");

    setTimeout(() => {
      emit("increaseCurrentLevel");
      emit("updateCurrentState", "countdown");
    }, 1000);
  }
};
</script>

<template>
  <h2>Пожалуйста, нажмите на числа в порядке возрастания.</h2>
  <div class="gridWrapper">
    <div v-if="roundState === 'ok'" class="grid">
      <div
        v-for="(cell, index) in grid"
        :key="index"
        class="cell"
        :class="{ hidden: cell !== null }"
        @click="
          (e) => {
            handleClick(e, cell, index);
          }
        "
      >
        <span>{{ cell !== null ? cell : "" }}</span>
      </div>
    </div>

    <div v-if="roundState === 'lost'" class="grid">
      <div v-for="(cell, index) in grid" :key="index" class="cell">
        <span>{{ cell !== null ? cell : "" }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.gridWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(
    6,
    1fr
  ); /* Adjust number of columns as needed */
  grid-template-rows: repeat(5, 1fr); /* Adjust number of rows as needed */
  max-width: 600px;
  width: 100%;
  max-height: 500px; /* Optional: to limit the height */
  height: 100%;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  font-size: 3rem;
  font-weight: bold;
  position: relative;
  padding-top: 100%; /* This creates a square aspect ratio */
  width: 100%; /* Fill the parent width */
  height: 0; /* Allow padding-top to define the height */
  max-width: 100%;
  user-select: none;
  box-sizing: border-box; /* Include padding and border in the total width/height */

  display: flex;
  align-items: center;
  justify-content: center;
}

.cell > span {
  margin-bottom: 100%;
}

.cell.hidden {
  background-color: #333;
}

.cell.hidden:hover {
  cursor: pointer;
}

button {
  margin-bottom: 20px;
}

@media (width < 800px) {
  .cell {
    font-size: 2rem;
  }
}
</style>
