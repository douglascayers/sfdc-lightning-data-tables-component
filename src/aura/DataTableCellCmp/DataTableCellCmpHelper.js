({
    /**
     * Retrieves the field value from the JSON object
     * using dot notation to traverse the object graph.
     * If any part of the field path is not accessible then returns null.
     *
     * @param obj
     *      The JSON object (e.g. { 'Account' : { 'Name' : 'Burlington' } } )
     * @param fieldPath
     *      Uses dot notation to represent the JSON field value to retrieve (e.g. 'Account.Name' )
     */
	parseFieldValue : function( component, obj, fieldPath ) {

        var fields = fieldPath.split( '.' );

        var value = null;

        if ( obj.hasOwnProperty( fields[0] ) ) {

            value = obj[fields[0]];

            if ( fields.length > 1 ) {

                for ( var i = 1; i < fields.length; i++ ) {
                    if ( value != null && value.hasOwnProperty( fields[i] ) ) {
                        value = value[fields[i]];
                    } else {
                        value = null;
                        break;
                    }
                }

            }

        }

        return value;
	},

    // ----------------------------------------------------------------------------

    /**
     * Quick and dirty check to determine if code is running in
     *      - Classic
     *      - Salesforce1
     *      - Lightning
     * based on the existence of certain features.
     */
    getUITheme : function() {

        var theme = null;

        var event = $A.get( 'e.force:navigateToSObject' );

        if ( event ) {

            theme = 'Lightning';

        } else if ( ( typeof sforce !== 'undefined' ) && ( typeof sforce.one !== 'undefined' ) ) {

            theme = 'Salesforce1';

        } else {

            theme = 'Classic'

        }

        return theme;
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

    navigateToURL : function( url ) {

        console.log( 'navigating to url: ' + url );

        var event = $A.get( 'e.force:navigateToURL' );

        if ( event ) {

            event.setParams({
                'url' : url
            }).fire();

        } else if ( ( typeof sforce !== 'undefined' ) && ( typeof sforce.one !== 'undefined' ) ) {

            sforce.one.navigateToURL( url );

        } else {

            window.location.href = url;

        }

    }
})