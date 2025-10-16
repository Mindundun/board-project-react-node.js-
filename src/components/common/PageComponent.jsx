import { useNavigate } from "react-router-dom";

const PageComponent = ( { serverData } ) => {

    const navigate = useNavigate();

    return (
        <>
            {
                serverData.prev ? <span onClick={() => {navigate(`/list?page=${serverData.prevPage}&size=${serverData.size}`)}}>이전</span> : <></>
            }

            {
                serverData.pageNumList.map( (pageNum) => {
                    return <span
                            style={{
                                color: pageNum == serverData.currentPage ? '#2e7d32' : 'white',
                                cursor: 'pointer',
                                margin: '0.5px'
                            }}
                            onClick={() => {navigate(`/list?page=${pageNum}&size=${serverData.size}`)}}
                            >

                        {pageNum}
                    </span>
                })
            }

            {
                serverData.next ? <span onClick={() => {navigate(`/list?page=${serverData.nextPage}&size=${serverData.size}`)}}>다음</span> : <></>
            }
        </>
    )

}

export default PageComponent;