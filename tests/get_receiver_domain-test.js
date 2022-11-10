const chai = require ( 'chai' );
const rewire = require ( 'rewire' );
const Block_zone = rewire ( '../index.js' );

const expect = chai.expect;

describe ( 'Retrieve Domain', () => {
    const get_receiver_domain = Block_zone.__get__ ( 'get_receiver_domain' );

    it( 'Should return example.org', () => {
        const domain = get_receiver_domain ( {}, { address: "random@example.org>" }, {}, {} );
        expect ( domain ) .to.eql ( 'example.org' );
    } );
} );
