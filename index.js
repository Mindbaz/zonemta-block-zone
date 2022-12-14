/**
 * @module Block_Msp
 */
module.exports.title = 'Block msp';


/**
 * Build and return error with message
 * 
 * @param {*} app 
 * @param {*} envelope 
 * @param {*} messageInfo 
 * @param {prototype} next 
 * @param {string} err 
 * 
 * @returns {ErrorConstructor}
 */
const raise_error = ( app, address, session, next, msg ) => {
    /**
     * Contruct Error object
     * @type {ErrorConstructor}
     */
    let err = new Error ( msg );
    err.responseCode = 550;
    return err;
}


/**
 * Retrieve current rcpt_to domain
 * 
 * @param {*} app 
 * @param {*} envelope 
 * @param {*} messageInfo 
 * @param {prototype} next 
 * 
 * @returns {string} domain
 */
const get_receiver_domain = ( app, address, session, next ) => {
    /**
     * Retrieve domain from rcpt_to address
     * @type {string}
     */
    const res = address.address.split ( '@' ) [ 1 ] .trim ();
    return res.split ( '>' ) [ 0 ];
}

/**
 *  Define if receiver domain is currently blocked
 *
 * @param {*} app
 * @param {*} address
 * @param {*} session
 * @param {*} next
 * @param {*} blocked_zone
 * @param {*} receiver_domain
 * @returns
 */
const is_receiver_domain_blocked = ( app, address, session, next, blocked_zone, receiver_domain ) => {
    if ( blocked_zone.includes( receiver_domain) ) {
        return true;
    }
    return false;
}


/**
 * Module entry point
 * 
 * @param {*} app
 * @param {*} done
 */
module.exports.init = ( app, done ) => {
    app.addHook( 'smtp:rcpt_to', ( address, session, next ) => {

        const blocked_zone = app.config.zone_block;
        const receiver_domain = get_receiver_domain ( app, address, session, next );

        if ( is_receiver_domain_blocked ( app, address, session, next, blocked_zone, receiver_domain  ) )
        {
            return next (
                raise_error (
                    app, address, session, next,
                    `The mail service provider (${receiver_domain}) you are trying to reach has been temporarily disabled`
                )
            );
        }

        next ();
    } );

    done ();
}
