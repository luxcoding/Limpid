Ezhi = {}


var scrollTop = 0;
var frames = 379;
var swipeKd = 0;
var loader = new PxLoader();
var highResTimer = setTimeout(function () {
}, 200);
var testSpeed = 0;
var scrollEvent = 0;
var mobileWidth = 970;

$(document).ready(function () {
    $(window).scrollTop(0);

    var progressBar = $('.js-loader-filler');
    var html = '';
    var domen = '';
    if (testSpeed == 1)
        domen = 'http://labs.scaph.ru/ezhi/';
    for (var i = 1; i <= frames; i++) {
        html += '<li style="background-image: url(' + domen + 'photos_min/' + i + '.jpg)"></li>';
        loader.addImage(domen + 'photos_min/' + i + '.jpg');
        if (i == frames) {
            loader.addImage(domen + 'assets/i/back.jpg');
            loader.addImage(domen + 'assets/i/sprite.png');
            loader.addImage(domen + 'assets/i/neo_logo_main_x2.png');
            loader.start();
        }
    }


    loader.addProgressListener(function (e) {
        var state = e.completedCount / e.totalCount * 100;
        var factor = $('.load-progress .loader-filler').width()/135;
        var stepX = (77/103*factor);
        var stepY = 27/100*factor;

        progressBar.css({left: stepX*state + 'px',top: stepY*state + 'px'});

    });

    loader.addCompletionListener(function () {
        $('.js-video-hedgehog').fadeIn(1000);
        $('.js-skip').fadeIn();
        $('.neo-logo-main').fadeIn(1000);
        $('.js-use-scroll').fadeIn();

        setTimeout(function () {
            $('body').removeClass('preload')
            $('.js-load-progress').hide();
        }, 1000);
    });


    $('.js-sequence').html(html);

    $('.js-video-slider').on('mousewheel', function (e) {
        var deltaY = e.deltaY > 0 ? 1 : -1;

        scrollImage(deltaY);

        return false;
    });

    //swipe
    $('.js-video-slider').on('move', function (e) {
        //чтобы листалось не сильно быстро, делаем соотношение 1 к 20.
        var deltaY = 0;


        if (e.deltaY > 0) {
            deltaY = 2;
        }
        if (e.deltaY < 0) {
            deltaY = -2;
        }

        if (deltaY != 0) {
            swipeKd += 1;
            if (swipeKd == 1) {
                scrollImage(deltaY);
                swipeKd = 0;
            }
        }

    });

    setInterval(function () {
        if (window.scrollTop > 0)
            scrollImage(-1);
        if (window.scrollTop < window.frames * -1)
            scrollImage(1);
    }, 1);

    $('.js-progress').slider({
        slide: function (event, ui) {
            var step = window.frames / 100;
            window.scrollTop = Math.round(step * ui.value * -1);
            scrollImage(0);
        }
    });

    /////////////
    ///CONTENT///
    /////////////

    $(document).on("click", ".content-after-video div.contacts span", function () {
        $(this).hide();
        $('.content-after-video div.contacts .hidden').slideDown(100);
        ga('send', 'event', 'Внутренняя', 'Клик', 'Контакты');

    });

    $(document).on("click", ".js-skip", function () {
        ga('send', 'event', 'Главная', 'Слайдер', 'Пропустить');
        scrollImage(frames * -1);
        return false;
    });

    ///center content///

    $(window).resize(function () {
        var H = $(this).height(),
            W = $(this).width();
        var ezh = H / 3 / 2;
        var text = (H - ezh) / 5 - 32;
        var plan = (H - 150 - 51 - 100 - $('.plan-gallery .photos img:visible').height()) / 2;
        var photo = (H - 100 - 20 - 51 - 150 - $('.photo-gallery .photos img:visible').height()) / 2;
        if (plan < 0) plan = 0;
	if(photo < 0) photo = 0;
	var mini_photos = photo + 30;
        $('.js-content-after-video').css({paddingTop: ezh});
        $('.js-logo-green').css({marginTop: ezh});
        $('.js-use-scroll').css({marginTop: H/5*4});
        $('.js-text-blocks').css({marginTop: text});
        $('.plan-gallery .photos img').css({marginTop: plan});
        $('.photo-gallery .photos img').css({marginTop: photo});
        $('.js-load-progress').css({marginTop: ezh});
        $('.neo-logo-main').css({marginTop: ezh})
	$('.photo-gallery .js-mini-photos').css({bottom:mini_photos});

    });

    $(window).resize();



    $('.js-skip').stop(1, 1).hide();
    $('.js-logo-green').stop(1, 1).hide();
    $('.js-use-scroll').stop(1, 1).hide();

    $(document).on('click', '.js-mini-photos li a', function () {
        if (!$(this).hasClass('active')) {
            gallery_step($(this).parents('li').index(), $(this).parents('.js-gallery'));
        }
        return false;
    });

    $(document).on('click', '.text-block-one a', function () {
        setTimeout(function () {
            $(window).resize()
        }, 100)
        $('.popup.plan-gallery').fadeIn();
	$('body').addClass('popup-open');
        $(window).scrollTop(0);
        ga('send', 'event', 'Внутренняя', 'Клик', 'Планировки');
        return false;
    });

    $(document).on('click', '.text-block-two a', function () {
        setTimeout(function () {
            $(window).resize()
        }, 100)
        $('.popup.photo-gallery').fadeIn();
        $(window).scrollTop(0);
	$('body').addClass('popup-open');
        ga('send', 'event', 'Внутренняя', 'Клик', 'Фото');
        return false;
    });

    $(document).on('click', '.js-close', function () {
        $(this).parents('.popup').fadeOut(100);
	$('body').removeClass('popup-open');
        return false;
    });

    $(document).on('click', '.js-nav', function () {
        var gallery = $(this).parents('.js-gallery');
        var count = $('.js-photos li', gallery).length;
        var current = $('.js-photos li:visible').index();
        if ($(this).hasClass('js-nav-right')) {
            if (current == (count - 1)) {
                gallery_step(0, gallery);
            }
            else {
                gallery_step(current + 1, gallery)
            }
        }
        else {
            if (current == 0) {
                gallery_step((count - 1), gallery);
            }
            else {
                gallery_step((current - 1), gallery)
            }
        }

    });

    $(document).on('click', 'footer .left', function () {
        $('.js-neo-logo').show();
        $('.js-neo-logo img').stop(1,1).animate({top:0});

        $(this).hide();
    });

    $(document).on('click', '.js-neo-logo', function () {

        $('.js-neo-logo img').animate({top:112},function(){
            $('.js-neo-logo').hide();
            $('footer .left').show();
        });

    });


    $('.plan-gallery .photos img').loupe();

    //debug
    /*    setTimeout(function(){
     scrollImage(frames*-1);
     },200)*/
    //end debug

});


