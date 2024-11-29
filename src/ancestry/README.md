# Ancestry.com MCP Server

MCP Server for the Ancestry.com API.

## Tools

1. `search_records`
   - Search historical records
   - Inputs:
     - `query` (string): Search terms
     - `collection` (optional string): Specific collection ID
     - `filters` (optional object): Additional search filters

2. `get_record`
   - Get detailed information about a specific record
   - Input: `record_id` (string)

3. `search_trees`
   - Search family trees
   - Inputs:
     - `query` (string): Search terms
     - `owner` (optional string): Tree owner username

4. `get_tree_details`
   - Get detailed information about a family tree
   - Input: `tree_id` (string)

5. `get_person`
   - Get information about a person in a family tree
   - Inputs:
     - `tree_id` (string)
     - `person_id` (string)

6. `search_dna_matches`
   - Search DNA matches
   - Inputs:
     - `test_id` (string)
     - `filters` (optional object): Match filters

## Setup

### API Key
Get an Ancestry.com API key by signing up for API access at their developer portal.

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ancestry": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-ancestry"
      ],
      "env": {
        "ANCESTRY_API_KEY": "<YOUR_API_KEY>",
        "ANCESTRY_API_SECRET": "<YOUR_API_SECRET>"
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License.
