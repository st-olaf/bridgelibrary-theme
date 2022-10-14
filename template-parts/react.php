<?php
/**
 * Template part for displaying user homepage content.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

/**
 * Allow longer session times.
 */
add_filter(
	'graphql_jwt_auth_expire',
	function() {
		return HOUR_IN_SECONDS;
	}
);

$graphql_query = array(
	'variables' => array(
		'email' => wp_get_current_user()->user_email,
		'token' => Bridge_Library_GraphQL_Authentication::get_user_token(),
	),
);

Bridge_Library_Assets::get_instance()->enqueue_assets();
Bridge_Library_Assets::get_instance()->add_inline_script( 'var graphqlQuery = ' . wp_json_encode( $graphql_query ) . ';' );
