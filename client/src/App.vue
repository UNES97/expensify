<script>
import Menu from './components/Menu.vue'
export default {
    components: {Menu}
}
</script>

<template>
    <Menu></Menu>
    <router-view :key="$route.path"></router-view>
</template>

<style>
</style>