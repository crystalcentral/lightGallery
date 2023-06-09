/*!
 * lightgallery | 2.7.1 | June 9th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgReview = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * List of lightGallery events
     * All events should be documented here
     * Below interfaces are used to build the website documentations
     * */
    var lGEvents = {
        afterAppendSlide: 'lgAfterAppendSlide',
        init: 'lgInit',
        hasVideo: 'lgHasVideo',
        containerResize: 'lgContainerResize',
        updateSlides: 'lgUpdateSlides',
        afterAppendSubHtml: 'lgAfterAppendSubHtml',
        beforeOpen: 'lgBeforeOpen',
        afterOpen: 'lgAfterOpen',
        slideItemLoad: 'lgSlideItemLoad',
        beforeSlide: 'lgBeforeSlide',
        afterSlide: 'lgAfterSlide',
        posterClick: 'lgPosterClick',
        dragStart: 'lgDragStart',
        dragMove: 'lgDragMove',
        dragEnd: 'lgDragEnd',
        beforeNextSlide: 'lgBeforeNextSlide',
        beforePrevSlide: 'lgBeforePrevSlide',
        beforeClose: 'lgBeforeClose',
        afterClose: 'lgAfterClose',
        rotateLeft: 'lgRotateLeft',
        rotateRight: 'lgRotateRight',
        flipHorizontal: 'lgFlipHorizontal',
        flipVertical: 'lgFlipVertical',
        autoplay: 'lgAutoplay',
        autoplayStart: 'lgAutoplayStart',
        autoplayStop: 'lgAutoplayStop',
    };

    var reviewSettings = {
        reviewBox: false,
        reviewsMarkup: '<div id="lg-review-box" class="lg-review-box"><div class="lg-review-header"><h3 class="lg-review-title">Customer Review</h3><span class="lg-review-close lg-icon"></span></div><div class="lg-review-body"></div></div>',
        reviewPluginStrings: {
            toggleReviews: 'Toggle Reviews',
        },
    };

    /**
     * lightGallery review module
     * Supports Trustpilot product review
     */
    var ReviewBox = /** @class */ (function () {
        function ReviewBox(instance, $LG) {
            // get lightGallery core plugin instance
            this.core = instance;
            this.$LG = $LG;
            // extend module default settings with lightGallery core settings
            this.settings = __assign(__assign({}, reviewSettings), this.core.settings);
            return this;
        }
        ReviewBox.prototype.init = function () {
            if (!this.settings.reviewBox) {
                return;
            }
            this.setMarkup();
            this.toggleReviewBox();
            this.addReviews();
        };
        ReviewBox.prototype.setMarkup = function () {
            this.core.outer.addClass('lg-has-review');
            this.core.outer.append(this.settings.reviewsMarkup);
            var reviewToggleBtn = "<button type=\"button\" aria-label=\"" + this.settings.reviewPluginStrings['toggleReviews'] + "\" class=\"lg-review-toggle lg-icon\"></button>";
            this.core.$toolbar.append(reviewToggleBtn);
        };
        ReviewBox.prototype.toggleReviewBox = function () {
            var _this_1 = this;
            this.core.outer
                .find('.lg-review-toggle')
                .first()
                .on('click.lg.review', function () {
                _this_1.core.outer.toggleClass('lg-review-active');
            });
            this.core.outer
                .find('.lg-review-overlay')
                .first()
                .on('click.lg.review', function () {
                _this_1.core.outer.removeClass('lg-review-active');
            });
            this.core.outer
                .find('.lg-review-close')
                .first()
                .on('click.lg.review', function () {
                _this_1.core.outer.removeClass('lg-review-active');
            });
        };
        ReviewBox.prototype.addReviews = function () {
            var _this_1 = this;
            this.core.LGel.on(lGEvents.beforeSlide + ".review", function (event) {
                var html = '<h2>Review Title</h2><div>Review details blah...</div>';
                _this_1.core.outer.find('.lg-review-body').html(html);
            });
            this.core.LGel.on(lGEvents.afterSlide + ".review", function () {
                console.log(lGEvents.afterSlide + ".review");
            });
        };
        ReviewBox.prototype.destroy = function () {
            this.core.LGel.off('.lg.review');
            this.core.LGel.off('.review');
        };
        return ReviewBox;
    }());

    return ReviewBox;

})));
//# sourceMappingURL=lg-review.umd.js.map
