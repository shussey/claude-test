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
interface MarketStackResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

interface StockData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adj_high?: number;
  adj_low?: number;
  adj_close?: number;
  adj_open?: number;
  adj_volume?: number;
  split_factor?: number;
  dividend?: number;
  symbol: string;
  exchange: string;
  date: string;
}

interface EODResponse extends MarketStackResponse {
  data: StockData[];
}

interface IntradayResponse extends MarketStackResponse {
  data: StockData[];
}

interface Ticker {
  name: string;
  symbol: string;
  stock_exchange: {
    acronym: string;
    name: string;
    country: string;
    country_code: string;
    city: string;
    website: string;
  };
  has_intraday: boolean;
  has_eod: boolean;
}

interface TickersResponse extends MarketStackResponse {
  data: Ticker[];
}

interface Exchange {
  name: string;
  acronym: string;
  mic: string;
  country: string;
  country_code: string;
  city: string;
  website: string;
  timezone: {
    timezone: string;
    abbr: string;
    abbr_dst: string;
  };
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
}

interface ExchangesResponse extends MarketStackResponse {
  data: Exchange[];
}

function getApiKey(): string {
  const apiKey = process.env.MARKETSTACK_API_KEY;
  
  if (!apiKey) {
    console.error("MARKETSTACK_API_KEY environment variable must be set");
    process.exit(1);
  }
  
  return apiKey;
}

// Tool definitions
const EOD_TOOL: Tool = {
  name: "marketstack_eod",
  description: "Get end-of-day stock data",
  inputSchema: {
    type: "object",
    properties: {
      symbols: {
        oneOf: [
          { type: "string" },
          { type: "array", items: { type: "string" } }
        ],
        description: "Stock symbol(s) to fetch data for"
      },
      date_from: {
        type: "string",
        description: "Start date (YYYY-MM-DD)"
      },
      date_to: {
        type: "string",
        description: "End date (YYYY-MM-DD)"
      },
      limit: {
        type: "number",
        description: "Number of results per page (1-1000)",
        minimum: 1,
        maximum: 1000
      },
      offset: {
        type: "number",
        description: "Pagination offset",
        minimum: 0
      }
    },
    required: ["symbols"]
  }
};

const INTRADAY_TOOL: Tool = {
  name: "marketstack_intraday",
  description: "Get intraday stock data",
  inputSchema: {
    type: "object",
    properties: {
      symbols: {
        oneOf: [
          { type: "string" },
          { type: "array", items: { type: "string" } }
        ],
        description: "Stock symbol(s) to fetch data for"
      },
      interval: {
        type: "string",
        enum: ["1min", "5min", "15min", "30min", "1hour", "3hour", "6hour", "12hour", "24hour"],
        description: "Time interval between data points"
      },
      date_from: {
        type: "string",
        description: "Start date (YYYY-MM-DD)"
      },
      date_to: {
        type: "string",
        description: "End date (YYYY-MM-DD)"
      },
      limit: {
        type: "number",
        description: "Number of results per page (1-1000)",
        minimum: 1,
        maximum: 1000
      },
      offset: {
        type: "number",
        description: "Pagination offset",
        minimum: 0
      }
    },
    required: ["symbols"]
  }
};

const TICKERS_TOOL: Tool = {
  name: "marketstack_tickers",
  description: "Search for stock symbols and company information",
  inputSchema: {
    type: "object",
    properties: {
      search: {
        type: "string",
        description: "Search term"
      },
      exchange: {
        type: "string",
        description: "Filter by exchange (e.g., 'XNAS' for NASDAQ)"
      },
      limit: {
        type: "number",
        description: "Number of results per page (1-1000)",
        minimum: 1,
        maximum: 1000
      },
      offset: {
        type: "number",
        description: "Pagination offset",
        minimum: 0
      }
    }
  }
};

const EXCHANGES_TOOL: Tool = {
  name: "marketstack_exchanges",
  description: "Get stock exchange information",
  inputSchema: {
    type: "object",
    properties: {
      search: {
        type: "string",
        description: "Search term"
      },
      limit: {
        type: "number",
        description: "Number of results per page (1-1000)",
        minimum: 1,
        maximum: 1000
      },
      offset: {
        type: "number",
        description: "Pagination offset",
        minimum: 0
      }
    }
  }
};

const MARKETSTACK_TOOLS = [
  EOD_TOOL,
  INTRADAY_TOOL,
  TICKERS_TOOL,
  EXCHANGES_TOOL,
] as const;
