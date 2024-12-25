import type { Ref } from 'vue'

type Binding = {
  text: string
  background: string | null
  color: string | null
  border: string | null
}

function onMouseEnter(tooltip: HTMLDivElement, event: MouseEvent) {
  const elem = event.target as HTMLElement
  const rect = elem.getBoundingClientRect()
  const left = rect.left - elem.offsetWidth + window.scrollX - 8

  Object.assign(tooltip.style, {
    position: 'absolute',
    borderRadius: '4px',
    left: `${left}px`,
    top: `${rect.bottom + window.scrollY}px`,
    display: 'block',
  })
}

function onMouseLeave(tooltip: HTMLDivElement) {
  Object.assign(tooltip.style, { display: 'none' })
}

export const tooltipDirective = {
  beforeMount(el: HTMLElement, binding: Ref<Binding>) {
    const tooltip: HTMLDivElement = document.body.appendChild(document.createElement('div'))
    const { background = '#ddd', color = '#555', border = '1px solid #bbb' } = binding.value
    tooltip.innerText = binding.value.text
    Object.assign(tooltip.style, {
      background,
      color,
      border,
      padding: '4px 8px',
      fontSize: '14px',
      display: 'none',
    })

    Object.assign(el, {
      onmouseenter: onMouseEnter.bind(null, tooltip),
      onmouseleave: onMouseLeave.bind(null, tooltip),
      onclick: onMouseLeave.bind(null, tooltip),
    })
  },

  beforeUnmount(tooltip: HTMLDivElement) {
    tooltip.remove()
  },
}
