<template>
    <button
        :class="
            (additionalClasses ? additionalClasses + ' ' : '') +
            'app-button ' +
            (rounded ? 'app-button-rounded ' : 'app-button-rectangular ') +
            (size && 'app-button-' + size)
            "
        title="title"
        @click="$emit('click')"
    >
        <slot />
        {{ icon ? '' : buttonTxt }}
    </button>
</template>

<script setup lang="ts">

defineProps<{
    title?: string
    icon?: boolean
    buttonTxt?: string
    size: 'small' | 'normal' | 'big'
    rounded?: boolean
    additionalClasses?: string
}>()

</script>