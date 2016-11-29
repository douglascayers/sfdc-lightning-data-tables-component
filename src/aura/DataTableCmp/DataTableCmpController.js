({
    doInit : function( component, event, helper ) {

        // since these components are set via attribute and
        // not known at compile time then <aura:handler> is not
        // correctly registering our event listener as anticipated.
        //
        // therefore, we dynamically add our event listener to all
        // added columns upon initialization.
        // https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_dynamic_handler.htm

        var columns = component.get( 'v.columns' );
        for ( var i = 0; i < columns.length; i++ ) {
            columns[i].addHandler( 'sortChangeEvent', component, 'c.handleSortChangeEvent' );
        }

        // default sort column if not specified yet
        if ( columns.length > 0 ) {

            var sortColumnName = component.get( 'v.sortColumnName' );
            var sortDirection = component.get( 'v.sortDirection' );

            if ( $A.util.isUndefinedOrNull( sortColumnName ) ) {
                sortColumnName = columns[0].get( 'v.name' );
            }

            if ( $A.util.isUndefinedOrNull( sortDirection ) ) {
                sortDirection = 'asc';
            }

            helper.syncColumnStates( component, sortColumnName, sortDirection );

        }

        // notify listeners to react and display initial page of data
        // this will send v.page and v.pageSize initial attribute values
        helper.firePageChangeEvent( component, component.get( 'v.pageNumber' ), component.get( 'v.pageSize' ) );

    },

    /**
     * Toggles the sort state of all the columns to reflect the
     * currently sorted column captured by the sort change event.
     */
    handleSortChangeEvent : function( component, event, helper ) {

        // column requested to sort data by
        var sortColumnName = event.getParam( 'columnName' );
        var sortDirection = event.getParam( 'sortDirection' );

        helper.syncColumnStates( component, sortColumnName, sortDirection );

    }
})