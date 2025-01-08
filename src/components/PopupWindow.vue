<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
const props = defineProps({
  header: String,
  text: String,
  yes: {
    type: Boolean,
    default: false
  },
  confirm: {
    type: Boolean,
    default: false
  },
  ok: {
    type: Boolean,
    default: false
  }
})

const buttonsOptions = {
  yesNoButtons: [{ returnValue: true, text: 'Yes' }, { returnValue: false, text: 'No' }],
  confirmCancelButtons: [{ returnValue: true, text: 'Confirm' }, { returnValue: false, text: 'Cancel' }],
  okButton: [{ returnValue: true, text: 'OK' }]
}

type ButtonsGroup = ComputedRef<keyof typeof buttonsOptions>

const buttonsGroup: ButtonsGroup = computed(() => props.ok ? 'okButton' : props.yes ? 'yesNoButtons' : 'confirmCancelButtons') as ButtonsGroup

const buttons = computed(() => buttonsOptions[buttonsGroup.value])

const open = defineModel('open')
const response = defineModel('response')

function updateReurnValue(val: boolean) {
  response.value = val
  open.value = false
}
</script>

<template>
  <div>
    <div class="shadow-win"></div>
    <div class="popup-win">
      <h3>{{ props.header }}</h3>
      <p>{{ props.text }}</p>
      <div class="actions">
        <button v-for="(button, index) in buttons" :key="index" @click="updateReurnValue(button.returnValue)">{{ button.text }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-win {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0007;
  z-index: 10;
}

.popup-win {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 16px 24px;
  transform: translate(-50%, -50%);
  border: solid 1px #ddd;
  border-radius: 4px;
  background: var(--vt-c-white-mute);
  box-shadow: 4px 4px 8px #0005;
  z-index: 11;
}

.popup-win h3 {
  text-align: center;
  color: var(--vt-c-green);
  font-weight: bold;
  margin-bottom: 24px;
}

.popup-win .actions {
  text-align: center;
}

.popup-win .actions button {
  border: solid 1px var(--vt-c-green-light);
  color: var(--vt-c-green-dark);
  margin: 24px 8px 4px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.popup-win .actions button:hover {
  border: solid 1px var(--vt-c-green);
  color: var(--vt-c-green);
  font-weight: bold;
}
</style>
