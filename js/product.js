var serialScrollNbImagesDisplayed;
var selectedCombination = [];
var globalQuantity = 0;
var colors = [];
var original_url = window.location + '';
var first_url_check = true;
var firstTime = true;
if (typeof customizationFields !== 'undefined' && customizationFields) {
    var customizationFieldsBk = customizationFields;
    customizationFields = [];
    var j = 0;
    for (var i = 0; i < customizationFieldsBk.length; ++i) {
        var key = 'pictures_' + parseInt(id_product) + '_' + parseInt(customizationFieldsBk[i]['id_customization_field']);
        customizationFields[i] = [];
        customizationFields[i][0] = (parseInt(customizationFieldsBk[i]['type']) == 0) ? 'img' + i : 'textField' + j++;
        customizationFields[i][1] = (parseInt(customizationFieldsBk[i]['type']) == 0 && customizationFieldsBk[i][key]) ? 2 : parseInt(customizationFieldsBk[i]['required']);
    }
}
if (typeof combinationImages !== 'undefined' && combinationImages) {
    combinationImagesJS = [];
    combinationImagesJS[0] = [];
    var k = 0;
    for (var i in combinationImages) {
        combinationImagesJS[i] = [];
        for (var j in combinationImages[i]) {
            var id_image = parseInt(combinationImages[i][j]['id_image']);
            if (id_image) {
                combinationImagesJS[0][k++] = id_image;
                combinationImagesJS[i][j] = [];
                combinationImagesJS[i][j] = id_image;
            }
        }
    }
    if (typeof combinationImagesJS[0] !== 'undefined' && combinationImagesJS[0]) {
        var array_values = [];
        for (var key in arrayUnique(combinationImagesJS[0])) {
            array_values.push(combinationImagesJS[0][key]);
        }
        combinationImagesJS[0] = array_values;
    }
    combinationImages = combinationImagesJS;
}
if (typeof combinations !== 'undefined' && combinations) {
    combinationsJS = [];
    combinationsHashSet = {};
    var k = 0;
    for (var i in combinations) {
        globalQuantity += combinations[i]['quantity'];
        combinationsJS[k] = [];
        combinationsJS[k]['idCombination'] = parseInt(i);
        combinationsJS[k]['idsAttributes'] = combinations[i]['attributes'];
        combinationsJS[k]['quantity'] = combinations[i]['quantity'];
        combinationsJS[k]['price'] = combinations[i]['price'];
        combinationsJS[k]['ecotax'] = combinations[i]['ecotax'];
        combinationsJS[k]['image'] = parseInt(combinations[i]['id_image']);
        combinationsJS[k]['reference'] = combinations[i]['reference'];
        combinationsJS[k]['unit_price'] = combinations[i]['unit_impact'];
        combinationsJS[k]['minimal_quantity'] = parseInt(combinations[i]['minimal_quantity']);
        combinationsJS[k]['available_date'] = [];
        combinationsJS[k]['available_date']['date'] = combinations[i]['available_date'];
        combinationsJS[k]['available_date']['date_formatted'] = combinations[i]['date_formatted'];
        combinationsJS[k]['specific_price'] = [];
        combinationsJS[k]['specific_price']['reduction_percent'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['reduction'] && combinations[i]['specific_price']['reduction_type'] == 'percentage') ? combinations[i]['specific_price']['reduction'] * 100 : 0;
        combinationsJS[k]['specific_price']['reduction_price'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['reduction'] && combinations[i]['specific_price']['reduction_type'] == 'amount') ? combinations[i]['specific_price']['reduction'] : 0;
        combinationsJS[k]['price'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['price'] && parseInt(combinations[i]['specific_price']['price']) != -1) ? combinations[i]['specific_price']['price'] : combinations[i]['price'];
        combinationsJS[k]['reduction_type'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['reduction_type']) ? combinations[i]['specific_price']['reduction_type'] : '';
        combinationsJS[k]['id_product_attribute'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['id_product_attribute']) ? combinations[i]['specific_price']['id_product_attribute'] : 0;
        var key = combinationsJS[k]['idsAttributes'].sort().join('-');
        combinationsHashSet[key] = combinationsJS[k];
        k++;
    }
    combinations = combinationsJS;
}
$(document).ready(function() {

    if (typeof(jqZoomEnabled) !== 'undefined' && jqZoomEnabled) {
        if ($('#thumbs_list .shown img').length) {
            var new_src = $('#thumbs_list .shown img').attr('src').replace('cart_', 'large_');
            if ($('.jqzoom img').attr('src') != new_src) {
                $('.jqzoom img').attr('src', new_src).parent().attr('href', new_src);
            }
        }
        $('.jqzoom').jqzoom({
            zoomType: 'innerzoom',
            zoomWidth: 458,
            zoomHeight: 458,
            xOffset: 21,
            yOffset: 0,
            title: false
        });
    }
    if (typeof(contentOnly) !== 'undefined') {
        if (!contentOnly && !!$.prototype.fancybox) {
            $('li:visible .fancybox, .fancybox.shown').fancybox({
                'hideOnContentClick': true,
                'openEffect': 'elastic',
                'closeEffect': 'elastic'
            });
        } else if (contentOnly) {
            $('#buy_block').attr('target', '_top');
        }
    }
    if (!!$.prototype.uniform) {
        if (typeof product_fileDefaultHtml !== 'undefined') {
            $.uniform.defaults.fileDefaultHtml = product_fileDefaultHtml;
        }
        if (typeof product_fileButtonHtml !== 'undefined') {
            $.uniform.defaults.fileButtonHtml = product_fileButtonHtml;
        }
    }
    if ($('#customizationForm').length) {
        var url = window.location + '';
        if (url.indexOf('#') != -1) {
        }
    }
    $('.product-info-tabs li:first, #product .tab-content > div:first').addClass('active');
    $(document).on('click', '#prev-img', function(e) {
        var visibleThumb = $('#views_block li:visible a');
        var imgNum = visibleThumb.index($('.zoomThumbActive'));
        if (imgNum === -1) {
            imgNum = 0;
        }
        if (visibleThumb.size() > 1) {
            $('#views_block').find('li:visible a').eq(imgNum - 1).trigger('click');
        }
    });
    $(document).on('click', '#next-img', function(e) {
        var visibleThumb = $('#views_block').find('li:visible a');
        var imgNum = visibleThumb.index($('.zoomThumbActive'));
        if (imgNum === -1) {
            imgNum = 0;
        }
        if (visibleThumb.size() > imgNum + 1) {
            visibleThumb.eq(imgNum + 1).trigger('click');
        } else {
            visibleThumb.eq(0).trigger('click');
        }
    });
    $('.tab-content .accordion').click(function(e) {
        e.preventDefault();
        var contentElement = $(this).find('a').attr('href');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(contentElement).removeClass('active');
        } else {
            $('.tab-content .accordion').removeClass('active');
            $('.tab-content .tab-pane').removeClass('active');
            $(this).addClass('active');
            $(contentElement).addClass('active');
            $.scrollTo('.tab-content');
        }
    });
});

