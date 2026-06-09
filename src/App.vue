<script setup>
import Layout from './components/Layout.vue'
import Intro from './components/Intro.vue'
import Footer from './components/Footer.vue'
import TextToSpeech from './components/tts/TextToSpeech.vue'
</script>

<template>
  <Layout>
    <Intro />
    <hr class="my-4 border-border" />
    <TextToSpeech />
    <hr class="my-4 border-border" />
    <Footer />
  </Layout>
</template>
