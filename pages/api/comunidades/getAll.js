export default async function request(request, response) {
  const token = process.env.DATO_TOKEN;
  const resposta = await fetch("https://graphql.datocms.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: "{ allCommunities { id, title, imageUrl, creatorSlug } }",
    }),
  });

  const comunidadesJson = await resposta.json();

  response.json({
    data: comunidadesJson.data.allCommunities,
  });
}
