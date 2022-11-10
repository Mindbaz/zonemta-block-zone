const chai = require ( 'chai' );
const rewire = require ( 'rewire' );
const BlockZone = rewire ( '../index.js' );

const expect = chai.expect;


describe ( 'Should retrieve blocked domains', () => {
    const retrieve_block_domains = BlockZone.__get__ ( 'retrieve_blocked_domains' );
    const zones = {
        'random-zone1': {
            recipientDomains: [ 'rand1-domain1', 'rand1-domain2' ]
        },
        'random-zone2': {
            recipientDomains: [ 'rand1-domain2', 'rand2-domain2' ]
        },
        'random-zone3': {
            recipientDomains: [ 'rand1-domain3', 'rand2-domain3' ],
            pool: 'default'
        }
    }
    BlockZone.__set__ ( 'zones', zones );

    it ( 'Should return an error object' , () => {
        const app_mock = {
            config: {
                zone_block: [ 'random-zone1', 'random-zone2' ]
            }
        }

        const blocked_domains = retrieve_block_domains ( app_mock, {}, {}, {} )
        expect ( blocked_domains.length ).to.eql ( 4 );
        expect ( blocked_domains [0] ).to.eql ( 'rand1-domain1' );
    } );
} );
