const chai = require ( 'chai' );
const rewire = require ( 'rewire' );
const BlockZone = rewire ( '../index.js' );
const sinon = require ( 'sinon' );

const expect = chai.expect;


describe ( 'Test module init', () => {
    let app_mock;
    let done_mock = sinon.stub ().returns ();
    let next_mock = sinon.stub ().returns ();
    let raise_error_mock = sinon.stub ().returns ();


    beforeEach ( ()  => {
        app_mock = {
            addHook ( type, cb ) {
                cb ( {}, {}, next_mock );
            },
            config: {
                zone_block: {
                    'random': {
                        recipientsDomains : ['rand']
                    }
                }
            }
        };
    } );


    afterEach ( sinon.reset );


    it ( 'should raise error', () => {
        BlockZone.__set__ ( 'retrieve_blocked_domains', sinon.stub ().returns ( ) );
        BlockZone.__set__ ( 'raise_error', raise_error_mock );
        BlockZone.__set__ ( 'get_receiver_domain', sinon.stub ().returns ( 'domain' ) );
        BlockZone.__set__ ( 'is_receiver_domain_blocked', sinon.stub ().returns ( true ) );


        BlockZone.init ( app_mock, done_mock );
        expect ( next_mock.calledOnce ).to.true;
        expect ( done_mock.calledOnce ).to.true;
        expect ( raise_error_mock.getCalls () [ 0 ].lastArg ).to.equal ( 'The mail service provider (domain) you are trying to reach has been temporarily disabled' )
    } );


    it ( 'should not raise error', () => {
        BlockZone.__set__ ( 'retrieve_blocked_domains', sinon.stub ().returns ( ) );
        BlockZone.__set__ ( 'raise_error', raise_error_mock );
        BlockZone.__set__ ( 'get_receiver_domain', sinon.stub ().returns ( 'domain' ) );
        BlockZone.__set__ ( 'is_receiver_domain_blocked', sinon.stub ().returns ( false ) );


        BlockZone.init ( app_mock, done_mock );
        expect ( next_mock.calledOnce ).to.true;
        expect ( done_mock.calledOnce ).to.true;
        expect ( raise_error_mock.notCalled ).to.true;
    } );
} );
