<template>
    <form @submit="submitForm" :id="formId">
        <h2>{{ formTitle }}</h2>
        <slot />
        <input
            type="submit"
            :class="submitDisabled && 'disabled'"
            :disabled="submitDisabled"
            :value="submitBtnValue"
        >
    </form>
</template>

<script setup lang="ts">

defineProps<{
    formId: string
    formTitle: string
    submitDisabled: boolean
    submitBtnValue: string
}>()

const emit = defineEmits(['submit'])

const submitForm = (e: Event) => {
    e.preventDefault()
    emit('submit')
} 

</script>