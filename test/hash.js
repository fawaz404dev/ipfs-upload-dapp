const {
  BN,
  constants,
  expectEvent,
  shouldFail
} = require('openzeppelin-test-helpers')
const should = require('chai').should()

const Hash = artifacts.require('Hash')

contract('hash', async ([_, ...otherAccounts]) => {
  let hash

  beforeEach(async function () {
    hash = await Hash.new()
    hash.initialize()
  })

  it('should have proper default value', async () => {
    const ipfsHash = await hash.ipfsHash.call()
    ipfsHash.should.equal('')
  })

  it('should update ipfsHash value', async () => {
    const testString = 'test'
    await hash.setHash(testString);
    (await hash.ipfsHash()).should.equal(testString)
  })
})
