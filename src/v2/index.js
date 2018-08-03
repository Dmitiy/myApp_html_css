// import $ from 'jquery';

import is from 'is_js';

import 'bxslider/dist/jquery.bxslider.min.js';

// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';

// import 'bootstrap-select/dist/css/bootstrap-select.min.css';
// import 'bootstrap-select/dist/js/bootstrap-select.min.js';
// import 'bootstrap-select/dist/js/i18n/defaults-en_US.min.js';

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

    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //     $('.selectpicker').selectpicker('mobile');
    // }

    // $('.category-select-wrapper  .selectpicker, .date-select-wrapper  .selectpicker').selectpicker({
    //     container: 'body',
    //     style: 'border-radius',
    // });
    
    // show search input

    $('.header').on('click', 'label[for="search"]', () => {
        $('.Search-field').addClass('is-active');
    });

    //close and clear search value

    $('.Search-field').on('click', '.btn-close', () => {
        $('.Form-search-input .Search-input #search').val('');
        $('.Search-field #search').val('');
        $('.Search-field').removeClass('is-active');
    });

    /* ASIDE */
  
    let showMenu = true;
    $(".btn-menu").on("click", toggleMenu);

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
    

    $('aside .btn-filter-3').on('click', 'button', (e) => {

        const data = $(e.target).data('btn-filter');

        $('[data-filter]')
            .hide()
                .filter('[data-filter=' + data + ']')
                    .show();

        $('[data-btn-filter]')
            .removeClass('active')
                .filter('[data-btn-filter=' + data + ']')
                    .addClass('active');

        if ( data === 'Close' ) {
            toggleMenu();
            $('[data-btn-filter="Close"]')
                .removeClass('active')
                    .prev()
                        .addClass('active');

            $('[data-filter="Menu"]').show();
        }
    });

    $('.btn-filter-3').on('click', 'button', (e) => {

        const data = $(e.target);
        
        $('[data-filterName]')
            .removeClass('active')
                .filter(data)
                    .addClass('active')
    });
  
})(jQuery);


window.onload = () => {

    let products = [];
    let flag = true;
    let filter = 'trending';
    let limit = 4;
    let page = 1;
    let title = '';

    const pageContainer = document.querySelector('.page');
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    const topOfHeader = header.offsetTop;
    const helperDiv = header.offsetHeight + 'px';
    const newDiv = document.createElement("div");

    newDiv.style.height = helperDiv;
    
    const btnMore = document.querySelector('.btn-show-more');
    const btnsFilter = document.querySelector('main .btn-filter-3');
    const categories = document.querySelector('.category-select-wrapper select');

    let url = () => {
        return title === ''
            ? `http://localhost:3004/products?_page=${page}&_limit=${limit}&filter=${filter}`
            : `http://localhost:3004/products?_page=${page}&_limit=${limit}&filter=${filter}&title=${title}`
    }

    // show more items
    btnMore.addEventListener('click', () => {
        if (flag) {
            getProductItems();
        }
    });

    //get request to the server
    const getProductItems = (isFilter) => {

        if(isFilter) {
            page = 1;
            products = [];
        }

        fetch(url())
            .then((res) => res.json())
            .then((data) => {

                if (data.length < limit) {
                    flag = false;
                    btnMore.style.display = 'none';
                } else {
                    flag = true;
                    btnMore.style.display = 'inline-block';
                }

                products = [...products, ...data];
                render(products);
                // console.log(products);
                page++;
            })
            .catch((err) => console.log('ERROR: ', err));
    };

    //init state
    getProductItems();

    //
    const render = (products) => {
        const html = products.map((product) => renderItem(product)).join('');
        document.querySelector('.Products').innerHTML = html;
    }

    const renderItem = (productItem) => {
        return `<a class="card box-shadow" href="${productItem.href}">
                    <div class="card-header">
                        <span class='text-truncate'>${productItem.title}</span>
                    </div>
                    <div class="card-body border-top">
                        <img src="${productItem.src}" />
                        <p class="text-truncate">${productItem.name}</p>
                    </div>
                    <div class="card-footer border-top">
                        <span class="amount">${productItem.price}</span>
                    </div>
                </a>`;
    }

    // select option of categories
    categories.addEventListener('change', (e) => {

        title = e.target.value === 'All' ? '' : e.target.value;
        getProductItems(true);
    });


    // btn-filter-3
    btnsFilter.addEventListener('click', (e) => {

        filter = e.target.textContent.toLowerCase();
        getProductItems(true);
    });



    /* ADD SOME FEATURES */ 

    // sticky-header
    

    const stickyHeader = () => {

        if (window.scrollY > topOfHeader) {
            pageContainer.insertBefore(newDiv, main);
            header.classList.add('position-fixed');
        } else {
            pageContainer.removeChild(newDiv);
            header.classList.remove('position-fixed');
        }
        
    }
    
    window.addEventListener('scroll', stickyHeader);
};

