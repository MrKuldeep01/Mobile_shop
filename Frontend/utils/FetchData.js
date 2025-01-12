async function fetchData(url, data = null, method = "POST") {
  try {
    console.log("fetching request for: ", url);
    let options = {
      method: method.toUpperCase(),
      credentials: "include",
      // Remove the header since fetch will set the correct boundary automatically
      headers: {}, 
    };

    // Create a FormData instance
    const formData = new FormData();

    // Append data to FormData
    if (data) {
      for (let key in data) {
        formData.append(key, data[key]);
      }
    }

    // If the method is not GET, we set the body to our FormData
    if (method.toUpperCase() !== "GET") {
      options.body = formData;
    }

    if (data) {
      if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
        if (data instanceof FormData) {
          options.body = data;
        } else {
          options.body = JSON.stringify(data);
          options.headers["Content-Type"] = "application/json";
        }
      }
    }
    
    let res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error :( ${(res.message) ? (" :-" + res.message) : ""} with status code: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw new Error("Failed to get data because of " + error.message);
  }
}

export default fetchData;