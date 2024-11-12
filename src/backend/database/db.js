import pg from 'pg'
const { Client } = pg
import 'dotenv/config';
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
export async function connectDb(){
        try {
            await client.connect()
            console.log('Successfully connected to database');
        }
        catch (error) {
            console.log(error)
        }
}
const drop=`DROP TABLE orders `
const dropTable=async()=> {
    try {
        await client.query(drop)
        console.log('dropped')
    } catch (e) {
        console.log(e)
    }
}

const coffeeMachines = `CREATE TABLE IF NOT EXISTS coffee_machines(
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL, 
    stock INTEGER  NOT NULL,
    description TEXT  NOT NULL,
    type varchar(15) NOT NULL,
    img varchar(100) NOT NULL,
    price INTEGER  NOT NULL
)`;

const orders=`CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    shipping_address VARCHAR(255),
    total_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const order_items=`CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255),
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES coffee_machines(id) ON DELETE CASCADE
)`



const createTable = async () => {
        try {

            await client.query(orders);
            await client.query(order_items);
            console.log('Table created successfully');

        } catch (error) {
            console.error('Error creating table:', error);
        }
}
createTable()






