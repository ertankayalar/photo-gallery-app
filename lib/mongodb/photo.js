import CollectionPage from '../../pages/collections/[slug]'
import { connectToDatabase } from './db'

export async function getCollection(slug) {
  const client = await connectToDatabase()

  const pipeline = [
    { $match: { slug: slug } },
    {
      $lookup: {
        from: 'photos',
        localField: '_id',
        foreignField: 'collection_id',
        as: 'photos',
      },
    },
  ]

  let collection = {}
  collection.photos = []
  const collectionsRes = await client
    .db()
    .collection('photo_collections')
    .aggregate(pipeline)

  await collectionsRes.forEach((doc) => {
    console.log(`doc`, doc)
    collection.id = doc._id.toString()
    collection.name = doc.name
    collection.description = doc.description
    collection.published_at = doc.published_at.toString()
    doc.photos.forEach((photo) => {
      collection.photos.push({
        caption: photo.caption,
        description: photo.description,
      })
    })
  })
  console.log(`collection1`, collection)
  //console.log(`collectionsRes`, collectionsRes)

  //   // console.log(`result`, result)
  //   // console.log(`result.photos`, result[0].photos)
  //   collection = collectionsRes[0]
  //   collection.photos = collectionsRes[0].photos
  //   //      result[0].photos = result[0].photos.toArray()

  //   collection._id = JSON.stringify(collection._id)
  //   collection.published_at = JSON.stringify(collection.published_at)
  //   collection.createdAt = JSON.stringify(collection.createdAt)
  //   collection.updatedAt = JSON.stringify(collection.updatedAt)
  //   console.log(`collection1`, collection)

  client.close()
  return collection
}
