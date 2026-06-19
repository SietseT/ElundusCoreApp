/// <reference types="vite/client" />

import { getVersion } from '@tauri-apps/api/app'
import { check } from '@tauri-apps/plugin-updater'
import { readonly, ref } from 'vue'

export const UpdaterStatus = {
  Idle: 'idle',
  SkippedDev: 'skipped-dev',
  Checking: 'checking',
  UpToDate: 'up-to-date',
  Available: 'available',
  Downloading: 'downloading',
  Installed: 'installed',
  Error: 'error',
} as const

export type UpdaterStatusValue = (typeof UpdaterStatus)[keyof typeof UpdaterStatus]

const appVersion = ref('')
const status = ref<UpdaterStatusValue>(UpdaterStatus.Idle)
const availableVersion = ref('')
const errorMessage = ref('')

type UpdateHandle = Awaited<ReturnType<typeof check>>
let availableUpdate: UpdateHandle = null

export async function initializeUpdater() {
  try {
    appVersion.value = await getVersion()
  } catch {
    appVersion.value = import.meta.env.DEV ? 'dev' : 'unknown'
  }

  if (import.meta.env.DEV) {
    status.value = UpdaterStatus.SkippedDev
    return
  }

  await checkForAppUpdates()
}

export async function checkForAppUpdates() {
  status.value = UpdaterStatus.Checking
  errorMessage.value = ''

  try {
    const update = await check()
    availableUpdate = update

    if (!update) {
      availableVersion.value = ''
      status.value = UpdaterStatus.UpToDate
      return
    }

    availableVersion.value = update.version
    status.value = UpdaterStatus.Available
  } catch (error) {
    console.error('Failed to check updates:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Unknown updater error'
    status.value = UpdaterStatus.Error
  }
}

export async function installAvailableUpdate() {
  if (!availableUpdate) {
    return
  }

  status.value = UpdaterStatus.Downloading

  try {
    await availableUpdate.downloadAndInstall()
    status.value = UpdaterStatus.Installed
  } catch (error) {
    console.error('Failed to install update:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Unknown install error'
    status.value = UpdaterStatus.Error
  }
}

export function useUpdater() {
  return {
    appVersion: readonly(appVersion),
    status: readonly(status),
    availableVersion: readonly(availableVersion),
    errorMessage: readonly(errorMessage),
    UpdaterStatus,
  }
}
