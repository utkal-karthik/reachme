import { Inter } from '@next/font/google';
import Login from "../components/Login"
import React from 'react';
import Header from '../components/Header';
import TableData from '../components/TableData';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [loggedIn,setLoggedIn] = React.useState(false)
  const [data,setData] = React.useState([])
  const [totalCount,setTotalCount] = React.useState('')
  const [loading,setLoading] = React.useState(true)
  const [loadingState, setLoadingState] = React.useState(true)

  const getData = async (page) => {
    setLoading(true)
    await axios.get(`/api/messages?page=${parseInt(page)}`)
    .then(res => {
      setTotalCount(res.data.totalCount)
      setData(res.data.data)
      setLoading(false)
    }) 
    .catch(err => console.log(JSON.stringify(err)))
  }

  React.useEffect(() => {
    let user = localStorage.getItem('user')
    !user ? setLoggedIn(false) : setLoggedIn(true)
    getData(0)
    setLoadingState(false)
  },[])

  if(loadingState) {
    return 'Loading.....'
  }

  if(!loggedIn) {
    return <Login />
  }

  

  return (
    <>
     <Header />
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-12 col-lg-12">
              <TableData 
                data={data} 
                paginateApi={(page) => getData(page)}
                filters={{}}
                paginate={true}
                loading={loading}
                totalCount={totalCount}
                arrayData={[
                  {label:"Name",name:"name"},
                  {label:"Age",name:"age"},
                  {label:"Time",name:"time",date:true},
                  {label:"Mobile ID",name:"mobileId"},
                  {label:"Mobile No",name:"fromMobile"},
                ]}
              />
        </div>
      </div>
     </div>
    </>
  )
}
