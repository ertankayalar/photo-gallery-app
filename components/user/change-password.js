import React from 'react'
import { useRef, useState } from 'react'
import { getSession, signIn } from 'next-auth/client'
import axios from 'axios'

const ChangePasswordForm = ({ onChangePassword }) => {
  const oldPasswordRef = useRef()
  const newPasswordRef = useRef()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function submitHandler(event) {
    event.preventDefault()

    setError('')
    setMessage('')

    const enteredOldPassword = oldPasswordRef.current.value
    const enteredNewPassword = newPasswordRef.current.value

    // optional: Add validation

    //  check session email and old password is correct

    const session = await getSession()

    console.log(`session.user`, session.user)
    if (!session) {
      return
    }

    const result = await signIn('credentials', {
      redirect: false,
      username: session.user.email,
      password: enteredOldPassword,
    })

    console.log(`result`, result)
    if (!result.error) {
      // const response = onChangePassword({
      //   userId: session.user.id,
      //   userEmail: session.userEmail,
      //   oldPassword: enteredOldPassword,
      //   newPassword: enteredNewPassword,
      // })

      const response = await axios.post('/api/user/change-password', {
        userId: session.user.id,
        //userEmail: session.userEmail,
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      })
      console.log(`response`, response)
      if (response.status == 200) {
        setMessage(response.data.message)
      } else {
        setError(response.data.error)
      }
    } else {
      setError('Old password is invalid')
    }
  }
  return (
    <div className='max-w-md mx-auto my-10'>
      <div className='text-center'>
        <h1 className='my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200'>
          Change Password
        </h1>
        <p className='text-gray-500 dark:text-gray-400'></p>
      </div>

      <form onSubmit={submitHandler}>
        <div className='mb-6'>
          <label
            htmlFor='old-password'
            className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
          >
            Old Password
          </label>
          <input
            type='password'
            id='old-password'
            ref={oldPasswordRef}
            required
            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='new-password'
            className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
          >
            New Password
          </label>
          <input
            type='password'
            id='new-password'
            ref={newPasswordRef}
            required
            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
          />
        </div>
        <div className='text-green-700 w-full py-3'>{message}</div>
        <div className='text-red-600 w-full py-3'>{error}</div>
        <div className='mb-5'>
          <button className='w-full px-3 py-4 text-white bg-gray-600 rounded-md focus:bg-gray-700 focus:outline-none'>
            Change Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