function findSpecificPrice() {
    var domData = $("#quantityDiscount table tbody tr").not(":hidden");
    var nbProduct = $('#quantity_wanted').val();
    var newPrice = false;
    domData.each(function(i) {
        var dataDiscountQuantity = parseInt($(this).attr('data-discount-quantity'));
        var dataDiscountNextQuantity = -1;
        var nextQtDiscount = $(domData[i + 1]);
        if (nextQtDiscount.length) {
            dataDiscountNextQuantity = parseInt(nextQtDiscount.attr('data-discount-quantity'));
        }
        if ((dataDiscountNextQuantity != -1 && nbProduct >= dataDiscountQuantity && nbProduct < dataDiscountNextQuantity) || (dataDiscountNextQuantity == -1 && nbProduct >= dataDiscountQuantity)) {
            newPrice = $(this).attr('data-real-discount-value');
            return false;
        }
    });
    return newPrice;
}
$(window).resize(function() {
    $('#thumbs_list').trigger('goto', 0);
    serialScrollFixLock('', '', '', '', 0);
});
$(window).bind('hashchange', function() {
    findCombination();
});
if (!jqZoomEnabled) {
    $(document).on('mouseover', '#views_block li a', function() {
        displayImage($(this));
    });
}
$(document).on('click', '#view_full_size, #image-block', function(e) {
    $('#views_block .shown').click();
});
$(document).on('click', '#short_description_block .button', function(e) {
    $('#more_info_tab_more_info').click();
    $.scrollTo('#more_info_tabs', 1200);
});
$(document).on('click', '#customizedDatas input', function(e) {
    $('#customizedDatas input').hide();
    $('#ajax-loader').fadeIn();
    $('#customizedDatas').append(uploading_in_progress);
});
$(document).on('click', 'a[data-id=resetImages]', function(e) {
    e.preventDefault();
    refreshProductImages(0);
});
$(document).on('click', '.color_pick', function(e) {
    e.preventDefault();
    colorPickerClick($(this));
});
$(document).on('change', '#quantity_wanted', function(e) {
    e.preventDefault();
    var specificPrice = findSpecificPrice();
    if (false !== specificPrice) {
        $('#our_price_display').text(specificPrice);
    } else {
        if (typeof productHasAttributes != 'undefined' && productHasAttributes) {
            updateDisplay();
        } else {
            $('#our_price_display').text(formatCurrency(parseFloat($('#our_price_display').attr('content')), currencyFormat, currencySign, currencyBlank));
        }
    }
});
$(document).on('change', '.attribute_select', function(e) {
    e.preventDefault();
    findCombination();
});
$(document).on('click', '.attribute_radio', function(e) {
    e.preventDefault();
});
$(document).on('click', 'button[name=saveCustomization]', function(e) {
    saveCustomization();
});
if (typeof ad !== 'undefined' && ad && typeof adtoken !== 'undefined' && adtoken) {
    $(document).on('click', 'a#publish_button', function(e) {
        e.preventDefault();
        submitPublishProduct(ad, 0, adtoken);
    });
    $(document).on('click', 'a#lnk_view', function(e) {
        e.preventDefault();
        submitPublishProduct(ad, 1, adtoken);
    });
}
if (typeof(contentOnly) != 'undefined' && contentOnly) {
    $(document).on('click', '.fancybox', function(e) {
        e.preventDefault();
        if (typeof(jqZoomEnabled) != 'undefined' && jqZoomEnabled) {
            displayImage($(this))
        }
    });
    $(document).on('click', '#image-block', function(e) {
        e.preventDefault();
        var productUrl = window.document.location.href + '';
        var data = productUrl.replace(/[\?|&]content_only=1/, '');
        if (window.parent.page_name == 'search') {
            data += ((data.indexOf('?') < 0) ? '?' : '&') + 'HTTP_REFERER=' + encodeURIComponent(window.parent.document.location.href);
        }
        window.parent.document.location.href = data;
        return;
    });
}
$(document).on('click', '.product_quantity_up', function(e) {
    e.preventDefault();
    fieldName = $(this).data('field-qty');
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    if (!allowBuyWhenOutOfStock && quantityAvailable > 0) {
        quantityAvailableT = quantityAvailable;
    } else {
        quantityAvailableT = 100000000;
    }
    if (!isNaN(currentVal) && currentVal < quantityAvailableT) {
        $('input[name=' + fieldName + ']').val(currentVal + 1).trigger('keyup');
    } else {
        $('input[name=' + fieldName + ']').val(quantityAvailableT);
    }
    $('#quantity_wanted').change();
});
$(document).on('click', '.product_quantity_down', function(e) {
    e.preventDefault();
    fieldName = $(this).data('field-qty');
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    if (!isNaN(currentVal) && currentVal > 1) {
        $('input[name=' + fieldName + ']').val(currentVal - 1).trigger('keyup');
    } else {
        $('input[name=' + fieldName + ']').val(1);
    }
    $('#quantity_wanted').change();
});
if (typeof minimalQuantity != 'undefined' && minimalQuantity) {
    checkMinimalQuantity();
    $(document).on('keyup', 'input[name=qty]', function(e) {
        checkMinimalQuantity(minimalQuantity);
    });
}

