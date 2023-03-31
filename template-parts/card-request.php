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
		<?php echo esc_attr( $request->title ); ?>
	</h3>
	<ul class="meta">
		<li>
			<?php
			echo esc_attr( ucfirst( strtolower( str_replace( '_', ' ', $request->request_status ) ) ) );
			?>
		</li>
	</ul>
</div>
