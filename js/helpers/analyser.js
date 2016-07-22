//Heavily modified from https://github.com/caseif/vis.js/blob/gh-pages/js/analysis/spectrum_algorithms.js


var barWidth = (SpectrumBarCount + Bar1080pSeperation) / SpectrumBarCount - Bar1080pSeperation;
var spectrumDimensionScalar = 4.5
var headMargin = 7;
var tailMargin = 0;
var minMarginWeight = 0.6
var marginDecay = 1.6
var spectrumMaxExponent = 5
var spectrumMinExponent = 3;
var spectrumExponentScale = 2;
var SideWeight = 2
var CenterWeight = 3
var MaxSizeAdjuster = 24/22

var resRatio = (window.innerWidth/window.innerHeight)
var spectrumWidth = 1568 * resRatio;
spectrumSpacing = 7 * resRatio;
spectrumWidth = (Bar1080pWidth + Bar1080pSeperation) * SpectrumBarCount - Bar1080pSeperation;
var headMarginSlope = (1 - minMarginWeight) / Math.pow(headMargin, marginDecay);

var spectrumHeight = 255

function SpectrumEase(Value) {
  return Math.pow(Value, SpectrumLogScale)
}

function TransformToVisualBins(Array) {
  var NewArray = []
  var SamplePoints = []
  for (var i = 0; i < SpectrumBarCount; i++) {
    var Bin = SpectrumEase(i / SpectrumBarCount) * (SpectrumEnd - SpectrumStart) + SpectrumStart;
    NewArray[i] = Array[Math.floor(Bin) + SpectrumStart] * (Bin % 1)
            + Array[Math.floor(Bin + 1) + SpectrumStart] * (1 - (Bin % 1))
    SamplePoints[i] = Math.floor(Bin) + SpectrumStart
  }
  UpdateParticleAttributes(NewArray)

  NewArray = exponentialTransform(NewArray);
  NewArray = tailTransform(NewArray);
  NewArray = AverageTransform(NewArray);
  return NewArray;
}

function AverageTransform(Array) {
    var Values = []
    var Length = Array.length
    for (var i = 0; i < Length; i++) {
        var Value = 0
        if (i == 0) {
            Value = Array[i];
        } else if (i == Length - 1) {
            Value = (Array[i - 1] + Array[i]) / 2
        } else {
            var PrevValue = Array[i - 1]
            var CurValue = Array[i]
            var NextValue = Array[i + 1]
            //if (CurValue >= PrevValue && CurValue >= NextValue) {
            //  Value = (PrevValue + CurValue + NextValue) / 2.4;
            //} else {
            //  Value = (PrevValue + CurValue + NextValue) / 3
            //}
            //Code above was replaced by weighted averaging. Appears to work better.
            Value = (((PrevValue + NextValue)/2)*SideWeight + (CurValue*CenterWeight))/(SideWeight + CenterWeight)
        }
        Value = Math.min(Value + 1, spectrumHeight) * MaxSizeAdjuster;

        Values[i] = Value;
    }
    return Values
}

function tailTransform(array) {
    var values = [];
    for (var i = 0; i < SpectrumBarCount; i++) {
        var value = array[i];
        if (i < headMargin) {
            value *= headMarginSlope * Math.pow(i + 1, marginDecay) + minMarginWeight;
        } else if (SpectrumBarCount - i <= tailMargin) {
            value *= tailMarginSlope * Math.pow(SpectrumBarCount - i, marginDecay) + minMarginWeight;
        }
        values[i] = value;
    }
    return values;
}

function exponentialTransform(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        var exp = (spectrumMaxExponent - spectrumMinExponent) * (1 - Math.pow(i / SpectrumBarCount, spectrumExponentScale)) + spectrumMinExponent;
        newArr[i] = Math.max(Math.pow(array[i] / spectrumHeight, exp) * spectrumHeight, 1);
    }
    return newArr;
}
