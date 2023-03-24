"use client"
import React, { Component } from "react"
// import App from "./pages";
import dynamic from "next/dynamic"

const App = dynamic(() => import("@/app/pages/index"));

class Index extends Component {
  render () {
    return (
      <App></App>
    )
  }
}

export default Index;