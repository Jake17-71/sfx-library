import type { SoundLibraryConfig, Game, GameSeries, SoundItem } from '@/types'

// Helper function to create sound item from filename
const createSoundItem = (
  gameFolder: string,
  fileName: string,
  duration: number = 0
): SoundItem => {
  // Remove .mp3 extension for display name
  const name = fileName.replace('.mp3', '')
  // Generate unique ID
  const id = `${gameFolder.toLowerCase()}-${fileName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`

  return {
    id,
    name,
    fileName,
    audioPath: `/${gameFolder}/${fileName}`,
    duration,
  }
}

// Assassin's Creed 1 sounds
const ac1Sounds: SoundItem[] = [
  createSoundItem('AC1', 'Animus-1-28.mp3', 16.1),
  createSoundItem('AC1', 'DNA Synchronization Augmented.mp3', 10.2),
  createSoundItem('AC1', 'Eagle Vision.mp3', 7.6),
  createSoundItem('AC1', 'Exit Animus.mp3', 6.9),
  createSoundItem('AC1', 'Flag Found.mp3', 6.1),
  createSoundItem('AC1', 'Glitches-animus.mp3', 1.2),
  createSoundItem('AC1', 'Investigation Complete I.mp3', 9.5),
  createSoundItem('AC1', 'Investigation Complete II.mp3', 9),
  createSoundItem('AC1', 'Lock On.mp3', 1.3),
  createSoundItem('AC1', 'Synchronization Bar (Refilling).mp3', 1.1),
  createSoundItem('AC1', 'Synchronization Bar Updated.mp3', 1.3),
  createSoundItem('AC1', 'Viewpoint-Synchronization.mp3', 15.1),
  createSoundItem('AC1', 'pause-menu-animus.mp3', 19),
]

// Assassin's Creed 2 sounds
const ac2Sounds: SoundItem[] = [
  createSoundItem('AC2', 'Accept.mp3', 4),
  createSoundItem('AC2', 'Animus 2.0 Startup.mp3', 4.8),
  createSoundItem('AC2', 'Animus 2.0.mp3', 104),
  createSoundItem('AC2', "Assassin's Tomb I.mp3", 5.9),
  createSoundItem('AC2', "Assassin's Tomb II.mp3", 8.5),
  createSoundItem('AC2', 'Enter passcode.mp3', 1.5),
  createSoundItem('AC2', 'Error.mp3', 1.9),
  createSoundItem('AC2', 'Fast Travel.mp3', 5.2),
  createSoundItem('AC2', 'Hidden Gun Select (1).mp3', 1.2),
  createSoundItem('AC2', 'Hidden Gun Select.mp3', 1.2),
  createSoundItem('AC2', 'Horse galloping.mp3', 6.5),
  createSoundItem('AC2', 'Memory Sequence Synchronized.mp3', 7.1),
  createSoundItem('AC2', 'Poison Medicine Select (1).mp3', 1.4),
  createSoundItem('AC2', 'Poison Medicine Select.mp3', 1.4),
  createSoundItem('AC2', 'Set Marker.mp3', 1.7),
  createSoundItem('AC2', 'Spotted.mp3', 1.6),
  createSoundItem('AC2', 'Viewpoint Synchronization (AC2) (1).mp3', 12.1),
  createSoundItem('AC2', 'Viewpoint Synchronization (AC2).mp3', 12.1),
]

// Assassin's Creed Brotherhood sounds
const acBrotherhoodSounds: SoundItem[] = [
  createSoundItem(
    'AC_Brotherhood',
    'Assassination Contract 100% Sync Assassins Guild Challenge Complete.mp3',
    19.1
  ),
  createSoundItem('AC_Brotherhood', 'Borgia Tower.mp3', 70.8),
  createSoundItem('AC_Brotherhood', 'Cluster Puzzle SFX.mp3', 1.7),
  createSoundItem('AC_Brotherhood', 'Courtesan Challenge Complete.mp3', 9),
  createSoundItem('AC_Brotherhood', 'Cricket Chirping.mp3', 4.7),
  createSoundItem('AC_Brotherhood', 'Death of a Recruit.mp3', 5),
  createSoundItem('AC_Brotherhood', 'Hidden Gun (Locked On).mp3', 7.3),
  createSoundItem('AC_Brotherhood', 'Hidden Gun Lock on.mp3', 2.8),
  createSoundItem('AC_Brotherhood', 'Mission Complete.mp3', 9),
  createSoundItem('AC_Brotherhood', 'Renovating.mp3', 8.8),
  createSoundItem('AC_Brotherhood', 'Respawn.mp3', 2.1),
  createSoundItem('AC_Brotherhood', 'The Truth Puzzle.mp3', 9.5),
  createSoundItem('AC_Brotherhood', 'Thief Challenges Complete.mp3', 20.2),
  createSoundItem('AC_Brotherhood', 'Ticking Syringe.mp3', 3.6),
  createSoundItem('AC_Brotherhood', 'Total Bonus Points.mp3', 4.9),
]

