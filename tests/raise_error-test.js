const chai = require ( 'chai' );
const rewire = require ( 'rewire' );
const BlockZone = rewire ( '../index.js' );

const expect = chai.expect;


describe ( 'Return error', () => {
    const raise_error = BlockZone.__get__ ( 'raise_error' );

    it ( 'Should return an error object' , () => {
        const err = raise_error ( {}, {}, {}, {}, 'test-error' );
        expect ( err.message ) .to.equal ( 'test-error' );
        expect ( err.responseCode ) .to.equal ( 550 );
        expect ( err ) .to.be.instanceof ( Error );
    } );
} );
