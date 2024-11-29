# Marketstack MCP Server

MCP Server implementation for the Marketstack API, providing access to real-time and historical stock market data.

## Tools

1. `marketstack_eod`
   - Get End-of-Day (EOD) stock data
   - Inputs:
     - `symbol` (required): Stock symbol (e.g., "AAPL")
     - `date_from` (optional): Start date (YYYY-MM-DD)
     - `date_to` (optional): End date (YYYY-MM-DD)
     - `limit` (optional): Number of results per page (default: 100)

2. `marketstack_intraday`
   - Get intraday stock data with intervals
   - Inputs:
     - `symbol` (required): Stock symbol
     - `date_from` (optional): Start date and time
     - `date_to` (optional): End date and time
     - `interval` (optional): Time interval (1min, 5min, 15min, 30min, 1hour, 3hour, 6hour, 12hour, 24hour)
     - `limit` (optional): Number of results per page

3. `marketstack_tickers`
   - Get stock ticker information
   - Inputs:
     - `symbols` (required): Stock symbols (comma-separated)
     - `exchange` (optional): Exchange code (e.g., "XNAS")

4. `marketstack_exchanges`
   - Get information about supported stock exchanges
   - Inputs:
     - `search` (optional): Search exchanges by name
     - `limit` (optional): Number of results per page

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

This implementation is based on the Marketstack API:
https://marketstack.com/documentation

## License

This MCP server is licensed under the MIT License.
