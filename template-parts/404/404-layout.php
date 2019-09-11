<?php
/**
 * Template for 404
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2019, Astra
 * @link        https://wpastra.com/
 * @since       Astra 1.0.0
 */

?>
<div class="ast-404-layout-1">

	<?php astra_the_title( '<header class="page-header"><h1 class="page-title">', '</h1></header><!-- .page-header -->' ); ?>

	<div class="page-content">

		<div class="page-sub-title">
			Loading.
		</div>

		<p>If the page doesn’t load after a couple of seconds, this content likely doesn’t exist.</p>

		<div class="ast-404-search">
			<?php the_widget( 'WP_Widget_Search' ); ?>
		</div>

	</div><!-- .page-content -->
</div>
