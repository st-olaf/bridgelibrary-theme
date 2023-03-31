'use strict';

(function($) {
	$(document).ready(function() {

		/**
		 * Collapse any collapsible sections.
		 */
		$('.card-container.collapsible').each(function(index, element) {
			if ($(element).find('.card').length > 6) {
				$(element).find('.card:nth-child(6n) ~ .card').addClass('collapsible-hidden');
				$(element).after('<button class="expand-hidden-cards">Expand</button>');
			}
		});
	});

	$(document).on('click', '.expand-hidden-cards', function(event) {
		$(this).parent().find('.card-container.collapsible .card.collapsible-hidden').removeClass('collapsible-hidden');
		$(this).addClass('collapsible-hidden');
	});
}(jQuery));
