export const handler = async (req) => {
  const user = JSON.parse(req.body);

  // const user = {
  //   name: "John Doe",
  //   status: "awesome",
  //   time: new Date().toISOString(),
  // };

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};
