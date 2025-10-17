import axios from "axios";

const API_SERVER_HOST = 'http://localhost:9000';
const prefix = `${API_SERVER_HOST}/api/v1`;

// 게시글 목록 조회 요청 ( 비동기 )
// export const fetchArticles = async() => {    // async는 Promise 객체 반환
//     const res = await axios.get(`${prefix}/articles`);
    
//     console.log("fetchArticles res data : ", res.data);   // axios가 Array 객체로 만듬
    
//     return res.data;
// };

//1. 게시글 목록 조회 요청 (페이징)

export const fetchArticles = async ({ page, size, keyfield, keyword }) => {

    console.log('prefix : ', prefix);  // Array 객체

    const res = await axios.get(`${prefix}/articles`, { params: { page, size, keyfield, keyword } });

    console.log('res.data : ', res.data);  // Array 객체

    return res.data; // Promise 객체를 변환    

};



//2. 게시글 상세 조회 요청 : fetchArticle
export const fetchArticle = async (id) => {

    const res = await axios.get(`${prefix}/articles/${id}`);

    console.log('res.data : ', res.data);  // Array 객체

    return res.data; // Promise 객체를 변환   : { }  
}



//3. 게시글 삭제 요청 : deleteArticle

export const deleteArticle = async (id) => {

    const res = await axios.delete(`${prefix}/articles/${id}`);

    console.log('res.data : ', res.data);

    return res.data;
}


//4. 게시글 등록 요청 : postArticle
export const postArticle = async (article) => {

    const res = await axios.post(`${prefix}/articles`, article);

    console.log('res.data : ', res.data);

    return res.data;

}


//5. 게시글 수정 요청 : putArticle
export const putArticle = async (article) => {

    const res = await axios.put(`${prefix}/articles/${article.id}`, article);

    console.log('res.data : ', res.data);

    return res.data;

}