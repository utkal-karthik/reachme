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

  const getData = async (page) => [
    await axios.get(`/api/messages?page=${page}`)
    .then(res => {
      setTotalCount(res.data.totalCount)
      setData(res.data.data)
      setLoading(false)
    }) 
    .catch(err => console.log(JSON.stringify(err)))
  ]

  React.useEffect(() => {
    let user = localStorage.getItem('user')
    !user ? setLoggedIn(false) : setLoggedIn(true)
    getData(0)
  },[])

  if(!loggedIn) {
    return <Login />
  }

  

  return (
    <>
     <Header />
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
              <TableData 
                data={data} 
                paginateApi={getData}
                filters={{}}
                paginate={true}
                loading={loading}
                totalCount={totalCount}
              />
        </div>
      </div>
     </div>
    </>
  )
}
