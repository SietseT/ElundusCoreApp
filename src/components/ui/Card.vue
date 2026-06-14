<script setup>
import { cn } from '@/lib/utils'
const props = defineProps({ class: String })
</script>

<template>
  <div :class="cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow', props.class)
    ">
    <slot />
  </div>
</template>
