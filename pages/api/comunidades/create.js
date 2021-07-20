import { SiteClient } from "datocms-client";

export default async function request(request, response) {
  if (request.method === "POST") {
    const token = process.env.DATO_TOKEN;
    const client = new SiteClient(token);

    const comunidade = await client.items.create({
      itemType: "970710",
      ...request.body,
    });

    response.json({
      comunidade: comunidade,
    });

    return;
  }

  response.status(405).json({
    message: "Method not allowed",
  });
}
