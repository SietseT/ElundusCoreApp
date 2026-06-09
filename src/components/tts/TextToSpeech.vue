<script setup>
import TtsForm from './TtsForm.vue'
import SoundPlayer from './SoundPlayer.vue'
import ErrorAlert from './ErrorAlert.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
    <TtsForm />
    <div class="flex flex-col gap-4">
      <ErrorAlert />
      <SoundPlayer />
    </div>
  </div>
</template>
