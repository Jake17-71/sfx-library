// Sound Library Types

// Individual sound item
export interface SoundItem {
  id: string
  name: string // Display name (e.g., "Eagle Vision")
  fileName: string // Original filename (e.g., "Eagle Vision.mp3")
  audioPath: string // Path to audio file (e.g., "/AC1/Eagle Vision.mp3")
  duration: number // Duration in seconds
}

// Game series/title (e.g., AC1, AC2, Brotherhood)
export interface GameSeries {
  id: string
  name: string // Full series name (e.g., "Assassin's Creed", "Assassin's Creed II")
  folderName: string // Folder name in public (e.g., "AC1", "AC2")
  image?: string // Path to series cover/icon (e.g., "/audio-player-image.png")
  sounds: SoundItem[] // Array of sounds for this series
}

// Game franchise (e.g., Assassin's Creed)
export interface Game {
  id: string // Unique identifier (e.g., "assassins-creed")
  name: string // Game franchise name (e.g., "Assassin's Creed")
  image?: string // Path to game cover/icon
  series: GameSeries[]
}

// Main library configuration
export interface SoundLibraryConfig {
  games: Game[]
}

// Sound player state
export interface SoundPlayerState {
  currentSound: SoundItem | null
  isPlaying: boolean
  duration: number
  currentTime: number
}