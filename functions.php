<?php
/**
 * Bridge Library theme functions
 *
 * @package bridge-library
 */

/**
 * Branding.
 *
 * @since 1.0.0.0
 */
require_once 'inc/class-bridge-library-branding.php';

/**
 * Content.
 *
 * @since 1.0.0.0
 */
require_once 'inc/class-bridge-library-content.php';

/**
 * Enqueue custom styles.
 *
 * @since 1.0.0.0
 *
 * @return void
 */
function bridge_custom_assets() {
	wp_enqueue_style( 'bridge-child-styles', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), wp_get_theme()->get( 'Version' ) );
	wp_enqueue_style( 'source-sans-pro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i&display=swap' ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	wp_register_script( 'bridge-graphql-main', get_stylesheet_directory_uri() . '/assets/js/main.js', array(), wp_get_theme()->get( 'Version' ), true );
	wp_register_script( 'bridge-graphql-react', get_stylesheet_directory_uri() . '/assets/js/1.chunk.js', array(), wp_get_theme()->get( 'Version' ), true );
}
add_action( 'wp_enqueue_scripts', 'bridge_custom_assets' );

/**
 * Add div#root for React.
 */
add_action(
	'astra_content_top',
	function() {
		echo '<div id="root">';
	}
);

/**
 * Close div#root.
 */
add_action(
	'astra_content_bottom',
	function() {
		echo '</div><!-- div#root -->';
	}
);

/**
 * Get cache timestamp.
 *
 * @since 1.0.0.0
 *
 * @param string $type    CPT type.
 * @param int    $user_id WP user ID.
 *
 * @return int            Unix timestamp.
 */
function bridge_get_timestamp( $type, $user_id ) {
	$cache_date = get_field( $type . '_cache_updated', 'user_' . $user_id );
	if ( ! $cache_date ) {
		$cache_date = time();
	}

	return $cache_date;
}

/**
 * Add related resources to single course views.
 *
 * @since 1.0.0
 */
function single_course() {
	global $post;
	if ( is_singular( 'course' ) ) {
		$core_resources = get_field( 'core_resources' );
		if ( ! empty( $core_resources ) ) {
			$core_resources = array_unique( $core_resources );
			$original_post  = $post;

			echo '<h2>Core Resources</h2>';
			echo '<div class="card-container">';
			foreach ( $core_resources as $resource_id ) {
				$post = get_post( $resource_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride
				include 'template-parts/card-resource.php';
			}
			echo '</div>';

			$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
		}

		$related_resources = get_field( 'related_courses_resources' );
		if ( ! empty( $related_resources ) ) {
			$related_resources = array_unique( $related_resources );
			$original_post     = $post;

			echo '<h2>Related Resources</h2>';
			echo '<div class="card-container">';
			foreach ( $related_resources as $resource_id ) {
				$post = get_post( $resource_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride
				include 'template-parts/card-resource.php';
			}
			echo '</div>';

			$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
		}

		$librarians = get_field( 'librarians' );
		if ( ! empty( $librarians ) ) {
			$librarians    = array_unique( $librarians );
			$original_post = $post;

			echo '<h2>Librarians</h2>';
			echo '<div class="card-container">';
			foreach ( $librarians as $librarian_id ) {
				$post = get_post( $librarian_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride
				include 'template-parts/card-resource.php';
			}
			echo '</div>';

			$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
		}
	}
}
add_action( 'astra_entry_content_single', 'single_course', 11 );

/**
 * Add related courses to single course views.
 *
 * @since 1.0.0
 */
function single_resource() {
	global $post;
	if ( is_singular( 'resource' ) ) {
		$courses = get_field( 'related_courses_resources' );
		if ( ! empty( $courses ) ) {
			$courses       = array_unique( $courses );
			$original_post = $post;

			echo '<h2>Related Courses</h2>';
			echo '<div class="card-container">';
			foreach ( $courses as $course_id ) {
				$post = get_post( $course_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride
				include 'template-parts/card-course.php';
			}
			echo '</div>';

			$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
		}
	}
}
add_action( 'astra_entry_content_single', 'single_resource', 11 );
