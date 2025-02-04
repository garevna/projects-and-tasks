import type { Directive, DirectiveBinding } from 'vue'

// const tooltip: HTMLDivElement = document.body.appendChild(document.createElement('div'))

// function onMouseEnter(tooltip: HTMLDivElement, event: MouseEvent) {
//   const elem = event.target as HTMLElement
//   const rect = elem.getBoundingClientRect()
//   const left = rect.left - rect.width + window.scrollX - 8

//   Object.assign(tooltip.style, {
//     position: 'absolute',
//     borderRadius: '4px',
//     left: `${left}px`,
//     top: `${rect.bottom + window.scrollY}px`,
//     display: 'block',
//   })

//   tooltip.innerText = elem.ariaDescription as string
// }

// function onMouseLeave(tooltip: HTMLDivElement) {
//   Object.assign(tooltip.style, { display: 'none' })
// }

interface ExtendedElement extends HTMLElement {
  onClickOutside: (event: Event) => void
}

// function clickOutsideEventHandler (el: ExtendedElement, binding: DirectiveBinding, event: Event): void {
//   const target = event.target as ExtendedElement
//   if (!(el === target || el.contains(target))) {
//     binding.value(event)
//   }
// }

export const clickOutsideDirective: Directive<HTMLElement> = {
  beforeMount(el, binding) {
    const elem = el as ExtendedElement
    elem.onClickOutside = function (
      el: ExtendedElement,
      binding: DirectiveBinding,
      event: Event,
    ): void {
      const target = event.target as ExtendedElement
      if (!(el === target || el.contains(target))) {
        binding.value(event)
      }
    }.bind(elem, elem, binding)

    document.addEventListener('click', elem.onClickOutside)
  },
  unmounted(el: HTMLElement) {
    const elem = el as ExtendedElement
    document.removeEventListener('click', elem.onClickOutside)
  },
}
