# Marketstack MCP Server for Claude

An implementation of a Model Context Protocol (MCP) server for accessing stock market data through the Marketstack API. This project was created with assistance from Claude AI as an experiment in extending AI capabilities through MCP.

## Overview

This repository contains an MCP server that allows Claude to fetch End-of-Day (EOD) stock data using the Marketstack API. It demonstrates how to extend Claude's capabilities using the Anthropic Model Context Protocol.

## Features

- Fetch End-of-Day (EOD) stock data for any symbol
- Historical data access with date range filtering
- Detailed stock information including prices, volumes, and adjustments
- Error handling and rate limit management

## Prerequisites

1. [Claude Desktop](https://github.com/anthropic-labs/claude-desktop)
2. A Marketstack API key (get one at [marketstack.com/signup](https://marketstack.com/signup))
3. Node.js and npm installed
4. Basic familiarity with Git and GitHub

## Installation

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

## Configuration

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

## Project Creation Journey

This project was created by someone with limited coding experience, demonstrating the power of AI assistance in development. Here's how it was built:

1. Set up Claude Desktop with the Brave MCP server for internet access
2. Used Claude to explore potential API services and selected Marketstack
3. Set up Git MCP server integration
4. Created repository structure with Claude's guidance
5. Implemented the Marketstack API integration using the Google Maps MCP server as a reference
6. Used GitHub Desktop and VSCode for manual adjustments
7. Learned npm basics for package management and building

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
