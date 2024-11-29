# FamilySearch Ancestry MCP Server

MCP Server implementation for the FamilySearch Ancestry API endpoint.

## Tools

1. `familysearch_get_ancestry`
   - Get a person's ancestors and descendants from FamilySearch Family Tree
   - Inputs:
     - `person` (required): ID of the person to get ancestry for
     - `spouse` (optional): ID of the person's spouse
     - `personDetails` (optional): Whether to include detailed person information (default: true)
     - `generations` (optional): Number of generations to return (default: 4)
   - Returns: Detailed ancestry information including:
     - Person details (name, gender, lifespan, birth/death info)
     - Relationship connections (ancestry/descendancy)

## Setup

### API Authentication
Get a FamilySearch API key by registering at https://www.familysearch.org/developers/

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "familysearch-ancestry": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-familysearch-ancestry"
      ],
      "env": {
        "FAMILYSEARCH_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## API Documentation

This implementation is based on the FamilySearch Ancestry API endpoint:
https://www.familysearch.org/developers/docs/api/tree/Ancestry_resource

## License

This MCP server is licensed under the MIT License.
