// 引入要测试的vue文件
import buttonModel from '@/components/buttonModel'
// 引入@vue/test-utils中要用到的api
import {
  mount
} from '@vue/test-utils'

// 开始写测试用例
describe('button组件，点击功能测试', () => {
  // 创建button组件的包裹器，并传入指定props进行测试
  const value = '测试按钮'
  const wrapper = mount(buttonModel, {
    propsData: {
      value
    }
  })
  // 获取到按钮元素
  const buttonEle = wrapper.find('.button')
  it('按钮展示文案正确', () => {
    // 断言按钮元素的展示文案正确
    expect(buttonEle.element.value).to.equal(value)
  })
  it('点击按钮，正常emit事件', () => {
    // 模拟点击事件
    buttonEle.trigger('click')
    // 断言正常emit了事件
    expect(wrapper.emitted()['click'].length).to.equal(1)
  })
})