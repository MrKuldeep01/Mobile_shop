import { useEffect, useState } from "react";

const Test = () => {
  const [res, setRes] = useState({});
  const [error, setErr] = useState("");
  const [loading, setLoad] = useState(false);
  let formData = new FormData();

  const url = "http://localhost:3000/api/v1/";

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    formData.set(key, value);
    console.log("Updated FormData:", Array.from(formData.entries()));
  };

  const getdata = (e) => {
    e.preventDefault();
    console.log("getting...");

    setLoad(true); // Set loading to true on submission

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          setErr("Network response was not ok");
          throw new Error("Error occurred");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRes(data);
      })
      .catch((error) => {
        console.log(error);
        setErr("An error occurred: " + error);
      })
      .finally(() => {
        setLoad(false); // Set loading to false in the finally block
        console.log("Loading is set to: ", loading);
        
      });
  };

  return (
    <div className="h-[100vh] w-full">
      <h1 className="block text-center text-4xl font-semibold">
        Jai shree ram
      </h1>
      {error && (
        <h2 className="bg-rose-200 text-red-700 px-4 py-2 rounded-md">
          {error}
        </h2>
      )}
      <form onSubmit={getdata} encType="multipart/form-data">
        <input
          type="file"
          onChange={changeHandler}
          name="image"
          className="m-2"
        />
        <select name="check" onChange={changeHandler} className="m-2">
          <option value="no">no</option>
          <option value="yes">yes</option>
        </select>
        <input 
          type="text"
          onChange={changeHandler}
          name="desc"
          className="m-2"
        />
        <input type="submit" value="Get Data" className="border mx-2" />
      </form>
      {loading && <p>Loading...</p>} 
    </div>
  );
};

export default Test;
