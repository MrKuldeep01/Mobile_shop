async function fetchData(url, data, method = "POST") {
  try {
    let options = {
      method,
    };
    if (data) {
      options.body = data;
    }
    if(method === "get"){
      options={};
    }
    // console.log(options);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    // console.log(error);
    throw new Error("Error occurred in fetch call!" + error);
  }
}
export default fetchData;
