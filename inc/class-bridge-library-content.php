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

		add_filter( 'the_content', array( $this, 'remove_content_if_logged_in' ) );
		add_action( 'do_graphql_request', array( $this, 'unhook_loading_content' ) );
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
			echo '<p id="bridge-login">Please <a href="' . esc_url( home_url( '/wp-login.php?gaautologin=true&redirect_to=' . home_url() ) ) . '"><img src="' . esc_url( get_stylesheet_directory_uri() . '/assets/img/sign-in-with-google.png' ) . '" alt="Sign in with Google" /></a> using your college Gmail account.</p>';
		} elseif ( is_user_logged_in() && ( is_front_page() || in_array( get_post_type(), $this->post_types, true ) ) ) {
			get_template_part( 'template-parts/react', 'none' );
		}
	}

	/**
	 * Remove content hook during GraphQL request.
	 *
	 * @return void
	 */
	public function unhook_loading_content() {
		remove_filter( 'the_content', array( $this, 'remove_content_if_logged_in' ) );
	}

	/**
	 * Filter out content if logged in.
	 *
	 * @param string $content Page Content.
	 * @return string Return content.
	 */
	public function remove_content_if_logged_in( $content ) {
		if ( in_array( get_post_type(), $this->post_types, true ) && is_user_logged_in() ) {
			$content = '<h3> Loading... </h3>';
		}

		return $content;
	}
}

new Bridge_Library_Content();
