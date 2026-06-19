<script setup>
import Button from './ui/Button.vue'
import {
    checkForAppUpdates,
    installAvailableUpdate,
    UpdaterStatus,
    useUpdater,
} from '../composables/useUpdater'
import { computed } from 'vue'

const { appVersion, status, availableVersion } = useUpdater()

async function checkNow() {
    await checkForAppUpdates()
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

            <button v-if="showCheckNow" type="button"
                class="underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                :disabled="status === UpdaterStatus.Checking || status === UpdaterStatus.Downloading" @click="checkNow">
                Check for updates
            </button>

            <Button v-if="status === UpdaterStatus.Available" variant="outline" class="h-6 px-2 text-[11px]"
                @click="installUpdate">
                Download update
            </Button>
        </div>
    </div>
</template>
