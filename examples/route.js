import Install from './docs/install.md'
import QuikeStart from './docs/quikeStart.md'
import Input from './docs/input.md'
import Button from './docs/button.md'
const routes = [
  {
    path: '/',
    component: Install,
    name: 'default'
  },
  {
    path: '/guide/install',
    name: 'Install',
    component: Install
  },
  {
    path: '/guide/quikeStart',
    name: 'quikeStart',
    component: QuikeStart
  },
  {
    path: '/input',
    name: 'input',
    component: Input
  }, 
  {
    path: '/button',
    name: 'button',
    component: Button
  }
]

export default routes
