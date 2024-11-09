import mongoose from "mongoose";

export async function connectDb(){

        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/EspressoEmporium') 
            console.log('Successfully connected to database');
        } 
        catch (error) {
            console.log(error)
        }   
}

const coffeeMachinesSchema = new mongoose.Schema({
    name: {type: String,required: true},
    stock:{type: Number, default:0},
    description:String,
    type:{type: String,required: true},
    img:{type: String,required: true},
    price:{type: Number,required:true}
},
{
    timestamps:true
})

export const coffeeMachines=mongoose.model('coffeeMachines',coffeeMachinesSchema)

const newCoffeeMachines = [
    {
      name: 'Flair Pro 2',
      stock: 10,
      description: 'Features the PRO 2 Brew Head...',
      type: 'manual',
      img: '/images/flair_pro2.jpg',  // Path is relative to 'public'
      price: 150,
    },
    {
      name: 'Essenza Mini',
      stock: 5,
      description: 'With Essenza Mini...',
      type: 'nespresso',
      img: '/images/essenza_mini.jpg',  // Path is relative to 'public'
      price: 115,
    },
    {
      name: 'PHILIPS 3200',
      stock: 50,
      description: '5 AROMATIC COFFEES...',
      type: 'fully automatic',
      img: '/images/philips_3200.jpg',  // Path is relative to 'public'
      price: 631,
    },
  ];

newCoffeeMachines.forEach(async (machine) => {
    await coffeeMachines.updateOne(
        { name: machine.name },     // Query condition (based on unique name)
        { $setOnInsert: machine },   // Insert only if not found
        { upsert: true }             // Perform an upsert
    );
});
