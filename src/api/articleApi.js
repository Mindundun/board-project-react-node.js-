import axios from "axios";

const API_SERVER_HOST = 'http://localhost:5000';
const prefix = `${API_SERVER_HOST}/api`;

// 게시글 목록 조회 요청
export const fetchArticle = async() => {    // async는 Promise 객체 반환
    const res = await axios.get(`${prefix}/articles`);
    console.log("res data : ", res.data);   // axios가 Array 객체로 만듬
    
    return res.data;
};
