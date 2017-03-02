import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Error from 'app/error'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Error {...props} />)
}

describe('(App) Home', function () {
  let component
  const props = {}

  beforeEach(function () {
    props.url = '/error/403'
    component = shallowRenderWithProps(props)
  })

  it('Should render as a <div>.', function () {
    expect(component.type).to.equal('div')
  })
})
