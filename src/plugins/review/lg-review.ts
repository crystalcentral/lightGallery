/**
 * lightGallery review module
 * Supports Trustpilot product review
 */

import { lGEvents } from '../../lg-events';
import { LgQuery } from '../../lgQuery';
import { LightGallery } from '../../lightgallery';
import { reviewSettings, ReviewSettings } from './lg-review-settings';

export default class ReviewBox {
    core: LightGallery;
    settings: ReviewSettings;
    private $LG!: LgQuery;
    constructor(instance: LightGallery, $LG: LgQuery) {
        // get lightGallery core plugin instance
        this.core = instance;
        this.$LG = $LG;

        // extend module default settings with lightGallery core settings
        this.settings = { ...reviewSettings, ...this.core.settings };

        return this;
    }

    public init(): void {
        if (!this.settings.reviewBox) {
            return;
        }
        this.setMarkup();
        this.toggleReviewBox();

        this.addReviews();
    }

    private setMarkup() {
        this.core.outer.addClass('lg-has-review');
        this.core.outer.append(this.settings.reviewsMarkup);

        const reviewToggleBtn = `<button type="button" aria-label="${this.settings.reviewPluginStrings['toggleReviews']}" class="lg-review-toggle lg-icon"></button>`;
        this.core.$toolbar.append(reviewToggleBtn);
    }

    toggleReviewBox(): void {
        this.core.outer
            .find('.lg-review-toggle')
            .first()
            .on('click.lg.review', () => {
                this.core.outer.toggleClass('lg-review-active');
            });

        this.core.outer
            .find('.lg-review-overlay')
            .first()
            .on('click.lg.review', () => {
                this.core.outer.removeClass('lg-review-active');
            });
        this.core.outer
            .find('.lg-review-close')
            .first()
            .on('click.lg.review', () => {
                this.core.outer.removeClass('lg-review-active');
            });
    }

    addReviews() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this;
        this.core.LGel.on(`${lGEvents.beforeSlide}.review`, (event) => {
            const html =
                '<h2>Review Title</h2><div>Review details blah...</div>';
            this.core.outer.find('.lg-review-body').html(html as string);
        });
        this.core.LGel.on(`${lGEvents.afterSlide}.review`, function () {
            console.log(`${lGEvents.afterSlide}.review`);
        });
    }

    destroy(): void {
        this.core.LGel.off('.lg.review');
        this.core.LGel.off('.review');
    }
}
