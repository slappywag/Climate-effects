import './ui-slider';

// elements
const thermometerMercury = document.getElementById('mercury');
const pattern = document.getElementById('stipple');
const circles = document.querySelectorAll('circle');
const arrow_S = document.querySelector('.arrow-S');
const arrow_A = document.querySelector('.arrow-A');
const arrow_AtmosOut = document.querySelector('.arrow-atmos-out');
const arrow_GH_gases = document.querySelector('.arrow-gh-gases');
const arrow_earthOut = document.querySelector('.arrow-earth-out') 
const earthGroup = document.querySelector('.earth-group');
const body = document.querySelector('body');
const reflectivityGroup = document.getElementById('reflectivity-group');


// select version
let advanced = false;
if (window.location.hash && window.location.hash === '#advanced') {
	advanced = true;
	// show slider
	reflectivityGroup.classList.add('show');
	// show arrow
	arrow_A.classList.add('show');
}

// FS max
const S_max = 1370;
// Stefan-Boltzmann constant
const sigma = 5.670374419e-8;

// ELEMENTS

const surfaceTemp = document.getElementById('surfaceTemp');
const resetButton = document.getElementById('reset');
const dialog = document.getElementById('dialog');

['sun-info', 'greenhouse-info', 'reflectivity-info'].forEach(id => {
	const el = document.getElementById(id);
	const cls = id.split('-')[0];
	el.addEventListener('click', () => {
		dialog.className = 'show-' + cls;
		dialog.showModal();
	});
});

// RESET
const defaults = {
	S: 100,
	A: 30,
	tVIS: 80,
	tIR: 0.9
};
resetButton.addEventListener('click', () => {
	Object.keys(sliders).forEach(key => {
		sliders[key].value = defaults[key]
	});
	updateScene();
});

// SLIDERS

const sliders = {
	S: document.getElementById('solar-flux'),
	A: document.getElementById('albedo'),
	tVIS: document.getElementById('visible-transimittance'),
	tIR: document.getElementById('infrared-transimittance')
};

function updateAriaTextValue(key) {
	const value = +sliders[key].value;
	if (key === 'S' || key === 'A') {
		sliders[key].setAttribute('textvalue', value + '%');
	} else if (key === 'tIR') {
		let text;
		if (value === 0) {
			text = 'none';
		} else if (value < 0.25) {
			text = 'minimal'
		} else if (value < 0.5) {
			text = 'low'
		} else if (value < 0.775) {
			text = 'moderate'
		} else if (value < 0.99) {
			text = 'high'
		} else if (value === 1) {
			text = 'Lots'
		}
		sliders[key].setAttribute('textvalue', text);
	}
}

Object.keys(sliders).forEach(key => {
	updateAriaTextValue(key);
	sliders[key].addEventListener('input', event => {
		updateAriaTextValue(key);
		updateScene();
	});
});

// Update Scene

const T_range = calc_T(S_max, 0, 1, 0).Kelvin - -273.1;

function updateScene() {

	const tIR = 1 - +sliders.tIR.value;

	// update temp
	const Temp = calc_T(
		S_max * (sliders.S.value / 100),
		sliders.A.value * 0.01,
		sliders.tVIS.value * 0.01,
		tIR
	);

	// ARROWS

	// earth arrow out
	const arrowOutScale = (1 / T_range) * Temp.Kelvin;
	arrow_earthOut.style.setProperty('--arrow-scale', arrowOutScale);
	arrow_earthOut.classList.toggle('hide', arrowOutScale === 0)

	// S is constant in both models
	const S_scale = ((100 / 110) * (sliders.S.value)) / 100;
	const A_scale = S_scale * (sliders.A.value / 100);
	arrow_S.style.setProperty('--arrow-scale', S_scale);
	arrow_S.classList.toggle('hide',  +sliders.S.value === 0)

	// green house gases
	arrow_GH_gases.style.setProperty('--arrow-scale', arrowOutScale * (1 - tIR));
	arrow_GH_gases.classList.toggle('hide',  1 - tIR === 0 || arrowOutScale === 0);

	// calculating arrow sizes
	if (advanced) {
		arrow_A.style.setProperty('--arrow-scale', A_scale);
		arrow_A.classList.toggle('hide',  A_scale === 0)
		// atmos out (S - A)
		const out = S_scale * (1 - (sliders.A.value / 100))
		arrow_AtmosOut.style.setProperty('--arrow-scale', out);
		arrow_AtmosOut.classList.toggle('hide',  out === 0)
	} else {
		// atmos out
		arrow_AtmosOut.style.setProperty('--arrow-scale', S_scale);
		arrow_AtmosOut.classList.toggle('hide',  +sliders.S.value === 0)
	}
	
	// stippling of greenhouse
	const dotInt = (parseInt(Math.abs(sliders.tIR.value * 10)) / 10);
	const dotScale = dotInt === 0 ? 0 : (1.2 - dotInt) * 1.5;
	pattern.setAttribute('patternTransform', `scale(${dotScale})`)
	circles.forEach(el => el.setAttribute('r', 5 * dotInt));

	// update scene
	earthGroup.style.setProperty('--atmos-size', (1 - tIR) / 4);
	
	let albedoBrightness, albedoOpacity;
	
	if (sliders.A.value <= 30) {
		albedoBrightness = (1 / 30) * sliders.A.value;
		albedoOpacity = 1;
	} else {
		albedoBrightness = 1 + (1 / 70) * (sliders.A.value - 30);
		albedoOpacity = 1 - (1 / 70) * (sliders.A.value - 30);
	}
	earthGroup.style.setProperty('--albedo-brightness', albedoBrightness);
	earthGroup.style.setProperty('--albedo-opacity', albedoOpacity);
	body.style.setProperty('--sun-strength', sliders.S.value / 100);

	// update thermometer
	const yRange = (110 * ((1 / T_range) * Temp.Kelvin));
	thermometerMercury.style.transform = `translate(0, ${yRange * -1}px)`
	surfaceTemp.textContent = Temp.Celius + '°C';
}


// MATHS

function calc_T(S = 1370, A = 0.3, tVIS = 0.8, tIR = 0.1) {
	const FS = S / 4;
	// Surface temp (K)
	const T = Math.pow((FS * (1 - A)) * (1 + tVIS) / (sigma * (1 + tIR)), 0.25);
	// in degrees
	const T_degrees = (T - 273.15).toFixed(1);
	// output
	return {
		Kelvin: T,
		Celius: T_degrees
	};
}

// INIT

updateScene();