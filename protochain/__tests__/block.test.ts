import { describe, test, expect, beforeAll } from '@jest/globals';
import Block from '../src/lib/block';

describe("Block tests", () => {

    let genesis: Block;

    beforeAll(() => {
        genesis = new Block(0, "abc", "Genesis Block");
    })
    test('Should be valid', () => {
        const block = new Block(1, genesis.hash, "block previous");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeTruthy();
    })

    test('Should NOT be valid (previous hash)', () => {
        const block = new Block(1, "", "block previous");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (timestamp)', () => {
        const block = new Block(1, genesis.hash, "block previous");
        block.timestamp = -1;
        block.hash = block.createHash();
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (hash)', () => {
        const block = new Block(1, genesis.hash, "block previous");
        block.hash = "";
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (data)', () => {
        const block = new Block(1, genesis.hash, "");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (index)', () => {
        const block = new Block(-1, genesis.hash, "block previous");
        const valid = block.isValid(genesis.hash, genesis.index);
        expect(valid.success).toBeFalsy();
    })
})