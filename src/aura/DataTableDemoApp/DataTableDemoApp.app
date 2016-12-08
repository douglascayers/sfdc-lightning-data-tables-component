<aura:application extends="force:slds" controller="DataTableDemoAppController">

    <!-- public attributes -->

    <!-- private attributes -->

    <!-- events -->

    <aura:handler name="pageChangeEvent" event="c:DataTablePageChangeEvent" action="{!c.handlePageChangeEvent}" phase="capture"/>
    <aura:handler name="sortChangeEvent" event="c:DataTableSortChangeEvent" action="{!c.handleSortChangeEvent}" phase="capture"/>

    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

    <!-- markup -->

    <lightning:spinner aura:id="spinner" variant="brand"/>

    <c:DataTableCmp aura:id="dataTable">
        <aura:set attribute="columns">

            <c:DataTableColumnCmp label="Contact ID"
                                  name="Id"
                                  linkToRecord="Id"
                                  sortable="true"/>

            <c:DataTableColumnCmp label="First Name"
                                  name="FirstName"
                                  linkToRecord="Id"
                                  sortable="true"/>

            <c:DataTableColumnCmp label="Last Name"
                                  name="LastName"
                                  linkToRecord="Id"
                                  sortable="true"/>

            <c:DataTableColumnCmp label="Account Name"
                                  name="Account.Name"
                                  linkToRecord="Account.Id"
                                  sortable="true"/>

        </aura:set>

        <!-- optional -->

        <aura:set attribute="pageNumber" value="1"/>
        <aura:set attribute="pageSize" value="25"/>
        <aura:set attribute="sortColumnName" value="LastName"/>
        <aura:set attribute="sortDirection" value="desc"/>

    </c:DataTableCmp>

</aura:application>