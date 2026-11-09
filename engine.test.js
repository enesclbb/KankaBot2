import test from 'node:test';import assert from 'node:assert/strict';import {scorePair,createState,tick,equity} from './engine.js';
const pair={baseToken:{address:'abc',symbol:'TEST'},priceUsd:'1',liquidity:{usd:100000},volume:{m5:10000},txns:{m5:{buys:100,sells:20}},priceChange:{m5:5},pairCreatedAt:Date.now()-3600000};
test('scanner rejects low liquidity',()=>{const s=scorePair({...pair,liquidity:{usd:100}});assert.equal(s.eligible,false)});
test('paper trade opens, closes at take profit',()=>{const s=createState();s.running=true;const c=scorePair(pair);assert.equal(c.eligible,true);tick(s,[c]);assert.equal(s.positions.length,1);tick(s,[{...c,price:1.2}]);assert.equal(s.positions.length,0);assert.ok(equity(s)>1000)});
test('bot stopped does not open positions',()=>{const s=createState();tick(s,[scorePair(pair)]);assert.equal(s.positions.length,0)});
