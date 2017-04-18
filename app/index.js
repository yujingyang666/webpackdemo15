var $ = require('jquery')
var GoTop = require("./goTop.js")
var Carousel = require("./carousel.js")
var Water = require("./water.js")


GoTop.init()
Carousel.init($('.carousel'))
Water.init($('.pb-content'))