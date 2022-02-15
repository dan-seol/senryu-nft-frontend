import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store/store'
import { Provider } from 'react-redux'
//import * as serviceWorker from './serviceWorker';
import SenryuNFT from "./contracts/SenryuNFT.json";


// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store"

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [SenryuNFT],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
}

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options)

ReactDOM.render(<Provider store={store}> <App drizzle={drizzle} /> </Provider>, document.getElementById('root'))