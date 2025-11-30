import { PlayerSelectors } from '@/types/playerTypes.ts'
import { getFranchiseImageBySeriesId, getSeriesNameById, getSoundsBySeries } from './soundLibraryConfig.ts'
import { formatDuration } from '@/utils/formatDuration.ts'
import WaveformManager from '@/modules/WaveformManager.ts'
import { SoundItem } from '@/types'
import Cards from '@/modules/Cards.ts'
import { SOUND_ICON, SOUND_MUTED_ICON, DEFAULT_VOLUME } from '@/constants/playerConstants.ts'

class Player {

  private readonly selectors: PlayerSelectors = {
    playerImage: `[data-js-audio-player-image]`,
    gameTitle: `[data-js-audio-player-game-title]`,
    soundTitle: `[data-js-audio-player-sound-title]`,
    buttonPrev: `[data-js-audio-player-button-prev]`,
    buttonNext: `[data-js-audio-player-button-next]`,
    buttonPlay: `[data-js-audio-player-button-play]`,
    currentTime: `[data-js-audio-player-current-time]`,
    fullTime: `[data-js-audio-player-full-time]`,
    progressInput: `[data-js-audio-player-progress-input]`,
    progressFill: `[data-js-audio-player-progress-fill]`,
    volumeButton: `[data-js-audio-player-volume-button]`,
    volumeInput: `[data-js-audio-player-volume-input]`,
    volumeFill: `[data-js-audio-player-volume-fill]`,
  }

  private playerImage: HTMLImageElement
  private gameTitle: HTMLHeadingElement
  private soundTitle: HTMLHeadingElement
  private buttonPrev: HTMLButtonElement
  private buttonNext: HTMLButtonElement
  private buttonPlay: HTMLButtonElement
  private currentTime: HTMLSpanElement
  private fullTime: HTMLSpanElement
  private progressInput: HTMLInputElement
  private progressFill: HTMLDivElement
  private volumeButton: HTMLButtonElement
  private volumeInput: HTMLInputElement
  private volumeFill: HTMLDivElement
  private waveformManager: WaveformManager | null = null
  private currentSoundId: string | null = null
  private cards: Cards | null = null
  private isMuted: boolean = false
  private currentVolume: number = DEFAULT_VOLUME
  private maxVolume: number = 100

  constructor(waveformManager?: WaveformManager) {
    this.playerImage = document.querySelector(this.selectors.playerImage) as HTMLImageElement
    this.gameTitle = document.querySelector(this.selectors.gameTitle) as HTMLHeadingElement
    this.soundTitle = document.querySelector(this.selectors.soundTitle) as HTMLHeadingElement
    this.buttonPrev = document.querySelector(this.selectors.buttonPrev) as HTMLButtonElement
    this.buttonNext = document.querySelector(this.selectors.buttonNext) as HTMLButtonElement
    this.buttonPlay = document.querySelector(this.selectors.buttonPlay) as HTMLButtonElement
    this.currentTime = document.querySelector(this.selectors.currentTime) as HTMLSpanElement
    this.fullTime = document.querySelector(this.selectors.fullTime) as HTMLSpanElement
    this.progressInput = document.querySelector(this.selectors.progressInput) as HTMLInputElement
    this.progressFill = document.querySelector(this.selectors.progressFill) as HTMLDivElement
    this.volumeButton = document.querySelector(this.selectors.volumeButton) as HTMLButtonElement
    this.volumeInput = document.querySelector(this.selectors.volumeInput) as HTMLInputElement
    this.volumeFill = document.querySelector(this.selectors.volumeFill) as HTMLDivElement

    if (waveformManager) {
      this.waveformManager = waveformManager
    }

    this.maxVolume = parseFloat(this.volumeInput.max)

    this.bindEventControlButtons()
    this.bindVolumeEvents()
    this.updateVolumeIcon()
    this.initializeVolume()
  }

  setCards(cards: Cards): void {
    this.cards = cards
  }

  updatePlayerImage(seriesId: string): void {
    this.playerImage.src = '/sfx-library' + `${getFranchiseImageBySeriesId(seriesId)}`
  }

  updateGameTitle(seriesId: string): void {
    this.gameTitle.textContent = getSeriesNameById(seriesId)
  }

  updateSoundInfo(seriesId: string): void {
    const sounds = getSoundsBySeries(seriesId)
    const firstSound = sounds[0]

    this.soundTitle.textContent = firstSound?.name || 'Untitled'
    this.currentSoundId = firstSound?.id || null

    this.updateDurationAndProgress(firstSound?.duration)
  }

  // Updates the progress bar and current time display
  updateProgress(currentTime: number): void {
    this.currentTime.textContent = formatDuration(currentTime)
    this.progressInput.value = currentTime.toString()

    const maxDuration = this.getMaxDuration()
    const percentage = maxDuration > 0 ? (currentTime / maxDuration) * 100 : 0
    this.progressFill.style.width = `${percentage}%`
  }

  getMaxDuration(): number {
    return parseFloat(this.progressInput.max)
  }

  bindEventControlButtons(): void {
    this.buttonPlay.addEventListener('click', () => {
      if (this.currentSoundId && this.waveformManager) {
        this.waveformManager.playPause(this.currentSoundId)
      }
    })

    this.buttonPrev.addEventListener('click', () => {
      this.playPrev()
    })

    this.buttonNext.addEventListener('click', () => {
      this.playNext()
    })

    this.progressInput.addEventListener('input', () => {
      this.handleProgressChange()
    })
  }

