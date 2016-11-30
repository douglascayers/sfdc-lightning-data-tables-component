({
    doInit : function( component, event, helper ) {

        var row = component.get( 'v.row' );
        var column = component.get( 'v.column' );

        var fields = column.get( 'v.name' ).split( '.' );

        var value = null;

        if ( row.hasOwnProperty( fields[0] ) ) {

            value = row[fields[0]];

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

        component.set( 'v.cellValue', value );

    }
})