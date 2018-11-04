$(function() {

    // инициализируем постраничную прокрутку
    $.scrollify({
        section:".panel",
        scrollbars:false,
        before: function(i,panels) {

            var ref = panels[i].attr("data-section-name");
            $(".pagination a.active").removeClass("active");
            $('.pagination a[href="#' + ref + '"]').addClass("active");

        },

        after:function(i,panels) {},

    });

    $(".pagination a").on("click",function() {
        $.scrollify.move($(this).attr("href"));
    });

    // аккордеон
    var allPanels = $('.work__content');

    $('.work__tab').click(function() {
        allPanels.slideUp();

        $(this).closest('.work__list').find('.active').removeClass('active');
        $(this).closest('.work__item').addClass('active');

        $(this).parent('.work__item').find('.work__content').slideDown();
        return false;
    });


    // слайдер
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });

    // маска телефона
    $("#phone").mask("+7 (999) 999-9999");

    // пользовательское соглашение
    $('.checkbox').on('click', function(){

        let checkInput = $(this);
        let submitBtn = $(this).closest('form').find('button');

        if(checkInput.is(':checked')) {
            submitBtn.prop('disabled', false);
        } else {
            submitBtn.prop('disabled', true);
        }
    });

    // валидация формы
    function checkForm(form) {

        var checkResult = true;
        form.find('.error').removeClass('error');
        form.find('input, textarea, select').each(function () {
            if ($(this).attr('required')) {

                switch ($(this).attr('type')) {
                    case 'tel':
                        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                        if (!re.test($(this).val())) {
                            $(this).addClass('error');
                            checkResult = false;
                        }else {
                            $(this).removeClass('error');
                        }
                        break;
                    case 'email':

                        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                        if (!re.test($(this).val())) {

                            $(this).addClass('error');
                            checkResult = false;
                        }else {
                            $(this).removeClass('error');
                        }
                        break;
                    default:
                        if ($.trim($(this).val()) === '') {

                            $(this).addClass('error');
                            checkResult = false;
                        } else {
                            $(this).removeClass('error');
                        }
                        break;
                }

            }
        });

        return checkResult;

    };


    $('form').submit(function(){

        let form = $(this);

        if(checkForm(form)) {
            alert('Сообщение ушло');
            form[0].reset();
            form.find('button').prop('disabled', true);
        } else {
            console.log('Валидация не прошла')
        }

        return false;

    });

    // карта
    var myMap;

    ymaps.ready(init);

    function init () {

        myMap = new ymaps.Map('map', {
            center: [55.164729, 61.392577],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        });


        var mark = [
            new ymaps.Placemark(
                [55.161469, 61.374806], {
                    balloonContent: '<p class="map-title">Цифровой Элемент</p><span>ул. Энтузиастов, 2, ОЦ Ктиам, 2 этаж, офис 200</span>',
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }
            ),
            new ymaps.Placemark(
                [55.168654, 61.406160], {
                    balloonContent: '<p class="map-title">Antida software</p><span>ул. Труда, 78, ДЦ Ньютон, Этаж 5, офис 504</span>',

                }, {
                    preset: 'islands#icon',
                    iconColor: '#000'
                }
            )
        ];

        mark.forEach(function (item) {
            myMap.geoObjects.add(item);
        });
    }

});
