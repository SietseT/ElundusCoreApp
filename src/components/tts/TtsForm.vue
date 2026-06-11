<script setup>
import { ref, computed, watch } from 'vue'
import { LoaderCircleIcon } from '@lucide/vue'
import { fetchSpeech } from '../../composables/useStreamlabs'
import { useTtsStore } from '../../stores/tts'
import Card from '../ui/Card.vue'
import CardContent from '../ui/CardContent.vue'

const store = useTtsStore()

const TEXT_MAX_LENGTH = 500
const DEFAULT_VOICE = 'Brian'

const saved = (() => {
  try {
    return JSON.parse(localStorage.getItem('voiceText')) ?? {}
  } catch {
    return {}
  }
})()

const text = ref(saved.text ?? '')
const voice = ref(saved.voice ?? DEFAULT_VOICE)
const clearText = ref(false)
const isLoading = ref(false)
const keysPressed = {}

const charCount = computed(() => text.value.length)

watch([text, voice], () => {
  localStorage.setItem('voiceText', JSON.stringify({ text: text.value, voice: voice.value }))
})

async function handleSubmit() {
  if (!text.value.trim()) {
    store.setError({ error: 'Oops..', message: 'You need to fill in some text.' })
    return
  }

  const submitText = text.value
  const submitVoice = voice.value

  if (clearText.value) text.value = ''

  isLoading.value = true
  const result = await fetchSpeech(submitVoice, submitText)
  isLoading.value = false

  if (result.speakUrl) {
    store.setResult(result.speakUrl, null, submitVoice, submitText)
  } else {
    store.setError(result.error)
  }
}

function onKeyDown(e) {
  keysPressed[e.key] = true
  if (!keysPressed['Shift'] && e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit()
  }
}

function onKeyUp(e) {
  delete keysPressed[e.key]
}
</script>

<template>
  <Card>
    <CardContent class="pt-4">
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <!-- Textarea -->
        <div class="flex flex-col gap-1.5">
          <div class="flex items-baseline justify-between">
            <label for="text" class="text-sm font-medium text-foreground">Text</label>
            <span class="text-xs text-muted-foreground"
              >{{ charCount }} / {{ TEXT_MAX_LENGTH }}</span
            >
          </div>
          <textarea
            id="text"
            v-model="text"
            :maxlength="TEXT_MAX_LENGTH"
            rows="5"
            placeholder="Type your text here..."
            aria-label="Text"
            class="w-full rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            @keydown="onKeyDown"
            @keyup="onKeyUp"
          />
        </div>

        <!-- Voice select -->
        <div class="flex flex-col gap-1.5">
          <label for="voice" class="text-sm font-medium text-foreground">Voice</label>
          <select
            id="voice"
            v-model="voice"
            aria-label="Voice"
            class="w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          >
            <optgroup label="English (British)">
              <option>Amy</option>
              <option>Brian</option>
              <option>Emma</option>
            </optgroup>
            <optgroup label="English (US)">
              <option>Ivy</option>
              <option>Joanna</option>
              <option>Joey</option>
              <option>Justin</option>
              <option>Kendra</option>
              <option>Kimberly</option>
              <option>Matthew</option>
              <option>Salli</option>
            </optgroup>
            <optgroup label="English (Australian)">
              <option>Nicole</option>
              <option>Russell</option>
            </optgroup>
            <optgroup label="English (Welsh)">
              <option>Geraint</option>
            </optgroup>
            <optgroup label="English (Indian)">
              <option>Aditi</option>
              <option>Raveena</option>
            </optgroup>
            <optgroup label="Arabic">
              <option>Zeina</option>
            </optgroup>
            <optgroup label="Chinese, Mandarin">
              <option>Zhiyu</option>
            </optgroup>
            <optgroup label="Danish">
              <option>Naja</option>
              <option>Mads</option>
            </optgroup>
            <optgroup label="Dutch">
              <option>Lotte</option>
              <option>Ruben</option>
            </optgroup>
            <optgroup label="French">
              <option>Celine</option>
              <option>Lea</option>
              <option>Mathieu</option>
            </optgroup>
            <optgroup label="French (Canadian)">
              <option>Chantal</option>
            </optgroup>
            <optgroup label="German">
              <option>Marlene</option>
              <option>Vicki</option>
              <option>Hans</option>
            </optgroup>
            <optgroup label="Hindi">
              <option>Aditi</option>
            </optgroup>
            <optgroup label="Icelandic">
              <option>Dora</option>
              <option>Karl</option>
            </optgroup>
            <optgroup label="Italian">
              <option>Bianca</option>
              <option>Carla</option>
              <option>Giorgio</option>
            </optgroup>
            <optgroup label="Japanese">
              <option>Mizuki</option>
              <option>Takumi</option>
            </optgroup>
            <optgroup label="Korean">
              <option>Seoyeon</option>
            </optgroup>
            <optgroup label="Norwegian">
              <option>Liv</option>
            </optgroup>
            <optgroup label="Polish">
              <option>Ewa</option>
              <option>Jacek</option>
              <option>Jan</option>
              <option>Maja</option>
            </optgroup>
            <optgroup label="Portuguese (Brazilian)">
              <option>Camila</option>
              <option>Ricardo</option>
              <option>Vitoria</option>
            </optgroup>
            <optgroup label="Portuguese (European)">
              <option>Cristiano</option>
              <option>Ines</option>
            </optgroup>
            <optgroup label="Romanian">
              <option>Carmen</option>
            </optgroup>
            <optgroup label="Russian">
              <option>Maxim</option>
              <option>Tatyana</option>
            </optgroup>
            <optgroup label="Spanish (European)">
              <option>Conchita</option>
              <option>Enrique</option>
              <option>Lucia</option>
            </optgroup>
            <optgroup label="Spanish (Mexican)">
              <option>Mia</option>
            </optgroup>
            <optgroup label="Spanish (US)">
              <option>Lupe</option>
              <option>Miguel</option>
              <option>Penelope</option>
            </optgroup>
            <optgroup label="Swedish">
              <option>Astrid</option>
            </optgroup>
            <optgroup label="Turkish">
              <option>Filiz</option>
            </optgroup>
            <optgroup label="Welsh">
              <option>Gwyneth</option>
            </optgroup>
          </select>
        </div>

        <!-- Clear text checkbox -->
        <label
          class="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none"
        >
          <input
            v-model="clearText"
            type="checkbox"
            aria-label="Clear text after submitting"
            class="rounded border-input accent-primary"
          />
          Clear text after submitting
        </label>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium px-4 py-2 text-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <LoaderCircleIcon v-if="isLoading" class="h-4 w-4 animate-spin" />
          {{ isLoading ? 'Loading...' : 'Submit' }}
        </button>
      </form>
    </CardContent>
  </Card>
</template>
