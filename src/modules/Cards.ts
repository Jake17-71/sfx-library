import { cardsSelectors, cardsStateSelectors } from '@/types/cardsTypes.ts'
import { getSoundsBySeries, getSeriesById } from '@/modules/soundLibraryConfig.ts'
import { GameSeries, Message, SoundItem } from '@/types'
import AlertCollection from '@/modules/Alert.ts'
import WaveformManager from '@/modules/WaveformManager.ts'
import { formatDuration } from '@/utils/formatDuration.ts'
import Player from '@/modules/Player.ts'

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
  private readonly alert: AlertCollection
  private readonly waveformManager: WaveformManager
  private player: Player | null = null
  private currentSounds: Map<string, SoundItem> = new Map()

  constructor() {
    this.soundsList = document.querySelector(
      this.selectors.soundsList
    ) as HTMLUListElement
    this.alert = new AlertCollection()
    this.waveformManager = new WaveformManager()
  }

  setPlayer(player: Player): void {
    this.player = player
  }

  getWaveformManager(): WaveformManager {
    return this.waveformManager
  }

  getCurrentSounds(): SoundItem[] {
    return Array.from(this.currentSounds.values())
  }

  addEmptyMessage(): void {
    const emptyMessage = document.createElement('li')
    emptyMessage.classList.add('empty-message')
    emptyMessage.innerHTML ='В данной серии игр пока что нет sfx-эффектов :('

    this.soundsList.appendChild(emptyMessage)
  }

  displaySoundsForSeries(seriesId: string): void {
    this.waveformManager.destroyAll()

    this.soundsList.innerHTML = ''
    this.currentSounds.clear()

    if (this.player) {
      this.player.updatePlayButtonState(false)
    }

    const sounds: SoundItem[] = getSoundsBySeries(seriesId)
    const series: GameSeries = getSeriesById(seriesId) as GameSeries

    if (sounds.length === 0) {
      this.addEmptyMessage()
      if (this.player) {
        this.player.resetPlayerState()
      }
      return
    }

    sounds.forEach((sound: SoundItem) => {
      this.currentSounds.set(sound.id, sound)

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
    const { id, name, audioPath, duration } = sound

    const soundDiv = this.createSoundDiv(id)

    const imageWrapper = this.createImageWrapper()

    const image = this.createImage(name, seriesImage)

    imageWrapper.appendChild(image)

    const buttonPlay = this.createButtonPlay(id, sound)

    const title = this.createTitle(name)

    const buttonDownload = this.createButtonDownload(id, sound)

    const durationElement = this.createDuration(duration)

    const waveformWrapper = this.createWaveformWrapper(id, audioPath)

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
    image.src = '/sfx-library' + (seriesImage || 'audio-player-image.png')
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
    title.title = name

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
    durationElement.textContent = formatDuration(duration)

    return durationElement
  }

  createWaveformWrapper(soundId: string, audioPath: string): HTMLDivElement {
    const waveformWrapper = document.createElement('div')
    waveformWrapper.className = this.stateClasses.soundWaveformWrapper
    waveformWrapper.id = `waveform-${soundId}`

    this.waveformManager.createWaveform({
      soundId,
      audioPath,
      containerId: `waveform-${soundId}`,
      callbacks: {
        onPlay: (id) => this.onWaveSurferPlay(id),
        onPause: (id) => this.onWaveSurferPause(id),
        onFinish: (id) => this.onWaveSurferFinish(id),
        onTimeUpdate: (id, currentTime) => this.onWaveSurferTimeUpdate(id, currentTime),
      },
    })

    return waveformWrapper
  }

  playSound(sound: SoundItem, buttonPlay: HTMLButtonElement): void {
    this.waveformManager.setVolume(sound.id, 0.65)
    this.waveformManager.playPause(sound.id)

    if (this.waveformManager.isPlaying(sound.id)) {
      buttonPlay.classList.add(this.stateClasses.isActive)
    } else {
      buttonPlay.classList.remove(this.stateClasses.isActive)
    }
  }

  onWaveSurferPlay(soundId: string): void {
    const buttonPlay = document.querySelector(`[data-js-sound-id="${soundId}"].${this.stateClasses.soundPlayButton}`) as HTMLButtonElement

    if (buttonPlay) {
      buttonPlay.classList.add(this.stateClasses.isActive)
    }

    if (this.player) {
      const soundInfo = this.currentSounds.get(soundId)
      this.player.setCurrentSound(soundId, soundInfo)
      this.player.updatePlayButtonState(true)
    }
  }

  onWaveSurferPause(soundId: string): void {
    const buttonPlay = document.querySelector(`[data-js-sound-id="${soundId}"].${this.stateClasses.soundPlayButton}`) as HTMLButtonElement

    if (buttonPlay) {
      buttonPlay.classList.remove(this.stateClasses.isActive)
    }

    if (this.player) {
      this.player.setCurrentSound(soundId)
      this.player.updatePlayButtonState(false)
    }
  }

  onWaveSurferFinish(soundId: string): void {
    const buttonPlay = document.querySelector(`[data-js-sound-id="${soundId}"].${this.stateClasses.soundPlayButton}`) as HTMLButtonElement

    if (buttonPlay) {
      buttonPlay.classList.remove(this.stateClasses.isActive)
    }

    if (this.player) {
      const duration = this.waveformManager.getDuration(soundId)
      if (duration > 0) {
        this.player.updateProgress(duration)
      }
      this.player.updatePlayButtonState(false)
    }
  }

  onWaveSurferTimeUpdate(soundId: string, currentTime: number): void {
    if (this.player && this.waveformManager.getCurrentPlayingId() === soundId) {
      this.player.updateProgress(currentTime)
    }
  }

  downloadSound(sound: SoundItem): void {
    const { audioPath, fileName } = sound

    const path = `/sfx-library${audioPath}`

    try {
      const link = document.createElement('a')
      link.href = path
      link.download = fileName

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch (error) {
      const message: Message =
        error instanceof Error
          ? error.message
          : 'Произошла неизвестная ошибка. Попробуйте еще раз.'
      this.alert.showError(message)
    }
  }
}

export default Cards