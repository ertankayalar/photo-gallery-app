import React from 'react'
import { useRef, useState } from 'react'
import { getSession, signIn } from 'next-auth/client'
import axios from 'axios'

const ProfileForm = ({ userProfile }) => {
  const firstNameInputRef = useRef()
  const lastNameInputRef = useRef()
  const institutionInputRef = useRef()
  const biographyInputRef = useRef()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  //const [firstname, setFirstName] = useState('')
  const [firstName, setFirstName] = useState(
    userProfile.Firstname != null ? userProfile.Firstname : ''
  )
  const [lastName, setLastName] = useState(
    userProfile.Lastname != null ? userProfile.Lastname : ''
  )

  const [institution, setInstitution] = useState(
    userProfile.Institution != null ? userProfile.Institution : ''
  )

  const [biography, setBiography] = useState(
    userProfile.Biography != null ? userProfile.Biography : ''
  )

  async function submitHandler(event) {
    event.preventDefault()

    if (!firstName || firstName.length < 3) {
      setError('first name should be least 3 characters long')
    }

    if (!lastName || lastName.length < 3) {
      setError('first name should be least 3 characters long')
    }

    if (error == '') {
      const response = await axios.put('/api/user/update-profile', {
        Firstname: firstName,
        Lastname: lastName,
        Institution: institution,
        Biography: biography,
      })

      if (response.status == 200) {
        setMessage(response.data.message)
      } else {
        setError(response.statusText)
      }
      console.log(`response`, response)
    }

    return
  }
  return (
    <div className='max-w-lg mx-auto my-10'>
      <form onSubmit={submitHandler}>
        <div className='flex flex-wrap'>
          <div className='mb-6 w-1/2'>
            <label
              htmlFor='firstname'
              className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
            >
              First Name
            </label>
            <input
              type='text'
              name='firstname'
              id='firstname'
              placeholder='first name'
              required
              value={firstName}
              onChange={(event) => {
                setError('')
                setFirstName(event.target.value)
              }}
              ref={firstNameInputRef}
              className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
            />
          </div>
          <div className='mb-6 pl-1 w-1/2'>
            <label
              htmlFor='lastname'
              className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
            >
              Last Name
            </label>
            <input
              type='text'
              name='lastname'
              id='lastname'
              placeholder='last name'
              required
              value={lastName}
              onChange={(event) => {
                setError('')
                setLastName(event.target.value)
              }}
              ref={lastNameInputRef}
              className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
            />
          </div>
        </div>
        <div className='mb-6 '>
          <label
            htmlFor='institution'
            className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
          >
            Institution
          </label>
          <input
            type='text'
            name='institution'
            id='institution'
            placeholder='institution name'
            required
            value={institution}
            onChange={(event) => {
              setError('')
              setInstitution(event.target.value)
            }}
            ref={institutionInputRef}
            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
          />
        </div>
        <label className='block mt-5'>
          <span className='text-gray-700'>Biography</span>
          <textarea
            onChange={(event) => {
              setError('')
              setBiography(event.target.value)
            }}
            className='mt-1 block  rounded py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
            ref={biographyInputRef}
          >
            {biography}
          </textarea>
        </label>

        <div className='text-green-700 w-full py-3'>{message}</div>
        <div className='text-red-600 w-full py-3'>{error}</div>
        <div className='mb-5'>
          <button className='w-full px-3 py-4 text-white bg-gray-600 rounded-md focus:bg-gray-700 focus:outline-none'>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
