$(document).ready(function() {
    var $input = $("#tm_search_query");
    var width_ac_results = $input.parent('form').width();
    $('#search-toggle').on("click", function() {
        $(this).parent("#tmsearch").toggleClass("active-search");
        $input.trigger("focus");
    });
    $('#tmsearch').find('.search-close').on("click", function() {
        $("#tmsearch").removeClass("active-search");
        $input.val('');
    });
    $(document).mouseup(function(e) {
        var container = $('#tmsearch');
        if (container.has(e.target).length === 0 && !$input.val()) {
            container.removeClass("active-search");
        }
    });
    $('#tm_search_query').keypress(function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code.toString() == 13) {
            $('#tmsearchbox').find('button').trigger('click');
        }
    });
});