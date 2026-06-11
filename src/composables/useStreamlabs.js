import { invoke } from '@tauri-apps/api/core'

function apiError(message) {
  if (!message) message = 'Something went wrong when reaching the API.'
  return { error: 'Oops..', message }
}

export async function fetchSpeech(voice, text) {
  if (!voice || !text) {
    return { speakUrl: null, error: apiError('You need to fill in some text.') }
  }

  try {
    const speakUrl = await invoke('fetch_speech', { voice, text })
    return { speakUrl, error: null }
  } catch (err) {
    if (err === '422') {
      return {
        speakUrl: null,
        error: apiError(
          'Text length too long. The use of too many non-alphanumeric/weird characters can cause this.'
        ),
      }
    }
    if (err === '429') {
      return {
        speakUrl: null,
        error: apiError('Rate limit reached. Please try again in a minute.'),
      }
    }
    return { speakUrl: null, error: apiError() }
  }
}
