import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.query.url as string;

  if (!imageUrl) {
    res.status(400).json({ error: "No image URL provided" });
    return;
  }

  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("image")) {
      res.status(400).json({ error: "Not an image" });
      return;
    }

    const imageBuffer = await response.arrayBuffer();

    // Set headers for the image and return it
    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).json({ error: "Error fetching the image" });
  }
}
