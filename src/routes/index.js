import App from 'app'
export default [{
  pattern: '/',
  component: App,
  exactly: true,
  routes: [{
    pattern: '/home',
    getComponent: () => System.import('app/home')
  }]
}]
