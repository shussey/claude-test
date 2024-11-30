# Marketstack MCP Server experiment
This uses Claude Desktop and the recently published Anthropic Model Context Protocol. https://github.com/modelcontextprotocol . This was a fun test for someone like me with limited to zero coding experience.
1. Install Claude desktop
2. Set up Claude to use Brave MCP server so it can access the internet https://github.com/modelcontextprotocol/servers/blob/main/src/brave-search/README.md
4. Ask Claude for a list of interesting web accessible services that are free and have an API. I selected Marketwatch and registered to get my API key
5. Set up Claude to use Git MCP server https://github.com/modelcontextprotocol/servers/blob/main/src/git/README.md
6. Create this empty git repo manually
7. Ask Claude to look at the marketwatch API by giving it the URL. Tell it to look at the google map MCP server by giving it the URL to the git source folder. Tell it to create a new MCP server in my empty repo.
8. I did already know how to play around with Github Desktop and VSCode but only as a very casual user to look at projects so was able to fix things it didnt do quite right by asking Claude about the symptoms.
9. I had to ask Claude what NPM is and what commands to use to install, build and publish the project.
10. Set up Claude to use my marketwatch MCP server
11. I can now ask Claude about stocks!!!!!!!!!!!!!!! When the API can help you extend itself, I think we are at an inflection point.
