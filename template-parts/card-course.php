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

	if ( ! empty( $image_url ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="manual image" src="' . esc_url( $image_url ) . '" alt="Manually-supplied image for ' . esc_attr( get_the_title() ) . '" /></a>';
	} elseif ( ! empty( $primo_image_url ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="primo image" src="' . esc_url( $primo_image_url ) . '"alt="primo" /></a>';
	} elseif ( ! empty( $primo_image_info ) ) {
		echo '<a href="' . esc_url( get_the_permalink() ) . '"><img class="primo callback" src="' . esc_url( $primo_image_info ) . '" alt="callback" /></a>';
	}

	$departments = get_the_terms( get_the_ID(), 'academic_department' );
	$terms       = get_the_terms( get_the_ID(), 'course_term' );

	?>
	<ul class="meta">
		<li class="term"><?php echo wp_kses_post( _n( 'Term: ', 'Terms: ', count( $terms ), 'bridge-library' ) . ' ' . implode( ', ', wp_list_pluck( $terms, 'name' ) ) ); ?></li>
		<li class="department"><?php echo wp_kses_post( _n( 'Department: ', 'Departments: ', count( $departments ), 'bridge-library' ) . ' ' . implode( ', ', wp_list_pluck( $departments, 'name' ) ) ); ?></li>
	</ul>
	<p class="description"><?php the_content(); ?></p>
</div>
