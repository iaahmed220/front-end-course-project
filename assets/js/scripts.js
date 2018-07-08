'use strict';
var Voyage = {
    init            : function (conf) {
        this.config = conf;
        this.runMethod();
        this.handelSlider();
    },
    runMethod       : function () {
        this.config.search.on('click', this.handelSearch);
        this.config.sliderNext.on('click', this.handelSliderNext);
        this.config.sliderBack.on('click', this.handelSliderBack);
    },
    handelSearch    : function (e) {
        var isInput         = !$(e.target).is('.form-element');
        var isClosestSearch = $(e.target).parents('li.search').length > 0;
        var isHideInput     = $(this).find('span:hidden').length > 0;

        if ( (isInput && isClosestSearch) || isHideInput ) {
            $(this).children('span').toggle(500);
        }
    },
    handelSlider    : function () {
        var Self = this;
        Self['TIMER'] = setInterval(function () {
            var ActiveSlider = Self.config.slider.find('li.active');
            if (ActiveSlider.next('li').length !== 0) {
                ActiveSlider.next('li').addClass('active');
                ActiveSlider.removeClass('active');
            }else{
                Self.config.slider.find('li:first').addClass('active');
                ActiveSlider.removeClass('active');
            }
        }, 1000);
    },
    handelSliderNext: function () {
         clearInterval(Voyage.TIMER);
    },
    handelSliderBack: function () {
        clearInterval(Voyage.TIMER);
    }
};

Voyage.init({
    search      : $('nav ul li.search a'),
    slider      : $('#slider ul'),
    sliderNext  : $('#slider .control .next'),
    sliderBack  : $('#slider .control .previous')
});