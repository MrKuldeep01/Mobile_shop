async function fetchData(url, data = null, method = "POST", headers = {}) {
  try {
    const options = {
      method: method.toUpperCase(),
      credentials: "include",
      headers: {
        ...headers,
        // Do not set Content-Type here
      },
    }; 

    // Handle GET requests by appending query parameters to the URL
    if (method.toUpperCase() === "GET" && data) {
      const params = new URLSearchParams(data).toString();
      url += "?" + params;
    } else if (data) {
      if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        // Check for file data and use FormData if needed
        const formData = new FormData();
        // if (Object.values(data).some((item) => item instanceof File)) {
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
          });
        // }
        options.body = formData; // Automatically sets content-type for FormData
      } else {
        throw new Error(`Unsupported method: ${method}.`);
      }
    }

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    // Return response based on content type
    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
export default fetchData;
