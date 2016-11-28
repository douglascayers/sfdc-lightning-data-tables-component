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

    },

    /**
     * Toggles the sort state of all the columns to reflect the
     * currently sorted column captured by the sort change event.
     */
    handleSortChangeEvent : function( component, event, helper ) {

        // column requested to sort data by
        var sortColumnName = event.getParam( 'columnName' );

        // for all columns update their attributes
        // to indicate if it is the sorted column or not
        var columns = component.get( 'v.columns' );
        for ( var i = 0; i < columns.length; i++ ) {

            var column = columns[i];
            var columnName = column.get( 'v.name' );

            if ( sortColumnName === columnName ) {

                column.set( 'v.isSorted', true );
                column.set( 'v.sortDir', event.getParam( 'sortDir' ) );

            } else {

                column.set( 'v.isSorted', false );

            }

        }

    }
})