var UseSVGOverCanvas = false //Recommended to be false (performance and compatibility). Professor had me experiment with it.

var EncodingEnabled = false //If true, encoding will be an option. Text will be hidden and data won't be recorded if false
var RecordFrequency = 30 //How many times per second data should try to record at. 30 is recommended.
var RecordDownScale = 100 //How far down the recording should scale down numbers (0-this instead of 0-255). You can increase this past 255 for more accuracy.
var IndluceRecordMetadata = true //If true, metadata such as the RecordFrequency and RecordDownScale are included in the file downloaded.
var IndluceFileMetadata = true //If true, metadata such as the song and artist name are included in the file downloaded.
var EncodeRawData = false //If true, data is encoded raw (untransformed in analysis.js)
var EncodeEnabledByDefault = false //If true, encoding is enabled by default (no need to press e). More for personal use.

var FrameCap = 60 //Caps the math to the given frame rate. By default, it is able to run faster than your framerate.

var ParticlesEnabled = true //If true, particles in the background will be enabled. Particles are more CPU intensive tha without them.



//Rest probably don't need to be changed unless you are tinkering

//geometry.js
var VelocityScaleFactor = 5

//spectrum.js
var SpectrumBarCount = 63
var Bar1080pWidth = 15
var Bar1080pSeperation = 7
var BarHeightToWidthRatio = 22
var LogoSpacing = 25
var LogoSize = 150

var WidthBoundArea = 0.8
var HeightBoundArea = 0.8

var ShadowBlur = 4




//input.js
var StartVolume = 100
var DisplayTime = 3



//songutil.js
var BufferInterval = 1024
var FFTSize = 16384



//geom_util.js
var ampLower = 7; // the lower bound for amplitude analysis (inclusive)
var ampUpper = 30; // the upper bound for amplitude analysis (exclusive)
var particleExponent = 4.5; // the power to raise velMult to after initial computation

var baseParticleCount = 2000; // the number of particles at 1080p
var fleckCount = 50; // total fleck count
var bokehCount = 250; // total bokeh count

var particleOpacity = 0.7; // opacity of primary particles
var bokehOpacity = 0.5; // opacity of bokeh (raising this above 0.5 results in weird behavior)

var minParticleSize = 4; // the minimum size scalar for particle systems
var maxParticleSize = 7; // the maximum size scalar for particle systems
var particleSizeExponent = 2; // the exponent to apply during dynamic particle scaling (similar to spectrum exponents)

var yVelRange = 3; // the range for particle y-velocities
var xPosBias = 4.5; // bias for particle x-positions (higher values = more center-biased)
var zPosRange = 450; // the range of z-particles
var zModifier = -250; // the amount to add to z-positions
var zPosBias = 2.3; // bias for particle z-positions (higher values = more far-biased)
var leftChance = 0.88; // the chance for a particle to spawn along the left edge of the screen
var rightChance = 0.03; // the chance for a particle to spawn along the right edge of the screen
var topBottomChance = 0.09; // the chance for a particle to spawn along the top/bottom edges of the screen

var velBias = 1.8; // bias for particle velocities (higher values = more center-biased)
var minParticleVelocity = 2.5; // the minimum scalar for particle velocity
var maxParticleVelocity = 3.5; // the maximum scalar for particle velocity
var absMinParticleVelocity = 0.001; // the absolute lowest speed for particles
var fleckVelocityScalar = 1.75; // velocity of flecks relative to normal particles
var fleckYVelScalar = 0.75; // y-velocity range of flecks relative to x-velocity
var bokehMinVelocity = maxParticleVelocity * 0.15; // the minimum velocity of bokeh
var bokehMaxVelocity = maxParticleVelocity * 0.3; // the maximum velocity of bokeh

var ampLower = 7; // the lower bound for amplitude analysis (inclusive)
var ampUpper = 30; // the upper bound for amplitude analysis (exclusive)
var particleExponent = 4.5; // the power to raise velMult to after initial computation
