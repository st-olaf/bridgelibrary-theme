<?php
/**
 * Template part for displaying resources.
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

$meta = array(
	'author'           => 'Author',
	'isbn'             => 'ISBN',
	'publication_year' => 'Publication Year',
);

?>

<div class="card resource">
	<h3 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
	<?php
	$image_url        = get_field( 'image_url' );
	$primo_image_url  = get_field( 'primo_image_url' );
	$primo_image_info = get_field( 'primo_image_info' );

	if ( ! empty( $image_url ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="manual image" src="' . esc_url( $image_url ) . '" alt="Manually-supplied image for ' . esc_attr( get_the_title() ) . '" /></a>';
	} elseif ( ! empty( $primo_image_url ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="primo image" src="' . esc_url( $primo_image_url ) . '" alt="primo image" /></a>';
	} elseif ( ! empty( $primo_image_info ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="primo callback" src="' . esc_url( $primo_image_info ) . '" alt="primo image" /></a>';
	}

	$types  = get_the_terms( get_the_ID(), 'resource_type' );
	$format = get_the_terms( get_the_ID(), 'resource_format' );

	?>
	<p class="link"><a target="_blank" href="<?php the_field( 'url' ); ?>">Visit Resource</a></p>
	<ul class="meta">
		<?php
		foreach ( $meta as $key => $label ) {
			if ( ! empty( get_field( $key ) ) ) {
				echo '<li class="' . esc_attr( $key ) . '">' . esc_attr( $label ) . ': ';
				the_field( $key );
				echo '</li>';
			}
		}
		?>
	</ul>
	<p class="description"><?php the_content(); ?></p>
	<p class="link"><a target="_blank" href="<?php the_field( 'url' ); ?>">Visit Resource</a></p>
</div>
