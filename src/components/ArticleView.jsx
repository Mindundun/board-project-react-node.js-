import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchArticle, deleteArticle } from '../api/articleApi.js'
import { useCustomMove } from "../hooks/useCustomMove.js";


function ArticleView() {


    // url parameter
    const { id } = useParams(); // {id: 1}    
    console.log('id : ', id);

    const { moveToList, moveToModify, page, size } = useCustomMove();


    // state
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);
    const [loding, setLoading] = useState(false);


    useEffect(() => {

        setLoading(true);

        fetchArticle(id)
            .then((data) => {
                console.log('data : ', data);
                setArticle(data);
            })
            .catch((err) => {
                console.log('error : ', err);
                setError("게시글 상세 정보를 조회하는데 실패했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);


    if (loding) {
        return (<h2>Loading...</h2>);
    }

    if (error) {
        return (<h2>{error}</h2>);
    }


    const handleRemove = () => {
        setLoading(true);

        deleteArticle(id)
            .then((data) => {
                console.log('data : ', data);    //{msg : '게시글이 삭제되었습니다.'}
                moveToList();
            })
            .catch((error) => {
                console.log('error : ', error); //{error: 'DB query error'}
                setError('게시글 정보를 삭제히는데 실패했습니다.');
            })
            .finally(() => {
                setLoading(false);
            })
    }

    // event handler
    const handleModifiy = () => {
        moveToModify(id);
    }

    return (
        <>
            <div>
                <h2>제목 : {article.title}</h2>
                <h3>작성자 : {article.writer}</h3>
                <h3>작성일자 : {article.reg_date}</h3>
                <h3>내용 : {article.contents}</h3>
            </div>
            <div>
                <button onClick={handleModifiy}>수정</button>
                <button onClick={handleRemove}>삭제</button>
                <button onClick={() => moveToList()} >목록조회</button>
            </div>
        </>
    )
}





export default ArticleView;