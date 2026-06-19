import { check } from '@tauri-apps/plugin-updater'

export async function checkForAppUpdates(options: { autoInstall?: boolean } = {}) {
  const { autoInstall = false } = options

  try {
    const update = await check()

    if (!update) {
      return { status: 'up-to-date' }
    }

    if (!autoInstall) {
      console.info(`Update available: ${update.version}`)
      return { status: 'available', version: update.version }
    }

    await update.downloadAndInstall()
    return { status: 'installed', version: update.version }
  } catch (error) {
    console.error('Failed to check updates:', error)
    return { status: 'error', error }
  }
}
