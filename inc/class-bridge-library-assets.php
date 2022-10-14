<?php
/**
 * Asset management for Bridge Library theme.
 *
 * @since 1.2.0
 * @package bridge-library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Asset management.
 *
 * @since 1.2.0
 */
class Bridge_Library_Assets {

	/**
	 * Available assets.
	 *
	 * @since 1.2.1
	 *
	 * @var array<string, string>
	 */
	private $assets = array();

	/**
	 * Class instance.
	 *
	 * @since 1.2.0
	 *
	 * @var self
	 */
	private static $instance = null;

	/**
	 * Return only one instance of this class.
	 *
	 * @since 1.2.0
	 *
	 * @return self
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register actions and hooks.
	 *
	 * @since 1.2.0
	 *
	 * @return void
	 */
	public function __construct() {}

	/**
	 * Get registered assets.
	 *
	 * @since 1.2.1
	 *
	 * @return array<string, string>
	 */
	public function get_assets() : array {
		if ( ! empty( $this->assets ) ) {
			return $this->assets;
		}

		$asset_manifest = json_decode( file_get_contents( get_stylesheet_directory() . '/assets/js/asset-manifest.json' ) );
		foreach ( $asset_manifest->entrypoints as $asset ) {
			$slug                  = 'bridge-graphql-' . str_replace( '.', '-', basename( $asset, '.js' ) );
			$this->assets[ $slug ] = $asset;
		}

		return $this->assets;
	}

	/**
	 * Register assets.
	 *
	 * @since 1.2.1
	 *
	 * @return void
	 */
	public function register_assets() {
		foreach ( $this->get_assets() as $slug => $asset ) {
			wp_register_script( $slug, get_stylesheet_directory_uri() . '/assets/js/' . $asset, array(), wp_get_theme()->get( 'Version' ), true );
		}
	}

	/**
	 * Enqueue assets.
	 *
	 * @since 1.2.1
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		foreach ( $this->get_assets() as $slug => $asset ) {
			wp_enqueue_script( $slug );
		}
	}

	/**
	 * Add inline script.
	 *
	 * @since 1.2.1
	 *
	 * @param string $data   Javascript to add.
	 * @param bool   $before Should the script be added before.
	 * @param string $handle Registered script handle; if not supplied, uses the first available handle.
	 *
	 * @return void
	 */
	public function add_inline_script( string $data, bool $before = true, $handle = null ) {
		if ( ! isset( $handle ) ) {
			$handle = current( array_keys( $this->get_assets() ) );
		}

		wp_add_inline_script( $handle, $data, $before ? 'before' : 'after' );
	}
}
new Bridge_Library_Assets();
