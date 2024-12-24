<template>
    <div v-if="showPopup" id="app-popup">
        <div class="overlay"></div>
        <div class="popup-content">
            <CloseIcon color="white" @close="closePopup" />
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePopupStore } from '~/store';
import CloseIcon from './icons/AppCloseIcon.vue';

const popup = usePopupStore()

const showPopup = computed(() => popup.showPopup)

const closePopup = () => {
    popup.closePopup()
}
</script>