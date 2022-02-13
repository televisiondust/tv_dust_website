import{c as s,a as c,b as l,r as m}from"./vendor.889f417d.js";var r=Object.freeze,f=Object.defineProperty,d=(e,t)=>r(f(e,"raw",{value:r(t||e.slice())})),a;s("/src/components/background.astro",{modules:[],hydratedComponents:[],hydrationDirectives:new Set([]),hoisted:[]});const v=c("/src/components/background.astro","https://astro.build","file:///D:/Exp%20code%20stuff/tvdust_website/");l(async(e,t,n)=>{e.createAstro(v,t,n);const o=[{props:{"data-astro-id":"KEKU5UI2"},children:".canvasContainer.astro-KEKU5UI2 canvas.astro-KEKU5UI2{width:100vw;height:120vh;z-index:-1;border-bottom-right-radius:100%;}"}];for(const i of o)e.styles.add(i);return m(a||(a=d([`

		<div class="canvasContainer relative astro-KEKU5UI2">
			<canvas id="homecanvas" class="fixed top-1/2 left-0 transform  -translate-y-1/2 astro-KEKU5UI2"></canvas>

		</div>

        

		<script type="module">
		import * as THREE from 'three';
		import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
		// let THREE = {THREE};
		console.log({THREE});
		let t = 1;
		const canvas = document.querySelector('#homecanvas');
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

		const renderer = new THREE.WebGLRenderer({
			canvas,
			preserveDrawingBuffer: true,
			antialias: true,

		});


		renderer.autoClearColor = false;
		renderer.clear();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);


		const controls = new OrbitControls(camera, renderer.domElement);

		// const geometry = new THREE.PlaneGeometry(1, 1, 40, 40);
		const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);

		// const geometry = new THREE.SphereGeometry(100,10,10,0,Math.PI*2,0,Math.PI);
		const tex = new THREE.TextureLoader().load("assets/art2.png");

		// const material = new THREE.MeshBasicMaterial({color:0xffffff});
		// material.map= tex;
		// material.side = THREE.DoubleSide;

		const uniforms = {
			tex: {
				value: tex
			},
			time: {
				value: 0.0
			},
			l: {
				value: 1.0
			}

		};

		const material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader(),
			fragmentShader: fragShader(),
			wireframe: true,
		})

		material.uniformsNeedUpdate = true;
		const light = new THREE.DirectionalLight(0xff2fff, 2);
		const lightfill = new THREE.DirectionalLight(0x00ffff, 1);
		lightfill.position.set(-1, -2, -1);

		const mesh = new THREE.Mesh(geometry, material);

		scene.add(mesh);
		scene.add(light);
		scene.add(lightfill);
		camera.position.z = 10;
		// camera.position.x = -0.2;
		controls.update();

		function animate() {
			requestAnimationFrame(animate);
			t += 1;
			uniforms.time.value += 0.003;
			uniforms.l.value = 1;
			geometry.rotateX(.01);
			geometry.rotateY(.003);
			geometry.rotateZ(.02);
			mesh.position.x = Math.sin(uniforms.time.value * 2) * 0.3;
			camera.position.z = Math.sin(uniforms.time.value);
			// camera.position.y =
			controls.update();

			renderer.render(scene, camera);
		};

		animate();


		function vertexShader() {

	return \`
	varying vec3 vUv; 
	uniform sampler2D tex;
	uniform float time;
	uniform float l;

	float rand(vec2 c){
		return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}
	
	float noise(vec2 p, float freq ){
		float unit = 1.5/freq;   //screenwidth/freq
		vec2 ij = floor(p/unit);
		vec2 xy = mod(p,unit)/unit;
		//xy = 3.*xy*xy-2.*xy*xy*xy;
		xy = .5*(1.-cos(3.14*xy));
		float a = rand((ij+vec2(0.,0.)));
		float b = rand((ij+vec2(1.,0.)));
		float c = rand((ij+vec2(0.,1.)));
		float d = rand((ij+vec2(1.,1.)));
		float x1 = mix(a, b, xy.x);
		float x2 = mix(c, d, xy.x);
		return mix(x1, x2, xy.y);
	}
	
	float pNoise(vec2 p, int res){
		float persistance = .5;
		float n = 0.;
		float normK = 0.;
		float f = 4.;
		float amp = 1.;
		int iCount = 0;
		for (int i = 0; i<50; i++){
			n+=amp*noise(p, f);
			f*=2.;
			normK+=amp;
			amp*=persistance;
			if (iCount == res) break;
			iCount++;
		}
		float nf = n/normK;
		return nf*nf*nf*nf;
	}

    void main() {
      vUv = position; 

	  float n = pNoise(vec2(position.x+time ,position.y),100)*0.1;
	  float r =  texture2D(tex,vUv.xy+0.5).r;
	  float displacementHeight = .1 *r;
	  displacementHeight += 3.0*n;
	  vec3 mpos = position;
	  mpos.z += displacementHeight  ;
	  //mpos.y += texture2D(tex,vUv.xy+0.5).g*0.1;
	  //mpos.x += texture2D(tex,vUv.xy+0.5).b*0.2;
	  vec4 modelViewPosition = modelViewMatrix * vec4(mpos, 1.0);
      gl_Position = projectionMatrix *modelViewPosition; 
    }
	\`

		}

		function fragShader() {

			return \`

	varying vec3 vUv;
	uniform sampler2D tex;

	void main() {
		vec4 col = texture2D(tex,vUv.xy+0.5);
	  gl_FragColor = vec4(col.xyz, 1.0);
	}
	\`
		}


		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			const pixelRatio = window.devicePixelRatio;
			const width = canvas.clientWidth * pixelRatio | 0;
			const height = canvas.clientHeight * pixelRatio | 0;
			const needResize = canvas.width !== width || canvas.height !== height;
			if (needResize) {
				renderer.setSize(width, height, false);
			}
			return needResize;
		}
		<\/script>`],[`

		<div class="canvasContainer relative astro-KEKU5UI2">
			<canvas id="homecanvas" class="fixed top-1/2 left-0 transform  -translate-y-1/2 astro-KEKU5UI2"></canvas>

		</div>

        

		<script type="module">
		import * as THREE from 'three';
		import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
		// let THREE = {THREE};
		console.log({THREE});
		let t = 1;
		const canvas = document.querySelector('#homecanvas');
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

		const renderer = new THREE.WebGLRenderer({
			canvas,
			preserveDrawingBuffer: true,
			antialias: true,

		});


		renderer.autoClearColor = false;
		renderer.clear();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);


		const controls = new OrbitControls(camera, renderer.domElement);

		// const geometry = new THREE.PlaneGeometry(1, 1, 40, 40);
		const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);

		// const geometry = new THREE.SphereGeometry(100,10,10,0,Math.PI*2,0,Math.PI);
		const tex = new THREE.TextureLoader().load("assets/art2.png");

		// const material = new THREE.MeshBasicMaterial({color:0xffffff});
		// material.map= tex;
		// material.side = THREE.DoubleSide;

		const uniforms = {
			tex: {
				value: tex
			},
			time: {
				value: 0.0
			},
			l: {
				value: 1.0
			}

		};

		const material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader(),
			fragmentShader: fragShader(),
			wireframe: true,
		})

		material.uniformsNeedUpdate = true;
		const light = new THREE.DirectionalLight(0xff2fff, 2);
		const lightfill = new THREE.DirectionalLight(0x00ffff, 1);
		lightfill.position.set(-1, -2, -1);

		const mesh = new THREE.Mesh(geometry, material);

		scene.add(mesh);
		scene.add(light);
		scene.add(lightfill);
		camera.position.z = 10;
		// camera.position.x = -0.2;
		controls.update();

		function animate() {
			requestAnimationFrame(animate);
			t += 1;
			uniforms.time.value += 0.003;
			uniforms.l.value = 1;
			geometry.rotateX(.01);
			geometry.rotateY(.003);
			geometry.rotateZ(.02);
			mesh.position.x = Math.sin(uniforms.time.value * 2) * 0.3;
			camera.position.z = Math.sin(uniforms.time.value);
			// camera.position.y =
			controls.update();

			renderer.render(scene, camera);
		};

		animate();


		function vertexShader() {

	return \\\`
	varying vec3 vUv; 
	uniform sampler2D tex;
	uniform float time;
	uniform float l;

	float rand(vec2 c){
		return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}
	
	float noise(vec2 p, float freq ){
		float unit = 1.5/freq;   //screenwidth/freq
		vec2 ij = floor(p/unit);
		vec2 xy = mod(p,unit)/unit;
		//xy = 3.*xy*xy-2.*xy*xy*xy;
		xy = .5*(1.-cos(3.14*xy));
		float a = rand((ij+vec2(0.,0.)));
		float b = rand((ij+vec2(1.,0.)));
		float c = rand((ij+vec2(0.,1.)));
		float d = rand((ij+vec2(1.,1.)));
		float x1 = mix(a, b, xy.x);
		float x2 = mix(c, d, xy.x);
		return mix(x1, x2, xy.y);
	}
	
	float pNoise(vec2 p, int res){
		float persistance = .5;
		float n = 0.;
		float normK = 0.;
		float f = 4.;
		float amp = 1.;
		int iCount = 0;
		for (int i = 0; i<50; i++){
			n+=amp*noise(p, f);
			f*=2.;
			normK+=amp;
			amp*=persistance;
			if (iCount == res) break;
			iCount++;
		}
		float nf = n/normK;
		return nf*nf*nf*nf;
	}

    void main() {
      vUv = position; 

	  float n = pNoise(vec2(position.x+time ,position.y),100)*0.1;
	  float r =  texture2D(tex,vUv.xy+0.5).r;
	  float displacementHeight = .1 *r;
	  displacementHeight += 3.0*n;
	  vec3 mpos = position;
	  mpos.z += displacementHeight  ;
	  //mpos.y += texture2D(tex,vUv.xy+0.5).g*0.1;
	  //mpos.x += texture2D(tex,vUv.xy+0.5).b*0.2;
	  vec4 modelViewPosition = modelViewMatrix * vec4(mpos, 1.0);
      gl_Position = projectionMatrix *modelViewPosition; 
    }
	\\\`

		}

		function fragShader() {

			return \\\`

	varying vec3 vUv;
	uniform sampler2D tex;

	void main() {
		vec4 col = texture2D(tex,vUv.xy+0.5);
	  gl_FragColor = vec4(col.xyz, 1.0);
	}
	\\\`
		}


		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			const pixelRatio = window.devicePixelRatio;
			const width = canvas.clientWidth * pixelRatio | 0;
			const height = canvas.clientHeight * pixelRatio | 0;
			const needResize = canvas.width !== width || canvas.height !== height;
			if (needResize) {
				renderer.setSize(width, height, false);
			}
			return needResize;
		}
		<\/script>`])))});
