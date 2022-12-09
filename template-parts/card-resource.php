<?php
/**
 * Template part for displaying resources.
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

if ( isset( $force_favorite ) && $force_favorite ) {
	$favorite = true;
} else {
	$favorite = Bridge_Library_Users::get_instance()->has_favorited_post( get_the_ID() );
}

?>

<div class="card resource <?php echo $favorite ? 'favorited' : ''; ?>">
	<div class="favorite" data-id="<?php echo get_the_ID(); ?>" data-nonce="<?php echo esc_attr( wp_create_nonce( 'favorite-' . get_the_ID() ) ); ?>">
		<div title="<?php $favorite ? esc_html_e( 'Remove Favorite', 'bridge-library' ) : esc_html_e( 'Mark as Favorite', 'bridge-library' ); ?>">
			<div class="dashicons dashicons-heart"></div>
		</div>
	</div>
	<h3 class="title"><a href="<?php echo esc_url( get_field( 'url' ) ); ?>"><?php the_title(); ?></a></h3>
	<?php
	$meta = array(
		get_field( 'author' ),
		get_field( 'publication_year' ),
		implode( ', ', wp_list_pluck( get_the_terms( get_the_ID(), 'resource_format' ), 'name' ) ),
	);

	if ( ! empty( $meta ) ) {
		echo '<p class="meta">' . wp_kses_post( implode( '<br/>', array_filter( $meta ) ) ) . '</p>';
	}
	?>
</div>
