import { Client, Databases } from 'node-appwrite';


const projectID = process.env.PROJECT_ID;
const databaseId = process.env.DATABASE_ID;
const collectionId = process.env.COLLECTION_ID;

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectID)
    
  const db = new Databases(client);
  
  if (req.method == 'GET') {
    const response = await db.listDocuments(databaseId,collectionId)
    return res.json(response.documents);
  }

};
