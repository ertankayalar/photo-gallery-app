import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../components/layout/layout'
import Container from '../../../components/layout/container'
import AddPhoto from '../../../components/user/add-photo'
import PageHeader from '../../../components/layout/page-header'
import PhotosList from '../../../components/user/photos-list'
import axios from 'axios'
import { useSession, getSession } from 'next-auth/client'
import UserPhotoCard from '../../../components/user/user-photo-card'
import Link from 'next/link'
import EditIcon from '../../../components/ui/edit-icon'
import DeleteIcon from '../../../components/ui/delete-icon'
import AddPhotoForm from '../../../components/user/add-photo-form'
import Backdrop from '../../../components/ui/backdrop'
import ConfirmBox from '../../../components/ui/confim'

const calcPercent = (value, total) => Math.round((value / total) * 100)

// show collection and photos
// add new photos
// edit photos
// edit collection

function collection({ collection, api_url, session }) {
  console.log('collection', collection)
  const [userCollection, setUserCollection] = useState(collection)
  const [userPhotos, setUserPhotos] = useState(collection.photos)
  const [percent, setPercent] = useState(0)
  const { id, name, description } = collection
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false)
  const [isConfirmBoxOpen, setConfirmBoxOpen] = useState(false)
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)

  function photoModalHandler() {
    setPhotoModalOpen(true)
  }
  function closeModalHandler() {
    setPhotoModalOpen(false)
  }

  function collectionDeleteConfirmHandler() {
    setConfirmBoxOpen(true)
  }

  function closeCollectionDeleteBoxHandler() {
    setConfirmBoxOpen(false)
  }

  function onDeleteCollection() {
    console.warning(`userCollection.id delete`, userCollection.id)
  }

  const updateUserCollection = async (collectionId) => {
    // get latest collection data
    console.log('new collection update')

    // get collection data

    const res = await fetch(`${api_url}/collections/${collectionId}`)
    const data = await res.json()

    setUserCollection(data)
    console.log(`UserCollection`, userCollection)
  }

  async function addUserPhotoHandler(photoData) {
    console.log(`photoData`, photoData)

    // upload photo (percent)
    let uploadedFiles = []
    let uploadSuccess = false
    const data = new FormData()

    data.append('files', photoData.photoFiles[0])

    try {
      // const uploadRes = await axios({
      //   method: 'POST',
      //   url: `${api_url}/upload`,
      //   data,
      //   onUploadProgress: (progress) =>
      //     setPercent(calcPercent(progress.loaded, progress.total)),
      // })

      const uploadRes = await axios.post(`${api_url}/upload`, data, {
        onUploadProgress: (progress) =>
          setPercent(calcPercent(progress.loaded, progress.total)),
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      })
      // buraya kadar completed dememesi gerekiyor
      console.log('Upload Result =>', uploadRes)
      if (uploadRes.status == 200) {
        console.log('upload success')
        uploadedFiles = uploadRes.data
        uploadSuccess = true
        setIsUploadSuccess(true)
      }
    } catch (err) {
      console.log('Exception Error', err)
    }

    // add photo db
    if (uploadSuccess) {
      const newPhoto = {
        caption: photoData.caption,
        description: photoData.description,
        photo: uploadedFiles[0].id, // id
        collection_id: collection._id,
      }

      const add = await fetch(`${api_url}/photos`, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPhoto),
      })
      const addResponse = await add.json()
      console.log(`addResponse`, addResponse)
      setUserPhotos([...userPhotos, addResponse])
    }

    return {
      uploadSuccess,
    }
    // bundan sonra state management

    // add

    // caption
    // description
    // collection_id
    // form data yı oluştur

    // const response = await fetch('/api/user/add-photo', {
    //   method: 'POST',
    //   body: JSON.stringify(photoData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    // const data = await response.json()
    // console.log('data', data)
  }

  async function deletePhotoHandler(id) {
    console.log(`id`, id)
    // delete photo
    const response = await axios.delete(`${api_url}/photos/${id}`)

    console.log(response)
    console.log(`response`, response)
    console.log(`${id} deleted`)
    // update Photos if success

    // find array id
    const deletedPhoto = userPhotos.findIndex((photo) => photo.id === id)

    console.log('deleted photo', deletedPhoto)

    setUserPhotos(userPhotos.filter((photo) => photo.id !== id))
  }

  return (
    <Layout>
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
              onClick={collectionDeleteConfirmHandler}
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
                  onCancel={closeCollectionDeleteBoxHandler}
                />
              </Container>
            )}
            {isConfirmBoxOpen && (
              <Backdrop onCancel={closeCollectionDeleteBoxHandler} />
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
          <AddPhotoForm
            onAddPhoto={addUserPhotoHandler}
            percent={percent}
            onCancel={closeModalHandler}
            isUploadSuccess={isUploadSuccess}
          />
        </Container>
      )}
      {isPhotoModalOpen && <Backdrop onCancel={closeModalHandler} />}

      <Container>
        <div className='w-full px-5 py-10 '>
          <h2 className='text-2xl text-gray-600 text-center my-5'>Photos</h2>
          <div className='w-full grid grid-cols-3 gap-2'>
            {userPhotos.map((photo) => (
              <UserPhotoCard photo={photo} onDelete={deletePhotoHandler} />
            ))}
          </div>
        </div>
      </Container>
      {/* <Container>
        <AddPhoto
          api_url={api_url}
          collection={collection}
          upCollection={updateUserCollection}
        />
      </Container> */}
    </Layout>
  )
}

export default collection

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
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
