({
    doInit : function( component, event, helper ) {

        // the column's name might be a single property on the object
        // like 'Subject' or it might be a compound reference
        // like 'Who.Name' so we split the string into its parts
        // and try to traverse the object graph through the properties.
        //
        // if the row does not have the full property graph
        // then null is returned, otherwise the value at the end of the rainbow.

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

        component.set( 'v.value', value );

    }
})