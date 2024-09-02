import { describe, test, expect, jest } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

jest.mock('../src/lib/block');

describe("Blockchain tests", () => {
    test('Should has genesis blocks', () => {
        const blockchain = new Blockchain();
        expect(blockchain.blocks.length).toEqual(1);
    })

    test('Should be valid (genesis)', () => {
        const blockchain = new Blockchain();
        expect(blockchain.isValid().success).toBeTruthy();
    })

    test('Should be valid (two blocks)', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index: 1, 
            previousHash: blockchain.blocks[0].hash,
            data: "Block Two"
        } as Block));
        expect(blockchain.isValid().success).toBeTruthy();
    })

    test('Should NOT be valid', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index: 1, 
            previousHash: blockchain.blocks[0].hash,
            data: "Block Two"
        } as Block));
        
        blockchain.blocks[1].index = -1;
        
        expect(blockchain.isValid().success).toBeFalsy();
    })

    test('Should add block', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: 1, 
            previousHash: blockchain.blocks[0].hash,
            data: "Block Two"
        } as Block));
        expect(result.success).toBeTruthy();
    })

    test('Should NOT add block', () => {
        const blockchain = new Blockchain();
        const block = new Block({
            index: -1, 
            previousHash: blockchain.blocks[0].hash,
            data: "Block Two"
        } as Block);
        const result = blockchain.addBlock(block);
        expect(result.success).toBeFalsy();
    })

    test('Should get block', () => {
        const blockchain = new Blockchain();
        const block = blockchain.getBlock(blockchain.blocks[0].hash);
        expect(block).toBeTruthy();
    })

    test('Should get next block info', () => {
        const blockchain = new Blockchain();
        const info = blockchain.getNextBlock();
        expect(info.index).toEqual(1);
    })
})