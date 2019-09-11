<?php
/**
 * Template part for displaying librarians.
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

$related_user = get_field( 'librarian_user_id' );
if ( is_object( $related_user ) ) {

	$meta = array(
		'librarian_email_address'   => 'Email Address',
		'librarian_phone_number'    => 'Phone Number',
		'librarian_office_location' => 'Office Location',
	);

	?>

	<div class="card librarian">
		<h3 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<?php
		$picture_url  = get_field( 'librarian_picture_url', 'user_' . $related_user->ID );
		$google_url   = get_field( 'picture_url', 'user_' . $related_user->ID );
		$avatar_url   = get_avatar_url( $related_user->ID );

		echo '<a href="' . esc_url( get_the_permalink() ) . '">';
		if ( ! empty( $picture_url ) ) {
			echo '<img class="manual image" src="' . esc_url( $picture_url ) . '" />';
		} elseif ( ! empty( $google_url ) ) {
			echo '<img class="google image" src="' . esc_url( $google_url ) . '" />';
		} elseif ( ! empty( $avatar_url ) ) {
			echo '<img class="avatar image" src="' . esc_url( $avatar_url ) . '" />';
		}
		echo '</a>';
		?>
		<ul class="meta">
			<?php
			foreach ( $meta as $key => $label ) {
				if ( ! empty( get_field( $key, 'user_' . $related_user->ID ) ) ) {
					echo '<li class="' . esc_attr( $key ) . '">' . esc_attr( $label ) . ': ';
					the_field( $key, 'user_' . $related_user->ID );
					echo '</li>';
				}
			}
			?>
		</ul>
		<p class="description"><?php the_field( 'biography', 'user_' . $related_user->ID ); ?></p>
	</div>
	<?php
}