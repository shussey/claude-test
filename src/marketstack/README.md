# MarketStack MCP Server

MCP Server implementation for the MarketStack API.

## Tools

1. `marketstack_eod`
   - Get End-of-Day (EOD) stock data
   - Inputs:
     - `symbols` (required): Stock symbol(s) to fetch
     - `date_from` (optional): Start date (YYYY-MM-DD)
     - `date_to` (optional): End date (YYYY-MM-DD)
     - `limit` (optional): Number of results per symbol

2. `marketstack_intraday`
   - Get intraday stock data
   - Inputs:
     - `symbols` (required): Stock symbol(s) to fetch
     - `interval` (optional): Time interval (1min, 5min, 15min, 30min, 1h, 3h, 6h, 12h)
     - `date_from` (optional): Start date
     - `date_to` (optional): End date

3. `marketstack_tickers`
   - Get stock ticker information
   - Inputs:
     - `search` (optional): Search string
     - `limit` (optional): Number of results
     - `offset` (optional): Pagination offset

4. `marketstack_exchanges`
   - Get stock exchange information
   - Inputs:
     - `search` (optional): Search string
     - `limit` (optional): Number of results

5. `marketstack_currencies`
   - Get supported currencies

6. `marketstack_timezones`
   - Get supported timezones

## Setup

### API Authentication
Get a MarketStack API key by registering at https://marketstack.com/signup

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
This implementation is based on the MarketStack API documentation:
https://marketstack.com/documentation

## License

This MCP server is licensed under the MIT License.
