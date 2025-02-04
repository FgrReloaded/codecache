import { MongoClient, Db, ObjectId } from "mongodb";
import { getTitleDescription } from "../utils/ai-client";


const mongoURL = "mongodb://localhost:27017";

const dbName = 'codecache';

const client = new MongoClient(mongoURL);

let dbConnection: Db | null = null;

export async function connect(): Promise<Db> {
    if (!dbConnection) {
        await client.connect();
        dbConnection = client.db(dbName);
        console.log('Connected to server');
    }
    return dbConnection;
}
export async function insertSnippets(collectionName: string, codeSnippet: string) {
    const db = await connect();
    const collection = db.collection(collectionName);

    const { title, explanation } = await getTitleDescription(codeSnippet) || {};

    const document = {
        codeSnippet,
        title,
        explanation
    };

    const result = await collection.insertOne(document);

    return result.insertedId;
}

export async function findSnippet(collectionName: string, query: ObjectId) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const document = await collection.findOne({ _id: query });
    return document as Object;
}
