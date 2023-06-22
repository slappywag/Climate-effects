(()=>{var p=`
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
			--thumb-size: 22px;
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
`,n=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=p,this.label=this.shadowRoot.querySelector("label"),this.input=this.shadowRoot.querySelector("input"),this.output=this.shadowRoot.querySelector("output"),this.track=this.shadowRoot.querySelector(".track"),this.trackFill=this.shadowRoot.querySelector(".track-fill"),this.label.textContent=this.getAttribute("label"),this._prefix=this.getAttribute("output-prefix")||"",this._suffix=this.getAttribute("output-suffix")||"",this._showOutput=this.getAttribute("show-output")!=="false",this._showFill=!0,this.hasAttribute("show-fill")&&(this._showFill=this.getAttribute("show-fill")!=="false"),this.hasAttribute("fill-start")&&/\d+/.test(this.getAttribute("fill-start"))&&(this._fillStart=Number(this.getAttribute("fill-start"))),this.range={min:0,max:100,step:1,value:0}}connectedCallback(){let o=`ui-range-input-${document.querySelectorAll(this.tagName).length}`;this.input.setAttribute("id",o),this.label.setAttribute("for",o),this.output.setAttribute("for",o),this._changeEvent=new Event("change"),this._inputEvent=new Event("input"),this.input.addEventListener("input",i=>{this.range.value=i.target.value,this.update(),this.dispatchEvent(this._inputEvent)}),this.input.addEventListener("change",i=>{this.range.value=i.target.value,this.dispatchEvent(this._changeEvent)}),this.update()}renderOutput(){this.output.textContent=`${this._prefix} ${this.range.value} ${this._suffix}`}renderFill(){let{min:t,max:o,value:i}=this.range,s=isNaN(this._fillStart)?+t:this._fillStart,e=o-t,l=1/e*(s-t),u=1/e*(o-s),h=Math.abs(i-s),d=e*l*(100/e),c=e*u*(100/e);i<s?d=(e*l-h)*(100/e):c=(e*u-h)*(100/e),this.trackFill.style.clipPath=`inset(0 ${c}% 0 ${d}% round var(--track-height))`}update(){this._showFill&&this.renderFill(),this._showOutput&&this.renderOutput()}updateRange(){Object.keys(this.range).forEach(t=>{t==="value"?this.input.value=this.range[t]:this.input.setAttribute(t,this.range[t])}),this.update()}attributeChangedCallback(t,o,i){i!==o&&(this.range[t]=i,this.updateRange())}static get observedAttributes(){return["min","max","step","value"]}get disabled(){return this.input.disabled}set disabled(t){this.input.disabled=t,this.classList.toggle("disabled",t)}get value(){return this.range.value}set value(t){this.range.value=+t,this.updateRange()}};customElements.define("ui-range-input",n);var g=1370,v=5670374419e-17,m=document.getElementById("surfaceTemp"),r={S:document.getElementById("solar-flux"),A:document.getElementById("albedo"),tVIS:document.getElementById("visible-transimittance"),tIR:document.getElementById("infrared-transimittance")};Object.keys(r).forEach(a=>{r[a].addEventListener("input",t=>b())});function b(){let a=f(g*(r.S.value/100),r.A.value*.01,r.tVIS.value*.01,r.tIR.value*.01);document.querySelector(".arrow-flux").style.setProperty("--arrow-scale",r.S.value/100),document.querySelector(".arrow-albedo").style.setProperty("--arrow-scale",r.A.value/100),document.querySelector(".arrow-infrared").style.setProperty("--arrow-scale",r.tIR.value/100),document.querySelector(".earth").style.setProperty("--atmos-size",.99+r.tIR.value/2e3),document.querySelector(".sun").style.setProperty("--sun-strength",r.S.value/100),document.querySelector(".earth").style.setProperty("--albedo-effect",r.A.value/100),m.textContent=a.Celius+"\xB0C"}function f(a=1370,t=.3,o=.8,i=.1){let s=a/4,e=Math.pow(s*(1-t)*(1+o)/(v*(1+i)),.25),l=(e-273.15).toFixed(1);return{Kelvin:e,Celius:l}}b();})();
