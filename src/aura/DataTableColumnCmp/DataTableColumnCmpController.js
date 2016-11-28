({
    fireSortChangeEvent : function( component, event, helper ) {

        var sortable = component.get( 'v.sortable' );

        if ( sortable == true ) {

               var sortDir = component.get( 'v.sortDir' );

            if ( sortDir === 'asc' ) {
                sortDir = 'desc';
            } else {
                sortDir = 'asc';
            }

            component.getEvent( 'sortChangeEvent' ).setParams({
                'columnLabel' : component.get( 'v.label' ),
                'columnName' : component.get( 'v.name' ),
                'sortDir' : sortDir
            }).fire();

        }

    }
})