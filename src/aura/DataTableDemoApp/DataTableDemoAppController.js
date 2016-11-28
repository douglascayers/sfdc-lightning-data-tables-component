({
    handlePageChangeEvent : function( component, event, helper ) {

        console.log( 'handling page change event in app container' );
        console.log( 'page=' + event.getParam( 'page' ) );
        console.log( 'pageSize=' + event.getParam( 'pageSize' ) );

        // TODO fetch data from server sorted accordingly
        // TODO component.find('dataTable').set('v.rows', response.getReturnValue() );

    },

    handleSortChangeEvent : function( component, event, helper ) {

        console.log( 'handling sort event in app container' );
        console.log( 'columnLabel=' + event.getParam( 'columnLabel' ) );
        console.log( 'columnName=' + event.getParam( 'columnName' ) );
        console.log( 'sortDir=' + event.getParam( 'sortDir' ) );

        // TODO fetch data from server sorted accordingly
        // TODO component.find('dataTable').set('v.rows', response.getReturnValue() );

    },

    onWaiting : function( component, event, helper ) {

        helper.showSpinner( component );

    },

    onDoneWaiting : function( component, event, helper ) {

        helper.hideSpinner( component );

    }
})