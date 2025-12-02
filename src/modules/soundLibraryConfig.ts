import type { SoundLibraryConfig, Game, GameSeries, SoundItem } from '@/types'

// Helper function to create sound item from filename
const createSoundItem = (
  franchiseFolder: string,
  gameFolder: string,
  fileName: string,
  duration: number = 0
): SoundItem => {
  // Remove .mp3 or .wav extension for display name
  const name = fileName.replace(/\.(mp3|wav)$/, '')
  // Generate unique ID
  const id = `${gameFolder.toLowerCase()}-${fileName
    .replace(/\.(mp3|wav)$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')}`

  return {
    id,
    name,
    fileName,
    audioPath: `/sounds/${franchiseFolder}/${gameFolder}/${fileName}`,
    duration,
  }
}

// Assassin's Creed 1 sounds
const ac1Sounds: SoundItem[] = [
  createSoundItem("Assassin's Creed", 'AC1', 'Animus-1-28.mp3', 16.1),
  createSoundItem("Assassin's Creed", 'AC1', 'DNA Synchronization Augmented.mp3', 10.2),
  createSoundItem("Assassin's Creed", 'AC1', 'Eagle Vision.mp3', 7.6),
  createSoundItem("Assassin's Creed", 'AC1', 'Exit Animus.mp3', 6.9),
  createSoundItem("Assassin's Creed", 'AC1', 'Flag Found.mp3', 6.1),
  createSoundItem("Assassin's Creed", 'AC1', 'Glitches-animus.mp3', 1.2),
  createSoundItem("Assassin's Creed", 'AC1', 'Investigation Complete I.mp3', 9.5),
  createSoundItem("Assassin's Creed", 'AC1', 'Investigation Complete II.mp3', 9),
  createSoundItem("Assassin's Creed", 'AC1', 'Lock On.mp3', 1.3),
  createSoundItem("Assassin's Creed", 'AC1', 'Synchronization Bar (Refilling).mp3', 1.1),
  createSoundItem("Assassin's Creed", 'AC1', 'Synchronization Bar Updated.mp3', 1.3),
  createSoundItem("Assassin's Creed", 'AC1', 'Viewpoint-Synchronization.mp3', 15.1),
  createSoundItem("Assassin's Creed", 'AC1', 'pause-menu-animus.mp3', 19),
]

// Assassin's Creed 2 sounds
const ac2Sounds: SoundItem[] = [
  createSoundItem("Assassin's Creed", 'AC2', 'Accept.mp3', 4),
  createSoundItem("Assassin's Creed", 'AC2', 'Animus 2.0 Startup.mp3', 4.8),
  createSoundItem("Assassin's Creed", 'AC2', 'Animus 2.0.mp3', 104),
  createSoundItem("Assassin's Creed", 'AC2', "Assassin's Tomb I.mp3", 5.9),
  createSoundItem("Assassin's Creed", 'AC2', "Assassin's Tomb II.mp3", 8.5),
  createSoundItem("Assassin's Creed", 'AC2', 'Enter passcode.mp3', 1.5),
  createSoundItem("Assassin's Creed", 'AC2', 'Error.mp3', 1.9),
  createSoundItem("Assassin's Creed", 'AC2', 'Fast Travel.mp3', 5.2),
  createSoundItem("Assassin's Creed", 'AC2', 'Hidden Gun Select (1).mp3', 1.2),
  createSoundItem("Assassin's Creed", 'AC2', 'Hidden Gun Select.mp3', 1.2),
  createSoundItem("Assassin's Creed", 'AC2', 'Horse galloping.mp3', 6.5),
  createSoundItem("Assassin's Creed", 'AC2', 'Memory Sequence Synchronized.mp3', 7.1),
  createSoundItem("Assassin's Creed", 'AC2', 'Poison Medicine Select (1).mp3', 1.4),
  createSoundItem("Assassin's Creed", 'AC2', 'Poison Medicine Select.mp3', 1.4),
  createSoundItem("Assassin's Creed", 'AC2', 'Set Marker.mp3', 1.7),
  createSoundItem("Assassin's Creed", 'AC2', 'Spotted.mp3', 1.6),
  createSoundItem("Assassin's Creed", 'AC2', 'Viewpoint Synchronization (AC2) (1).mp3', 12.1),
  createSoundItem("Assassin's Creed", 'AC2', 'Viewpoint Synchronization (AC2).mp3', 12.1),
]

