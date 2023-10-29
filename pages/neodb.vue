<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useHydratedHead({
  title: () => t('nav.neodb'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/neodb" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:book-mark-line />
        <span>{{ $t('nav.neodb') }}</span>
      </NuxtLink>
    </template>
    <template v-if="isHydrated">
      <TimelineNeo v-if="isNeoAuthenticated" />
      <div v-else>
        {{ $t('neo.not_authenticated') }}
      </div>
    </template>
  </MainContent>
</template>
