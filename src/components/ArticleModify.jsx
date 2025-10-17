import { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { fetchArticle, putArticle } from '../api/articleApi.js'

function ArticleModify() {

    //url parameter
    const { id } = useParams();  // {id: 1}

    //state
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();

    useEffect(() => {

        setLoading(true)

        fetchArticle(id)
            .then((data) => {
                console.log('data : ', data);
                setArticle(data);
            })
            .catch((err) => {
                console.log('error : ', err);
                setError('게시글 정보를 읽어들이는데 실패했습니다.');
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);


    //event listener
    const handleModify = () => {

        setLoading(true)

        putArticle(article)
            .then((data) => {
                console.log('data : ', data);
                navigate('/list', { replace: true });
            })
            .catch((err) => {
                console.log('error : ', err);
                setError('게시글 정보를 수정하는데 실패했습니다.');
            })
            .finally(() => {
                setLoading(false);
            });

    }

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    }

    if (error) {
        return (<h2>{error}</h2>);
    }

    if (loading) {
        return (<h2>Loading...</h2>);
    }


    return (
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
                        value={article.contents}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={handleModify}>Modify</button>
                    <button type="button">Reset</button>
                </div>
            </div>

        </>

    )
}


export default ArticleModify;