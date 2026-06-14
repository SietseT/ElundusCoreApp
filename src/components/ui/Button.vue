<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'outline', 'ghost', 'destructive'].includes(v),
  },
  disabled: Boolean,
  type: { type: String, default: 'button' },
  class: String,
})

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2',
  ghost: 'hover:bg-accent hover:text-accent-foreground px-4 py-2',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2',
}
</script>

<template>
  <button :type="type" :disabled="disabled" :class="cn(base, variants[variant], props.class)">
    <slot />
  </button>
</template>
