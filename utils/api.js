export const handleAuth = async (user, route, setBackendError) => {
  try {
    const response = await fetch(`/api/${route}`, {
      method: "POST",
      body: JSON.stringify(user),

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);

      return data;
    } else {
      const errorData = await response.json();
      setBackendError(errorData.error);
      console.log(errorData);
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

export const handleShortenLink = async (url) => {
  try {
    const response = await fetch(`/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`/api/user`, {
      headers: {
        Authorization: `${token}`, // Include JWT token in the request header
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserLinks = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`/api/user/urls`, {
      headers: {
        Authorization: `${token}`, // Include JWT token in the request header
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    console.log(error);
  }
};
