<?php
/*
Plugin Name: Fun with 404
Description: An awesome 404 page
Version: 0.1
Author: Toggle Corp.
Author URI: http://www.togglecorp.com/
*/

if ( ! defined( 'WPINC' ) ) {
	die;
}

add_filter( '404_template', array('Page404', 'init'));

class Page404{
    public function init($template){
        new self;

        $page_check = get_page_by_title("Fun with 404");
        $post_id = 0;
        if(!isset($page_check->ID)){
            $page_404 = array(
                'post_title' => "Fun with 404",
                'post_content' => '<div id="maze-container"></div>',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type' => 'page'
            );
            $post_id = wp_insert_post($page_404);
        } else {
            $post_id = $page_check->ID;
            $page_404 = array(
                'post_title' => "Fun with 404",
                'ID' => $page_check->ID,
                'post_content' => '<div id="maze-container"></div>',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type' => 'page'
            );
            wp_update_post($page_404);
        }


        global $wp_query;
        $pageid = $post_id;
        if ( $pageid > 0 ) {
            $wp_query = null;
            $wp_query = new WP_Query();
            $wp_query->query( 'page_id=' . $pageid );
            $wp_query->the_post();
            $template = get_page_template();
            rewind_posts();

            wp_enqueue_script("parent-script", plugins_url().'/fun-with-404/maze.js', null, null, true);

        }

        return $template;
    }
}


?>
