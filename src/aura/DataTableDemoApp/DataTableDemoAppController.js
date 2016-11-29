({
    doInit: function( component, event, helper ) {

    },

    handlePageChangeEvent : function( component, event, helper ) {

        var tableCmp = component.find( 'dataTable' );

        console.log( 'handling page change event in app container' );
        console.log( 'columnName=' + tableCmp.get( 'v.sortColumnName' ) );
        console.log( 'sortDirection=' + tableCmp.get( 'v.sortDirection' ) );
        console.log( 'page=' + event.getParam( 'pageNumber' ) );
        console.log( 'pageSize=' + event.getParam( 'pageSize' ) );

        helper.callAction(
            component,
            'c.getContacts',
            {
                'page' : event.getParam( 'pageNumber' ),
                'pageSize' : event.getParam( 'pageSize' ),
                'sortCol' : tableCmp.get( 'v.sortColumnName' ),
                'sortDir' : tableCmp.get( 'v.sortDirection' )
            },
            function( data ) {

                var tableCmp = component.find( 'dataTable' );

                var rows = tableCmp.get( 'v.rows' );

                tableCmp.set( 'v.rows', rows.concat( data ) );

            }
        );

    },

    handleSortChangeEvent : function( component, event, helper ) {

        var tableCmp = component.find( 'dataTable' );

        tableCmp.set( 'v.pageNumber', 1 );

        console.log( 'handling sort event in app container' );
        console.log( 'columnName=' + event.getParam( 'columnName' ) );
        console.log( 'sortDirection=' + event.getParam( 'sortDirection' ) );
        console.log( 'pageNumber=' + tableCmp.get( 'v.pageNumber' ) );
        console.log( 'pageSize=' + tableCmp.get( 'v.pageSize' ) );

        helper.callAction(
            component,
            'c.getContacts',
            {
                'page' : tableCmp.get( 'v.pageNumber' ),
                'pageSize' : tableCmp.get( 'v.pageSize' ),
                'sortCol' : event.getParam( 'columnName' ),
                'sortDir' : event.getParam( 'sortDirection' )
            },
            function( data ) {

                var tableCmp = component.find( 'dataTable' );

                tableCmp.set( 'v.rows', data );

            }
        );

    }
})