async function fetchData(url, data = null, method = "POST") {
  try {
    let options = {
      method: method.toUpperCase(),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data && method.toUpperCase() !== "GET") {
      options.body = JSON.stringify(data);
    }
    let res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw new Error("Error in fetch call: " + error.message);
  }
}
export default fetchData;
