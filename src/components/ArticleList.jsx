import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../api/articleApi";

function ArticleList() {

    const [articles, setArticles] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loding, setLoding ] = useState(false);

    const navigate = useNavigate();

    console.log(articles);
    

    // 라이프 사이클 과정에서 부수적인 작업 시 처리되는 useEffect()
    useEffect(() => {
        fetchArticles()
        .then((data) => {
            console.log('data :', data);
            setArticles(data);
        })
        .catch((err) => {
            console.log('error :', err);
        })

    }, [])

    return(
        <>
            <h1>ArticleList Component</h1>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{backgroundColor: "lightpink", color: "black"}}>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    articles
                    .map((article, index, array) => ( // 중괄호가 아닌 괄호 사용 시 묵시적 리턴
                        <tr key={article.id} style={{backgroundColor: "lightblue", color: "black"}}>
                            <td>{array.length-index}</td>                          
                            <td style ={{cursor:'pointer', color:'gray', textDecoration:'underline'}} onClick={() => navigate(`/view/${article.id}`)}>{article.title}</td>
                            <td>{article.writer}</td>
                            <td>{article.reg_date}</td>
                        </tr>                        
                    ))
                    }
                </tbody>
            </table>
        
        </>
    );

}

export default ArticleList;