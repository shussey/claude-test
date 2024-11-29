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

interface DnaMatchResponse extends AncestryResponse {
  matches: Array<{
    match_id: string;
    name: string;
    confidence: string;
    shared_dna: {
      segments: number;
      centimorgans: number;
    };
    relationship_range: string;
    tree_available: boolean;
  }>;
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