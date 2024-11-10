import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar.tsx";
import CardComponent from "./components/CardComponent.tsx";
import {dataType} from "./types.tsx";



function App() {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/') 
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>

      <Navbar/>
      <CardComponent data={data}/>

    </>
  );
}

export default App;
