interface GitHubResponse {
  avatar_url: string;
  location: string;
}

export const handler = async (req) => {
  const user = JSON.parse(req.body);

  const githubRes = await fetch(`https://api.github.com/users/${user.github}`);

  if (!githubRes.ok) {
    console.error(githubRes);
  }

  const profile = (await githubRes.json()) as GitHubResponse;

  const avatar = profile.avatar_url;
  const location = profile.location;

  // const user = {
  //   name: "John Doe",
  //   status: "awesome",
  //   time: new Date().toISOString(),
  // };

  return {
    statusCode: 200,
    body: JSON.stringify({ ...user, avatar, location }),
  };
};
