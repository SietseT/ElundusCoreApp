<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
    class: String,
    modelValue: Boolean,
    disabled: Boolean,
    id: String,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="flex items-center gap-2">
        <input :id="id" type="checkbox" :checked="modelValue" :disabled="disabled" :class="cn(
            'peer h-4 w-4 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary cursor-pointer transition-all',
            props.class
        )
            " @change="emit('update:modelValue', $event.target.checked)" />
        <label v-if="$slots.default" :for="id"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none">
            <slot />
        </label>
    </div>
</template>
