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
interface AncestryResponse {
  success: boolean;
  error?: string;
}

interface RecordSearchResponse extends AncestryResponse {
  records: Array<{
    id: string;
    title: string;
    category: string;
    year: number;
    location: string;
    summary: string;
  }>;
  total: number;
}

interface RecordDetailsResponse extends AncestryResponse {
  record: {
    id: string;
    title: string;
    category: string;
    year: number;
    location: string;
    content: string;
    sources: string[];
    images: string[];
  };
}

interface FamilyTreeSearchResponse extends AncestryResponse {
  results: Array<{
    tree_id: string;
    person_id: string;
    name: string;
    birth_year?: number;
    death_year?: number;
    location?: string;
    tree_name: string;
    owner: string;
  }>;
}

interface PersonDetailsResponse extends AncestryResponse {
  person: {
    id: string;
    name: string;
    birth: {
      date?: string;
      place?: string;
    };
    death?: {
      date?: string;
      place?: string;
    };
    parents: Array<{
      id: string;
      name: string;
    }>;
    spouses: Array<{
      id: string;
      name: string;
      marriage?: {
        date?: string;
        place?: string;
      };
    }>;
    children: Array<{
      id: string;
      name: string;
    }>;
  };
}

function getApiCredentials(): { key: string; secret: string } {
  const key = process.env.ANCESTRY_API_KEY;
  const secret = process.env.ANCESTRY_API_SECRET;
  
  if (!key || !secret) {
    console.error("ANCESTRY_API_KEY and ANCESTRY_API_SECRET environment variables must be set");
    process.exit(1);
  }
  
  return { key, secret };
}

// Tool definitions
const SEARCH_RECORDS_TOOL: Tool = {
  name: "ancestry_search_records",
  description: "Search historical records on Ancestry.com",
  inputSchema: {
    type: "object",
    properties: {
      query: { 
        type: "string", 
        description: "Search terms" 
      },
      category: {
        type: "string",
        description: "Record category"
      },
      year: {
        type: "number",
        description: "Year of record"
      },
      location: {
        type: "string",
        description: "Location of record"
      }
    },
    required: ["query"]
  }
};

const GET_RECORD_DETAILS_TOOL: Tool = {
  name: "ancestry_get_record_details",
  description: "Get detailed information about a specific record",
  inputSchema: {
    type: "object",
    properties: {
      record_id: {
        type: "string",
        description: "The ID of the record to retrieve"
      }
    },
    required: ["record_id"]
  }
};

const SEARCH_FAMILY_TREES_TOOL: Tool = {
  name: "ancestry_search_family_trees",
  description: "Search public family trees on Ancestry.com",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Person's name to search for"
      },
      birth_year: {
        type: "number",
        description: "Year of birth"
      },
      death_year: {
        type: "number",
        description: "Year of death"
      },
      location: {
        type: "string",
        description: "Location"
      }
    },
    required: ["name"]
  }
};

const GET_PERSON_DETAILS_TOOL: Tool = {
  name: "ancestry_get_person_details",
  description: "Get detailed information about a person",
  inputSchema: {
    type: "object",
    properties: {
      person_id: {
        type: "string",
        description: "The ID of the person to retrieve"
      }
    },
    required: ["person_id"]
  }
};

const ANCESTRY_TOOLS = [
  SEARCH_RECORDS_TOOL,
  GET_RECORD_DETAILS_TOOL,
  SEARCH_FAMILY_TREES_TOOL,
  GET_PERSON_DETAILS_TOOL,
] as const;

// API handlers
async function handleSearchRecords(
  query: string,
  category?: string,
  year?: number,
  location?: string
) {
  const credentials = getApiCredentials();
  const url = new URL("https://api.ancestry.com/v2/records/search");
  url.searchParams.append("q", query);
  if (category) url.searchParams.append("category", category);
  if (year) url.searchParams.append("year", year.toString());
  if (location) url.searchParams.append("location", location);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": `Bearer ${credentials.key}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json() as RecordSearchResponse;

    if (!data.success) {
      return {
        toolResult: {
          content: [{
            type: "text",
            text: `Search failed: ${data.error || 'Unknown error'}`
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

async function handleGetRecordDetails(recordId: string) {
  const credentials = getApiCredentials();
  const url = new URL(`https://api.ancestry.com/v2/records/${recordId}`);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": `Bearer ${credentials.key}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json() as RecordDetailsResponse;

    if (!data.success) {
      return {
        toolResult: {
          content: [{
            type: "text",
            text: `Failed to get record details: ${data.error || 'Unknown error'}`
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

async function handleSearchFamilyTrees(
  name: string,
  birthYear?: number,
  deathYear?: number,
  location?: string
) {
  const credentials = getApiCredentials();
  const url = new URL("https://api.ancestry.com/v2/trees/search");
  url.searchParams.append("name", name);
  if (birthYear) url.searchParams.append("birth_year", birthYear.toString());
  if (deathYear) url.searchParams.append("death_year", deathYear.toString());
  if (location) url.searchParams.append("location", location);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": `Bearer ${credentials.key}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json() as FamilyTreeSearchResponse;

    if (!data.success) {
      return {
        toolResult: {
          content: [{
            type: "text",
            text: `Search failed: ${data.error || 'Unknown error'}`
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

async function handleGetPersonDetails(personId: string) {
  const credentials = getApiCredentials();
  const url = new URL(`https://api.ancestry.com/v2/persons/${personId}`);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": `Bearer ${credentials.key}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json() as PersonDetailsResponse;

    if (!data.success) {
      return {
        toolResult: {
          content: [{
            type: "text",
            text: `Failed to get person details: ${data.error || 'Unknown error'}`
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
    name: "mcp-server/ancestry",
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
  tools: ANCESTRY_TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "ancestry_search_records": {
        const { query, category, year, location } = request.params.arguments as {
          query: string;
          category?: string;
          year?: number;
          location?: string;
        };
        return await handleSearchRecords(query, category, year, location);
      }
      
      case "ancestry_get_record_details": {
        const { record_id } = request.params.arguments as { record_id: string };
        return await handleGetRecordDetails(record_id);
      }
      
      case "ancestry_search_family_trees": {
        const { name, birth_year, death_year, location } = request.params.arguments as {
          name: string;
          birth_year?: number;
          death_year?: number;
          location?: string;
        };
        return await handleSearchFamilyTrees(name, birth_year, death_year, location);
      }
      
      case "ancestry_get_person_details": {
        const { person_id } = request.params.arguments as { person_id: string };
        return await handleGetPersonDetails(person_id);
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
  console.error("Ancestry.com MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});