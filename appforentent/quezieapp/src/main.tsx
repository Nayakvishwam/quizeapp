import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './apps/store.js'
import Router from "./routes/routes"
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />
  </Provider>
)
