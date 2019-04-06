var menus = [],
    scrollItems = [],
    scrollPositions = [];

var scrollId = 0;

$(window).scroll(function() {
    var scrollPos = $(this).scrollTop() + scrollPositions[0];

    var oldScrollId = scrollId;

    // Iterate scrollPositions list backwards until first position in range is found
    for (var i = scrollPositions.length - 1; i >= 0; --i) {
        if (scrollPos >= scrollPositions[i]) {
            scrollId = i;
            break;
        }
    }

    //console.log(scrollId + " " + oldScrollId);

    // Old, more efficient solution (which is somewhat unreliable)
    // if (scrollPos < scrollPositions[scrollId]) {
    //     while (scrollId > 0 && scrollPos < scrollPositions[scrollId]) {
    //         scrollId--;
    //     }
    // }
    // else if (scrollPos >= scrollPositions[scrollId+1]){
    //     while (scrollId != scrollPositions.length - 1 &&  scrollPos >= scrollPositions[scrollId+1]) {
    //         scrollId++;
    //     }
    // }

    if (oldScrollId != scrollId) {
        menus[oldScrollId].dataset.active = false;
        menus[scrollId].dataset.active = true;
    }
});

$(document).ready(function() {
    menus = $("#navBar a");

    scrollItems = menus.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    })

    var scrollPos = $(window).scrollTop();

    for (var i = 0; i < scrollItems.length; ++i) {
        // Get absolute height of i-th scrollItem
        // -10 difference to highlight the anchor link a bit more up
        var scrollValue = scrollItems[i][0].offsetTop - 10;

        // Add offset from first scrollPosition
        if (i != 0)
            scrollValue += scrollPositions[0];

        // Add value to scrollPositions
        scrollPositions.push(scrollValue);

        // ScrollPos exceeds scrollValue, set section as active
        if (scrollPos >= scrollValue) {
            scrollId = i;
        }
    }

    menus[scrollId].dataset.active = true;
});