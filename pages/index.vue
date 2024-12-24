<template>
    <section id="cards-page">
        <div class="settings-page__card-list" v-if="Object.keys(cardsList).length">
            <AppCard
                v-for="item in cardsList"
                key="item.id"
                :card="item"
                :editable="false"
            />
        </div>
        <div class="no-cards-message" v-else>
            <p>Вы не добавили карточки :(</p>
            <p>Перейдите в <NuxtLink to="/admin">НАСТРОЙКИ</NuxtLink> и заполните форму</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Card } from '~/types/types'
import AppCard from '~/components/AppCard.vue';
import { ref } from 'vue';
import { useUpdateCardsList } from '~/composables/useUpdateCardsList';

definePageMeta({
  layout: 'default'
})

let cardsList: Ref<Array<Card>> | [] = ref([])

cardsList.value = useUpdateCardsList()

window.addEventListener('storage', function(event) {
    if (event.key === 'mob-cards') {
        cardsList.value = useUpdateCardsList()
    }
});

</script>