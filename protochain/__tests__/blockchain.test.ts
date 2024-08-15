import { describe, test, expect } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

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
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "Block Two"));
        expect(blockchain.isValid().success).toBeTruthy();
    })

    test('Should NOT be valid', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "Block Two"));
        blockchain.blocks[1].data = "change data";
        expect(blockchain.isValid().success).toBeFalsy();
    })

    test('Should add block', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "Block Two"));
        expect(result.success).toBeTruthy();
    })

    test('Should NOT add block', () => {
        const blockchain = new Blockchain();
        const block = new Block(-1, blockchain.blocks[0].hash, "Block Two");
        const result = blockchain.addBlock(block);
        expect(result.success).toBeFalsy();
    })
})