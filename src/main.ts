import './styles/styles.scss'
import Alert from '@/modules/Alert'
import BurgerButton from '@/modules/BurgerButton.ts'
import SeriesCreation from '@/modules/SeriesCreation.ts'
import Cards from '@/modules/Cards'

new Alert()
new BurgerButton()
new SeriesCreation(new Cards())