var $ = require('jquery')

var GoTop = (function () {

    function _GoTop() {
        this.init()
        this.bind()
    }

    _GoTop.prototype = {
        init: function () {
            var html
            html = '<div id="top">^</div>'
            this.top = $(html)
        },
        bind: function () {
            var _this = this
            this.lock = false
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 200 && _this.lock === false) {
                    $('body').append(_this.top)
                    _this.lock = true
                }
                if ($(window).scrollTop() < 200 && _this.lock === true) {
                    $('#top').remove()
                    _this.lock = false
                }
            }) 
            $('body').on('click', '#top', function (e) {
                e.stopPropagation()
                $('html,body').animate({
                    scrollTop: 0
                }, 200, function () {
                    $('#top').remove()
                    _this.lock = false
                });
            })
        }
    }

    return {
        init: function () {
            new _GoTop()
        }
    }
})()

module.exports = GoTop