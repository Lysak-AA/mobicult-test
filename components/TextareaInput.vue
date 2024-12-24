<template>
    <label :for="id" class="card-text-input">
        <span class="label-text">{{ label }}</span>
        <textarea
            :id="id"
            :placeholder="placeholder"
            v-model="model"
            @blur="$emit('blur')"
            @input="$emit('input')"
        ></textarea>
        <p
            class="error-message"
            v-if="!isValid"
        >
            {{ errorMessage }}
        </p>
    </label>
</template>

<script setup lang="ts">

defineEmits(['blur', 'input'])

defineProps<{
    id: string
    label: string
    placeholder: string
    errorMessage: string
    isValid: boolean
}>()

const model = defineModel<string>()

</script>