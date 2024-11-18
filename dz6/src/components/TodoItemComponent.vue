<template>
    <div :class="['todo-item', { done: todo.done }]">
      <MarkTodoComponent :todo="todo" />
      <div class="todo-content">
        <input type="text" v-model="todo.content" />
      </div>
      <DeleteTodoComponent :todo="todo" @deleteTodo="deleteTodo" />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import MarkTodoComponent from './MarkTodoComponent.vue'
  import DeleteTodoComponent from './DeleteTodoComponent.vue'
  
  const props = defineProps({
    todo: Object
  })
  
  const emit = defineEmits()
  
  const deleteTodo = () => {
    emit('deleteTodo', props.todo)
  }
  </script>
  