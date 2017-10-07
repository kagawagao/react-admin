import React from 'react'
import TestUtils from 'react-dom/test-utils'
import App from 'app/index'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<App {...props} />)
}

describe('(App) App', function () {
  let component

  beforeEach(function () {
    component = shallowRenderWithProps({})
  })

  it('Should render Router.', function () {
    expect(component.key).to.equal('router')
  })

  it('Should have props: history.', function () {
    expect(component.props).to.have.property('history')
  })
})
