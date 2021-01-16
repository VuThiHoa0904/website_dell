odoo.define('webpopsite.user_custom_code', function (require) {
'use strict';
    $(function() {
        if ($('.ets_mm_megamenu.sticky_enabled').length > 0) {
            var sticky_navigation_offset_top = $('.ets_mm_megamenu.sticky_enabled').offset().top;
            console.log(sticky_navigation_offset_top);
            var headerFloatingHeight = $('.ets_mm_megamenu.sticky_enabled').height() + ($('#header').length > 0 ? parseInt($('.ets_mm_megamenu.sticky_enabled').css('marginTop').replace('px', '')) + parseInt($('.ets_mm_megamenu.sticky_enabled').css('marginBottom').replace('px', '')) : 0);
            var oldHeaderMarginBottom = $('#header').length > 0 ? parseInt($('#header').css('marginBottom').replace('px', '')) : 0;
            var sticky_navigation = function() {
                if (!$('.ets_mm_megamenu').hasClass('sticky_enabled'))
                    return !1;
                var scroll_top = $(window).scrollTop();
                var heightMenu = $('.custom_menu').height();
                if (scroll_top > sticky_navigation_offset_top + heightMenu) {
                    $('.menu_cat_content').addClass('scroll_heading');
                    $('.ets_mm_megamenu').addClass('close_menu')
                } else {
                    $('.menu_cat_content').removeClass('scroll_heading');
                    if ($('body').is("#index")) {
                        $('.ets_mm_megamenu').removeClass('close_menu')
                    } else {}
                }
            };
            sticky_navigation();
            $(window).scroll(function() {
                sticky_navigation()
            });
            if ($(window).width() < 768 && !$('body').hasClass('disable-sticky'))
                $('body').addClass('disable-sticky');
            $(window).on('resize', function(e) {
                if ($(window).width() < 768 && !$('body').hasClass('disable-sticky'))
                    $('body').addClass('disable-sticky');
                else if ($(window).width() >= 768 && $('body').hasClass('disable-sticky'))
                    $('body').removeClass('disable-sticky')
            });
            if ($('body').is("#index")) {} else {
                $('.ets_mm_megamenu').addClass('close_menu')
            }
        }
        $('.transition_slide li.mm_menus_li').hover(function() {
            if ($(window).width() >= 768) {
                $(this).find('.mm_columns_ul').stop(!0, !0).slideDown(300)
            }
        }, function() {
            if ($(window).width() >= 768) {
                $(this).find('.mm_columns_ul').stop(!0, !0).slideUp(300)
            }
        });
        $('.ybc-menu-toggle').on('click', function() {
            if ($(window).width() <= 767) {
                var wrapper = $(this).next('.mm_menus_ul');
                if ($(this).hasClass('closed')) {
                    var btnObj = $(this);
                    btnObj.removeClass('closed');
                    btnObj.addClass('opened');
                    wrapper.stop(!0, !0).addClass('active');
                    if ($('.transition_slide.transition_default').length != '') {
                        wrapper.stop(!0, !0).slideDown(0)
                    }
                } else {
                    var btnObj = $(this);
                    btnObj.removeClass('opened');
                    btnObj.addClass('closed');
                    wrapper.stop(!0, !0).removeClass('active');
                    if ($('.transition_slide.transition_default').length != '') {
                        wrapper.stop(!0, !0).slideUp(0)
                    }
                }
            }
        });
        $('.close_menu').on('click', function() {
            if ($(window).width() <= 767) {
                $(this).parent().prev().removeClass('opened');
                $(this).parent().prev().addClass('closed');
                $(this).parent().stop(!0, !0).removeClass('active');
                $('#menu-icon').stop(!0, !0).removeClass('opened');
                $('#menu-icon').stop(!0, !0).addClass('closed')
            }
        });
        $('.arrow').on('click', function() {
            if ($(window).width() <= 767) {
                var wrapper = $(this).next('.mm_columns_ul');
                if ($(this).hasClass('closed')) {
                    var btnObj = $(this);
                    btnObj.removeClass('closed');
                    btnObj.addClass('opened');
                    wrapper.stop(!0, !0).addClass('active')
                } else {
                    var btnObj = $(this);
                    btnObj.removeClass('opened');
                    btnObj.addClass('closed');
                    wrapper.stop(!0, !0).removeClass('active')
                }
            }
        });
        if ($('.ets_mm_megamenu').hasClass('enable_active_menu') && $('.mm_menus_ul > li').length > 0) {
            var currentUrl = window.location.href;
            $('.mm_menus_ul > li').each(function() {
                if ($(this).find('a[href="' + currentUrl + '"]').length > 0) {
                    $(this).addClass('active');
                    return !1
                }
            })
        }
        if ($('.mm_breaker').length > 0 && $('.mm_breaker').prev('li').length > 0) {
            $('.mm_breaker').prev('li').addClass('mm_before_breaker')
        }
    });

    $(function() {
        if ($('.header_bottom.ybc_float_header').length > 0) {
            if ($('#header.layout_2').length > 0 || ('#header.layout_3').length > 0) {
                if ($('.ybc-menu-wrapper').length > 0) {
                    var sticky_navigation_offset_top = $('.ybc-menu-wrapper').offset().top
                }
            } else {
                var sticky_navigation_offset_top = $('.main-menu').offset().top
            }
            var headerFloatingHeight = $('.main-menu').height();
            var sticky_navigation = function() {
                var scroll_top = $(window).scrollTop();
                if (scroll_top > sticky_navigation_offset_top) {
                    if ($(window).width() >= 992) {
                        $('.main-menu').addClass('scroll_heading').css({
                            'position': 'fixed',
                            'z-index': '10'
                        });
                        $('#header').css({
                            'margin-bottom': '' + headerFloatingHeight + 'px'
                        });
                        $('.main-menu').addClass('has_fixed');
                        $('.header_style_1 .ybc-menu-main-content').slideUp(0)
                    }
                } else {
                    $('.main-menu').removeClass('scroll_heading').css({
                        'position': 'relative',
                        'z-index': '0'
                    });
                    $('#header').css({
                        'margin-bottom': '0px'
                    });
                    $('.main-menu').removeClass('has_fixed');
                    if ($(window).width() > 1199) {
                        $('#index .header_style_1 .ybc-menu-main-content').slideDown(0)
                    } else {
                        $('#index .header_style_1 .ybc-menu-main-content').slideUp(0)
                    }
                }
            };
            sticky_navigation();
            $(window).scroll(function() {
                sticky_navigation()
            })
        }
    });
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $('.ybc_custom_float_header').addClass('no_scroll_heading');
            $('#header').addClass('no_scroll_header')
        } else {
            $('.ybc_custom_float_header').removeClass('no_scroll_heading');
            $('#header').removeClass('no_scroll_header')
        }
    });
    $(document).ready(function() {
        $(document).on('click', '.header_bottom.scroll_heading .ybc-menu-toggle', function() {
            if ($(window).width() > 767 && $(window).width() < 992) {
                $(this).parent().find('#ybc-menu-main-content').toggleClass('floating_active')
            }
            return !1
        });
        if ($(window).width() < 768) {
            $('.ybc_custom_float_header').addClass('no_scroll_heading');
            $('#header').addClass('no_scroll_header')
        } else {
            $('.ybc_custom_float_header').removeClass('no_scroll_heading');
            $('#header').removeClass('no_scroll_header')
        }
    });
    var prestashop = {
        "cart": {
            "products": [],
            "totals": {
                "total": {"type": "total", "label": "Total", "amount": 0, "value": "$0.00"},
                "total_including_tax": {
                    "type": "total",
                    "label": "Total (tax incl.)",
                    "amount": 0,
                    "value": "$0.00"
                },
                "total_excluding_tax": {
                    "type": "total",
                    "label": "Total (tax excl.)",
                    "amount": 0,
                    "value": "$0.00"
                }
            },
            "subtotals": {
                "products": {"type": "products", "label": "Subtotal", "amount": 0, "value": "$0.00"},
                "discounts": null,
                "shipping": {"type": "shipping", "label": "Shipping", "amount": 0, "value": "Free"},
                "tax": {"type": "tax", "label": "Taxes", "amount": 0, "value": "$0.00"}
            },
            "products_count": 0,
            "summary_string": "0 items",
            "labels": {"tax_short": "(tax excl.)", "tax_long": "(tax excluded)"},
            "id_address_delivery": 0,
            "id_address_invoice": 0,
            "is_virtual": false,
            "vouchers": {"allowed": 0, "added": []},
            "discounts": [],
            "minimalPurchase": 0,
            "minimalPurchaseRequired": ""
        },
        "currency": {"name": "US Dollar", "iso_code": "USD", "iso_code_num": "840", "sign": "$"},
        "customer": {
            "lastname": null,
            "firstname": null,
            "email": null,
            "last_passwd_gen": null,
            "birthday": null,
            "newsletter": null,
            "newsletter_date_add": null,
            "ip_registration_newsletter": null,
            "optin": null,
            "website": null,
            "company": null,
            "siret": null,
            "ape": null,
            "outstanding_allow_amount": 0,
            "max_payment_days": 0,
            "note": null,
            "is_guest": 0,
            "id_shop": null,
            "id_shop_group": null,
            "id_default_group": 1,
            "date_add": null,
            "date_upd": null,
            "reset_password_token": null,
            "reset_password_validity": null,
            "id": null,
            "is_logged": false,
            "gender": {"type": null, "name": null, "id": null},
            "risk": {"name": null, "color": null, "percent": null, "id": null},
            "addresses": []
        },
        "language": {
            "name": "English (English)",
            "iso_code": "en",
            "locale": "en-US",
            "language_code": "en-us",
            "is_rtl": "0",
            "date_format_lite": "m/d/Y",
            "date_format_full": "m/d/Y H:i:s",
            "id": 1
        },
        "page": {
            "title": "",
            "canonical": null,
            "meta": {
                "title": "Digital 17",
                "description": "Shop powered by PrestaShop",
                "keywords": "",
                "robots": "index"
            },
            "page_name": "index",
            "body_classes": {
                "lang-en": true,
                "lang-rtl": false,
                "country-US": true,
                "currency-USD": true,
                "layout-full-width": true,
                "page-index": true,
                "tax-display-disabled": true
            },
            "admin_notifications": []
        },
        "shop": {
            "name": "Digital 17",
            "email": "sales@yourcompany.com",
            "registration_number": "",
            "long": false,
            "lat": false,
            "logo": "/theme/digital17/img/digital-17-logo-1502853878.jpg",
            "stores_icon": "/theme/digital17/img/logo_stores.png",
            "favicon": "/theme/digital17/img/favicon.ico",
            "favicon_update_time": "1502853878",
            "address": {
                "formatted": "Digital 17<br>United States",
                "address1": "",
                "address2": "",
                "postcode": "",
                "city": "",
                "state": null,
                "country": "United States"
            },
            "phone": "",
            "fax": ""
        },
        "urls": {
            "base_url": "https://ets-demos.com/theme/digital17/",
            "current_url": "https://ets-demos.com/theme/digital17/en/",
            "shop_domain_url": "https://ets-demos.com",
            "img_ps_url": "https://ets-demos.com/theme/digital17/img/",
            "img_cat_url": "https://ets-demos.com/theme/digital17/img/c/",
            "img_lang_url": "https://ets-demos.com/theme/digital17/img/l/",
            "img_prod_url": "https://ets-demos.com/theme/digital17/img/p/",
            "img_manu_url": "https://ets-demos.com/theme/digital17/img/m/",
            "img_sup_url": "https://ets-demos.com/theme/digital17/img/su/",
            "img_ship_url": "https://ets-demos.com/theme/digital17/img/s/",
            "img_store_url": "https://ets-demos.com/theme/digital17/img/st/",
            "img_col_url": "https://ets-demos.com/theme/digital17/img/co/",
            "img_url": "https://ets-demos.com/theme/digital17/themes/digital17/assets/img/",
            "css_url": "https://ets-demos.com/theme/digital17/themes/digital17/assets/css/",
            "js_url": "https://ets-demos.com/theme/digital17/themes/digital17/assets/js/",
            "pic_url": "https://ets-demos.com/theme/digital17/upload/",
            "pages": {
                "address": "https://ets-demos.com/theme/digital17/en/address",
                "addresses": "https://ets-demos.com/theme/digital17/en/addresses",
                "authentication": "https://ets-demos.com/theme/digital17/en/login",
                "cart": "https://ets-demos.com/theme/digital17/en/cart",
                "category": "https://ets-demos.com/theme/digital17/en/index.php?controller=category",
                "cms": "https://ets-demos.com/theme/digital17/en/index.php?controller=cms",
                "contact": "https://ets-demos.com/theme/digital17/en/contact-us",
                "discount": "https://ets-demos.com/theme/digital17/en/discount",
                "guest_tracking": "https://ets-demos.com/theme/digital17/en/guest-tracking",
                "history": "https://ets-demos.com/theme/digital17/en/order-history",
                "identity": "https://ets-demos.com/theme/digital17/en/identity",
                "index": "https://ets-demos.com/theme/digital17/en/",
                "my_account": "https://ets-demos.com/theme/digital17/en/my-account",
                "order_confirmation": "https://ets-demos.com/theme/digital17/en/order-confirmation",
                "order_detail": "https://ets-demos.com/theme/digital17/en/index.php?controller=order-detail",
                "order_follow": "https://ets-demos.com/theme/digital17/en/order-follow",
                "order": "https://ets-demos.com/theme/digital17/en/order",
                "order_return": "https://ets-demos.com/theme/digital17/en/index.php?controller=order-return",
                "order_slip": "https://ets-demos.com/theme/digital17/en/credit-slip",
                "pagenotfound": "https://ets-demos.com/theme/digital17/en/page-not-found",
                "password": "https://ets-demos.com/theme/digital17/en/password-recovery",
                "pdf_invoice": "https://ets-demos.com/theme/digital17/en/index.php?controller=pdf-invoice",
                "pdf_order_return": "https://ets-demos.com/theme/digital17/en/index.php?controller=pdf-order-return",
                "pdf_order_slip": "https://ets-demos.com/theme/digital17/en/index.php?controller=pdf-order-slip",
                "prices_drop": "https://ets-demos.com/theme/digital17/en/prices-drop",
                "product": "https://ets-demos.com/theme/digital17/en/index.php?controller=product",
                "search": "https://ets-demos.com/theme/digital17/en/search",
                "sitemap": "https://ets-demos.com/theme/digital17/en/sitemap",
                "stores": "https://ets-demos.com/theme/digital17/en/stores",
                "supplier": "https://ets-demos.com/theme/digital17/en/supplier",
                "register": "https://ets-demos.com/theme/digital17/en/login?create_account=1",
                "order_login": "https://ets-demos.com/theme/digital17/en/order?login=1"
            },
            "theme_assets": "/theme/digital17/themes/digital17/assets/",
            "actions": {"logout": "https://ets-demos.com/theme/digital17/en/?mylogout="}
        },
        "configuration": {
            "display_taxes_label": false,
            "low_quantity_threshold": 3,
            "is_b2b": false,
            "is_catalog": false,
            "show_prices": true,
            "opt_in": {"partner": true},
            "quantity_discount": {"type": "discount", "label": "Discount"},
            "voucher_enabled": 0,
            "return_enabled": 0,
            "number_of_days_for_return": 14
        },
        "field_required": [],
        "breadcrumb": {
            "links": [{"title": "Home", "url": "https://ets-demos.com/theme/digital17/en/"}],
            "count": 1
        },
        "link": {"protocol_link": "https://", "protocol_content": "https://"},
        "time": 1609405496,
        "static_token": "a6459e066733ccb4fd350e29b59fcfa7",
        "token": "b04ed66e6c6ca99162fcdda3b2f9dc63"
    };
    var ETS_RT_ALLOW_CLOSE = 1;
    var ETS_RT_CLOSE_PERMANAL = 0;
    var ETS_RT_TRANSITION = 0;
    var ETS_RT_STOP_WHEN_HOVER = 1;
    var ETS_RT_INCLUDE_IMAGE = 1;
    var ETS_RT_HIDE_ON_MOBILE = 1;
    var ETS_RT_POSITION = 'botton_left';
    var ETS_RT_RELATED_ONLY = 0;
    var ETS_RT_REPEAT = 1;
    var ETS_RT_DELAY_START = 10;
    var ETS_RT_TIME_LANDING = 5;
    var ETS_RT_TIME_OUT = 20;
    var ETS_RT_LOOP_OUT = 0.5;
    var ETS_RT_TIME_IN = 60;
    var ETS_RT_TIME_AGAIN = 60;
    var ETS_RT_REMEMEBER = 1;
    var ETS_RT_URL_AJAX = 'https://ets-demos.com/theme/digital17/en/module/ets_reviewticker/ajax';

    var day = 'day';
    var hr = 'hour';
    var min = 'min';
    var sec = 'sec';
    var days = 'days';
    var hrs = 'hrs';
    var mins = 'mins';
    var secs = 'secs';

    var baseAjax = 'https://ets-demos.com/theme/digital17/en/module/ybc_productimagehover/ajax';
    var YBC_PI_TRANSITION_EFFECT = 'fade';
    var _PI_VER_17_ = 1
    var _PI_VER_16_ = 1

    !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '383795145416117');
        fbq('track', 'PageView');

    var wishlistProductsIds = [];
    var baseDir = 'https://ets-demos.com/theme/digital17/';
    var static_token = 'a6459e066733ccb4fd350e29b59fcfa7';
    var isLogged = '0';
    var loggin_required = 'You must be logged in to manage your wishlist.';
    var added_to_wishlist = 'The product was successfully added to your wishlist.';
    var mywishlist_url = 'https://ets-demos.com/theme/digital17/en/module/blockwishlist/mywishlist';
    var isLoggedWishlist = false;

    var width_slider = 1920;
    var height_slider = 500;

    var log_in = $('.wl_login').val();
    var not_log_in = $('.wl_not_login').val();

    var log_in = $('.wl_login').val();
    var not_log_in = $('.wl_not_login').val();

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/EN_US/sdk.js#xfbml=1&version=v2.10";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    if ($(window).width() > 767) {
        $('.menu_cate .ybc-menu-button-toggle').off().on('click', function(ev) {
            ev.preventDefault();
            var menu_toger = $('.menu_cate .ets_mm_megamenu');
            if (!menu_toger.hasClass('close_menu')) menu_toger.addClass('close_menu');
            else menu_toger.removeClass('close_menu')
        })
    }

    var YBC_TC_FLOAT_CSS3 = 1;
    var YBC_TC_AJAX_URL = 'https://ets-demos.com/theme/digital17/modules/ybc_themeconfig/ajax.php';

    ybc_blog_like_url = 'https://ets-demos.com/theme/digital17/en/module/ybc_blog/like';
    ybc_like_error = 'There was a problem while submitting your request. Try again later';
    YBC_BLOG_GALLERY_SPEED = 500;
    YBC_BLOG_SLIDER_SPEED = 5000;
    YBC_BLOG_GALLERY_SKIN = 'light_square';
    YBC_BLOG_GALLERY_AUTO_PLAY = 1;

    var YBC_TC_FLOAT_CSS3 = 1;
    var YBC_TC_AJAX_URL = 'https://ets-demos.com/theme/digital17/modules/ybc_themeconfig/ajax.php';

    ybc_blog_like_url = 'https://ets-demos.com/theme/digital17/en/module/ybc_blog/like';
    ybc_like_error = 'There was a problem while submitting your request. Try again later';
    YBC_BLOG_GALLERY_SPEED = 500;
    YBC_BLOG_SLIDER_SPEED = 5000;
    YBC_BLOG_GALLERY_SKIN = 'light_square';
    YBC_BLOG_GALLERY_AUTO_PLAY = 1;
});