import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  const callApi = async () => {
    axios.get("/api")
      .then((res) => {
        console.log(res.data);
        setData(res.data.test);
      })
  };

  useEffect(() =>{
    callApi();
  }, []);

  return (
    <div>
      {data}
    </div>
  );
}

export default App;
