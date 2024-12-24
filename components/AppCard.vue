<template>
    <div class="app-card">
        <p class="app-card__text" v-if="!editMode">{{ card.text }}</p>
        <AppTextareaInput
            v-else
            id="card-textarea"
            placeholder="Введите новый текст"
            v-model="model"
        />
        <div class="app-card__actions-container" v-if="editable">
            <AppPencilIcon
                v-if="!editMode"
                @action="$emit('edit', card.id)"
            />
            <AppSaveIcon v-else @action="$emit('save', { id: card.id, text: model })" />
            <AppDeleteIcon @action="$emit('delete', card.id)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/types/types'
import AppPencilIcon from './icons/AppPencilIcon.vue';
import AppDeleteIcon from './icons/AppDeleteIcon.vue';
import AppTextareaInput from './AppTextareaInput.vue';
import AppSaveIcon from './icons/AppSaveIcon.vue';

defineProps<{
    card: Card
    editable: boolean
    editMode?: boolean
}>()

const model = defineModel<string>()
</script>