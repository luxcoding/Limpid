head.ready(function() {
 
  $(document).ready(function() {
    // scrolling site
    if ($(window).width() > 961) {
      var pepe = $.fn.fullpage({
        slidesColor: ['#fff', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage', 'lastPage'],
        menu: '#menu'
      });
    }
    if ($(window).width() < 960) {
      var pepe = $.fn.fullpage({
        slidesColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage', 'lastPage'],
        menu: '#menu',
        autoScrolling: false
      });
    }

    //resize
    function res() {
      var innerHeight = $('#section1').height();
      $('.section2').css('height',innerHeight);
    }
    res();
    $(window).resize(function(){
      res();
    });

    //tab
    function tab() {
      $(".js-tab").each(function(){
        var tab_link = $(this).find("a");
        var tab_item = $(this).find("li");
        var tab_cont = $(this).parents(".js-tab-group").find(".js-tab-cont");
        tab_cont.hide();
        tab_item.first().addClass("is-active");
        $(this).parents(".js-tab-group").find(".js-tab1").fadeIn();
        tab_link.on("click", function() {
          var index = $(this).attr("href");
          tab_item.removeClass("is-active");
          $(this).parent().addClass("is-active");
          tab_cont.hide();
          $(this).parents(".js-tab-group").find("."+index).fadeIn();
          return false;
        });
        });
    } tab();
    // change slide for #section3
    $('.covering-media-img').hide();
    $('.js-covering-media-1').show();

    $('.js-covering-list-1').on('click', function() {
      $('.covering-media-img').hide();
      $('.js-covering-media-1').show();
      $('.covering-list-item').removeClass('is-active');
      $(this).addClass('is-active');
    });
    $('.js-covering-list-2').on('click', function() {
      $('.covering-media-img').hide();
      $('.js-covering-media-2').show();
      $('.covering-list-item').removeClass('is-active');
      $(this).addClass('is-active');
    });
    $('.js-covering-list-3').on('click', function() {
      $('.covering-media-img').hide();
      $('.js-covering-media-3').show();
      $('.covering-list-item').removeClass('is-active');
      $(this).addClass('is-active');
    });
    // change slide for #section4
    $( ".m-riverina" ).hover(
      function() {
        $( '.bowls-media-item' ).removeClass( "is-active" );
        $( '.bowls-media-riverina' ).addClass( "is-active" );
        $( '.bowls-item' ).removeClass( "is-active" )
        $( this ).addClass( "is-active" )
      }
    );
    $( ".m-xtrainer" ).hover(
      function() {
        $( '.bowls-media-item' ).removeClass( "is-active" );
        $( '.bowls-media-xtrainer' ).addClass( "is-active" );
        $( '.bowls-item' ).removeClass( "is-active" )
        $( this ).addClass( "is-active" )
      }
    );
    $( ".m-java" ).hover(
      function() {
        $( '.bowls-media-item' ).removeClass( "is-active" );
        $( '.bowls-media-java' ).addClass( "is-active" );
        $( '.bowls-item' ).removeClass( "is-active" )
        $( this ).addClass( "is-active" )
      }
    );
    $( ".m-vogue" ).hover(
      function() {
        $( '.bowls-media-item' ).removeClass( "is-active" );
        $( '.bowls-media-vogue' ).addClass( "is-active" );
        $( '.bowls-item' ).removeClass( "is-active" )
        $( this ).addClass( "is-active" )
      }
    );
    $( ".m-briliant" ).hover(
      function() {
        $( '.bowls-media-item' ).removeClass( "is-active" );
        $( '.bowls-media-briliant' ).addClass( "is-active" );
        $( '.bowls-item' ).removeClass( "is-active" )
        $( this ).addClass( "is-active" )
      }
    );

    // slick
    $('.responsive').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 970,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
      ]
    });
  });

  $('.bowls-item-btn').on('click', function() {
    $('.contact').fadeIn();
  });

});
