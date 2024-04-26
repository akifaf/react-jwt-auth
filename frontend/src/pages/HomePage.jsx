import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getlocal } from '../helpers.js/auth'
import { refreshAuthToken } from '../redux/AuthSlice'

function HomePage() {
  // const dispatch = useDispatch()
  // const { loading, authToken,} = useSelector((store) => store.auth)

//   useEffect(() => {

//     if (loading) {
//      dispatch(refreshAuthToken())
//   }

//   let fourMinutes =  4 * 100 * 60
//   let interval = setInterval(() => {
//       if (authToken){
//         dispatch(refreshAuthToken(authToken.access))
//         console.log('got refreshed');
//         console.log('access',authToken.access);
//       }
//   }, fourMinutes)
//   return () => clearInterval(interval)
// }, [authToken, loading])
  
  return (

    <Layout>
    
    HomePage
    
    </Layout>
  )
}

export default HomePage