function scrollImage(dir) {//движение списка с изображениями
    $('.js-load-progress').hide();
    clearTimeout(highResTimer);

    if ((dir <= 0 && scrollTop > (frames * -1) + 1) || (dir > 0 && scrollTop < 0)) {
        scrollTop = scrollTop + dir;
        $('.js-sequence').css({top: scrollTop * 100 + '%'});
        progress_update();
    }

    if (scrollTop < (frames * -1) + 2) {
        $('.js-video-hedgehog').stop(1, 1).fadeOut(1000, function () {
            $('body').removeClass('overflow');
        });
        $('body').removeClass('video');
        $('.js-content-after-video').fadeIn();
        ga('send', 'event', 'Главная', 'Слайдер', 'Конец');

    }

    highResTimer = setTimeout(function () {
        var i = (scrollTop * -1) + 1
        $('.js-sequence li').eq(i - 1).html('<i style="background-image: url(photos/' + (i) + '.jpg)">')
    }, 100);

    if (scrollTop < 0) {
        $('.js-skip').fadeOut();
        $('.neo-logo-main').fadeOut(800);
        $('.js-use-scroll').fadeOut();
        $('.js-progress').show();
        $('.progress-disable').show();

    }
    else {
        $('.js-skip').fadeIn();
        $('.neo-logo-main').fadeIn(800);
        $('.js-use-scroll').fadeIn();
        $('.js-progress').fadeOut();
        $('.progress-disable').hide();

    }


    if (scrollTop * -1 >= frames / 2 && scrollEvent == 0) {
        ga('send', 'event', 'Главная', 'Слайдер', 'Середина');
        scrollEvent = 1;
    }
    $(window).scrollTop(0);
}

function progress_update() {//прогресс бар с ежом
    var $hedgehog = $('.js-progress a');

    var step = 100 / window.frames;

    var margin = step * window.scrollTop * -1;

    $hedgehog.css({left: margin + '%'});
}

function moveToStart() {
    $(window).scrollTop(0);
    scrollImage(frames);
    $('body').addClass('overflow video');
    $('.js-video-hedgehog').stop(1, 1).show();
    $('.js-content-after-video').hide();
}

function gallery_step(step, gallery) {
    $('.js-mini-photos li.active', gallery).removeClass('active');
    $('.js-mini-photos li', gallery).eq(step).addClass('active');
    if($(window).width() <= mobileWidth ){
        $('.js-photos li', gallery).hide();
        $('.js-photos li', gallery).eq(step).show();
    }
    else {
        $('.js-photos li', gallery).fadeOut();
        $('.js-photos li', gallery).eq(step).fadeIn();
    }

}
