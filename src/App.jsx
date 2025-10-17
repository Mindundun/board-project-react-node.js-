import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import ArticleView from './components/ArticleView'
import ArticleWrite from './components/ArticleWrite'
import ArticleModify from './components/ArticleModify'

function App() {
  
  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/write" style={{ textDecoration: 'none', color: '#fff', background: '#007bff', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 등록
        </Link>
        <Link to="/list" style={{ textDecoration: 'none', color: '#fff', background: '#28a745', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 목록조회
        </Link>
      </div>

      <Routes>
          <Route path="/list" element={<ArticleList />}></Route>
          <Route path="/view/:id" element={<ArticleView />}></Route>
          <Route path="/write" element={<ArticleWrite />}></Route>       
          <Route path="/modify/:id" element={<ArticleModify />}></Route> 
      </Routes>
    
    </>
  )
}

export default App
