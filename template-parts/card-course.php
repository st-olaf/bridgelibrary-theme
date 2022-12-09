<?php
/**
 * Template part for displaying courses.
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

?>

<div class="card course">
	<h3 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
	<?php
	$image_url        = get_field( 'image_url' );
	$primo_image_url  = get_field( 'primo_image_url' );
	$primo_image_info = get_field( 'primo_image_info' );

	display_course_meta();

	if ( ! empty( $image_url ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="manual image" src="' . esc_url( $image_url ) . '" alt="Manually-supplied image for ' . esc_attr( get_the_title() ) . '" /></a>';
	} elseif ( ! empty( $primo_image_url ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="primo image" src="' . esc_url( $primo_image_url ) . '" alt="Primo-supplied image for ' . esc_attr( get_the_title() ) . '" /></a>';
	} elseif ( ! empty( $primo_image_info ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="primo callback" src="' . esc_url( $primo_image_info ) . '" alt="Image from Google Books for ' . esc_attr( get_the_title() ) . '" /></a>';
	}
	?>
</div>
