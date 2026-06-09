<script setup>
import Layout from './components/Layout.vue'
import Intro from './components/Intro.vue'
import Footer from './components/Footer.vue'
import TextToSpeech from './components/tts/TextToSpeech.vue'
</script>

<template>
  <Layout>
    <Intro />
    <TextToSpeech class="mt-5" />
    <Footer class="mt-8" />
  </Layout>
</template>
