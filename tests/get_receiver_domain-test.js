const chai = require ( 'chai' );
const rewire = require ( 'rewire' );
const CheckHeaders = rewire ( '../index.js' );

const expect = chai.expect;

describe ( 'Retrieve Domain', () => {
    const get_receiver_domain = CheckHeaders.__get__ ( 'get_receiver_domain' );
    let envelope_ds;


    beforeEach ( ()  => {
        envelope_ds = {
            headers : {
                getFirst () {
                    if ( arguments [ 0 ] === 'from' ) {
                        return 'random-email@example.org>';
                    }
                }
            }
        };
    } );


    it( 'Should return example.org', () => {
        const domain = get_receiver_domain ( {}, envelope_ds, {}, {} );
        expect ( domain ) .to.eql ( 'example.org' );
    } );
} );
