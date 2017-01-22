var expect = chai.expect;

var vaisseau;
beforeEach(function () {
    vaisseau = spaceEngine("monElement", 2, 3, 15, 50);
});

describe('#SpaceGenerator', function () {
    // var vaisseau;
    // beforeEach(function(){
    //     vaisseau = spaceEngine("monElement", 2, 3, 15, 50);
    // });
    describe('#Creation of a new item', function () {
        it('Should create a space element', function () {
            // var vaisseau = spaceEngine("monElement", 2, 3, 15, 50);
            expect(vaisseau.name).to.equal("monElement");
        });
        it('Should be add to the list of the element', function (){
            vaisseau.addElement();
            expect(vaisseau.tabElement["monElement"]).to.exist;
        });
        it('should retreive the X position', function() {
             vaisseau.addElement();
             expect(vaisseau.tabElement["monElement"].x).to.equal(2);
        });
        it('should retreive the Y position', function() {
             vaisseau.addElement();
             expect(vaisseau.tabElement["monElement"].y).to.equal(3);
        });
        it('should retreive the height', function() {
             vaisseau.addElement();
             expect(vaisseau.tabElement["monElement"].h).to.equal(50);
        });
        it('should retreive the width', function() {
             vaisseau.addElement();
             expect(vaisseau.tabElement["monElement"].w).to.equal(15);
        });
    });


    it('Should change the X position', function () {
        vaisseau.moveX(-1)
        expect(vaisseau.posX).to.equal(1);
    });
    it('Should change the Y position', function () {
        vaisseau.moveY(-1)
        expect(vaisseau.posY).to.equal(2);
    });
    xit('Should set an image', function () {
        vaisseau.setImage('dist/img/ship.png');
        expect(vaisseau.img.src).to.equal('dist/img/ship.png');
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
    describe('#Check move', function () {
        it('Should get position of other element');
        it('Should check if move is Ok');
    });

});
