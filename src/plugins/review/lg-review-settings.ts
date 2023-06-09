export interface ReviewStrings {
    toggleReviews: string;
}

export interface ReviewSettings {
    /**
     * Enable review box
     */
    reviewBox: boolean;

    /**
     * Facebook reviews default markup
     */
    reviewsMarkup: string;

    /**
     * Custom translation strings for aria-labels
     */
    reviewPluginStrings: ReviewStrings;
}

export const reviewSettings: ReviewSettings = {
    reviewBox: false,
    reviewsMarkup:
        '<div id="lg-review-box" class="lg-review-box"><div class="lg-review-header"><h3 class="lg-review-title">Customer Review</h3><span class="lg-review-close lg-icon"></span></div><div class="lg-review-body"></div></div>',
    reviewPluginStrings: {
        toggleReviews: 'Toggle Reviews',
    } as ReviewStrings,
};
