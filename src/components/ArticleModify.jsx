import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle, putArticle } from "../api/articleApi";

const initialArticle = {
    title : '',
    writer : '',
    contents : ''
}

function ArticleModify(){
    // Url Params
    const { id } = useParams();

    // status
    const [ article, setArticle ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();

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

    // event handler
    const handleChangeForm = (e) => {
        setArticle({
            ...article,
            [e.target.name] : e.target.value
        })

    }

    // event handler
    const handleModify = () => {
        
        setLoading(true);
        
        const { title, writer, contents } = article;
        
        if (title.trim() === '') {
            alert("제목을 입력하세요.");
            
        } else if (writer.trim() === '') {
            alert("작성자를 입력하세요.");
        } else if (contents.trim() === '') {
            alert("내용을 입력하세요.");
        } else {
            if (confirm("게시글을 수정하시겠습니까?")) {
                putArticle(article)
                    .then((data) => {
                        // 등록 후 목록으로 이동
                        console.log("putArticle data : ", data);
                        navigate('/list', {replace : true});
                    })
                    .catch((err) => {
                        // 에러 메세지 출력
                        console.log('error :', err);
                        setError("게시글을 수정하는데 실패했습니다.");
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            }
        }

    }

    const handleReset = () => {
        setArticle(initialArticle);
    }

    if (loading) {
        return (<h2>Loading..</h2>);
    }

    if (error) {
        return (<h2>{error}</h2>);
    }

    return(
        <>
            <div className="form-container">
                <h1 className="form-title">게시글 수정</h1>

                <div style={{ marginBottom: "16px" }}></div>

                <div className="form-group-horizontal">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        name="title"          
                        value={article.title}
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="writer">작성자</label>
                    <input
                        type="text"
                        name="writer"        
                        value={article.writer}
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="contents">내용</label>
                    <textarea
                        name="contents"                                
                        value={article.contents}                 
                        onChange={handleChangeForm}
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={handleModify}>Modify</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>    
            </div>                
        </>
    );
}

export default ArticleModify;