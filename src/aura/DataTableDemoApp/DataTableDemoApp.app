<aura:application extends="force:slds">

    <!-- public attributes -->

    <!-- private attributes -->

    <!-- events -->

    <aura:handler name="pageChangeEvent" event="c:DataTablePageChangeEvent" action="{!c.handlePageChangeEvent}" phase="capture"/>
    <aura:handler name="sortChangeEvent" event="c:DataTableSortChangeEvent" action="{!c.handleSortChangeEvent}" phase="capture"/>

    <aura:handler event="aura:waiting" action="{!c.onWaiting}"/>
    <aura:handler event="aura:doneWaiting" action="{!c.onDoneWaiting}"/>

    <!-- markup -->

    <lightning:spinner aura:id="spinner" variant="brand" class="slds-hide"/>

    <c:DataTableCmp aura:id="dataTable">
        <aura:set attribute="columns">

            <c:DataTableColumnCmp label="Related To"
                                  name="What.Name"
                                  sortable="true"/>

            <c:DataTableColumnCmp label="Subject"
                                  name="Subject"
                                  sortable="false"/>

        </aura:set>
    </c:DataTableCmp>

</aura:application>