import React from 'react'
import TestUtils from 'react-addons-test-utils'
import App from '../../../src/app/index'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<App {...props} />)
}

describe('(App) App', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className="child">Child</h1>
    _props = {
      children : _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <h1>.', function () {
    expect(_component.type).to.equal('h1')
  })
})
