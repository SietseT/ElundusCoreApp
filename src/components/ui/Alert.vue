<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'destructive'].includes(v),
  },
  class: String,
})

const variants = {
  default: 'bg-background text-foreground',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive bg-destructive/10',
}
</script>

<template>
  <div
    role="alert"
    :class="cn('relative w-full rounded-lg border border-border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4', variants[variant], props.class)"
  >
    <slot />
  </div>
</template>
