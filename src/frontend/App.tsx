import axios from 'axios';
import { useEffect, useState } from 'react';
import CardComponent from "./components/CardComponent.tsx";
import {dataType} from "./types.tsx";
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ItemDetailComponent from "./components/ItemDetailComponent.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Checkout from "./components/Checkout.tsx";


function App() {

  const [data, setData] = useState<dataType[]>([]);
  const [searchTerm,setSearchTerm]=useState('')
  const [cartItems,setCartItems]=useState<dataType[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/fetchData')
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);


  const router = createBrowserRouter([
        {
          path:'/',
          element:(
                <>
                    <Navbar data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartItems={cartItems}/>
                    <CardComponent data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Footer/>
                </>
            )
        },
        {
          path:'/:id',
          element:
              (
                  <>
                    <Navbar data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartItems={cartItems}/>
                    <ItemDetailComponent setCartItems={setCartItems} data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Footer/>
                  </>
              )
        },
        {
            path:'/checkout',
            element:
                (
                    <>
                        <Navbar data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartItems={cartItems}/>
                        <Checkout cartItems={cartItems} setCartItems={setCartItems} data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <Footer/>
                    </>
                )
        }

  ])

  return (
    <>
      <RouterProvider router={router} />


    </>
  );
}

export default App;
