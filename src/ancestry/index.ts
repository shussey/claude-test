#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";

// Response interfaces
interface FamilySearchResponse {
  status?: number;
  statusText?: string;
  errors?: Array<{
    code: number;
    message: string;
  }>;
}

interface AncestryResponse extends FamilySearchResponse {
  persons: Array<{
    id: string;
    display: {
      name: string;
      gender: string;
      lifespan: string;
      birthDate: string;
      birthPlace: string;
      deathDate: string;
      deathPlace: string;
    };
  }>;
  relationships: Array<{
    type: "ancestry" | "descendancy";
    person1: {
      resourceId: string;
      resource: string;
    };
    person2: {
      resourceId: string;
      resource: string;
    };
  }>;
}

function getApiKey(): string {
  const apiKey = process.env.FAMILYSEARCH_API_KEY;
  
  if (!apiKey) {
    console.error("FAMILYSEARCH_API_KEY environment variable must be set");
    process.exit(1);
  }
  
  return apiKey;
}

// Tool definition
const GET_ANCESTRY_TOOL: Tool = {
  name: "familysearch_get_ancestry",
  description: "Get a person's ancestors and descendants from FamilySearch Family Tree",
  inputSchema: {
    type: "object",
    properties: {
      person: { 
        type: "string", 
        description: "ID of the person to get ancestry for" 
      },
      spouse: {
        type: "string",
        description: "Optional ID of the person's spouse"
      },
      personDetails: {
        type: "boolean",
        description: "Whether to include detailed person information",
        default: true
      },
      generations: {
        type: "number",
        description: "Number of generations to return",
        default: 4
      }
    },
    required: ["person"]
  }
};

const FAMILYSEARCH_TOOLS = [
  GET_ANCESTRY_TOOL,
] as const;

// API handler
async function handleGetAncestry(
  personId: string,
  spouseId?: string,
  personDetails: boolean = true,
  generations: number = 4
) {
  const apiKey = getApiKey();
  const url = new URL("https://api.familysearch.org/platform/tree/ancestry");
  
  url.searchParams.append("person", personId);
  if (spouseId) url.searchParams.append("spouse", spouseId);
  if (personDetails) url.searchParams.append("personDetails", "true");
  if (generations) url.searchParams.append("generations", generations.toString());

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/x-fs-v1+json"
      }
    });

    if (!response.ok) {
      return {
        toolResult: {
          content: [{
            type: "text",
            text: `API request failed: ${response.status} ${response.statusText}`
          }],
          isError: true
        }
      };
    }

    const data = await response.json() as AncestryResponse;

    if (data.errors) {
      return {
        toolResult: {
          content: [{
            type: "text",
            text: `API request failed: ${data.errors.map(e => e.message).join(", ")}`
          }],
          isError: true
        }
      };
    }

    return {
      toolResult: {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }],
        isError: false
      }
    };
  } catch (error) {
    return {
      toolResult: {
        content: [{
          type: "text",
          text: `API request failed: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      }
    };
  }
}

// Server setup
const server = new Server(
  {
    name: "mcp-server/familysearch-ancestry",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: FAMILYSEARCH_TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "familysearch_get_ancestry": {
        const { person, spouse, personDetails, generations } = request.params.arguments as {
          person: string;
          spouse?: string;
          personDetails?: boolean;
          generations?: number;
        };
        return await handleGetAncestry(person, spouse, personDetails, generations);
      }
      
      default:
        return {
          toolResult: {
            content: [{
              type: "text",
              text: `Unknown tool: ${request.params.name}`
            }],
            isError: true
          }
        };
    }
  } catch (error) {
    return {
      toolResult: {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      }
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("FamilySearch Ancestry MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});