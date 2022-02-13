import{S as v,P as x,W as u,O as d,B as p,T as y,e as h,D as r,M as g}from"./vendor.608c105a.js";const e=document.querySelector("#homecanvas"),n=new v,i=new x(75,e.clientWidth/e.clientHeight,.1,1e3),t=new u({canvas:e,preserveDrawingBuffer:!0,antialias:!0});t.autoClearColor=!1;t.clear();t.setSize(e.clientWidth,e.clientHeight);const s=new d(i,t.domElement),a=new p(1,1,1,100,100,100),w=new y().load("/assets/art2.png"),o={tex:{value:w},time:{value:0},l:{value:1}},l=new h({uniforms:o,vertexShader:S(),fragmentShader:C(),wireframe:!0});l.uniformsNeedUpdate=!0;const D=new r(16723967,2),c=new r(65535,1);c.position.set(-1,-2,-1);const f=new g(a,l);n.add(f);n.add(D);n.add(c);i.position.z=10;s.update();function m(){requestAnimationFrame(m),o.time.value+=.003,o.l.value=1,a.rotateX(.01),a.rotateY(.003),a.rotateZ(.02),f.position.x=Math.sin(o.time.value*2)*.3,i.position.z=Math.sin(o.time.value),s.update(),t.render(n,i)}m();function S(){return`
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
	`}function C(){return`

	varying vec3 vUv;
	uniform sampler2D tex;

	void main() {
		vec4 col = texture2D(tex,vUv.xy+0.5);
	  gl_FragColor = vec4(col.xyz, 1.0);
	}
	`}
