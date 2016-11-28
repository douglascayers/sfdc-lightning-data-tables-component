({
    firePageChangeEvent : function( component ) {

        var page = component.get( 'v.page' );
        var pageSize = component.get( 'v.pageSize' );

        component.getEvent( 'pageChangeEvent' ).setParams({
            'page' : page,
            'pageSize' : pageSize
        }).fire();

        component.set( 'v.page', page + 1 );
        component.set( 'v.pageSize', pageSize );

    }
})