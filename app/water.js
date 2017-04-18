var $ =require('jquery')


    var Water = (function () {
        function _Water($ct) {
            this.$ct = $ct
            this.init()
            this.bind()
        }

        _Water.prototype = {
            init: function () {
                this.colLength = parseInt(this.$ct.width() / 220)
                this.boxarr = []
                for (var i = 0; i < this.colLength; i++) {
                    this.boxarr[i] = 0;
                }
                this.render()
            },
            render: function () {
                var urls = getImgUrls(8)
                var _this = this
                $(urls).each(function (index, url) {
                    var html = '';
                    html += '<div class="pbimg-box">'
                    html += '<img src="' + url + '" alt="" /></div>'
                    var dom = $(html)
                    _this.$ct.find('.water').append(dom)
                    dom.find("img").on('load',function () { 
                        _this.flowingWater(dom)
                    })
                })
                this.lock = false
            },
            flowingWater: function (data) {
                var _this = this
                var minVal = Math.min.apply(null, _this.boxarr)
                var minIdx = this.boxarr.indexOf(minVal)
                $(data).css({
                    top: _this.boxarr[minIdx],
                    left: $(data).outerWidth(true) * minIdx
                })
                this.boxarr[minIdx] += $(data).outerHeight(true)
                this.$ct.find('.water').css({
                    height: _this.boxarr[minIdx]
                })
            },
            bind: function () {
                var _this = this
                this.lock = false
                $('#load').on('click', function (e) {
                    e.preventDefault()
                    if (_this.lock === false) {
                        _this.lock = true
                        _this.render()
                    }


                })
            }

        }

        function getImgUrls(num) {
            var width, height, urls = []
            for (var i = 0; i < num; i++) {
                width = 200;
                height = Math.floor(Math.random() * 60 + 200);
                urls.push('https://unsplash.it/' + width + '/' + height)

            }
            return urls;
        }
        return {
            init: function ($ct) {
                new _Water($ct)
            }
        }
    })()

    //Water.init($('.pb-content'))
    
module.exports =  Water