<?php
/**
 * Template part for displaying loans.
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

?>

<div class="card loan">
	<h3 class="title">
		<?php echo esc_attr( $loan->title ); ?>
	</h3>
	<ul class="meta">
		<li class="important">
			<?php
			echo esc_attr( sprintf( 'Due date: %s', ( new DateTime( $loan->due_date ) )->format( 'F j, Y' ) ) );
			?>
		</li>
	</ul>
</div>
