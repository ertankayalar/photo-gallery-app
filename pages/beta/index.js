import { useEffect, useState } from 'react'
import fetch from 'isomorphic-unfetch'
function CollectionHome(props) {
  console.log(props.collections)
  return <div>{props.username}</div>
}

export default CollectionHome

export async function getServerSideProps() {
  const { API_URL } = process.env
  const collectionPath = `${API_URL}/collections`
  console.log(collectionPath)
  const res = await fetch(collectionPath)

  const data = await res.json()

  return {
    props: {
      username: 'Ertan',
      collections: data,
    },
  }
}
