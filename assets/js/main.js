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

    loadFirstItem($btnTab);
}

function accordions(accordion, type) {
    // var $accordionBtn = $('.js-accordion-btn');
    // var $accordionContainer = $('.js-accordion-container');
    var $accordionBtn = $(accordion).find($('.js-accordion-btn'));
    var $accordionContainer = $(accordion).find($('.js-accordion-container'));
    var opened = 'accordion__item--opened';
    var multi = type;

    // $accordionBtn.on('click', function() {
    //     $(this).parent().toggleClass(opened);
    //     $(this).next().slideToggle();
    // });

    $accordionBtn.on('click', function() {
        if (multi) {
            $(this).parent().toggleClass(opened);
            $(this).next().stop().slideToggle();
        } else {
            $accordionBtn.parent().removeClass(opened);
            $(this).parent().addClass(opened);
            $accordionContainer.stop().slideUp();
            $(this).next().stop().slideDown();
        }
    });

    loadFirstItem($accordionBtn);
}

function loadFirstItem(item) {
    $(window).on('load', function() {
        item.first().trigger('click');
    });
}

function modal() {
    var $modal = $('.js-modal');
    var $modalBtn = $('.js-modal-btn');
    var $modalContent = $('.js-modal-content');
    var $modalTarget = $('.js-modal-target');
    var $modalClose = $('.js-modal-close');
    var modalItem = '.js-modal-item';

    $modalBtn.on('click', function() {
        var innerContent = $(this).closest(modalItem).find($modalTarget).html();
        $modalContent.empty();
        $modalContent.append(innerContent);
        $modal.stop().fadeIn();
    });

    $modalClose.on('click', function() {
        $modal.stop().fadeOut(function() {
            $modalContent.empty();
        });
    });
}

function dropdownSelectric() {
    $('select').selectric();
}

function dropdown() {
    var $dropdown = $('.js-dropdown');
    var $dropdownBtn = $('.js-dropdown-btn');
    var $dropdownItem = $('.js-dropdown-item');
    var $dropdownList = $('.js-dropdown-list');
    var selected = 'dropdown__item-btn--selected';
    var active = 'dropdown__btn--active';

    $dropdownBtn.on('click', function() {
        $(this).next().stop().slideToggle();
        $(this).toggleClass(active);
    });

    $dropdownItem.on('click', function() {
        var $list = $(this).closest($dropdownList);
        var content = $(this).text();
        $list.stop().slideToggle();
        $list.find($dropdownItem).removeClass(selected);
        $(this).addClass(selected);
        $(this).closest($dropdown).find($dropdownBtn).text(content).toggleClass(active);
    });
}

function scrollToTop() {
    var $btn = $('.js-scrolltop');

    $btn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        if(scrollTop > 1400) {
            $btn.fadeIn();
        } else {
            $btn.fadeOut();
        }
    });
}

function emptyField() {
    var $submit = $('.js-submit');

    $submit.on('click', function() {
        $('.contact-form__input').each(function() {
            var $parent = $(this).closest('.contact-form__field');
            if (!$(this).val()) {
                if(!$parent.find('.contact-form__label').next().length) {
                    var placeholder = $(this).prev().text();
                    var text = 'is empty!';
                    $parent.append('<span class="contact-form__error">' + placeholder + ' ' + text + '</span>');
                }
            } else {
                $parent.find('.contact-form__label').next().remove();
            }
        });
    });
}

stickyHeader();
navigation();
slider();
tabs();
accordions('.js-acc', false);
modal();
dropdownSelectric();
dropdown();
scrollToTop();
emptyField();