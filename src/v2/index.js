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

    $('.btn-menu').on('click', () => {
        $('aside').addClass('aside-menu-open');
    });

    $('.btn-close').on('click', () => {
        $('aside').removeClass('aside-menu-open');
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }

    $('.category-select-wrapper  .selectpicker, .date-select-wrapper  .selectpicker').selectpicker({
        container: 'body',
        style: 'border-radius',
    });
  
})(jQuery);