<?php
/**
 * Bridge Library theme functions
 *
 * @package bridge-library
 */

/**
 * Assets.
 *
 * @since 1.0.0.0
 */
require_once 'inc/class-bridge-library-assets.php';

/**
 * Branding.
 *
 * @since 1.0.0.0
 */
require_once 'inc/class-bridge-library-branding.php';

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

	Bridge_Library_Assets::get_instance()->register_assets();
}
add_action( 'wp_enqueue_scripts', 'bridge_custom_assets' );

/**
 * Get cache timestamp.
 *
 * @since 1.0.0.0
 *
 * @param string $type    CPT type.
 * @param int    $user_id WP user ID.
 *
 * @return DateTime            Unix timestamp.
 */
function bridge_get_timestamp( $type, $user_id ) {
	$cache_date = get_field( $type . '_cache_updated', 'user_' . $user_id );
	if ( ! $cache_date ) {
		$cache_date = time();
	}

	return DateTime::createFromFormat( 'U', $cache_date );
}

/**
 * Displa the user’s home content.
 *
 * @since 1.3.0
 *
 * @param string $content Content.
 *
 * @return string
 */
function display_home_content( string $content ) {
	if ( ! is_user_logged_in() ) {
		return $content . '<p id="bridge-login">Please <a href="' . esc_url( home_url( '/wp-login.php?gaautologin=true&redirect_to=' . home_url() ) ) . '"><img src="' . esc_url( get_stylesheet_directory_uri() . '/assets/img/sign-in-with-google.png' ) . '" alt="Sign in with Google" /></a> using your college Gmail account.</p>';
	}

	global $post;
	$user_id       = get_current_user_id();
	$original_post = $post;

	// Prevent recursive filtering.
	remove_filter( 'the_content', 'display_home_content' );

	// Load content.
	$user_favorites  = array_filter( (array) get_field( 'user_favorites', 'user_' . $user_id ) );
	$courses         = array_filter( (array) get_field( 'courses', 'user_' . $user_id ) );
	$primo_favorites = array_filter( (array) get_field( 'primo_favorites', 'user_' . $user_id ) );

	ob_start();

	if ( $user_favorites ) {
		?>
		<div class="bridge-card-container">
			<h2><?php esc_html_e( 'Favorite Resources', 'bridge-library' ); ?></h2>
			<p class="meta">
				<?php
				// Translators: %s is the timestamp.
				echo esc_attr( sprintf( __( 'Last updated: %s', 'bridge-library' ), bridge_get_timestamp( 'user_favorite', $user_id )->format( 'F j, Y g:i:s a' ) ) );
				?>
			</p>
			<div class="card-container">
				<?php
				foreach ( $user_favorites as $user_favorite ) {
					$post = get_post( $user_favorite ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					switch ( get_post_type( $post ) ) {
						case 'course':
							include 'template-parts/card-course.php';
							break;

						case 'resource':
							include 'template-parts/card-resource.php';
							break;
					}
				}
				?>
			</div><!-- .card-container -->
		</div><!-- .bridge-card-container -->
		<?php
	}

	if ( $courses ) {
		?>
		<div class="bridge-card-container">
			<h2><?php esc_html_e( 'Current Courses', 'bridge-library' ); ?></h2>
			<p class="meta">
				<?php
				// Translators: %s is the timestamp.
				echo esc_attr( sprintf( __( 'Last updated: %s', 'bridge-library' ), bridge_get_timestamp( 'course', $user_id )->format( 'F j, Y g:i:s a' ) ) );
				?>
			</p>
			<div class="card-container">
				<?php
				foreach ( $courses as $course ) {
					$post = get_post( $course ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					include 'template-parts/card-course.php';
				}
				?>
			</div><!-- .card-container -->
		</div><!-- .bridge-card-container -->
		<?php
	}

	if ( $primo_favorites ) {
		?>
		<div class="bridge-card-container">
			<h2><?php esc_html_e( 'Catalyst Favorites', 'bridge-library' ); ?></h2>
			<p class="meta">
				<?php
				// Translators: %s is the timestamp.
				echo esc_attr( sprintf( __( 'Last updated: %s', 'bridge-library' ), bridge_get_timestamp( 'primo_favorite', $user_id )->format( 'F j, Y g:i:s a' ) ) );
				?>
			</p>
			<div class="card-container">
				<?php
				foreach ( $primo_favorites as $primo_favorite ) {
					$post     = get_post( $primo_favorite ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					$favorite = true; // Used in the template.
					include 'template-parts/card-resource.php';
				}
				?>
			</div><!-- .card-container -->
		</div><!-- .bridge-card-container -->
		<?php
	}

	$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
	return $content . ob_get_clean();
}

/**
 * Add related resources to single course views.
 *
 * @since 1.0.0
 */
function single_course_page() {
	global $post;
	if ( ! is_singular( 'course' ) ) {
		return;
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

	$core_resources    = array_filter( (array) get_field( 'core_resources' ) );
	$related_resources = array_filter( (array) get_field( 'related_courses_resources' ) );
	$all_resources     = array_unique( array_merge( $core_resources, $related_resources ) );
	if ( ! empty( $all_resources ) ) {
		$all_resources = array_unique( $all_resources );
		$original_post = $post;

		echo '<h2>' . esc_attr__( 'Resources', 'bridge-library' ) . '</h2>';

		$resource_types = array();

		foreach ( $all_resources as $resource_id ) {
			$post = get_post( $resource_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride
			ob_start();
			include 'template-parts/card-resource.php';
			$content = ob_get_clean();

			foreach ( wp_get_post_terms( $post->ID, 'resource_type' ) as $resource_type ) {
				if ( array_key_exists( $resource_type->name, $resource_types ) ) {
					$resource_types[ $resource_type->name ] .= $content;
				} else {
					$resource_types[ $resource_type->name ] = $content;
				}
			}
		}

		foreach ( $resource_types as $title => $content ) {
			echo '<div><h3>' . esc_attr( $title ) . '</h3><div class="card-container">' . $content . '</div></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in the template.
		}

		$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
	}
}
add_action( 'astra_entry_content_single', 'single_course_page', 11 );

/**
 * Add related courses to single course views.
 *
 * @since 1.0.0
 */
function single_resource_page() {
	global $post;
	if ( ! is_singular( 'resource' ) ) {
		return;
	}

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
add_action( 'astra_entry_content_single', 'single_resource_page', 11 );
