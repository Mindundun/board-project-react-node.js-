import { Routes, Route, Link } from 'react-router-dom'
import ArticleList from './components/ArticleList'
import './App.css'

function App() {

  return (
    <>
      <div>
        <Link to="/list">게시글 목록 조회</Link>
        <Link to="/write">게시글 등록</Link>
      </div>
      <Routes>
        <Route path="/list" element ={<ArticleList/>}/>
        {/* <Route path="/write" element ={<ArticleWrite/>}/> */}
      </Routes>
    </>
  )
}

export default App
