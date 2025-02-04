<script setup lang="ts">
import type { Reactive, Ref } from 'vue'
import { computed, inject, ref } from 'vue'

import { injectionKeyForCurrent, injectionKeyForNext } from '@/composables'
import { mainMenuItems, submenuItems } from '@/configs'
import type { GoTo, Route } from '@/types'

import IconSet from './IconSet.vue'

const save = defineModel('save', { default: false })
const create = defineModel('create', { default: false })

const current = inject(injectionKeyForCurrent) as Reactive<GoTo>
const next = inject(injectionKeyForNext) as Reactive<GoTo>

const show = ref(false)
const clickedMenuItemIndex: Ref<number | null> = ref(null)

const submenuOptions = computed(() =>
  clickedMenuItemIndex.value !== null ? submenuItems[clickedMenuItemIndex.value] : null,
)

function showMainMenu() {
  show.value = !show.value
}

function menuClickHandler(index: number) {
  if (submenuItems[index]?.length) {
    clickedMenuItemIndex.value = index
  } else {
    next.route = mainMenuItems[index] as Route
    clickedMenuItemIndex.value = null
    show.value = false
  }
}

function submenuClickHandler(item: string) {
  next.route = (
    clickedMenuItemIndex.value !== null ? mainMenuItems[clickedMenuItemIndex.value] : next.route
  ) as Route
  const value = item.toLowerCase().replace(' ', '-')

  next.subroute =
    next.route !== 'Task' && value.startsWith('all')
      ? '/'
      : next.route === 'Task' && ['behind-schedule', 'must-be-finished-today'].includes(value)
        ? `?state=${value}`
        : `?status=${value}`
  clickedMenuItemIndex.value = null
  show.value = false
}

function close() {
  clickedMenuItemIndex.value = null
  show.value = false
}

function getMenuItemClass(menuItem: string): string {
  let classList: string = 'main-menu-item'
  if (menuItem === current.route) {
    classList += ' main-menu-item-selected'
  }
  if (clickedMenuItemIndex.value === mainMenuItems.indexOf(menuItem)) {
    classList += ' clicked-menu-item'
  }
  return classList
}

function createNewRecord() {
  create.value = true
  show.value = false
}
function saveRecords() {
  save.value = true
  show.value = false
}
</script>

<template>
  <div class="header">
    <div class="main-menu-panel" v-click-outside="close">
      <button class="main-menu-button" @click="showMainMenu"></button>
      <span v-for="(option, index) in mainMenuItems" :key="index">
        <Transition name="list">
          <button v-if="show" :class="getMenuItemClass(option)" @click="menuClickHandler(index)">
            <span>{{ option }}</span>
            <Transition name="list-down">
              <div class="submenu" v-if="clickedMenuItemIndex === index && submenuOptions">
                <div
                  v-for="(item, num) in submenuOptions"
                  :key="num"
                  @click="submenuClickHandler(item)"
                  class="submenu-option"
                >
                  <div :class="item === current.subroute ? 'submenu-option-selected' : ''">
                    {{ item }}
                  </div>
                </div>
              </div>
            </Transition>
          </button>
        </Transition>
      </span>
    </div>
    <figure class="table-caption">
      <button
        @click="createNewRecord"
        class="add-new-record"
        v-tooltip="{ text: 'Create new one' }"
      >
        <IconSet iconName="add" :iconSize="28" />
      </button>
      <button @click="saveRecords" class="save-button" v-tooltip="{ text: 'Save | Update' }">
        <IconSet iconName="save" :iconSize="28" />
      </button>
    </figure>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 16px;
  background: var(--vt-c-white-soft);
  width: 100vw;
  max-width: 960px;
  height: 36px;
  z-index: 15;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.header figure {
  justify-self: flex-end;
  margin-right: 36px;
}
.main-menu-panel {
  display: grid;
  grid-template-columns: 60px 88px 70px 100px;
  align-items: center;
  justify-items: center;
  transition: all 0.5s;
}
.main-menu-button:hover {
  border-radius: 4px;
  border: solid 1px var(--vt-c-white-mute);
  background-color: var(--vt-c-green-dark-opacity);
  background-image: url(@/assets/main-menu-white.svg);
  color: var(--vt-c-white-mute);
}
.main-menu-button {
  width: 32px;
  height: 32px;
  margin-left: 8px;
  margin-right: 12px;
  border: none;
  background-color: transparent;
  background-image: url(@/assets/main-menu-green.svg);
  background-position: center center;
  background-size: 28px;
  cursor: pointer;
}
.main-menu-item,
.clicked-menu-item,
.main-menu-item-selected {
  width: fit-content;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vt-c-green-light);
  padding: 0 12px;
}

.menu-item:after,
.main-menu-item-selected:after,
.clicked-menu-item:after {
  content: '';
  font-size: 11px;
  margin-left: 4px;
}

.clicked-menu-item:after {
  content: '▼';
}

.main-menu-item:hover {
  color: var(--vt-c-green-dark);
}

.main-menu-item-selected {
  font-weight: bold;
}

.submenu {
  position: absolute;
  top: 28px;
  text-align: left;
  z-index: 16;
  background: #eee;
  padding: 4px 8px;
  border: solid 1px #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 4px #0005;
}
.submenu-option {
  padding: 8px;
  font-weight: normal;
}
.submenu-option:hover {
  color: var(--vt-c-white-soft);
  background: var(--vt-c-green-dark-opacity);
}

.submenu-option-selected {
  font-weight: bold;
}

.submenu-option:not(:last-child) {
  border-bottom: solid 1px #ddd;
}

.list-enter-active,
.list-leave-active,
.list-down-enter-active,
.list-down-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-36px);
}
.list-down-enter-from,
.list-down-leave-to {
  opacity: 0;
  transform: translateY(-64px);
}

button {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 48px;
}
</style>
