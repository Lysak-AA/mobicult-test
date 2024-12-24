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
            <AppTextareaInput
                id="card-textarea-input"
                label="Текст карточки"
                placeholder="Введите текст карточки"
                error-message="Текст карточки должен быть более 10 символов и менее 30"
                :is-valid="isCardTextValid"
                v-model="cardText"
            />
            </AppForm>
        </AppPopup>
        <div class="settings-page__card-list" v-if="Object.keys(cardsList).length">
            <AppCard
                v-for="item in cardsList"
                key="item.id"
                :card="item"
                :editable="true"
                :edit-mode="cardEditingId === item.id"
                @delete="deleteCard($event)"
                @edit="cardEditingId = $event"
                @save="saveNewText($event)"
            />
        </div>
        <div v-else class="add-cards-message">
            <p>Добавить карточки</p>
            <AppArrowIcon />
        </div>
        <AppButton
            title="Добавить карточку"
            icon
            size="big"
            rounded
            additional-classes="add-card-btn"
            @click="popup.openPopup"
        >
        <AppPlusIcon />
        </AppButton>
    </section>
</template>

<script setup lang="ts">
import AppPopup from '~/components/AppPopup.vue';
import AppForm from '~/components/AppForm.vue';
import AppTextareaInput from '~/components/AppTextareaInput.vue';
import AppButton from '~/components/AppButton.vue';
import AppPlusIcon from '~/components/icons/AppPlusIcon.vue';
import AppCard from '~/components/AppCard.vue';
import AppArrowIcon from '~/components/icons/AppArrowIcon.vue';
import { computed, ref } from 'vue';
import { useAlertsStore, usePopupStore } from '~/store';
import type { Card } from '~/types/types'
import { useUpdateCardsList } from '~/composables/useUpdateCardsList';

const alertStore = useAlertsStore()
const popup = usePopupStore()

let cardsList: Ref<Array<Card>> | [] = ref([])

const cardText: Ref<string> = ref('')

const cardEditingId: Ref<number | null> = ref(null)

const isCardTextValid = computed(() => cardText.value.length > 10 && cardText.value.length < 30)

const saveNewText = (e) => {
    try {
        if (e.text.length < 10 || e.text.length > 30) {
            throw Error('Текст должен быть длиннее 10 и короче 30 символов')
        }
        const currentCards = localStorage.getItem('mob-cards')
        if (!currentCards) {
            throw Error()
        } else {
            const object = JSON.parse(currentCards)
            object[e.id].text = e.text
            localStorage.setItem('mob-cards', JSON.stringify(object))
            cardsList.value = useUpdateCardsList()
            alertStore.openAlert('Карточка успешно обновлена', 'success')
            cardEditingId.value = null
        }
    } catch (err) {
        console.warn('Ошибка: ' + err)
        alertStore.openAlert(err as string, 'error')
    } finally {
        setTimeout(() => {
            alertStore.closeAlert()
        }, 2000)
    }
}

const deleteCard = (id: number) => {
    try {
        let currentCards = localStorage.getItem('mob-cards')
        if (!currentCards) {
            throw Error()
        }
        const object = JSON.parse(currentCards)
        delete object[id]
        localStorage.setItem('mob-cards', JSON.stringify(object))
        cardsList.value = useUpdateCardsList()
        alertStore.openAlert('Карточка успешно удалена', 'success')
    } catch (err) {
        console.warn('Ошибка: ' + err)
        alertStore.openAlert('Что-то пошло не так...', 'error')
    } finally {
        setTimeout(() => {
            alertStore.closeAlert()
        }, 2000)
    }

}

const addCard = (e: Event) => {
    try {
        const id = Date.now()
        let currentCards = localStorage.getItem('mob-cards')
        if (!currentCards) {
            localStorage.setItem('mob-cards', JSON.stringify({
                [id]: {
                    id: id,
                    text: cardText.value
                }
            }))
            cardText.value = ''
        } else {
            const cardsToUpdate = JSON.parse(currentCards)
            cardsToUpdate[id] = {
                id: id,
                text: cardText.value
            }
            localStorage.setItem('mob-cards', JSON.stringify(cardsToUpdate))
            cardText.value = ''
        }
        alertStore.openAlert('Карточка успешно создана', 'success')
        cardsList.value = useUpdateCardsList()
    } catch (err) {
        console.warn('Ошибка: ' + err)
        alertStore.openAlert('Что-то пошло не так...', 'error')
    } finally {
        setTimeout(() => {
            alertStore.closeAlert()
        }, 2000)
    }
}

cardsList.value = useUpdateCardsList()

window.addEventListener('storage', function(event) {
    if (event.key === 'mob-cards') {
        cardsList.value = useUpdateCardsList()
    }
});

</script>