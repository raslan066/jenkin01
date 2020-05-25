const app = require('../../src/calculator/calculator.js')
const assert = require('assert')

describe('Test Suite For Calculator',() =>{

    describe('Addiditon Testing',()=>{

        it('1+2 = 3', ()=> {
            assert.equal(app().sum(1,2),3)
        })
        it('2+2 = 4', ()=> {
            assert.equal(app().sum(2,2),4)
        })
        it('3+2 = 5', ()=> {
            assert.equal(app().sum(3,2),5)
        })
        it('3+2 = 5', ()=> {
            assert.equal(app().sum('a','b'),'ab')
        })
    })
})
