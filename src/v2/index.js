import is from 'is_js';
import 'bxslider/dist/jquery.bxslider.min.js';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';


import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js';

import 'bootstrap-select/dist/js/i18n/defaults-en_US.min.js';

import './assets/scss/style.scss';


$(document).ready(function () {
    $('.bxslider').bxSlider({
        pager: false,
        touchEnabled: true,
        responsive: true,
        adaptiveHeight: true,
        nextText: '',
        prevText: '',
        nextSelector: '.next',
        prevSelector: '.prev',
        stopAutoOnClick: true,
        // slideWidth: 1080
    });

});


(function ($) {
    

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }

    $('.category-select-wrapper  .selectpicker, .date-select-wrapper  .selectpicker').selectpicker({
        container: 'body',
        style: 'border-radius',
    });

    /* HEADER */
    // sticky-header
    var header = $('header');
    var sticky = header.outerHeight();
    $(window).on('scroll', () => {
        if (is.ie()) {
            stickyHeader();
        } else {
            stickyHeader();
        }
    });
   
    function stickyHeader() {
        if (window.pageYOffset > 0) {
            header.addClass('position-fixed');
            $('.helper-sticky-header').show();
        } else {
            header.removeClass('position-fixed');
            $('.helper-sticky-header').hide();
        }
    }
    
    // clear search value
    $('header .Search-input').on('click', '.btn-close', () => {
        $('.Search-input #search').val('');
    });
    // show search input
    $('header').on('click', 'label[for="search"]', () => {
        $('.Search-field').addClass('search__is-active');
    });

    /* ASIDE */
    //   close and clear search value
    $('.Search-input').on('click', '.btn-close', () => {
        $('#search').val('');
        $('.Search-field').removeClass('search__is-active');
    });

    var showMenu = true;

    function toggleMenu() {
        if (!showMenu) {
            $('body').css({
                'overflow': 'hidden'
            });
            $('.btn-menu').addClass('btn-menu-isOpen');
            $('aside').addClass('aside-menu-open');
            
            showMenu = true;
        } else {
            $('body').css({
                'overflow': 'auto'
            });
            $('.btn-menu').removeClass('btn-menu-isOpen');
            $('aside').removeClass('aside-menu-open');
            
            showMenu = false;
        }

    }
    $('.btn-menu').on('click', toggleMenu);

    $('.btn-filter-3').on('click', 'button', (e) => {

        var data = $(e.target).data('btn-filter');

        $('[data-filter]')
            .addClass('d-none')
                    .filter('[data-filter=' + data + ']')
                        .removeClass('d-none')

        $('[data-btn-filter]')
            .removeClass('active')
                .filter('[data-btn-filter=' + data + ']')
                    .addClass('active')

        if ( data === 'Close' ) {
            toggleMenu();
            $('[data-btn-filter="Close"]')
                .removeClass('active')
                    .prev()
                        .addClass('active');

            $('[data-filter="Menu"]').removeClass('d-none');
        }
    });
  
})(jQuery);