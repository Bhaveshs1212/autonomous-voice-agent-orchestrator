/**
 * RAG Context Formatter
 * Formats vector search results from Pinecone into a strict string format 
 * for injection into the LLM context window.
 */

// Get the search results from the previous node
const matches = $input.item.json.matches;

// If no results are found, return a simple message.
if (!matches || matches.length === 0) {
  return [{ long_term_memory: 'No previous conversations found.' }];
}

// Format each match into a JSON-compatible string line
const context = matches.map(match => {
  const summary = match.metadata.summary;
  const timestamp = match.metadata.timestamp;

  // Escape double quotes to ensure valid JSON payload downstream
  const formattedSummary = `\\"${summary}\\"`;

  return `- On ${timestamp}, we discussed: ${formattedSummary}`;
}).join('\\n');

const finalMemoryString = `Context from previous calls:\\n${context}`;

return [{ long_term_memory: finalMemoryString }];