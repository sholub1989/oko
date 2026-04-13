# OKO

[![npm version](https://img.shields.io/npm/v/oko-sh)](https://www.npmjs.com/package/oko-sh)

Local-first AI-powered observability platform.

During an incident, most time goes to switching between observability tools
and gathering context — not fixing the problem. OKO connects your providers
to a single AI chat interface so you find the root cause in one place.

```
┌─────────┐       your API keys         ┌──────────────────┐
│         │ ◄──────────────────────────► │  Observability   │
│   OKO   │                             │  Providers       │
│  local  │       your API keys         ├──────────────────┤
│         │ ◄──────────────────────────► │  LLM Providers   │
└─────────┘                             └──────────────────┘
```

Everything runs on your machine. Your data stays local in a SQLite database.
OKO talks directly to your provider and LLM APIs using your own API keys —
no intermediary servers, no data leaves your machine except API calls you control.

## Install

Requires [Node.js 20+](https://nodejs.org/).

```bash
npx oko-sh
```

Or install globally:

```bash
npm install -g oko-sh
oko-sh
```

Open `http://localhost:3579`, go to **Settings** to add your API keys and choose an LLM — done.

## Features

### Debug

Chat with an AI agent that queries your observability providers in real-time, correlates data across services, and finds root causes — all from a single conversation.

- **Natural language investigation** — describe the problem, the AI queries your providers automatically
- **Live query execution** — NRQL, GCP Logs/Metrics, and more run inline with results rendered as charts
- **Post-mortem reports** — generate structured incident reports and download them as Markdown to share with your team
- **Agent memory** — the AI learns patterns across investigations and reuses them in future sessions
- **Session history** — every investigation is saved and can be resumed later
- **Cost tracking** — token usage and cost breakdown per session

![Debug page](docs/screenshots/debug_page.png)

### Settings

Configure your data providers, LLM credentials, agent behavior, and memory — all from one page. All configuration and data is stored locally on your machine in a SQLite database — nothing leaves your machine except the API calls you configure.

- **LLM API keys** — add Anthropic (Claude) or Google (Gemini) credentials and see per-model pricing
- **Data providers** — connect New Relic, Google Cloud, or other providers with connectivity tests
- **Agent tuning** — set thinking budgets, step limits, and timezone for analysis
- **Agent memory** — view, edit, and optimize learned patterns the AI saves across investigations

![Settings page](docs/screenshots/settings_page.png)

## Supported Providers

**Data:** New Relic (NRQL via NerdGraph), Google Cloud (Logs, Traces, Metrics, Errors)

**LLM:** Anthropic (Claude), Google (Gemini)

## Uninstall

```bash
npm uninstall -g oko-sh
```

To also remove your local database (settings, sessions, API keys):

```bash
rm -rf ~/.oko
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `better-sqlite3` build fails | macOS: `xcode-select --install` / Linux: `sudo apt install build-essential python3` |
| Port in use | `OKO_PORT=3580 oko-sh` |
| No LLM responses | Add an API key in Settings |

## License

[PolyForm Shield 1.0.0](https://polyformproject.org/licenses/shield/1.0.0/) — free to use, except to build competing products.
