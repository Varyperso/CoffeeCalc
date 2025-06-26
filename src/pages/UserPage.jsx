import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { myFetch } from '../utils/myFetch'

const UserPage = () => {
  const { user } = useParams()

  const [pageUser, setPageUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await myFetch({ url: `https://localhost:5000/users/${user}` })
      setPageUser(fetchedUser)
    }
    fetchUser()
  }, [])

  if (!pageUser) return <p>User not found.</p>

  const lastLoginDate = new Date(pageUser.lastLogin)
  lastLoginDate.setHours(lastLoginDate.getHours() + 2)

  console.log(pageUser)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <img src={pageUser.avatar} alt="avatar" style={{ marginInline: 'auto' }} />
      <h1>Name: {pageUser.user}</h1>
      <p>Admin: {pageUser.admin?.toString()}</p>
      <p>Join Date: {new Date(pageUser.joinDate).toUTCString()}</p>
      <p>Last Login: {pageUser.admin === true ? 'Admin :)' : lastLoginDate.toUTCString()}</p>
      <p>Is Online? {(pageUser.isOnline ?? false).toString()}</p>
      <br />
      {pageUser.image ? (
        <img src={pageUser.image} alt="user uploaded img" style={{ width: '150px', height: '150px', marginInline: 'auto' }} />
      ) : (
        'no image'
      )}
    </div>
  )
}

export default UserPage
