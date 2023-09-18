<script setup lang="ts">
const neo = useNeodbClient()
const { data, error } = await neo.get('/api/me', {})
</script>

<template>
  <div>
    hello
    {{ data }}
    {{ error }}
    <!-- <PublishWidget draft-key="home" border="b base" /> -->
    <!-- <TimelinePaginator v-bind="{ paginator, stream }" :preprocess="reorderAndFilter" context="home" /> -->
  </div>
</template>
