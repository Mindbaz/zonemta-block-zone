const chai = require ( 'chai' );
const rewire = require ( 'rewire' );
const BlockZone = rewire ( '../index.js' );

const expect = chai.expect;

describe ( 'Compare receiver domain with blocked domain', () => {
    const is_receiver_domain_blocked = BlockZone.__get__ ( 'is_receiver_domain_blocked' );


    it ( 'Should return false', () => {
        const isUserDomainBlocked = is_receiver_domain_blocked ( {}, {}, {}, {}, "rand3-domain1", [ 'rand2-domain1' ] );
        expect ( isUserDomainBlocked ).to.false;
    });

    it ( 'Should return false', () => {
        const isUserDomainBlocked = is_receiver_domain_blocked ( {}, {}, {}, {}, "rand2-domain1", [ 'rand2-domain1' ] );
        expect ( isUserDomainBlocked ).to.true;
    })
} )