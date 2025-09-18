import axios from "axios";

const API_SERVER_HOST = 'http://localhost:5000';
const prefix = `${API_SERVER_HOST}/api`;

// 게시글 목록 조회 요청 ( 비동기 )
export const fetchArticles = async() => {    // async는 Promise 객체 반환
    const res = await axios.get(`${prefix}/articles`);
    console.log("fetchArticles res data : ", res.data);   // axios가 Array 객체로 만듬
    
    return res.data;
};

// 게시글 목록 상세 조회 요청
export const fetchArticle = async(id) => {
    const res = await axios.get(`${prefix}/articles/${id}`);
    console.log("fetchArticle res data : ", res.data[0]); 
    return res.data[0];
};

// 게시글 삭제 요청 : deleteArticle
export const deleteArticle = async(id) => {
    const res = await axios.delete(`${prefix}/articles/${id}`);
    console.log("deleteArticle res data : ", res.data);
    return res.data; 
};