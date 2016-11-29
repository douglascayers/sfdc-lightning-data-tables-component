({
    showSpinner : function( component ) {

        $A.util.removeClass( component.find( 'spinner' ), 'slds-hide' );

    },

    hideSpinner : function( component ) {

        $A.util.addClass( component.find( 'spinner' ), 'slds-hide' );

    },

    navigateToRecord : function( recordId ) {

        console.log( 'navigating to record: ' + recordId );

        var event = $A.get( 'e.force:navigateToSObject' );

        if ( event ) {

            event.setParams({
                'recordId' : recordId
            }).fire();

        } else if ( ( typeof sforce !== 'undefined' ) && ( typeof sforce.one !== 'undefined' ) ) {

            sforce.one.navigateToSObject( recordId );

        } else {

            window.location.href = '/' + recordId;

        }

    },

    /**
     * actionName = the apex controller method to call (e.g. 'c.myMethod' )
     * params = JSON object specifying action parameters (e.g. { 'x' : 42 } )
     * successCallback = function to call when action completes (e.g. function( response ) { ... } )
     * failureCallback = function to call when action fails (e.g. function( response ) { ... } )
     */
    callAction : function( component, actionName, params, successCallback, failureCallback ) {

        this.showSpinner( component );

        var action = component.get( actionName );

        if ( params ) {
            action.setParams( params );
        }

        action.setCallback( this, function( response ) {

            this.hideSpinner( component );

            if ( component.isValid() && response.getState() === 'SUCCESS' ) {

                if ( successCallback ) {
                    successCallback( response.getReturnValue() );
                }

            } else {

                console.error( 'Error calling action "' + actionName + '" with state: ' + response.getState() );

                if ( failureCallback ) {
                    failureCallback( response.getError(), response.getState() );
                } else {
                    this.logActionErrors( component, response.getError() );
                }

            }
        });

        $A.enqueueAction( action );

    },

    logActionErrors : function( component, errors ) {
        if ( errors ) {
            for ( var index in errors ) {
                console.error( 'Error: ' + errors[index].message );
            }
        } else {
            console.error( 'Unknown error' );
        }
    }
})