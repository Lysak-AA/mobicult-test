<template>
    <section id="cards-page">
        <div class="cards-list" v-if="savedCards?.length">

        </div>
        <div class="no-cards-message">
            <p>Вы не добавили карточки :(</p>
            <p>Перейдите в <NuxtLink to="/admin">НАСТРОЙКИ</NuxtLink> и заполните форму</p>
        </div>
    </section>
</template>

<script setup lang="ts">
// import { reactive } from 'vue';
// import type { Card } from '@/types/types'

definePageMeta({
  layout: 'default'
})

// const cards: Array<Card> = reactive([])

const savedCards = localStorage.getItem('mob-cards')

</script>