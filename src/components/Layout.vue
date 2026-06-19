<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
import HeaderVersionStatus from './HeaderVersionStatus.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
    <header class="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div class="container mx-auto px-4 max-w-6xl min-h-14 py-2 flex items-center justify-between gap-3">
        <HeaderVersionStatus />
        <DarkModeToggle />
      </div>
    </header>
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <slot />
    </main>
  </div>
</template>
