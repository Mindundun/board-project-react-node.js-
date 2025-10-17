import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postArticle } from "../api/articleApi";

const initialArticle = {
    title: '',
    writer: '',
    contents: ''
}

function ArticleWrite() {

    // state
    const [ article, setArticle ] = useState({...initialArticle});
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    // 페이지 이동
    const navigate = useNavigate();

    // event handler
    const handleChange = (e) => {
        setArticle({
            ...article ,
            [e.target.name]: e.target.value
        });
    }
    
    // event handler
    const handleSubmit = () => {

        const { title, writer, contents }  = article;

        if (title.trim() === '') {
            alert('제목을 입력하세요');
        } else if (writer.trim() === '') {  
            alert('작성자를 입력하세요');
        } else if (contents.trim() === '') {
            alert('내용을 입력하세요');
        } else {
            if (confirm('게시글을 등록하시겠습니까?')) {
                
                setLoading(true);

                postArticle(article)
                    .then((data) => {
                        console.log('data : ', data);
                        navigate('/list', {replace: true});                                
                    })
                    .catch((err) => {
                        console.log('error : ', err);
                        setError('게시글을 등록하는데 실패하였습니다.');                        
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }

    // event handler
    const handleReset = () => {
        setArticle(initialArticle);
    }

    if (error) {
        return (<h2>{error}</h2>);
    }

    if (loading) {
        return (<h2>Loading...</h2>);
    }


    return(<>
         <div className="form-container">

             <h1 className="form-title">게시글 등록</h1>

             <div style={{ marginBottom: "16px" }}></div> 

             <div className="form-group-horizontal">
                 <label htmlFor="title">제목</label>
                 <input
                     type="text"
                     name="title"
                     value={article.title}
                     onChange={handleChange}
                 />
             </div>
             <div className="form-group-horizontal">
                 <label htmlFor="writer">작성자</label>
                 <input
                     type="text"
                     name="writer" 
                     value={article.writer}
                     onChange={handleChange}       
                 />
             </div>
             <div className="form-group-horizontal">
                 <label htmlFor="contents">내용</label>
                 <textarea
                     name="contents"  
                     value={article.value}
                     onChange={handleChange}                                                                       
                 ></textarea>
             </div>
             <div className="form-actions">
                 <button type="button" onClick={handleSubmit}>Sumbit</button>
                 <button type="button" onClick={handleReset}>Reset</button>
             </div>     
         </div>     
         
     </>);
}


export default ArticleWrite;
