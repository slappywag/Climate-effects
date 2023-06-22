/**
 * UI-RANGE_INPUT - Custom Element
 * ===============================
 * Element API Overview
 * @property {boolean} "disabled"
 * @attribute          "disabled"
 * @property {number}  "value"
 * @attribute          "value"
 * @event    {event}   "change"
 * @event    {event}   "input"
 */

const TEMPLATE = `
	<style>
		:host,
		:host::before,
		:host::after {
			box-sizing: border-box;
		}
		:host {
			--width: 200px;
			--fill-color: var(--primary-600);
			--fill-hover-color: var(--primary-500);
			--fill-background: var(--primary-100);
			--fill-radius: 20px;
			--track-height: calc(var(--thumb-size) / 4);
			--thumb-size: 28px;
			--thumb-color: var(--primary-600);
			--thumb-hover-color: var(--primary-500);
			--thumb-shadow: none;
			--thumb-shadow-hover: var(--shadow-lvl-2);
		}
		:host {
			display: flex;
			flex-direction: column;
			position: relative;
			width: var(--width);
			margin: .5rem 0;
		}

		.input-wrap {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			height: var(--thumb-size);
		}

		/* input styles */

		input[type=range] {
			-webkit-appearance: none;
			width: 100%;
			height: var(--thumb-size);
			margin: 0;
			position: absolute;
			cursor: -webkit-grab;
			cursor: grab;
			outline: none;
			background: none;
		}

		input[type=range]:active {
			cursor: -webkit-grabbing;
			cursor: grabbing;
		}
		
		/* Track */

		.track {
			position: absolute;
			display: block;
			width: calc(100% - (var(--thumb-size)));
			height: var(--track-height);
			background-color: var(--primary-100);
			border-radius: var(--track-height);
		}
		.track-fill {
			position: absolute;
			left: 0;
			width: 100%;
			height: inherit;
			background-color: var(--fill-color);
			border-radius: inherit;
			clip-path: inset(0% 100%);
			transition: background-color .15s;
		}

		:host(:hover) .track-fill {
			background-color: var(--fill-hover-color);
		}

		:host([show-fill=false]) .track-fill {
			visibility: hidden;
		}

		/* Thumb */
		
		input[type=range]::-webkit-slider-thumb {
			appearance: none;
			height: var(--thumb-size);
			width: var(--thumb-size);
			transform: var(--thumb-transform);
			border-radius: var(--thumb-radius, 50%);
			background: var(--thumb-color);
			border: 2px solid white;
			box-shadow: var(--thumb-shadow);
			pointer-events: auto;
			transition: 0.1s;
		}
		input[type=range]::-moz-range-thumb {
			appearance: none;
			height: var(--thumb-size);
			width: var(--thumb-size);
			transform: var(--thumb-transform);
			border-radius: var(--thumb-radius, 50%);
			background: var(--thumb-color);
			border: 2px solid white;
			box-shadow: var(--thumb-shadow);
			pointer-events: auto;
			transition: 0.1s;
		}
		input[type=range]::-ms-thumb {
			appearance: none;
			height: var(--thumb-size);
			width: var(--thumb-size);
			transform: var(--thumb-transform);
			border-radius: var(--thumb-radius, 50%);
			background-color: var(--thumb-color);
			border: 2px solid white;
			box-shadow: var(--thumb-shadow);
			pointer-events: auto;
			transition: all 0.1s;
		}

		:host(:hover) input[type=range]::-webkit-slider-thumb {
			box-shadow: var(--thumb-shadow-hover);
			background-color: var(--thumb-hover-color);
		}
		:host(:hover) input[type=range]::-moz-range-thumb {
			box-shadow: var(--thumb-shadow-hover);
			background-color: var(--thumb-hover-color);
		}
		:host(:hover) input[type=range]::-ms-thumb {
			box-shadow: var(--thumb-shadow-hover);
			background-color: var(--thumb-hover-color);
		}
		
		/* Label + output */

		.label-output-group {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			gap: 2rem;
			padding: 0 calc(var(--thumb-size) / 2);
			margin-bottom: 8px;
		}

		label {
			flex-grow: 1;
			text-align: left;
			-webkit-user-select: none;
			user-select: none;
			white-space: nowrap
		}

		output {
			white-space: nowrap;
			text-align: right;
			-webkit-user-select: none;
			user-select: none;
		}

		:host([show-output=false]) output {
			display: none;
		}

		/* Disabled */

		:host(.disabled) {
			cursor: not-allowed;
			color: #8f8f8f;
		}

		:host(.disabled) input[type=range]::-webkit-slider-thumb {
			box-shadow: none;
			background-color: #8f8f8f;
		}
		:host(.disabled) input[type=range]::-moz-range-thumb {
			box-shadow: none;
			background-color: #8f8f8f;
		}
		:host(.disabled) input[type=range]::-ms-thumb {
			box-shadow: none;
			background-color: #8f8f8f;
		}

		:host(.disabled) .track-fill {
			background-color: #8f8f8f;
		}

		:host(.disabled) .track {
			background-color: lightgrey;
		}

		/* Focus */

		input:focus-visible {
			outline: 3px solid var(--focus-color);
			outline-offset: 2px;
		}
		@supports not selector(:focus-visible) {
			input:focus {
				outline: 3px solid var(--focus-color);
				outline-offset: 2px;
			}
		}
	</style>
	<div class="label-output-group">
		<label for=""></label>
		<output for=""></output>
	</div>
	<div class="input-wrap">
		<div class="track">
			<span class="track-fill"></span>
		</div>
		<input id="" type="range"/>
	</div>
`;


