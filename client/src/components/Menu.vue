
<script>
export default {
    data() {
        return {
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    route: 'Dashboard'
                },
                {
                    label: 'Transactions',
                    icon: 'pi pi-wallet',
                    route: 'Transactions'
                },
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    route: 'Profile'
                }
            ]
        };
    }
};
</script>

<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <!-- <h3 class="appLogo">Xpnsfy</h3> -->
                <img class="w-1" src="/images/logo.png" alt="Expensify" srcset="">
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <router-link :to="{name: item.route}" v-ripple class="flex align-items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                </router-link>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                    <Avatar image="https://e1.pxfuel.com/desktop-wallpaper/147/865/desktop-wallpaper-anime-profile-pic-anime-profile.jpg" shape="circle" />
                </div>
            </template>
        </Menubar>
    </div>
</template>


<style>

</style>