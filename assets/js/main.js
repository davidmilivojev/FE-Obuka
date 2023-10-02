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

function scrollToSection() {
    var $link = $('.js-nav-item');
    var $navItem = $link.parent();
    var $section = $('.js-section');
    var activeLink = 'nav__list-item--active';
    var $headerHeight = $('.js-header').height();

    $section.each(function(i) {
        $(this).attr('data-index', i);
    })

    $link.on('click', function() {
        var $linkParent = $(this).parent();
        var index = $linkParent.index();
        var $targetSection = $('.js-section[data-index="' + index + '"]');
        $('html, body').animate({ scrollTop: $targetSection.offset().top - $headerHeight }, 600);
    });

    $(window).on('scroll load', function() {
        var treshold = 10;
        var scrolltop = $(this).scrollTop() + $headerHeight + treshold;
        $section.each(function() {
            var sectionOff = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();
            var sectionIndex = $(this).data('index');
            if (scrolltop > sectionOff && scrolltop < (sectionOff + sectionHeight)) {
                $navItem.removeClass(activeLink);
                $navItem.eq(sectionIndex).addClass(activeLink);
            }
        });
    })
}

function filters() {
    var $filterBtn = $('.js-filter-item');
    var $tags = $('.js-tags');
    var $cardItem = $('.cards__item');

    //na klik filter checkbox-a dodajemo u dom parce koda koji se nalazi u "newItem"
    $filterBtn.find('input').on('click', function(e) {
        // bubble efekat da se preventuje
        e.stopPropagation();
        // uzimamo text koji se nalazi pored checkbox-a
        var text = $(this).next().text();
        // uzimamo vrednost koja se nalazi u data atributu category od checkbox-a
        var category = $(this).data('category');
        // deo koda "template/sablon" koji se dodaje prilikom klika checkbox-a
        // ${text} i ${category} vrednosti prosledjujemo od checkbox-a i dinamicki stvaramo element
        var newItem =
        `
            <li>
                <button class="js-tag-btn" type="button" data-category="${category}">
                    ${text}
                </button>
            </li>
        `;

        // proveri da je kliknuti checkbox cekiran (ako cekiramo checkbox)
        if ($(this).is(":checked")) {
            // kada cekiramo, u tags div dodaj novi element na osnovu sablona "newItem"
            $tags.append(newItem);

            // petlja gde prolazimo kroz tagove
            $('.js-tag-btn').each(function() {
                // kupimo vrednost data atributa category
                var cat = $(this).data('category');
                // zati proveravamo da li neka od kartica ima klasu "visible"
                if (!$cardItem.parent().hasClass('visible')) {
                    // ako nema sakrij je
                    $cardItem.parent().hide();
                }
                // iz prethodnog klika prolazimo kroz petlju tagova
                // kartice koje imaju istu kategoriju kao i tagovi prikazujemo i dodajemo klasu "visible"
                $('.cards__item[data-category="' + cat + '"]').parent().show().addClass('visible');
            });
        } else {
            // ako checkbox odcekiramo
            // sakrij sve kartice sa istom kategorijom trenutno odcekiranog checkboxa i obrisi klasu "visible"
            $('.cards__item[data-category="' + category + '"]').parent().hide().removeClass('visible');
            // obrisi tag sa istom kategorijom
            $('.js-tag-btn[data-category="' + category + '"]').parent().remove();
        }

        // proveravamo da li wrap div od tagova ima neki tag u sebi
        if (!$tags.children().length) {
            // ako nema (ako su svi checkbox-ovi ugaseni, prikazi sve kartice) i obrisi klasu
            $cardItem.parent().show().removeClass('visible');
        }
    });

    // sintaksa za dodavanje event-a kada se element pojavljuje dinamicki
    $(document).on('click', '.js-tag-btn', function() {
        // na klik uzimamo vrednost data atributa category od ovog [taga]
        var category = $(this).data('category');
        // brisemo tag iz DOM-a
        $(this).parent().remove();
        // trigerujemo klik na checkbox koji ima istu kategoriju kao i [tag] kako bi ugasili filter
        $('.js-filter-item [data-category="' + category + '"]').trigger('click');
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
scrollToSection();
filters();