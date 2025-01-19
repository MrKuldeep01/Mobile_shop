async function fetchData(url, data = null, method = "POST", headers = {}) {
  try {
    const options = {
      method: method.toUpperCase(),
      credentials: "include",
      headers: {
        ...headers,
        "Content-Type":
          method.toUpperCase() === "GET" ? "application/json" : null,
      },
    };

    if (method.toUpperCase() === "GET" && data) {
      const params = new URLSearchParams(data).toString();
      url += "?" + params;
    } else if (data) {
      if (
        method.toUpperCase() === "POST" ||
        method.toUpperCase() === "PUT" ||
        method.toUpperCase() === "PATCH"
      ) {
        if (Object.values(data).some((value) => value instanceof File)) {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          });
          options.body = formData;
          options.headers["Content-Type"] = null;
        } else {
          options.body = JSON.stringify(data);
          options.headers["Content-Type"] = "application/json";
        }
      } else {
        throw new Error(
          `Unsupported method: ${method}. Only GET, POST, PUT, and PATCH are supported.`
        );
      }
    }

    console.log(
      "Options object for fetch call:",
      options,
      `to hit the URL: ${url}`
    );
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
export default fetchData;
