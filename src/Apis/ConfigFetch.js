const headers = {
  "Content-Type": "application/json",
  // "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Otras cabeceras personalizadas
  // "credentials": "include" //"same-origin"
};

async function FetchApi(url) {
  let data = null;
  try {
    await fetch(url, {
      method: "GET",
      headers: headers
    })
      .then((response) => {
        if (response.status !== 200) return [];
        else return response.json();
      })
      .then((rsp) => {
        data = rsp;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.log("Catching error executing GET method..");
    return error;
  }
  return { data };
}

export async function FetchApiWithParams(url, params) {
  let data = null;
  try {
    await fetch(url, {
      method: "GET",
      headers: headers,
      body: params // <-- Post parameters
    })
      .then((response) => response.json())
      .then((rsp) => {
        data = rsp;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.log("Catching error executing GET method..");
    return error;
  }
  return { data };
}

export async function FetchApiPost(url, data) {
  let resp = null;
  try {
    const options = {
      method: "POST",
      headers: headers,
      body: data //JSON.stringify({ name: "Irakli Tchigladze" })
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then((rsp) => {
        resp = rsp;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.log("Catching error executing POST method..");
    return error;
  }

  return { resp };
}

export async function FetchApiDelete(url) {
  let resp = null;
  try {
    const options = {
      method: "DELETE",
      headers: headers
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then((rsp) => {
        resp = rsp;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.log("Catching error executing DELETE method..");
    return error;
  }

  return { resp };
}

export async function FetchApiPut(url, data) {
  let resp = null;
  try {
    const options = {
      method: "PUT",
      headers: headers,
      body: data //JSON.stringify({ name: "Irakli Tchigladze" })
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then((rsp) => {
        resp = rsp;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.log("Catching error executing PUT method..");
    return error;
  }

  return { resp };
}

export async function FetchApiPatch(url, data) {
  let resp = null;
  try {
    const options = {
      method: "PATCH",
      headers: headers,
      body: data //JSON.stringify({ name: "Irakli Tchigladze" })
    };
    await fetch(url, options)
      .then((response) => response.json())
      .then((rsp) => {
        resp = rsp;
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.log("Catching error executing PATCH method..");
    return error;
  }
  return { resp };
}

export default FetchApi;
