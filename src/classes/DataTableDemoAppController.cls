public with sharing class DataTableDemoAppController {

    @AuraEnabled
    public static List<Contact> getContacts( Decimal page, Decimal pageSize, String sortCol, String sortDir ) {

        System.debug('querying contacts');
        System.debug('page=' + page);
        System.debug('pageSize=' + pageSize);
        System.debug('sortCol=' + sortCol);
        System.debug('sortDir=' + sortDir);

        Integer skipRecords = Integer.valueOf( ( page - 1 ) * pageSize );
        Integer maxRecords = Integer.valueOf( pageSize );

        String query =
            ' SELECT ' +
                ' id, firstName, lastName, accountId, account.name ' +
            ' FROM ' +
                ' Contact '
        ;

        if ( String.isNotBlank( sortCol ) ) {
            query += ' ORDER BY ' + String.escapeSingleQuotes( sortCol ) + ' ' + String.escapeSingleQuotes( sortDir );
        }

        query += ' LIMIT :maxRecords ';

        query += ' OFFSET :skipRecords ';

        List<Contact> contacts = (List<Contact>) Database.query( query );

        //List<Contact> contacts = [
        //    SELECT
        //        id, firstName, lastName, accountId, account.name
        //    FROM
        //        Contact
        //    ORDER BY
        //        firstName
        //    LIMIT
        //        :maxRecords
        //    OFFSET
        //        :skipRecords
        //];

        System.debug('queried contacts');
        System.debug( contacts );

        return contacts;
    }

}