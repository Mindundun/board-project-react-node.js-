import { useEffect, useState } from "react";
import { fetchArticle } from "../api/articleApi";

function ArticleList() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticle()
        .then((data) => {
            console.log('data :', data);
            setArticles(data);
        })
        .catch((error) => {
            console.log('error :', Error);
        })

    }, [])

    return(
        <>
            <h1>ArticleList Component</h1>
            <table>
                <thead style={{backgroundColor: "lightpink", color: "black"}}>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>일자</th>
                </thead>
                <tbody>
                    {articles.map((article, index) => {
                        return(
                        <tr key={article.id} style={{backgroundColor: "lightblue", color: "black"}}>

                            <td>No. {index + 1}</td>
                            <td>{article.title}</td>
                            <td>{article.writer}</td>
                            <td>{article.reg_date}</td>                                                         
                           
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        
        </>
    );

}

export default ArticleList;