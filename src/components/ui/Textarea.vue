<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
    class: String,
    modelValue: String,
    disabled: Boolean,
    placeholder: String,
    rows: { type: Number, default: 4 },
    maxlength: Number,
})

const emit = defineEmits(['update:modelValue', 'keydown', 'keyup'])
</script>

<template>
    <textarea :value="modelValue" :disabled="disabled" :placeholder="placeholder" :rows="rows" :maxlength="maxlength"
        :class="cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            props.class
        )
            " @input="emit('update:modelValue', $event.target.value)" @keydown="emit('keydown', $event)"
        @keyup="emit('keyup', $event)" />
</template>
