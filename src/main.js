import { Client, Databases } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT_ID)
    // .setKey(req.headers['x-appwrite-key'] ?? '');

  
  const db = new Databases(client);
  const databaseId = process.env.DATABASE_ID;
  const collectionId = process.env.COLLECTION_ID;
  if (request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (req.method =='GET') {
    const response = await db.listDocuments(databaseId,collectionId)
    return res.json(response.documents);
  }

};
