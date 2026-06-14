<script setup>
import TtsForm from './TtsForm.vue'
import SoundPlayer from './SoundPlayer.vue'
import ErrorAlert from './ErrorAlert.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
    <TtsForm />
    <div class="flex flex-col gap-6">
      <ErrorAlert />
      <SoundPlayer />
    </div>
  </div>
</template>
