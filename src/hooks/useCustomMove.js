import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

// 페이지 이동 로직을 재사용하기 위한 훅
export function useCustomMove(){

    const navigate = useNavigate();

    const [ searchParams, setSearchParams ] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1;
    const size = parseInt(searchParams.get('size')) || 10;

    const keyfield = searchParams.get("keyfield");
    const keyword = searchParams.get("keyword");

    let queryDefault = "";
    if (keyfield != null && keyword != null) {
        queryDefault = createSearchParams({page, size, keyfield, keyword});
    } else {
        queryDefault = createSearchParams({page, size});
    }

    // page=1&size=10
    // page=1&size=10&keyfield=writer&keyword=writer
    console.log('queryDefault : ', queryDefault);

    // 게시글 목록 조회 페이지 이동
    const moveToList = (pageParams) => { // {page:1, size:10}
        let queryStr ='';
        
        if (pageParams) {
            const page = parseInt(pageParams.page) || 1;
            const size = parseInt(pageParams.size) || 10;
            const keyfield = pageParams.keyfield;
            const keyword = pageParams.keyword;

            
            if (keyfield != null && keyword != null) {
                
                queryDefault = createSearchParams({page, size, keyfield, keyword});
            } else {
                queryDefault = createSearchParams({page, size});
                console.log("================queryDefault",queryDefault);
            }
            
            queryStr = queryDefault;

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

    return {moveToList, moveToView, moveToModify, page, size, keyfield, keyword};

}