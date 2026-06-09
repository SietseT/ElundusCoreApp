<script setup>
import { computed } from 'vue'
import { useTtsStore } from '../../stores/tts'
import Alert from '../ui/Alert.vue'

const store = useTtsStore()

const title = computed(() => store.error?.error ?? '')
const message = computed(() => {
  if (!store.error) return ''
  return store.error.details?.[0]?.message ?? store.error.message ?? ''
})
</script>

<template>
  <Alert v-if="store.error" variant="destructive">
    <p class="font-semibold mb-1">{{ title }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="text-sm" v-html="message" />
  </Alert>
</template>
