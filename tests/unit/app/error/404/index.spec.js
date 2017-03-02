import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Miss from 'app/error/404'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Miss {...props} />)
}

describe('(App) Miss', function () {
  let component

  beforeEach(function () {
    component = shallowRenderWithProps({})
  })

  it('Should render as a <h1>.', function () {
    expect(component.type).to.equal('h1')
  })

  it('Should render 404.', function () {
    expect(component.props.children).to.equal('404')
  })
})
