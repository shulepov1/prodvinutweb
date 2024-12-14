<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  currentState: String,
  currentLevel: Number,
  grid: Array,
});

const emit = defineEmits(["updateCurrentState", "updateGrid"]);

const totalCells = 30;
const filledCells = props.currentLevel;

let cells = Array(totalCells).fill(null);

const generateGrid = () => {
  const valuesToEmbed = new Set(
    Array.from({ length: props.currentLevel }, (_, index) => index + 1)
  );

  const indices = new Set();

  while (indices.size < filledCells) {
    indices.add(Math.floor(Math.random() * totalCells));
  }

  indices.forEach((index, i) => {
    const randomValue = [...valuesToEmbed][
      Math.floor(Math.random() * valuesToEmbed.size)
    ];
    cells[index] = randomValue;
    valuesToEmbed.delete(randomValue);
  });

  updateGrid(cells);
};

onMounted(() => {
  generateGrid();

  setTimeout(() => {
    emit("updateCurrentState", "guessing");
  }, 3000);
});

const updateGrid = (c) => {
  emit("updateGrid", c);
};
</script>

<template>
  <h2>Пожалуйста, запомните расположение чисел ниже...</h2>

  <div class="gridWrapper">
    <div class="grid">
      <div v-for="(cell, index) in grid" :key="index" class="cell">
        <span>{{ cell !== null ? cell : "" }}</span>
      </div>
    </div>
  </div>
</template>
