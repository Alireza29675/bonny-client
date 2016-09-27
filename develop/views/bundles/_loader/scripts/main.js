import loader from '../elements/bonny-loader.jade'

document.body.innerHTML += loader()

window.onload = function() {
  document.getElementsByClassName('bonny-main')[0].style.display = "block"
  document.getElementsByClassName('sk-cube-grid')[0].style.display = "none"
}
