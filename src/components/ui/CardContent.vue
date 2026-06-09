<script setup>
import { cn } from '@/lib/utils'
const props = defineProps({ class: String })
</script>

<template>
  <div :class="cn('p-4', props.class)">
    <slot />
  </div>
</template>
