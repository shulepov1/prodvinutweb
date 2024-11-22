<template>
  <div class="actions">
    <button class="delete" @click="deleteTodo">X</button>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: Object
})

const emit = defineEmits()

const deleteTodo = () => {
  emit('deleteTodo', props.todo)
}
</script>