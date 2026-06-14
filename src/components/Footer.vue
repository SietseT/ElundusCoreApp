<script setup>
import { openUrl } from '@tauri-apps/plugin-opener'

const links = {
  reddit:
    'https://www.reddit.com/r/xqcow/comments/bmjfng/all_brian_tts_characters_from_amazon_polly_used/',
  characters: 'https://gist.github.com/TETYYS/f1aa16b18fb619fc6c0f13ba4f9ae70d',
}
</script>

<template>
  <div class="border-t border-border pt-8 mt-12">
    <div class="space-y-2">
      <h3 class="text-base font-semibold text-foreground">Need help?</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Check out this
        <a href="#"
          class="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium"
          @click.prevent="openUrl(links.reddit)">Reddit post</a>
        with some examples. There's a
        <a href="#"
          class="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium"
          @click.prevent="openUrl(links.characters)">list of characters</a>
        which explains how Brian pronounces most characters.
      </p>
    </div>
  </div>
</template>
