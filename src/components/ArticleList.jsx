import { useEffect, useState } from "react";
import { fetchArticles } from '../api/articleApi.js'
import PageComponent from "./common/PageComponent";
import { useCustomMove } from "../hooks/useCustomMove.js";
import { useSearchParams } from "react-router-dom";


const initialState = {
    dtoList: [],
    pageRequestDto: null,
    totalCount: 0,
    pageNumList: [],
    prev: false,
    next: false,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
}


function ArticleList() {

    const [searchParams, setSearchParams] = useSearchParams();

    // state
    const [serverData, setServerData] = useState({ ...initialState });

    const [keyfield, setKeyfield] = useState("");

    const [keyword, setKeyword] = useState("");

    // 로딩 상태
    const [Loading, setLoading] = useState(false);

    const { moveToList, moveToView, page, size } = useCustomMove();

    //const { moveToList, moveToView, page, size, keyfield, keyword } = useCustomMove();

    useEffect(() => {

        const keyfieldParam = searchParams.get('keyfield');
        const keywordParam = searchParams.get('keyword');
        
        if (keyfieldParam != null && keywordParam != null) {
            fetchArticles({
                page,
                size,
                keyfield: keyfieldParam,
                keyword: keywordParam
            })
                .then(data => {
                    console.log('data : ', data);
                    setServerData(data);
                })
                .catch(err => {
                    console.log('error : ', err);
                });

        } else {
            fetchArticles({
                page,
                size,
                keyfield: keyfield,
                keyword: keyword
            })
                .then(data => {
                    console.log('data : ', data);
                    setServerData(data);
                })
                .catch(err => {
                    console.log('error : ', err);
                });
        }

    }, [page]);


    // event handler
    const handleChangeKeyfield = (e) => {
        setKeyfield(e.target.value);
    }

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const handleClickSearch = () => {

        if (!keyfield || !keyword) {
            alert("검색 조건을 선택하고 검색어를 입력하세요");
            return;
        }

        console.log("keyfield : ", keyfield, "keyword : ", keyword);
        setLoading(true);

        fetchArticles({ page: 1, size: size, keyfield: keyfield, keyword: keyword })
            .then((data) => {
                setServerData(data);
                moveToList({ page: 1, size: size, keyfield: keyfield, keyword: keyword })
            })
            .catch((error) => {
                console.error("Error ", error);
            })
            .finally(() => {
                setLoading(false);
            })
            console.log("===============serverData",serverData);

    }



    return (
        <>
            <h1>게시글 목록 </h1>
            {/* 검색 폼 */}
            <div>
                <select value={keyfield} onChange={handleChangeKeyfield}>
                    <option value="">선택</option>
                    <option value="writer">작성자</option>
                    <option value="contents">내용</option>
                    <option value="title">제목</option>
                </select>&nbsp;&nbsp;
                <input type="text" value={keyword} placeholder="검색어 입력" onChange={handleChangeKeyword} />
                <button type="button" onClick={handleClickSearch}>검색</button>
            </div>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        serverData.dtoList.map((article, index) => (
                            <tr key={article.id}>
                                <td>{(serverData.totalCount - (page - 1) * size) - index}</td>
                                <td style={{ cursor: 'pointer', color: 'gray', textDecoration: 'underline' }}
                                    onClick={() => { moveToView(article.id) }}>{article.title}</td>
                                <td>{article.writer}</td>
                                <td>{article.regDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>

        </>

    );

}


export default ArticleList;