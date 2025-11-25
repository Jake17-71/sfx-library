import { getSeriesByGameId, soundLibraryConfig } from '@/modules/soundLibraryConfig.ts'
import { SoundLibraryConfig } from '@/types'
import {
  seriesCreationSelectors,
  seriesCreationStateSelectors,
} from '@/types/seriesCreationTypes.ts'

class SeriesCreation {
  private readonly stateClasses: seriesCreationStateSelectors = {
    liItem: `list__item`,
    seriesItemTitle: `series__item-title`,
    seriesItemButtons: `series__item-buttons`,
    seriesItemButton: `series__item-button`,
    isActive: `is-active`,
}

private readonly selectors: seriesCreationSelectors = {
    seriesList: `[data-js-series-list]`,
}

  private readonly config: SoundLibraryConfig
  private seriesList: HTMLUListElement
  private allSeriesButtons: HTMLButtonElement[]

  constructor() {
    this.config = soundLibraryConfig
    this.seriesList = document.querySelector(this.selectors.seriesList) as HTMLUListElement
    this.allSeriesButtons = []

    this.createAllFranchises(this.config)
  }

  createAllFranchises(config: SoundLibraryConfig): void {
    return config.games.forEach((game) => {
      this.createFranchises(game.id, game.name)
    })
  }

  createFranchises(id: string, name: string): void {
    const li = document.createElement('li')
    li.className = this.stateClasses.liItem

    const title = document.createElement('h2')
    title.classList.add(this.stateClasses.seriesItemTitle, 'h4')
    title.textContent = name
    title.dataset.jsId = id
    this.titleBindEvents(title)

    const buttons = document.createElement('div')
    buttons.className = this.stateClasses.seriesItemButtons

    const franchiseButtons = this.createSeries(id)
    this.allSeriesButtons.push(...franchiseButtons)
    franchiseButtons.forEach(button => buttons.appendChild(button))

    li.appendChild(title)
    li.appendChild(buttons)

    this.seriesList.appendChild(li)
  }

  createSeries(id: string): HTMLButtonElement[] {
    const series = getSeriesByGameId(id)

    const franchiseButtons: HTMLButtonElement[] = []

    series.forEach(series => {
      const id = series.id
      const name = series.name

      const button = document.createElement('button')
      button.classList.add(this.stateClasses.seriesItemButton, 'button--text')
      button.textContent = name
      button.dataset.jsId = id

      this.bindButtonEvent(button)

      franchiseButtons.push(button)
    })

    return franchiseButtons
  }

  titleBindEvents(title: HTMLHeadingElement): void {
    title.addEventListener('click', () => {
      title.classList.toggle(this.stateClasses.isActive)
    })
  }

  bindButtonEvent(button: HTMLButtonElement): void {
    button.addEventListener('click', () => {
      const seriesId = button.dataset.jsId as string

      this.displaySoundsForSeries(seriesId)

      this.allSeriesButtons.forEach(btn => btn.classList.remove(this.stateClasses.isActive))

      button.classList.add(this.stateClasses.isActive)
    })
  }

  displaySoundsForSeries(seriesId: string): void {
    console.log('Displaying sounds for series:', seriesId)
  }
}

export default SeriesCreation