// Assassin's Creed Brotherhood sounds
const acBrotherhoodSounds: SoundItem[] = [
  createSoundItem(
    "Assassin's Creed",
    'AC_Brotherhood',
    'Assassination Contract 100% Sync Assassins Guild Challenge Complete.mp3',
    19.1
  ),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Borgia Tower.mp3', 70.8),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Cluster Puzzle SFX.mp3', 1.7),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Courtesan Challenge Complete.mp3', 9),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Cricket Chirping.mp3', 4.7),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Death of a Recruit.mp3', 5),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Hidden Gun (Locked On).mp3', 7.3),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Hidden Gun Lock on.mp3', 2.8),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Mission Complete.mp3', 9),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Renovating.mp3', 8.8),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Respawn.mp3', 2.1),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'The Truth Puzzle.mp3', 9.5),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Thief Challenges Complete.mp3', 20.2),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Ticking Syringe.mp3', 3.6),
  createSoundItem("Assassin's Creed", 'AC_Brotherhood', 'Total Bonus Points.mp3', 4.9),
]

// Game series configuration
const assassinsCreedSeries: GameSeries[] = [
  {
    id: 'ac1',
    name: "Assassin's Creed",
    folderName: 'AC1',
    image: "/cards-images/Assasin's Creed/AC1.jpeg",
    sounds: ac1Sounds,
  },
  {
    id: 'ac2',
    name: "Assassin's Creed II",
    folderName: 'AC2',
    image: "/cards-images/Assasin's Creed/AC2.jpeg",
    sounds: ac2Sounds,
  },
  {
    id: 'ac3',
    name: "Assassin's Creed III",
    folderName: 'AC3',
    image: "/cards-images/Assasin's Creed/AC3.jpg",
    sounds: [],
  },
  {
    id: 'ac-brotherhood',
    name: "Assassin's Creed: Brotherhood",
    folderName: 'AC_Brotherhood',
    image: "/cards-images/Assasin's Creed/AC_Brothehood.jpg",
    sounds: acBrotherhoodSounds,
  },
  {
    id: 'ac-revelations',
    name: "Assassin's Creed: Revelations",
    folderName: 'AC_Revelations',
    image: "/cards-images/Assasin's Creed/AC_Revelations.jpg",
    sounds: [],
  },
]

// GTA series
const gtaSeries: GameSeries[] = [
  {
    id: 'gta-3',
    name: 'Grand Theft Auto III',
    folderName: 'GTA3',
    image: '/cards-images/GTA/GTA3.jpg',
    sounds: [],
  },
  {
    id: 'gta-vc',
    name: 'Grand Theft Auto: Vice City',
    folderName: 'GTA_VC',
    image: '/cards-images/GTA/GTA_VC.jpg',
    sounds: [],
  },
  {
    id: 'gta-sa',
    name: 'Grand Theft Auto: San Andreas',
    folderName: 'GTA_SA',
    image: '/cards-images/GTA/GTA_SA.jpeg',
    sounds: [],
  },
  {
    id: 'gta-4',
    name: 'Grand Theft Auto IV',
    folderName: 'GTA4',
    image: '/cards-images/GTA/GTA4.jpg',
    sounds: [],
  },
  {
    id: 'gta-4-tlad',
    name: 'GTA IV: The Lost and Damned',
    folderName: 'GTA4_TLAD',
    image: '/cards-images/GTA/GTA4 Lost and Damned.png',
    sounds: [],
  },
  {
    id: 'gta-4-tbogt',
    name: 'GTA IV: The Ballad of Gay Tony',
    folderName: 'GTA4_TBOGT',
    image: '/cards-images/GTA/GTA4 The Ballad of Gat Tony.jpg',
    sounds: [],
  },
  {
    id: 'gta-5',
    name: 'Grand Theft Auto V',
    folderName: 'GTA5',
    image: '/cards-images/GTA/GTA5.jpg',
    sounds: [],
  },
]

