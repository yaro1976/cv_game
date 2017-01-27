/* global Gameboard, chai */
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
                describe('Test if points are in the same zone', function () {
                    describe('Vertical alignement', function () {
                        describe('Test if the first element is outside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testVerticalZone(10, 70, 50, 50)).to.equal(false);
                            });
                        });
                        describe('Test if the second element is outside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testVerticalZone(70, 10, 50, 50)).to.equal(false);
                            });
                        });
                        describe('Test if the first element is inside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testVerticalZone(10, 50, 50, 50)).to.equal(true);
                            });
                        });
                        describe('Test if the second element is inside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testVerticalZone(50, 10, 50, 50)).to.equal(true);
                            });
                        });
                    });
                    describe('horizontal alignement', function () {
                        describe('Test if the first element is outside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testHorizontalZone(10, 70, 50, 50)).to.equal(false);
                            });
                        });
                        describe('Test if the second element is outside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testHorizontalZone(70, 10, 50, 50)).to.equal(false);
                            });
                        });
                        describe('Test if the first element is inside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testHorizontalZone(10, 50, 50, 50)).to.equal(true);
                            });
                        });
                        describe('Test if the second element is inside the zone', function () {
                            it('Should return be outside', function () {
                                var gameboard = new Gameboard();
                                expect(gameboard.testHorizontalZone(50, 10, 50, 50)).to.equal(true);
                            });
                        });
                    });
                });
            });

            describe('Move not available', function () {
                describe('Check the element and its drawing context', function () {
                    describe('Move to border right of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 340, 15, 50, 50);
                            expect(gameboard.checkMove('vaisseau', "right")).to.equal(false);
                        });
                    });
                    describe('Move to border left of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 0, 15, 50, 50);
                            expect(gameboard.checkMove('vaisseau', "left")).to.equal(false);
                        });
                    });
                    describe('Move to border top of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 15, 0, 50, 50);
                            expect(gameboard.checkMove('vaisseau', "up")).to.equal(false);
                        });
                    });
                    describe('Move to border bottom of canvas', function () {
                        it('should refused the move', function () {
                            var gameboard = new Gameboard();
                            gameboard.addElement('vaisseau', 15, 640, 50, 50);
                            expect(gameboard.checkMove('vaisseau', "down")).to.equal(false);
                        });
                    });
                });

                describe('Check of the element with other elements', function () {
                    describe('No elements arround', function () {
                        describe('Move to bottom', function () {
                            it('should authorize the move', function () {
                                var gameboard = new Gameboard();
                                gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                gameboard.addElement('vaisseau2', 80, 85, 50, 50);
                                expect(gameboard.checkMove('vaisseau', "down")).to.equal(true);
                            });

                        });
                        describe('Move to top', function () {
                            it('should authorize the move', function () {
                                var gameboard = new Gameboard();
                                gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                gameboard.addElement('vaisseau2', 80, 85, 50, 50);
                                expect(gameboard.checkMove('vaisseau', "up")).to.equal(true);
                            });
                        });
                        describe('Move to left', function () {
                            it('should authorize the move', function () {
                                it('should authorize the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 80, 85, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "left")).to.equal(true);
                                });
                            });
                        });
                        describe('Move to right', function () {
                            it('should authorize the move', function () {
                                var gameboard = new Gameboard();
                                gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                gameboard.addElement('vaisseau2', 80, 85, 50, 50);
                                expect(gameboard.checkMove('vaisseau', "right")).to.equal(true);
                            });
                        });
                    });
                    describe('Element present arround', function () {
                        describe('Elements present to left', function () {
                            describe('Element strict one side to side', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 61, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 10, 15, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "left")).to.equal(false);
                                });
                            });
                            describe('Element not strictly one upside the other', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 61, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 10, 45, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "left")).to.equal(false);
                                });
                            });
                        });
                        describe('Elements present to right', function () {
                            describe('Element strict one side to side', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 61, 15, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "right")).to.equal(false);
                                });
                            });
                            describe('Element not strictly one upside the other', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 61, 45, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "right")).to.equal(false);
                                });
                            });
                        });
                        describe('Elements present to top', function () {
                            describe('Element strict one upside the other', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 10, 64, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "up")).to.equal(false);
                                });
                            });
                            describe('Element not strictly one upside the other', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 15, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 10, 64, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "up")).to.equal(false);
                                });
                            });
                        });
                        describe('Elements present to bottom', function () {
                            describe('Element strict one upside the other', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 10, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 10, 64, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "down")).to.equal(false);
                                });
                            });
                            describe('Element not strictly one upside the other', function () {
                                it('should refused the move', function () {
                                    var gameboard = new Gameboard();
                                    gameboard.addElement('vaisseau', 15, 15, 50, 50);
                                    gameboard.addElement('vaisseau2', 10, 64, 50, 50);
                                    expect(gameboard.checkMove('vaisseau', "down")).to.equal(false);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    describe('#Score', function () {
        describe('Score increment', function () {
            it('Should increment the score', function () {
                var gameboard = new Gameboard();
                expect(gameboard.incScore()).to.equal(1);
            });
            it('Should expect score after 5 to equal 6', function () {
                var gameboard = new Gameboard();
                gameboard.score = 5;
                expect(gameboard.incScore()).to.equal(6);
            });
        });
        describe('Testing end of the party', function () {
            it('Should detect the end of the party', function () {
                var gameboard = new Gameboard();
                gameboard.score = gameboard.maxScore - 1;
                expect(gameboard.incScore()).to.equal(-1);
            });
        });
    });
    describe('Fill the gameboard', function () {
       it('Should store the element');
    });
});