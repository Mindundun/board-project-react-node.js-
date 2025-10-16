import { useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 
import { fetchArticles } from "../api/articleApi"; 
import PageComponent from "./common/PageComponent";
import { useCustomMove } from "../hooks/useCustomMove";

const initialState = {
    dtoList : [],
    pageRequestDto: null,
    totalCount: 0,
    prev: false,
    next: false,
    // start: 0,
    // end: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0,
    // size: 0,
    // pageSize: 0,
    pageNumList:[]
}

function ArticleList() { 
    const [serverData, setServerData] = useState({...initialState}); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 

    const [keyfield, setKeyfield] = useState(""); // 검색 조건
    const [keyword, setKeyword] = useState("");   // 검색어

    // const [searchParams, setSearchParams] = useSearchParams();
    // const page = parseInt(searchParams.get('page')) || 1;
    // const size = parseInt(searchParams.get('size')) || 10;

    // const navigate = useNavigate(); 

    const {moveToList, moveToView, page, size} = useCustomMove();



    const loadArticles = () => {
    setLoading(true);
    fetchArticles(keyfield, keyword)
      .then((data) => {
        setArticles(data);
        setError(null);
      })
      .catch(() => {
        setError("게시글을 불러오는 데 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
    const handleSearch = (e) => {
        e.preventDefault();
        // keyword가 없으면 keyfield도 빈 문자열로 초기화해서 전체조회 가능하게 함
        if (keyword.trim() === "") {
        setKeyfield("");
        setKeyword("");
        fetchArticles("", "")
            .then((data) => setArticles(data))
            .catch(() => setError("게시글을 불러오는 데 실패했습니다."));
        } else {
        loadArticles();
        }
    };

    useEffect(() => { 
        setLoading(true);

        fetchArticles({page, size}) 
            .then((data) => {
                console.log('data :', data);
                setServerData(data);
                setError(null);
            }) 
            .catch((err) => {
                console.error('error :', err);
                setError("게시글을 불러오는 데 실패했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });

    }, [page]); 

    

    if (loading) {
        return <h2>⏳ Loading...</h2>;
    }

    if (error) {
        return <h2 style={{ color: "red" }}>{error}</h2>;
    }

    return (
        <>
            <h1 style={{
                    textAlign: "center",
                    fontWeight: "800",
                    fontSize: "2.5rem",
                    color: "#ffffffff", 
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "32px",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    userSelect: "none",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
                }}>
                게시글 목록 조회
            </h1>

            <table border="1" cellPadding="8" cellSpacing="0" style={{
                                                                        width: "100%",
                                                                        borderCollapse: "collapse",
                                                                        marginTop: "20px", 
                                                                        marginBottom: "20px", 
                                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // 조금 부드러운 그림자
                                                                        borderRadius: "8px", // 모서리 둥글게
                                                                        overflow: "hidden", // 둥근 모서리 적용 위해 overflow 숨김
                                                                    }}> 
                <thead style={{ backgroundColor: "#2d580fc7", color: "#ffffffff", fontWeight: "700", fontSize: "1.1rem" }}>
                <tr>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>번호</th>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>제목</th>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>작성자</th>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>작성일자</th>
                </tr>
                </thead>
                <tbody>
                {serverData.dtoList.map((article, index) => (
                    <tr
                    key={article.id}
                    style={{
                        backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",  // 아주 연한 베이지/화이트 스트라이프
                        color: "#333",
                        transition: "background-color 0.25s ease",
                        cursor: "default",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#d9f0e7"} // 은은한 딥 그린 느낌 hover
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "#ffffff"}
                    >
                    <td style={{ padding: "12px 16px", textAlign: "center", fontWeight: "600", color: "#666" }}>
                        {(serverData.totalCount - (page-1) * size) - index}
                    </td>
                    <td
                        style={{
                        padding: "12px 16px",
                        color: "#2e7d32",  // 딥 그린 계열
                        textDecoration: "underline",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "400px",
                        cursor: "pointer",
                        userSelect: "none",
                        }}
                        onClick={() => { moveToView(article.id)}}
                    >
                        {article.title}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666", fontStyle: "italic" }}>
                        {article.writer}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666", fontSize: "0.9rem", textAlign: "center" }}>
                        {article.regDate}
                    </td>
                    </tr>
                ))}
                </tbody>



                {/* <tbody> 
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
                </tbody>  */}
            </table> 
            {/* 검색 폼 */}
            <div style={{ display: "flex", justifyContent: "center" }}>
            <form
                onSubmit={handleSearch}
                style={{
                marginBottom: "24px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
                maxWidth: "600px",
                width: "100%",
                }}
            >
                <select
                value={keyfield}
                onChange={(e) => setKeyfield(e.target.value)}
                style={{
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    fontSize: "1rem",
                    minWidth: "140px",
                    cursor: "pointer",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                }}
                >
                <option value="">검색 조건 선택</option>
                <option value="writer">작성자</option>
                <option value="contents">내용</option>
                <option value="title">제목</option>
                </select>

                <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                    flexGrow: 1,
                    minWidth: "200px",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                }}
                />

                <button
                type="submit"
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#2d580fc7",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(2, 136, 209, 0.3)",
                    transition: "background-color 0.3s ease",
                    border: "1px solid white",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0277bd")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d580fc7")}
                >
                검색
                </button>
            </form>
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>

            {/* <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
                <select
                value={keyfield}
                onChange={(e) => setKeyfield(e.target.value)}
                required
                >
                <option value="" disabled>
                    검색 조건 선택
                </option>
                <option value="writer">작성자</option>
                <option value="contents">내용</option>
                <option value="title">제목</option>
                </select>

                <input
                type="text"
                placeholder="검색어 입력"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
                style={{ marginLeft: "10px" }}
                />

                <button type="submit" style={{ marginLeft: "10px" }}>
                검색
                </button>
            </form> */}

        </>
    ); 
} 

export default ArticleList;
