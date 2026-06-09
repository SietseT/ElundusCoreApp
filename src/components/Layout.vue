<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
</script>

<template>
    <div class="min-h-screen bg-background text-foreground transition-colors duration-150">
        <header class="border-b border-border bg-card">
            <div class="container mx-auto px-4 max-w-4xl h-12 flex items-center justify-between">
                <span class="text-sm font-semibold tracking-tight">Elundus Core</span>
                <DarkModeToggle />
            </div>
        </header>
        <main class="container mx-auto px-4 py-6 max-w-4xl">
            <slot />
        </main>
    </div>
</template>
