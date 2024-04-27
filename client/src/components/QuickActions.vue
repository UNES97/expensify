
<template>
    <div :style="{ position: 'relative', height: '15rem' }">
        <SpeedDial :model="items" direction="up" :transitionDelay="80" buttonClass="p-button-help p-button-outlined" showIcon="pi pi-bars" hideIcon="pi pi-times" :style="{ right: '1rem', bottom: '1rem' }" />
    </div>
</template>

<script>
export default {
data() {
    return {
        items: [
            {
                label: 'Add Transaction',
                icon: 'pi pi-plus',
                command: () => {
                    console.log('Add Income');
                }
            },
            {
                label: 'Chat w/ AI',
                icon: 'pi pi-comments',
                command: () => {
                    console.log('Chat AI');
                }
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.$store.commit('LOGOUT');
                }
            },
        ]
    }
}
};
</script>
