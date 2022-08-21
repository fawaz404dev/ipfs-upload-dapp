# IPFS file upload (D)app
Uploads file to IPFS and stores corresponding hash on Ethereum without requiring user to spend gas.

## Architecture
![Diagram](./img/diagram.jpg)
## Getting started


### Development
1. Start local blockchain network: `ganache-cli --deterministic`
2. Create contract instance: `oz create`
3. Don't forget to initialize GSNRecipient contract: `oz send-tx`, `initalize()`
4. Run front ent locally: `npm run start`
5. Access at `http://localhost:3000/`

## Resources
Based on this [tutorial](https://www.freecodecamp.org/news/hands-on-get-started-with-infura-and-ipfs-on-ethereum-b63635142af0/)
with the following improvements/changes:
- Add tests
- **Use [Gas Station Network](https://gsn.openzeppelin.com/) to turn dapp into app**
- Use Rimble UI for front end styling

### Tech stack
- [Openzeppelin GSN Starter Kit](https://docs.openzeppelin.com/starter-kits/2.3/gsnkit)
- [React](https://reactjs.org/)
- [Rimble UI](https://rimble.consensys.design/)
- [Infura](https://infura.io/): Ethereum|IPFS API & Gateway
- [web3.js](https://github.com/ethereum/web3.js/): Ethereum JavaScript API
- [Ganache](https://github.com/trufflesuite/ganache): Personal blockchain for Ethereum development
