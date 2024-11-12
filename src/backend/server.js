import path from 'path';
import express from 'express';
import cors from 'cors';
import {client, connectDb} from './database/db.js';
import bodyParser from "body-parser";


const app = express();
const port = 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

app.use(cors({ origin: '*' }));  // Allow requests from the frontend
app.use(bodyParser.json())
connectDb();

app.get('/fetchData', async (req, res) => {
  try {
    const data = await client.query('Select * from coffee_machines');
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.get('/:id',async (req,res)=>{
    const param=req.params.id
    try {
        const data = await client.query(`Select * from coffee_machines WHERE id=${param}`);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Error retrieving data' });
    }
})

app.post('/sendOrder', async (req, res) => {
    const { cartItems, data, totalPrice } = req.body;
    const shipping_address=`${req.body.ZipCode},${req.body.City},${req.body.Address}`

    try {
        const orderResult = await client.query(
            `INSERT INTO orders (shipping_address, total_price)
             VALUES ($1, $2) RETURNING id`,
            [shipping_address, totalPrice]
        );
        const orderId = orderResult.rows[0].id;


        for (let item of cartItems) {
            const { id,quantity,name } = item;
            await client.query(
                `INSERT INTO order_items (order_id, product_id, product_name, quantity, total_price)
                 VALUES ($1, $2, $3, $4, $5)`,
                [orderId,id, name, quantity, totalPrice]
            );
          await  client.query(`update coffee_machines SET stock = stock - $1 WHERE id = $2`,[quantity, id])
        }

        res.json('Sent order');
    } catch (e) {
        res.status(500).json({ message: 'Error retrieving data' });
    }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
