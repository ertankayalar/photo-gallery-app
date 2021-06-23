import React from 'react'
import { getCategories } from '../lib/mongodb/category'
import { getCollection } from '../lib/mongodb/photo'
import Layout from '../components/layout/layout'
import Container from '../components/layout/container'

const Test = ({ categoryList, collection }) => {
  console.log(`categoryList`, categoryList)
  console.log(`collection`, collection)
  return (
    <Layout>
      <Container>
        {categoryList.map((cat) => (
          <p>{cat.name}</p>
        ))}
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  //   const client = await connectToDatabase()

  //   //   const userCollection = client.db().collection('users')
  //   //   const user = await userCollection.findOne({ email: userEmail })

  //   //const isConnected = await client.isConnected()

  //   const categoryCollections = client.db().collection('categories')

  //   const query = {
  //     published_at: { $ne: null },
  //   }
  //   const options = {
  //     projection: {
  //       _id: 0,
  //       name: 1,
  //       description: 2,
  //       slug: 3,
  //     },
  //   }
  //   const category = await categoryCollections.find(query, options)
  //   const cats = await category.toArray()

  const cats = await getCategories()
  console.log(`category`, cats)

  const collection = await getCollection('koleksiyon-adi')
  console.log(`collection`, collection)
  
  return {
    props: {
      categoryList: cats,
      collection,
    },
  }
}

export default Test
