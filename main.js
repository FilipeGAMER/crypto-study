"use strict"

const crypto = require('crypto')

//create a JavaScript class to represent a Block
class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash() {
        return crypto.createHash('sha256').update(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).digest('hex');
    }
}


class Blockchain {
    constructor() {
        this.blockchain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "30/05/2022", "first block on the chain", "0");
    }

    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        this.blockchain.push(newBlock);
    }

    // testing the integrity of the chain
    validateChainIntegrity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i - 1];
            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            return true;

        }
    }
}

let bazzucaCoin = new Blockchain();
console.log("Mining bazzucaCoin in progress...");

bazzucaCoin.addNewBlock(
    new Block(1, "31/05/2022", {
        sender: "FromFi",
        recipient: "TestFi",
        quantity: 14
    })
)

bazzucaCoin.addNewBlock(
    new Block(1, "01/06/2022", {
        sender: "FromFi 1",
        recipient: "TestFi 1",
        quantity: 25
    })
)

bazzucaCoin.addNewBlock(
    new Block(1, "02/06/2022", {
        sender: "FromFi 2",
        recipient: "TestFi 2",
        quantity: 18
    })
)


console.log(JSON.stringify(bazzucaCoin, null, 5))