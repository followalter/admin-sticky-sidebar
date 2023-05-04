<?php
/*
Plugin Name: Admin Sticky Sidebar
Description: Makes the sidebar follow you when you scroll and remembers scroll position on update. For more info, see the readme.
Version: 1.6
Author: Tom Walter
Author URI: https://littlefragments.com
License: GPLv2
*/

// add css to the admin --------------------------------------------------------
function admin_sticky_sidebar_css($hook)
{
  // only add to the post.php admin page.
  wp_enqueue_style('admin-sticky-sidebar-style',  plugins_url('admin-sticky-sidebar.css?v=1.6', __FILE__));
}
add_action('admin_enqueue_scripts', 'admin_sticky_sidebar_css');



// add js to the admin ---------------------------------------------------------
function admin_sticky_sidebar_js($hook)
{
  // only add to the post.php admin page.
  wp_enqueue_script('admin-sticky-sidebar-script', plugins_url('admin-sticky-sidebar.js?v=1.6', __FILE__));
}
add_action('admin_enqueue_scripts', 'admin_sticky_sidebar_js');
