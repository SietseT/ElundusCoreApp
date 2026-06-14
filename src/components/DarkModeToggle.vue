<script setup>
import { ref, onMounted, watch } from 'vue'
import { MoonIcon, SunIcon } from '@lucide/vue'

const darkMode = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('site-dark-mode')
  darkMode.value = stored ? JSON.parse(stored) : false
  applyTheme(darkMode.value)
})

watch(darkMode, val => {
  applyTheme(val)
  localStorage.setItem('site-dark-mode', JSON.stringify(val))
})

function applyTheme(dark) {
  const html = document.documentElement
  html.classList.add('is-theme-transitioning')
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  setTimeout(() => html.classList.remove('is-theme-transitioning'), 150)
}
</script>

<template>
  <button
    :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    class="p-2 rounded-md border border-border bg-card hover:bg-accent transition-colors"
    @click="darkMode = !darkMode"
  >
    <SunIcon v-if="darkMode" class="h-5 w-5 text-foreground" />
    <MoonIcon v-else class="h-5 w-5 text-foreground" />
  </button>
</template>
