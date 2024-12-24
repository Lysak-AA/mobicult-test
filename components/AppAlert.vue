<template>
    <div
        v-if="showAlert"
        id="app-alert"
        :class="`${status}-alert`"
    >
        <AppSuccessIcon v-if="status === 'success'" />
        <AppErrorIcon v-else />
        <p>{{ alertText }}</p>
        <AppCloseIcon color="black" @close="closeAlert"/>
    </div>
</template>

<script setup>
import AppSuccessIcon from './icons/AppSuccessIcon.vue';
import AppErrorIcon from './icons/AppErrorIcon.vue';
import AppCloseIcon from './icons/AppCloseIcon.vue';
import { useAlertsStore } from '~/store/index'

const alertState = useAlertsStore()

const showAlert = computed(() => alertState.showAlert)
const status = computed(() => alertState.status)
const alertText = computed(() => alertState.alertText)
const closeAlert = alertState.closeAlert
// export default {
//     computed: {
//         ...mapState(useAlertsStore, ['alertText', 'showAlert', 'status'])
//     }
// }
</script>