import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import SignIn from './components/SignIn'
import Student from "./components/Student";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/student-table" element={<Student/>} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
    </>
  )
}

export default App