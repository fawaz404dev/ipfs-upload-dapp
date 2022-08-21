import IPFS from 'ipfs-http-client';

export default new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});
