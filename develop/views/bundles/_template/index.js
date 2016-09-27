// importing Bootstrap and jQuery
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/js/bootstrap.min'

// importing Bootstrap RTL for RTL Websites
import rtl from './bootstrap/css/bootstrap-rtl.min.maycss'
if(document.getElementsByTagName('html')[0].getAttribute('data-direction') == "rtl") {
  document.getElementsByTagName('head')[0].innerHTML += "<style type='text/css'>" + rtl.toString() + "</style>";
}

// importing Bootstrap Theme
import './bootstrap/css/bootstrap-theme.min.css'

// importing Material Theme
// Tutorial http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html
/*
import './bootstrap/material/css/bootstrap-material-design.min.css'
import './bootstrap/material/css/ripples.min.css'
import './bootstrap/material/js/material.min'
import './bootstrap/material/js/ripples.min'
$.material.init()
*/

// importing other global scripts and styles
import './styles/main.styl'
import './scripts/main.js'
