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
  - open: Opening price
  - high: Highest price of the day
  - low: Lowest price of the day
  - close: Closing price
  - volume: Trading volume
  - adj_high: Adjusted highest price
  - adj_low: Adjusted lowest price
  - adj_close: Adjusted closing price
  - adj_open: Adjusted opening price
  - adj_volume: Adjusted volume
  - split_factor: Stock split factor
  - dividend: Dividend amount
  - symbol: Stock symbol
  - exchange: Exchange identifier
  - date: Trading date

## Example Usage

```json
# Request
{
  "name": "marketstack_eod",
  "arguments": {
    "symbol": "AAPL",
    "date_from": "2024-01-01",
    "date_to": "2024-01-31",
    "limit": 20
  }
}

# Response
{
  "pagination": {
    "limit": 20,
    "offset": 0,
    "count": 20,
    "total": 21
  },
  "data": [
    {
      "open": 185.00,
      "high": 186.74,
      "low": 184.26,
      "close": 185.92,
      "volume": 77522654.0,
      "adj_high": 186.74,
      "adj_low": 184.26,
      "adj_close": 185.92,
      "adj_open": 185.00,
      "adj_volume": 77522654.0,
      "split_factor": 1.0,
      "dividend": 0.0,
      "symbol": "AAPL",
      "exchange": "XNAS",
      "date": "2024-01-31"
    }
  ]
}
```

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

## Error Handling

The server handles various error cases:
- Missing or invalid API key
- Invalid stock symbols
- Invalid date formats
- Network request failures
- API rate limiting and quota errors

## API Documentation

This implementation is based on the Marketstack EOD API endpoint:
https://marketstack.com/documentation#eod

## License

This MCP server is licensed under the MIT License.
