import { Routes, Route, Link } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import ArticleView from './components/ArticleView'
import ArticleWrite from './components/ArticleWrite'
import ArticleModify from './components/ArticleModify'
import './App.css'

function App() {

  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/write" style={{ textDecoration: 'none', color: '#fff', fontWeight: "900" , background: '#2d580fc7', padding: '8px 16px', borderRadius: '4px', border: "1px solid white" }}>
          게시글 등록
        </Link>
        <Link to="/list" style={{ textDecoration: 'none', color: '#fff', fontWeight: "900", background: '#2d580fc7', padding: '8px 16px', borderRadius: '4px', border: "1px solid white" }}>
          게시글 목록조회
        </Link>
      </div>
      <Routes>
        <Route path="/list" element ={<ArticleList/>}/>
        <Route path="/view/:id" element={<ArticleView/>} />
        <Route path="/write" element ={<ArticleWrite/>}/>
        <Route path="/modify/:id" element ={<ArticleModify/>}/>
      </Routes>
    </>
  )
}

export default App
