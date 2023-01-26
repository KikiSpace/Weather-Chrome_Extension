import React from 'react'
import ReactDOM from "react-dom/client";
import './popup.css'

const test = <img src="icon-temp.png"/>

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.createRoot(root).render(test)
