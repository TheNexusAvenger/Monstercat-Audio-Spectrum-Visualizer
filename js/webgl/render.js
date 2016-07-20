//From https://github.com/caseif/vis.js/blob/gh-pages/js/visual/gl/render.js

if (ParticlesEnabled == true) {
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                  window.setTimeout(callback, 1000 / 60);
            };
  })();

  (function animloop(){
      if (Paused == false && DrawParticles == true) {
        updateParticles();
      }
      requestAnimFrame(animloop);
      renderer.render(scene, camera);
  })();
}
