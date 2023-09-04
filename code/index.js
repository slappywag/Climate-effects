import './ui-slider';

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
	tIR: -10
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

Object.keys(sliders).forEach(key => {
	sliders[key].addEventListener('input', e => updateScene());
});


const thermometerMercury = document.getElementById('mercury');

const pattern = document.getElementById('stipple');
const circles = document.querySelectorAll('circle');

function updateScene() {

	const tIR = Math.abs(sliders.tIR.value) * 0.01;

	// update temp
	const Temp = calc_T(
		S_max * (sliders.S.value / 100),
		sliders.A.value * 0.01,
		sliders.tVIS.value * 0.01,
		tIR
	);


	// arrows
		
	const emitted = Math.max(sliders.A.value / 100, 0.1);
	const escaped = emitted * tIR;
	const trapped = emitted - escaped;

	
	document.querySelector('.arrow-flux').style.setProperty('--arrow-scale', sliders.S.value / 100);
	document.querySelector('.arrow-flux').style.opacity = sliders.S.value > 0 ? 1 : 0;
	
	document.querySelector('.arrow-albedo').style.setProperty('--arrow-scale', emitted);
	document.querySelector('.arrow-albedo').style.opacity = emitted > 0 ? 1 : 0;

	// light that makes it into space
	document.querySelector('.arrow-infrared').style.setProperty('--arrow-scale', escaped);
	document.querySelector('.arrow-infrared').style.opacity = escaped > 0 ? 1 : 0;

	// trapped light by greenhouse gases
	document.querySelector('.arrow-visible').style.setProperty('--arrow-scale', trapped);
	document.querySelector('.arrow-visible').style.opacity = trapped > 0 ? 1 : 0;

	// stippling of greenhouse
	const scale = tIR === 1 ? 0 : (tIR + 0.2) * 1.5;
	const inverse = 1.1 - tIR;
	pattern.setAttribute('patternTransform', `scale(${ scale })`)
	circles.forEach( el => el.setAttribute( 'r', 5 * inverse ));


	document.querySelector('.earth-group').style.setProperty('--atmos-size', (1 - tIR) / 4);
	document.querySelector('body').style.setProperty('--sun-strength', sliders.S.value / 100);
	document.querySelector('.earth-group').style.setProperty('--albedo-effect', (sliders.A.value / 100));

	// update thermometer
	const tempRange = 400;
	const yRange = (110 * ((1 / tempRange) * +Temp.Kelvin));
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