function arrayUnique(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) {
            p.push(c);
        }
        return p;
    }, []);
};

function function_exists(function_name) {
    if (typeof function_name === 'string') {
        function_name = this.window[function_name];
    }
    return typeof function_name === 'function';
}

function oosHookJsCode() {
    for (var i = 0; i < oosHookJsCodeFunctions.length; i++) {
        if (function_exists(oosHookJsCodeFunctions[i])) {
            setTimeout(oosHookJsCodeFunctions[i] + '()', 0);
        }
    }
}

function displayImage(domAAroundImgThumb, no_animation) {
    if (typeof(no_animation) == 'undefined') {
        no_animation = false;
    }
    if (domAAroundImgThumb.attr('href')) {
        var new_src = domAAroundImgThumb.attr('href').replace('thickbox', 'large');
        var new_title = domAAroundImgThumb.attr('title');
        var new_href = domAAroundImgThumb.attr('href');
        if ($('#bigpic').attr('src') != new_src) {
            $('#bigpic').attr({
                'src': new_src,
                'alt': new_title,
                'title': new_title
            }).load(function() {
                if (typeof(jqZoomEnabled) !== 'undefined' && jqZoomEnabled) {
                    $(this).attr('rel', new_href);
                }
            });
        }
        $('#views_block li a').removeClass('shown');
        $(domAAroundImgThumb).addClass('shown');
    }
}

