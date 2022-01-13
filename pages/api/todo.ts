import { getDb } from '../../mongodb';
import { baseHandler, appendFallbackHandler } from '../../utils/base';

const handler = baseHandler();

handler.get(async (req, res) => {
  const db = await getDb();
  const todos = await db.collection('todo').find({}).toArray();
  return res.status(200).json(todos);
});

handler.post(async (req, res) => {
  const todo = req.body;
  const db = await getDb();
  await db.collection('todo').insertOne(todo);

  return res.status(200).json({});
});

appendFallbackHandler(handler);

export default handler;
