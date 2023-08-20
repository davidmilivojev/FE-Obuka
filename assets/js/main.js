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

stickyHeader()
navigation();