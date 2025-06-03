import {
  Handler,
  HandlerEvent,
  HandlerContext,
  HandlerResponse,
} from "@netlify/functions";

const allowedOrigin = "*"; // "https://your-react-app-domain.com"; // Replace with your React app's domain

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: "",
    };
  }

  let jsonObject = null;

  const apiKey = process.env.APPRENTICE_API_KEY || "NOT_SET_IN_ENVIRONMENT";

  console.log(`apiKey=[${apiKey}]`);

  const searchParams = new URL(event.rawUrl).searchParams;
  console.log("searchParams", searchParams);

  const searchParamsString = searchParams.toString();
  console.log("searchParamsString", searchParamsString);
  if (searchParamsString) {
    console.log("searchParamsString", searchParamsString);
  } else {
    console.log("No search parameters provided.");
  }

  // vacancyReference=1000068586
  const vacancyReference = searchParams.get("vacancyReference");

  const res = await fetch(
    `https://api.apprenticeships.education.gov.uk/vacancies/vacancy/${vacancyReference}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch data:", res.statusText);
    return {
      statusCode: res.status,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Failed to fetch data" }),
    } as HandlerResponse;
  } else {
    jsonObject = await res.json();
    console.log("jsonObject", jsonObject);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify(jsonObject),
  } as HandlerResponse;
};
