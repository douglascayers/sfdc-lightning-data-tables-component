({
    afterRender : function( component, helper ) {

        this.superAfterRender();

        // this is done in renderer because we don't get
        // access to the window element in the helper js.

        // per John Resig, we should not take action on every scroll event
        // as that has poor performance but rather we should take action periodically.
        // http://ejohn.org/blog/learning-from-twitter/

        var didScroll = false;

        window.onscroll = function() {
            didScroll = true;
        };

        // periodically attach the scroll event listener
        // so that we aren't taking action for all events
        setInterval( $A.getCallback( function() {

            if ( didScroll ) {

                didScroll = false;

                // adapted from stackoverflow to detect when user has scrolled sufficiently to end of document
                // http://stackoverflow.com/questions/4841585/alternatives-to-jquery-endless-scrolling
                if ( window['scrollY'] >= document.body['scrollHeight'] - window['outerHeight'] - 100 ) {
                    helper.getNextPage( component );
                }

            }

        }), 1000 );

    }
})