// Hollow Knight sounds
const hollowknightSounds: SoundItem[] = [
  createSoundItem('Hollow Knight', 'Hollow Knight', 'abyss_crawler.wav', 3.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Amelitia_Generic_03.wav', 2.7),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'big_fly_wall_hit.wav', 0.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'button.wav', 0.1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Caterpillar_talk_01.wav', 1.9),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Collector_into_ceiling_04.wav', 1.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'col_cage_open.wav', 1.1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Col_miner_attack_02.wav', 0.7),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Col_worm_leap_01.wav', 0.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'dark_spell_get.wav', 2.7),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'dung_defender_dive.wav', 1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Dung_Def_impressed_02.wav', 2.2),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Elder_Hu_attack_02.wav', 0.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'final_boss_atrium_pt_1.wav', 96.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Fknight_flump_02.wav', 0.7),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'fungal_wastes_atmos_loop.wav', 27.2),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'giant_hopper_land.wav', 0.7),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Gorb_attack_01.wav', 0.9),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Grimm_talk_02.wav', 1.9),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'grub_free_1.wav', 1.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Grub_wave_03.wav', 2.2),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'heart_piece_idle_loop.wav', 9.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'hero_fluke_bounce_8.wav', 0),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'hero_super_dash_air_brake.wav', 0.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'hollow_shade_idle.wav', 6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Hornet_Fight_Stun_02.wav', 0.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Jinn_generic_02.wav', 1.8),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'jump_out_of_snow.wav', 1.1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'mage_summon_projectiles.wav', 2.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Maggot_bounce_03.wav', 0.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Mask_Shatter_Cutscene AUDIO.wav', 11.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'mawlek_scream.wav', 3.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'mosquito_fly_loop.wav', 1.8),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Moth_Seer_Generic_06.wav', 4.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'mushroom_roller_charge.wav', 1.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Nightmare_Crowd_idle_chant.wav', 26.1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'pot_death_2.wav', 1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'RESTING GROUNDS S51-14.wav', 118),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'rope_cut_final.wav', 0.6),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Ruins_Great_Shield_Sentry_shield_raise_02.wav', 0.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'S25 Fungal Wastes MAIN.wav', 168),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'S57 COLOSSEUM INTENSITY 6.wav', 23.5),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Salubra_Talk_02.wav', 3),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'shade_sibling_idle_loop.wav', 5.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Spa_Bugs_Startle_03.wav', 0.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'spider_buddy_sword_4.wav', 0.1),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'sword_1.wav', 0.2),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'vine_plat_cut.wav', 0.4),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Whillo_generic_01.wav', 2.2),
  createSoundItem('Hollow Knight', 'Hollow Knight', 'Zote_Balloon_pre_burst_03.wav', 2.5),
]

// Hollow Knight series
const hollowKnightSeries: GameSeries[] = [
  {
    id: 'hollow-knight',
    name: 'Hollow Knight',
    folderName: 'Hollow_Knight',
    image: '/cards-images/Hollow Knight/Hollow Knight square.jpg',
    sounds: hollowknightSounds,
  },
]

// Death Stranding series
const deathStrandingSeries: GameSeries[] = [
  {
    id: 'death-stranding',
    name: 'Death Stranding',
    folderName: 'Death_Stranding',
    image: '/cards-images/Death Stranding/Death Stranding.jpg',
    sounds: [],
  },
]

// Games configuration (franchises)
const games: Game[] = [
  {
    id: 'assassins-creed',
    name: "Assassin's Creed",
    image: "/player-background/AC.jpg",
    series: assassinsCreedSeries,
  },
  {
    id: 'gta',
    name: 'Grand Theft Auto',
    image: "/player-background/GTA5.jpg",
    series: gtaSeries,
  },
  {
    id: 'death-stranding',
    name: 'Death Stranding',
    image: "/player-background/Death Stranding.png",
    series: deathStrandingSeries,
  },
  {
    id: 'hollow-knight',
    name: 'Hollow Knight',
    image: "/player-background/Hollow Knight wide.jpg",
    series: hollowKnightSeries,
  },
]

// Main sound library configuration
export const soundLibraryConfig: SoundLibraryConfig = {
  games,
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

// Helper function to get franchise (Game) image by series ID
export const getFranchiseImageBySeriesId = (seriesId: string): string => {
  const game = games.find((g) => g.series.some((s) => s.id === seriesId))
  return game?.image || '/audio-player-image.png'
}

// Helper function to get series name by series ID
export const getSeriesNameById = (seriesId: string): string => {
  const series = games.flatMap((game) => game.series).find((s) => s.id === seriesId)
  return series?.name || ''
}
