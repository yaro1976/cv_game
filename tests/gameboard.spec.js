'use strict';
var expect = chai.expect;

describe('#Gameboard', function () {
    describe('Gameboard creation', function () {
        it('should initialize a gameboard', function () {
            var gameboard = new Gameboard();
            expect(gameboard).to.have.property('tabElement');
        });
    });
    describe('#Element Creation', function () {
        var gameboard = new Gameboard();
        beforeEach(function () {
            // var gameboard = new Gameboard();
            // gameboard.addElement('vaisseau', 10, 15, 50, 50);
        });
        describe('add element to game', function () {
            it('should add an element on gameboard', function () {
                var gameboard = new Gameboard();
                gameboard.addElement('vaisseau', 10, 15, 50, 50);
                expect(gameboard.tabElement[0].x).to.equal(10);
            });
        });
        it('should retreive the X position', function () {
            var gameboard = new Gameboard();
            gameboard.addElement('vaisseau', 10, 15, 50, 50);
            expect(gameboard.getX("vaisseau")).to.equal(10);
        });
        it('should retreive the Y position', function () {
            var gameboard = new Gameboard();
            gameboard.addElement('vaisseau', 10, 15, 50, 50);
            expect(gameboard.getY("vaisseau")).to.equal(15);
        });

    });

    describe('#Move action', function () {
        describe('Position of the element', function () {
            it('should return the position of an element', function () {
                var gameboard = new Gameboard();
                gameboard.addElement('vaisseau', 10, 15, 50, 50);
                expect(gameboard.getX("vaisseau")).to.equal(10);
            });
            describe('Change the position', function () {
                it('should set the new X position', function () {
                    var gameboard = new Gameboard();
                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                    gameboard.setX("vaisseau", 9);
                    expect(gameboard.getX("vaisseau")).to.equal(9);
                });
                it('should set the new Y position', function () {
                    var gameboard = new Gameboard();
                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                    gameboard.setY("vaisseau", 14);
                    expect(gameboard.getY("vaisseau")).to.equal(14);
                });
            });
            describe('Move the point', function () {
                it('Should change the X position', function () {
                    var gameboard = new Gameboard();
                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                    expect(gameboard.moveX('vaisseau')).to.equal(9);
                });
                it('Should change the Y position', function () {
                    var gameboard = new Gameboard();
                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                    expect(gameboard.moveY('vaisseau')).to.equal(14);
                });
            });

            describe('Move not available', function () {
                describe('Check the element and its drawing context', function () {
                    describe('Move to border right of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 340, 15, 50, 50);
                            expect(gameboard.checkMoveX('vaisseau', "right")).to.equal(false);
                        });
                    });
                    describe('Move to border left of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 0, 15, 50, 50);
                            expect(gameboard.checkMoveX('vaisseau', "left")).to.equal(false);
                        });
                    });
                    describe('Move to border top of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 15, 0, 50, 50);
                            expect(gameboard.checkMoveX('vaisseau', "top")).to.equal(false);
                        });
                    });
                    describe('Move to border bottom of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 15, 640, 50, 50);
                            expect(gameboard.checkMoveX('vaisseau', "bottom")).to.equal(false);
                        });
                    });
                });

                describe('Check of the element with other elements', function () {
                    describe('No elements arround', function () {
                        it('should authorize the move');
                    });
                    describe('Elements present to left', function () {
                        it('should refused the move');
                    });
                    describe('Elements present to right', function () {
                        it('should refused the move');
                    });
                    describe('Elements present to top', function () {
                        it('should refused the move');
                    });
                    describe('Elements present to bottom', function () {
                        it('should refused the move');
                    });


                });




            });


        });

    });
});
