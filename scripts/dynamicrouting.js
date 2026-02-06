/**
 * Dynamic Routing Logic
 * Maps incoming agent IDs to specific Airtable Base/Table configurations.
 * Ensures multi-tenant support for different agents.
 */

const rec = $json.records?.[0]?.fields;
if (!rec) throw new Error('No routing row found or agent not enabled');

return [{
  baseId: rec.base_id,     // dynamic per agent
  table:  rec.table_name   // dynamic per agent
}];