<script setup lang="ts">
const model = defineModel({ default: 'Drag' })
</script>

<template>
  <div class="button b2" id="switch-button">
    <input type="checkbox" class="checkbox" :checked="model !== 'Drag'" />
    <div class="knobs">
      <span>DRAG</span>
    </div>
    <div class="layer"></div>
  </div>
</template>

<style scoped>
.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.button {
  position: relative;
  width: 132px;
  height: 36px;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

.button.b2 {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  background-color: var(--vt-c-green-soft);
  transition: 0.3s ease all;
  border-radius: 4px;
  z-index: 1;
}

#switch-button .knobs:before,
#switch-button .knobs:after,
#switch-button .knobs span {
  position: absolute;
  top: 2px;
  width: 60px;
  height: 16px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 8px 0px 12px;
  border-radius: 4px;
  transition: 0.3s ease all;
}

#switch-button .knobs:before {
  content: '';
  left: 0;
  top: 0;
  height: 36px;
  width: 68px;
  background-color: var(--vt-c-green);
}

#switch-button .knobs:after {
  content: 'EDIT';
  right: 0;
  color: var(--vt-c-black-mute);
}

#switch-button .knobs span {
  display: inline-block;
  left: 4px;
  color: var(--vt-c-white);
  z-index: 1;
}

#switch-button .checkbox:checked + .knobs span {
  color: var(--vt-c-black-mute);
}

#switch-button:hover .knobs:after,
#switch-button:hover .checkbox:checked + .knobs span {
  color: var(--vt-c-green-dark);
}

#switch-button .checkbox:checked + .knobs:before {
  left: 66px;
  background-color: var(--vt-c-green-light);
}

#switch-button .checkbox:checked + .knobs:after {
  color: var(--vt-c-white);
}
</style>
