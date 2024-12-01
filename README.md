# Learning to Build with Claude - A Journey from Zero to MCP Server

This repository is an impementation of a [Model Context Protocol](https://github.com/modelcontextprotocol) server but that isnt the thing to focus on. The point is how little I had to know and do to make this and then use it.
\
\
The following documents my journey of creating a stock market MCP server with minimal coding experience and almost no actual coding, using Claude AI as my guide. From learning MCP had been published by Anthropic to having this working server was about 2 hours with some of that just playing with Claude which I hadnt used before. 
\
\
It demonstrates how AI can help bridge the gap between having an idea and implementing it, even for those just starting their coding journey.
\
\
NOTE: I didnt read the [Marketstack](https://marketstack.com/) API documentation. I didnt read the MCP sample code, except at the end when I had some problems getting Claude Desktop to load the new server. And even then it wasnt a code problem. It was a formatting issue in the Returns section of the README.md

## The Journey

Here's how this project came to life. It isnt every step but gives you the main building blocks:

1. **Getting Started with Claude**
   - I installed Claude Desktop on my Mac
   - I set up the [Brave MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) to give Claude internet access

2. **Choosing and Understanding the Stock API**
   - I asked Claude to suggest interesting, free APIs I could work with
   - I explored various options Claude suggested and selected [Marketstack](https://marketstack.com/) for its simplicity and free tier
   - I went to their site and registered to get an API key

4. **The Development Process**
   - I set up [Github MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/github) for Claude to manage code
   - I created this repository as a blank canvas (although I could have asked Claude to do it)
   - I asked Claude "take a look at github modelcontextprotocol/servers at src/google-maps and let me know what you found"
   - I asked Claude "using that as an example, i need you to create a similar mcp server that can use this API https://marketstack.com/documentation. Just do end of day quotes. Create it in repository shussey/claude-test"

5. **My manual steps building and learning**
   - I used Claude to learn how to install dependencies, build Node projects and how to publish them to npmjs.com
   - I used GitHub Desktop and VSCode for basic file management of what Claude was creating and for running the commands I learned
   - I fixed issues by describing symptoms to Claude

6. **The Result**
   - I successfully created a working MCP server for Marketstack
   - I can now ask Claude about stock data!

The most exciting realization: When an AI can help extend its own capabilities through APIs, we're witnessing a transformative moment in technology accessibility.

## About This Project

This is an implementation of a Model Context Protocol (MCP) server that gives Claude access to stock market data through the Marketstack API. It demonstrates how to extend Claude's capabilities using the Anthropic Model Context Protocol.

### Features

- Fetch End-of-Day (EOD) stock data for any symbol
- Historical data access with date range filtering
- Detailed stock information including prices, volumes, and adjustments
- Error handling and rate limit management

## Getting Started

### Prerequisites
A Marketstack API key (get one at [marketstack.com/signup](https://marketstack.com/signup) . Free works fine but it will ask for a credit card.

### Configuration
Steps to set up Claude for MCP servers in general are [here](https://modelcontextprotocol.io/quickstart#prerequisites)
1. Add the server configuration to your `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "marketstack": {
         "command": "npx",
         "args": [
           "-y",
           "@shussey/marketstack"
         ],
         "env": {
           "MARKETSTACK_API_KEY": "<YOUR_API_KEY>"
         }
       }
     }
   }
   ```

2. Replace `<YOUR_API_KEY>` with your Marketstack API key

## Usage

Once configured, you can ask Claude questions about stock data, such as:
- "What was Apple's stock price last week?"
```
I'll help you check Apple's stock price data from last week using the marketstack API.
```
```
View Result from marketstack_eod from marketstack (local)
{
  `symbol`: `AAPL`,
  `date_to`: `2024-11-30`,
  `date_from`: `2024-11-24`
}
{
  "content": [
    {
      "type": "text",
      "text": "{\n  \"pagination\": {\n    \"limit\": 100,\n    \"offset\": 0,\n    \"count\": 4,\n    \"total\": 4\n  },\n  \"data\": [\n    {\n      \"open\": 234.81,\n      \"high\": 237.81,\n      \"low\": 233.97,\n      \"close\": 237.33,\n      \"volume\": 28481400,\n      \"adj_high\": 237.81,\n      \"adj_low\": 233.97,\n      \"adj_close\": 237.33,\n      \"adj_open\": 234.81,\n      \"adj_volume\": 28481377,\n      \"split_factor\": 1,\n      \"dividend\": 0,\n      \"symbol\": \"AAPL\",\n      \"exchange\": \"XNAS\",\n      \"date\": \"2024-11-29T00:00:00+0000\"\n    },\n    {\n      \"open\": 234.465,\n      \"high\": 235.69,\n      \"low\": 233.8101,\n      \"close\": 234.93,\n      \"volume\": 33498439,\n      \"adj_high\": 235.69,\n      \"adj_low\": 233.8101,\n      \"adj_close\": 234.93,\n      \"adj_open\": 234.465,\n      \"adj_volume\": 33498439,\n      \"split_factor\": 1,\n      \"dividend\": 0,\n      \"symbol\": \"AAPL\",\n      \"exchange\": \"XNAS\",\n      \"date\": \"2024-11-27T00:00:00+0000\"\n    },\n    {\n      \"open\": 233.475,\n      \"high\": 235.57,\n      \"low\": 233.475,\n      \"close\": 235.06,\n      \"volume\": 44991117,\n      \"adj_high\": 235.57,\n      \"adj_low\": 233.33,\n      \"adj_close\": 235.06,\n      \"adj_open\": 233.33,\n      \"adj_volume\": 45986189,\n      \"split_factor\": 1,\n      \"dividend\": 0,\n      \"symbol\": \"AAPL\",\n      \"exchange\": \"XNAS\",\n      \"date\": \"2024-11-26T00:00:00+0000\"\n    },\n    {\n      \"open\": 231.46,\n      \"high\": 233.25,\n      \"low\": 229.74,\n      \"close\": 232.87,\n      \"volume\": 89984500,\n      \"adj_high\": 233.245,\n      \"adj_low\": 229.74,\n      \"adj_close\": 232.87,\n      \"adj_open\": 231.46,\n      \"adj_volume\": 90152832,\n      \"split_factor\": 1,\n      \"dividend\": 0,\n      \"symbol\": \"AAPL\",\n      \"exchange\": \"XNAS\",\n      \"date\": \"2024-11-25T00:00:00+0000\"\n    }\n  ]\n}"
    }
  ],
  "isError": false
}
```
```
Based on the data, here's Apple's stock performance last week:

- Monday (Nov 25): Opened at $231.46, closed at $232.87
- Tuesday (Nov 26): Opened at $233.48, closed at $235.06
- Wednesday (Nov 27): Opened at $234.47, closed at $234.93
- Friday (Nov 29): Opened at $234.81, closed at $237.33

The stock showed an overall upward trend through the week, with the highest close on Friday at $237.33. The lowest point was on Monday when it dipped to $229.74, while the highest point was reached on Friday at $237.81. Trading volume was notably high on Monday with about 90 million shares traded, then decreased through the week to around 28.5 million shares on Friday. Thursday was Thanksgiving, so the market was closed.
```

Claude will use this MCP server to fetch the relevant data and provide you with the information.

## Technical Details

- Uses the Model Context Protocol by Anthropic (https://github.com/modelcontextprotocol)
- Implements a single tool: `marketstack_eod` for End-of-Day stock data
- Written in TypeScript with full type safety
- Handles API authentication, rate limiting, and error cases

## Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to Anthropic for developing Claude and the Model Context Protocol
- Inspired by the [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) examples
- Built with assistance from Claude AI