// Game series configuration
const assassinsCreedSeries: GameSeries[] = [
  {
    id: 'ac1',
    name: "Assassin's Creed",
    folderName: 'AC1',
    sounds: ac1Sounds,
  },
  {
    id: 'ac2',
    name: "Assassin's Creed II",
    folderName: 'AC2',
    sounds: ac2Sounds,
  },
  {
    id: 'ac-brotherhood',
    name: "Assassin's Creed: Brotherhood",
    folderName: 'AC_Brotherhood',
    sounds: acBrotherhoodSounds,
  },
]

// Borderlands series
const borderlandsSeries: GameSeries[] = [
  {
    id: 'borderlands-1',
    name: 'Borderlands',
    folderName: 'Borderlands',
    sounds: [],
  },
  {
    id: 'borderlands-2',
    name: 'Borderlands 2',
    folderName: 'Borderlands_2',
    sounds: [],
  },
  {
    id: 'borderlands-3',
    name: 'Borderlands 3',
    folderName: 'Borderlands_3',
    sounds: [],
  },
  {
    id: 'borderlands-4',
    name: 'Borderlands 4',
    folderName: 'Borderlands_4',
    sounds: [],
  },
]

// Mafia series
const mafiaSeries: GameSeries[] = [
  {
    id: 'mafia-1',
    name: 'Mafia',
    folderName: 'Mafia',
    sounds: [],
  },
  {
    id: 'mafia-2',
    name: 'Mafia II',
    folderName: 'Mafia_2',
    sounds: [],
  },
  {
    id: 'mafia-3',
    name: 'Mafia III',
    folderName: 'Mafia_3',
    sounds: [],
  },
  {
    id: 'mafia-the-old-country',
    name: 'Mafia: The Old Country',
    folderName: 'Mafia_The_Old_County',
    sounds: [],
  },
]

// Watch Dogs series
const watchDogsSeries: GameSeries[] = [
  {
    id: 'watch-dogs-1',
    name: 'Watch Dogs',
    folderName: 'Watch_Dogs',
    sounds: [],
  },
  {
    id: 'watch-dogs-2',
    name: 'Watch Dogs 2',
    folderName: 'Watch_Dogs_2',
    sounds: [],
  },
  {
    id: 'watch-dogs-legion',
    name: 'Watch Dogs: Legion',
    folderName: 'Watch_Dogs_Legion',
    sounds: [],
  },
]

// Death Stranding series
const deathStrandingSeries: GameSeries[] = [
  {
    id: 'death-stranding',
    name: 'Death Stranding',
    folderName: 'Death_Stranding',
    sounds: [],
  },
  {
    id: 'death-stranding-2',
    name: 'Death Stranding 2',
    folderName: 'Death_Stranding_2',
    sounds: [],
  },
]

// Games configuration (franchises)
const games: Game[] = [
  {
    id: 'assassins-creed',
    name: "Assassin's Creed",
    image: "/assassin's creed.png",
    series: assassinsCreedSeries,
  },
  {
    id: 'borderlands',
    name: 'Borderlands',
    series: borderlandsSeries,
  },
  {
    id: 'death-stranding',
    name: 'Death Stranding',
    series: deathStrandingSeries,
  },
  {
    id: 'mafia',
    name: 'Mafia',
    series: mafiaSeries,
  },
  {
    id: 'watch-dogs',
    name: 'Watch Dogs',
    series: watchDogsSeries,
  },
]

// Main sound library configuration
export const soundLibraryConfig: SoundLibraryConfig = {
  games,
}

// Helper function to get all sounds as flat array
export const getAllSounds = (): SoundItem[] => {
  return games.flatMap((game) => game.series.flatMap((series) => series.sounds))
}

// Helper function to get sounds by series ID
export const getSoundsBySeries = (seriesId: string): SoundItem[] => {
  const series = games
    .flatMap((game) => game.series)
    .find((s) => s.id === seriesId)
  return series?.sounds || []
}

// Helper function to get series by ID
export const getSeriesById = (seriesId: string): GameSeries | undefined => {
  return games.flatMap((game) => game.series).find((s) => s.id === seriesId)
}

// Helper function to get all series from a specific game by game ID
export const getSeriesByGameId = (gameId: string): GameSeries[] => {
  const game = games.find((g) => g.id === gameId)
  return game?.series || []
}
