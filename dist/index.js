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
`,p=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=_,this.label=this.shadowRoot.querySelector("label"),this.input=this.shadowRoot.querySelector("input"),this.output=this.shadowRoot.querySelector("output"),this.track=this.shadowRoot.querySelector(".track"),this.trackFill=this.shadowRoot.querySelector(".track-fill"),this.label.textContent=this.getAttribute("label"),this._prefix=this.getAttribute("output-prefix")||"",this._suffix=this.getAttribute("output-suffix")||"",this._showOutput=this.getAttribute("show-output")!=="false",this._showFill=!0,this.hasAttribute("show-fill")&&(this._showFill=this.getAttribute("show-fill")!=="false"),this.hasAttribute("fill-start")&&/\d+/.test(this.getAttribute("fill-start"))&&(this._fillStart=Number(this.getAttribute("fill-start"))),this.range={min:0,max:100,step:1,value:0}}connectedCallback(){let e=`ui-range-input-${document.querySelectorAll(this.tagName).length}`;this.input.setAttribute("id",e),this.label.setAttribute("for",e),this.output.setAttribute("for",e),this._changeEvent=new Event("change"),this._inputEvent=new Event("input"),this.input.addEventListener("input",s=>{this.range.value=s.target.value,this.update(),this.dispatchEvent(this._inputEvent)}),this.input.addEventListener("change",s=>{this.range.value=s.target.value,this.dispatchEvent(this._changeEvent)}),this.update()}renderOutput(){this.output.textContent=`${this._prefix} ${this.range.value} ${this._suffix}`}renderFill(){let{min:t,max:e,value:s}=this.range,i=isNaN(this._fillStart)?+t:this._fillStart,a=e-t,n=1/a*(i-t),u=1/a*(e-i),h=Math.abs(s-i),c=a*n*(100/a),l=a*u*(100/a);s<i?c=(a*n-h)*(100/a):l=(a*u-h)*(100/a),this.trackFill.style.clipPath=`inset(0 ${l}% 0 ${c}% round var(--track-height))`}update(){this._showFill&&this.renderFill(),this._showOutput&&this.renderOutput()}updateRange(){Object.keys(this.range).forEach(t=>{t==="value"?this.input.value=this.range[t]:this.input.setAttribute(t,this.range[t])}),this.update()}attributeChangedCallback(t,e,s){t==="textvalue"?this.input.setAttribute("aria-textvalue",s):s!==e&&(this.range[t]=s,this.updateRange())}static get observedAttributes(){return["min","max","step","value","textvalue"]}get disabled(){return this.input.disabled}set disabled(t){this.input.disabled=t,this.classList.toggle("disabled",t)}get value(){return this.range.value}set value(t){this.range.value=+t,this.updateRange()}};customElements.define("ui-range-input",p);var I=document.getElementById("mercury"),L=document.getElementById("stipple"),z=document.querySelectorAll("circle"),m=document.querySelector(".arrow-S"),g=document.querySelector(".arrow-A"),d=document.querySelector(".arrow-atmos-out"),f=document.querySelector(".arrow-gh-gases"),w=document.querySelector(".arrow-earth-out"),b=document.querySelector(".earth-group"),R=document.querySelector("body"),T=document.getElementById("reflectivity-group"),S=!1;window.location.hash&&window.location.hash==="#advanced"&&(S=!0,T.classList.add("show"),g.classList.add("show"));var A=1370,q=5670374419e-17,B=document.getElementById("surfaceTemp"),P=document.getElementById("reset"),y=document.getElementById("dialog");["sun-info","greenhouse-info","reflectivity-info"].forEach(r=>{let t=document.getElementById(r),e=r.split("-")[0];t.addEventListener("click",()=>{y.className="show-"+e,y.showModal()})});var O={S:100,A:30,tVIS:80,tIR:.9};P.addEventListener("click",()=>{Object.keys(o).forEach(r=>{o[r].value=O[r]}),v()});var o={S:document.getElementById("solar-flux"),A:document.getElementById("albedo"),tVIS:document.getElementById("visible-transimittance"),tIR:document.getElementById("infrared-transimittance")};function x(r){let t=+o[r].value;if(r==="S"||r==="A")o[r].setAttribute("textvalue",t+"%");else if(r==="tIR"){let e;t===0?e="none":t<.25?e="minimal":t<.5?e="low":t<.775?e="moderate":t<.99?e="high":t===1&&(e="Lots"),o[r].setAttribute("textvalue",e)}}Object.keys(o).forEach(r=>{x(r),o[r].addEventListener("input",t=>{x(r),v()})});var k=E(A,0,1,0).Kelvin- -273.1;function v(){let r=1-+o.tIR.value,t=E(A*(o.S.value/100),o.A.value*.01,o.tVIS.value*.01,r),e=1/k*t.Kelvin;w.style.setProperty("--arrow-scale",e),w.classList.toggle("hide",e===0);let s=100/110*o.S.value/100,i=s*(o.A.value/100);if(m.style.setProperty("--arrow-scale",s),m.classList.toggle("hide",+o.S.value==0),f.style.setProperty("--arrow-scale",e*(1-r)),f.classList.toggle("hide",1-r===0||e===0),S){g.style.setProperty("--arrow-scale",i),g.classList.toggle("hide",i===0);let l=s*(1-o.A.value/100);d.style.setProperty("--arrow-scale",l),d.classList.toggle("hide",l===0)}else d.style.setProperty("--arrow-scale",s),d.classList.toggle("hide",+o.S.value==0);let a=parseInt(Math.abs(o.tIR.value*10))/10,n=a===0?0:(1.2-a)*1.5;L.setAttribute("patternTransform",`scale(${n})`),z.forEach(l=>l.setAttribute("r",5*a)),b.style.setProperty("--atmos-size",(1-r)/4);let u,h;o.A.value<=30?(u=1/30*o.A.value,h=1):(u=1+1/70*(o.A.value-30),h=1-1/70*(o.A.value-30)),b.style.setProperty("--albedo-brightness",u),b.style.setProperty("--albedo-opacity",h),R.style.setProperty("--sun-strength",o.S.value/100);let c=110*(1/k*t.Kelvin);I.style.transform=`translate(0, ${c*-1}px)`,B.textContent=t.Celius+"\xB0C"}function E(r=1370,t=.3,e=.8,s=.1){let i=r/4,a=Math.pow(i*(1-t)*(1+e)/(q*(1+s)),.25),n=(a-273.15).toFixed(1);return{Kelvin:a,Celius:n}}v();})();
