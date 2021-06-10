import React, { useState } from 'react'
import { getSession } from 'next-auth/client'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../../../components/layout/layout'
import Container from '../../../components/layout/container'
import Backdrop from '../../../components/ui/backdrop'
import ConfirmBox from '../../../components/ui/confim'
import EditIcon from '../../../components/ui/icon/edit'
import DeleteIcon from '../../../components/ui/icon/delete'
import UserPhotoCard from '../../../components/user/photo/card'
import PhotoForm from '../../../components/user/photo/form'
import Router from 'next/router'
import Breadcrumb from '../../../components/ui/breadcrumb'

/**
 *  Collection View
 *
 *
 */

const calcPercent = (value, total) => Math.round((value / total) * 100)

// show collection and photos
// add new photos
// edit photos
// edit collection

function CollectionView({ collection, api_url, session }) {
  const [userCollection, setUserCollection] = useState(collection)
  const [userPhotos, setUserPhotos] = useState(collection.photos)
  const [editPhoto, setEditPhoto] = useState(null)
  const [percent, setPercent] = useState(0)
  const { id, name, description } = collection
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false)
  const [isConfirmBoxOpen, setConfirmBoxOpen] = useState(false)
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)

  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/member/collections/`,
      name: `My Collections`,
    },
    {
      url: `/member/collection/${userCollection.id}`,
      name: userCollection.name,
      last: true,
    },
  ]

  // Open Photo Modal Handler
  function photoModalHandler() {
    setPhotoModalOpen(true)
  }

  // Close Add Photo Modal Box
  function closeModalHandler() {
    setPhotoModalOpen(false)
    setEditPhoto(null)
  }

  // Open Edit Photo Modal Box
  function editPhotoModalHandler(photo) {
    setEditPhoto(photo)
    photoModalHandler()
  }

  // Open Collection Delete Confirm Box
  function openDeleteCollectionHandler() {
    setConfirmBoxOpen(true)
  }

  // Close Collection Delete Confirm Box
  function closeCollectionDeleteConfirmHandler() {
    setConfirmBoxOpen(false)
  }

  async function deletePhotos(id) {
    const res = await axios.delete(`/api/user/photo/delete/${id}`)
  }
  // Delete Collection from Strapi
  async function onDeleteCollection() {
    console.log(`userCollection.id delete`, userCollection.id)
    setConfirmBoxOpen(false)
    // api/user/collection

    // delete all userPhotos
    // let res
    // userPhotos.forEach((up) => {
    //   res = await axios.delete(`/api/user/photo/delete/${up.id}`, {
    //     params: {
    //       id: up.id,
    //     },
    //   })
    // })

    // delete userCollection

    const res = await userPhotos.map((item) => deletePhotos(item.id))

    const response = await axios.delete(
      `/api/collection/delete/${userCollection.id}`
      // {
      //   params: {
      //     id: userCollection.id,
      //   },
      // }
    )
    if (response.status == 200) {
      console.log('Collection removed')
      Router.push(`/member/collections/`)
    } else {
      console.log(`response`, response)
    }
  }

  /**
   * Add Photo
   * @param {object} data
   */

  async function addPhotoHandler(data) {
    console.log('Photo data', data)

    const newPhotoData = {
      caption: data.caption,
      description: data.description,
      collection_id: collection._id,
    }

    // build form data
    const frmData = new FormData()

    if (data.photoFiles != null) {
      frmData.append('files.photo', data.photoFiles[0])
    }

    frmData.append('data', JSON.stringify(newPhotoData))

    console.log(`frmData`, frmData)

    try {
      const resAdd = await axios.post(`${api_url}/photos`, frmData, {
        onUploadProgress: (progress) =>
          setPercent(calcPercent(progress.loaded, progress.total)),
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      console.log('Add Photo Result =>', resAdd)
      if (resAdd.status == 200) {
        console.log('upload success')
        setIsUploadSuccess(true)
        setUserPhotos([...userPhotos, resAdd.data])

        setPhotoModalOpen(false)
        setEditPhoto(null)
      }
    } catch (error) {
      console.log('Exception Error', error)
    }
  }

  /** ------------------------------------------ */

  // old addPHotoHandler
  // async function addPhotoHandlerOld(photoData) {
  //   console.log(`photoData`, photoData)

  //   // upload photo
  //   let uploadedFiles = []
  //   let uploadSuccess = false

  //   const data = new FormData()
  //   data.append('files', photoData.photoFiles[0])

  //   try {
  //     const uploadRes = await axios.post(`${api_url}/upload`, data, {
  //       onUploadProgress: (progress) =>
  //         setPercent(calcPercent(progress.loaded, progress.total)),
  //       headers: {
  //         Authorization: `Bearer ${session.jwt}`,
  //       },
  //     })
  //     // buraya kadar completed dememesi gerekiyor
  //     console.log('Upload Result =>', uploadRes)
  //     if (uploadRes.status == 200) {
  //       console.log('upload success')
  //       uploadedFiles = uploadRes.data
  //       uploadSuccess = true
  //       setIsUploadSuccess(true)
  //     }
  //   } catch (err) {
  //     console.log('Exception Error', err)
  //   }

  //   // add photo db
  //   if (uploadSuccess) {
  //     const newPhoto = {
  //       caption: photoData.caption,
  //       description: photoData.description,
  //       photo: uploadedFiles[0].id, // id
  //       collection_id: collection._id,
  //     }

  //     const add = await fetch(`${api_url}/photos`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${session.jwt}`,
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newPhoto),
  //     })
  //     const addResponse = await add.json()
  //     console.log(`addResponse`, addResponse)
  //     setUserPhotos([...userPhotos, addResponse])
  //   }

  //   return {
  //     uploadSuccess,
  //   }
  // }

  /** ------------------------------------------ */

  /**
   * Update Photo Handler
   * @param {object} data
   */
  async function updatePhotoHandler(data) {
    console.log('Upload data', data)

    const newPhotoData = {
      id: data.id,
      caption: data.caption,
      description: data.description,
      collection_id: collection._id,
    }

    // build form data
    const frmData = new FormData()
    if (data.photoFiles != null) {
      frmData.append('files.photo', data.photoFiles[0])
    }
    frmData.append('data', JSON.stringify(newPhotoData))

    try {
      const resUpd = await axios.put(
        `${api_url}/photos/${newPhotoData.id}`,
        frmData,
        {
          onUploadProgress: (progress) =>
            setPercent(calcPercent(progress.loaded, progress.total)),
          headers: {
            Authorization: `Bearer ${session.jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('Update Photo Result => ', resUpd)
      if (resUpd.status == 200) {
        console.log('update success')
        setIsUploadSuccess(true)

        setUserPhotos(
          userPhotos.map((uphoto) => {
            if (uphoto.id === newPhotoData.id) {
              return resUpd.data
            } else {
              return uphoto
            }
          })
        )
        // setUserPhotos([...userPhotos, resAdd.data])
        setPhotoModalOpen(false)
        setEditPhoto(null)
      }
    } catch (error) {
      console.log('Exception Error', error)
    }
  }

  // /**
  //  * updatePhotoHandler
  //  * @param {object} photoData
  //  */
  // async function updatePhotoHandler(photoData) {
  //   // /api/user/photo/update, data
  //   console.log('update photo handler')
  //   console.log('photoData', photoData)

  //   // task: delete old photo

  //   // upload photo
  //   if (photoData.photoFiles != null) {
  //     let uploadedFiles = []
  //     let uploadSuccess = false
  //     const data = new FormData()

  //     data.append('files', photoData.photoFiles[0])

  //     try {
  //       const uploadRes = await axios.post(`${api_url}/upload`, data, {
  //         onUploadProgress: (progress) =>
  //           setPercent(calcPercent(progress.loaded, progress.total)),
  //         headers: {
  //           Authorization: `Bearer ${session.jwt}`,
  //         },
  //       })
  //       // buraya kadar completed dememesi gerekiyor
  //       console.log('Upload Result =>', uploadRes)
  //       if (uploadRes.status == 200) {
  //         console.log('upload success')
  //         uploadedFiles = uploadRes.data
  //         setIsUploadSuccess(true)
  //       }
  //     } catch (err) {
  //       console.log('Exception Error', err)
  //     }
  //   }

  //   // update photo db
  //   let editPhoto = {}
  //   if (isUploadSuccess) {
  //     editPhoto = {
  //       id: photoData.id,
  //       caption: photoData.caption,
  //       description: photoData.description,
  //       photo: uploadedFiles[0].id,
  //       collection_id: collection._id,
  //     }
  //   } else {
  //     editPhoto = {
  //       id: photoData.id,
  //       caption: photoData.caption,
  //       description: photoData.description,
  //       collection_id: collection._id,
  //     }
  //   }

  //   // update db
  //   //
  //   // const result = await axios.post('/api/photos/update', editPhoto, {
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // })

  //   const add = await fetch(`${api_url}/photos/${editPhoto.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `Bearer ${session.jwt}`,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(editPhoto),
  //   })
  //   const editResponse = await add.json()
  //   console.log(`editResponse`, editResponse)

  //   // if (uploadSuccess) {
  //   //   // find current  photo remove, add new editphoto
  //   //   // const deletedPhoto = userPhotos.findIndex(
  //   //   //   (photo) => photo.id === photoData.id
  //   //   // )

  //   //   // setUserPhotos(userPhotos.filter((photo) => photo.id !== photoData.id))
  //   //   // console.log(`userPhotos (deleted)`, userPhotos)
  //   //   // setUserPhotos([...userPhotos, editResponse])
  //   //   // console.log(`userPhotos (edited)`, userPhotos)

  //   //   // delete
  //   //   const deletedPhoto = userPhotos.findIndex(
  //   //     (photo) => photo.id === photoData.id
  //   //   )
  //   //   console.log('deletedPhoto', deletedPhoto)
  //   //   setUserPhotos(userPhotos.filter((photo) => photo.id !== photoData.id))
  //   //   console.log(`deleted userPhotos (...)`, userPhotos)
  //   //   setUserPhotos([...userPhotos, editResponse])
  //   //   console.log(`edited userPhotos (...)`, userPhotos)
  //   // }
  // }

  // delete photo
  async function deletePhotoHandler(id) {
    const response = await axios.delete(`/api/user/photo/delete/${id}`, {
      params: {
        id: id,
      },
    })

    if (response.status == 200) {
      console.log('Photo removed')
      const deletedPhoto = userPhotos.findIndex((photo) => photo.id === id)
      //      console.log('deleted photo', deletedPhoto)
      setUserPhotos(userPhotos.filter((photo) => photo.id !== id))
    } else {
      console.log(`response`, response)
    }
  }

  return (
    <Layout>
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <div className='w-full text-center bg-gray-50 my-10 pb-10 rounded border'>
          <div className='w-full py-2 px-2  flex justify-end text-sm'>
            <Link href={`/member/collection/edit/${id}`}>
              <a className='bg-gray-100 border text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-2 py-2 rounded flex items-center'>
                <EditIcon className='h-4 w-4 mr-1' />
                Edit
              </a>
            </Link>

            <button
              className='mx-2 bg-gray-100 border text-gray-600 hover:bg-gray-200 hover:text-gray-800  px-2 py-2 rounded flex items-center'
              onClick={openDeleteCollectionHandler}
            >
              <DeleteIcon className='h-4 w-4 mr-1' />
              Delete
            </button>
            {isConfirmBoxOpen && (
              <Container>
                <ConfirmBox
                  title='Collection will be deleted ?'
                  message={`Please confirm to delete collection ${userCollection.name}`}
                  onConfirm={onDeleteCollection}
                  onCancel={closeCollectionDeleteConfirmHandler}
                />
              </Container>
            )}
            {isConfirmBoxOpen && (
              <Backdrop onCancel={closeCollectionDeleteConfirmHandler} />
            )}
          </div>

          <h2 className='text-2xl text-gray-700 my-3'>{name}</h2>
          <p className='text-gray-500 text-sm'>{description}</p>
        </div>
      </Container>
      <Container className='w-full flex items-center justify-center  '>
        <button
          onClick={photoModalHandler}
          className='bg-gray-700 text-white py-3 px-4 my-5 rounded hover:bg-gray-600  focus:bg-gray-800 focus:outline-none'
        >
          Add Photo
        </button>
      </Container>
      {isPhotoModalOpen && (
        <Container>
          <PhotoForm
            photo={editPhoto}
            onAddPhoto={addPhotoHandler}
            onUpdatePhoto={updatePhotoHandler}
            onCancel={closeModalHandler}
            isUploadSuccess={isUploadSuccess}
            percent={percent}
          />
        </Container>
      )}
      {isPhotoModalOpen && <Backdrop onCancel={closeModalHandler} />}

      <Container>
        <div className='w-full px-5 py-10 '>
          <h2 className='text-2xl text-gray-600 text-center my-5'>Photos</h2>
          <div className='w-full grid grid-cols-3 gap-2'>
            {userPhotos.map((photo) => (
              <UserPhotoCard
                photo={photo}
                onEditPhoto={editPhotoModalHandler}
                onDelete={deletePhotoHandler}
              />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  const { API_URL } = process.env
  const { id } = context.query
  const userId = session.user.id

  const resEditcollection = await axios.get(
    `${API_URL}/collections/${id}?user=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )

  // get collection data
  if (resEditcollection.error) {
    console.log(`Error:`, resEditcollection.error)
  }

  return {
    props: {
      collection: resEditcollection.data,
      api_url: API_URL,
      session,
    },
  }
}

export default CollectionView
