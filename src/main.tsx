import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Navbar } from './components/navbar.tsx'
import { Footer } from './components/footer.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import CoinDetails from './routes/CoinDetails.tsx'
import NotFound from './routes/NotFound.tsx'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/coins',
    element: <Navigate to={'/'} />,
  },
  {
    path: '/coins/:id',
    element: <CoinDetails />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            {/* <App /> */}
            <RouterProvider router={router} />
          </div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
