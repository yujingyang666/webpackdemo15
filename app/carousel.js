var $ = require('jquery')

var Carousel = (function () {
    function _Carousel($ct) {
        this.$ct = $ct
        this.init()
        this.bind()

    }
    _Carousel.prototype = {
        init: function () {
            this.$imgct = this.$ct.find('.img-ct')
            this.$barli = this.$ct.find('.bar-ct li')
            this.$firstImg = this.$imgct.find('li').first()
            this.$lastImg = this.$imgct.find('li').last()
            this.imgWidth = this.$firstImg.width()
            this.isAnimate = false
        },
        bind: function () {
            this.barliGetImg()
            var _this = this
            this.$imgct.find('li').eq('0').css('display', 'block')
            this.$imgct.width(this.imgWidth * this.$imgct.find('li').length)
            this.carouselindex = 0;
            this.autoplay()
            this.$ct.find('.arrow-next').on('click', function () {
                _this.turn(_this.carouselindex + 1)
            })
            this.$ct.find('.arrow-pro').on('click', function () {
                _this.turn(_this.carouselindex - 1)
            })
            this.$ct.find('.bar-ct').find('li').on('click', function () {
                var barindex = ($(this).index())
                _this.turn(barindex)
            })
        },
        turn: function (idx) {
            var _this = this
            if (this.isAnimate) {
                return
            }
            if (this.carouselindex === idx) {
                return
            }
            this.isAnimate = true;
            this.$imgct.find('li').eq(this.carouselindex).fadeOut(500)
            if (idx < 0) {
                idx = this.$imgct.find('li').length - 1
            }
            if (idx > this.$imgct.find('li').length - 1) {
                idx = 0
            }
            this.$imgct.find('li').eq(idx).fadeIn(500, function () {
                _this.carouselindex = idx
                _this.$barli.removeClass('active')
                _this.$barli.eq(_this.carouselindex).addClass('active')
                _this.isAnimate = false;

            })
        },
        barliGetImg: function () {
            var _this = this
            this.$imgct.find('li').each(function () {
                _this.$barli.eq($(this).index()).find('img')
                    .attr('src', $(this).find('img').attr('src'))
            })
        },
        autoplay: function () {
            var _this = this
            setInterval(function () {
                _this.turn(_this.carouselindex + 1)
            }, 2000)
        }
    }
    return {
        init: function ($ct) {
            $ct.each(function (index, node) {
                new _Carousel($(node));
            })
        }
    }
})()

//Carousel.init($('.carousel'))
module.exports = Carousel