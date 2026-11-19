<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { LoaderCircleIcon } from '@lucide/vue'
import { fetchSpeech, downloadSpeech } from '../../composables/useStreamlabs'
import { useTtsStore } from '../../stores/tts'
import Card from '../ui/Card.vue'
import CardHeader from '../ui/CardHeader.vue'
import CardContent from '../ui/CardContent.vue'
import Label from '../ui/Label.vue'
import Textarea from '../ui/Textarea.vue'
import Select from '../ui/Select.vue'
import Checkbox from '../ui/Checkbox.vue'
import Button from '../ui/Button.vue'

const store = useTtsStore()

const TEXT_MAX_LENGTH = 500
const DEFAULT_VOICE = 'Brian'
const RATE_LIMIT_SECONDS = 60

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

// Rate-limit countdown: ticks once a second while the store says we're limited.
const now = ref(Date.now())
const ticker = setInterval(() => (now.value = Date.now()), 1000)
onUnmounted(() => clearInterval(ticker))
const cooldownSeconds = computed(() =>
  Math.max(0, Math.ceil((store.rateLimitedUntil - now.value) / 1000))
)

watch([text, voice], () => {
  localStorage.setItem('voiceText', JSON.stringify({ text: text.value, voice: voice.value }))
})

async function handleSubmit() {
  if (isLoading.value || cooldownSeconds.value > 0) return

  if (!text.value.trim()) {
    store.setError({ error: 'Oops..', message: 'You need to fill in some text.' })
    return
  }

  const submitText = text.value
  const submitVoice = voice.value

  isLoading.value = true
  try {
    const result = await fetchSpeech(submitVoice, submitText)
    if (!result.speakUrl) {
      if (result.rateLimited) {
        store.setRateLimited(RATE_LIMIT_SECONDS)
        now.value = Date.now()
      }
      store.setError(result.error)
      return
    }

    let audio
    try {
      audio = await downloadSpeech(result.speakUrl)
    } catch (err) {
      console.error('[download_speech] error:', err)
      store.setError({
        error: 'Oops..',
        message: 'The speech was generated but could not be downloaded.',
      })
      return
    }

    await store.addResult(submitVoice, submitText, audio)
    // Only clear once it succeeded, so a failed request doesn't lose the text.
    if (clearText.value && text.value === submitText) text.value = ''
  } finally {
    isLoading.value = false
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
    <CardHeader>
      <h2 class="text-xl font-semibold tracking-tight">Text to Speech</h2>
      <p class="text-sm text-muted-foreground">
        Enter your text and select a voice to generate speech
      </p>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
        <!-- Textarea -->
        <div class="flex flex-col gap-2">
          <div class="flex items-baseline justify-between">
            <Label for="text">Message</Label>
            <span class="text-xs text-muted-foreground"
              >{{ charCount }} / {{ TEXT_MAX_LENGTH }}</span
            >
          </div>
          <Textarea
            id="text"
            v-model="text"
            :maxlength="TEXT_MAX_LENGTH"
            :rows="6"
            placeholder="Type your text here..."
            @keydown="onKeyDown"
            @keyup="onKeyUp"
          />
          <p class="text-xs text-muted-foreground">
            Press <kbd class="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Enter</kbd> to
            submit, or
            <kbd class="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Shift</kbd> +
            <kbd class="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">Enter</kbd> for a new
            line
          </p>
        </div>

        <!-- Voice select -->
        <div class="flex flex-col gap-2">
          <Label for="voice">Voice</Label>
          <Select id="voice" v-model="voice">
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
          </Select>
        </div>

        <!-- Clear text checkbox -->
        <Checkbox id="clearText" v-model="clearText"> Clear text after submitting </Checkbox>

        <!-- Submit button -->
        <Button type="submit" :disabled="isLoading || cooldownSeconds > 0" class="w-full">
          <LoaderCircleIcon v-if="isLoading" class="h-4 w-4 animate-spin" />
          <template v-if="isLoading">Generating...</template>
          <template v-else-if="cooldownSeconds > 0"
            >Rate limited, try again in {{ cooldownSeconds }}s</template
          >
          <template v-else>Generate speech</template>
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
