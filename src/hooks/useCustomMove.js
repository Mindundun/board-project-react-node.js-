import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

// 페이지 이동 로직을 재사용하기 위한 훅
export function useCustomMove(){

    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1;
    const size = parseInt(searchParams.get('size')) || 10;

    const queryDefault = createSearchParams({page, size});

    // page=1&size=10
    console.log('queryDefault : ', queryDefault);

    // 게시글 목록 조회 페이지 이동
    const moveToList = (pageParams) => { // {page:1, size:10}

        let queryStr ='';

        if (pageParams) {
            const page = parseInt(pageParams.page) || 1;
            const size = parseInt(pageParams.size) || 10;
            
            queryStr = createSearchParams({page, size});
        } else {
            queryStr = queryDefault;
        }

        navigate(`/list?${queryStr}`);
    }


    // 게시글 상세 조회 페이지 이동
    const moveToView = (id) => {

        navigate(`/view/${id}?${queryDefault}`);
        

    }


    // 게시글 수정 화면 페이지 이동
    const moveToModify = (id) => {

        navigate(`/modify/${id}?${queryDefault}`);
        

    }

    return {moveToList, moveToView, moveToModify, page, size};

}