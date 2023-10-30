(()=>{var _=`
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
`,h=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=_,this.label=this.shadowRoot.querySelector("label"),this.input=this.shadowRoot.querySelector("input"),this.output=this.shadowRoot.querySelector("output"),this.track=this.shadowRoot.querySelector(".track"),this.trackFill=this.shadowRoot.querySelector(".track-fill"),this.label.textContent=this.getAttribute("label"),this._prefix=this.getAttribute("output-prefix")||"",this._suffix=this.getAttribute("output-suffix")||"",this._showOutput=this.getAttribute("show-output")!=="false",this._showFill=!0,this.hasAttribute("show-fill")&&(this._showFill=this.getAttribute("show-fill")!=="false"),this.hasAttribute("fill-start")&&/\d+/.test(this.getAttribute("fill-start"))&&(this._fillStart=Number(this.getAttribute("fill-start"))),this.range={min:0,max:100,step:1,value:0}}connectedCallback(){let r=`ui-range-input-${document.querySelectorAll(this.tagName).length}`;this.input.setAttribute("id",r),this.label.setAttribute("for",r),this.output.setAttribute("for",r),this._changeEvent=new Event("change"),this._inputEvent=new Event("input"),this.input.addEventListener("input",o=>{this.range.value=o.target.value,this.update(),this.dispatchEvent(this._inputEvent)}),this.input.addEventListener("change",o=>{this.range.value=o.target.value,this.dispatchEvent(this._changeEvent)}),this.update()}renderOutput(){this.output.textContent=`${this._prefix} ${this.range.value} ${this._suffix}`}renderFill(){let{min:t,max:r,value:o}=this.range,i=isNaN(this._fillStart)?+t:this._fillStart,a=r-t,n=1/a*(i-t),l=1/a*(r-i),p=Math.abs(o-i),b=a*n*(100/a),m=a*l*(100/a);o<i?b=(a*n-p)*(100/a):m=(a*l-p)*(100/a),this.trackFill.style.clipPath=`inset(0 ${m}% 0 ${b}% round var(--track-height))`}update(){this._showFill&&this.renderFill(),this._showOutput&&this.renderOutput()}updateRange(){Object.keys(this.range).forEach(t=>{t==="value"?this.input.value=this.range[t]:this.input.setAttribute(t,this.range[t])}),this.update()}attributeChangedCallback(t,r,o){o!==r&&(this.range[t]=o,this.updateRange())}static get observedAttributes(){return["min","max","step","value"]}get disabled(){return this.input.disabled}set disabled(t){this.input.disabled=t,this.classList.toggle("disabled",t)}get value(){return this.range.value}set value(t){this.range.value=+t,this.updateRange()}};customElements.define("ui-range-input",h);var A=document.getElementById("mercury"),I=document.getElementById("stipple"),z=document.querySelectorAll("circle"),g=document.querySelector(".arrow-S"),c=document.querySelector(".arrow-A"),u=document.querySelector(".arrow-atmos-out"),v=document.querySelector(".arrow-gh-gases"),f=document.querySelector(".arrow-earth-out"),y=document.querySelector(".earth-group"),q=document.querySelector("body"),R=document.getElementById("reflectivity-group"),x=!1;window.location.hash&&window.location.hash==="#advanced"&&(x=!0,R.classList.add("show"),c.classList.add("show"));var S=1370,T=5670374419e-17,B=document.getElementById("surfaceTemp"),L=document.getElementById("reset"),w=document.getElementById("dialog");["sun-info","greenhouse-info","reflectivity-info"].forEach(e=>{let t=document.getElementById(e),r=e.split("-")[0];t.addEventListener("click",()=>{w.className="show-"+r,w.showModal()})});var P={S:100,A:30,tVIS:80,tIR:-10};L.addEventListener("click",()=>{Object.keys(s).forEach(e=>{s[e].value=P[e]}),d()});var s={S:document.getElementById("solar-flux"),A:document.getElementById("albedo"),tVIS:document.getElementById("visible-transimittance"),tIR:document.getElementById("infrared-transimittance")};Object.keys(s).forEach(e=>{s[e].addEventListener("input",()=>d())});var k=E(S,0,1,0).Kelvin- -273.1;function d(){let e=Math.abs(s.tIR.value)*.01,t=E(S*(s.S.value/100),s.A.value*.01,s.tVIS.value*.01,e),r=1/k*t.Kelvin;f.style.setProperty("--arrow-scale",r),f.style.opacity=r>0?1:0;let o=100/110*s.S.value/100,i=o*(s.A.value/100);if(g.style.setProperty("--arrow-scale",o),g.style.opacity=s.S.value>0?1:0,v.style.setProperty("--arrow-scale",r*(1-e)),v.style.opacity=1-e===0||r===0?0:1,x){c.style.setProperty("--arrow-scale",i),c.style.opacity=i>0?1:0;let n=o*(1-s.A.value/100);u.style.setProperty("--arrow-scale",n),u.style.opacity=n>0?1:0}else u.style.setProperty("--arrow-scale",o),u.style.opacity=s.S.value>0?1:0;if(Math.abs(s.tIR.value%10)===0){let n=e===1?0:(e+.2)*1.5;I.setAttribute("patternTransform",`scale(${n})`),z.forEach(l=>l.setAttribute("r",5*(1-e)))}y.style.setProperty("--atmos-size",(1-e)/4),y.style.setProperty("--albedo-effect",s.A.value/100),q.style.setProperty("--sun-strength",s.S.value/100);let a=110*(1/k*t.Kelvin);A.style.transform=`translate(0, ${a*-1}px)`,B.textContent=t.Celius+"\xB0C"}function E(e=1370,t=.3,r=.8,o=.1){let i=e/4,a=Math.pow(i*(1-t)*(1+r)/(T*(1+o)),.25),n=(a-273.15).toFixed(1);return{Kelvin:a,Celius:n}}d();})();
