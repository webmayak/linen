if ($('#tmmap').length) {
	var map;
	function initMap() {
	  map = new google.maps.Map(document.getElementById('tmmap'), {
	    center: {lat: 54.729013, lng: 55.9488},
	    zoom: 17,
	  });
	  var marker = new google.maps.Marker({
	    position: {lat: 54.729607, lng: 55.948734},
	    map: map,
	    title: 'SmartEra, г. Уфа, ул. Ленина 21'
	  });
	}
}

$(document).ready(function(){
  modal_view();
});

$('.collapse__holder').on('show.bs.collapse', function () {
    $(this).addClass('collapse-opened');
});

$('.collapse__holder').on('hide.bs.collapse', function () {
    $(this).removeClass('collapse-opened');
});

$('.cart-quanity-button').on('click', function() {

  var $button = $(this);
  var oldValue = $button.parent().find('input').val();

  if ($button.hasClass('button-plus')) {
    var newVal = parseFloat(oldValue) + 1;
  } else {
    if (oldValue > 0) {
      var newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 0;
    }
  }

  $button.parent().find('input').val(newVal);
});

$('.section-orders__table td .close').on('click', function(){
  $(this).parents('tr').remove()
});


function modal_view() {
    $(document).on('click', '.modal-view:visible, .modal-view-mobile:visible', function(e) {
        e.preventDefault();
        var url = $(this).attr('data-href');
        if (!url && url == 'undefined') {
            var url = this.rel;
        }
        var anchor = '';
        if (url.indexOf('#') != -1) {
            anchor = url.substring(url.indexOf('#'), url.length);
            url = url.substring(0, url.indexOf('#'));
        }
        if (url.indexOf('?') != -1) {
            url += '&';
        } else {
            url += '?';
        }
        if (!!$.prototype.fancybox) {
            $.fancybox({
                'padding': 0,
                'width': 500,
                'height': 1200,
                'type': 'inline',
                'href': url + anchor
            });
        }
    });
}