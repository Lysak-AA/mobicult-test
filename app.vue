<template>
  <div>
    <header>
      <nav>
        <NuxtLink :to="getRouteForNavLink(pathes)?.value || ''">
          {{ getRouteForNavLink(pathes)?.label || '' }}
        </NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import type { Route } from '@/types/types'
const route = useRoute()

const pathes: Array<Route> = [
  { value: '/', label: 'Карточки' },
  { value: '/admin', label: 'Настройки'}
]

const getRouteForNavLink = (p: Array<Route>): Route | undefined => {
  return p.find((path: Route) => path.value !== route.path)
}  

</script>