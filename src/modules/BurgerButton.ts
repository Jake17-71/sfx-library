import { BurgerButtonSelectors, BurgerButtonStateClasses } from '@/types'

class BurgerButton {
  private readonly selectors: BurgerButtonSelectors = {
    burgerButton: `[data-js-burger-button]`,
    seriesSection: `[data-js-series]`,
  }

  private readonly stateClasses: BurgerButtonStateClasses = {
    isActive: 'is-active',
  }

  private burgerButton: HTMLButtonElement
  private seriesSection: HTMLElement

  constructor() {
    this.burgerButton = document.querySelector(this.selectors.burgerButton) as HTMLButtonElement
    this.seriesSection = document.querySelector(this.selectors.seriesSection) as HTMLElement

    this.bindEvents()
  }

  toggle(): void {
    this.burgerButton.classList.toggle(this.stateClasses.isActive)
    this.seriesSection.classList.toggle(this.stateClasses.isActive)
  }

  onBurgerButtonClick(): void {
    this.toggle()
  }

  onSeriesSectionClick(e: PointerEvent): void {
    if (this.burgerButton.contains(e.target as Node)) {return}

    const rect = this.seriesSection.getBoundingClientRect()
    const isClickOutside = (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    )

    if (isClickOutside && this.seriesSection.classList.contains(this.stateClasses.isActive)) {
      this.toggle()
    }
  }

  bindEvents(): void {
    this.burgerButton.addEventListener('click', () => this.onBurgerButtonClick())
    document.addEventListener('click', (e: PointerEvent) => this.onSeriesSectionClick(e))
  }
}

export default BurgerButton