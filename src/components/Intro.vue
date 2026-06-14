<script setup>
import monkaW from '../assets/monkaw_sm.png'
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-3xl font-bold tracking-tight">StreamElements TTS Simulator</h1>
    <p class="text-base text-muted-foreground leading-relaxed">
      Simulate StreamElements text-to-speech (TTS) voice messages for Twitch. Hear how a donation
      sounds before it goes live.
    </p>
    <p class="text-sm text-muted-foreground/80 hidden sm:block">
      Chat we forgot
      <img :src="monkaW" alt="monkaW" class="inline-block align-middle h-5 ml-1" />
    </p>
  </div>
</template>
