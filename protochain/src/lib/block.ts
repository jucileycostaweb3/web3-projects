import sha256 from 'crypto-js/sha256';
import Validation from './validation';

/**
 * Block class
 */
export default class Block {
    index: number;
    timestamp: number;
    hash: string;
    previousHash: string;
    data: string;  
    
    /**
     * Creates a new block
     * @param block Block containing index, previousHash and data 
     */
    constructor(block?: Block) {
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data = block?.data || "";
        this.hash = block?.hash || this.createHash();
    }

    /**
     * Generates the block hash
     * @returns Returns the block hash
     */
    createHash() : string {
        return sha256(this.index + this.data + this.timestamp + this.previousHash).toString();
    }

    /**
     * Checks if the block is valid
     * @param previousHash The previous block hash
     * @param previousIndex The previous block index
     * @returns Returns if the block is valid
     */
    isValid(previousHash: string, previousIndex: number) : Validation {
        if(previousIndex !== this.index -1) return new Validation(false, "Invalid index.");
        if(this.hash !== this.createHash()) return new Validation(false, "Invalid hash.");
        if(!this.data) return new Validation(false, "Invalid data.");
        if(this.previousHash !== previousHash) return new Validation(false, "Invalid previous hash.");
        if(this.timestamp < 1) return new Validation(false, "Invalid timestamp.");

        return new Validation();
    }
}