# Learning to Build with Claude - A Journey from Zero to MCP Server

This project documents my journey of creating a stock market data server with minimal coding experience, using Claude AI as my guide. It demonstrates how AI can help bridge the gap between having an idea and implementing it, even for those just starting their coding journey.

## The Journey

Here's how this project came to life, step by step:

1. **Getting Started with Claude**
   - Installed Claude Desktop
   - Set up the Brave MCP server to give Claude internet access
   - Asked Claude to suggest interesting, free APIs we could work with

2. **Choosing and Understanding the API**
   - Explored various options Claude suggested
   - Selected Marketstack for its simplicity and free tier
   - Registered to get an API key

3. **Learning the Development Process**
   - Set up Git MCP server integration to manage code
   - Created this repository as a blank canvas
   - Asked Claude to examine Marketstack's API documentation
   - Used Google Maps MCP server as a reference implementation

4. **Building and Learning**
   - Learned about NPM and basic package management
   - Discovered how to install dependencies and build TypeScript projects
   - Used GitHub Desktop and VSCode for basic file management
   - Fixed issues by describing symptoms to Claude

5. **The Result**
   - Successfully created a working MCP server
   - Can now ask Claude about stock data!
   - Gained practical experience with modern development tools

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