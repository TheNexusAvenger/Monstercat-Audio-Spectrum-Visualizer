//From https://github.com/caseif/vis.js/blob/gh-pages/js/visual/gl/light.js

var pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);