function serialScrollFixLock(event, targeted, scrolled, items, position) {
    serialScrollNbImagesDisplayed = 2;
    if ($('body').find('#image-block').parent().innerWidth() > 300 && $('body').find('#image-block').parent().innerWidth() <= 550) {
        serialScrollNbImagesDisplayed = 3;
    } else if ($('body').find('#image-block').parent().innerWidth() > 550 && $('body').find('#image-block').parent().innerWidth() <= 750) {
        serialScrollNbImagesDisplayed = 5;
    } else if ($('body').find('#image-block').parent().innerWidth() > 750 && $('body').find('#image-block').parent().innerWidth() <= 950) {
        serialScrollNbImagesDisplayed = 5;
    } else if ($('body').find('#image-block').parent().innerWidth() > 950 && $('body').find('#image-block').parent().innerWidth() <= 1150) {
        serialScrollNbImagesDisplayed = 6;
    } else if ($('body').find('#image-block').parent().innerWidth() > 1150) {
        serialScrollNbImagesDisplayed = 7;
    }
    serialScrollNbImages = $('#thumbs_list li:visible').length;
    var leftArrow = position == 0 ? true : false;
    var rightArrow = position + serialScrollNbImagesDisplayed >= serialScrollNbImages ? true : false;
    $('#view_scroll_left').css('cursor', leftArrow ? 'default' : 'pointer').fadeTo(0, leftArrow ? 0 : 1).css('display', leftArrow ? 'none' : 'block');
    $('#view_scroll_right').css('cursor', rightArrow ? 'default' : 'pointer').fadeTo(0, rightArrow ? 0 : 1).css('display', rightArrow ? 'none' : 'block');
    return true;
}

