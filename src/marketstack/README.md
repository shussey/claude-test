# Marketstack MCP Server

MCP Server implementation for the Marketstack API's End-of-Day (EOD) stock data endpoint.

## Tool

`marketstack_eod`
- Get End-of-Day (EOD) stock data
- Inputs:
  - `symbol` (required): Stock symbol (e.g., "AAPL")
  - `date_from` (optional): Start date (YYYY-MM-DD)
  - `date_to` (optional): End date (YYYY-MM-DD)
  - `limit` (optional): Number of results per page (default: 100)
- Returns:
  - Open, high, low, close prices
  - Volume
  - Adjusted values
  - Symbol and date information

## Setup

### API Authentication
Get a Marketstack API key by signing up at https://marketstack.com/signup

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "marketstack": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-marketstack"
      ],
      "env": {
        "MARKETSTACK_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## API Documentation

This implementation is based on the Marketstack EOD API endpoint:
https://marketstack.com/documentation#eod

## License

This MCP server is licensed under the MIT License.
