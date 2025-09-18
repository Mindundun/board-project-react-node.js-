import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { fetchArticles } from "../api/articleApi"; 

function ArticleList() { 
    const [articles, setArticles] = useState([]); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    
    const navigate = useNavigate(); 

    useEffect(() => { 
        setLoading(true);

        fetchArticles() 
            .then((data) => {
                console.log('data :', data);
                setArticles(data);
            }) 
            .catch((err) => {
                console.error('error :', err);
                setError("게시글을 불러오는 데 실패했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 

    if (loading) {
        return <h2>⏳ Loading...</h2>;
    }

    if (error) {
        return <h2 style={{ color: "red" }}>{error}</h2>;
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>게시글 목록 조회</h1> 
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}> 
                <thead style={{ backgroundColor: "lightpink", color: "black" }}> 
                    <tr> 
                        <th>번호</th> 
                        <th>제목</th> 
                        <th>작성자</th> 
                        <th>작성일자</th> 
                    </tr> 
                </thead> 
                <tbody> 
                    {articles.map((article, index, array) => (
                        <tr key={article.id} style={{ backgroundColor: "lightblue", color: "black" }}> 
                            <td>{array.length - index}</td> 
                            <td
                                style={{ cursor: 'pointer', color: 'gray', textDecoration: 'underline' }}
                                onClick={() => navigate(`/view/${article.id}`)}
                            >
                                {article.title}
                            </td> 
                            <td>{article.writer}</td> 
                            <td>{article.reg_date}</td> 
                        </tr> 
                    ))} 
                </tbody> 
            </table> 
        </>
    ); 
} 

export default ArticleList;