function refreshProductImages(id_product_attribute) {
    $('#thumbs_list_frame').scrollTo('li:eq(0)', 500, {
        axis: 'y'
    });
    id_product_attribute = parseInt(id_product_attribute);
    if (id_product_attribute > 0 && typeof(combinationImages) !== 'undefined' && typeof(combinationImages[id_product_attribute]) !== 'undefined') {
        $('#thumbs_list li').hide();
        $('#thumbs_list').trigger('goto', 0);
        for (var i = 0; i < combinationImages[id_product_attribute].length; i++) {
            if (typeof(jqZoomEnabled) !== 'undefined' && jqZoomEnabled) {
                $('#thumbnail_' + parseInt(combinationImages[id_product_attribute][i])).show().children('a.shown').trigger('click');
            } else {
                $('#thumbnail_' + parseInt(combinationImages[id_product_attribute][i])).show();
            }
        }
    } else {
        $('#thumbs_list li').show();
        var choice = [];
        var radio_inputs = parseInt($('#attributes .checked > input[type=radio]').length);
        if (radio_inputs) {
            radio_inputs = '#attributes .checked > input[type=radio]';
        } else {
            radio_inputs = '#attributes input[type=radio]:checked';
        }
        $('#attributes select, #attributes input[type=hidden], ' + radio_inputs).each(function() {
            choice.push(parseInt($(this).val()));
        });
        if (typeof combinationsHashSet !== 'undefined') {
            var combination = combinationsHashSet[choice.sort().join('-')];
            if (combination) {
                if (combination['image'] && combination['image'] != -1) {
                    displayImage($('#thumb_' + combination['image']).parent());
                }
            }
        }
    }
    if (parseInt($('#thumbs_list_frame >li:visible').length) != parseInt($('#thumbs_list_frame >li').length)) {
        $('#wrapResetImages').stop(true, true).show();
    } else {
        $('#wrapResetImages').stop(true, true).hide();
    }
    setTimeout(function() {
        var k = $('#image-block').height() / $('#image-block').width();
        var image_margin = parseInt($('#thumbs_list_frame >li').css('marginTop'));
        var margin_left = 30;
        var image_count = 2;
        if ($('body').find('#image-block').parent().innerWidth() > 300 && $('body').find('#image-block').parent().innerWidth() <= 550) {
            image_count = 4;
            margin_left = 15;
        } else if ($('body').find('#image-block').parent().innerWidth() > 550 && $('body').find('#image-block').parent().innerWidth() <= 750) {
            image_count = 5;
        } else if ($('body').find('#image-block').parent().innerWidth() > 750 && $('body').find('#image-block').parent().innerWidth() <= 950) {
            image_count = 6;
        } else if ($('body').find('#image-block').parent().innerWidth() > 950 && $('body').find('#image-block').parent().innerWidth() <= 1150) {
            image_count = 6;
        } else if ($('body').find('#image-block').parent().innerWidth() > 1150) {
            image_count = 7;
        }
        var thumbs_list_width = (k * ($('.pb-left-column').width() - margin_left) + image_margin * (1 - image_count)) / (k * (image_count + 1));
        $('#thumbs_list_frame').width(thumbs_list_width);
        $('#image-block').css('margin-left', (thumbs_list_width + margin_left));
        $('#thumbs_list').height(($('#thumbs_list_frame > li').outerHeight() * image_count + (image_margin * (image_count - 1))) + 'px');
        var thumb_height = $('#thumbs_list_frame >li').outerHeight() + image_margin;
        $('#thumbs_list_frame').height((parseInt((thumb_height) * $('#thumbs_list_frame >li').length)) + 'px');
        $('#thumbs_list').trigger('goto', 0);
        serialScrollFixLock('', '', '', '', 0);
    }, 1000);
}

function galeryReload() {
    $('#thumbs_list').serialScroll({
        items: 'li:visible',
        prev: '#view_scroll_left',
        next: '#view_scroll_right',
        axis: 'y',
        offset: 0,
        start: 0,
        stop: true,
        onBefore: serialScrollFixLock,
        duration: 700,
        step: 1,
        lazy: true,
        lock: false,
        force: false,
        cycle: false
    });
    $('#thumbs_list').trigger('goto', 1);
    $('#thumbs_list').trigger('goto', 0);
}
$(document).ready(galeryReload);
$(window).resize(refreshProductImages);

