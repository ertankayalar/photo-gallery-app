import React from 'react'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import axios from 'axios'

async function createUser(email, password, subscribe) {
  // const response = await fetch('/api/auth/signup', {
  //   method: 'POST',
  //   body: JSON.stringify({ email, password }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })

  // const data = await response.json()

  const response = await axios.post('/api/auth/signup', {
    email,
    password,
    subscribe,
  })

  console.log('response', response)

  if (response.status != 201) {
    throw new Error(response.message || 'Something went wrong!')
  }
  return response.data
}

const AuthForm = () => {
  const [loginError, setError] = useState('')
  const [message, setMessage] = useState('')
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const subscribeInputRef = useRef()
  const [isLogin, setIsLogin] = useState(true)

  const router = useRouter()
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  async function submitHandler(event) {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    const enteredSubscribe = !isLogin
      ? subscribeInputRef.current.checked
      : false

    console.log(`Submit handler`)

    // optional: add validation

    if (isLogin) {
      const response = await signIn('credentials', {
        redirect: false,
        username: enteredEmail,
        password: enteredPassword,
      })
      console.log(`response`, response)

      if (!response.error) {
        router.replace('/member/collections')
      }
    } else {
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          enteredSubscribe
        )
        console.log(result)
        if (result.id) {
          setMessage(result.message)
          switchAuthModeHandler()
        }
      } catch (error) {
        console.log('Error', error)
      }
    }

    // if (response.error) {
    //   setError(response.error)
    // } else if (response.ok) {
    //   console.log(`response.ok`, response.ok)
    //   router.replace('/')
    // }
  }
  return (
    <div className='flex min-h-screen bg-white dark:bg-gray-900'>
      <div className='container mx-auto'>
        <div className='max-w-md mx-auto my-10'>
          <div className='text-center'>
            <h1 className='my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200'>
              {isLogin ? 'Login' : 'Create Account'}
            </h1>
            <p className='text-gray-500 dark:text-gray-400'>
              {isLogin
                ? 'Sign in to access your account'
                : 'Create an account for upload your collection'}
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
                  {/* <a
                    href='#!'
                    className='text-sm text-gray-400 focus:outline-none focus:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300'
                  >
                    Forgot password?
                  </a> */}
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
              {!isLogin && (
                <div className='mb-6'>
                  <input
                    type='checkbox'
                    value='subscribe'
                    className='mx-2 p-3'
                    ref={subscribeInputRef}
                  />
                  <label
                    htmlFor='subscribe'
                    className='text-sm text-gray-600 dark:text-gray-400'
                  >
                    Subscribe Under Microscope mailing list
                  </label>
                </div>
              )}

              <div className='mb-6'>
                <button className='w-full px-3 py-4 text-white bg-gray-600 rounded-md focus:bg-gray-700 focus:outline-none'>
                  {isLogin ? 'Login' : 'Create Account'}
                </button>
              </div>
              <div className='text-green-700 w-full py-3'>{message}</div>
              <div className='text-red-600 w-full py-3'>{loginError}</div>

              <p className='text-sm text-center text-gray-400'>
                Don&#x27;t have an account yet?{' '}
                {/* <a
                  href='/register'
                  className='text-gray-800 focus:outline-none focus:underline focus:text-gray-500 dark:focus:border-gray-800 hover:underline'
                >
                  Sign up
                </a>
                . */}
                <button
                  type='button'
                  onClick={switchAuthModeHandler}
                  className='hover:underline text-gray-600'
                >
                  {isLogin
                    ? 'Create new account'
                    : 'Login with existing account'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
