import _ from 'lodash';
import Renderer from '../../src/render.js';

var options = {
    width: 500,
    height: 500,
    image: '#targetImage',
    app: '.app',
    color: false,
    blendingMode: 'lighten',
    renderPasses: 0,
    invert: true,
    lineWidth: 3,
    lineType: 'point',
    origin: ['top'],
    renderSize: 'original',
    workers: 1,
    speed: 1,
    turningAngle: 1,
    backgroundColor: 'black'
};

describe('findColorMode()', () => {
  it('Should return "color" if the colormode is true', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findColorMode(true);
		let expected = 'color';

		expect(actual).toEqual(expected);
  });

  it('Should return "greyscale" if the colormode is false', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findColorMode(false);
		let expected = 'greyscale';

		expect(actual).toEqual(expected);
  });

  it('Should default to "greyscale" if the colormode is null', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findColorMode(null);
		let expected = 'greyscale';

		expect(actual).toEqual(expected);
  });

  it('Should default to "greyscale" if the colormode is undefined', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findColorMode(undefined);
		let expected = 'greyscale';

		expect(actual).toEqual(expected);
  });
});

describe('findInversionMode()', () => {
  it('Should return "low" if the inversion mode is true', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findInversionMode(true);
		let expected = 'low';

		expect(actual).toEqual(expected);
  });

  it('Should return "high" if the inversion mode is false', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findInversionMode(false);
		let expected = 'high';

		expect(actual).toEqual(expected);
  });

  it('Should default to "high" if the inverison mode is null', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findInversionMode(null);
		let expected = 'high';

		expect(actual).toEqual(expected);
  });

  it('Should default to "high" if the inversion mode is undefined', () => {
    let renderer = new Renderer(options);
		let actual = renderer.findInversionMode(undefined);
		let expected = 'high';

		expect(actual).toEqual(expected);
  });
});

describe('mapOptions()', () => {
  it('Should return an options object with values mapped correctly', () => {
    let renderer = new Renderer(options);
		let actual = renderer.mapOptions(options);
		let expected = {
      colorMode: 'greyscale',
      compositeOperation: 'lighten',
      iterationLimit: 0,
      key: 'low',
      lineWidth: 3,
      lineMode: 'point',
      origin: ['top'],
      outputSize: 'original',
      pathFinderCount: 1,
      speed: 1,
      turningAngle: 1,
      backgroundColor: 'black'
  };

		expect(actual).toEqual(expected);
  });

  it('Should return an empty object if options is null', () => {
    let renderer = new Renderer(options);
		let actual = renderer.mapOptions(null);
		let expected = {};

		expect(actual).toEqual(expected);
  });

  it('Should return an empty object if options is undefined', () => {
    let renderer = new Renderer(options);
		let actual = renderer.mapOptions(undefined);
		let expected = {};

		expect(actual).toEqual(expected);
  });
});


