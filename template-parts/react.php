<?php
/**
 * Template part for displaying user homepage content.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package bridge-library
 * @since 1.0.0.0
 */

$graphql_query = array(
	'variables' => array(
		'email' => wp_get_current_user()->user_email,
		'token' => Bridge_Library_GraphQL_Authentication::get_user_token(),
	),
);
wp_add_inline_script( 'bridge-graphql-main', 'var graphqlQuery = ' . wp_json_encode( $graphql_query ) . ';', 'before' );

wp_enqueue_script( 'bridge-graphql-main' );
wp_enqueue_script( 'bridge-graphql-react' );
