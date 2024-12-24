<template>
    <div id="app-popup">
        <div class="overlay"></div>
        <div class="popup-content">
            <CloseIcon @close="closePopup" />
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue';

const closePopup = () => {
    console.log('close popup')
}
</script>