<script>
import Menu from './components/Menu.vue'
import QuickActions from './components/QuickActions.vue'

export default {
    components: {Menu, QuickActions}
}
</script>

<template>
    <Menu v-if="$route.meta.Template !== false"></Menu>
    <router-view :key="$route.path">
        
    </router-view>
    <QuickActions v-if="$route.meta.Template !== false"></QuickActions>
</template>

<style>
</style>