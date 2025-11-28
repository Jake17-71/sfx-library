import WaveSurfer from 'wavesurfer.js'
import { WaveformConfig, WaveformOptions } from '@/types/waveformTypes.ts'

class WaveformManager {
  private waveSurfers: Map<string, WaveSurfer> = new Map()
  private currentPlayingId: string | null = null
  private readonly defaultConfig: WaveformConfig = {
    waveColor: '#ddd',
    progressColor: '#4a90e2',
    cursorColor: '#4a90e2',
    barWidth: 2,
    barRadius: 3,
    height: 60,
    normalize: true,
  }

  createWaveform(options: WaveformOptions): void {
    const { soundId, audioPath, containerId, config, callbacks } = options

    requestAnimationFrame(() => {
      try {
        const container = document.getElementById(containerId)

        if (!container) {
          console.error(`Контейнер ${containerId} не найден`)
          return
        }

        const wavesurfer = WaveSurfer.create({
          container: container,
          ...this.defaultConfig,
          ...config,
        })

        wavesurfer.load(`/sfx-library${audioPath}`)

        if (callbacks?.onReady) {
          wavesurfer.on('ready', () => callbacks.onReady!(soundId))
        }

        wavesurfer.on('play', () => {
          this.currentPlayingId = soundId
          callbacks?.onPlay?.(soundId)
        })

        wavesurfer.on('pause', () => {
          if (this.currentPlayingId === soundId) {
            this.currentPlayingId = null
          }
          callbacks?.onPause?.(soundId)
        })

        if (callbacks?.onFinish) {
          wavesurfer.on('finish', () => {
            if (this.currentPlayingId === soundId) {
              this.currentPlayingId = null
            }
            callbacks.onFinish!(soundId)
          })
        }

        if (callbacks?.onTimeUpdate) {
          wavesurfer.on('timeupdate', (currentTime: number) => {
            callbacks.onTimeUpdate!(soundId, currentTime)
          })
        }

        this.waveSurfers.set(soundId, wavesurfer)
      } catch (error) {
        console.error(`Ошибка создания WaveSurfer для ${soundId}:`, error)
      }
    })
  }

  getCurrentPlayingId(): string | null {
    return this.currentPlayingId
  }

  playPause(soundId: string): void {
    const wavesurfer = this.waveSurfers.get(soundId)
    if (!wavesurfer) {return}

    if (this.currentPlayingId && this.currentPlayingId !== soundId) {
      this.stopCurrent()
    }

    wavesurfer.playPause()
  }

  private stopCurrent(): void {
    if (this.currentPlayingId) {
      const currentWavesurfer = this.waveSurfers.get(this.currentPlayingId)
      if (currentWavesurfer && currentWavesurfer.isPlaying()) {
        currentWavesurfer.pause()
      }
    }
  }

  setVolume(soundId: string, volume: number): void {
    const wavesurfer = this.waveSurfers.get(soundId)
    if (wavesurfer) {
      wavesurfer.setVolume(volume)
    }
  }

  isPlaying(soundId: string): boolean {
    const wavesurfer = this.waveSurfers.get(soundId)
    return wavesurfer ? wavesurfer.isPlaying() : false
  }

  destroyAll(): void {
    this.waveSurfers.forEach((ws) => ws.destroy())
    this.waveSurfers.clear()
    this.currentPlayingId = null
  }


  getDuration(soundId: string): number {
    const wavesurfer = this.waveSurfers.get(soundId)
    return wavesurfer ? wavesurfer.getDuration() : 0
  }
}

export default WaveformManager
