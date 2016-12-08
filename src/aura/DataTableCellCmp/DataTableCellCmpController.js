({
    doInit : function( component, event, helper ) {

        var row = component.get( 'v.row' );
        var column = component.get( 'v.column' );

        // the column's name might be a single property on the object
        // like 'Subject' or it might be a compound reference
        // like 'Who.Name' so we split the string into its parts
        // and try to traverse the object graph through the properties.
        //
        // if the row does not have the full property graph
        // then null is returned, otherwise the value at the end of the rainbow.
        component.set( 'v.value', helper.parseFieldValue( component, row, column.get( 'v.name' ) ) );

        // set css class from column definition
        component.set( 'v.class', column.get( 'v.valueClass' ) );

        // determine ui theme
        var uiTheme = helper.getUITheme();
        component.set( 'v.uiTheme', uiTheme );

        // determine type of links to use
        var linkToRecord = column.get( 'v.linkToRecord' );
        var linkToURL = column.get( 'v.linkToURL' );

        // if linking to a record we first check if the expression evaluates to a field on the row object
        // that holds the value to link to, otherwise will use the value as-is for linking.
        // since this is intended to be an sobject record id, for classic theme only then we ensure
        // there's a leading '/'.
        if ( !$A.util.isUndefinedOrNull( linkToRecord ) ) {

            var parsedLinkToRecord = helper.parseFieldValue( component, row, linkToRecord );

            if ( !$A.util.isUndefinedOrNull( parsedLinkToRecord ) ) {
                component.set( 'v.linkToRecord', ( uiTheme === 'Classic' ? '/' : '' ) + parsedLinkToRecord );
            } else {
                component.set( 'v.linkToRecord', ( uiTheme === 'Classic' ? '/' : '' ) + linkToRecord );
            }

            if ( uiTheme === 'Classic' ) {
                component.set( 'v.classicLink', component.get( 'v.linkToRecord' ) );
            }

        }

        // if linking to a record we first check if the expression evaluates to a field on the row object
        // that holds the value to link to, otherwise will use the value as-is for linking
        if ( !$A.util.isUndefinedOrNull( linkToURL ) ) {

            var parsedLinkToURL = helper.parseFieldValue( component, row, linkToURL );

            if ( !$A.util.isUndefinedOrNull( parsedLinkToURL ) ) {
                component.set( 'v.linkToURL', parsedLinkToURL );
            } else {
                component.set( 'v.linkToURL', linkToURL );
            }

            if ( uiTheme === 'Classic' ) {
                component.set( 'v.classicLink', component.get( 'v.linkToURL' ) );
            }

        }

    },

    /**
     * For Salesforce1 and Lightning themes, action handler
     * for navigating to record or arbitrary URL.
     */
    handleOnClick : function( component, event, helper ) {

        var linkToRecord = component.get( 'v.linkToRecord' );
        var linkToURL = component.get( 'v.linkToURL' );

        if ( !$A.util.isUndefinedOrNull( linkToRecord ) ) {
            helper.navigateToRecord( linkToRecord );
        } else if ( !$A.util.isUndefinedOrNull( linkToURL ) ) {
            helper.navigateToURL( linkToURL );
        } else {
            console.warn( 'Unexpected click event. No value for v.linkToRecord or v.linkToURL' );
            console.log( event );
        }

    }
})