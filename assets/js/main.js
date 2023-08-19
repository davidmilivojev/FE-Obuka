function navigation() {
    var $toggle = $('.js-toggle');
    var $nav = $('.js-nav');
    var $header = $('.js-header');
    var toggleActive = 'toggle--active';
    var headerLight = 'header--light';

    $toggle.on('click', function() {
        $(this).toggleClass(toggleActive);
        $header.toggleClass(headerLight);
        $nav.stop().slideToggle();
    });
}

navigation();