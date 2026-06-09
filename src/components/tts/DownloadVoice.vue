<script setup>
defineProps({
  src: { type: String, required: true },
})
</script>

<template>
  <a
    :href="src"
    download
    rel="noreferrer"
    target="_blank"
    title="A new tab will open in your browser. You can then save the file by right-clicking the audio player and choosing 'Save as..'"
    class="w-full inline-flex items-center justify-center rounded-md border border-primary text-primary font-medium px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
  >
    Download
  </a>
</template>
