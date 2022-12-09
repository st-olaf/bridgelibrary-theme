<?php
/**
 * Branding for Bridge Library theme.
 *
 * @since 1.0.0.0
 * @package bridge-library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Custom Branding.
 *
 * @since 1.0.0.0
 */
class Bridge_Library_Branding {

	/**
	 * Register hooks.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Add footer logo.
		add_action( 'astra_footer_content', array( $this, 'footer_branding' ), 5 );
	}

	/**
	 * Add logos to footer.
	 *
	 * @since 1.0.0
	 *
	 * @return void Prints HTML content.
	 */
	public function footer_branding() {
		?>
		<div class="footer-branding">
			<div class="logo bridge"><img src="<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/img/logo-bridge-library.svg" alt="Broadening the Bridge logo" /></div>
		</div>
		<?php
	}
}
new Bridge_Library_Branding();
