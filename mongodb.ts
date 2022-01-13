import { MongoClient, Db } from 'mongodb';

let db: Db;

const connectToDb = (): Promise<Db> => {
  return new Promise((resolve, reject) => {
    const client: MongoClient = new MongoClient(
      'mongodb+srv://admin:admin@cluster0.hkvla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );

    client.connect((err) => {
      if (err) {
        reject('error connecting to db');
      }
      db = client.db('todo');
      resolve(db);
      console.log('successfully connected to db');
    });
  });
};

export const getDb = async () => {
  if (!db) {
    db = await connectToDb();
  }
  return db;
};
