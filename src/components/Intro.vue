<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
import monkaW from '../assets/monkaw_sm.png'
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="flex-1">
      <p class="text-muted-foreground">
        Use this simple tool to simulate StreamElements text-to-speech (TTS) voice messages for Twitch.
        Hear how a donation for your favorite streamer sounds like!
      </p>
      <p class="text-lg font-medium hidden sm:block">
        Chat we forgot <img :src="monkaW" alt="monkaW" class="inline-block align-middle" />
      </p>
    </div>
    <DarkModeToggle />
  </div>
</template>
