//Modified from https://github.com/caseif/vis.js/blob/gh-pages/js/visual/gl/geometry.js
var resRatio = ScreenWidth / 1920;
var particleCount = (ScreenWidth * ScreenHeight) / (1920*1080) * baseParticleCount

//TODO: split main system into foreground and background particles
var particles = new THREE.Geometry();
var flecks = new THREE.Geometry();
var bokeh = new THREE.Geometry();


textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = '';


var stdTexure = textureLoader.load(
  'img/particle.png'
)
stdTexure.minFilter = THREE.LinearFilter;

var fleckTexture = textureLoader.load(
   'img/fleck.png'
)
fleckTexture.minFilter = THREE.LinearFilter;

var bokehTexture = textureLoader.load(
    'img/smoke.png'
)
bokehTexture.minFilter = THREE.LinearFilter;

var pMaterial = new THREE.PointsMaterial({
    color: GenreName === 'BTC' ? 0x000000 : 0xFFFFFF,
    opacity: particleOpacity,
    size: 5,
    map: stdTexure,
    blending: THREE.AdditiveBlending,
    transparent: true
});

var fleckMaterial
var bokehMaterial
var fleckSystem
var bokehSystem
function CreateNewFleck() {
  fleckMaterial = new THREE.PointsMaterial({
      color: GenreColor,//NewColor,
      opacity: particleOpacity,
      size: 4,
      map: fleckTexture,
      blending: THREE.AdditiveBlending,
      transparent: true
  });

  bokehMaterial = new THREE.PointsMaterial({
      color: brighten(GenreColor, 2.1),
      opacity: bokehOpacity,
      size: 100,
      map: bokehTexture,
      blending: THREE.AdditiveBlending,
      transparent: true
  });

  if (fleckSystem) {
    fleckSystem.material = fleckMaterial
  }
  if (fleckSystem) {
    bokehSystem.material = bokehMaterial
  }
}
CreateNewFleck()

var velocityResScale = Math.pow(resRatio, VelocityScaleFactor);
var fleckVelocity = maxParticleVelocity * fleckVelocityScalar;

for (var p = 0; p < particleCount; p++) {
    var z = biasedRandom(zPosRange, zPosBias) + zModifier;
    var xRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE)) * 2; // maximum range on the x-axis at this z-value
    var yRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE / ASPECT)) * 2; // maximum range on the y-axis at this z-value
    var pX = Math.random() * xRange - xRange / 2,
        pY = centerBiasedRandom(yRange, xPosBias),
        pZ = z,
        particle = new THREE.Vector3(pX, pY, pZ);

      // create a velocity vector
    particle.velocity = new THREE.Vector3(
        velocityResScale * (Math.random() * (maxParticleVelocity - minParticleVelocity) + minParticleVelocity),
        velocityResScale * centerBiasedRandom(yVelRange, velBias),
        0
    );

    // add it to the geometry
    particles.vertices.push(particle);
}


fleckYVelScalar *= fleckVelocity;

var fleckZ = 150;

for (var p = 0; p < fleckCount; p++) {
    var z = fleckZ;
    var xRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE)) * 2; // maximum range on the x-axis at this z-value
    var yRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE / ASPECT)) * 2; // maximum range on the y-axis at this z-value
    var pX = Math.random() * xRange - xRange / 2,
        pY = Math.floor(Math.random() * yRange) - yRange / 2,
        pZ = z,
        fleck = new THREE.Vector3(pX, pY, pZ);
    fleck.fleck = true;

      // create a velocity vector
    fleck.velocity = new THREE.Vector3(
        velocityResScale * fleckVelocity,
        velocityResScale * centerBiasedRandom(fleckYVelScalar, velBias),
        0
    );

    // add it to the geometry
    flecks.vertices.push(fleck);
}

var bokehYVelRange = ((bokehMinVelocity + bokehMaxVelocity) * 0.5) * 2;

var bokehZ = 200;

for (var p = 0; p < bokehCount; p++) {
    var z = bokehZ;
    //var z = Math.random() * zPosRange - (zPosRange / 2);
    var xRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE)) * 2; // maximum range on the x-axis at this z-value
    var yRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE / ASPECT)) * 2; // maximum range on the y-axis at this z-value
    var pX = Math.random() * xRange - xRange / 2,
        pY = Math.random() * yRange - yRange / 2,
        pZ = z,
        b = new THREE.Vector3(pX, pY, pZ);
    b.bokeh = true;

      // create a velocity vector
    b.velocity = new THREE.Vector3(
        velocityResScale * (Math.random() * (bokehMaxVelocity - bokehMinVelocity) + bokehMinVelocity),
        velocityResScale * (Math.random() * bokehYVelRange - bokehYVelRange / 2),
        0
    );

    // add it to the geometry
    bokeh.vertices.push(b);
}



// create the particle systems
var particleSystem = new THREE.Points(particles, pMaterial);
fleckSystem = new THREE.Points(flecks, fleckMaterial);
bokehSystem = new THREE.Points(bokeh, bokehMaterial);


  fleckSystem.sortParticles = true;
  fleckSystem.geometry.dynamic = true;

  bokehSystem.sortParticles = true;
  bokehSystem.geometry.dynamic = true;

particleSystem.sortParticles = true;
particleSystem.geometry.dynamic = true;


// add it to the scene
scene.add(particleSystem);
if (GenreName != 'BTC' && GenreName != 'Mirai Sekai') {
    scene.add(fleckSystem);
    scene.add(bokehSystem);
}
