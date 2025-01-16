import { Client, Databases, ID } from 'node-appwrite';


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
    const response = await db.listDocuments(databaseId, collectionId)
    return res.json(response.documents);
  } else if (req.method == 'POST') {
    try {
      const payload = JSON.parse(req.body);
      // Extract user details from the payload
      const userId = payload['$id'];
      const userName = payload['name'];
      const userEmail = payload['email'];

      const documentData = {
        FirstName: userName.split(" ")[0],
        LastName: userName.split(" ")[1] || "",
        User_Email: userEmail,
        Subscription_Status: "Free",
        User_Created: new Date().toISOString(),
        Sub: userId,
      };

      const response = await db.createDocument(databaseId, collectionId, ID.unique(), documentData)
      // Send a response
      return res.json({ message: 'Document created successfully!', response });
    }
    catch (err) {
      log(err.message);
      return res.status(500).json({ error: 'Failed to create document' });
    }
  }

};
