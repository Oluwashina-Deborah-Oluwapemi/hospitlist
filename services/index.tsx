import { request, gql } from "graphql-request";

const graphqlAPI =
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ||
  "https://api-us-west-2.hygraph.com/v2/clj6f3x7j0w4j01ugd1q4byfg/master";

interface Hospital {
  node: {
    id: string;
    name: string;
    phone: string;
    email: string;
    description: string;
    address: string;
  };
}

export const getListings = async () => {
  const query = gql`
    query MyQuery {
      hospitalsConnection {
        edges {
          node {
            name
            phone
            id
            description
            address
            email
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    const data = result as { hospitalsConnection: { edges: Hospital[] } };

    const edges: Hospital[] = data.hospitalsConnection.edges;

    return edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};
