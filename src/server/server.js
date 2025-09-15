import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express'
import mysql from 'mysql2'
import cors from 'cors'

// 웹 서버 설정, 라우팅 설정, 미들웨어 등록 가능
const app = express();

app.use(cors());

app.use(express.json());

const PORT = 5000;

// 웹 서버 실행
app.listen (PORT, () => {
    console.log(`Web server running ar http://localhost:${PORT}`);
});

// DB 접속 정보
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME    
});

// DB 연결 테스트
db.connect((err) => {
    console.log("err : ", err);
    if (!err) {
        console.log("DB 연결 완료");
    } else {
        console.log("DB 연결 실패");        
    }
});

// 라우팅 설정
app.get('/', (req, res) => { // 핸들러 함수
    console.log('call get /');
    
    res.send('<h1>Welcome!</h1>');
});

// 게시글 목록 조회
app.get('/api/articles', (req, res) => {
    console.log('call get /api/articles');
   
    const sql = `SELECT id, title, writer, DATE_FORMAT(reg_date, "%Y-%m-%d %H:%i") AS reg_date 
                   FROM article 
                  ORDER BY id DESC`;
    
    db.query(sql, (err, data) => {
        if(!err) { // null
            console.log('data : ', data);
            res.json(data); // res.status(200).json(data);
        } else {
            console.log('error :', error);
            res.status(100).json({error : 'DB query error'});
        }
    })
});