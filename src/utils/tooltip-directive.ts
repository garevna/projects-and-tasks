import type { Directive, DirectiveBinding } from 'vue'

const tooltip: HTMLDivElement = document.body.appendChild(document.createElement('div'))

function onMouseEnter(tooltip: HTMLDivElement, event: MouseEvent) {
  const elem = event.target as HTMLElement
  const rect = elem.getBoundingClientRect()
  const left = rect.left - rect.width + window.scrollX - 8

  Object.assign(tooltip.style, {
    position: 'absolute',
    borderRadius: '4px',
    left: `${left}px`,
    top: `${rect.bottom + window.scrollY}px`,
    display: 'block',
  })

  tooltip.innerText = elem.ariaDescription as string
}

function onMouseLeave(tooltip: HTMLDivElement) {
  Object.assign(tooltip.style, { display: 'none' })
}

export const tooltipDirective: Directive<HTMLDivElement> = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.ariaDescription = binding.value.text
    const { background = '#ddd', color = '#555', border = '1px solid #bbb' } = binding.value
    Object.assign(tooltip.style, {
      background,
      color,
      border,
      padding: '4px 8px',
      fontSize: '12px',
      display: 'none',
    })

    Object.assign(el, {
      onmouseenter: onMouseEnter.bind(null, tooltip),
      onmouseleave: onMouseLeave.bind(null, tooltip),
      onclick: onMouseLeave.bind(null, tooltip),
    })
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    el.ariaDescription = binding.value.text
  },
}
