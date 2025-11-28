import './styles/styles.scss'
import Alert from '@/modules/Alert'
import BurgerButton from '@/modules/BurgerButton.ts'
import SeriesCreation from '@/modules/SeriesCreation.ts'
import Cards from '@/modules/Cards'
import Player from '@/modules/Player.ts'

new Alert()
new BurgerButton()

const cards = new Cards()
const player = new Player(cards.getWaveformManager())
cards.setPlayer(player)
new SeriesCreation(cards, player)