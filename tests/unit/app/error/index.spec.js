import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Home from 'app/home'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Home {...props} />)
}

describe('(App) Error', function () {
  let component

  beforeEach(function () {
    component = shallowRenderWithProps({})
  })

  it('Should render as a <div>.', function () {
    expect(component.type).to.equal('div')
  })
})
