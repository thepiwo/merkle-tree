# merkle-tree

### example usage

```
const crypto = require('crypto')
const MerkleTree = require('./merkleTree');

const leaves = ['first', 'second']
const hashFunction = (input) => crypto.createHash('sha256').update(input).digest('hex')

const tree = new MerkleTree(leaves, hashFunction)
console.log('tree', tree.getTree())
console.log('root hash', tree.getRootHash())
```
