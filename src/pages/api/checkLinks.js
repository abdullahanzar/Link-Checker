// src/pages/api/checkLinks.js

import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await axios.get(url);
    const html = response.data;

    const regex = /<a href=["'](https?:\/\/[^"']+)["']/g;
      const links = [];
      let match;

      while ((match = regex.exec(html)) !== null) {
        links.push(match[1]);
      }
      console.log(links);
      const linkCheckPromises = links.map(async (link) => {
        try {
          await axios.head(link);
          return { link, status: "ok" };
        } catch (e) {
          return { link, status: "404" };
        }
      });
      const linkCheck = await Promise.all(linkCheckPromises);
    res.status(200).json(linkCheck);
  } catch (error) {
    console.log("THERE WAS AN ERROR");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}