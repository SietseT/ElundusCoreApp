<script setup>
import { cn } from '@/lib/utils'
const props = defineProps({ class: String })
</script>

<template>
  <div :class="cn('flex flex-col space-y-1.5 p-4 border-b border-border', props.class)">
    <slot />
  </div>
</template>
