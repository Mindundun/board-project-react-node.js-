import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArticle, fetchArticle } from "../api/articleApi";

function ArticleView(){
    
    // 페이지 이동
    const navigate = useNavigate();

    // url parameter
    const { id } = useParams();

    const [ article, setArticle ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false); 

    
    useEffect(() => {
        setLoading(true);

        fetchArticle(id)
        .then((data) => {
            console.log('data :', data);
            setArticle(data);
        })
        .catch((err) =>{
            console.log('error :', err);
            setError("게시글 상세 정보를 조회하는데 실패했습니다.");
        })    
        .finally(() => {
            setLoading(false);
        })
    }, [id]); // 의존성 배열
    
    if (loading) {
        return (<h2>Loading..</h2>);
    }

    if (error) {
        return (<h2>{error}</h2>);
    }

    // 비동기 처리이다보니,, 느려서 아래의 구문이 필요,,
    if (!article) {
        return (<h2>데이터를 불러오는 중입니다...</h2>);
    }

    const handleRemove = () => {

        setLoading(true);
        
        deleteArticle(id)
        .then((data) => {
            // list 페이지로 이동
            console.log("deleteArticle data : ", data);// {msg : "게시글이 삭제되었습니다."}  server.js
            navigate('/list');
        })
        .catch((err) => {
            // 에러 메세지 출력
            console.log('error :', err);
            setError("게시글을 삭제하는데 실패했습니다.");
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const handleModify = () => {

        
        navigate(`/modify/${id}`)

    }

    return(
        <>
            <h1>게시글 상세 조회</h1>
            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "24px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                }}
                >
                <h2 style={{ marginBottom: "16px", color: "#2e7d32" }}>
                    제목 : <span style={{ color: "#333", fontWeight: "600" }}>{article.title}</span>
                </h2>
                <p style={{ marginBottom: "8px", color: "#555" }}>
                    <strong>작성자 :</strong> {article.writer}
                </p>
                <p style={{ marginBottom: "8px", color: "#555" }}>
                    <strong>작성일자 :</strong> {article.regDate}
                </p>
                <p style={{ marginTop: "16px", lineHeight: "1.6", color: "#444" }}>
                    <strong>내용 :</strong><br />
                    {article.contents}
                </p>
                </div>

                <div style={{ display: "flex", gap: "12px", marginBottom: "40px", justifyContent: "center" }}>
                <button
                    onClick={handleModify}
                    style={{
                    padding: "10px 20px",
                    backgroundColor: "#2e7d32",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600",
                    border: "1px solid white",
                    }}
                >
                    수정
                </button>
                <button
                    onClick={handleRemove}
                    style={{
                    padding: "10px 20px",
                    backgroundColor: "#c62828",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600",
                    border: "1px solid white",
                    }}
                >
                    삭제
                </button>
                <button
                    onClick={() => navigate('/list')}
                    style={{
                    padding: "10px 20px",
                    backgroundColor: "#555",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600",
                    border: "1px solid white",
                    }}
                >
                    목록조회
                </button>
                </div>

        </>
    );
}

export default ArticleView;