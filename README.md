# LANDEx AI — Paper Trading Prototype

Local-first Solana candidate scanner, preliminary analyst, simulated auto-trader and iPhone-friendly web dashboard. **No wallet keys, Phantom authorization or real transactions.** This is an experimental prototype, not a profitable strategy.

## Run (Node.js 20+)

```bash
npm test
npm start
```

Open http://127.0.0.1:3030 on the computer running the server. Click **Başlat** to enable paper trades. The scanner fetches DexScreener feeds on startup and every 60 seconds; results depend on API availability. Data is persisted to `state.json`. Stop with Ctrl+C.

### Access from iPhone on same Wi-Fi

Start with `HOST=0.0.0.0 npm start` (macOS/Linux) or `$env:HOST="0.0.0.0"; npm start` (PowerShell). Find your computer's local IP and open `http://COMPUTER_IP:3030` on the iPhone. **Only use a trusted private Wi-Fi network.** There is no authentication or HTTPS; do not expose this server to the public internet or port-forward it. The phone does not run the trading service; the computer must stay on. A future deployment needs auth, HTTPS and a server.

## Components

- `scanner.js`: DexScreener latest profiles, boosts, and token pairs; this is not a comprehensive new-pool feed.
- `engine.js`: scoring, preliminary risk filters, simulated buys/sells, per-day trade count/loss gates, fees and slippage assumptions.
- `server.js`: local HTTP API, one-minute scans, persistence.
- `index.html`: mobile-friendly dashboard.
- `engine.test.js`: deterministic tests without network.

## Important limitations

1. **No independent security verification** of mint/freeze authorities, holder concentration, liquidity locks, rug-pull behavior or actual sellability. The scoring module is a preliminary filter, **not** a completed AI Analyst or safety audit.
2. No OpenAI model is called. The word AI in the product name is aspirational; decisions are deterministic rules.
3. Prices update only for tokens that reappear in discovery feeds. Missing prices may remain stale, meaning simulated stops might not fire. This can materially distort paper results. Before interpreting results, add continuous quote refresh for all held positions and timestamp freshness checks.
4. Paper fills use observed quoted prices and fixed fee/slippage assumptions. They do not simulate depth, failed swaps, priority fees, MEV, spread or latency. Performance is **not** evidence of real trading profitability.
5. No production security, authentication, Phantom integration, or real execution. Never enter a seed phrase into this prototype.
6. The daily loss gate checks realized losses and is not a hard guarantee against further losses or gaps.

## Suggested next steps

Add reliable new-pool discovery, independent Solana RPC safety checks, fresh position pricing, quote-based paper fills, historical replay and audit logs. Only then evaluate long-running paper performance. Keep real trading disabled until the system passes security review.