function saveCustomization() {
    $('#quantityBackup').val($('#quantity_wanted').val());
    $('#customizationForm').submit();
}

function submitPublishProduct(url, redirect, token) {
    var id_product = $('#admin-action-product-id').val();
    $.ajaxSetup({
        async: false
    });
    $.post(url + '/index.php', {
        action: 'publishProduct',
        id_product: id_product,
        status: 1,
        redirect: redirect,
        ajax: 1,
        tab: 'AdminProducts',
        token: token
    }, function(data) {
        if (data.indexOf('error') === -1) {
            document.location.href = data;
        }
    });
    return true;
}

function checkMinimalQuantity(minimal_quantity) {
    if ($('#quantity_wanted').val() < minimal_quantity) {
        $('#quantity_wanted').css('border', '1px solid red');
        $('#minimal_quantity_wanted_p').css('color', 'red');
    } else {
        $('#quantity_wanted').css('border', '1px solid #BDC2C9');
        $('#minimal_quantity_wanted_p').css('color', '#374853');
    }
}

function colorPickerClick(elt) {
    id_attribute = $(elt).attr('id').replace('color_', '');
    $(elt).parent().parent().children().removeClass('selected');
    $(elt).fadeTo('fast', 1, function() {
        $(this).fadeTo('fast', 0, function() {
            $(this).fadeTo('fast', 1, function() {
                $(this).parent().addClass('selected');
            });
        });
    });
    $(elt).parent().parent().parent().children('.color_pick_hidden').val(id_attribute);
}

$(document).ready(function() {
    countItemsProducts();
    if ($('#bxslider li').length && !!$.prototype.bxSlider) {
        products_slider = $('#bxslider').bxSlider({
            minSlides: products_carousel_items,
            maxSlides: products_carousel_items,
            slideWidth: 500,
            slideMargin: 30,
            pager: false,
            nextText: '',
            prevText: '',
            moveSlides: 1,
            infiniteLoop: false,
            hideControlOnEnd: true,
            responsive: true,
            useCSS: false,
            autoHover: false,
            speed: 500,
            pause: 3000,
            controls: true,
            autoControls: false
        });
    }
    if (!$('#bxslider li').length) {
        $('.accessories-block').parent().remove();
    }
});
$(window).resize(function() {
    if ($('#bxslider li').length) {
        resizeCarouselProducts()
    }
});

function resizeCarouselProducts() {
    countItemsProducts();
    products_slider.reloadSlider({
        minSlides: products_carousel_items,
        maxSlides: products_carousel_items,
        slideWidth: 500,
        slideMargin: 30,
        pager: false,
        nextText: '',
        prevText: '',
        moveSlides: 1,
        infiniteLoop: false,
        hideControlOnEnd: true,
        responsive: true,
        useCSS: false,
        autoHover: false,
        speed: 500,
        pause: 3000,
        controls: true,
        autoControls: false
    });
}

function countItemsProducts() {
    if ($('.page-product-box').width() < 400) {
        products_carousel_items = 1;
    }
    if ($('.page-product-box').width() > 400) {
        products_carousel_items = 2;
    }
    if ($('.page-product-box').width() >= 550) {
        products_carousel_items = 3;
    }
    if ($('.page-product-box').width() >= 900) {
        products_carousel_items = 4;
    }
    if ($('.page-product-box').width() >= 1200) {
        products_carousel_items = 5;
    }
    if ($('.page-product-box').width() >= 1500) {
        products_carousel_items = 6;
    }
    if ($('.page-product-box').width() >= 1800) {
        products_carousel_items = 7;
    }
    if ($('.page-product-box').width() >= 2048) {
        products_carousel_items = 8;
    }
}
$(document).on('click', '.product-info-tabs li a', function() {
    var contentElement = $(this).attr('href');
    if ($(document).width() < 768) {
        $.scrollTo(contentElement, 1200);
    }
});