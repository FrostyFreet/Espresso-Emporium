import axios from 'axios';
import { useEffect, useState } from 'react';
import MainPage from "./pages/MainPage.tsx";
import {dataType} from "./types.tsx";
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ItemDetailPage from "./pages/ItemDetailPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ProtectedRoute from './components/ProtectedRouteComponent.tsx';

function App() {
    const [data, setData] = useState<dataType[]>([]);
    const [searchTerm,setSearchTerm]=useState('')
    const [cartItems,setCartItems]=useState<dataType[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/fetchData')
      .then((response) => {
          setData(response.data.rows)
      })
      .catch((error) => console.log(error));
  }, []);


  const router = createBrowserRouter([
        {
          path:'/',
          element:(
                <>
                    <Navbar data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartItems={cartItems}/>
                    <MainPage data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                    <ItemDetailPage setCartItems={setCartItems} data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                        <CheckoutPage cartItems={cartItems} setCartItems={setCartItems} data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <Footer/>
                    </>
                )
        },
        {
          path:'/ProfilePage',
          element:
              (
                  <ProtectedRoute>

                      <>
                          <Navbar data={data} setData={setData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartItems={cartItems}/>
                          <ProfilePage/>
                          <Footer/>
                      </>
                  </ProtectedRoute>
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
