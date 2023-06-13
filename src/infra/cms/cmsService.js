const TOKEN = process.env.DATO_TOKEN;

const globalQuery = `
  query {
    globalFooter {
      description
    }
  }
`

const BASE_ENDPOINT = 'https://graphql.datocms.com/';
const PREVIEW_ENDPOINT = `${BASE_ENDPOINT}preview`;

export async function cmsService({ query, preview }) {
  const ENDPOINT = preview ? PREVIEW_ENDPOINT : BASE_ENDPOINT;
  try {
    const pageContentResponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query,
      }),
    }).then(async (res) => {
      const body = await res.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    const globalContentResponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query: globalQuery,
      }),
    }).then(async (res) => {
      const body = await res.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    return {
      data: {
        ...pageContentResponse.data,
        globalContent: {
          ...globalContentResponse.data,
        }
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
