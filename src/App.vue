<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Navbar from './components/Navbar.vue';

const store = useStore();

const handleSetTasks = () => store.dispatch('setForTasks');

onMounted(() => {
  handleSetTasks();
});
</script>

<template>
    <header>
      <Navbar/>
    </header>
    <main>
      <router-view></router-view>
    </main>
</template>

<style>
@import "./assets/main.css";
</style>

