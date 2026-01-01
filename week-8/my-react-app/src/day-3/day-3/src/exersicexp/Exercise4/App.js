const postData = async () => {
  try {
    const response = await fetch("https://webhook.site/your-unique-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key1: "myusername",
        email: "mymail@gmail.com",
        name: "Isaac",
        lastname: "Doe",
        age: 27
      })
    });
    const result = await response.text();
    console.log("Response:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
