<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
    class: String,
    type: { type: String, default: 'text' },
    modelValue: [String, Number],
    disabled: Boolean,
    placeholder: String,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <input :type="type" :value="modelValue" :disabled="disabled" :placeholder="placeholder" :class="cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        props.class
    )
        " @input="emit('update:modelValue', $event.target.value)" />
</template>