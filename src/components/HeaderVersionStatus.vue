<script setup>
import Button from './ui/Button.vue'
import {
    checkForAppUpdates,
    installAvailableUpdate,
    UpdaterStatus,
    useUpdater,
} from '../composables/useUpdater'
import { computed, onBeforeUnmount, ref } from 'vue'

const { appVersion, status, availableVersion } = useUpdater()
const showToast = ref(false)

let toastTimer = null

function showUpToDateToast() {
    showToast.value = true

    if (toastTimer) {
        clearTimeout(toastTimer)
    }

    toastTimer = setTimeout(() => {
        showToast.value = false
        toastTimer = null
    }, 2800)
}

async function checkNow() {
    await checkForAppUpdates()

    if (status.value === UpdaterStatus.UpToDate) {
        showUpToDateToast()
    }
}

async function installUpdate() {
    await installAvailableUpdate()
}

const showCheckNow = computed(() => {
    return (
        status.value !== UpdaterStatus.Checking &&
        status.value !== UpdaterStatus.Downloading &&
        status.value !== UpdaterStatus.SkippedDev &&
        status.value !== UpdaterStatus.Available &&
        status.value !== UpdaterStatus.Installed
    )
})

onBeforeUnmount(() => {
    if (toastTimer) {
        clearTimeout(toastTimer)
        toastTimer = null
    }
})
</script>

<template>
    <div class="flex flex-col gap-0.5">
        <span class="text-base font-semibold tracking-tight">Elundus Core</span>

        <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>v{{ appVersion || '-' }}</span>

            <span v-if="status === UpdaterStatus.Checking">Checking for updates...</span>
            <span v-else-if="status === UpdaterStatus.Available" class="text-primary font-medium">
                Update {{ availableVersion }} available
            </span>
            <span v-else-if="status === UpdaterStatus.Downloading">Installing update...</span>
            <span v-else-if="status === UpdaterStatus.Installed" class="text-primary font-medium">
                Update downloaded. Restart the app to finish installing.
            </span>

            <button
                v-if="showCheckNow"
                type="button"
                class="underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                :disabled="status === UpdaterStatus.Checking || status === UpdaterStatus.Downloading"
                @click="checkNow">
                Check for updates
            </button>

            <Button
                v-if="status === UpdaterStatus.Available"
                variant="outline"
                class="h-6 px-2 text-[11px]"
                @click="installUpdate">
                Download update
            </Button>
    </div>
    </div>

    <Teleport to="body">
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2">
            <div
                v-if="showToast"
                class="fixed left-1/2 -translate-x-1/2 top-6 z-50 rounded-md border border-emerald-600/30 bg-emerald-600 text-white shadow-lg px-3 py-2 text-sm font-medium">
                You're up to date.
            </div>
        </Transition>
    </Teleport>
</template>
