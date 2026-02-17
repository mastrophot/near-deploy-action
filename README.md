# NEAR Contract Deploy Action

Automate your NEAR Protocol smart contract deployments with this GitHub Action.

## Features

- **Simple Configuration:** Deploy to mainnet or testnet with minimal setup.
- **Secure:** Uses GitHub Secrets for private keys.
- **Flexible:** Supports custom graduation/initialization arguments.
- **Fast:** Optimized for quick deployment cycles.

## Usage

Add this to your `.github/workflows/deploy.yml`:

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: mastrophot/near-deploy-action@main
    with:
      account-id: "your-account.near"
      private-key: ${{ secrets.NEAR_PRIVATE_KEY }}
      contract-path: "./build/contract.wasm"
      network: "mainnet"
```

## Inputs

- `account-id`: The NEAR account to deploy to.
- `private-key`: The private key for the account.
- `contract-path`: Path to the `.wasm` file.
- `network`: `mainnet` or `testnet` (default: `testnet`).

## License

MIT
