import axios from 'axios';
import { useEffect, useState } from 'react';

interface dataType {
  _id: string;
  name: string;
  stock: number;
  description?: string;
  img: string;
  type: string;
  price: number;
}

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
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name} - {item.stock} - {item.price} - {item.type}
            <img src={item.img} alt={item.name} style={{width:"400px",height:"400px"}}/>
            </li>
        ))}
      </ul>
    </>
  );
}

export default App;
