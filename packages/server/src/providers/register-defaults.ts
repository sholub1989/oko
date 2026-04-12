/**
 * Registers the built-in provider factories (New Relic, GCP).
 * Extracted from index.ts for separation of concerns.
 */

import type { ProviderRegistry } from "./registry.js";
import { NewRelicProvider } from "./newrelic/newrelic.provider.js";
import { GcpProvider } from "./gcp/gcp.provider.js";
import { McpProvider } from "../mcp/mcp-provider.js";
import { mcpDefinitions } from "../mcp/definitions.js";

export function registerDefaultProviders(providers: ProviderRegistry): void {
  providers.registerFactory(
    "newrelic",
    (cfg) => {
      if (cfg.__mode === "mcp") {
        const def = mcpDefinitions.get("newrelic");
        if (!def) throw new Error('MCP definition for "newrelic" not found');
        return new McpProvider(def, cfg, "newrelic");
      }
      return new NewRelicProvider({
        type: "newrelic",
        apiKey: cfg.apiKey,
        accountId: cfg.accountId,
      });
    },
    {
      label: "New Relic",
      configFields: [
        { key: "apiKey", label: "API Key", type: "password" },
        { key: "accountId", label: "Account ID", type: "text" },
      ],
      modes: ["api", "mcp"],
      mcpConfigFields: [
        { key: "apiKey", label: "API Key", type: "password" },
        { key: "accountId", label: "Account ID", type: "text" },
        { key: "region", label: "Region (US or EU)", type: "text", required: false },
      ],
    },
  );

  providers.registerFactory(
    "gcp",
    (cfg) => {
      const def = mcpDefinitions.get("gcp");
      if (!def) throw new Error('MCP definition for "gcp" not found');
      return new GcpProvider(def, cfg);
    },
    {
      label: "Google Cloud",
      configFields: [],
    },
  );
}
