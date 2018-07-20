import 'jquery';
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
        // clear search value
        $('header .Search-input').on('click', '.btn-close', () => {
            $('.Search-input #search').val('');
        });
        // show search input
        $('header').on('click', 'label[for="search"]', () => {
            $('.Search-Field').addClass('Search-Field__active');
        });

    /* ASIDE */
        //   close and clear search value
        $('.Search-Field .Search-input').on('click', '.btn-close', () => {
            $('.Search-input #search').val('');
            $('.Search-Field').removeClass('Search-Field__active');
        });

    $('.btn-menu').on('click', () => {
        $('aside').addClass('aside-menu-open');
    });

    $('.btn-close', '.close-menu').on('click', () => {
        $('aside').removeClass('aside-menu-open');
    });


    $('.btn-filter-3').on('click', 'button', (e) => {
        var data = $(e.target).data('btn-filter');
        $('[data-filter]')
            .addClass('d-none')
                .filter('[data-filter=' + data + ']')
                .removeClass('d-none');
        $('[data-btn-filter]')
            .removeClass('active')
                .filter('[data-btn-filter=' + data + ']')
                .addClass('active');

        if ( data === 'Close' ) {
            $('aside').removeClass('aside-menu-open');
            
            $('[data-btn-filter="Close"]')
                .removeClass('active')
                    .prev()
                        .addClass('active');

            $('[data-filter="Profile"]').removeClass('d-none');
        }
    });
  
})(jQuery);