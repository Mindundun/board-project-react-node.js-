import { Routes, Route, Link } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import ArticleView from './components/ArticleView'
import './App.css'

function App() {

  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/write" style={{ textDecoration: 'none', color: '#fff', background: '#6e9fd3ff', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 등록
        </Link>
        <Link to="/list" style={{ textDecoration: 'none', color: '#fff', background: '#6e9fd3ff', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 목록조회
        </Link>
      </div>
      <Routes>
        <Route path="/list" element ={<ArticleList/>}/>
        <Route path="/view/:id" element={<ArticleView/>} />
        {/* <Route path="/write" element ={<ArticleWrite/>}/> */}
      </Routes>
    </>
  )
}

export default App