  // Handle progress input change to seek audio
  handleProgressChange(): void {
    if (!this.currentSoundId || !this.waveformManager) {
      return
    }

    const seekTime = parseFloat(this.progressInput.value)
    this.updateProgress(seekTime)
    this.waveformManager.seekTo(this.currentSoundId, seekTime)
  }

  updatePlayButtonState(isPlaying: boolean): void {
    if (isPlaying) {
      this.buttonPlay.classList.add('is-active')
    } else {
      this.buttonPlay.classList.remove('is-active')
    }
  }

  // Method to be called from Cards when a sound is played
  setCurrentSound(soundId: string, soundInfo?: SoundItem): void {
    this.currentSoundId = soundId

    if (soundInfo) {
      this.updateCurrentSoundInfo(soundInfo)
    }
  }

  // Reset player state when switching to series with no sounds
  resetPlayerState(): void {
    this.currentSoundId = null
    this.buttonPlay.classList.remove('is-active')
    this.resetProgressDisplay()
  }

  // Resets the progress bar and time display to initial state
  resetProgressDisplay(): void {
    this.currentTime.textContent = '0:00'
    this.progressInput.value = '0'
    this.progressFill.style.width = '0%'
  }

  // Updates the duration display and max value, then resets progress
  updateDurationAndProgress(duration?: number): void {
    if (duration !== undefined && duration > 0) {
      this.fullTime.textContent = formatDuration(duration)
      this.progressInput.max = duration.toString()
    } else {
      this.fullTime.textContent = '0:00'
      this.progressInput.max = '0'
    }

    this.resetProgressDisplay()
  }

  // Update all player info for the current sound
  updateCurrentSoundInfo(sound: SoundItem): void {
    if (!this.waveformManager) {
      return
    }

    this.soundTitle.textContent = sound.name

    const duration = this.waveformManager.getDuration(sound.id)
    this.updateDurationAndProgress(duration > 0 ? duration : sound.duration)
  }

  // Play next sound with cyclic navigation
  playNext(): void {
    if (!this.cards || !this.waveformManager) {
      return
    }

    const sounds = this.cards.getCurrentSounds()
    if (sounds.length === 0) {
      return
    }

    const currentIndex = sounds.findIndex(sound => sound.id === this.currentSoundId)
    const nextIndex = (currentIndex + 1) % sounds.length
    const nextSound = sounds[nextIndex]

    if (nextSound) {
      this.waveformManager.playPause(nextSound.id)
    }
  }

  // Play previous sound with cyclic navigation
  playPrev(): void {
    if (!this.cards || !this.waveformManager) {
      return
    }

    const sounds = this.cards.getCurrentSounds()
    if (sounds.length === 0) {
      return
    }

    const currentIndex = sounds.findIndex(sound => sound.id === this.currentSoundId)
    const prevIndex = currentIndex <= 0 ? sounds.length - 1 : currentIndex - 1
    const prevSound = sounds[prevIndex]

    if (prevSound) {
      this.waveformManager.playPause(prevSound.id)
    }
  }

  showVolumeTrack(): void {
    this.volumeButton.classList.add('is-active')
  }

  hideVolumeTrack(): void {
    this.volumeButton.classList.remove('is-active')
  }

  bindVolumeEvents(): void {
    this.volumeButton.addEventListener('mouseenter', () => this.showVolumeTrack())
    this.volumeButton.addEventListener('mouseleave', () => this.hideVolumeTrack())
    this.volumeInput.addEventListener('mouseenter', () => this.showVolumeTrack())
    this.volumeInput.addEventListener('mouseleave', () => this.hideVolumeTrack())

    this.volumeButton.addEventListener('click', () => this.toggleMute())
    this.volumeInput.addEventListener('input', () => this.handleVolumeChange())
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted
    this.updateVolumeIcon()

    if (this.isMuted) {
      this.volumeInput.value = '0'
      this.updateVolumeDisplay(0)
      this.applyMuteToWaveform()
    } else {
      const restoredVolume = this.maxVolume * this.currentVolume
      this.volumeInput.value = restoredVolume.toString()
      this.updateVolumeDisplay(restoredVolume)
      this.applyMuteToWaveform()
    }
  }

  applyMuteToWaveform(): void {
    if (!this.waveformManager) {
      return
    }

    if (this.isMuted) {
      this.waveformManager.setVolumeForAll(0)
    } else {
      this.waveformManager.setVolumeForAll(this.currentVolume)
    }
  }

  updateVolumeIcon(): void {
    this.volumeButton.innerHTML = this.isMuted ? SOUND_MUTED_ICON : SOUND_ICON
  }

  handleVolumeChange(): void {
    const volume = parseFloat(this.volumeInput.value)
    const wasMuted = this.isMuted

    this.isMuted = volume === 0

    if (wasMuted !== this.isMuted) {
      this.updateVolumeIcon()
    }

    this.updateVolumeDisplay(volume)
    this.applyVolume(volume)
  }

  updateVolumeDisplay(volume: number): void {
    const percentage = (volume / this.maxVolume) * 100
    this.volumeFill.style.height = `${percentage}%`
  }

  applyVolume(volume: number): void {
    if (!this.waveformManager) {
      return
    }

    this.currentVolume = volume / this.maxVolume

    if (!this.isMuted) {
      this.waveformManager.setVolumeForAll(this.currentVolume)
    }
  }

  initializeVolume(): void {
    const defaultVolume = this.maxVolume * this.currentVolume

    this.volumeInput.value = defaultVolume.toString()
    this.updateVolumeDisplay(defaultVolume)

    if (this.waveformManager) {
      this.waveformManager.setVolumeForAll(this.currentVolume)
    }
  }
}

export default Player