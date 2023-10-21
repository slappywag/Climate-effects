(()=>{var k=`
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
`,c=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=k,this.label=this.shadowRoot.querySelector("label"),this.input=this.shadowRoot.querySelector("input"),this.output=this.shadowRoot.querySelector("output"),this.track=this.shadowRoot.querySelector(".track"),this.trackFill=this.shadowRoot.querySelector(".track-fill"),this.label.textContent=this.getAttribute("label"),this._prefix=this.getAttribute("output-prefix")||"",this._suffix=this.getAttribute("output-suffix")||"",this._showOutput=this.getAttribute("show-output")!=="false",this._showFill=!0,this.hasAttribute("show-fill")&&(this._showFill=this.getAttribute("show-fill")!=="false"),this.hasAttribute("fill-start")&&/\d+/.test(this.getAttribute("fill-start"))&&(this._fillStart=Number(this.getAttribute("fill-start"))),this.range={min:0,max:100,step:1,value:0}}connectedCallback(){let r=`ui-range-input-${document.querySelectorAll(this.tagName).length}`;this.input.setAttribute("id",r),this.label.setAttribute("for",r),this.output.setAttribute("for",r),this._changeEvent=new Event("change"),this._inputEvent=new Event("input"),this.input.addEventListener("input",a=>{this.range.value=a.target.value,this.update(),this.dispatchEvent(this._inputEvent)}),this.input.addEventListener("change",a=>{this.range.value=a.target.value,this.dispatchEvent(this._changeEvent)}),this.update()}renderOutput(){this.output.textContent=`${this._prefix} ${this.range.value} ${this._suffix}`}renderFill(){let{min:t,max:r,value:a}=this.range,i=isNaN(this._fillStart)?+t:this._fillStart,o=r-t,l=1/o*(i-t),u=1/o*(r-i),n=Math.abs(a-i),b=o*l*(100/o),m=o*u*(100/o);a<i?b=(o*l-n)*(100/o):m=(o*u-n)*(100/o),this.trackFill.style.clipPath=`inset(0 ${m}% 0 ${b}% round var(--track-height))`}update(){this._showFill&&this.renderFill(),this._showOutput&&this.renderOutput()}updateRange(){Object.keys(this.range).forEach(t=>{t==="value"?this.input.value=this.range[t]:this.input.setAttribute(t,this.range[t])}),this.update()}attributeChangedCallback(t,r,a){a!==r&&(this.range[t]=a,this.updateRange())}static get observedAttributes(){return["min","max","step","value"]}get disabled(){return this.input.disabled}set disabled(t){this.input.disabled=t,this.classList.toggle("disabled",t)}get value(){return this.range.value}set value(t){this.range.value=+t,this.updateRange()}};customElements.define("ui-range-input",c);var x=document.getElementById("mercury"),S=document.getElementById("stipple"),E=document.querySelectorAll("circle"),g=document.querySelector(".arrow-S"),d=document.querySelector(".arrow-A"),h=document.querySelector(".arrow-atmos-out"),v=document.querySelector(".arrow-gh-gases"),f=document.querySelector(".earth-group"),A=document.querySelector("body"),_=document.getElementById("reflectivity-group"),w=!1;window.location.hash&&window.location.hash==="#advanced"&&(w=!0,_.classList.add("show"),d.classList.add("show"));var z=1370,I=5670374419e-17,R=document.getElementById("surfaceTemp"),q=document.getElementById("reset"),y=document.getElementById("dialog");["sun-info","greenhouse-info","reflectivity-info"].forEach(e=>{let t=document.getElementById(e),r=e.split("-")[0];t.addEventListener("click",()=>{y.className="show-"+r,y.showModal()})});var T={S:100,A:30,tVIS:80,tIR:-10};q.addEventListener("click",()=>{Object.keys(s).forEach(e=>{s[e].value=T[e]}),p()});var s={S:document.getElementById("solar-flux"),A:document.getElementById("albedo"),tVIS:document.getElementById("visible-transimittance"),tIR:document.getElementById("infrared-transimittance")};Object.keys(s).forEach(e=>{s[e].addEventListener("input",()=>p())});function p(){let e=Math.abs(s.tIR.value)*.01,t=B(z*(s.S.value/100),s.A.value*.01,s.tVIS.value*.01,e),r=100/110*s.S.value/100,a=r*(s.A.value/100);if(g.style.setProperty("--arrow-scale",r),g.style.opacity=s.S.value>0?1:0,v.style.setProperty("--arrow-scale",1-e),v.style.opacity=1-e===0?0:1,w){d.style.setProperty("--arrow-scale",a),d.style.opacity=a>0?1:0;let n=r*(1-s.A.value/100);h.style.setProperty("--arrow-scale",n),h.style.opacity=n>0?1:0}else h.style.setProperty("--arrow-scale",r),h.style.opacity=s.S.value>0?1:0;let i=e===1?0:(e+.2)*1.5,o=1.1-e;S.setAttribute("patternTransform",`scale(${i})`),E.forEach(n=>n.setAttribute("r",5*o)),f.style.setProperty("--atmos-size",(1-e)/4),f.style.setProperty("--albedo-effect",s.A.value/100),A.style.setProperty("--sun-strength",s.S.value/100);let u=110*(1/400*+t.Kelvin);x.style.transform=`translate(0, ${u*-1}px)`,R.textContent=t.Celius+"\xB0C"}function B(e=1370,t=.3,r=.8,a=.1){let i=e/4,o=Math.pow(i*(1-t)*(1+r)/(I*(1+a)),.25),l=(o-273.15).toFixed(1);return{Kelvin:o,Celius:l}}p();})();
