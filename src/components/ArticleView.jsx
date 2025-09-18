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
    const [ loding, setLoading ] = useState(false);

    
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
    
    if (loding) {
        return (<h2>Loding..</h2>);
    }

    if (error) {
        return (<h2>{error}</h2>);
    }

    // 비동기 처리이다보니,, 느려서 아래의 구문이 필요,,
    if (!article) {
        return (<h2>데이터를 불러오는 중입니다...</h2>);
    }

    const handleRemove = () => {

        console.log("idididi",id);
        
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

    return(
        <>
            <h1>ArticleView</h1>
            <div>
                <h2>제목 : {article.title}</h2>
                <h2>작성자 : {article.writer}</h2>     
                <h2>작성일자 : {article.reg_date}</h2>   
                <h2>내용 : {article.contents}</h2>    
            </div>
            <div>
                <button>수정</button>
                <button onClick={handleRemove}>삭제</button>
                <button onClick={() => navigate('/list')}>목록조회</button>
            </div>
        </>
    );
}

export default ArticleView;