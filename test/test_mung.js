const truffleAssert = require('truffle-assertions');
const Mung = artifacts.require('Mung');

contract('mung', accounts => {
    before(async () => {
        this.instance = await Mung.deployed();
    });

    it('should be initialized with correct value', async () => {
        const text = await this.instance.text();
        assert.equal(text, "Hello mung", "Wrong initialized value!");
    });

    it('should change the text', async () => {
        const changedText = 'hoho';
        await this.instance.setText(changedText, { from: accounts[0] });
    });
    it('should throw exception', async () => {
        await truffleAssert.reverts(
            this.instance.errorOccur(1, { from: accounts[0] }),
            "Hello World Error"
        );
    });
    it('should not throw exception', async () => {
        const rst = await this.instance.errorOccur(0, { from: accounts[0] });
        assert.equal(rst.words[0], 0, "ErrorOccur event not emitted!");
    });
});