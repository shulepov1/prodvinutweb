<template>
    <section class="create-todo">
      <h3>Добавить задачу</h3>    
  
      <form @submit.prevent="addTodo">
        <input 
          type="text" 
          placeholder="например, Сходить в магазин"
          v-model="inputContent" />
  
        <input type="submit" value="Add todo" />
      </form>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const inputContent = ref('')
  
  const emit = defineEmits()
  
  const addTodo = () => {
    if (inputContent.value.trim() === '') {
      return
    }
    const todo = {
      content: inputContent.value,
      done: false,
      createdAt: new Date().getTime()
    }
    emit('addTodo', todo)
    inputContent.value = ''
  }
  </script>
  