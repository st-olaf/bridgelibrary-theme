<?php
/**
 * Template part for displaying resources.
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

?>

<div class="card resource <?php echo ( isset( $favorite ) && $favorite ) ? 'favorited' : ''; ?>">
	<div class="favorite" data-id="<?php echo get_the_ID(); ?>" data-nonce="<?php echo esc_attr( wp_create_nonce( 'favorite-' . get_the_ID() ) ); ?>">
		<div title="<?php ( isset( $favorite ) && $favorite ) ? esc_html_e( 'Remove Favorite', 'bridge-library' ) : esc_html_e( 'Mark as Favorite', 'bridge-library' ); ?>">
			<div class="dashicons dashicons-heart"></div>
		</div>
	</div>
	<h3 class="title"><a href="<?php echo esc_url( get_field( 'url' ) ); ?>"><?php the_title(); ?></a></h3>
</div>
