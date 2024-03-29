class MerkleTree {

  constructor(leaves, hashFunction) {
    this.hashFunction = hashFunction;
    this.leaves = this.hashLeaves(leaves);
    this.tree = [this.leaves];
    this.createTree(this.leaves);
  }

  getTree() {
    return this.tree;
  }

  getRootHash() {
    return this.tree[this.tree.length - 1][0];
  }

  hashLeaves(leaves) {
    return leaves.map(leaf => this.hashFunction(leaf))
  }

  getIndex(leaf) {
    const hashedLeaf = this.hashFunction(leaf);
    const index = this.leaves.indexOf(hashedLeaf);

    if (index === -1) throw new Error("leaf not found");
    return index
  }

  getProof(leaf) {
    return this.tree.slice(0, this.tree.length - 1).reduce(({index, proof}, layer) => {
      const isRightNode = index % 2 !== 0;
      proof.push(isRightNode ? layer[index - 1] : layer[index + 1] || layer[index]);
      return {index: (index / 2) | 0, proof: proof}
    }, {index: this.getIndex(leaf), proof: []}).proof;
  }

  createTree(leaves) {
    const items = [];
    for (var i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1] || left;
      items.push(this.hashFunction(left + right));
    }

    if (leaves.length !== 1) {
      this.tree.push(items);
      this.createTree(items);
    }
  }
}

module.exports = MerkleTree;
