import { useNavigate } from "react-router-dom";


const PageComponent = ({ serverData, movePage }) => {     // moveToList

    console.log(serverData);


    return (
        <>
            {
                serverData.prev ?

                    <span onClick={() => { movePage({ page: serverData.prevPage, size: serverData.size }) }}>이전</span> : <></>

            }

            {
                serverData.pageNumList.map((pageNum) => {
                    console.log("현재 pageNum:", pageNum); // ← 콘솔 출력

                    return <span key={pageNum}
                        style={{
                            color: pageNum == serverData.currentPage ? 'blue' : 'black',
                            cursor: 'pointer',
                            margin: '0.5px'
                        }}
                        onClick={() => { console.log("이동할 페이지:", pageNum); movePage({ page: pageNum, size: serverData.size }); }}>
                        {pageNum}
                    </span>
                    
                })
            }

            {
                serverData.next ?

                    <span onClick={() => { movePage({ page: serverData.nextPage, size: serverData.size }) }}>다음</span> : <></>

            }



        </>
    );


}


export default PageComponent;