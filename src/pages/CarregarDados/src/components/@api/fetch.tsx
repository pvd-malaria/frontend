//export fuction to make fetch whatever route using http://72.44.53.85:9000

export const requestApi = async (
  route: string,
  method: string,
  body?: any,
  multipart?: boolean
) => {
  const token = await localStorage.getItem("token");
  const response = await fetch(route, {
    method: method,
    headers: multipart
      ? { Authorization: token ? `Bearer ${token}` : "" }
      : {
          mode: "cors", // no-cors, cors, *same-origin
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
    body: multipart ? body : body ? JSON.stringify(body) : null,
  });
  const jsonParse = await response.body
    ?.getReader()
    .read()
    .then(({ value }) => new TextDecoder("utf-8").decode(value));
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();

    const error = {
      data: null,
      statusCode: response.status,
      message: response.statusText,
    };
    return error;
  } else if (response.status !== 200) {
    const error = {
      data: null,
      statusCode: response.status,
      message: jsonParse, 
    };
    return error;
  }

  const data = { data: jsonParse, statusCode: response.status,
  message: response.statusText,
  };
  return data;
};
