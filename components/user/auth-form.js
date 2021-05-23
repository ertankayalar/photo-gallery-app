import React from 'react'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const router = useRouter()

  async function submitHandler(event) {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    console.log(`enteredEmail`, enteredEmail)
    console.log(`enteredPassword`, enteredPassword)

    const response = await signIn('credentials', {
      redirect: false,
      username: enteredEmail,
      password: enteredPassword,
    })

    console.log(`response`, response)

    if (response.error) {
      setError(response.error)
    } else if (response.ok) {
      console.log(`response.ok`, response.ok)
      router.replace('/')
    }
  }
  return (
    <div className='flex min-h-screen bg-white dark:bg-gray-900'>
      <div className='container mx-auto'>
        <div className='max-w-md mx-auto my-10'>
          <div className='text-center'>
            <h1 className='my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200'>
              Sign in
            </h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Sign in to access your account
            </p>
          </div>
          <div className='m-7'>
            <form onSubmit={submitHandler}>
              <div className='mb-6'>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='you@example.com'
                  required
                  ref={emailInputRef}
                  className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                />
              </div>
              <div className='mb-6'>
                <div className='flex justify-between mb-2'>
                  <label
                    htmlFor='password'
                    className='text-sm text-gray-600 dark:text-gray-400'
                  >
                    Password
                  </label>
                  <a
                    href='#!'
                    className='text-sm text-gray-400 focus:outline-none focus:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300'
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Your Password'
                  required
                  ref={passwordInputRef}
                  className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                />
              </div>
              <div className='mb-6'>
                <button className='w-full px-3 py-4 text-white bg-gray-600 rounded-md focus:bg-gray-700 focus:outline-none'>
                  Sign in
                </button>
              </div>
              <p className='text-sm text-center text-gray-400'>
                Don&#x27;t have an account yet?{' '}
                <a
                  href='#!'
                  className='text-gray-800 focus:outline-none focus:underline focus:text-gray-500 dark:focus:border-gray-800 hover:underline'
                >
                  Sign up
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
