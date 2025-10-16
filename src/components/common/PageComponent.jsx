import { useNavigate } from "react-router-dom";

const PageComponent = ( { serverData, movePage } ) => {

    const navigate = useNavigate();

    return (
        <>
            {
                serverData.prev ? <span onClick={() => {movePage({page:serverData.prevPage,size:serverData.size})}}>이전</span> : <></>
            }

            {
                serverData.pageNumList.map( (pageNum) => {
                    return <span key={pageNum}
                            style={{
                                color: pageNum == serverData.currentPage ? '#2e7d32' : 'white',
                                cursor: 'pointer',
                                margin: '0.5px'
                            }}
                            onClick={() => {movePage({page:pageNum,size:serverData.size})}}
                            >

                        {pageNum}
                    </span>
                })
            }

            {
                serverData.next ? <span onClick={() => {movePage({page:serverData.nextPage,size:serverData.size})}}>다음</span> : <></>
            }
        </>
    )

}

export default PageComponent;