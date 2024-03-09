import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import axios from 'axios'

const Loader = lazy(() => import('./common/Loader/Loader.jsx'))

axios.defaults.baseURL = "http://localhost:5050"
// axios.defaults.baseURL = "https://clg-project-04w9.onrender.com"

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store} >
            <Suspense fallback={<Loader />}>

                <App />

            </Suspense>
        </Provider>



    </>
)