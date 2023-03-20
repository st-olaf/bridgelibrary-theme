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
 * Enqueue custom styles.
 *
 * @since 1.0.0.0
 *
 * @return void
 */
function bridge_custom_assets() {
	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style( 'bridge-child-styles', get_stylesheet_directory_uri() . '/assets/css/bridge-library-theme.css', array(), $theme_version );
	wp_enqueue_style( 'source-sans-pro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i&display=swap' ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion

	wp_enqueue_script( 'bridge-js', get_stylesheet_directory_uri() . '/assets/js/bridge-library-theme.js', array( 'jquery' ), wp_get_theme()->get( 'Version' ), true );
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
 * @return DateTimeImmutable|false
 */
function bridge_get_timestamp( $type, $user_id ) {
	$cache_date = get_field( $type . '_cache_updated', 'user_' . $user_id );
	if ( ! $cache_date ) {
		$cache_date = time();
	}

	return DateTimeImmutable::createFromFormat( 'U', $cache_date );
}

/**
 * Display user-specific sidebar.
 *
 * @since 1.3.0
 *
 * @return void
 */
function display_user_sidebar() {
	if ( ! is_user_logged_in() ) {
		return;
	}

	$courses = array_filter( (array) get_field( 'courses', 'user_' . get_current_user_id() ) );

	?>
	<aside class="widget widget_nav_menu">
		<div class="menu-sidebar-container">
			<ul id="menu-sidebar" class="menu">
				<li class="menu-item current-menu-item"><a href="/"><?php esc_html_e( 'Home', 'bridge-library' ); ?></a></li>
				<li class="menu-item"><a href="/"><?php esc_html_e( 'Courses', 'bridge-library' ); ?></a>
					<ul class="sub-menu">
						<?php
						foreach ( $courses as $course ) {
							?>
								<li class="menu-item"><a href="<?php echo esc_url( get_permalink( $course ) ); ?>"><?php echo esc_attr( get_the_title( $course ) ); ?></a></li>
							<?php
						}
						?>
					</ul>
				</li>
				<li class="menu-item"><a href="/circulation-data/"><?php esc_html_e( 'Checkouts and Requests', 'bridge-library' ); ?></a></li>
			</ul>
		</div>
	</aside>
	<?php
}
add_action( 'astra_sidebars_after', 'display_user_sidebar' );

/**
 * Display the user’s home content.
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
	$users           = Bridge_Library_Users::get_instance();
	$user_favorites  = $users->get_favorite_posts( $user_id );
	$courses         = $users->get_courses( $user_id );
	$primo_favorites = $users->get_primo_favorites( $user_id );

	ob_start();
	?>
	<div class="bridge-card-container">
		<h2><?php esc_html_e( 'Favorite Resources', 'bridge-library' ); ?></h2>
		<div class="card-container">
			<?php
			if ( $user_favorites ) {
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
			} else {
				display_no_results( 'favorites' );
			}
			?>
		</div><!-- .card-container -->
	</div><!-- .bridge-card-container -->

	<div class="bridge-card-container">
		<h2><?php esc_html_e( 'Current Courses', 'bridge-library' ); ?></h2>
		<p class="meta">
			<?php
			// Translators: %s is the timestamp.
			echo esc_attr( sprintf( __( 'Last updated: %s', 'bridge-library' ), bridge_get_timestamp( 'courses', $user_id )->format( 'F j, Y g:i:s a' ) ) );
			?>
		</p>
		<div class="card-container">
			<?php
			if ( $courses ) {
				foreach ( $courses as $course ) {
					$post = get_post( $course ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					include 'template-parts/card-course.php';
				}
			} else {
				display_no_results( 'courses' );
			}
			?>
		</div><!-- .card-container -->
	</div><!-- .bridge-card-container -->

	<div class="bridge-card-container">
		<h2><?php esc_html_e( 'Catalyst Favorites', 'bridge-library' ); ?></h2>
		<p class="meta">
			<?php
			// Translators: %s is the timestamp.
			echo esc_attr( sprintf( __( 'Last updated: %s', 'bridge-library' ), bridge_get_timestamp( 'primo_favorites', $user_id )->format( 'F j, Y g:i:s a' ) ) );
			?>
		</p>
		<div class="card-container">
			<?php
			if ( $primo_favorites ) {
				foreach ( $primo_favorites as $primo_favorite ) {
					$post           = get_post( $primo_favorite ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					$force_favorite = true; // Used in the template.
					include 'template-parts/card-resource.php';
				}
			} else {
				display_no_results( 'Catalyst favorites' );
			}
			?>
		</div><!-- .card-container -->
	</div><!-- .bridge-card-container -->
	<?php

	$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
	return $content . ob_get_clean();
}

/**
 * Display course code with title.
 *
 * @param string $post_title Post title.
 * @param int    $post_id    Pos tID.
 *
 * @return string
 */
function bridge_library_include_course_code_in_title( $post_title, $post_id ) {
	if ( 'course' !== get_post_type( $post_id ) ) {
		return $post_title;
	}

	$course_number = get_field( 'course_number', $post_id );
	$course_code   = explode( '|', get_field( 'course_code', $post_id ) );

	if ( $course_number && $course_code ) {
		return sprintf(
			'%1$s%2$s: %3$s',
			$course_code[1],
			$course_number ? ' ' . $course_number : '',
			$post_title,
		);
	}

	return $course_code;
}
add_filter( 'the_title', 'bridge_library_include_course_code_in_title', 10, 2 );

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

	display_course_meta();

	// Override the global post object so we can include templates.
	$original_post = $post;

	$librarians = get_field( 'librarians' );

	$librarians = array_unique( $librarians );

	echo '<h2>Librarians</h2>';
	echo '<div class="card-container">';
	if ( $librarians ) {
		foreach ( $librarians as $librarian_id ) {
			$post = get_post( $librarian_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride
			include 'template-parts/card-librarian.php';
		}
	} else {
		?>
		<div class="card librarian">
			<h3 class="title">
				<?php the_field( 'default_librarian', 'options' ); ?>
			</h3>
		</div>
		<?php
	}
	echo '</div>';

	$core_resources    = array_filter( (array) get_field( 'core_resources' ) );
	$related_resources = array_filter( (array) get_field( 'related_courses_resources' ) );
	$all_resources     = array_unique( array_merge( $core_resources, $related_resources ) );

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

	if ( array_key_exists( 'Guide', $resource_types ) ) {
		foreach ( $resource_types as $title => $content ) {
			echo '<div><h2>' . esc_attr( $title ) . '</h2><div class="card-container">' . $content . '</div></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in the template.
		}
	} else {
		?>
		<div>
			<h2><?php esc_html_e( 'Guide', 'bridge-library' ); ?></h2>
			<div class="card-container">
				<div class="card resource">
					<h3 class="title">
						<?php the_field( 'default_guide', 'option' ); ?>
					</h3>
				</div>
			</div>
		</div>
		<?php
	}

	$post = $original_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
}
add_action( 'astra_entry_content_single', 'single_course_page', 11 );

/**
 * Display course meta.
 *
 * @return void
 */
function display_course_meta() {
	$meta = array();

	$instructors = get_field( 'instructors' );
	if ( ! empty( $instructors ) ) {
		$meta[] = array(
			'label' => _n( 'Professor', 'Professors', count( $instructors ), 'bridge-library' ),
			'value' => implode( ', ', wp_list_pluck( $instructors, 'name' ) ),
		);
	}

	if ( get_field( 'course_section' ) ) {
		$meta[] = array(
			'label' => __( 'Section', 'bridge-library' ),
			'value' => get_field( 'course_section' ),
		);
	}

	if ( get_field( 'course_term' ) ) {
		$meta[] = array(
			'label' => __( 'Term', 'bridge-library' ),
			'value' => implode( ', ', wp_list_pluck( get_the_terms( get_the_ID(), 'course_term' ), 'name' ) ),
		);
	}

	if ( ! empty( $meta ) ) {
		echo '<ul class="meta">';
		foreach ( $meta as $meta_item ) {
			echo '<li><strong>' . esc_attr( $meta_item['label'] ) . '</strong>: ' . esc_attr( $meta_item['value'] ) . '</li>';
		}
		echo '</ul>';
	}
}

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

/**
 * Add librarian data.
 *
 * @since 1.0.0
 */
function single_librarian() {
	if ( ! is_singular( 'librarian' ) ) {
		return;
	}

	$related_user = get_field( 'librarian_user_id' );
	if ( is_object( $related_user ) ) {

		$librarian_email_address   = get_field( 'librarian_email_address', 'user_' . $related_user->ID );
		$librarian_phone_number    = get_field( 'librarian_phone_number', 'user_' . $related_user->ID );
		$librarian_office_location = get_field( 'librarian_office_location', 'user_' . $related_user->ID );

		$picture_url = get_field( 'librarian_picture_url', 'user_' . $related_user->ID );
		$google_url  = get_field( 'picture_url', 'user_' . $related_user->ID );
		$avatar_url  = get_avatar_url( $related_user->ID );

		if ( ! empty( $picture_url ) ) {
			echo '<img width="100" class="alignright manual image" src="' . esc_url( $picture_url ) . '" alt="Librarian" />';
		} elseif ( ! empty( $google_url ) ) {
			echo '<img width="100" class="alignright google image" src="' . esc_url( $google_url ) . '" alt="Librarian" />';
		} elseif ( ! empty( $avatar_url ) ) {
			echo '<img width="100" class="alignright avatar image" src="' . esc_url( $avatar_url ) . '" alt="Librarian" />';
		}
		?>
		<ul class="meta">
			<?php
			if ( $librarian_email_address ) {
				echo '<li class="email">' . esc_html__( 'Email Address', 'bridge-library' ) . ': <a href="mailto:' . esc_attr( $librarian_email_address ) . '">' . esc_attr( $librarian_email_address ) . '</a></li>';
			}
			if ( $librarian_phone_number ) {
				echo '<li class="email">' . esc_html__( 'Phone Number', 'bridge-library' ) . ': ' . esc_attr( $librarian_phone_number ) . '</li>';
			}
			if ( $librarian_office_location ) {
				echo '<li class="email">' . esc_html__( 'Office Location', 'bridge-library' ) . ': ' . esc_attr( $librarian_office_location ) . '</li>';
			}
			?>
		</ul>
		<p class="description"><?php the_field( 'biography', 'user_' . $related_user->ID ); ?></p>
		<?php
	}
}
add_action( 'astra_entry_content_single', 'single_librarian', 11 );

/**
 * Display user’s circulation data.
 *
 * @since 1.3.0
 *
 * @return void
 */
function display_circulation_data_content() {
	if ( ! is_user_logged_in() ) {
		return;
	}

	$user_id = get_current_user_id();

	$circulation_data = json_decode( get_field( 'circulation_data', 'user_' . $user_id ) );

	?>
	<p className="bridge-info">
		<?php esc_html_e( 'For renewals, request cancellations, and more options, please visit', 'bridge-library' ); ?>
		<a class="catalyst-link carleton" href="https://bridge.primo.exlibrisgroup.com/discovery/login?vid=01BRC_INST:CCO&lang=en">
			<?php esc_attr_e( 'your account page in Catalyst', 'bridge-library' ); ?>
		</a>
		<a class="catalyst-link stolaf" href="https://bridge.primo.exlibrisgroup.com/discovery/login?vid=01BRC_INST:SOC&lang=en">
			<?php esc_attr_e( 'your account page in Catalyst', 'bridge-library' ); ?>
		</a>
	</p>

	<div class="bridge-card-container">
		<h2><?php esc_html_e( 'Checkouts', 'bridge-library' ); ?></h2>

		<div class="card-container collapsible">
			<?php
			if ( empty( $circulation_data->loans ) ) {
				display_no_results( __( 'loans', 'bridge-library' ) );
			} else {
				foreach ( $circulation_data->loans as $loan ) {
					include 'template-parts/card-loan.php';
				}
			}
			?>
		</div>
	</div>

	<div class="bridge-card-container">
		<h2><?php esc_html_e( 'Requests', 'bridge-library' ); ?></h2>

		<div class="card-container collapsible">
			<?php
			if ( empty( $circulation_data->requests ) ) {
				display_no_results( __( 'requests', 'bridge-library' ) );
			} else {
				foreach ( $circulation_data->requests as $loan ) {
					include 'template-parts/card-loan.php';
				}
			}
			?>
		</div>
	</div>

	<h2><?php esc_html_e( 'Interlibrary Loan', 'bridge-library' ); ?></h2>
	<p class="bridge-no-results">
		<?php esc_html_e( 'We are not currently importing your Interlibrary Loan account information into myLibrary (though we plan to do that soon!).  In the meantime, you can view your account information here:', 'bridge-library' ); ?>
		<a class="ill-link carleton" href="https://apps.carleton.edu/campus/library/ill/">
			<?php esc_html_e( 'Interlibrary Loan Requests', 'bridge-library' ); ?>
		</a>
		<a class="ill-link stolaf" href="https://ezproxy.stolaf.edu/login?url=https://stolaf.illiad.oclc.org/illiad/illiad.dll">
			<?php esc_html_e( 'Interlibrary Loan Requests', 'bridge-library' ); ?>
		</a>
	</p>
	<?php
}

/**
 * Display a no-results message.
 *
 * @since 1.3.0
 *
 * @param string $type Plural type of resource.
 *
 * @return void
 */
function display_no_results( string $type ) {
	echo '<p class="bridge-no-results">' . wp_kses_post(
		sprintf(
			// Translators: %1$s is the type passed into the function.
			__( 'There are no %1$s in your account', 'bridge-library' ),
			$type,
		)
	) . '</p>';
}
