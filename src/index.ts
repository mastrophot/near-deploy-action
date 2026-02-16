import * as core from '@actions/core';
import { connect, KeyPair, keyStores } from 'near-api-js';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
  try {
    const accountId = core.getInput('account_id');
    const privateKey = core.getInput('private_key');
    const contractPath = core.getInput('contract_path');
    const network = core.getInput('network') || 'testnet';

    core.info(`Deploying ${contractPath} to ${accountId} on ${network}...`);

    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(privateKey as any);
    await keyStore.setKey(network, accountId, keyPair);

    const config = {
      networkId: network,
      keyStore,
      nodeUrl: `https://rpc.${network}.near.org`,
      walletUrl: `https://wallet.${network}.near.org`,
      helperUrl: `https://helper.${network}.near.org`,
      explorerUrl: `https://explorer.${network}.near.org`,
    };

    const near = await connect(config);
    const account = await near.account(accountId);
    
    const wasmCode = fs.readFileSync(path.resolve(contractPath));
    const result = await account.deployContract(wasmCode);

    core.info(`Successfully deployed! Transaction Hash: ${result.transaction_outcome.id}`);
    core.setOutput('transaction_hash', result.transaction_outcome.id);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
