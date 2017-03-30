function Oscillator(config){
  this.frequency = config.frequency ||
  this.amplitude = config.amplitude || 1;
  this.offSet = config.offSet || 0;
  this.phaseOffset = config.phaseOffset || 0;
}
