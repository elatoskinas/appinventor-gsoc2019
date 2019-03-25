var menus = [],
    scrollItems = [],
    scrollPositions = [];

var scrollId = 0;

$(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + scrollPositions[0];

    console.log(fromTop);
});

$(document).ready(function() {
    menus = $("#navBar a");

    scrollItems = menus.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    })

    for (var i = 0; i < scrollItems.length; ++i) {
        scrollPositions.push(scrollItems[i][0].offsetTop);
    }
});