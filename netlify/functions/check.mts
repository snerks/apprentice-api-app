// Example Netlify Function with CORS support in TypeScript
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const allowedOrigin = "https://your-react-app-domain.com"; // "https://your-react-app-domain.com"; // Replace with your React app's domain

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

  // ...existing code for GET/POST...
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify({ message: "CORS enabled!" }),
  };
};
