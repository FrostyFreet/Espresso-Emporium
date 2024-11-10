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
      description: 'an all-manual espresso maker that produces cafe-quality espresso from your home or wherever you are',
      type: 'manual',
      img: '/images/flair_pro2.jpg',  // Path is relative to 'public'
      price: 150,
    },
    {
      name: 'Essenza Mini',
      stock: 5,
      description: 'Ultra-light and ultra-compact Essenza Mini machine combines a pure sleek compact design with the simplicity of use to make perfect Espresso',
      type: 'nespresso',
      img: '/images/essenza_mini.jpg',  // Path is relative to 'public'
      price: 115,
    },
    {
      name: 'PHILIPS 3200',
      stock: 50,
      description: 'The Philips 3200 LatteGo succeeds in being great value and extremely easy to use. Programming your drinks is foolproof and the resulting coffee is pretty good.',
      type: 'fully automatic',
      img: '/images/philips_3200.jpg',  // Path is relative to 'public'
      price: 631,
    },


    {
        name: 'La Pavoni Esperto Competente',
        stock: 5,
        description: 'Competition machine for Espresso specialists. The temperature indicator and the pressure gauge on the group offer constant control of the pressure exerted during brewing',
        type: 'manual',
        img: '/images/LaPavoni_Esperto.jpg',  // Path is relative to 'public'
        price: 1852,
    },
    {
        name: 'Flair 58 Plus 2',
        stock: 6,
        description: 'The Flair 58 Plus 2 is the flagship manual espresso maker from Flair Espresso. Experience a true barista workflow, full control over all brew variables, and an integrated preheat controller',
        type: 'manual',
        img: '/images/flair58_plus.jpg',  // Path is relative to 'public'
        price: 743,
    },
    {
        name: 'Delonghi Eletta Explore',
        stock: 15,
        description: 'With the Eletta Explore, the only fully automatic espresso machine with both hot and cold foam technology, you can craft your favorite espresso beverages (cappuccino, latte, iced latte, cold foam) and cold brew, all in one compact machine at home',
        type: 'fully automatic',
        img: '/images/Eletta_Explore.jpg',  // Path is relative to 'public'
        price: 1242,
    },
    {
        name: 'Nespresso Pixie',
        stock: 74,
        description: ' Straight from the design studio, the Nespresso Pixie coffee machine is an ode to the modern industrial style. Crafted for those with high standards in coffee and in looks, its essential lines and compact shape make it an icon in any kitchen. Simply press the button to have your Espresso or Lungo in one swift move.',
        type: 'Nespresso',
        img: '/images/Nespresso_Pixie.jpg',  // Path is relative to 'public'
        price: 631,
    },
    {
        name: 'Nespresso Vertuo POP',
        stock: 35,
        description: 'Bursting in a range of six vibrant colours, from Spicy Red to Pacific Blue, Vertuo Pop makes a bold statement to match your every style. Its sleek and compact design ensures it fits in any environment, whether kitchen or living room. With four cup sizes, from Espressos to Mugs, simply choose your Nespresso capsule, pop it in, and you’re away at the touch of a button',
        type: 'Nespresso',
        img: '/images/Vertuo_Pop.jpg',  // Path is relative to 'public'
        price: 176,
    },
  ];

newCoffeeMachines.forEach(async (machine) => {
    await coffeeMachines.updateOne(
        { name: machine.name },     // Query condition (based on unique name)
        { $setOnInsert: machine },   // Insert only if not found
        { upsert: true }             // Perform an upsert
    );
});


