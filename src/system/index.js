export const loadModule = (opts) => {
  const { routes, component } = opts
  console.log(routes)
  console.log(component)
}

export const loadModules = modules => {
  loadModule(module)
}

export default class App {
  constructor (options) {
    console.log(options)
  }
}
