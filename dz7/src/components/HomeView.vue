<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    homeview
    <div class="links">
        <RouterLink to="/weather">Go to Weather</RouterLink>
        <RouterLink to="/currency">Go to Currency</RouterLink>
    </div>
    <RouterView></RouterView>
</template>

<style scoped>
.links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    text-decoration: underline;
}
</style>
