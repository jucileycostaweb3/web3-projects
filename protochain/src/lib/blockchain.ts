import Block from "./block";

/**
 * Blockchain class
 */
export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;

    /**
     * Creates a new blockchain
     */
    constructor() {
        this.blocks = [new Block(this.nextIndex++, "", "Genesis Block")];
        this.nextIndex++;
    }

    /**
     * Taking the last block
     * @returns Returns the last block
     */
    getLastBlock() : Block {
        return this.blocks[this.blocks.length - 1];
    }

    /**
     * Adds a block to the chain
     * @param block The block to be added
     * @returns Return true if the block was added
     */
    addBlock(block: Block) : boolean {
        const lastBlock = this.getLastBlock();

        if(!block.isValid(lastBlock.hash, lastBlock.index)) return false;

        this.blocks.push(block);
        this.nextIndex++;

        return true;
    }

    isValid(): boolean {
        for (let i = this.blocks.length -1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const isValid = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!isValid) return false;            
        }
        return true;
    }
}