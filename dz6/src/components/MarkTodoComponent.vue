<template>
    <label>
      <input type="checkbox" v-model="todo.done" />
      <span :class="`bubble`"></span>
    </label>
  </template>
  
  <script setup>
  const props = defineProps({
    todo: Object
  })
  </script>
  