import React from "react";
import Moment from 'react-moment';
import {Table} from "antd";

function TableData({data,paginateApi,paginate,totalCount,loading}) {

    // let dispatch = useDispatch()
    const [page,setPage] = React.useState(1)
  
    if(!data) {
      return (
        <>
          <div className="text-center mt-4">
            <h6>Work needs to be done for table</h6>
          </div>
        </>
      )
    }
    console.log('data')
    console.log(data)
    
    let pageCount = Math.ceil(parseInt(totalCount) / 20);
  
    let objectData = data.find((item,index) => index == 0)
    let mapData = objectData ? Object.keys(objectData) : [];
  
    let lp =  mapData && mapData.map((item,i) => {
        return {
            title: `${item}`,
            dataIndex: `${item}`,
            key: i,
            width: 120,
            textWrap: 'word-break',
            ellipsis: true,
            fixed: i < 1 ? 'left' : null,
            sorter: true,
            render: (val) => (
              <>
                {
                    val
                }
              </>
            )
        }
    })
  
    return (
      <>
        <div className="row mt-3">
            <h3 className="my-4 text-uppercase text-center">User Messages</h3>
          <div className="col-lg-12">
            <Table
                style={{ whiteSpace: 'break-spaces'}}
                loading={loading}
                columns={lp}
                dataSource={data}
                scroll={{
                  x: 200,
                  y: 300,
                }}
                pagination={paginate == true ? {
                  pageSize:20,
                  total: pageCount,
                  current: page,
                  onChange: (page) => {
                    setPage(page)
                    paginateApi({page:page})
                  },
                } : {showSizeChanger:true,pageSize:20}}
              />
          </div>
        </div>
      </>
      
    )
}
  

export default TableData;