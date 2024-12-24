<template>
    <section id="settings-page">
        <AppPopup>
            <AppForm
                form-id="main-form"
                form-title="Новая карточка"
                :submit-disabled="!isCardTextValid"
                submit-btn-value="Добавить"
                @submit="addCard"
            >
            <TextareaInput
                id="card-textarea-input"
                label="Текст карточки"
                placeholder="Введите текст карточки"
                error-message="Текст карточки должен быть более 10 символов и менее 30"
                :is-valid="isCardTextValid"
                v-model="cardText"
            />
            </AppForm>
        </AppPopup>
    </section>
</template>

<script setup lang="ts">
import AppPopup from '~/components/AppPopup.vue';
import AppForm from '~/components/AppForm.vue';
import TextareaInput from '~/components/TextareaInput.vue';
import { computed, ref } from 'vue';

const cardText: Ref<string> = ref('')

const isCardTextValid = computed(() => cardText.value.length > 10 && cardText.value.length < 30)


const addCard = (e: Event) => {
    try {
        console.log('adding card')

        let currentCards = localStorage.getItem('mob-cards')
        if (!currentCards) {
            localStorage.setItem('mob-cards', JSON.stringify({
                '1': {
                    id: 1,
                    text: cardText.value
                }
            }))
            cardText.value = ''
        } else {
            console.log('there are at least one card')
            const lastIndex = Object.keys(JSON.parse(currentCards)).length
            const cardsToUpdate = JSON.parse(currentCards)
            console.log(lastIndex)
            cardsToUpdate[lastIndex + 1] = {
                id: lastIndex + 1,
                text: cardText.value
            }
            localStorage.setItem('mob-cards', JSON.stringify(cardsToUpdate))
            cardText.value = ''
        }
    } catch (err) {
        console.warn('Ошибка: ' + err)
    }
}

</script>