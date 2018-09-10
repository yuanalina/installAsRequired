import Input from './components/input'
import ButtonModel from './components/buttonModel'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

function install (Vue) {
  Vue.component(Input.name, Input)
  Vue.component(ButtonModel.name, ButtonModel)
}

export default {
  install,
  Input,
  ButtonModel
}
