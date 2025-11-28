import { PlayerSelectors } from '@/types/playerTypes.ts'
import { getFranchiseImageBySeriesId, getSeriesNameById, getSoundsBySeries } from './soundLibraryConfig.ts'
import { formatDuration } from '@/utils/formatDuration.ts'
import WaveformManager from '@/modules/WaveformManager.ts'
import { SoundItem } from '@/types'

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
  private waveformManager: WaveformManager | null = null
  private currentSoundId: string | null = null

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

    if (waveformManager) {
      this.waveformManager = waveformManager
    }

    this.bindEventControlButtons()
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

    })

    this.buttonNext.addEventListener('click', () => {

    })
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
}

export default Player