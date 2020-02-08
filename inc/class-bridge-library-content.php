<?php
/**
 * Content for Bridge Library theme.
 *
 * @since 1.0.0.0
 * @package bridge-library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Custom Content.
 *
 * @since 1.0.0.0
 */
class Bridge_Library_Content {

	/**
	 * CPTs to display use React.
	 *
	 * @since 1.0.0
	 *
	 * @var array $post_types
	 */
	public $post_types = array(
		'course',
		'resource',
		'librarian',
	);

	/**
	 * Load action hooks.
	 *
	 * @since 1.0.0.0
	 */
	public function __construct() {

		// Hook into page content.
		add_action( 'astra_entry_content_after', array( $this, 'page_content' ) );
		add_action( 'astra_entry_content_404_page', array( $this, 'page_content' ) );
	}

	/**
	 * Display custom page content.
	 *
	 * @since 1.0.0.0
	 *
	 * @return void Prints content.
	 */
	public function page_content() {
		if ( is_front_page() && ! is_user_logged_in() ) {
            echo '<p>Please <a href="/wp-login.php?gaautologin=true&redirect_to=https://my.bridgelibraries.org/"><img src="https://my.bridgelibraries.org/wp-content/plugins/googleappslogin-premium/img/btn_google_signin_dark_normal_web.png"></a> using your college Gmail account.</p>';
		} else {
			get_template_part( 'template-parts/react', 'none' );
		}
	}

}

new Bridge_Library_Content();
