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

1. [Claude Desktop](https://github.com/anthropic-labs/claude-desktop)
2. A Marketstack API key (get one at [marketstack.com/signup](https://marketstack.com/signup))
3. Node.js and npm installed
4. Basic familiarity with Git and GitHub

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/shussey/claude-test.git
   cd claude-test
   ```

2. Install dependencies:
   ```bash
   cd src/marketstack
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Configuration

1. Add the server configuration to your `claude_desktop_config.json`:
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

2. Replace `<YOUR_API_KEY>` with your Marketstack API key

## Usage

Once configured, you can ask Claude questions about stock data, such as:
- "What was Apple's stock price last week?"
- "Show me Tesla's trading volume for the past month"
- "Get the highest price for MSFT in January 2024"

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
