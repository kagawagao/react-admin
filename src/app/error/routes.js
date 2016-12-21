export default [{
  pattern: '/403',
  getComponent: () => System.import('./403')
}, {
  pattern: '/404',
  getComponent: () => System.import('./404')
}]
