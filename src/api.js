// src/api.js
import { gql, GraphQLClient } from "graphql-request";

// Hardcoded Endpoints
const ENDPOINTS = {
  railsMockApi: "http://localhost:3042/api/v1/graph",
  baseSepolia: "https://api.i7n.dev/v1/graphql",
  base: "https://i7n.app/gql",
};

// Select which endpoint to use
// Change this to switch endpoints:
//'railsMockApi' | 'baseSepolia' | 'base'
const data_endpoint = "railsMockApi";

// Create GraphQL client with selected endpoint
const client = new GraphQLClient(ENDPOINTS[data_endpoint]);

export const fetchTriples = async () => {
  let query, data;
  switch (data_endpoint) {
    case "base":
      query = gql`
        query {
          triples(limit: 1000) {
            items {
              id
              subject {
                label
                id
              }
              predicate {
                label
                id
              }
              object {
                label
                id
              }
            }
          }
        }
      `;
      data = await client.request(query);
      return data.triples.items;
    default:
      query = gql`
        query {
          triples(limit: 1000) {
            id
            subject {
              label
              id
            }
            predicate {
              label
              id
            }
            object {
              label
              id
            }
          }
        }
      `;
      data = await client.request(query);
      return data.triples;
  }
};

// Export current endpoint for potential use in other components
export const getCurrentEndpoint = () => ENDPOINTS[data_endpoint];

export const fetchTriplesForNode = async (nodeId) => {
  const query = gql`
    query {
      triples(filter: { subject: "${nodeId}" }) {
        id
        subject {
          label
          id
        }
        predicate {
          label
          id
        }
        object {
          label
          id
        }
      }
      triples(filter: { object: "${nodeId}" }) {
        id
        subject {
          label
          id
        }
        predicate {
          label
          id
        }
        object {
          label
          id
        }
      }
    }
  `;

  const data = await client.request(query);
  console.log("Données récupérées :", data); // Vérifiez la structure ici

  // Combinez les résultats des deux requêtes
  const subjectTriples = data.triples.filter(triple => triple.subject.id === nodeId);
  const objectTriples = data.triples.filter(triple => triple.object.id === nodeId);

  console.log("Triples par sujet :", subjectTriples); // Log des triples par sujet
  console.log("Triples par objet :", objectTriples); // Log des triples par objet

  // Combinez les résultats des deux requêtes
  const combinedTriples = [
    ...subjectTriples,
    ...objectTriples,
  ];

  // Éliminez les doublons
  const uniqueTriples = Array.from(new Set(combinedTriples.map(triple => triple.id)))
    .map(id => combinedTriples.find(triple => triple.id === id));

  console.log("Triples récupérés pour le nœud :", uniqueTriples); // Ajoutez ce log
  return uniqueTriples; // Retourne les triplets filtrés
};