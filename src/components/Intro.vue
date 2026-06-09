<script setup>
import monkaW from '../assets/monkaw_sm.png'
</script>

<template>
    <div>
        <p class="text-sm text-muted-foreground">
            Simulate StreamElements text-to-speech (TTS) voice messages for Twitch.
            Hear how a donation sounds before it goes live.
        </p>
        <p class="text-sm text-muted-foreground mt-1 hidden sm:block">
            Chat we forgot
            <img :src="monkaW" alt="monkaW" class="inline-block align-middle h-5 ml-0.5" />
        </p>
    </div>
</template>
