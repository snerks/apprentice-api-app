export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, API world!",
      time: new Date().toISOString(),
    }),
  };
};
