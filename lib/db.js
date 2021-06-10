import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
  const client = MongoClient.connect(
    'mongodb+srv://nxtdeveloper:tzazblU2sHjgUMNN@nextcluster.2tfj0.mongodb.net/next-project?retryWrites=true&w=majority'
  )

  return client
}
