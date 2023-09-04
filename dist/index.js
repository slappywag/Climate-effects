(()=>{var m=`
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
`,c=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=m,this.label=this.shadowRoot.querySelector("label"),this.input=this.shadowRoot.querySelector("input"),this.output=this.shadowRoot.querySelector("output"),this.track=this.shadowRoot.querySelector(".track"),this.trackFill=this.shadowRoot.querySelector(".track-fill"),this.label.textContent=this.getAttribute("label"),this._prefix=this.getAttribute("output-prefix")||"",this._suffix=this.getAttribute("output-suffix")||"",this._showOutput=this.getAttribute("show-output")!=="false",this._showFill=!0,this.hasAttribute("show-fill")&&(this._showFill=this.getAttribute("show-fill")!=="false"),this.hasAttribute("fill-start")&&/\d+/.test(this.getAttribute("fill-start"))&&(this._fillStart=Number(this.getAttribute("fill-start"))),this.range={min:0,max:100,step:1,value:0}}connectedCallback(){let r=`ui-range-input-${document.querySelectorAll(this.tagName).length}`;this.input.setAttribute("id",r),this.label.setAttribute("for",r),this.output.setAttribute("for",r),this._changeEvent=new Event("change"),this._inputEvent=new Event("input"),this.input.addEventListener("input",o=>{this.range.value=o.target.value,this.update(),this.dispatchEvent(this._inputEvent)}),this.input.addEventListener("change",o=>{this.range.value=o.target.value,this.dispatchEvent(this._changeEvent)}),this.update()}renderOutput(){this.output.textContent=`${this._prefix} ${this.range.value} ${this._suffix}`}renderFill(){let{min:t,max:r,value:o}=this.range,i=isNaN(this._fillStart)?+t:this._fillStart,a=r-t,n=1/a*(i-t),h=1/a*(r-i),l=Math.abs(o-i),u=a*n*(100/a),p=a*h*(100/a);o<i?u=(a*n-l)*(100/a):p=(a*h-l)*(100/a),this.trackFill.style.clipPath=`inset(0 ${p}% 0 ${u}% round var(--track-height))`}update(){this._showFill&&this.renderFill(),this._showOutput&&this.renderOutput()}updateRange(){Object.keys(this.range).forEach(t=>{t==="value"?this.input.value=this.range[t]:this.input.setAttribute(t,this.range[t])}),this.update()}attributeChangedCallback(t,r,o){o!==r&&(this.range[t]=o,this.updateRange())}static get observedAttributes(){return["min","max","step","value"]}get disabled(){return this.input.disabled}set disabled(t){this.input.disabled=t,this.classList.toggle("disabled",t)}get value(){return this.range.value}set value(t){this.range.value=+t,this.updateRange()}};customElements.define("ui-range-input",c);var g=1370,v=5670374419e-17,f=document.getElementById("surfaceTemp"),y=document.getElementById("reset"),b=document.getElementById("dialog");["sun-info","greenhouse-info","reflectivity-info"].forEach(e=>{let t=document.getElementById(e),r=e.split("-")[0];t.addEventListener("click",()=>{b.className="show-"+r,b.showModal()})});var w={S:100,A:30,tVIS:80,tIR:-10};y.addEventListener("click",()=>{Object.keys(s).forEach(e=>{s[e].value=w[e]}),d()});var s={S:document.getElementById("solar-flux"),A:document.getElementById("albedo"),tVIS:document.getElementById("visible-transimittance"),tIR:document.getElementById("infrared-transimittance")};Object.keys(s).forEach(e=>{s[e].addEventListener("input",t=>d())});var x=document.getElementById("mercury"),k=document.getElementById("stipple"),S=document.querySelectorAll("circle");function d(){let e=Math.abs(s.tIR.value)*.01,t=E(g*(s.S.value/100),s.A.value*.01,s.tVIS.value*.01,e),r=Math.max(s.A.value/100,.1),o=r*e,i=r-o;document.querySelector(".arrow-flux").style.setProperty("--arrow-scale",s.S.value/100),document.querySelector(".arrow-flux").style.opacity=s.S.value>0?1:0,document.querySelector(".arrow-albedo").style.setProperty("--arrow-scale",r),document.querySelector(".arrow-albedo").style.opacity=r>0?1:0,document.querySelector(".arrow-infrared").style.setProperty("--arrow-scale",o),document.querySelector(".arrow-infrared").style.opacity=o>0?1:0,document.querySelector(".arrow-visible").style.setProperty("--arrow-scale",i),document.querySelector(".arrow-visible").style.opacity=i>0?1:0;let a=e===1?0:(e+.2)*1.5,n=1.1-e;k.setAttribute("patternTransform",`scale(${a})`),S.forEach(u=>u.setAttribute("r",5*n)),document.querySelector(".earth-group").style.setProperty("--atmos-size",(1-e)/4),document.querySelector("body").style.setProperty("--sun-strength",s.S.value/100),document.querySelector(".earth-group").style.setProperty("--albedo-effect",s.A.value/100);let l=110*(1/400*+t.Kelvin);x.style.transform=`translate(0, ${l*-1}px)`,f.textContent=t.Celius+"\xB0C"}function E(e=1370,t=.3,r=.8,o=.1){let i=e/4,a=Math.pow(i*(1-t)*(1+r)/(v*(1+o)),.25),n=(a-273.15).toFixed(1);return{Kelvin:a,Celius:n}}d();})();
