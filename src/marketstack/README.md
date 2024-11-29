# MarketStack MCP Server

MCP Server implementation for the MarketStack API, providing access to real-time and historical stock market data.

## Tools

1. `marketstack_eod`
   - Get end-of-day stock prices
   - Inputs:
     - `symbols` (required): Stock symbol(s) to fetch (e.g., "AAPL" or ["AAPL", "MSFT"])
     - `date_from` (optional): Start date (YYYY-MM-DD)
     - `date_to` (optional): End date (YYYY-MM-DD)
     - `limit` (optional): Number of results per page (1-1000, default 100)
     - `offset` (optional): Pagination offset

2. `marketstack_intraday`
   - Get intraday stock prices
   - Inputs:
     - `symbols` (required): Stock symbol(s) to fetch
     - `interval` (optional): Time interval (1min, 5min, 15min, 30min, 1hour, 3hour, 6hour, 12hour, 24hour)
     - `date_from` (optional): Start date
     - `date_to` (optional): End date
     - `limit` (optional): Results per page
     - `offset` (optional): Pagination offset

3. `marketstack_tickers`
   - Search for stock symbols and company information
   - Inputs:
     - `search` (optional): Search term
     - `exchange` (optional): Filter by exchange
     - `limit` (optional): Results per page
     - `offset` (optional): Pagination offset

4. `marketstack_exchanges`
   - Get stock exchange information
   - Inputs:
     - `search` (optional): Search term
     - `limit` (optional): Results per page
     - `offset` (optional): Pagination offset

## Setup

### API Authentication
Get a MarketStack API key by signing up at https://marketstack.com/signup

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

This implementation is based on the MarketStack API:
https://marketstack.com/documentation

## License

This MCP server is licensed under the MIT License.
