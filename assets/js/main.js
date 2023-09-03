var headerSticky = 'header--sticky';
var $header = $('.js-header');
var headerLight = 'header--light';
var $toggle = $('.js-toggle');
var toggleActive = 'toggle--active';

function navigation() {
    var $nav = $('.js-nav');

    $toggle.on('click', function() {
        $(this).toggleClass(toggleActive);
        $nav.stop().slideToggle();
        if(!$header.hasClass(headerSticky)) {
            $header.toggleClass(headerLight);
        }
    });
}

function stickyHeader() {
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        if(scrollTop > 0) {
            if(!$toggle.hasClass(toggleActive)) {
                $header.addClass([headerLight, headerSticky]);
            }
        } else {
            if(!$toggle.hasClass(toggleActive)) {
                $header.removeClass([headerLight, headerSticky]);
            }
        }
    });
}

function slider() {
    var $slider = $('.js-slider');
    $(window).on('resize load', function() {
        if ($(window).width() < 767) {
            $slider.slick({
                prevArrow: $('.js-arrow-prev'),
                nextArrow: $('.js-arrow-next'),
            });
        } else {
            if($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
        }
    });
}

function tabs() {
    var $btnTab = $('.js-cashcard-btn');
    var $containerTab = $('.js-cashcard-container');
    var $float = $('.js-cashcard-float');
    var btnActive = 'cashcard__buttons-btn--active';
    var containerActive = 'cashcard__container--active';

    $containerTab.each(function(i) {
        $(this).attr('data-index', i);
    });

    $btnTab.on('click', function() {
        var index = $(this).parent().index();
        var itemWidth = $(this).outerWidth();
        var itemLeft = $(this).parent().position().left;
        $btnTab.removeClass(btnActive);
        $(this).addClass(btnActive);
        $containerTab.removeClass(containerActive);
        $('.js-cashcard-container[data-index="' + index +  '"]').addClass(containerActive);
        // $containerTab.eq(index).addClass(containerActive);
        $float.css({
            'left': itemLeft,
            'width': itemWidth
        });
    });

    $(window).on('load', function() {
        $btnTab.first().trigger('click');
    });
}

stickyHeader();
navigation();
slider();
tabs();

// form add custom dropdown TODO