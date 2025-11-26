import { cardsSelectors, cardsStateSelectors } from '@/types/cardsTypes.ts'
import { getSoundsBySeries, getSeriesById } from '@/modules/soundLibraryConfig.ts'
import { GameSeries, SoundItem } from '@/types'

class Cards {
  private readonly stateClasses: cardsStateSelectors = {
    liItem: `list__item`,
    soundDiv: `sound`,
    soundImageWrapper: `sound__image-wrapper`,
    soundImage: `sound__image`,
    soundPlayButton: `sound__play-button`,
    soundTitle: `sound__title`,
    soundDownloadButton: `sound__download-button`,
    soundDuration: `sound__duration`,
    soundWaveformWrapper: `sound__waveform-wrapper`,
    isActive: `is-active`,
  }

  private readonly selectors: cardsSelectors = {
    soundsList: `[data-js-sounds-list]`,
  }

  private soundsList: HTMLUListElement

  constructor() {
    this.soundsList = document.querySelector(
      this.selectors.soundsList
    ) as HTMLUListElement
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  displaySoundsForSeries(seriesId: string): void {
    this.soundsList.innerHTML = ''

    const sounds: SoundItem[] = getSoundsBySeries(seriesId)
    const series: GameSeries = getSeriesById(seriesId) as GameSeries

    sounds.forEach((sound: SoundItem) => {
      const liElement = this.createSoundLiElement()

      const soundElement = this.createSoundCard(sound, series.image)

      liElement.appendChild(soundElement)

      this.soundsList.appendChild(liElement)
    })
  }

  createSoundLiElement(): HTMLLIElement {
    const li = document.createElement('li')
    li.className = this.stateClasses.liItem
    return li
  }

  createSoundCard(sound: SoundItem, seriesImage?: string): HTMLDivElement {
    const { id, name, duration } = sound

    const soundDiv = this.createSoundDiv(id)

    const imageWrapper = this.createImageWrapper()

    const image = this.createImage(name, seriesImage)

    imageWrapper.appendChild(image)

    const buttonPlay = this.createButtonPlay(id, sound)

    const title = this.createTitle(name)

    const buttonDownload = this.createButtonDownload(id, sound)

    const durationElement = this.createDuration(duration)

    const waveformWrapper = this.createWaveformWrapper()

    soundDiv.appendChild(imageWrapper)
    soundDiv.appendChild(buttonPlay)
    soundDiv.appendChild(title)
    soundDiv.appendChild(buttonDownload)
    soundDiv.appendChild(durationElement)
    soundDiv.appendChild(waveformWrapper)

    return soundDiv
  }

  createSoundDiv(id: string): HTMLDivElement {
    const soundDiv = document.createElement('div')
    soundDiv.className = this.stateClasses.soundDiv
    soundDiv.dataset.jsSoundId = id

    return soundDiv
  }

  createImageWrapper(): HTMLDivElement {
    const imageWrapper = document.createElement('div')
    imageWrapper.className = this.stateClasses.soundImageWrapper

    return imageWrapper
  }

  createImage(name: string, seriesImage?: string): HTMLImageElement {
    const image = document.createElement('img')
    image.className = this.stateClasses.soundImage
    image.src = '/sfx-library' + (seriesImage || "audio-player-image.png")
    image.alt = name
    image.width = 90
    image.height = 90
    image.loading = 'lazy'

    return image
  }

  createButtonPlay(id: string, sound: SoundItem): HTMLButtonElement {
    const buttonPlay = document.createElement('button')
    buttonPlay.classList.add(this.stateClasses.soundPlayButton, 'button--play')
    buttonPlay.dataset.jsSoundId = id

    buttonPlay.addEventListener('click', () => this.playSound(sound, buttonPlay))

    return buttonPlay
  }

  createTitle(name: string): HTMLHeadingElement {
    const title = document.createElement('h5')
    title.classList.add(this.stateClasses.soundTitle, 'h4')
    title.textContent = name

    return title
  }

  createButtonDownload(id: string, sound: SoundItem): HTMLButtonElement {
    const buttonDownload = document.createElement('button')
    buttonDownload.classList.add(this.stateClasses.soundDownloadButton, 'button--download')
    buttonDownload.dataset.jsSoundId = id
    buttonDownload.textContent = 'Загрузить'

    buttonDownload.addEventListener('click', () => this.downloadSound(sound))

    return buttonDownload
  }

  createDuration(duration: number): HTMLParagraphElement {
    const durationElement = document.createElement('p')
    durationElement.className = this.stateClasses.soundDuration
    durationElement.textContent = this.formatDuration(duration)

    return durationElement
  }

  createWaveformWrapper(): HTMLDivElement {
    const waveformWrapper = document.createElement('div')
    waveformWrapper.className = this.stateClasses.soundWaveformWrapper

    return waveformWrapper
  }

  playSound(sound: SoundItem, buttonPlay: HTMLButtonElement): void {
    console.log('play sound', sound, 'buttonPlay', buttonPlay)
  }

  downloadSound(sound: SoundItem): void {
    const { audioPath, fileName } = sound

   const path = `/sfx-library${audioPath}`

    const  link = document.createElement('a')
    link.href = path
    link.download = fileName

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export default Cards