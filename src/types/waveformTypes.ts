export interface WaveformConfig {
  waveColor: string
  progressColor: string
  cursorColor: string
  barWidth: number
  barRadius: number
  height: number
  normalize: boolean
}

export interface WaveformOptions {
  soundId: string
  audioPath: string
  containerId: string
  config?: Partial<WaveformConfig>
  callbacks?: {
    onPlay?: (soundId: string) => void
    onPause?: (soundId: string) => void
    onFinish?: (soundId: string) => void
    onReady?: (soundId: string) => void
  }
}
