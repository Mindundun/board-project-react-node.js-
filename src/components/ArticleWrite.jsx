import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { postArticle } from "../api/articleApi";

const initialArticle = {
    title : '',
    writer : '',
    contents : ''
}

function ArticleWrite() {

    // state
    const [ article, setArticle ] = useState({...initialArticle});
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();

    // event handler
    const handleChangeForm = (e) => {
        setArticle({
            ...article,
            [e.target.name] : e.target.value
        });

        // navigate('/list');
    }


    // event handler
    const handleSubmit = () => {
        setLoading(true);

        const { title, writer, contents } = article;

        if (title.trim() === '') {
            alert("제목을 입력하세요.");
            
        } else if (writer.trim() === '') {
            alert("작성자를 입력하세요.");
        } else if (contents.trim() === '') {
            alert("내용을 입력하세요.");
        } else {
            if (confirm("게시글을 등록하시겠습니까?")) {
                postArticle(article)
                    .then((data) => {
                        // 등록 후 목록으로 이동
                        console.log("postArticle data : ", data);
                        // navigate('/list', {replace : true});
                    })
                    .catch((err) => {
                        // 에러 메세지 출력
                        console.log('error :', err);
                        setError("게시글을 등록하는데 실패했습니다.");
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
                <h1 className="form-title">게시글 등록</h1>

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
                    <button type="button" onClick={handleSubmit}>Sumbit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>    
            </div>                
        </>
    );
}

export default ArticleWrite;