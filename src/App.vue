<script setup>
import { onMounted } from 'vue'
import Layout from './components/Layout.vue'
import Intro from './components/Intro.vue'
import Footer from './components/Footer.vue'
import TextToSpeech from './components/tts/TextToSpeech.vue'
import { checkForAppUpdates } from './composables/useUpdater'

onMounted(async () => {
  await checkForAppUpdates({ autoInstall: false })
})
</script>

<template>
  <Layout>
    <div class="space-y-8">
      <Intro />
      <TextToSpeech />
      <Footer />
    </div>
  </Layout>
</template>
