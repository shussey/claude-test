#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
function getApiKey() {
    const apiKey = process.env.MARKETSTACK_API_KEY;
    if (!apiKey) {
        console.error("MARKETSTACK_API_KEY environment variable must be set");
        process.exit(1);
    }
    return apiKey;
}
// Tool definition
const EOD_TOOL = {
    name: "marketstack_eod",
    description: "Get End-of-Day (EOD) stock data",
    inputSchema: {
        type: "object",
        properties: {
            symbol: {
                type: "string",
                description: "Stock symbol (e.g., 'AAPL')"
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
                description: "Number of results per page",
                default: 100
            }
        },
        required: ["symbol"]
    }
};
const MARKETSTACK_TOOLS = [
    EOD_TOOL,
];
// API handler
async function handleEod(symbol, dateFrom, dateTo, limit = 100) {
    const apiKey = getApiKey();
    const url = new URL("http://api.marketstack.com/v1/eod");
    url.searchParams.append("access_key", apiKey);
    url.searchParams.append("symbols", symbol);
    if (dateFrom)
        url.searchParams.append("date_from", dateFrom);
    if (dateTo)
        url.searchParams.append("date_to", dateTo);
    if (limit)
        url.searchParams.append("limit", limit.toString());
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        if (data.error) {
            return {
                toolResult: {
                    content: [{
                            type: "text",
                            text: `API request failed: ${data.error.message}`
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
    }
    catch (error) {
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
const server = new Server({
    name: "mcp-server/marketstack",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: MARKETSTACK_TOOLS,
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        switch (request.params.name) {
            case "marketstack_eod": {
                const { symbol, date_from, date_to, limit } = request.params.arguments;
                return await handleEod(symbol, date_from, date_to, limit);
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
    }
    catch (error) {
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
    console.error("Marketstack EOD MCP Server running on stdio");
}
runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});