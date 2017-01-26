var expect = chai.expect;

var vaisseau;
beforeEach(function () {
    vaisseau = spaceEngine("monElement",  15, 50);
});

describe('#SpaceGenerator', function () {
    // var vaisseau;
    // beforeEach(function(){
    //     vaisseau = spaceEngine("monElement", 2, 3, 15, 50);
    // });
    describe('#Creation of a new item', function () {
        it('Should create a space element', function () {
            expect(vaisseau.name).to.equal("monElement");
        });
        it('should retreive the height', function() {
             expect(vaisseau.height).to.equal(50);
        });
        it('should retreive the width', function() {
             expect(vaisseau.width).to.equal(15);
        });
    });
    it('Should set an image', function () {
        vaisseau.setImage('dist/img/ship.png');
        expect(vaisseau.img.src).to.have.string('dist/img/ship.png');
    });
    describe('#Decrement Life', function () {
        it('Should decrement life', function () {
            vaisseau.decrementLife();
            expect(vaisseau.life).to.equal(99);
        });
        it('Should be death', function () {
            vaisseau.life = 1;
            vaisseau.decrementLife();
            expect(vaisseau.life).to.equal(0);
            expect(vaisseau.dead).to.equal(true);
        });
    });
});
