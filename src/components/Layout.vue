<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
    <header class="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div class="container mx-auto px-4 max-w-6xl h-14 flex items-center justify-between">
        <div class="flex items-center gap-2">

          <span class="text-base font-semibold tracking-tight">Elundus Core</span>
        </div>
        <DarkModeToggle />
      </div>
    </header>
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <slot />
    </main>
  </div>
</template>