class UI_RANGE extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = TEMPLATE;
		// Elements
		this.label = this.shadowRoot.querySelector('label');
		this.input = this.shadowRoot.querySelector('input');
		this.output = this.shadowRoot.querySelector('output');
		this.track = this.shadowRoot.querySelector('.track');
		this.trackFill = this.shadowRoot.querySelector('.track-fill');
		// set label
		this.label.textContent = this.getAttribute('label');
		// output
		this._prefix = this.getAttribute('output-prefix') || '';
		this._suffix = this.getAttribute('output-suffix') || '';
		this._showOutput = this.getAttribute('show-output') !== 'false';
		// fill
		this._showFill = true;
		if (this.hasAttribute('show-fill')) {
			this._showFill = this.getAttribute('show-fill') !== 'false';
		}
		if (this.hasAttribute('fill-start') && /\d+/.test(this.getAttribute('fill-start'))) {
			this._fillStart = Number(this.getAttribute('fill-start'));
		}
		// range (defaults)
		this.range = {
			min: 0,
			max: 100,
			step: 1,
			value: 0
		}
	}
	connectedCallback() {
		// create a unique id
		let n = document.querySelectorAll(this.tagName).length;
		let id = `ui-range-input-${n}`;
		// set ids
		this.input.setAttribute('id', id);
		this.label.setAttribute('for', id);
		this.output.setAttribute('for', id);

		// outgoing events
		this._changeEvent = new Event('change');
		this._inputEvent = new Event('input');

		// input events
		this.input.addEventListener('input', event => {
			this.range.value = event.target.value;
			this.update();
			this.dispatchEvent(this._inputEvent);
		});
		this.input.addEventListener('change', event => {
			this.range.value = event.target.value;
			this.dispatchEvent(this._changeEvent);
		});

		// initial render
		this.update();
	}

	renderOutput() {
		this.output.textContent = `${this._prefix} ${this.range.value} ${this._suffix}`;
	}

	renderFill() {
		// default from left, or offset
		let { min, max, value } = this.range;
		let fillStart = isNaN(this._fillStart) ? +min : this._fillStart;
		// total range of the slider
		let range = max - min;
		// ratio of range either side of the fillstart
		let l_ratio = (1 / range) * (fillStart - min);
		let r_ratio = (1 / range) * (max - fillStart);
		// the absolute offset of the slider
		let slider_offset = Math.abs(value - fillStart);
		// default inset percentages if slider value = fillStart
		let l = (range * l_ratio) * (100 / range),
			r = (range * r_ratio) * (100 / range);
		// update left and right percentages as the slider moves above or below the slider
		if (value < fillStart) {
			l = ((range * l_ratio) - slider_offset) * (100 / range);
		} else {
			r = ((range * r_ratio) - slider_offset) * (100 / range);
		}
		// clip the track
		this.trackFill.style.clipPath = `inset(0 ${r}% 0 ${l}% round var(--track-height))`;
	}

	update() {
		// fill
		this._showFill && this.renderFill();
		// output
		this._showOutput && this.renderOutput();
	}

	updateRange() {
		Object.keys(this.range).forEach(key => {
			if (key === 'value') {
				this.input.value = this.range[key];
			} else {
				this.input.setAttribute(key, this.range[key]);
			}
		});
		this.update();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue !== oldValue) {
			this.range[name] = newValue;
			this.updateRange();
		}
	}

	static get observedAttributes() {
		return ['min', 'max', 'step', 'value'];
	}

	get disabled() {
		return this.input.disabled;
	}

	set disabled(val) {
		this.input.disabled = val;
		this.classList.toggle('disabled', val);
	}

	get value() {
		return this.range.value;
	}

	set value(val) {
		this.range.value = +val;
		this.updateRange();
	}
}

customElements.define('ui-range-input', UI_RANGE);
