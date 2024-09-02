import axios from 'axios';

const BLOCKCHAIN_SERVER = 'http://localhost:3000/';

async function mine() {
    console.log("Getting next block info...");
    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
    console.log(data);
}

mine();