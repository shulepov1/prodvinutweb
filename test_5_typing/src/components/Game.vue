<script setup>
import { ref } from "vue";
import { excerpts } from "../WordsList.js";

const randomIndex = Math.floor(Math.random() * excerpts.length);
const initWords = excerpts[randomIndex]["words"];

const emits = defineEmits(["changeState", "changeWPM", "changeMistakenWords"]);

const props = defineProps({
  duration: Number,
});

const initTime = ref(props.duration);
const currentTime = ref(initTime);

const currentWordIndex = ref(0);
const wordStatus = ref(
  initWords.reduce((acc, item, index) => {
    if (index === 0) {
      acc[index] = "current";
    } else {
      acc[index] = "notReached";
    }
    return acc;
  }, {})
);

const mistakeWords = ref(new Set());

const userInput = ref("");

const okCount = ref(0);
const setWPM = () => {
  const wpm = okCount.value / (initTime.value / 60);
  emits("changeWPM", wpm);
};

const handleInput = () => {
  if (userInput.value[userInput.value.length - 1] === " ") {
    if (userInput.value.trimRight() === initWords[currentWordIndex.value]) {
      wordStatus.value[currentWordIndex.value] = "ok";
      okCount.value += 1;
    } else {
      wordStatus.value[currentWordIndex.value] = "wrong";
      mistakeWords.value.add(initWords[currentWordIndex.value]);
      emits("changeMistakenWords", mistakeWords.value);
    }

    currentWordIndex.value += 1;
    if (currentWordIndex.value > initWords.length - 1) {
      console.log("finished");
      endGame();
    }
    wordStatus.value[currentWordIndex.value] = "current";

    userInput.value = "";
    setWPM();
  } else {
    const inputLength = userInput.value.length;
    if (
      userInput.value.substring(0, inputLength) !==
      initWords[currentWordIndex.value].substring(0, inputLength)
    ) {
      mistakeWords.value.add(initWords[currentWordIndex.value]);
      emits("changeMistakenWords", mistakeWords.value);
      wordStatus.value[currentWordIndex.value] = "currentWrong";
    } else {
      wordStatus.value[currentWordIndex.value] = "current";
    }
  }
};

const endGame = () => {
  emits("changeState", "end");
};
</script>

<template>
  <div class="col">
    <p>{{ excerpts[randomIndex]["name"] }}</p>
    <div class="words">
      <div
        v-for="(word, index) in initWords"
        :class="`word data-${word} ${wordStatus[index]}`"
      >
        {{ word }}
      </div>
    </div>

    <input
      autofocus
      type="text"
      name="input"
      id="input"
      @input="handleInput"
      v-model="userInput"
    />
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.words {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  max-width: 80%;
}

.word {
  padding: 3px;
}

.wrong {
  color: red;
}
.ok {
  color: green;
}
.current {
  background-color: lightgrey;
}
.currentWrong {
  background-color: lightgrey;
  color: red;
}
</style>
