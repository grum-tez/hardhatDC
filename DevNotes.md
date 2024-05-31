31 May

Local Dev workflow works now.

Understand that there are different instances of the hardhat runtime environment (hre).

One runs only in memory, this enables tests. When you run npx hardhat test, hardhat spins up an in memory instance of the hre, uses it to run your tests, and then shuts it down.

Another runs locally with node, and has permeneance until you close it. This is what you get if you run npx hardhat node.

When you deploy in local development, you need to specify that you are deploying to the local network, just as you would if you were deploying to the testnet or mainnet.

Having the local node running allows you to connect metamask and have a "normal" webapp dev environment so you can develop the front end as well.

You need to connect metamask to your local development instance of the hardhat node. You can add a network with the metamask chrome extension or whatever you are using.

If you reset your hardhat node while you are developing,  metamask can get confused. It seems to cache the expected block number and nonce info, and if you restart your local node, this will no longer match. The metamask docs say you need to reset metamask to fix this (this means removing and reinstalling the chrome extension). I have found you can fix it simply by changing to a different chain for a moment. However, it is best to just avoid this whole issues by not restarting your node. Instead, you can use the yarn local:redploy script, which clears the contents of the local chain deployments folder, and then redeploys your contract with a new address. The new address is updated on your frontend by another script. This lets you start fresh with an updated version of the contract, without the need to change accounts or anything else.

This is the local dev workflow that I have found works for me, so far.


