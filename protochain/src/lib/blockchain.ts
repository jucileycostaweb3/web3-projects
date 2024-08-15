import Block from "./block";
import Validation from './validation';

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
     * @returns Return if the block was added
     */
    addBlock(block: Block) : Validation {
        const lastBlock = this.getLastBlock();

        const validation = block.isValid(lastBlock.hash, lastBlock.index);
        if (!validation.success)
            return new Validation(false, `Invalid block: ${validation.message}`);

        this.blocks.push(block);
        this.nextIndex++;

        return new Validation(true, block.hash);
    }

    /**
     * Checks if the blockchain is valid
     * @returns Returns if blockchain is valid
     */
    isValid(): Validation {
        for (let i = this.blocks.length -1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if (!validation.success)
                return new Validation(false, `Invalid block #${currentBlock.index}: ${validation.message}`);          
        }
        return new Validation();
    }
}