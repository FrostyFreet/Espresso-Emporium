import path from 'path';
import express from 'express';
import cors from 'cors';
import { connectDb, coffeeMachines } from './database/db.js';

const app = express();
const port = 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

app.use(cors({ origin: '*' }));  // Allow requests from the frontend
app.use(express.json());

connectDb();

app.get('/fetchData', async (req, res) => {
  try {
    const data = await coffeeMachines.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.get('/:id',async (req,res)=>{
    const param=req.params.id
    try {
        const data = await coffeeMachines.findById(param);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Error retrieving data' });
    }
})



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
