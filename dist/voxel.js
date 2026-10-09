(()=>{var hu=0,mc=1,uu=2;var Wi=1,du=2,ks=3,wi=0,$t=1,xn=2,Wn=0,zs=1,gc=2,xc=3,_c=4,fu=5;var Xi=100,pu=101,mu=102,gu=103,xu=104,_u=200,yu=201,vu=202,Mu=203,yc=204,vc=205,Su=206,bu=207,wu=208,Tu=209,Eu=210,Au=211,Cu=212,Ru=213,Iu=214,Pa=0,La=1,Da=2,bs=3,Na=4,Ua=5,Fa=6,Oa=7,Mc=0,Pu=1,Lu=2,Pn=0,Sc=1,bc=2,wc=3,Vs=4,Tc=5,Ec=6,Ac=7;var Cc=300,Ti=301,qi=302,uo=303,fo=304,Lr=306,Ba=1e3,pn=1001,ka=1002,vt=1003,Du=1004;var Dr=1005;var It=1006,po=1007;var Ei=1008;var en=1009,Rc=1010,Ic=1011,Gs=1012,mo=1013,Ln=1014,_n=1015,Dn=1016,go=1017,xo=1018,Hs=1020,Pc=35902,Lc=35899,Dc=1021,Nc=1022,tn=1023,zn=1026,Ai=1027,_o=1028,yo=1029,Ci=1030,vo=1031;var Mo=1033,Nr=33776,Ur=33777,Fr=33778,Or=33779,So=35840,bo=35841,wo=35842,To=35843,Eo=36196,Ao=37492,Co=37496,Ro=37488,Io=37489,Br=37490,Po=37491,Lo=37808,Do=37809,No=37810,Uo=37811,Fo=37812,Oo=37813,Bo=37814,ko=37815,zo=37816,Vo=37817,Go=37818,Ho=37819,Wo=37820,Xo=37821,qo=36492,Yo=36494,Zo=36495,Jo=36283,$o=36284,kr=36285,Ko=36286;var fr=2300,za=2301,Ca=2302,rc=2303,ac=2400,oc=2401,lc=2402;var Nu=3200;var jo=0,Uu=1,li="",bt="srgb",pr="srgb-linear",mr="linear",it="srgb";var Ra=7680;var Fu=519,Ou=512,Bu=513,ku=514,Qo=515,zu=516,Vu=517,el=518,Gu=519,Uc=35044;var Fc="300 es",Tn=2e3,ws=2001;function _f(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function yf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ts(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Hu(){let n=Ts("canvas");return n.style.display="block",n}var Rh={},Es=null;function gr(...n){let e="THREE."+n.shift();Es?Es("log",e,...n):console.log(e,...n)}function Wu(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=Wu(n);let e="THREE."+n.shift();if(Es)Es("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Fe(...n){n=Wu(n);let e="THREE."+n.shift();if(Es)Es("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function zi(...n){let e=n.join(" ");e in Rh||(Rh[e]=!0,Ne(...n))}function Xu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var qu={[Pa]:La,[Da]:Fa,[Na]:Oa,[bs]:Ua,[La]:Pa,[Fa]:Da,[Oa]:Na,[Ua]:bs},Vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ih=1234567,ur=Math.PI/180,As=180/Math.PI;function ni(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function Oc(n,e){return(n%e+e)%e}function vf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Mf(n,e,t){return n!==e?(t-n)/(e-n):0}function dr(n,e,t){return(1-t)*n+t*e}function Sf(n,e,t,i){return dr(n,e,1-Math.exp(-t*i))}function bf(n,e=1){return e-Math.abs(Oc(n,e*2)-e)}function wf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Tf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ef(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Af(n,e){return n+Math.random()*(e-n)}function Cf(n){return n*(.5-Math.random())}function Rf(n){n!==void 0&&(Ih=n);let e=Ih+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function If(n){return n*ur}function Pf(n){return n*As}function Lf(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Df(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Nf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Uf(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),p=r((i-e)/2),_=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*u,o*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function rt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var un={DEG2RAD:ur,RAD2DEG:As,generateUUID:ni,clamp:$e,euclideanModulo:Oc,mapLinear:vf,inverseLerp:Mf,lerp:dr,damp:Sf,pingpong:bf,smoothstep:wf,smootherstep:Tf,randInt:Ef,randFloat:Af,randFloatSpread:Cf,seededRandom:Rf,degToRad:If,radToDeg:Pf,isPowerOfTwo:Lf,ceilPowerOfTwo:Df,floorPowerOfTwo:Nf,setQuaternionFromProperEuler:Uf,normalize:rt,denormalize:wn},Oe=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},mn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],p=r[a+1],_=r[a+2],x=r[a+3];if(d!==x||l!==h||c!==p||u!==_){let m=l*h+c*p+u*_+d*x;m<0&&(h=-h,p=-p,_=-_,x=-x,m=-m);let f=1-o;if(m<.9995){let M=Math.acos(m),C=Math.sin(M);f=Math.sin(f*M)/C,o=Math.sin(o*M)/C,l=l*f+h*o,c=c*f+p*o,u=u*f+_*o,d=d*f+x*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+_*o,d=d*f+x*o;let M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+u*d+l*p-c*h,e[t+1]=l*_+u*h+c*d-o*p,e[t+2]=c*_+u*p+o*h-l*d,e[t+3]=u*_-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),p=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"YXZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"ZXY":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"ZYX":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"YZX":this._x=h*u*d+c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d-h*p*_;break;case"XZY":this._x=h*u*d-c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d+h*p*_;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ph.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ph.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fl.copy(this).projectOnVector(e),this.sub(Fl)}reflect(e){return this.sub(Fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fl=new B,Ph=new mn,ke=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],_=i[8],x=s[0],m=s[3],f=s[6],M=s[1],C=s[4],S=s[7],T=s[2],E=s[5],A=s[8];return r[0]=a*x+o*M+l*T,r[3]=a*m+o*C+l*E,r[6]=a*f+o*S+l*A,r[1]=c*x+u*M+d*T,r[4]=c*m+u*C+d*E,r[7]=c*f+u*S+d*A,r[2]=h*x+p*M+_*T,r[5]=h*m+p*C+_*E,r[8]=h*f+p*S+_*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,p=c*r-a*l,_=t*d+i*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return e[0]=d*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=h*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ol.makeScale(e,t)),this}rotate(e){return zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ol.makeRotation(-e)),this}translate(e,t){return zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ol.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ol=new ke,Lh=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dh=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ff(){let n={enabled:!0,workingColorSpace:pr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===it&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===li?mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[pr]:{primaries:e,whitePoint:i,transfer:mr,toXYZ:Lh,fromXYZ:Dh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:Lh,fromXYZ:Dh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),n}var Je=Ff();function ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var is,Va=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{is===void 0&&(is=Ts("canvas")),is.width=e.width,is.height=e.height;let s=is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=is}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ts("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ii(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ii(t[i]/255)*255):t[i]=ii(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Of=0,Cs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Bl(s[a].image)):r.push(Bl(s[a]))}else r=Bl(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Bl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Va.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var Bf=0,kl=new B,Gt=class n extends Vn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=pn,s=pn,r=It,a=Ei,o=tn,l=en,c=n.DEFAULT_ANISOTROPY,u=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=ni(),this.name="",this.source=new Cs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(kl).x}get height(){return this.source.getSize(kl).y}get depth(){return this.source.getSize(kl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ba:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ba:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Cc;Gt.DEFAULT_ANISOTROPY=1;var yt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],_=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(c+1)/2,S=(p+1)/2,T=(f+1)/2,E=(u+h)/4,A=(d+x)/4,y=(_+m)/4;return C>S&&C>T?C<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(C),s=E/i,r=A/i):S>T?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=E/s,r=y/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=A/r,s=y/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-_)*(m-_)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-_)/M,this.y=(d-x)/M,this.z=(h-u)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ga=class extends Vn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Gt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ht=class extends Ga{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},xr=class extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=vt,this.minFilter=vt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ha=class extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=vt,this.minFilter=vt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var We=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,d,h,p,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,h,p,_,x,m)}set(e,t,i,s,r,a,o,l,c,u,d,h,p,_,x,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/ss.setFromMatrixColumn(e,0).length(),r=1/ss.setFromMatrixColumn(e,1).length(),a=1/ss.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,p=a*d,_=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+_*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,p=l*d,_=c*u,x=c*d;t[0]=h+x*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,p=l*d,_=c*u,x=c*d;t[0]=h-x*o,t[4]=-a*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,p=a*d,_=o*u,x=o*d;t[0]=l*u,t[4]=_*c-p,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,p=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=x-h*d,t[8]=_*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+_,t[10]=h-x*d}else if(e.order==="XZY"){let h=a*l,p=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=a*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kf,e,zf)}lookAt(e,t,i){let s=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),mi.crossVectors(i,sn),mi.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),mi.crossVectors(i,sn)),mi.normalize(),ta.crossVectors(sn,mi),s[0]=mi.x,s[4]=ta.x,s[8]=sn.x,s[1]=mi.y,s[5]=ta.y,s[9]=sn.y,s[2]=mi.z,s[6]=ta.z,s[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],_=i[2],x=i[6],m=i[10],f=i[14],M=i[3],C=i[7],S=i[11],T=i[15],E=s[0],A=s[4],y=s[8],w=s[12],R=s[1],F=s[5],P=s[9],z=s[13],I=s[2],V=s[6],W=s[10],q=s[14],te=s[3],J=s[7],Q=s[11],se=s[15];return r[0]=a*E+o*R+l*I+c*te,r[4]=a*A+o*F+l*V+c*J,r[8]=a*y+o*P+l*W+c*Q,r[12]=a*w+o*z+l*q+c*se,r[1]=u*E+d*R+h*I+p*te,r[5]=u*A+d*F+h*V+p*J,r[9]=u*y+d*P+h*W+p*Q,r[13]=u*w+d*z+h*q+p*se,r[2]=_*E+x*R+m*I+f*te,r[6]=_*A+x*F+m*V+f*J,r[10]=_*y+x*P+m*W+f*Q,r[14]=_*w+x*z+m*q+f*se,r[3]=M*E+C*R+S*I+T*te,r[7]=M*A+C*F+S*V+T*J,r[11]=M*y+C*P+S*W+T*Q,r[15]=M*w+C*z+S*q+T*se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],_=e[3],x=e[7],m=e[11],f=e[15],M=l*p-c*h,C=o*p-c*d,S=o*h-l*d,T=a*p-c*u,E=a*h-l*u,A=a*d-o*u;return t*(x*M-m*C+f*S)-i*(_*M-m*T+f*E)+s*(_*C-x*T+f*A)-r*(_*S-x*E+m*A)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],_=e[12],x=e[13],m=e[14],f=e[15],M=t*o-i*a,C=t*l-s*a,S=t*c-r*a,T=i*l-s*o,E=i*c-r*o,A=s*c-r*l,y=u*x-d*_,w=u*m-h*_,R=u*f-p*_,F=d*m-h*x,P=d*f-p*x,z=h*f-p*m,I=M*z-C*P+S*F+T*R-E*w+A*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/I;return e[0]=(o*z-l*P+c*F)*V,e[1]=(s*P-i*z-r*F)*V,e[2]=(x*A-m*E+f*T)*V,e[3]=(h*E-d*A-p*T)*V,e[4]=(l*R-a*z-c*w)*V,e[5]=(t*z-s*R+r*w)*V,e[6]=(m*S-_*A-f*C)*V,e[7]=(u*A-h*S+p*C)*V,e[8]=(a*P-o*R+c*y)*V,e[9]=(i*R-t*P-r*y)*V,e[10]=(_*E-x*S+f*M)*V,e[11]=(d*S-u*E-p*M)*V,e[12]=(o*w-a*F-l*y)*V,e[13]=(t*F-i*w+s*y)*V,e[14]=(x*C-_*T-m*M)*V,e[15]=(u*T-d*C+h*M)*V,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,p=r*u,_=r*d,x=a*u,m=a*d,f=o*d,M=l*c,C=l*u,S=l*d,T=i.x,E=i.y,A=i.z;return s[0]=(1-(x+f))*T,s[1]=(p+S)*T,s[2]=(_-C)*T,s[3]=0,s[4]=(p-S)*E,s[5]=(1-(h+f))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(_+C)*A,s[9]=(m-M)*A,s[10]=(1-(h+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ss.set(s[0],s[1],s[2]).length(),o=ss.set(s[4],s[5],s[6]).length(),l=ss.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Mn.copy(this);let c=1/a,u=1/o,d=1/l;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=d,Mn.elements[9]*=d,Mn.elements[10]*=d,t.setFromRotationMatrix(Mn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Tn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),p=(i+s)/(i-s),_,x;if(l)_=r/(a-r),x=a*r/(a-r);else if(o===Tn)_=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ws)_=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Tn,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),p=-(i+s)/(i-s),_,x;if(l)_=1/(a-r),x=a/(a-r);else if(o===Tn)_=-2/(a-r),x=-(a+r)/(a-r);else if(o===ws)_=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ss=new B,Mn=new We,kf=new B(0,0,0),zf=new B(1,1,1),mi=new B,ta=new B,sn=new B,Nh=new We,Uh=new mn,si=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Nh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uh.setFromEuler(this),this.setFromQuaternion(Uh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};si.DEFAULT_ORDER="XYZ";var Rs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Vf=0,Fh=new B,rs=new mn,$n=new We,na=new B,tr=new B,Gf=new B,Hf=new mn,Oh=new B(1,0,0),Bh=new B(0,1,0),kh=new B(0,0,1),zh={type:"added"},Wf={type:"removed"},as={type:"childadded",child:null},zl={type:"childremoved",child:null},Pt=class n extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new B,t=new si,i=new mn,s=new B(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new ke}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(Oh,e)}rotateY(e){return this.rotateOnAxis(Bh,e)}rotateZ(e){return this.rotateOnAxis(kh,e)}translateOnAxis(e,t){return Fh.copy(e).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oh,e)}translateY(e){return this.translateOnAxis(Bh,e)}translateZ(e){return this.translateOnAxis(kh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?na.copy(e):na.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(tr,na,this.up):$n.lookAt(na,tr,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),rs.setFromRotationMatrix($n),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zh),as.child=e,this.dispatchEvent(as),as.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wf),zl.child=e,this.dispatchEvent(zl),zl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zh),as.child=e,this.dispatchEvent(as),as.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Gf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Hf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new B(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ke=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xf={type:"move"},Is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},ia={h:0,s:0,l:0};function Vl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Le=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Je.workingColorSpace){if(e=Oc(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Vl(a,r,e+1/3),this.g=Vl(a,r,e),this.b=Vl(a,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=bt){function i(r){r!==void 0&&parseFloat(r)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let i=Yu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return Je.workingToColorSpace(zt.copy(this),e),Math.round($e(zt.r*255,0,255))*65536+Math.round($e(zt.g*255,0,255))*256+Math.round($e(zt.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(zt.copy(this),t);let i=zt.r,s=zt.g,r=zt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=bt){Je.workingToColorSpace(zt.copy(this),e);let t=zt.r,i=zt.g,s=zt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(ia);let i=dr(gi.h,ia.h,t),s=dr(gi.s,ia.s,t),r=dr(gi.l,ia.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zt=new Le;Le.NAMES=Yu;var En=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sn=new B,Kn=new B,Gl=new B,jn=new B,os=new B,ls=new B,Vh=new B,Hl=new B,Wl=new B,Xl=new B,ql=new yt,Yl=new yt,Zl=new yt,ti=class n{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Sn.subVectors(e,t),s.cross(Sn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Sn.subVectors(s,t),Kn.subVectors(i,t),Gl.subVectors(e,t);let a=Sn.dot(Sn),o=Sn.dot(Kn),l=Sn.dot(Gl),c=Kn.dot(Kn),u=Kn.dot(Gl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return r.set(1-p-_,_,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,jn.x),l.addScaledVector(a,jn.y),l.addScaledVector(o,jn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return ql.setScalar(0),Yl.setScalar(0),Zl.setScalar(0),ql.fromBufferAttribute(e,t),Yl.fromBufferAttribute(e,i),Zl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ql,r.x),a.addScaledVector(Yl,r.y),a.addScaledVector(Zl,r.z),a}static isFrontFacing(e,t,i,s){return Sn.subVectors(i,t),Kn.subVectors(e,t),Sn.cross(Kn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Sn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;os.subVectors(s,i),ls.subVectors(r,i),Hl.subVectors(e,i);let l=os.dot(Hl),c=ls.dot(Hl);if(l<=0&&c<=0)return t.copy(i);Wl.subVectors(e,s);let u=os.dot(Wl),d=ls.dot(Wl);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(os,a);Xl.subVectors(e,r);let p=os.dot(Xl),_=ls.dot(Xl);if(_>=0&&p<=_)return t.copy(r);let x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(ls,o);let m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return Vh.subVectors(r,s),o=(d-u)/(d-u+(p-_)),t.copy(s).addScaledVector(Vh,o);let f=1/(m+x+h);return a=x*f,o=h*f,t.copy(i).addScaledVector(os,a).addScaledVector(ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},on=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sa.copy(i.boundingBox)),sa.applyMatrix4(e.matrixWorld),this.union(sa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),ra.subVectors(this.max,nr),cs.subVectors(e.a,nr),hs.subVectors(e.b,nr),us.subVectors(e.c,nr),xi.subVectors(hs,cs),_i.subVectors(us,hs),Fi.subVectors(cs,us);let t=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Fi.z,Fi.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Fi.z,0,-Fi.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Fi.y,Fi.x,0];return!Jl(t,cs,hs,us,ra)||(t=[1,0,0,0,1,0,0,0,1],!Jl(t,cs,hs,us,ra))?!1:(aa.crossVectors(xi,_i),t=[aa.x,aa.y,aa.z],Jl(t,cs,hs,us,ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new B,new B,new B,new B,new B,new B,new B,new B],bn=new B,sa=new on,cs=new B,hs=new B,us=new B,xi=new B,_i=new B,Fi=new B,nr=new B,ra=new B,aa=new B,Oi=new B;function Jl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Oi.fromArray(n,r);let o=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=e.dot(Oi),c=t.dot(Oi),u=i.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Rt=new B,oa=new Oe,qf=0,Vt=class extends Vn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uc,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)oa.fromBufferAttribute(this,t),oa.applyMatrix3(e),this.setXY(t,oa.x,oa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=wn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var _r=class extends Vt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var yr=class extends Vt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var _t=class extends Vt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Yf=new on,ir=new B,$l=new B,Gn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Yf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ir.subVectors(e,this.center);let t=ir.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ir,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ir.copy(e.center).add($l)),this.expandByPoint(ir.copy(e.center).sub($l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Zf=0,fn=new We,Kl=new Pt,ds=new B,rn=new on,sr=new on,Ut=new B,Et=class n extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_f(e)?yr:_r)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return Kl.lookAt(e),Kl.updateMatrix(),this.applyMatrix4(Kl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];sr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(rn.min,sr.min),rn.expandByPoint(Ut),Ut.addVectors(rn.max,sr.max),rn.expandByPoint(Ut)):(rn.expandByPoint(sr.min),rn.expandByPoint(sr.max))}rn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ut.fromBufferAttribute(o,c),l&&(ds.fromBufferAttribute(e,c),Ut.add(ds)),s=Math.max(s,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Vt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new B,l[y]=new B;let c=new B,u=new B,d=new B,h=new Oe,p=new Oe,_=new Oe,x=new B,m=new B;function f(y,w,R){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,R),h.fromBufferAttribute(r,y),p.fromBufferAttribute(r,w),_.fromBufferAttribute(r,R),u.sub(c),d.sub(c),p.sub(h),_.sub(h);let F=1/(p.x*_.y-_.x*p.y);isFinite(F)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(F),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(F),o[y].add(x),o[w].add(x),o[R].add(x),l[y].add(m),l[w].add(m),l[R].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,w=M.length;y<w;++y){let R=M[y],F=R.start,P=R.count;for(let z=F,I=F+P;z<I;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let C=new B,S=new B,T=new B,E=new B;function A(y){T.fromBufferAttribute(s,y),E.copy(T);let w=o[y];C.copy(w),C.sub(T.multiplyScalar(T.dot(w))).normalize(),S.crossVectors(E,w);let F=S.dot(l[y])<0?-1:1;a.setXYZW(y,C.x,C.y,C.z,F)}for(let y=0,w=M.length;y<w;++y){let R=M[y],F=R.start,P=R.count;for(let z=F,I=F+P;z<I;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let s=new B,r=new B,a=new B,o=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){let _=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),p=0,_=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let f=0;f<u;f++)h[_++]=c[p++]}return new Vt(h,u,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Uc,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Yt=new B,vr=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=wn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){gr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){gr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},jl=new B,Jf=new B,$f=new ke,an=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=jl.subVectors(i,t).cross(Jf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(jl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||$f.getNormalMatrix(e),s=this.coplanarPoint(jl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Kf=0,An=class extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=zs,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=vc,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ra,this.stencilZFail=Ra,this.stencilZPass=Ra,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Le().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new an().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ps=class extends An{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fs,rr=new B,ps=new B,ms=new B,gs=new Oe,ar=new Oe,Zu=new We,la=new B,or=new B,ca=new B,Gh=new Oe,Ql=new Oe,Hh=new Oe,Mr=class extends Pt{constructor(e=new Ps){if(super(),this.isSprite=!0,this.type="Sprite",fs===void 0){fs=new Et;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Wa(t,5);fs.setIndex([0,1,2,0,2,3]),fs.setAttribute("position",new vr(i,3,0,!1)),fs.setAttribute("uv",new vr(i,2,3,!1))}this.geometry=fs,this.material=e,this.center=new Oe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ps.setFromMatrixScale(this.matrixWorld),Zu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ms.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ps.multiplyScalar(-ms.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;ha(la.set(-.5,-.5,0),ms,a,ps,s,r),ha(or.set(.5,-.5,0),ms,a,ps,s,r),ha(ca.set(.5,.5,0),ms,a,ps,s,r),Gh.set(0,0),Ql.set(1,0),Hh.set(1,1);let o=e.ray.intersectTriangle(la,or,ca,!1,rr);if(o===null&&(ha(or.set(-.5,.5,0),ms,a,ps,s,r),Ql.set(0,1),o=e.ray.intersectTriangle(la,ca,or,!1,rr),o===null))return;let l=e.ray.origin.distanceTo(rr);l<e.near||l>e.far||t.push({distance:l,point:rr.clone(),uv:ti.getInterpolation(rr,la,or,ca,Gh,Ql,Hh,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ha(n,e,t,i,s,r){gs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(ar.x=r*gs.x-s*gs.y,ar.y=s*gs.x+r*gs.y):ar.copy(gs),n.copy(e),n.x+=ar.x,n.y+=ar.y,n.applyMatrix4(Zu)}var ei=new B,ec=new B,ua=new B,da=new B,Vi=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ec.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),da.copy(this.origin).sub(ec);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ua),o=da.dot(this.direction),l=-da.dot(ua),c=da.lengthSq(),u=Math.abs(1-a*a),d,h,p,_;if(u>0)if(d=a*l-o,h=a*o-l,_=r*u,d>=0)if(h>=-_)if(h<=_){let x=1/u;d*=x,h*=x,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ec).addScaledVector(ua,h),p}intersectSphere(e,t){if(e.radius<0)return null;ei.subVectors(e.center,this.origin);let i=ei.dot(this.direction),s=ei.dot(ei)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,_=t.x-a.x,x=t.y-a.y,m=t.z-a.z,f=i.x-a.x,M=i.y-a.y,C=i.z-a.z,S=Math.abs(l),T=Math.abs(c),E=Math.abs(u),A,y,w,R,F,P,z,I,V,W,q,te;if(S>=T&&S>=E?(w=l,P=d,V=_,te=f,l>=0?(A=c,y=u,R=h,F=p,z=x,I=m,W=M,q=C):(A=u,y=c,R=p,F=h,z=m,I=x,W=C,q=M)):T>=E?(w=c,P=h,V=x,te=M,c>=0?(A=u,y=l,R=p,F=d,z=m,I=_,W=C,q=f):(A=l,y=u,R=d,F=p,z=_,I=m,W=f,q=C)):(w=u,P=p,V=m,te=C,u>=0?(A=l,y=c,R=d,F=h,z=_,I=x,W=f,q=M):(A=c,y=l,R=h,F=d,z=x,I=_,W=M,q=f)),w===0)return null;let J=A/w,Q=y/w,se=1/w,Ie=R-J*P,Ee=F-Q*P,at=z-J*V,Ze=I-Q*V,qe=W-J*te,K=q-Q*te,ne=qe*Ze-K*at,pe=Ie*K-Ee*qe,De=at*Ee-Ze*Ie;if(s){if(ne<0||pe<0||De<0)return null}else if((ne<0||pe<0||De<0)&&(ne>0||pe>0||De>0))return null;let ye=ne+pe+De;if(ye===0)return null;let Ve=se*(ne*P+pe*V+De*te);return(ye>0?Ve<0:Ve>0)?null:this.at(Ve/ye,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Cn=class extends An{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=Mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wh=new We,Bi=new Vi,fa=new Gn,Xh=new B,pa=new B,ma=new B,ga=new B,tc=new B,xa=new B,qh=new B,_a=new B,je=class extends Pt{constructor(e=new Et,t=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){xa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(tc.fromBufferAttribute(d,e),a?xa.addScaledVector(tc,u):xa.addScaledVector(tc.sub(t),u))}t.add(xa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(r),Bi.copy(e.ray).recast(e.near),!(fa.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(fa,Xh)===null||Bi.origin.distanceToSquared(Xh)>(e.far-e.near)**2))&&(Wh.copy(r).invert(),Bi.copy(e.ray).applyMatrix4(Wh),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let m=h[_],f=a[m.materialIndex],M=Math.max(m.start,p.start),C=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=M,T=C;S<T;S+=3){let E=o.getX(S),A=o.getX(S+1),y=o.getX(S+2);s=ya(this,f,e,i,c,u,d,E,A,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){let M=o.getX(m),C=o.getX(m+1),S=o.getX(m+2);s=ya(this,a,e,i,c,u,d,M,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let m=h[_],f=a[m.materialIndex],M=Math.max(m.start,p.start),C=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=M,T=C;S<T;S+=3){let E=S,A=S+1,y=S+2;s=ya(this,f,e,i,c,u,d,E,A,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){let M=m,C=m+1,S=m+2;s=ya(this,a,e,i,c,u,d,M,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function jf(n,e,t,i,s,r,a,o){let l;if(e.side===$t?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===wi,o),l===null)return null;_a.copy(o),_a.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(_a);return c<t.near||c>t.far?null:{distance:c,point:_a.clone(),object:n}}function ya(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,pa),n.getVertexPosition(l,ma),n.getVertexPosition(c,ga);let u=jf(n,e,t,i,pa,ma,ga,qh);if(u){let d=new B;ti.getBarycoord(qh,pa,ma,ga,d),s&&(u.uv=ti.getInterpolatedAttribute(s,o,l,c,d,new Oe)),r&&(u.uv1=ti.getInterpolatedAttribute(r,o,l,c,d,new Oe)),a&&(u.normal=ti.getInterpolatedAttribute(a,o,l,c,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new B,materialIndex:0};ti.getNormal(pa,ma,ga,h.normal),u.face=h,u.barycoord=d}return u}var Gi=class extends Gt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=vt,u=vt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Sr=class extends Vt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xs=new We,Yh=new We,va=[],Zh=new on,Qf=new We,lr=new je,cr=new Gn,ln=class extends je{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Sr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Qf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,xs),Zh.copy(e.boundingBox).applyMatrix4(xs),this.boundingBox.union(Zh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,xs),cr.copy(e.boundingSphere).applyMatrix4(xs),this.boundingSphere.union(cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(lr.geometry=this.geometry,lr.material=this.material,lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cr.copy(this.boundingSphere),cr.applyMatrix4(i),e.ray.intersectsSphere(cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,xs),Yh.multiplyMatrices(i,xs),lr.matrixWorld=Yh,lr.raycast(e,va);for(let a=0,o=va.length;a<o;a++){let l=va[a];l.instanceId=r,l.object=this,t.push(l)}va.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Sr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Gi(new Float32Array(s*this.count),s,this.count,_o,_n));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ki=new Gn,ep=new Oe(.5,.5),Ma=new B,Ls=class{constructor(e=new an,t=new an,i=new an,s=new an,r=new an,a=new an){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],p=r[7],_=r[8],x=r[9],m=r[10],f=r[11],M=r[12],C=r[13],S=r[14],T=r[15];if(s[0].setComponents(c-a,p-u,f-_,T-M).normalize(),s[1].setComponents(c+a,p+u,f+_,T+M).normalize(),s[2].setComponents(c+o,p+d,f+x,T+C).normalize(),s[3].setComponents(c-o,p-d,f-x,T-C).normalize(),i)s[4].setComponents(l,h,m,S).normalize(),s[5].setComponents(c-l,p-h,f-m,T-S).normalize();else if(s[4].setComponents(c-l,p-h,f-m,T-S).normalize(),t===Tn)s[5].setComponents(c+l,p+h,f+m,T+S).normalize();else if(t===ws)s[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=ep.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Ma.x=s.normal.x>0?e.max.x:e.min.x,Ma.y=s.normal.y>0?e.max.y:e.min.y,Ma.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ma)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Hi=class extends An{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xa=new B,qa=new B,Jh=new We,hr=new Vi,Sa=new Gn,nc=new B,$h=new B,Ds=class extends Pt{constructor(e=new Et,t=new Hi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Xa.fromBufferAttribute(t,s-1),qa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Xa.distanceTo(qa);e.setAttribute("lineDistance",new _t(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sa.copy(i.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,e.ray.intersectsSphere(Sa)===!1)return;Jh.copy(s).invert(),hr.copy(e.ray).applyMatrix4(Jh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let x=p,m=_-1;x<m;x+=c){let f=u.getX(x),M=u.getX(x+1),C=ba(this,e,hr,l,f,M,x);C&&t.push(C)}if(this.isLineLoop){let x=u.getX(_-1),m=u.getX(p),f=ba(this,e,hr,l,x,m,_-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let x=p,m=_-1;x<m;x+=c){let f=ba(this,e,hr,l,x,x+1,x);f&&t.push(f)}if(this.isLineLoop){let x=ba(this,e,hr,l,_-1,p,_-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ba(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(Xa.fromBufferAttribute(o,s),qa.fromBufferAttribute(o,r),t.distanceSqToSegment(Xa,qa,nc,$h)>i)return;nc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(nc);if(!(c<e.near||c>e.far))return{distance:c,point:$h.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Kh=new B,jh=new B,Ya=class extends Ds{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Kh.fromBufferAttribute(t,s),jh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Kh.distanceTo(jh);e.setAttribute("lineDistance",new _t(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ns=class extends An{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qh=new We,cc=new Vi,wa=new Gn,Ta=new B,br=class extends Pt{constructor(e=new Et,t=new Ns){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wa.copy(i.boundingSphere),wa.applyMatrix4(s),wa.radius+=r,e.ray.intersectsSphere(wa)===!1)return;Qh.copy(s).invert(),cc.copy(e.ray).applyMatrix4(Qh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=h,x=p;_<x;_++){let m=c.getX(_);Ta.fromBufferAttribute(d,m),eu(Ta,m,l,s,e,t,this)}}else{let h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=h,x=p;_<x;_++)Ta.fromBufferAttribute(d,_),eu(Ta,_,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function eu(n,e,t,i,s,r,a){let o=cc.distanceSqToPoint(n);if(o<t){let l=new B;cc.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var wr=class extends Gt{constructor(e=[],t=Ti,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Hn=class extends Gt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var vi=class extends Gt{constructor(e,t,i=Ln,s,r,a,o=vt,l=vt,c,u=zn,d=1){if(u!==zn&&u!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Za=class extends vi{constructor(e,t=Ln,i=Ti,s,r,a=vt,o=vt,l,c=zn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Tr=class extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gn=class n extends Et{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,p=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(d,2));function _(x,m,f,M,C,S,T,E,A,y,w){let R=S/A,F=T/y,P=S/2,z=T/2,I=E/2,V=A+1,W=y+1,q=0,te=0,J=new B;for(let Q=0;Q<W;Q++){let se=Q*F-z;for(let Ie=0;Ie<V;Ie++){let Ee=Ie*R-P;J[x]=Ee*M,J[m]=se*C,J[f]=I,c.push(J.x,J.y,J.z),J[x]=0,J[m]=0,J[f]=E>0?1:-1,u.push(J.x,J.y,J.z),d.push(Ie/A),d.push(1-Q/y),q+=1}}for(let Q=0;Q<y;Q++)for(let se=0;se<A;se++){let Ie=h+se+V*Q,Ee=h+se+V*(Q+1),at=h+(se+1)+V*(Q+1),Ze=h+(se+1)+V*Q;l.push(Ie,Ee,Ze),l.push(Ee,at,Ze),te+=6}o.addGroup(p,te,w),p+=te,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Rn=class n extends Et{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],p=[],_=0,x=[],m=i/2,f=0;M(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new _t(d,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(p,2));function M(){let S=new B,T=new B,E=0,A=(t-e)/i;for(let y=0;y<=r;y++){let w=[],R=y/r,F=R*(t-e)+e;for(let P=0;P<=s;P++){let z=P/s,I=z*l+o,V=Math.sin(I),W=Math.cos(I);T.x=F*V,T.y=-R*i+m,T.z=F*W,d.push(T.x,T.y,T.z),S.set(V,A,W).normalize(),h.push(S.x,S.y,S.z),p.push(z,1-R),w.push(_++)}x.push(w)}for(let y=0;y<s;y++)for(let w=0;w<r;w++){let R=x[w][y],F=x[w+1][y],P=x[w+1][y+1],z=x[w][y+1];(e>0||w!==0)&&(u.push(R,F,z),E+=3),(t>0||w!==r-1)&&(u.push(F,P,z),E+=3)}c.addGroup(f,E,0),f+=E}function C(S){let T=_,E=new Oe,A=new B,y=0,w=S===!0?e:t,R=S===!0?1:-1;for(let P=1;P<=s;P++)d.push(0,m*R,0),h.push(0,R,0),p.push(.5,.5),_++;let F=_;for(let P=0;P<=s;P++){let I=P/s*l+o,V=Math.cos(I),W=Math.sin(I);A.x=w*W,A.y=m*R,A.z=w*V,d.push(A.x,A.y,A.z),h.push(0,R,0),E.x=V*.5+.5,E.y=W*.5*R+.5,p.push(E.x,E.y),_++}for(let P=0;P<s;P++){let z=T+P,I=F+P;S===!0?u.push(I,I+1,z):u.push(I+1,I,z),y+=3}c.addGroup(f,y,S===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ja=class n extends Et{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new _t(r,3)),this.setAttribute("normal",new _t(r.slice(),3)),this.setAttribute("uv",new _t(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let C=new B,S=new B,T=new B;for(let E=0;E<t.length;E+=3)p(t[E+0],C),p(t[E+1],S),p(t[E+2],T),l(C,S,T,M)}function l(M,C,S,T){let E=T+1,A=[];for(let y=0;y<=E;y++){A[y]=[];let w=M.clone().lerp(S,y/E),R=C.clone().lerp(S,y/E),F=E-y;for(let P=0;P<=F;P++)P===0&&y===E?A[y][P]=w:A[y][P]=w.clone().lerp(R,P/F)}for(let y=0;y<E;y++)for(let w=0;w<2*(E-y)-1;w++){let R=Math.floor(w/2);w%2===0?(h(A[y][R+1]),h(A[y+1][R]),h(A[y][R])):(h(A[y][R+1]),h(A[y+1][R+1]),h(A[y+1][R]))}}function c(M){let C=new B;for(let S=0;S<r.length;S+=3)C.x=r[S+0],C.y=r[S+1],C.z=r[S+2],C.normalize().multiplyScalar(M),r[S+0]=C.x,r[S+1]=C.y,r[S+2]=C.z}function u(){let M=new B;for(let C=0;C<r.length;C+=3){M.x=r[C+0],M.y=r[C+1],M.z=r[C+2];let S=m(M)/2/Math.PI+.5,T=f(M)/Math.PI+.5;a.push(S,1-T)}_(),d()}function d(){for(let M=0;M<a.length;M+=6){let C=a[M+0],S=a[M+2],T=a[M+4],E=Math.max(C,S,T),A=Math.min(C,S,T);E>.9&&A<.1&&(C<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),T<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function p(M,C){let S=M*3;C.x=e[S+0],C.y=e[S+1],C.z=e[S+2]}function _(){let M=new B,C=new B,S=new B,T=new B,E=new Oe,A=new Oe,y=new Oe;for(let w=0,R=0;w<r.length;w+=9,R+=6){M.set(r[w+0],r[w+1],r[w+2]),C.set(r[w+3],r[w+4],r[w+5]),S.set(r[w+6],r[w+7],r[w+8]),E.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),y.set(a[R+4],a[R+5]),T.copy(M).add(C).add(S).divideScalar(3);let F=m(T);x(E,R+0,M,F),x(A,R+2,C,F),x(y,R+4,S,F)}}function x(M,C,S,T){T<0&&M.x===1&&(a[C]=M.x-1),S.x===0&&S.z===0&&(a[C]=T/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Us=class n extends Ja{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},In=class n extends Et{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,p=[],_=[],x=[],m=[];for(let f=0;f<u;f++){let M=f*h-a;for(let C=0;C<c;C++){let S=C*d-r;_.push(S,-M,0),x.push(0,0,1),m.push(C/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let C=M+c*f,S=M+c*(f+1),T=M+1+c*(f+1),E=M+1+c*f;p.push(C,S,E),p.push(S,T,E)}this.setIndex(p),this.setAttribute("position",new _t(_,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Fs=class n extends Et{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],u=[],d=[],h=new B,p=new B,_=new B;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let f=0;f<=s;f++){let M=f/s*r;p.x=(e+t*Math.cos(m))*Math.cos(M),p.y=(e+t*Math.cos(m))*Math.sin(M),p.z=t*Math.sin(m),c.push(p.x,p.y,p.z),h.x=e*Math.cos(M),h.y=e*Math.sin(M),_.subVectors(p,h).normalize(),u.push(_.x,_.y,_.z),d.push(f/s),d.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=s;m++){let f=(s+1)*x+m-1,M=(s+1)*(x-1)+m-1,C=(s+1)*(x-1)+m,S=(s+1)*x+m;l.push(f,M,S),l.push(M,C,S)}this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Yi(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(tu(s))s.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(tu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Wt(n){let e={};for(let t=0;t<n.length;t++){let i=Yi(n[t]);for(let s in i)e[s]=i[s]}return e}function tu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function tp(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Bc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}var Ju={clone:Yi,merge:Wt},np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ip=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jt=class extends An{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=np,this.fragmentShader=ip,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=tp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Le().setHex(s.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"v3":this.uniforms[i].value=new B().fromArray(s.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new We().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},$a=class extends Jt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Qt=class extends An{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jo,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ka=class extends An{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ja=class extends An{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function _s(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function ic(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Mi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Qa=class extends Mi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ac,endingEnd:ac}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case oc:r=e,o=2*t-i;break;case lc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case oc:a=e,l=2*i-t;break;case lc:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(i-t)/(s-t),x=_*_,m=x*_,f=-h*m+2*h*x-h*_,M=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*_+1,C=(-1-p)*m+(1.5+p)*x+.5*_,S=p*m-p*x;for(let T=0;T!==o;++T)r[T]=f*a[u+T]+M*a[c+T]+C*a[l+T]+S*a[d+T];return r}},eo=class extends Mi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},to=class extends Mi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},no=class extends Mi{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let _=(i-t)/(s-t),x=1-_;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*_;return r}let h=o*2,p=e-1;for(let _=0;_!==o;++_){let x=a[c+_],m=a[l+_],f=p*h+_*2,M=d[f],C=d[f+1],S=e*h+_*2,T=u[S],E=u[S+1],A=rp(i,t,M,T,s);r[_]=$u(A,x,C,E,m)}return r}};function $u(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function sp(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function rp(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=$u(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=sp(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var cn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_s(t,this.TimeBufferType),this.values=_s(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:_s(e.times,Array),values:_s(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),ic(e.settings)&&(i.settings={inTangents:_s(e.settings.inTangents,Array),outTangents:_s(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new to(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new no(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case fr:t=this.InterpolantFactoryMethodDiscrete;break;case za:t=this.InterpolantFactoryMethodLinear;break;case Ca:t=this.InterpolantFactoryMethodSmooth;break;case rc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fr;case this.InterpolantFactoryMethodLinear:return za;case this.InterpolantFactoryMethodSmooth:return Ca;case this.InterpolantFactoryMethodBezier:return rc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;ic(this.settings)&&(nu(this.settings.inTangents,e),nu(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Fe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Fe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&yf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Fe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ca,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let _=0;_!==i;++_){let x=t[d+_];if(x!==t[h+_]||x!==t[p+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let p=0;p!==i;++p)t[h+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,ic(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function nu(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=za;var Si=class extends cn{constructor(e,t,i){super(e,t,i)}};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=fr;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var io=class extends cn{constructor(e,t,i,s){super(e,t,i,s)}};io.prototype.ValueTypeName="color";var so=class extends cn{constructor(e,t,i,s){super(e,t,i,s)}};so.prototype.ValueTypeName="number";var ro=class extends Mi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)mn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Er=class extends cn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new ro(this.times,this.values,this.getValueSize(),e)}};Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;var bi=class extends cn{constructor(e,t,i){super(e,t,i)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=fr;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends cn{constructor(e,t,i,s){super(e,t,i,s)}};ao.prototype.ValueTypeName="vector";var Ia={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(iu(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!iu(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function iu(n){try{let e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var oo=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ku=new oo,Os=class{constructor(e){this.manager=e!==void 0?e:Ku,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Os.DEFAULT_MATERIAL_NAME="__DEFAULT";var ys=new WeakMap,lo=class extends Os{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Ia.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=ys.get(a);d===void 0&&(d=[],ys.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=Ts("img");function l(){u(),t&&t(this);let d=ys.get(this)||[];for(let h=0;h<d.length;h++){let p=d[h];p.onLoad&&p.onLoad(this)}ys.delete(this),r.manager.itemEnd(e)}function c(d){u(),s&&s(d),Ia.remove(`image:${e}`);let h=ys.get(this)||[];for(let p=0;p<h.length;p++){let _=h[p];_.onError&&_.onError(d)}ys.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ia.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Ar=class extends Os{constructor(e){super(e)}load(e,t,i,s){let r=new Gt,a=new lo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},Bs=class extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ri=class extends Bs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},sc=new We,su=new B,ru=new B,Cr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ls,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;su.setFromMatrixPosition(e.matrixWorld),t.position.copy(su),ru.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ru),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){sc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(sc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ws||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(sc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ea=new B,Aa=new mn,kn=new B,Rr=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ea,Aa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ea,Aa,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ea,Aa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ea,Aa,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new B,au=new Oe,ou=new Oe,Zt=class extends Rr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=As*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return As*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,au,ou),t.subVectors(ou,au)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ur*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var hc=class extends Cr{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0}},ai=class extends Bs{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new hc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},hn=class extends Rr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},uc=class extends Cr{constructor(){super(new hn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},oi=class extends Bs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new uc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var vs=-90,Ms=1,co=class extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Zt(vs,Ms,e,t);s.layers=this.layers,this.add(s);let r=new Zt(vs,Ms,e,t);r.layers=this.layers,this.add(r);let a=new Zt(vs,Ms,e,t);a.layers=this.layers,this.add(a);let o=new Zt(vs,Ms,e,t);o.layers=this.layers,this.add(o);let l=new Zt(vs,Ms,e,t);l.layers=this.layers,this.add(l);let c=new Zt(vs,Ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},ho=class extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var kc="\\[\\]\\.:\\/",ap=new RegExp("["+kc+"]","g"),zc="[^"+kc+"]",op="[^"+kc.replace("\\.","")+"]",lp=/((?:WC+[\/:])*)/.source.replace("WC",zc),cp=/(WCOD+)?/.source.replace("WCOD",op),hp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zc),up=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zc),dp=new RegExp("^"+lp+cp+hp+up+"$"),fp=["material","materials","bones","map"],dc=class{constructor(e,t,i){let s=i||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},xt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ap,"")}static parseTrackName(e){let t=dp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);fp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=dc;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var K_=new Float32Array(1);var lu=new We,Ir=class{constructor(e,t,i=0,s=1/0){this.ray=new Vi(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Rs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Fe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return lu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lu),this}intersectObject(e,t=!0,i=[]){return fc(e,this,i,t),i.sort(cu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)fc(e[s],this,i,t);return i.sort(cu),i}};function cu(n,e){return n.distance-e.distance}function fc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)fc(r[a],e,t,!0)}}var pc=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};var Pr=class extends Ya{constructor(e=10,t=10,i=4473924,s=8947848){i=new Le(i),s=new Le(s);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,p=0,_=-o;h<=t;h++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);let x=h===r?i:s;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}let u=new Et;u.setAttribute("position",new _t(l,3)),u.setAttribute("color",new _t(c,3));let d=new Hi({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Vc(n,e,t,i){let s=pp(i);switch(t){case Dc:return n*e;case _o:return n*e/s.components*s.byteLength;case yo:return n*e/s.components*s.byteLength;case Ci:return n*e*2/s.components*s.byteLength;case vo:return n*e*2/s.components*s.byteLength;case Nc:return n*e*3/s.components*s.byteLength;case tn:return n*e*4/s.components*s.byteLength;case Mo:return n*e*4/s.components*s.byteLength;case Nr:case Ur:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fr:case Or:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bo:case To:return Math.max(n,16)*Math.max(e,8)/4;case So:case wo:return Math.max(n,8)*Math.max(e,8)/2;case Eo:case Ao:case Ro:case Io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Co:case Br:case Po:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case No:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ko:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case zo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Go:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qo:case Yo:case Zo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Jo:case $o:return Math.ceil(n/4)*Math.ceil(e/4)*8;case kr:case Ko:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pp(n){switch(n){case en:case Rc:return{byteLength:1,components:1};case Gs:case Ic:case Dn:return{byteLength:2,components:1};case go:case xo:return{byteLength:2,components:4};case Ln:case mo:case _n:return{byteLength:4,components:1};case Pc:case Lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function yd(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function gp(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){let _=d[h],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){let x=d[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_p=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ep=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ip=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,e0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,r0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,a0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,o0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,l0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,c0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,h0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,m0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,g0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,x0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,y0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,v0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,M0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,w0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,T0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,A0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,R0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,I0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,P0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,N0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,F0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,O0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,z0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,V0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,H0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,W0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,X0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Y0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Z0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,J0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Q0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,em=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,nm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,im=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,am=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,om=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,um=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_m=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Em=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Im=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Om=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,km=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Gm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ym=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:xp,alphahash_pars_fragment:_p,alphamap_fragment:yp,alphamap_pars_fragment:vp,alphatest_fragment:Mp,alphatest_pars_fragment:Sp,aomap_fragment:bp,aomap_pars_fragment:wp,batching_pars_vertex:Tp,batching_vertex:Ep,begin_vertex:Ap,beginnormal_vertex:Cp,bsdfs:Rp,iridescence_fragment:Ip,bumpmap_pars_fragment:Pp,clipping_planes_fragment:Lp,clipping_planes_pars_fragment:Dp,clipping_planes_pars_vertex:Np,clipping_planes_vertex:Up,color_fragment:Fp,color_pars_fragment:Op,color_pars_vertex:Bp,color_vertex:kp,common:zp,cube_uv_reflection_fragment:Vp,defaultnormal_vertex:Gp,displacementmap_pars_vertex:Hp,displacementmap_vertex:Wp,emissivemap_fragment:Xp,emissivemap_pars_fragment:qp,colorspace_fragment:Yp,colorspace_pars_fragment:Zp,envmap_fragment:Jp,envmap_common_pars_fragment:$p,envmap_pars_fragment:Kp,envmap_pars_vertex:jp,envmap_physical_pars_fragment:c0,envmap_vertex:Qp,fog_vertex:e0,fog_pars_vertex:t0,fog_fragment:n0,fog_pars_fragment:i0,gradientmap_pars_fragment:s0,lightmap_pars_fragment:r0,lights_lambert_fragment:a0,lights_lambert_pars_fragment:o0,lights_pars_begin:l0,lights_toon_fragment:h0,lights_toon_pars_fragment:u0,lights_phong_fragment:d0,lights_phong_pars_fragment:f0,lights_physical_fragment:p0,lights_physical_pars_fragment:m0,lights_fragment_begin:g0,lights_fragment_maps:x0,lights_fragment_end:_0,lightprobes_pars_fragment:y0,logdepthbuf_fragment:v0,logdepthbuf_pars_fragment:M0,logdepthbuf_pars_vertex:S0,logdepthbuf_vertex:b0,map_fragment:w0,map_pars_fragment:T0,map_particle_fragment:E0,map_particle_pars_fragment:A0,metalnessmap_fragment:C0,metalnessmap_pars_fragment:R0,morphinstance_vertex:I0,morphcolor_vertex:P0,morphnormal_vertex:L0,morphtarget_pars_vertex:D0,morphtarget_vertex:N0,normal_fragment_begin:U0,normal_fragment_maps:F0,normal_pars_fragment:O0,normal_pars_vertex:B0,normal_vertex:k0,normalmap_pars_fragment:z0,clearcoat_normal_fragment_begin:V0,clearcoat_normal_fragment_maps:G0,clearcoat_pars_fragment:H0,iridescence_pars_fragment:W0,opaque_fragment:X0,packing:q0,premultiplied_alpha_fragment:Y0,project_vertex:Z0,dithering_fragment:J0,dithering_pars_fragment:$0,roughnessmap_fragment:K0,roughnessmap_pars_fragment:j0,shadowmap_pars_fragment:Q0,shadowmap_pars_vertex:em,shadowmap_vertex:tm,shadowmask_pars_fragment:nm,skinbase_vertex:im,skinning_pars_vertex:sm,skinning_vertex:rm,skinnormal_vertex:am,specularmap_fragment:om,specularmap_pars_fragment:lm,tonemapping_fragment:cm,tonemapping_pars_fragment:hm,transmission_fragment:um,transmission_pars_fragment:dm,uv_pars_fragment:fm,uv_pars_vertex:pm,uv_vertex:mm,worldpos_vertex:gm,background_vert:xm,background_frag:_m,backgroundCube_vert:ym,backgroundCube_frag:vm,cube_vert:Mm,cube_frag:Sm,depth_vert:bm,depth_frag:wm,distance_vert:Tm,distance_frag:Em,equirect_vert:Am,equirect_frag:Cm,linedashed_vert:Rm,linedashed_frag:Im,meshbasic_vert:Pm,meshbasic_frag:Lm,meshlambert_vert:Dm,meshlambert_frag:Nm,meshmatcap_vert:Um,meshmatcap_frag:Fm,meshnormal_vert:Om,meshnormal_frag:Bm,meshphong_vert:km,meshphong_frag:zm,meshphysical_vert:Vm,meshphysical_frag:Gm,meshtoon_vert:Hm,meshtoon_frag:Wm,points_vert:Xm,points_frag:qm,shadow_vert:Ym,shadow_frag:Zm,sprite_vert:Jm,sprite_frag:$m},me={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},qn={basic:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Wt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Wt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Wt([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Wt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Wt([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Wt([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Wt([me.common,me.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Wt([me.lights,me.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};qn.physical={uniforms:Wt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var tl={r:0,b:0,g:0},Km=new We,vd=new ke;vd.set(-1,0,0,0,1,0,0,0,1);function jm(n,e,t,i,s,r){let a=new Le(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function p(M){let C=M.isScene===!0?M.background:null;if(C&&C.isTexture){let S=M.backgroundBlurriness>0;C=e.get(C,S)}return C}function _(M){let C=!1,S=p(M);S===null?m(a,o):S&&S.isColor&&(m(S,1),C=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,C){let S=p(C);S&&(S.isCubeTexture||S.mapping===Lr)?(c===void 0&&(c=new je(new gn(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:Yi(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Km.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vd),c.material.toneMapped=Je.getTransfer(S.colorSpace)!==it,(u!==S||d!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new je(new In(2,2),new Jt({name:"BackgroundMaterial",uniforms:Yi(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=Je.getTransfer(S.colorSpace)!==it,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,C){M.getRGB(tl,Bc(n)),t.buffers.color.setClear(tl.r,tl.g,tl.b,C,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,C=1){a.set(M),o=C,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:_,addToRenderList:x,dispose:f}}function Qm(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(F,P,z,I,V){let W=!1,q=d(F,I,z,P);r!==q&&(r=q,c(r.object)),W=p(F,I,z,V),W&&_(F,I,z,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,S(F,P,z,I),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function u(F){return n.deleteVertexArray(F)}function d(F,P,z,I){let V=I.wireframe===!0,W=i[P.id];W===void 0&&(W={},i[P.id]=W);let q=F.isInstancedMesh===!0?F.id:0,te=W[q];te===void 0&&(te={},W[q]=te);let J=te[z.id];J===void 0&&(J={},te[z.id]=J);let Q=J[V];return Q===void 0&&(Q=h(l()),J[V]=Q),Q}function h(F){let P=[],z=[],I=[];for(let V=0;V<t;V++)P[V]=0,z[V]=0,I[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:I,object:F,attributes:{},index:null}}function p(F,P,z,I){let V=r.attributes,W=P.attributes,q=0,te=z.getAttributes();for(let J in te)if(te[J].location>=0){let se=V[J],Ie=W[J];if(Ie===void 0&&(J==="instanceMatrix"&&F.instanceMatrix&&(Ie=F.instanceMatrix),J==="instanceColor"&&F.instanceColor&&(Ie=F.instanceColor)),se===void 0||se.attribute!==Ie||Ie&&se.data!==Ie.data)return!0;q++}return r.attributesNum!==q||r.index!==I}function _(F,P,z,I){let V={},W=P.attributes,q=0,te=z.getAttributes();for(let J in te)if(te[J].location>=0){let se=W[J];se===void 0&&(J==="instanceMatrix"&&F.instanceMatrix&&(se=F.instanceMatrix),J==="instanceColor"&&F.instanceColor&&(se=F.instanceColor));let Ie={};Ie.attribute=se,se&&se.data&&(Ie.data=se.data),V[J]=Ie,q++}r.attributes=V,r.attributesNum=q,r.index=I}function x(){let F=r.newAttributes;for(let P=0,z=F.length;P<z;P++)F[P]=0}function m(F){f(F,0)}function f(F,P){let z=r.newAttributes,I=r.enabledAttributes,V=r.attributeDivisors;z[F]=1,I[F]===0&&(n.enableVertexAttribArray(F),I[F]=1),V[F]!==P&&(n.vertexAttribDivisor(F,P),V[F]=P)}function M(){let F=r.newAttributes,P=r.enabledAttributes;for(let z=0,I=P.length;z<I;z++)P[z]!==F[z]&&(n.disableVertexAttribArray(z),P[z]=0)}function C(F,P,z,I,V,W,q){q===!0?n.vertexAttribIPointer(F,P,z,V,W):n.vertexAttribPointer(F,P,z,I,V,W)}function S(F,P,z,I){x();let V=I.attributes,W=z.getAttributes(),q=P.defaultAttributeValues;for(let te in W){let J=W[te];if(J.location>=0){let Q=V[te];if(Q===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),Q!==void 0){let se=Q.normalized,Ie=Q.itemSize,Ee=e.get(Q);if(Ee===void 0)continue;let at=Ee.buffer,Ze=Ee.type,qe=Ee.bytesPerElement,K=Ze===n.INT||Ze===n.UNSIGNED_INT||Q.gpuType===mo;if(Q.isInterleavedBufferAttribute){let ne=Q.data,pe=ne.stride,De=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let ye=0;ye<J.locationSize;ye++)f(J.location+ye,ne.meshPerAttribute);F.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ye=0;ye<J.locationSize;ye++)m(J.location+ye);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ye=0;ye<J.locationSize;ye++)C(J.location+ye,Ie/J.locationSize,Ze,se,pe*qe,(De+Ie/J.locationSize*ye)*qe,K)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<J.locationSize;ne++)f(J.location+ne,Q.meshPerAttribute);F.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<J.locationSize;ne++)m(J.location+ne);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ne=0;ne<J.locationSize;ne++)C(J.location+ne,Ie/J.locationSize,Ze,se,Ie*qe,Ie/J.locationSize*ne*qe,K)}}else if(q!==void 0){let se=q[te];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(J.location,se);break;case 3:n.vertexAttrib3fv(J.location,se);break;case 4:n.vertexAttrib4fv(J.location,se);break;default:n.vertexAttrib1fv(J.location,se)}}}}M()}function T(){w();for(let F in i){let P=i[F];for(let z in P){let I=P[z];for(let V in I){let W=I[V];for(let q in W)u(W[q].object),delete W[q];delete I[V]}}delete i[F]}}function E(F){if(i[F.id]===void 0)return;let P=i[F.id];for(let z in P){let I=P[z];for(let V in I){let W=I[V];for(let q in W)u(W[q].object),delete W[q];delete I[V]}}delete i[F.id]}function A(F){for(let P in i){let z=i[P];for(let I in z){let V=z[I];if(V[F.id]===void 0)continue;let W=V[F.id];for(let q in W)u(W[q].object),delete W[q];delete V[F.id]}}}function y(F){for(let P in i){let z=i[P],I=F.isInstancedMesh===!0?F.id:0,V=z[I];if(V!==void 0){for(let W in V){let q=V[W];for(let te in q)u(q[te].object),delete q[te];delete V[W]}delete z[I],Object.keys(z).length===0&&delete i[P]}}}function w(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function eg(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function tg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==tn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let y=A===Dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==en&&A!==_n&&!y&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ne("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:C,maxFragmentUniforms:S,maxSamples:T,samples:E}}function ng(n){let e=this,t=null,i=0,s=!1,r=!1,a=new an,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let _=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{let M=r?0:i,C=M*4,S=f.clippingState||null;l.value=S,S=u(_,h,C,p);for(let T=0;T!==C;++T)S[T]=t[T];f.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,_){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,_!==!0||m===null){let f=p+x*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let C=0,S=p;C!==x;++C,S+=4)a.copy(d[C]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Xs=4,ig=6,sg=20,rg=256,zr=new hn,ju=new Le,Gc=null,Hc=0,Wc=0,Xc=!1,ag=new B,Zi=new B,il=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=ag}=r;Gc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),Xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=td(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ed(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Gc,Hc,Wc),this._renderer.xr.enabled=Xc,e.scissorTest=!1,Ws(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),Xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:It,minFilter:It,generateMipmaps:!1,type:Dn,format:tn,colorSpace:pr,depthBuffer:!1},s=Qu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qu(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=og(r)),this._blurMaterial=cg(r,e,t),this._ggxMaterial=lg(r,e,t)}return s}_compileMaterial(e){let t=new je(new Et,e);this._renderer.compile(t,zr)}_sceneToCubeUV(e,t,i,s,r){let l=new Zt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(ju),d.toneMapping=Pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new je(new gn,new Cn({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,f=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(ju),f=!0);for(let C=0;C<6;C++){let S=C%3;S===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[C],r.y,r.z)):S===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[C]));let T=this._cubeSize;Ws(s,S*T,C>2?T:0,T,T),d.setRenderTarget(s),f&&d.render(x,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ti||e.mapping===qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=td()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ed());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Ws(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,zr)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:_}=this,x=this._sizeLods[i],m=3*x*(i>_-Xs?i-_+Xs:0),f=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-t,Ws(r,m,f,3*x,2*x),s.setRenderTarget(r),s.render(o,zr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-i,Ws(e,m,f,3*x,2*x),s.setRenderTarget(e),s.render(o,zr)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Xs?s-this._lodMax+Xs:0),h=4*(this._cubeSize-u);Ws(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,zr)}};function og(n){let e=[],t=[],i=n,s=n-Xs+1+ig;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,_=new Float32Array(p*h*d),x=new Float32Array(p*h*d);for(let f=0;f<d;f++){let M=f%3*2/3-1,C=f>2?0:-1,S=[M,C,0,M+2/3,C,0,M+2/3,C+1,0,M,C,0,M+2/3,C+1,0,M,C+1,0];_.set(S,p*h*f);for(let T=0;T<h;T++){let E=u[T*2]*2-1,A=u[T*2+1]*2-1;f===0?Zi.set(1,A,E):f===1?Zi.set(-E,1,-A):f===2?Zi.set(-E,A,1):f===3?Zi.set(-1,A,-E):f===4?Zi.set(-E,-1,A):Zi.set(E,A,-1),Zi.toArray(x,(f*h+T)*p)}}let m=new Et;m.setAttribute("position",new Vt(_,p)),m.setAttribute("outputDirection",new Vt(x,p)),t.push(new je(m,null)),i>Xs&&i--}return{lodMeshes:t,sizeLods:e}}function Qu(n,e,t){let i=new Ht(n,e,t);return i.texture.mapping=Lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ws(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function lg(n,e,t){return new Jt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:rg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function cg(n,e,t){return new Jt({name:"SphericalGaussianBlur",defines:{SAMPLES:sg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function ed(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function td(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function rl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var sl=class extends Ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new wr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gn(5,5,5),r=new Jt({name:"CubemapFromEquirect",uniforms:Yi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Wn});r.uniforms.tEquirect.value=t;let a=new je(s,r),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=It),new co(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function hg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===uo||p===fo)if(e.has(h)){let _=e.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let x=new sl(_.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,_=p===uo||p===fo,x=p===Ti||p===qi;if(_||x){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new il(n)),m=_?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let M=h.image;return _&&M&&M.height>0||x&&M&&l(M)?(i===null&&(i=new il(n)),m=_?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===uo?h.mapping=Ti:p===fo&&(h.mapping=qi),h}function l(h){let p=0,_=6;for(let x=0;x<_;x++)h[x]!==void 0&&p++;return p===_}function c(h){let p=h.target;p.removeEventListener("dispose",c);let _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function ug(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&zi("WebGLRenderer: "+i+" extension not supported."),s}}}function dg(n,e,t,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(e.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,_=d.attributes.position,x=0;if(_===void 0)return;if(p!==null){let M=p.array;x=p.version;for(let C=0,S=M.length;C<S;C+=3){let T=M[C+0],E=M[C+1],A=M[C+2];h.push(T,E,E,A,A,T)}}else{let M=_.array;x=_.version;for(let C=0,S=M.length/3-1;C<S;C+=3){let T=C+0,E=C+1,A=C+2;h.push(T,E,E,A,A,T)}}let m=new(_.count>=65535?yr:_r)(h,1);m.version=x;let f=r.get(d);f&&e.remove(f),r.set(d,m)}function u(d){let h=r.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function fg(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*a),t.update(h,i,1)}function c(d,h,p){p!==0&&(n.drawElementsInstanced(i,h,r,d*a,p),t.update(h,i,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,p);let x=0;for(let m=0;m<p;m++)x+=h[m];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function pg(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Fe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function mg(n,e,t){let i=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],C=0;p===!0&&(C=1),_===!0&&(C=2),x===!0&&(C=3);let S=o.attributes.position.count*C,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let E=new Float32Array(S*T*4*d),A=new xr(E,S,T,d);A.type=_n,A.needsUpdate=!0;let y=C*4;for(let R=0;R<d;R++){let F=m[R],P=f[R],z=M[R],I=S*T*4*R;for(let V=0;V<F.count;V++){let W=V*y;p===!0&&(s.fromBufferAttribute(F,V),E[I+W+0]=s.x,E[I+W+1]=s.y,E[I+W+2]=s.z,E[I+W+3]=0),_===!0&&(s.fromBufferAttribute(P,V),E[I+W+4]=s.x,E[I+W+5]=s.y,E[I+W+6]=s.z,E[I+W+7]=0),x===!0&&(s.fromBufferAttribute(z,V),E[I+W+8]=s.x,E[I+W+9]=s.y,E[I+W+10]=s.z,E[I+W+11]=z.itemSize===4?s.w:1)}}h={count:d,texture:A,size:new Oe(S,T)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function gg(n,e,t,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var xg={[Sc]:"LINEAR_TONE_MAPPING",[bc]:"REINHARD_TONE_MAPPING",[wc]:"CINEON_TONE_MAPPING",[Vs]:"ACES_FILMIC_TONE_MAPPING",[Ec]:"AGX_TONE_MAPPING",[Ac]:"NEUTRAL_TONE_MAPPING",[Tc]:"CUSTOM_TONE_MAPPING"};function _g(n,e,t,i,s,r){let a=new Ht(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Et;c.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new _t([0,2,0,0,2,0],2));let u=new $a({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new je(c,u),h=new hn(-1,1,1,-1,0,1),p=null,_=null,x=!1,m,f=null,M=[],C=!1;this.setSize=function(S,T){a.setSize(S,T),o!==null&&o.setSize(S,T),l!==null&&l.setSize(S,T);for(let E=0;E<M.length;E++){let A=M[E];A.setSize&&A.setSize(S,T)}},this.setEffects=function(S){M=S,C=M.length>0&&M[0].isRenderPass===!0;let T=a.width,E=a.height;M.length>0&&o===null&&(o=new Ht(T,E,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),l=new Ht(T,E,{type:Dn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<M.length;A++){let y=M[A];y.setSize&&y.setSize(T,E)}},this.begin=function(S,T){if(x||S.toneMapping===Pn&&M.length===0)return!1;if(f=T,T!==null){let E=T.width,A=T.height;(a.width!==E||a.height!==A)&&this.setSize(E,A)}return C===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=Pn,!0},this.hasRenderPass=function(){return C},this.end=function(S,T){S.toneMapping=m,x=!0;let E=a,A=o;for(let y=0;y<M.length;y++){let w=M[y];w.enabled!==!1&&(w.render(S,A,E,T),w.needsSwap!==!1&&(E=A,A=A===o?l:o))}if(p!==S.outputColorSpace||_!==S.toneMapping){p=S.outputColorSpace,_=S.toneMapping,u.defines={},Je.getTransfer(p)===it&&(u.defines.SRGB_TRANSFER="");let y=xg[_];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(f),S.render(d,h),f=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var Md=new Gt,Zc=new vi(1,1),Sd=new xr,bd=new Ha,wd=new wr,nd=[],id=[],sd=new Float32Array(16),rd=new Float32Array(9),ad=new Float32Array(4);function Ys(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=nd[s];if(r===void 0&&(r=new Float32Array(s),nd[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Dt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function al(n,e){let t=id[e];t===void 0&&(t=new Int32Array(e),id[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function yg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function vg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),Dt(t,e)}}function Mg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),Dt(t,e)}}function Sg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),Dt(t,e)}}function bg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;ad.set(i),n.uniformMatrix2fv(this.addr,!1,ad),Dt(t,i)}}function wg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;rd.set(i),n.uniformMatrix3fv(this.addr,!1,rd),Dt(t,i)}}function Tg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;sd.set(i),n.uniformMatrix4fv(this.addr,!1,sd),Dt(t,i)}}function Eg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ag(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),Dt(t,e)}}function Cg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),Dt(t,e)}}function Rg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),Dt(t,e)}}function Ig(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Pg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),Dt(t,e)}}function Lg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),Dt(t,e)}}function Dg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),Dt(t,e)}}function Ng(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Zc.compareFunction=t.isReversedDepthBuffer()?el:Qo,r=Zc):r=Md,t.setTexture2D(e||r,s)}function Ug(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||bd,s)}function Fg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||wd,s)}function Og(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Sd,s)}function Bg(n){switch(n){case 5126:return yg;case 35664:return vg;case 35665:return Mg;case 35666:return Sg;case 35674:return bg;case 35675:return wg;case 35676:return Tg;case 5124:case 35670:return Eg;case 35667:case 35671:return Ag;case 35668:case 35672:return Cg;case 35669:case 35673:return Rg;case 5125:return Ig;case 36294:return Pg;case 36295:return Lg;case 36296:return Dg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Fg;case 36289:case 36303:case 36311:case 36292:return Og}}function kg(n,e){n.uniform1fv(this.addr,e)}function zg(n,e){let t=Ys(e,this.size,2);n.uniform2fv(this.addr,t)}function Vg(n,e){let t=Ys(e,this.size,3);n.uniform3fv(this.addr,t)}function Gg(n,e){let t=Ys(e,this.size,4);n.uniform4fv(this.addr,t)}function Hg(n,e){let t=Ys(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Wg(n,e){let t=Ys(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Xg(n,e){let t=Ys(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function qg(n,e){n.uniform1iv(this.addr,e)}function Yg(n,e){n.uniform2iv(this.addr,e)}function Zg(n,e){n.uniform3iv(this.addr,e)}function Jg(n,e){n.uniform4iv(this.addr,e)}function $g(n,e){n.uniform1uiv(this.addr,e)}function Kg(n,e){n.uniform2uiv(this.addr,e)}function jg(n,e){n.uniform3uiv(this.addr,e)}function Qg(n,e){n.uniform4uiv(this.addr,e)}function ex(n,e,t){let i=this.cache,s=e.length,r=al(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Dt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Zc:a=Md;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function tx(n,e,t){let i=this.cache,s=e.length,r=al(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Dt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||bd,r[a])}function nx(n,e,t){let i=this.cache,s=e.length,r=al(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Dt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||wd,r[a])}function ix(n,e,t){let i=this.cache,s=e.length,r=al(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),Dt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sd,r[a])}function sx(n){switch(n){case 5126:return kg;case 35664:return zg;case 35665:return Vg;case 35666:return Gg;case 35674:return Hg;case 35675:return Wg;case 35676:return Xg;case 5124:case 35670:return qg;case 35667:case 35671:return Yg;case 35668:case 35672:return Zg;case 35669:case 35673:return Jg;case 5125:return $g;case 36294:return Kg;case 36295:return jg;case 36296:return Qg;case 35678:case 36198:case 36298:case 36306:case 35682:return ex;case 35679:case 36299:case 36307:return tx;case 35680:case 36300:case 36308:case 36293:return nx;case 36289:case 36303:case 36311:case 36292:return ix}}var Jc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Bg(t.type)}},$c=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sx(t.type)}},Kc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},qc=/(\w+)(\])?(\[|\.)?/g;function od(n,e){n.seq.push(e),n.map[e.id]=e}function rx(n,e,t){let i=n.name,s=i.length;for(qc.lastIndex=0;;){let r=qc.exec(i),a=qc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){od(t,c===void 0?new Jc(o,n,e):new $c(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Kc(o),od(t,d)),t=d}}}var qs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);rx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function ld(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var ax=37297,ox=0;function lx(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var cd=new ke;function cx(n){Je._getMatrix(cd,Je.workingColorSpace,n);let e=`mat3( ${cd.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case mr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function hd(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+lx(n.getShaderSource(e),o)}else return r}function hx(n,e){let t=cx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var ux={[Sc]:"Linear",[bc]:"Reinhard",[wc]:"Cineon",[Vs]:"ACESFilmic",[Ec]:"AgX",[Ac]:"Neutral",[Tc]:"Custom"};function dx(n,e){let t=ux[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var nl=new B;function fx(){Je.getLuminanceCoefficients(nl);let n=nl.x.toFixed(4),e=nl.y.toFixed(4),t=nl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function px(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gr).join(`
`)}function mx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function gx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Gr(n){return n!==""}function ud(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var xx=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(n){return n.replace(xx,yx)}var _x=new Map;function yx(n,e){let t=Xe[e];if(t===void 0){let i=_x.get(e);if(i!==void 0)t=Xe[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return jc(t)}var vx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fd(n){return n.replace(vx,Mx)}function Mx(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Sx={[Wi]:"SHADOWMAP_TYPE_PCF",[ks]:"SHADOWMAP_TYPE_VSM"};function bx(n){return Sx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var wx={[Ti]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[Lr]:"ENVMAP_TYPE_CUBE_UV"};function Tx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":wx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ex={[qi]:"ENVMAP_MODE_REFRACTION"};function Ax(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Ex[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Cx={[Mc]:"ENVMAP_BLENDING_MULTIPLY",[Pu]:"ENVMAP_BLENDING_MIX",[Lu]:"ENVMAP_BLENDING_ADD"};function Rx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Cx[n.combine]||"ENVMAP_BLENDING_NONE"}function Ix(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Px(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=bx(t),c=Tx(t),u=Ax(t),d=Rx(t),h=Ix(t),p=px(t),_=mx(r),x=s.createProgram(),m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Gr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Gr).join(`
`),f.length>0&&(f+=`
`)):(m=[pd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gr).join(`
`),f=[pd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Pn?dx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,hx("linearToOutputTexel",t.outputColorSpace),fx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gr).join(`
`)),a=jc(a),a=ud(a,t),a=dd(a,t),o=jc(o),o=ud(o,t),o=dd(o,t),a=fd(a),o=fd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let C=M+m+a,S=M+f+o,T=ld(s,s.VERTEX_SHADER,C),E=ld(s,s.FRAGMENT_SHADER,S);s.attachShader(x,T),s.attachShader(x,E),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(F){if(n.debug.checkShaderErrors){let P=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(T)||"",I=s.getShaderInfoLog(E)||"",V=P.trim(),W=z.trim(),q=I.trim(),te=!0,J=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,T,E);else{let Q=hd(s,T,"vertex"),se=hd(s,E,"fragment");Fe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+V+`
`+Q+`
`+se)}else V!==""?Ne("WebGLProgram: Program Info Log:",V):(W===""||q==="")&&(J=!1);J&&(F.diagnostics={runnable:te,programLog:V,vertexShader:{log:W,prefix:m},fragmentShader:{log:q,prefix:f}})}s.deleteShader(T),s.deleteShader(E),y=new qs(s,x),w=gx(s,x)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(x,ax)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ox++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=E,this}var Lx=0,Qc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new eh(e),t.set(e,i)),i}},eh=class{constructor(e){this.id=Lx++,this.code=e,this.usedTimes=0}};function Dx(n){return n===Ci||n===Br||n===kr}function Nx(n,e,t,i,s,r){let a=new Rs,o=new Qc,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,w,R,F,P,z){let I=F.fog,V=P.geometry,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,te=e.get(y.envMap||W,q),J=te&&te.mapping===Lr?te.image.height:null,Q=p[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Ne("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let se=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ie=se!==void 0?se.length:0,Ee=0;V.morphAttributes.position!==void 0&&(Ee=1),V.morphAttributes.normal!==void 0&&(Ee=2),V.morphAttributes.color!==void 0&&(Ee=3);let at,Ze,qe,K;if(Q){let dt=qn[Q];at=dt.vertexShader,Ze=dt.fragmentShader}else{at=y.vertexShader,Ze=y.fragmentShader;let dt=o.getVertexShaderStage(y),tt=o.getFragmentShaderStage(y);o.update(y,dt,tt),qe=dt.id,K=tt.id}let ne=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),De=P.isInstancedMesh===!0,ye=P.isBatchedMesh===!0,Ve=!!y.map,ut=!!y.matcap,Be=!!te,Ge=!!y.aoMap,st=!!y.lightMap,ze=!!y.bumpMap&&y.wireframe===!1,et=!!y.normalMap,wt=!!y.displacementMap,Nt=!!y.emissiveMap,mt=!!y.metalnessMap,St=!!y.roughnessMap,O=y.anisotropy>0,Z=y.clearcoat>0,ie=y.dispersion>0,b=y.retroreflectivity>0,g=y.iridescence>0,L=y.sheen>0,k=y.transmission>0,X=O&&!!y.anisotropyMap,oe=Z&&!!y.clearcoatMap,ae=Z&&!!y.clearcoatNormalMap,$=Z&&!!y.clearcoatRoughnessMap,j=g&&!!y.iridescenceMap,le=g&&!!y.iridescenceThicknessMap,Ae=L&&!!y.sheenColorMap,ue=L&&!!y.sheenRoughnessMap,he=!!y.specularMap,ce=!!y.specularColorMap,ve=!!y.specularIntensityMap,Ue=k&&!!y.transmissionMap,D=k&&!!y.thicknessMap,de=!!y.gradientMap,ee=!!y.alphaMap,fe=y.alphaTest>0,_e=!!y.alphaHash,re=!!y.extensions,Pe=Pn;y.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Pe=n.toneMapping);let Ce={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:at,fragmentShader:Ze,defines:y.defines,customVertexShaderID:qe,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:ye,batchingColor:ye&&P._colorsTexture!==null,instancing:De,instancingColor:De&&P.instanceColor!==null,instancingMorph:De&&P.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ve,matcap:ut,envMap:Be,envMapMode:Be&&te.mapping,envMapCubeUVHeight:J,aoMap:Ge,lightMap:st,bumpMap:ze,normalMap:et,displacementMap:wt,emissiveMap:Nt,normalMapObjectSpace:et&&y.normalMapType===Uu,normalMapTangentSpace:et&&y.normalMapType===jo,packedNormalMap:et&&y.normalMapType===jo&&Dx(y.normalMap.format),metalnessMap:mt,roughnessMap:St,anisotropy:O,anisotropyMap:X,clearcoat:Z,clearcoatMap:oe,clearcoatNormalMap:ae,clearcoatRoughnessMap:$,dispersion:ie,retroreflection:b,iridescence:g,iridescenceMap:j,iridescenceThicknessMap:le,sheen:L,sheenColorMap:Ae,sheenRoughnessMap:ue,specularMap:he,specularColorMap:ce,specularIntensityMap:ve,transmission:k,transmissionMap:Ue,thicknessMap:D,gradientMap:de,opaque:y.transparent===!1&&y.blending===zs&&y.alphaToCoverage===!1,alphaMap:ee,alphaTest:fe,alphaHash:_e,combine:y.combine,mapUv:Ve&&_(y.map.channel),aoMapUv:Ge&&_(y.aoMap.channel),lightMapUv:st&&_(y.lightMap.channel),bumpMapUv:ze&&_(y.bumpMap.channel),normalMapUv:et&&_(y.normalMap.channel),displacementMapUv:wt&&_(y.displacementMap.channel),emissiveMapUv:Nt&&_(y.emissiveMap.channel),metalnessMapUv:mt&&_(y.metalnessMap.channel),roughnessMapUv:St&&_(y.roughnessMap.channel),anisotropyMapUv:X&&_(y.anisotropyMap.channel),clearcoatMapUv:oe&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(y.sheenRoughnessMap.channel),specularMapUv:he&&_(y.specularMap.channel),specularColorMapUv:ce&&_(y.specularColorMap.channel),specularIntensityMapUv:ve&&_(y.specularIntensityMap.channel),transmissionMapUv:Ue&&_(y.transmissionMap.channel),thicknessMapUv:D&&_(y.thicknessMap.channel),alphaMapUv:ee&&_(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(et||O),vertexNormals:!!V.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!V.attributes.uv&&(Ve||ee),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||V.attributes.normal===void 0&&et===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Ee,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Ve&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===it,decodeVideoTextureEmissive:Nt&&y.emissiveMap.isVideoTexture===!0&&Je.getTransfer(y.emissiveMap.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===xn,flipSided:y.side===$t,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&y.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function m(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)w.push(R),w.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(f(w,y),M(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function f(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function M(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function C(y){let w=p[y.type],R;if(w){let F=qn[w];R=Ju.clone(F.uniforms)}else R=y.uniforms;return R}function S(y,w){let R=u.get(w);return R!==void 0?++R.usedTimes:(R=new Px(n,w,y,s),c.push(R),u.set(w,R)),R}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:C,acquireProgram:S,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:A}}function Ux(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Fx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function md(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function gd(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,x,m,f){let M=n[e];return M===void 0?(M={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:f},n[e]=M):(M.id=h.id,M.object=h,M.geometry=p,M.material=_,M.materialVariant=a(h),M.groupOrder=x,M.renderOrder=h.renderOrder,M.z=m,M.group=f),e++,M}function l(h,p,_,x,m,f,M){M.reversedDepth===!0&&(m=-m);let C=o(h,p,_,x,m,f);_.transmission>0?i.push(C):_.transparent===!0?s.push(C):t.push(C)}function c(h,p,_,x,m,f){let M=o(h,p,_,x,m,f);_.transmission>0?i.unshift(M):_.transparent===!0?s.unshift(M):t.unshift(M)}function u(h,p){t.length>1&&t.sort(h||Fx),i.length>1&&i.sort(p||md),s.length>1&&s.sort(p||md)}function d(){for(let h=e,p=n.length;h<p;h++){let _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function Ox(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new gd,n.set(i,[a])):s>=r.length?(a=new gd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Bx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new Le};break;case"SpotLight":t={position:new B,direction:new B,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function kx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var zx=0;function Vx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Gx(n){let e=new Bx,t=kx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);let s=new B,r=new We,a=new We;function o(c){let u=0,d=0,h=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let p=0,_=0,x=0,m=0,f=0,M=0,C=0,S=0,T=0,E=0,A=0,y=0,w=0,R=0;c.sort(Vx);for(let P=0,z=c.length;P<z;P++){let I=c[P],V=I.color,W=I.intensity,q=I.distance,te=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ci?te=I.shadow.map.texture:te=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=V.r*W,d+=V.g*W,h+=V.b*W;else if(I.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(I.sh.coefficients[J],W);R++}else if(I.isSunLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[_]=se,i.sunShadowMap[_]=te;let Ie=Q.getViewportCount();for(let Ee=0;Ee<Ie;Ee++)i.sunShadowMatrix[x+Ee]=Q.getMatrix(Ee),i.sunShadowCascade[x+Ee]=Q._cascadeData[Ee];x+=Ie,_++}i.sun[p]=J,p++}else if(I.isDirectionalLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,i.directionalShadow[m]=se,i.directionalShadowMap[m]=te,i.directionalShadowMatrix[m]=I.shadow.matrix,T++}i.directional[m]=J,m++}else if(I.isSpotLight){let J=e.get(I);J.position.setFromMatrixPosition(I.matrixWorld),J.color.copy(V).multiplyScalar(W),J.distance=q,J.coneCos=Math.cos(I.angle),J.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),J.decay=I.decay,i.spot[M]=J;let Q=I.shadow;if(I.map&&(i.spotLightMap[y]=I.map,y++,Q.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[M]=Q.matrix,I.castShadow){let se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,i.spotShadow[M]=se,i.spotShadowMap[M]=te,A++}M++}else if(I.isRectAreaLight){let J=e.get(I);J.color.copy(V).multiplyScalar(W),J.halfWidth.set(I.width*.5,0,0),J.halfHeight.set(0,I.height*.5,0),i.rectArea[C]=J,C++}else if(I.isPointLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),J.distance=I.distance,J.decay=I.decay,I.castShadow){let Q=I.shadow,se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,se.shadowCameraNear=Q.camera.near,se.shadowCameraFar=Q.camera.far,i.pointShadow[f]=se,i.pointShadowMap[f]=te,i.pointShadowMatrix[f]=I.shadow.matrix,E++}i.point[f]=J,f++}else if(I.isHemisphereLight){let J=e.get(I);J.skyColor.copy(I.color).multiplyScalar(W),J.groundColor.copy(I.groundColor).multiplyScalar(W),i.hemi[S]=J,S++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let F=i.hash;(F.sunLength!==p||F.directionalLength!==m||F.pointLength!==f||F.spotLength!==M||F.rectAreaLength!==C||F.hemiLength!==S||F.numSunShadows!==_||F.numDirectionalShadows!==T||F.numPointShadows!==E||F.numSpotShadows!==A||F.numSpotMaps!==y||F.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=m,i.spot.length=M,i.rectArea.length=C,i.point.length=f,i.hemi.length=S,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+y-w,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,F.sunLength=p,F.directionalLength=m,F.pointLength=f,F.spotLength=M,F.rectAreaLength=C,F.hemiLength=S,F.numSunShadows=_,F.numDirectionalShadows=T,F.numPointShadows=E,F.numSpotShadows=A,F.numSpotMaps=y,F.numLightProbes=R,i.version=zx++)}function l(c,u){let d=0,h=0,p=0,_=0,x=0,m=0,f=u.matrixWorldInverse;for(let M=0,C=c.length;M<C;M++){let S=c[M];if(S.isSunLight){let T=i.sun[d];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),d++}else if(S.isDirectionalLight){let T=i.directional[h];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),h++}else if(S.isSpotLight){let T=i.spot[_];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),_++}else if(S.isRectAreaLight){let T=i.rectArea[x];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),a.identity(),r.copy(S.matrixWorld),r.premultiply(f),a.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){let T=i.point[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),p++}else if(S.isHemisphereLight){let T=i.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function xd(n){let e=new Gx(n),t=[],i=[],s=[];function r(h){d.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Hx(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new xd(n),e.set(s,[o])):r>=a.length?(o=new xd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var Wx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,qx=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Yx=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],_d=new We,Vr=new B,Yc=new B;function Zx(n,e,t){let i=new Ls,s=new Oe,r=new Oe,a=new yt,o=new Ka,l=new ja,c={},u=t.maxTextureSize,d={[wi]:$t,[$t]:wi,[xn]:xn},h=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Wx,fragmentShader:Xx}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new Et;_.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new je(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wi;let f=this.type;this.render=function(E,A,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===du&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wi);let w=n.getRenderTarget(),R=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),P=n.state;P.setBlending(Wn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let z=f!==this.type;z&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(V=>V.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,V=E.length;I<V;I++){let W=E[I],q=W.shadow;if(q===void 0){Ne("WebGLShadowMap:",W,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let te=q.getFrameExtents();s.multiply(te),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,q.mapSize.y=r.y));let J=n.state.buffers.depth.getReversed();if(q.camera._reversedDepth=J,q.map===null||z===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===ks){if(W.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Ht(s.x,s.y,{format:Ci,type:Dn,minFilter:It,magFilter:It,generateMipmaps:!1}),q.map.texture.name=W.name+".shadowMap",q.map.depthTexture=new vi(s.x,s.y,_n),q.map.depthTexture.name=W.name+".shadowMapDepth",q.map.depthTexture.format=zn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=vt,q.map.depthTexture.magFilter=vt}else W.isPointLight?(q.map=new sl(s.x),q.map.depthTexture=new Za(s.x,Ln)):(q.map=new Ht(s.x,s.y),q.map.depthTexture=new vi(s.x,s.y,Ln)),q.map.depthTexture.name=W.name+".shadowMap",q.map.depthTexture.format=zn,this.type===Wi?(q.map.depthTexture.compareFunction=J?el:Qo,q.map.depthTexture.minFilter=It,q.map.depthTexture.magFilter=It):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=vt,q.map.depthTexture.magFilter=vt);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let Q=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();W.isPointLight!==!0&&q.updateMatrices(W,y);for(let se=0;se<Q;se++){let Ie=q.getCamera(se);if(W.isPointLight){let Ee=q.camera,at=q.matrix,Ze=W.distance||Ee.far;Ze!==Ee.far&&(Ee.far=Ze,Ee.updateProjectionMatrix()),Vr.setFromMatrixPosition(W.matrixWorld),Ee.position.copy(Vr),Yc.copy(Ee.position),Yc.add(qx[se]),Ee.up.copy(Yx[se]),Ee.lookAt(Yc),Ee.updateMatrixWorld(),at.makeTranslation(-Vr.x,-Vr.y,-Vr.z),_d.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),q._frustum.setFromProjectionMatrix(_d,Ee.coordinateSystem,Ee.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)n.setRenderTarget(q.map,se),n.clear();else{se===0&&(n.setRenderTarget(q.map),n.clear());let Ee=q.getViewport(se);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),P.viewport(a)}i=q.getFrustum(se),S(A,y,Ie,W,this.type)}q.isPointLightShadow!==!0&&this.type===ks&&M(q,y),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,R,F)};function M(E,A){let y=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Ht(s.x,s.y,{format:Ci,type:Dn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(A,null,y,h,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(A,null,y,p,x,null)}function C(E,A,y,w){let R=null,F=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(F!==void 0)R=F;else if(R=y.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let P=R.uuid,z=A.uuid,I=c[P];I===void 0&&(I={},c[P]=I);let V=I[z];V===void 0&&(V=R.clone(),I[z]=V,A.addEventListener("dispose",T)),R=V}if(R.visible=A.visible,R.wireframe=A.wireframe,w===ks?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:d[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let P=n.properties.get(R);P.light=y}return R}function S(E,A,y,w,R){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===ks)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let z=e.update(E),I=E.material;if(Array.isArray(I)){let V=z.groups;for(let W=0,q=V.length;W<q;W++){let te=V[W],J=I[te.materialIndex];if(J&&J.visible){let Q=C(E,J,w,R);E.onBeforeShadow(n,E,A,y,z,Q,te),n.renderBufferDirect(y,null,z,Q,E,te),E.onAfterShadow(n,E,A,y,z,Q,te)}}}else if(I.visible){let V=C(E,I,w,R);E.onBeforeShadow(n,E,A,y,z,V,null),n.renderBufferDirect(y,null,z,V,E,null),E.onAfterShadow(n,E,A,y,z,V,null)}}let P=E.children;for(let z=0,I=P.length;z<I;z++)S(P[z],A,y,w,R)}function T(E){E.target.removeEventListener("dispose",T);for(let y in c){let w=c[y],R=E.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function Jx(n,e){function t(){let D=!1,de=new yt,ee=null,fe=new yt(0,0,0,0);return{setMask:function(_e){ee!==_e&&!D&&(n.colorMask(_e,_e,_e,_e),ee=_e)},setLocked:function(_e){D=_e},setClear:function(_e,re,Pe,Ce,dt){dt===!0&&(_e*=Ce,re*=Ce,Pe*=Ce),de.set(_e,re,Pe,Ce),fe.equals(de)===!1&&(n.clearColor(_e,re,Pe,Ce),fe.copy(de))},reset:function(){D=!1,ee=null,fe.set(-1,0,0,0)}}}function i(){let D=!1,de=!1,ee=null,fe=null,_e=null;return{setReversed:function(re){if(de!==re){let Pe=e.get("EXT_clip_control");re?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),de=re;let Ce=_e;_e=null,this.setClear(Ce)}},getReversed:function(){return de},setTest:function(re){re?ne(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!D&&(n.depthMask(re),ee=re)},setFunc:function(re){if(de&&(re=qu[re]),fe!==re){switch(re){case Pa:n.depthFunc(n.NEVER);break;case La:n.depthFunc(n.ALWAYS);break;case Da:n.depthFunc(n.LESS);break;case bs:n.depthFunc(n.LEQUAL);break;case Na:n.depthFunc(n.EQUAL);break;case Ua:n.depthFunc(n.GEQUAL);break;case Fa:n.depthFunc(n.GREATER);break;case Oa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=re}},setLocked:function(re){D=re},setClear:function(re){_e!==re&&(_e=re,de&&(re=1-re),n.clearDepth(re))},reset:function(){D=!1,ee=null,fe=null,_e=null,de=!1}}}function s(){let D=!1,de=null,ee=null,fe=null,_e=null,re=null,Pe=null,Ce=null,dt=null;return{setTest:function(tt){D||(tt?ne(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(tt){de!==tt&&!D&&(n.stencilMask(tt),de=tt)},setFunc:function(tt,vn,On){(ee!==tt||fe!==vn||_e!==On)&&(n.stencilFunc(tt,vn,On),ee=tt,fe=vn,_e=On)},setOp:function(tt,vn,On){(re!==tt||Pe!==vn||Ce!==On)&&(n.stencilOp(tt,vn,On),re=tt,Pe=vn,Ce=On)},setLocked:function(tt){D=tt},setClear:function(tt){dt!==tt&&(n.clearStencil(tt),dt=tt)},reset:function(){D=!1,de=null,ee=null,fe=null,_e=null,re=null,Pe=null,Ce=null,dt=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},p=new WeakMap,_=[],x=null,m=!1,f=null,M=null,C=null,S=null,T=null,E=null,A=null,y=new Le(0,0,0),w=0,R=!1,F=null,P=null,z=null,I=null,V=null,W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,te=0,J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(J)[1]),q=te>=1):J.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),q=te>=2);let Q=null,se={},Ie=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),at=new yt().fromArray(Ie),Ze=new yt().fromArray(Ee);function qe(D,de,ee,fe){let _e=new Uint8Array(4),re=n.createTexture();n.bindTexture(D,re),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<ee;Pe++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(de+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return re}let K={};K[n.TEXTURE_2D]=qe(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=qe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=qe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=qe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(bs),ze(!1),et(mc),ne(n.CULL_FACE),Ge(Wn);function ne(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function pe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function De(D,de){return h[D]!==de?(n.bindFramebuffer(D,de),h[D]=de,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function ye(D,de){let ee=_,fe=!1;if(D){ee=p.get(de),ee===void 0&&(ee=[],p.set(de,ee));let _e=D.textures;if(ee.length!==_e.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Pe=_e.length;re<Pe;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=_e.length,fe=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,fe=!0);fe&&n.drawBuffers(ee)}function Ve(D){return x!==D?(n.useProgram(D),x=D,!0):!1}let ut={[Xi]:n.FUNC_ADD,[pu]:n.FUNC_SUBTRACT,[mu]:n.FUNC_REVERSE_SUBTRACT};ut[gu]=n.MIN,ut[xu]=n.MAX;let Be={[_u]:n.ZERO,[yu]:n.ONE,[vu]:n.SRC_COLOR,[yc]:n.SRC_ALPHA,[Eu]:n.SRC_ALPHA_SATURATE,[wu]:n.DST_COLOR,[Su]:n.DST_ALPHA,[Mu]:n.ONE_MINUS_SRC_COLOR,[vc]:n.ONE_MINUS_SRC_ALPHA,[Tu]:n.ONE_MINUS_DST_COLOR,[bu]:n.ONE_MINUS_DST_ALPHA,[Au]:n.CONSTANT_COLOR,[Cu]:n.ONE_MINUS_CONSTANT_COLOR,[Ru]:n.CONSTANT_ALPHA,[Iu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ge(D,de,ee,fe,_e,re,Pe,Ce,dt,tt){if(D===Wn){m===!0&&(pe(n.BLEND),m=!1);return}if(m===!1&&(ne(n.BLEND),m=!0),D!==fu){if(D!==f||tt!==R){if((M!==Xi||T!==Xi)&&(n.blendEquation(n.FUNC_ADD),M=Xi,T=Xi),tt)switch(D){case zs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gc:n.blendFunc(n.ONE,n.ONE);break;case xc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _c:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Fe("WebGLState: Invalid blending: ",D);break}else switch(D){case zs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case xc:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _c:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",D);break}C=null,S=null,E=null,A=null,y.set(0,0,0),w=0,f=D,R=tt}return}_e=_e||de,re=re||ee,Pe=Pe||fe,(de!==M||_e!==T)&&(n.blendEquationSeparate(ut[de],ut[_e]),M=de,T=_e),(ee!==C||fe!==S||re!==E||Pe!==A)&&(n.blendFuncSeparate(Be[ee],Be[fe],Be[re],Be[Pe]),C=ee,S=fe,E=re,A=Pe),(Ce.equals(y)===!1||dt!==w)&&(n.blendColor(Ce.r,Ce.g,Ce.b,dt),y.copy(Ce),w=dt),f=D,R=!1}function st(D,de){D.side===xn?pe(n.CULL_FACE):ne(n.CULL_FACE);let ee=D.side===$t;de&&(ee=!ee),ze(ee),D.blending===zs&&D.transparent===!1?Ge(Wn):Ge(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let fe=D.stencilWrite;o.setTest(fe),fe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(D){F!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),F=D)}function et(D){D!==hu?(ne(n.CULL_FACE),D!==P&&(D===mc?n.cullFace(n.BACK):D===uu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),P=D}function wt(D){D!==z&&(q&&n.lineWidth(D),z=D)}function Nt(D,de,ee){D?(ne(n.POLYGON_OFFSET_FILL),(I!==de||V!==ee)&&(I=de,V=ee,a.getReversed()&&(de=-de),n.polygonOffset(de,ee))):pe(n.POLYGON_OFFSET_FILL)}function mt(D){D?ne(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function St(D){D===void 0&&(D=n.TEXTURE0+W-1),Q!==D&&(n.activeTexture(D),Q=D)}function O(D,de,ee){ee===void 0&&(Q===null?ee=n.TEXTURE0+W-1:ee=Q);let fe=se[ee];fe===void 0&&(fe={type:void 0,texture:void 0},se[ee]=fe),(fe.type!==D||fe.texture!==de)&&(Q!==ee&&(n.activeTexture(ee),Q=ee),n.bindTexture(D,de||K[D]),fe.type=D,fe.texture=de)}function Z(){let D=se[Q];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ie(){try{n.compressedTexImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function g(){try{n.texSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function L(){try{n.texSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function X(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function oe(){try{n.texStorage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function ae(){try{n.texStorage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function $(){try{n.texImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function j(){try{n.texImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function le(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function Ae(D,de){d[D]!==de&&(n.pixelStorei(D,de),d[D]=de)}function ue(D){at.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),at.copy(D))}function he(D){Ze.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Ze.copy(D))}function ce(D,de){let ee=c.get(de);ee===void 0&&(ee=new WeakMap,c.set(de,ee));let fe=ee.get(D);fe===void 0&&(fe=n.getUniformBlockIndex(de,D.name),ee.set(D,fe))}function ve(D,de){let fe=c.get(de).get(D);l.get(de)!==fe&&(n.uniformBlockBinding(de,fe,D.__bindingPointIndex),l.set(de,fe))}function Ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},Q=null,se={},h={},p=new WeakMap,_=[],x=null,m=!1,f=null,M=null,C=null,S=null,T=null,E=null,A=null,y=new Le(0,0,0),w=0,R=!1,F=null,P=null,z=null,I=null,V=null,at.set(0,0,n.canvas.width,n.canvas.height),Ze.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:pe,bindFramebuffer:De,drawBuffers:ye,useProgram:Ve,setBlending:Ge,setMaterial:st,setFlipSided:ze,setCullFace:et,setLineWidth:wt,setPolygonOffset:Nt,setScissorTest:mt,activeTexture:St,bindTexture:O,unbindTexture:Z,compressedTexImage2D:ie,compressedTexImage3D:b,texImage2D:$,texImage3D:j,pixelStorei:Ae,getParameter:le,updateUBOMapping:ce,uniformBlockBinding:ve,texStorage2D:oe,texStorage3D:ae,texSubImage2D:g,texSubImage3D:L,compressedTexSubImage2D:k,compressedTexSubImage3D:X,scissor:ue,viewport:he,reset:Ue}}function $x(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,u=new WeakMap,d=new Set,h,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,g){return _?new OffscreenCanvas(b,g):Ts("canvas")}function m(b,g,L){let k=1,X=ie(b);if((X.width>L||X.height>L)&&(k=L/Math.max(X.width,X.height)),k<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let oe=Math.floor(k*X.width),ae=Math.floor(k*X.height);h===void 0&&(h=x(oe,ae));let $=g?x(oe,ae):h;return $.width=oe,$.height=ae,$.getContext("2d").drawImage(b,0,0,oe,ae),Ne("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+oe+"x"+ae+")."),$}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),b;return b}function f(b){return b.generateMipmaps}function M(b){n.generateMipmap(b)}function C(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(b,g,L,k,X,oe=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ae;k&&(ae=e.get("EXT_texture_norm16"),ae||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=g;if(g===n.RED&&(L===n.FLOAT&&($=n.R32F),L===n.HALF_FLOAT&&($=n.R16F),L===n.UNSIGNED_BYTE&&($=n.R8),L===n.UNSIGNED_SHORT&&ae&&($=ae.R16_EXT),L===n.SHORT&&ae&&($=ae.R16_SNORM_EXT)),g===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.R8UI),L===n.UNSIGNED_SHORT&&($=n.R16UI),L===n.UNSIGNED_INT&&($=n.R32UI),L===n.BYTE&&($=n.R8I),L===n.SHORT&&($=n.R16I),L===n.INT&&($=n.R32I)),g===n.RG&&(L===n.FLOAT&&($=n.RG32F),L===n.HALF_FLOAT&&($=n.RG16F),L===n.UNSIGNED_BYTE&&($=n.RG8),L===n.UNSIGNED_SHORT&&ae&&($=ae.RG16_EXT),L===n.SHORT&&ae&&($=ae.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.RG8UI),L===n.UNSIGNED_SHORT&&($=n.RG16UI),L===n.UNSIGNED_INT&&($=n.RG32UI),L===n.BYTE&&($=n.RG8I),L===n.SHORT&&($=n.RG16I),L===n.INT&&($=n.RG32I)),g===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.RGB8UI),L===n.UNSIGNED_SHORT&&($=n.RGB16UI),L===n.UNSIGNED_INT&&($=n.RGB32UI),L===n.BYTE&&($=n.RGB8I),L===n.SHORT&&($=n.RGB16I),L===n.INT&&($=n.RGB32I)),g===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.RGBA8UI),L===n.UNSIGNED_SHORT&&($=n.RGBA16UI),L===n.UNSIGNED_INT&&($=n.RGBA32UI),L===n.BYTE&&($=n.RGBA8I),L===n.SHORT&&($=n.RGBA16I),L===n.INT&&($=n.RGBA32I)),g===n.RGB&&(L===n.UNSIGNED_SHORT&&ae&&($=ae.RGB16_EXT),L===n.SHORT&&ae&&($=ae.RGB16_SNORM_EXT),L===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),L===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),g===n.RGBA){let j=oe?mr:Je.getTransfer(X);L===n.FLOAT&&($=n.RGBA32F),L===n.HALF_FLOAT&&($=n.RGBA16F),L===n.UNSIGNED_BYTE&&($=j===it?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT&&ae&&($=ae.RGBA16_EXT),L===n.SHORT&&ae&&($=ae.RGBA16_SNORM_EXT),L===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function T(b,g){let L;return b?g===null||g===Ln||g===Hs?L=n.DEPTH24_STENCIL8:g===_n?L=n.DEPTH32F_STENCIL8:g===Gs&&(L=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Ln||g===Hs?L=n.DEPTH_COMPONENT24:g===_n?L=n.DEPTH_COMPONENT32F:g===Gs&&(L=n.DEPTH_COMPONENT16),L}function E(b,g){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==vt&&b.minFilter!==It?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function A(b){let g=b.target;g.removeEventListener("dispose",A),w(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&d.delete(g)}function y(b){let g=b.target;g.removeEventListener("dispose",y),F(g)}function w(b){let g=i.get(b);if(g.__webglInit===void 0)return;let L=b.source,k=p.get(L);if(k){let X=k[g.__cacheKey];X.usedTimes--,X.usedTimes===0&&R(b),Object.keys(k).length===0&&p.delete(L)}i.remove(b)}function R(b){let g=i.get(b);n.deleteTexture(g.__webglTexture);let L=b.source,k=p.get(L);delete k[g.__cacheKey],a.memory.textures--}function F(b){let g=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let X=0;X<g.__webglFramebuffer[k].length;X++)n.deleteFramebuffer(g.__webglFramebuffer[k][X]);else n.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)n.deleteFramebuffer(g.__webglFramebuffer[k]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let L=b.textures;for(let k=0,X=L.length;k<X;k++){let oe=i.get(L[k]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(L[k])}i.remove(b)}let P=0;function z(){P=0}function I(){return P}function V(b){P=b}function W(){let b=P;return b>=s.maxTextures&&Ne("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,b}function q(b){let g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function te(b,g){let L=i.get(b);if(b.isVideoTexture&&O(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&L.__version!==b.version){let k=b.image;if(k===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{pe(L,b,g);return}}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+g)}function J(b,g){let L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){pe(L,b,g);return}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+g)}function Q(b,g){let L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){pe(L,b,g);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+g)}function se(b,g){let L=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&L.__version!==b.version){De(L,b,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+g)}let Ie={[Ba]:n.REPEAT,[pn]:n.CLAMP_TO_EDGE,[ka]:n.MIRRORED_REPEAT},Ee={[vt]:n.NEAREST,[Du]:n.NEAREST_MIPMAP_NEAREST,[Dr]:n.NEAREST_MIPMAP_LINEAR,[It]:n.LINEAR,[po]:n.LINEAR_MIPMAP_NEAREST,[Ei]:n.LINEAR_MIPMAP_LINEAR},at={[Ou]:n.NEVER,[Gu]:n.ALWAYS,[Bu]:n.LESS,[Qo]:n.LEQUAL,[ku]:n.EQUAL,[el]:n.GEQUAL,[zu]:n.GREATER,[Vu]:n.NOTEQUAL};function Ze(b,g){if(g.type===_n&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===It||g.magFilter===po||g.magFilter===Dr||g.magFilter===Ei||g.minFilter===It||g.minFilter===po||g.minFilter===Dr||g.minFilter===Ei)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Ie[g.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Ie[g.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Ie[g.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Ee[g.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Ee[g.minFilter]),g.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,at[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===vt||g.minFilter!==Dr&&g.minFilter!==Ei||g.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){let L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function qe(b,g){let L=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",A));let k=g.source,X=p.get(k);X===void 0&&(X={},p.set(k,X));let oe=q(g);if(oe!==b.__cacheKey){X[oe]===void 0&&(X[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),X[oe].usedTimes++;let ae=X[b.__cacheKey];ae!==void 0&&(X[b.__cacheKey].usedTimes--,ae.usedTimes===0&&R(g)),b.__cacheKey=oe,b.__webglTexture=X[oe].texture}return L}function K(b,g,L){return Math.floor(Math.floor(b/L)/g)}function ne(b,g,L,k){let oe=b.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,L,k,g.data);else{oe.sort((Ae,ue)=>Ae.start-ue.start);let ae=0;for(let Ae=1;Ae<oe.length;Ae++){let ue=oe[ae],he=oe[Ae],ce=ue.start+ue.count,ve=K(he.start,g.width,4),Ue=K(ue.start,g.width,4);he.start<=ce+1&&ve===Ue&&K(he.start+he.count-1,g.width,4)===ve?ue.count=Math.max(ue.count,he.start+he.count-ue.start):(++ae,oe[ae]=he)}oe.length=ae+1;let $=t.getParameter(n.UNPACK_ROW_LENGTH),j=t.getParameter(n.UNPACK_SKIP_PIXELS),le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let Ae=0,ue=oe.length;Ae<ue;Ae++){let he=oe[Ae],ce=Math.floor(he.start/4),ve=Math.ceil(he.count/4),Ue=ce%g.width,D=Math.floor(ce/g.width),de=ve,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Ue,D,de,ee,L,k,g.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,j),t.pixelStorei(n.UNPACK_SKIP_ROWS,le)}}function pe(b,g,L){let k=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=n.TEXTURE_3D);let X=qe(b,g),oe=g.source;t.bindTexture(k,b.__webglTexture,n.TEXTURE0+L);let ae=i.get(oe);if(oe.version!==ae.__version||X===!0){if(t.activeTexture(n.TEXTURE0+L),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let ee=Je.getPrimaries(Je.workingColorSpace),fe=g.colorSpace===li?null:Je.getPrimaries(g.colorSpace),_e=g.colorSpace===li||ee===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let j=m(g.image,!1,s.maxTextureSize);j=Z(g,j);let le=r.convert(g.format,g.colorSpace),Ae=r.convert(g.type),ue=S(g.internalFormat,le,Ae,g.normalized,g.colorSpace,g.isVideoTexture);Ze(k,g);let he,ce=g.mipmaps,ve=g.isVideoTexture!==!0,Ue=ae.__version===void 0||X===!0,D=oe.dataReady,de=E(g,j);if(g.isDepthTexture)ue=T(g.format===Ai,g.type),Ue&&(ve?t.texStorage2D(n.TEXTURE_2D,1,ue,j.width,j.height):t.texImage2D(n.TEXTURE_2D,0,ue,j.width,j.height,0,le,Ae,null));else if(g.isDataTexture)if(ce.length>0){ve&&Ue&&t.texStorage2D(n.TEXTURE_2D,de,ue,ce[0].width,ce[0].height);for(let ee=0,fe=ce.length;ee<fe;ee++)he=ce[ee],ve?D&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,le,Ae,he.data):t.texImage2D(n.TEXTURE_2D,ee,ue,he.width,he.height,0,le,Ae,he.data);g.generateMipmaps=!1}else ve?(Ue&&t.texStorage2D(n.TEXTURE_2D,de,ue,j.width,j.height),D&&ne(g,j,le,Ae)):t.texImage2D(n.TEXTURE_2D,0,ue,j.width,j.height,0,le,Ae,j.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){ve&&Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,ce[0].width,ce[0].height,j.depth);for(let ee=0,fe=ce.length;ee<fe;ee++)if(he=ce[ee],g.format!==tn)if(le!==null)if(ve){if(D)if(g.layerUpdates.size>0){let _e=Vc(he.width,he.height,g.format,g.type);for(let re of g.layerUpdates){let Pe=he.data.subarray(re*_e/he.data.BYTES_PER_ELEMENT,(re+1)*_e/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,he.width,he.height,1,le,Pe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,j.depth,le,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,ue,he.width,he.height,j.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ve?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,j.depth,le,Ae,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,ue,he.width,he.height,j.depth,0,le,Ae,he.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{ve&&Ue&&t.texStorage2D(n.TEXTURE_2D,de,ue,ce[0].width,ce[0].height);for(let ee=0,fe=ce.length;ee<fe;ee++)he=ce[ee],g.format!==tn?le!==null?ve?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,le,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,ue,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ve?D&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,le,Ae,he.data):t.texImage2D(n.TEXTURE_2D,ee,ue,he.width,he.height,0,le,Ae,he.data)}else if(g.isDataArrayTexture)if(ve){if(Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,j.width,j.height,j.depth),D)if(g.layerUpdates.size>0){let ee=Vc(j.width,j.height,g.format,g.type);for(let fe of g.layerUpdates){let _e=j.data.subarray(fe*ee/j.data.BYTES_PER_ELEMENT,(fe+1)*ee/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,j.width,j.height,1,le,Ae,_e)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,le,Ae,j.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,j.width,j.height,j.depth,0,le,Ae,j.data);else if(g.isData3DTexture)ve?(Ue&&t.texStorage3D(n.TEXTURE_3D,de,ue,j.width,j.height,j.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,le,Ae,j.data)):t.texImage3D(n.TEXTURE_3D,0,ue,j.width,j.height,j.depth,0,le,Ae,j.data);else if(g.isFramebufferTexture){if(Ue)if(ve)t.texStorage2D(n.TEXTURE_2D,de,ue,j.width,j.height);else{let ee=j.width,fe=j.height;for(let _e=0;_e<de;_e++)t.texImage2D(n.TEXTURE_2D,_e,ue,ee,fe,0,le,Ae,null),ee>>=1,fe>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){let ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),j.parentNode!==ee){ee.appendChild(j),d.add(g),ee.onpaint=fe=>{let _e=fe.changedElements;for(let re of d)_e.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,j);else{let _e=n.RGBA,re=n.RGBA,Pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,_e,re,Pe,j)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ce.length>0){if(ve&&Ue){let ee=ie(ce[0]);t.texStorage2D(n.TEXTURE_2D,de,ue,ee.width,ee.height)}for(let ee=0,fe=ce.length;ee<fe;ee++)he=ce[ee],ve?D&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,le,Ae,he):t.texImage2D(n.TEXTURE_2D,ee,ue,le,Ae,he);g.generateMipmaps=!1}else if(ve){if(Ue){let ee=ie(j);t.texStorage2D(n.TEXTURE_2D,de,ue,ee.width,ee.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le,Ae,j)}else t.texImage2D(n.TEXTURE_2D,0,ue,le,Ae,j);f(g)&&M(k),ae.__version=oe.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function De(b,g,L){if(g.image.length!==6)return;let k=qe(b,g),X=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+L);let oe=i.get(X);if(X.version!==oe.__version||k===!0){t.activeTexture(n.TEXTURE0+L);let ae=Je.getPrimaries(Je.workingColorSpace),$=g.colorSpace===li?null:Je.getPrimaries(g.colorSpace),j=g.colorSpace===li||ae===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let le=g.isCompressedTexture||g.image[0].isCompressedTexture,Ae=g.image[0]&&g.image[0].isDataTexture,ue=[];for(let re=0;re<6;re++)!le&&!Ae?ue[re]=m(g.image[re],!0,s.maxCubemapSize):ue[re]=Ae?g.image[re].image:g.image[re],ue[re]=Z(g,ue[re]);let he=ue[0],ce=r.convert(g.format,g.colorSpace),ve=r.convert(g.type),Ue=S(g.internalFormat,ce,ve,g.normalized,g.colorSpace),D=g.isVideoTexture!==!0,de=oe.__version===void 0||k===!0,ee=X.dataReady,fe=E(g,he);Ze(n.TEXTURE_CUBE_MAP,g);let _e;if(le){D&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ue,he.width,he.height);for(let re=0;re<6;re++){_e=ue[re].mipmaps;for(let Pe=0;Pe<_e.length;Pe++){let Ce=_e[Pe];g.format!==tn?ce!==null?D?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Ce.width,Ce.height,ce,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Ue,Ce.width,Ce.height,0,Ce.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Ce.width,Ce.height,ce,ve,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Ue,Ce.width,Ce.height,0,ce,ve,Ce.data)}}}else{if(_e=g.mipmaps,D&&de){_e.length>0&&fe++;let re=ie(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ue,re.width,re.height)}for(let re=0;re<6;re++)if(Ae){D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ue[re].width,ue[re].height,ce,ve,ue[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ue,ue[re].width,ue[re].height,0,ce,ve,ue[re].data);for(let Pe=0;Pe<_e.length;Pe++){let dt=_e[Pe].image[re].image;D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,dt.width,dt.height,ce,ve,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Ue,dt.width,dt.height,0,ce,ve,dt.data)}}else{D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ce,ve,ue[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ue,ce,ve,ue[re]);for(let Pe=0;Pe<_e.length;Pe++){let Ce=_e[Pe];D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,ce,ve,Ce.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Ue,ce,ve,Ce.image[re])}}}f(g)&&M(n.TEXTURE_CUBE_MAP),oe.__version=X.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function ye(b,g,L,k,X,oe){let ae=r.convert(L.format,L.colorSpace),$=r.convert(L.type),j=S(L.internalFormat,ae,$,L.normalized,L.colorSpace),le=i.get(g),Ae=i.get(L);if(Ae.__renderTarget=g,!le.__hasExternalTextures){let ue=Math.max(1,g.width>>oe),he=Math.max(1,g.height>>oe);X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?t.texImage3D(X,oe,j,ue,he,g.depth,0,ae,$,null):t.texImage2D(X,oe,j,ue,he,0,ae,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),St(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,X,Ae.__webglTexture,0,mt(g)):(X===n.TEXTURE_2D||X>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,X,Ae.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(b,g,L){if(n.bindRenderbuffer(n.RENDERBUFFER,b),g.depthBuffer){let k=g.depthTexture,X=k&&k.isDepthTexture?k.type:null,oe=T(g.stencilBuffer,X),ae=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;St(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(g),oe,g.width,g.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(g),oe,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,oe,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,b)}else{let k=g.textures;for(let X=0;X<k.length;X++){let oe=k[X],ae=r.convert(oe.format,oe.colorSpace),$=r.convert(oe.type),j=S(oe.internalFormat,ae,$,oe.normalized,oe.colorSpace);St(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(g),j,g.width,g.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(g),j,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,j,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(b,g,L){let k=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let X=i.get(g.depthTexture);if(X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),k){if(X.__webglInit===void 0&&(X.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),X.__webglTexture===void 0){X.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,g.depthTexture);let le=r.convert(g.depthTexture.format),Ae=r.convert(g.depthTexture.type),ue;g.depthTexture.format===zn?ue=n.DEPTH_COMPONENT24:g.depthTexture.format===Ai&&(ue=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ue,g.width,g.height,0,le,Ae,null)}}else te(g.depthTexture,0);let oe=X.__webglTexture,ae=mt(g),$=k?n.TEXTURE_CUBE_MAP_POSITIVE_X+L:n.TEXTURE_2D,j=g.depthTexture.format===Ai?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===zn)St(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,oe,0);else if(g.depthTexture.format===Ai)St(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(b){let g=i.get(b),L=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){let k=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){let X=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",X)};k.addEventListener("dispose",X),g.__depthDisposeCallback=X}g.__boundDepthTexture=k}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(L)for(let k=0;k<6;k++)ut(g.__webglFramebuffer[k],b,k);else{let k=b.texture.mipmaps;k&&k.length>0?ut(g.__webglFramebuffer[0],b,0):ut(g.__webglFramebuffer,b,0)}else if(L){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=n.createRenderbuffer(),Ve(g.__webglDepthbuffer[k],b,!1);else{let X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=g.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}else{let k=b.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),Ve(g.__webglDepthbuffer,b,!1);else{let X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ge(b,g,L){let k=i.get(b);g!==void 0&&ye(k.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&Be(b)}function st(b){let g=b.texture,L=i.get(b),k=i.get(g);b.addEventListener("dispose",y);let X=b.textures,oe=b.isWebGLCubeRenderTarget===!0,ae=X.length>1;if(ae||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=g.version,a.memory.textures++),oe){L.__webglFramebuffer=[];for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer[$]=[];for(let j=0;j<g.mipmaps.length;j++)L.__webglFramebuffer[$][j]=n.createFramebuffer()}else L.__webglFramebuffer[$]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer=[];for(let $=0;$<g.mipmaps.length;$++)L.__webglFramebuffer[$]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(ae)for(let $=0,j=X.length;$<j;$++){let le=i.get(X[$]);le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&St(b)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let $=0;$<X.length;$++){let j=X[$];L.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[$]);let le=r.convert(j.format,j.colorSpace),Ae=r.convert(j.type),ue=S(j.internalFormat,le,Ae,j.normalized,j.colorSpace,b.isXRRenderTarget===!0),he=mt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ue,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,L.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),Ve(L.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,g);for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0)for(let j=0;j<g.mipmaps.length;j++)ye(L.__webglFramebuffer[$][j],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,j);else ye(L.__webglFramebuffer[$],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(g)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let $=0,j=X.length;$<j;$++){let le=X[$],Ae=i.get(le),ue=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,Ae.__webglTexture),Ze(ue,le),ye(L.__webglFramebuffer,b,le,n.COLOR_ATTACHMENT0+$,ue,0),f(le)&&M(ue)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&($=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,k.__webglTexture),Ze($,g),g.mipmaps&&g.mipmaps.length>0)for(let j=0;j<g.mipmaps.length;j++)ye(L.__webglFramebuffer[j],b,g,n.COLOR_ATTACHMENT0,$,j);else ye(L.__webglFramebuffer,b,g,n.COLOR_ATTACHMENT0,$,0);f(g)&&M($),t.unbindTexture()}b.depthBuffer&&Be(b)}function ze(b){let g=b.textures;for(let L=0,k=g.length;L<k;L++){let X=g[L];if(f(X)){let oe=C(b),ae=i.get(X).__webglTexture;t.bindTexture(oe,ae),M(oe),t.unbindTexture()}}}let et=[],wt=[];function Nt(b){if(b.samples>0){if(St(b)===!1){let g=b.textures,L=b.width,k=b.height,X=n.COLOR_BUFFER_BIT,oe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(b),$=g.length>1;if($)for(let le=0;le<g.length;le++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);let j=b.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let le=0;le<g.length;le++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(X|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(X|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Ae=i.get(g[le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,L,k,0,0,L,k,X,n.NEAREST),l===!0&&(et.length=0,wt.length=0,et.push(n.COLOR_ATTACHMENT0+le),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(et.push(oe),wt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,wt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let le=0;le<g.length;le++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Ae=i.get(g[le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let g=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function mt(b){return Math.min(s.maxSamples,b.samples)}function St(b){let g=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function O(b){let g=a.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function Z(b,g){let L=b.colorSpace,k=b.format,X=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||L!==pr&&L!==li&&(Je.getTransfer(L)===it?(k!==tn||X!==en)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",L)),g}function ie(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.getTextureUnits=I,this.setTextureUnits=V,this.setTexture2D=te,this.setTexture2DArray=J,this.setTexture3D=Q,this.setTextureCube=se,this.rebindTextures=Ge,this.setupRenderTarget=st,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Kx(n,e){function t(i,s=li){let r,a=Je.getTransfer(s);if(i===en)return n.UNSIGNED_BYTE;if(i===go)return n.UNSIGNED_SHORT_4_4_4_4;if(i===xo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Lc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Rc)return n.BYTE;if(i===Ic)return n.SHORT;if(i===Gs)return n.UNSIGNED_SHORT;if(i===mo)return n.INT;if(i===Ln)return n.UNSIGNED_INT;if(i===_n)return n.FLOAT;if(i===Dn)return n.HALF_FLOAT;if(i===Dc)return n.ALPHA;if(i===Nc)return n.RGB;if(i===tn)return n.RGBA;if(i===zn)return n.DEPTH_COMPONENT;if(i===Ai)return n.DEPTH_STENCIL;if(i===_o)return n.RED;if(i===yo)return n.RED_INTEGER;if(i===Ci)return n.RG;if(i===vo)return n.RG_INTEGER;if(i===Mo)return n.RGBA_INTEGER;if(i===Nr||i===Ur||i===Fr||i===Or)if(a===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===So||i===bo||i===wo||i===To)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===So)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===To)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Eo||i===Ao||i===Co||i===Ro||i===Io||i===Br||i===Po)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Eo||i===Ao)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Co)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ro)return r.COMPRESSED_R11_EAC;if(i===Io)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Br)return r.COMPRESSED_RG11_EAC;if(i===Po)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Lo||i===Do||i===No||i===Uo||i===Fo||i===Oo||i===Bo||i===ko||i===zo||i===Vo||i===Go||i===Ho||i===Wo||i===Xo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Lo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Do)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===No)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Uo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ko)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Go)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ho)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qo||i===Yo||i===Zo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===qo)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Zo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jo||i===$o||i===kr||i===Ko)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Jo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===$o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===kr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var jx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,th=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Tr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Jt({vertexShader:jx,fragmentShader:Qx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new In(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},nh=class extends Vn{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,_=null,x=typeof XRWebGLBinding<"u",m=new th,f={},M=t.getContextAttributes(),C=null,S=null,T=[],E=[],A=new Oe,y=null,w=null,R=new Zt;R.viewport=new yt;let F=new Zt;F.viewport=new yt;let P=[R,F],z=new ho,I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ne=T[K];return ne===void 0&&(ne=new Is,T[K]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(K){let ne=T[K];return ne===void 0&&(ne=new Is,T[K]=ne),ne.getGripSpace()},this.getHand=function(K){let ne=T[K];return ne===void 0&&(ne=new Is,T[K]=ne),ne.getHandSpace()};function W(K){let ne=E.indexOf(K.inputSource);if(ne===-1)return;let pe=T[ne];pe!==void 0&&(pe.update(K.inputSource,K.frame,c||a),pe.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",te);for(let K=0;K<T.length;K++){let ne=E[K];ne!==null&&(E[K]=null,T[K].disconnect(ne))}I=null,V=null,m.reset();for(let K in f)delete f[K];if(e.setRenderTarget(C),p=null,h=null,d=null,s=null,S=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),w!==null){let K=w.camera;K.fov=w.fov,K.zoom=w.zoom,K.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",q),s.addEventListener("inputsourceschange",te),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,De=null,ye=null;M.depth&&(ye=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=M.stencil?Ai:zn,De=M.stencil?Hs:Ln);let Ve={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ve),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Ht(h.textureWidth,h.textureHeight,{format:tn,type:en,depthTexture:new vi(h.textureWidth,h.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let pe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Ht(p.framebufferWidth,p.framebufferHeight,{format:tn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(K){for(let ne=0;ne<K.removed.length;ne++){let pe=K.removed[ne],De=E.indexOf(pe);De>=0&&(E[De]=null,T[De].disconnect(pe))}for(let ne=0;ne<K.added.length;ne++){let pe=K.added[ne],De=E.indexOf(pe);if(De===-1){for(let Ve=0;Ve<T.length;Ve++)if(Ve>=E.length){E.push(pe),De=Ve;break}else if(E[Ve]===null){E[Ve]=pe,De=Ve;break}if(De===-1)break}let ye=T[De];ye&&ye.connect(pe)}}let J=new B,Q=new B;function se(K,ne,pe){J.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(pe.matrixWorld);let De=J.distanceTo(Q),ye=ne.projectionMatrix.elements,Ve=pe.projectionMatrix.elements,ut=ye[14]/(ye[10]-1),Be=ye[14]/(ye[10]+1),Ge=(ye[9]+1)/ye[5],st=(ye[9]-1)/ye[5],ze=(ye[8]-1)/ye[0],et=(Ve[8]+1)/Ve[0],wt=ut*ze,Nt=ut*et,mt=De/(-ze+et),St=mt*-ze;if(ne.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(St),K.translateZ(mt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ye[10]===-1)K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let O=ut+mt,Z=Be+mt,ie=wt-St,b=Nt+(De-St),g=Ge*Be/Z*O,L=st*Be/Z*O;K.projectionMatrix.makePerspective(ie,b,g,L,O,Z),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ie(K,ne){ne===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ne.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ne=K.near,pe=K.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),z.near=F.near=R.near=ne,z.far=F.far=R.far=pe,(I!==z.near||V!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),I=z.near,V=z.far),z.layers.mask=K.layers.mask|6,R.layers.mask=z.layers.mask&-5,F.layers.mask=z.layers.mask&-3;let De=K.parent,ye=z.cameras;Ie(z,De);for(let Ve=0;Ve<ye.length;Ve++)Ie(ye[Ve],De);ye.length===2?se(z,R,F):z.projectionMatrix.copy(R.projectionMatrix),w===null&&K.isPerspectiveCamera&&(w={camera:K,fov:K.fov,zoom:K.zoom}),Ee(K,z,De)};function Ee(K,ne,pe){pe===null?K.matrix.copy(ne.matrixWorld):(K.matrix.copy(pe.matrixWorld),K.matrix.invert(),K.matrix.multiply(ne.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=As*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(K){return f[K]};let at=null;function Ze(K,ne){if(u=ne.getViewerPose(c||a),_=ne,u!==null){let pe=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let De=!1;pe.length!==z.cameras.length&&(z.cameras.length=0,De=!0);for(let Be=0;Be<pe.length;Be++){let Ge=pe[Be],st=null;if(p!==null)st=p.getViewport(Ge);else{let et=d.getViewSubImage(h,Ge);st=et.viewport,Be===0&&(e.setRenderTargetTextures(S,et.colorTexture,et.depthStencilTexture),e.setRenderTarget(S))}let ze=P[Be];ze===void 0&&(ze=new Zt,ze.layers.enable(Be),ze.viewport=new yt,P[Be]=ze),ze.matrix.fromArray(Ge.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ge.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(st.x,st.y,st.width,st.height),Be===0&&(z.matrix.copy(ze.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),De===!0&&z.cameras.push(ze)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let Be=d.getDepthInformation(pe[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,s.renderState)}if(ye&&ye.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Be=0;Be<pe.length;Be++){let Ge=pe[Be].camera;if(Ge){let st=f[Ge];st||(st=new Tr,f[Ge]=st);let ze=d.getCameraImage(Ge);st.sourceTexture=ze}}}}for(let pe=0;pe<T.length;pe++){let De=E[pe],ye=T[pe];De!==null&&ye!==void 0&&ye.update(De,ne,c||a)}at&&at(K,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}let qe=new yd;qe.setAnimationLoop(Ze),this.setAnimationLoop=function(K){at=K},this.dispose=function(){}}},e_=new We,Td=new ke;Td.set(-1,0,0,0,1,0,0,0,1);function t_(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Bc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,C,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,C):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===$t&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===$t&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=e.get(f),C=M.envMap,S=M.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(e_.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Td),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,C){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=C*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===$t&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function n_(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){let E=T.program;i.uniformBlockBinding(S,E)}function c(S,T){let E=s[S.id];E===void 0&&(m(S),E=u(S),s[S.id]=E,S.addEventListener("dispose",M));let A=T.program;i.updateUBOMapping(S,A);let y=e.render.frame;r[S.id]!==y&&(h(S),r[S.id]=y)}function u(S){let T=d();S.__bindingPointIndex=T;let E=n.createBuffer(),A=S.__size,y=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,A,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let T=s[S.id],E=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let y=0,w=E.length;y<w;y++){let R=E[y];if(Array.isArray(R))for(let F=0,P=R.length;F<P;F++)p(R[F],y,F,A);else p(R,y,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,T,E,A){if(x(S,T,E,A)===!0){let y=S.__offset,w=S.value;if(Array.isArray(w)){let R=0;for(let F=0;F<w.length;F++){let P=w[F],z=f(P);_(P,S.__data,R),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(R+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,S.__data)}}function _(S,T,E){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,E)}function x(S,T,E,A){let y=S.value,w=T+"_"+E;if(A[w]===void 0)return typeof y=="number"||typeof y=="boolean"?A[w]=y:ArrayBuffer.isView(y)?A[w]=y.slice():A[w]=y.clone(),!0;{let R=A[w];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return A[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function m(S){let T=S.uniforms,E=0,A=16;for(let w=0,R=T.length;w<R;w++){let F=Array.isArray(T[w])?T[w]:[T[w]];for(let P=0,z=F.length;P<z;P++){let I=F[P],V=Array.isArray(I.value)?I.value:[I.value];for(let W=0,q=V.length;W<q;W++){let te=V[W],J=f(te),Q=E%A,se=Q%J.boundary,Ie=Q+se;E+=se,Ie!==0&&A-Ie<J.storage&&(E+=A-Ie),I.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=E,E+=J.storage}}}let y=E%A;return y>0&&(E+=A-y),S.__size=E,S.__cache={},this}function f(S){let T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",S),T}function M(S){let T=S.target;T.removeEventListener("dispose",M);let E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function C(){for(let S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}var i_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xn=null;function s_(){return Xn===null&&(Xn=new Gi(i_,16,16,Ci,Dn),Xn.name="DFG_LUT",Xn.minFilter=It,Xn.magFilter=It,Xn.wrapS=pn,Xn.wrapT=pn,Xn.generateMipmaps=!1,Xn.needsUpdate=!0),Xn}var Hr=class{constructor(e={}){let{canvas:t=Hu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=en}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;let x=p,m=new Set([Mo,vo,yo]),f=new Set([en,Ln,Gs,Hs,go,xo]),M=new Uint32Array(4),C=new Int32Array(4),S=new B,T=null,E=null,A=[],y=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,F=!1,P=null,z=null,I=null,V=null;this._outputColorSpace=bt;let W=0,q=0,te=null,J=-1,Q=null,se=new yt,Ie=new yt,Ee=null,at=new Le(0),Ze=0,qe=t.width,K=t.height,ne=1,pe=null,De=null,ye=new yt(0,0,qe,K),Ve=new yt(0,0,qe,K),ut=!1,Be=new Ls,Ge=!1,st=!1,ze=new We,et=new B,wt=new yt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mt=!1;function St(){return te===null?ne:1}let O=i;function Z(v,U){return t.getContext(v,U)}let ie,b,g,L,k,X,oe,ae,$,j,le,Ae,ue,he,ce,ve,Ue,D,de,ee,fe,_e,re;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",vn,!1),O===null){let U="webgl2";if(O=Z(U,v),O===null)throw Z(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pe()}catch(v){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",vn,!1),Fe("WebGLRenderer: "+v.message),v}function Pe(){ie=new ug(O),ie.init(),fe=new Kx(O,ie),b=new tg(O,ie,e,fe),g=new Jx(O,ie),b.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),z=O.createFramebuffer(),I=O.createFramebuffer(),V=O.createFramebuffer(),L=new pg(O),k=new Ux,X=new $x(O,ie,g,k,b,fe,L),oe=new hg(R),ae=new gp(O),_e=new Qm(O,ae),$=new dg(O,ae,L,_e),j=new gg(O,$,ae,_e,L),D=new mg(O,b,X),ce=new ng(k),le=new Nx(R,oe,ie,b,_e,ce),Ae=new t_(R,k),ue=new Ox,he=new Hx(ie),Ue=new jm(R,oe,g,j,_,l),ve=new Zx(R,j,b),re=new n_(O,L,b,g),de=new eg(O,ie,L),ee=new fg(O,ie,L),L.programs=le.programs,R.capabilities=b,R.extensions=ie,R.properties=k,R.renderLists=ue,R.shadowMap=ve,R.state=g,R.info=L}x!==en&&(w=new _g(x,t.width,t.height,o,s,r));let Ce=new nh(R,O);this.xr=Ce,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=ie.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ie.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(v){v!==void 0&&(ne=v,this.setSize(qe,K,!1))},this.getSize=function(v){return v.set(qe,K)},this.setSize=function(v,U,Y=!0){if(Ce.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}qe=v,K=U,t.width=Math.floor(v*ne),t.height=Math.floor(U*ne),Y===!0&&(t.style.width=v+"px",t.style.height=U+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(qe*ne,K*ne).floor()},this.setDrawingBufferSize=function(v,U,Y){qe=v,K=U,ne=Y,t.width=Math.floor(v*Y),t.height=Math.floor(U*Y),this.setViewport(0,0,v,U)},this.setEffects=function(v){if(x===en){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let U=0;U<v.length;U++)if(v[U].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(se)},this.getViewport=function(v){return v.copy(ye)},this.setViewport=function(v,U,Y,G){v.isVector4?ye.set(v.x,v.y,v.z,v.w):ye.set(v,U,Y,G),g.viewport(se.copy(ye).multiplyScalar(ne).round())},this.getScissor=function(v){return v.copy(Ve)},this.setScissor=function(v,U,Y,G){v.isVector4?Ve.set(v.x,v.y,v.z,v.w):Ve.set(v,U,Y,G),g.scissor(Ie.copy(Ve).multiplyScalar(ne).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(v){g.setScissorTest(ut=v)},this.setOpaqueSort=function(v){pe=v},this.setTransparentSort=function(v){De=v},this.getClearColor=function(v){return v.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(v=!0,U=!0,Y=!0){let G=0;if(v){let H=!1;if(te!==null){let xe=te.texture.format;H=m.has(xe)}if(H){let xe=te.texture.type,Se=f.has(xe),ge=Ue.getClearColor(),be=Ue.getClearAlpha(),Re=ge.r,He=ge.g,Ye=ge.b;Se?(M[0]=Re,M[1]=He,M[2]=Ye,M[3]=be,O.clearBufferuiv(O.COLOR,0,M)):(C[0]=Re,C[1]=He,C[2]=Ye,C[3]=be,O.clearBufferiv(O.COLOR,0,C))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),P=v},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",vn,!1),Ue.dispose(),ue.dispose(),he.dispose(),k.dispose(),oe.dispose(),j.dispose(),_e.dispose(),re.dispose(),le.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",vh),Ce.removeEventListener("sessionend",Mh),Ui.stop()};function dt(v){v.preventDefault(),gr("WebGLRenderer: Context Lost."),F=!0}function tt(){gr("WebGLRenderer: Context Restored."),F=!1;let v=L.autoReset,U=ve.enabled,Y=ve.autoUpdate,G=ve.needsUpdate,H=ve.type;Pe(),L.autoReset=v,ve.enabled=U,ve.autoUpdate=Y,ve.needsUpdate=G,ve.type=H}function vn(v){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function On(v){let U=v.target;U.removeEventListener("dispose",On),uf(U)}function uf(v){df(v),k.remove(v)}function df(v){let U=k.get(v).programs;U!==void 0&&(U.forEach(function(Y){le.releaseProgram(Y)}),v.isShaderMaterial&&le.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,Y,G,H,xe){U===null&&(U=Nt);let Se=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=mf(v,U,Y,G,H);g.setMaterial(G,Se);let be=Y.index,Re=1;if(G.wireframe===!0){if(be=$.getWireframeAttribute(Y),be===void 0)return;Re=2}let He=Y.drawRange,Ye=Y.attributes.position,we=He.start*Re,nt=(He.start+He.count)*Re;xe!==null&&(we=Math.max(we,xe.start*Re),nt=Math.min(nt,(xe.start+xe.count)*Re)),be!==null?(we=Math.max(we,0),nt=Math.min(nt,be.count)):Ye!=null&&(we=Math.max(we,0),nt=Math.min(nt,Ye.count));let Ct=nt-we;if(Ct<0||Ct===1/0)return;_e.setup(H,G,ge,Y,be);let gt,lt=de;if(be!==null&&(gt=ae.get(be),lt=ee,lt.setIndex(gt)),H.isMesh)G.wireframe===!0?(g.setLineWidth(G.wireframeLinewidth*St()),lt.setMode(O.LINES)):lt.setMode(O.TRIANGLES);else if(H.isLine){let Bt=G.linewidth;Bt===void 0&&(Bt=1),g.setLineWidth(Bt*St()),H.isLineSegments?lt.setMode(O.LINES):H.isLineLoop?lt.setMode(O.LINE_LOOP):lt.setMode(O.LINE_STRIP)}else H.isPoints?lt.setMode(O.POINTS):H.isSprite&&lt.setMode(O.TRIANGLES);if(H.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))lt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Bt=H._multiDrawStarts,Me=H._multiDrawCounts,qt=H._multiDrawCount,Qe=be?ae.get(be).bytesPerElement:1,dn=k.get(G).currentProgram.getUniforms();for(let Bn=0;Bn<qt;Bn++)dn.setValue(O,"_gl_DrawID",Bn),lt.render(Bt[Bn]/Qe,Me[Bn])}else if(H.isInstancedMesh)lt.renderInstances(we,Ct,H.count);else if(Y.isInstancedBufferGeometry){let Bt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Me=Math.min(Y.instanceCount,Bt);lt.renderInstances(we,Ct,Me)}else lt.render(we,Ct)};function yh(v,U,Y,G){P!==null&&v.isNodeMaterial&&P.setObject(G,v),Ge===!0&&ce.setState(v,Y,!1),v.transparent===!0&&v.side===xn&&v.forceSinglePass===!1?(v.side=$t,v.needsUpdate=!0,ea(v,U,G),v.side=wi,v.needsUpdate=!0,ea(v,U,G),v.side=xn):ea(v,U,G)}this.compile=function(v,U,Y=null){Y===null&&(Y=v),P!==null&&P.renderStart(v,U,Y),E=he.get(Y),E.init(U),y.push(E),Y.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),v!==Y&&v.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights(),P!==null&&P.updateLights(E.state.lightsArray),st=this.localClippingEnabled,Ge=ce.init(this.clippingPlanes,st),Ge===!0&&ce.setGlobalState(this.clippingPlanes,U),P!==null&&ve.render(E.state.shadowsArray,Y,U);let G=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let xe=H.material;if(xe)if(Array.isArray(xe))for(let Se=0;Se<xe.length;Se++){let ge=xe[Se];yh(ge,Y,U,H),G.add(ge)}else yh(xe,Y,U,H),G.add(xe)}),E=y.pop(),P!==null&&P.renderEnd(),G},this.compileAsync=function(v,U,Y=null){let G=this.compile(v,U,Y);return new Promise(H=>{function xe(){if(G.forEach(function(Se){let be=k.get(Se).currentProgram;(be===void 0||be.isReady())&&G.delete(Se)}),G.size===0){H(v);return}setTimeout(xe,10)}ie.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Nl=null;function ff(v){Nl&&Nl(v)}function vh(){Ui.stop()}function Mh(){Ui.start()}let Ui=new yd;Ui.setAnimationLoop(ff),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(v){Nl=v,Ce.setAnimationLoop(v),v===null?Ui.stop():Ui.start()},Ce.addEventListener("sessionstart",vh),Ce.addEventListener("sessionend",Mh),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;P!==null&&P.renderStart(v,U);let Y=Ce.enabled===!0&&Ce.isPresenting===!0,G=w!==null&&(te===null||Y)&&w.begin(R,te);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(U),U=Ce.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,U,te),E=he.get(v,y.length),E.init(U),E.state.textureUnits=X.getTextureUnits(),y.push(E),ze.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Be.setFromProjectionMatrix(ze,Tn,U.reversedDepth),st=this.localClippingEnabled,Ge=ce.init(this.clippingPlanes,st),T=ue.get(v,A.length),T.init(),A.push(T),Ce.enabled===!0&&Ce.isPresenting===!0){let Se=R.xr.getDepthSensingMesh();Se!==null&&Ul(Se,U,-1/0,R.sortObjects)}Ul(v,U,0,R.sortObjects),T.finish(),P!==null&&P.updateLights(E.state.lightsArray),R.sortObjects===!0&&T.sort(pe,De),mt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,mt&&Ue.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ge===!0&&ce.beginShadows();let H=E.state.shadowsArray;if(ve.render(H,v,U),Ge===!0&&ce.endShadows(),(G&&w.hasRenderPass())===!1){let Se=T.opaque,ge=T.transmissive;if(E.setupLights(),U.isArrayCamera){let be=U.cameras;if(ge.length>0)for(let Re=0,He=be.length;Re<He;Re++){let Ye=be[Re];bh(Se,ge,v,Ye)}mt&&Ue.render(v);for(let Re=0,He=be.length;Re<He;Re++){let Ye=be[Re];Sh(T,v,Ye,Ye.viewport)}}else ge.length>0&&bh(Se,ge,v,U),mt&&Ue.render(v),Sh(T,v,U)}te!==null&&q===0&&(X.updateMultisampleRenderTarget(te),X.updateRenderTargetMipmap(te)),G&&w.end(R),v.isScene===!0&&v.onAfterRender(R,v,U),_e.resetDefaultState(),J=-1,Q=null,y.pop(),y.length>0?(E=y[y.length-1],X.setTextureUnits(E.state.textureUnits),Ge===!0&&ce.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?T=A[A.length-1]:T=null,P!==null&&P.renderEnd()};function Ul(v,U,Y,G){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)Y=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLightProbeGrid)E.pushLightProbeGrid(v);else if(v.isLight)E.pushLight(v),v.castShadow&&E.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Be)){G&&wt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ze);let Se=j.update(v),ge=v.material;ge.visible&&T.push(v,Se,ge,Y,wt.z,null,U)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Be))){let Se=j.update(v),ge=v.material;if(G&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),wt.copy(v.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),wt.copy(Se.boundingSphere.center)),wt.applyMatrix4(v.matrixWorld).applyMatrix4(ze)),Array.isArray(ge)){let be=Se.groups;for(let Re=0,He=be.length;Re<He;Re++){let Ye=be[Re],we=ge[Ye.materialIndex];we&&we.visible&&T.push(v,Se,we,Y,wt.z,Ye,U)}}else ge.visible&&T.push(v,Se,ge,Y,wt.z,null,U)}}let xe=v.children;for(let Se=0,ge=xe.length;Se<ge;Se++)Ul(xe[Se],U,Y,G)}function Sh(v,U,Y,G){let{opaque:H,transmissive:xe,transparent:Se}=v;E.setupLightsView(Y),Ge===!0&&ce.setGlobalState(R.clippingPlanes,Y),G&&g.viewport(se.copy(G)),H.length>0&&Qr(H,U,Y),xe.length>0&&Qr(xe,U,Y),Se.length>0&&Qr(Se,U,Y),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function bh(v,U,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let we=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Ht(1,1,{generateMipmaps:!0,type:we?Dn:en,minFilter:Ei,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Je.workingColorSpace})}let xe=E.state.transmissionRenderTarget[G.id],Se=G.viewport||se;xe.setSize(Se.z*R.transmissionResolutionScale,Se.w*R.transmissionResolutionScale);let ge=R.getRenderTarget(),be=R.getActiveCubeFace(),Re=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(at),Ze=R.getClearAlpha(),Ze<1&&R.setClearColor(16777215,.5),R.clear(),mt&&Ue.render(Y);let He=R.toneMapping;R.toneMapping=Pn;let Ye=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),Ge===!0&&ce.setGlobalState(R.clippingPlanes,G),Qr(v,Y,G),X.updateMultisampleRenderTarget(xe),X.updateRenderTargetMipmap(xe),ie.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let nt=0,Ct=U.length;nt<Ct;nt++){let gt=U[nt],{object:lt,geometry:Bt,material:Me,group:qt}=gt;if(Me.side===xn&&lt.layers.test(G.layers)){let Qe=Me.side;Me.side=$t,Me.needsUpdate=!0,wh(lt,Y,G,Bt,Me,qt),Me.side=Qe,Me.needsUpdate=!0,we=!0}}we===!0&&(X.updateMultisampleRenderTarget(xe),X.updateRenderTargetMipmap(xe))}R.setRenderTarget(ge,be,Re),R.setClearColor(at,Ze),Ye!==void 0&&(G.viewport=Ye),R.toneMapping=He}function Qr(v,U,Y){let G=U.isScene===!0?U.overrideMaterial:null;for(let H=0,xe=v.length;H<xe;H++){let Se=v[H],{object:ge,geometry:be,group:Re}=Se,He=Se.material;He.allowOverride===!0&&G!==null&&(He=G),ge.layers.test(Y.layers)&&wh(ge,U,Y,be,He,Re)}}function wh(v,U,Y,G,H,xe){P!==null&&H.isNodeMaterial&&P.setObject(v,H),v.onBeforeRender(R,U,Y,G,H,xe),v.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(R,U,Y,G,v,xe),H.transparent===!0&&H.side===xn&&H.forceSinglePass===!1?(H.side=$t,H.needsUpdate=!0,R.renderBufferDirect(Y,U,G,H,v,xe),H.side=wi,H.needsUpdate=!0,R.renderBufferDirect(Y,U,G,H,v,xe),H.side=xn):R.renderBufferDirect(Y,U,G,H,v,xe),v.onAfterRender(R,U,Y,G,H,xe)}function ea(v,U,Y){U.isScene!==!0&&(U=Nt);let G=k.get(v),H=E.state.lights,xe=E.state.shadowsArray,Se=H.state.version,ge=le.getParameters(v,H.state,xe,U,Y,E.state.lightProbeGridArray),be=le.getProgramCacheKey(ge),Re=G.programs;G.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;let He=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;G.envMap=oe.get(v.envMap||G.environment,He),G.envMapRotation=G.environment!==null&&v.envMap===null?U.environmentRotation:v.envMapRotation,Re===void 0&&(v.addEventListener("dispose",On),Re=new Map,G.programs=Re);let Ye=Re.get(be);if(Ye!==void 0){if(G.currentProgram===Ye&&G.lightsStateVersion===Se)return Eh(v,ge),Ye}else ge.uniforms=le.getUniforms(v),P!==null&&v.isNodeMaterial&&P.build(v,Y,ge),v.onBeforeCompile(ge,R),Ye=le.acquireProgram(ge,be),Re.set(be,Ye),G.uniforms=ge.uniforms;let we=G.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(we.clippingPlanes=ce.uniform),Eh(v,ge),G.needsLights=xf(v),G.lightsStateVersion=Se,G.needsLights&&(we.ambientLightColor.value=H.state.ambient,we.lightProbe.value=H.state.probe,we.sunLights.value=H.state.sun,we.sunLightShadows.value=H.state.sunShadow,we.directionalLights.value=H.state.directional,we.directionalLightShadows.value=H.state.directionalShadow,we.spotLights.value=H.state.spot,we.spotLightShadows.value=H.state.spotShadow,we.rectAreaLights.value=H.state.rectArea,we.ltc_1.value=H.state.rectAreaLTC1,we.ltc_2.value=H.state.rectAreaLTC2,we.pointLights.value=H.state.point,we.pointLightShadows.value=H.state.pointShadow,we.hemisphereLights.value=H.state.hemi,we.sunShadowMatrix.value=H.state.sunShadowMatrix,we.sunShadowCascade.value=H.state.sunShadowCascade,we.directionalShadowMatrix.value=H.state.directionalShadowMatrix,we.spotLightMatrix.value=H.state.spotLightMatrix,we.spotLightMap.value=H.state.spotLightMap,we.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Ye,G.uniformsList=null,Ye}function Th(v){if(v.uniformsList===null){let U=v.currentProgram.getUniforms();v.uniformsList=qs.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function Eh(v,U){let Y=k.get(v);Y.outputColorSpace=U.outputColorSpace,Y.batching=U.batching,Y.batchingColor=U.batchingColor,Y.instancing=U.instancing,Y.instancingColor=U.instancingColor,Y.instancingMorph=U.instancingMorph,Y.skinning=U.skinning,Y.morphTargets=U.morphTargets,Y.morphNormals=U.morphNormals,Y.morphColors=U.morphColors,Y.morphTargetsCount=U.morphTargetsCount,Y.numClippingPlanes=U.numClippingPlanes,Y.numIntersection=U.numClipIntersection,Y.vertexAlphas=U.vertexAlphas,Y.vertexTangents=U.vertexTangents,Y.toneMapping=U.toneMapping}function pf(v,U){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;S.setFromMatrixPosition(U.matrixWorld);for(let Y=0,G=v.length;Y<G;Y++){let H=v[Y];if(H.texture!==null&&H.boundingBox.containsPoint(S))return H}return null}function mf(v,U,Y,G,H){U.isScene!==!0&&(U=Nt),X.resetTextureUnits();let xe=U.fog,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,ge=te===null?R.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Je.workingColorSpace,be=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Re=oe.get(G.envMap||Se,be),He=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ye=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),we=!!Y.morphAttributes.position,nt=!!Y.morphAttributes.normal,Ct=!!Y.morphAttributes.color,gt=Pn;G.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(gt=R.toneMapping);let lt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Bt=lt!==void 0?lt.length:0,Me=k.get(G),qt=E.state.lights;if(Ge===!0&&(st===!0||v!==Q)){let ft=v===Q&&G.id===J;ce.setState(G,v,ft)}let Qe=!1;G.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==qt.state.version||Me.outputColorSpace!==ge||H.isBatchedMesh&&Me.batching===!1||!H.isBatchedMesh&&Me.batching===!0||H.isBatchedMesh&&Me.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Me.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Me.instancing===!1||!H.isInstancedMesh&&Me.instancing===!0||H.isSkinnedMesh&&Me.skinning===!1||!H.isSkinnedMesh&&Me.skinning===!0||H.isInstancedMesh&&Me.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Me.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Me.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Me.instancingMorph===!1&&H.morphTexture!==null||Me.envMap!==Re||G.fog===!0&&Me.fog!==xe||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ce.numPlanes||Me.numIntersection!==ce.numIntersection)||Me.vertexAlphas!==He||Me.vertexTangents!==Ye||Me.morphTargets!==we||Me.morphNormals!==nt||Me.morphColors!==Ct||Me.toneMapping!==gt||Me.morphTargetsCount!==Bt||!!Me.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Me.__version=G.version);let dn=Me.currentProgram;Qe===!0&&(dn=ea(G,U,H),P&&G.isNodeMaterial&&P.onUpdateProgram(G,dn,Me));let Bn=!1,di=!1,ts=!1,ot=dn.getUniforms(),Tt=Me.uniforms;if(g.useProgram(dn.program)&&(Bn=!0,di=!0,ts=!0),G.id!==J&&(J=G.id,di=!0),Me.needsLights){let ft=pf(E.state.lightProbeGridArray,H);Me.lightProbeGrid!==ft&&(Me.lightProbeGrid=ft,di=!0)}if(Bn||Q!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ot.setValue(O,"projectionMatrix",v.projectionMatrix),ot.setValue(O,"viewMatrix",v.matrixWorldInverse);let pi=ot.map.cameraPosition;pi!==void 0&&pi.setValue(O,et.setFromMatrixPosition(v.matrixWorld)),b.logarithmicDepthBuffer&&ot.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ot.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,di=!0,ts=!0)}if(Me.needsLights&&(qt.state.sunShadowMap.length>0&&ot.setValue(O,"sunShadowMap",qt.state.sunShadowMap,X),qt.state.directionalShadowMap.length>0&&ot.setValue(O,"directionalShadowMap",qt.state.directionalShadowMap,X),qt.state.spotShadowMap.length>0&&ot.setValue(O,"spotShadowMap",qt.state.spotShadowMap,X),qt.state.pointShadowMap.length>0&&ot.setValue(O,"pointShadowMap",qt.state.pointShadowMap,X)),H.isSkinnedMesh){ot.setOptional(O,H,"bindMatrix"),ot.setOptional(O,H,"bindMatrixInverse");let ft=H.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ot.setValue(O,"boneTexture",ft.boneTexture,X))}H.isBatchedMesh&&(ot.setOptional(O,H,"batchingTexture"),ot.setValue(O,"batchingTexture",H._matricesTexture,X),ot.setOptional(O,H,"batchingIdTexture"),ot.setValue(O,"batchingIdTexture",H._indirectTexture,X),ot.setOptional(O,H,"batchingColorTexture"),H._colorsTexture!==null&&ot.setValue(O,"batchingColorTexture",H._colorsTexture,X));let fi=Y.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&D.update(H,Y,dn),(di||Me.receiveShadow!==H.receiveShadow)&&(Me.receiveShadow=H.receiveShadow,ot.setValue(O,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Tt.envMapIntensity.value=U.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=s_()),di){if(ot.setValue(O,"toneMappingExposure",R.toneMappingExposure),Me.needsLights&&gf(Tt,ts),xe&&G.fog===!0&&Ae.refreshFogUniforms(Tt,xe),Ae.refreshMaterialUniforms(Tt,G,ne,K,E.state.transmissionRenderTarget[v.id]),Me.needsLights&&Me.lightProbeGrid){let ft=Me.lightProbeGrid;Tt.probesSH.value=ft.texture,Tt.probesMin.value.copy(ft.boundingBox.min),Tt.probesMax.value.copy(ft.boundingBox.max),Tt.probesResolution.value.copy(ft.resolution)}qs.upload(O,Th(Me),Tt,X)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(qs.upload(O,Th(Me),Tt,X),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ot.setValue(O,"center",H.center),ot.setValue(O,"modelViewMatrix",H.modelViewMatrix),ot.setValue(O,"normalMatrix",H.normalMatrix),ot.setValue(O,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){let ft=G.uniformsGroups;for(let pi=0,ns=ft.length;pi<ns;pi++){let Ch=ft[pi];re.update(Ch,dn),re.bind(Ch,dn)}}return dn}function gf(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.sunLights.needsUpdate=U,v.sunLightShadows.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function xf(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(v,U,Y){let G=k.get(v);G.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),k.get(v.texture).__webglTexture=U,k.get(v.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,U){let Y=k.get(v);Y.__webglFramebuffer=U,Y.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(v,U=0,Y=0){te=v,W=U,q=Y;let G=null,H=!1,xe=!1;if(v){let ge=k.get(v);if(ge.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(O.FRAMEBUFFER,ge.__webglFramebuffer),se.copy(v.viewport),Ie.copy(v.scissor),Ee=v.scissorTest,g.viewport(se),g.scissor(Ie),g.setScissorTest(Ee),J=-1;return}else if(ge.__webglFramebuffer===void 0)X.setupRenderTarget(v);else if(ge.__hasExternalTextures)X.rebindTextures(v,k.get(v.texture).__webglTexture,k.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let He=v.depthTexture;if(ge.__boundDepthTexture!==He){if(He!==null&&k.has(He)&&(v.width!==He.image.width||v.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(v)}}let be=v.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(xe=!0);let Re=k.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Re[U])?G=Re[U][Y]:G=Re[U],H=!0):v.samples>0&&X.useMultisampledRTT(v)===!1?G=k.get(v).__webglMultisampledFramebuffer:Array.isArray(Re)?G=Re[Y]:G=Re,se.copy(v.viewport),Ie.copy(v.scissor),Ee=v.scissorTest}else se.copy(ye).multiplyScalar(ne).floor(),Ie.copy(Ve).multiplyScalar(ne).floor(),Ee=ut;if(Y!==0&&(G=z),g.bindFramebuffer(O.FRAMEBUFFER,G)&&g.drawBuffers(v,G),g.viewport(se),g.scissor(Ie),g.setScissorTest(Ee),H){let ge=k.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,Y)}else if(xe){let ge=U;for(let be=0;be<v.textures.length;be++){let Re=k.get(v.textures[be]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+be,Re.__webglTexture,Y,ge)}}else if(v!==null&&Y!==0){let ge=k.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ge.__webglTexture,Y)}J=-1};function Ah(v){let U=k.get(v);return(U.__readFormat!==v.format||U.__readType!==v.type)&&(U.__readFormat=v.format,U.__readType=v.type,U.__formatReadable=b.textureFormatReadable(v.format),U.__typeReadable=b.textureTypeReadable(v.type)),U}this.readRenderTargetPixels=function(v,U,Y,G,H,xe,Se,ge=0){if(!(v&&v.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be){g.bindFramebuffer(O.FRAMEBUFFER,be);try{let Re=v.textures[ge],He=Re.format,Ye=Re.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);let we=Ah(Re);if(we.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-G&&Y>=0&&Y<=v.height-H&&O.readPixels(U,Y,G,H,fe.convert(He),fe.convert(Ye),xe)}finally{let Re=te!==null?k.get(te).__webglFramebuffer:null;g.bindFramebuffer(O.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(v,U,Y,G,H,xe,Se,ge=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be)if(U>=0&&U<=v.width-G&&Y>=0&&Y<=v.height-H){g.bindFramebuffer(O.FRAMEBUFFER,be);let Re=v.textures[ge],He=Re.format,Ye=Re.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);let we=Ah(Re);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,nt),O.bufferData(O.PIXEL_PACK_BUFFER,xe.byteLength,O.STREAM_READ),O.readPixels(U,Y,G,H,fe.convert(He),fe.convert(Ye),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Ct=te!==null?k.get(te).__webglFramebuffer:null;g.bindFramebuffer(O.FRAMEBUFFER,Ct);let gt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Xu(O,gt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,nt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xe),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(nt),O.deleteSync(gt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,U=null,Y=0){let G=Math.pow(2,-Y),H=Math.floor(v.image.width*G),xe=Math.floor(v.image.height*G),Se=U!==null?U.x:0,ge=U!==null?U.y:0;X.setTexture2D(v,0),O.copyTexSubImage2D(O.TEXTURE_2D,Y,0,0,Se,ge,H,xe),g.unbindTexture()},this.copyTextureToTexture=function(v,U,Y=null,G=null,H=0,xe=0){let Se,ge,be,Re,He,Ye,we,nt,Ct,gt=v.isCompressedTexture?v.mipmaps[xe]:v.image;if(Y!==null)Se=Y.max.x-Y.min.x,ge=Y.max.y-Y.min.y,be=Y.isBox3?Y.max.z-Y.min.z:1,Re=Y.min.x,He=Y.min.y,Ye=Y.isBox3?Y.min.z:0;else{let Tt=Math.pow(2,-H);Se=Math.floor(gt.width*Tt),ge=Math.floor(gt.height*Tt),v.isDataArrayTexture?be=gt.depth:v.isData3DTexture?be=Math.floor(gt.depth*Tt):be=1,Re=0,He=0,Ye=0}G!==null?(we=G.x,nt=G.y,Ct=G.z):(we=0,nt=0,Ct=0);let lt=fe.convert(U.format),Bt=fe.convert(U.type),Me;U.isData3DTexture?(X.setTexture3D(U,0),Me=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(X.setTexture2DArray(U,0),Me=O.TEXTURE_2D_ARRAY):(X.setTexture2D(U,0),Me=O.TEXTURE_2D),g.activeTexture(O.TEXTURE0),g.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),g.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),g.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);let qt=g.getParameter(O.UNPACK_ROW_LENGTH),Qe=g.getParameter(O.UNPACK_IMAGE_HEIGHT),dn=g.getParameter(O.UNPACK_SKIP_PIXELS),Bn=g.getParameter(O.UNPACK_SKIP_ROWS),di=g.getParameter(O.UNPACK_SKIP_IMAGES);g.pixelStorei(O.UNPACK_ROW_LENGTH,gt.width),g.pixelStorei(O.UNPACK_IMAGE_HEIGHT,gt.height),g.pixelStorei(O.UNPACK_SKIP_PIXELS,Re),g.pixelStorei(O.UNPACK_SKIP_ROWS,He),g.pixelStorei(O.UNPACK_SKIP_IMAGES,Ye);let ts=v.isDataArrayTexture||v.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(v.isDepthTexture){let Tt=k.get(v),fi=k.get(U),ft=k.get(Tt.__renderTarget),pi=k.get(fi.__renderTarget);g.bindFramebuffer(O.READ_FRAMEBUFFER,ft.__webglFramebuffer),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let ns=0;ns<be;ns++)ts&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,k.get(v).__webglTexture,H,Ye+ns),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,k.get(U).__webglTexture,xe,Ct+ns)),O.blitFramebuffer(Re,He,Se,ge,we,nt,Se,ge,O.DEPTH_BUFFER_BIT,O.NEAREST);g.bindFramebuffer(O.READ_FRAMEBUFFER,null),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||k.has(v)){let Tt=k.get(v),fi=k.get(U);g.bindFramebuffer(O.READ_FRAMEBUFFER,I),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,V);for(let ft=0;ft<be;ft++)ts?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Tt.__webglTexture,H,Ye+ft):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Tt.__webglTexture,H),ot?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fi.__webglTexture,xe,Ct+ft):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,fi.__webglTexture,xe),H!==0?O.blitFramebuffer(Re,He,Se,ge,we,nt,Se,ge,O.COLOR_BUFFER_BIT,O.NEAREST):ot?O.copyTexSubImage3D(Me,xe,we,nt,Ct+ft,Re,He,Se,ge):O.copyTexSubImage2D(Me,xe,we,nt,Re,He,Se,ge);g.bindFramebuffer(O.READ_FRAMEBUFFER,null),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ot?v.isDataTexture||v.isData3DTexture?O.texSubImage3D(Me,xe,we,nt,Ct,Se,ge,be,lt,Bt,gt.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Me,xe,we,nt,Ct,Se,ge,be,lt,gt.data):O.texSubImage3D(Me,xe,we,nt,Ct,Se,ge,be,lt,Bt,gt):v.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xe,we,nt,Se,ge,lt,Bt,gt.data):v.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xe,we,nt,gt.width,gt.height,lt,gt.data):O.texSubImage2D(O.TEXTURE_2D,xe,we,nt,Se,ge,lt,Bt,gt);g.pixelStorei(O.UNPACK_ROW_LENGTH,qt),g.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qe),g.pixelStorei(O.UNPACK_SKIP_PIXELS,dn),g.pixelStorei(O.UNPACK_SKIP_ROWS,Bn),g.pixelStorei(O.UNPACK_SKIP_IMAGES,di),xe===0&&U.generateMipmaps&&O.generateMipmap(Me),g.unbindTexture()},this.initRenderTarget=function(v){k.get(v).__webglFramebuffer===void 0&&X.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?X.setTextureCube(v,0):v.isData3DTexture?X.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?X.setTexture2DArray(v,0):X.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){W=0,q=0,te=null,g.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}};var r_=new Set(["cobble","flagstone","stone","stone_dark","moss","cracked","wet"]),a_=new Set(["stone","rough","cave","castle"]);function ll({surface:n,wall:e=!1,wallStyle:t,grass:i=!1,outdoor:s=!1,id:r},a,o){let l=(Math.imul(a,73856093)^Math.imul(o,19349663))>>>0;return e?!t||a_.has(t)?8+l%4:null:n&&!r_.has(n)||!n&&(i||s||r==="proc-tavern")?null:n==="moss"?l%2?3:5:n==="cracked"?[0,2,4,6][l%4]:[0,1,2,4,6,7][l%6]}function o_(n){let e=Math.floor(n/4),t=n%4,i=n<8?.015:.08,s=n<8?.015:.08,r=n<8?.97:.84,a=n<8?.97:.4;return{x:(t+i)/4,y:1-(e+s+a)/3,w:r/4,h:a/3}}function Ed(n=new Ar){let e=new Map,t,i=!1;function s(r,a){let o=t.clone(),l=o_(a);o.colorSpace=bt,o.wrapS=o.wrapT=pn,o.magFilter=It,o.minFilter=It,o.generateMipmaps=!1,o.offset.set(l.x,l.y),o.repeat.set(l.w,l.h),o.needsUpdate=!0,r.map=o,r.color.setHex(16777215),r.needsUpdate=!0}return r=>{if(!e.has(r)){let a=new Qt({color:r<8?7436155:11905683,roughness:1});e.set(r,a),t&&s(a,r)}return i||(i=!0,n.load("assets/terrain-materials.png",a=>{t=a;for(let[o,l]of e)s(l,o)},void 0,()=>{})),e.get(r)}}var l_=[[0,1],[1,0],[0,-1],[-1,0]];function c_(n){let e=2166136261;for(let t of String(n))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}function Ad(n,e,t=""){if(Number.isInteger(e.facing)&&e.facing>=0&&e.facing<4)return e.facing;let i=n.props.filter(o=>o.type==="npc").slice().sort((o,l)=>o.id<l.id?-1:o.id>l.id?1:0),s=Math.max(0,i.findIndex(o=>o.id===e.id)),r=(c_(t+":"+n.id)+s)%4;return l_.map(([o,l],c)=>({i:c,x:e.x+o,y:e.y+l})).filter(o=>n.tiles[o.y]?.[o.x]==="floor"&&!n.props.some(l=>l.x===o.x&&l.y===o.y&&l.solid!==!1)).sort((o,l)=>(o.i-r+4)%4-(l.i-r+4)%4)[0]?.i??r}function Cd(n,e){let t=e.x-n.x,i=e.y-n.y;return Math.abs(t)>Math.abs(i)?t>0?1:3:i<0?2:0}function Rd(n,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),i=new Map,s=new Map;for(let c of n){let u=[];c.updateWorldMatrix(!0,!0),c.traverse(d=>{if(!d.isMesh||Array.isArray(d.material))return;let h=!!d.userData.decal,p=d.material,x=d.geometry.type+JSON.stringify(d.geometry.parameters||{})+":"+(h?"decal":p.uuid)+":"+d.castShadow+":"+d.receiveShadow;i.has(x)||i.set(x,{geometry:d.geometry,material:p,decal:h,cast:d.castShadow,receive:d.receiveShadow,entries:[]});let m=i.get(x),f=new We;for(let M=0;M<(d.isInstancedMesh?d.count:1);M++){d.isInstancedMesh?d.getMatrixAt(M,f):f.identity();let C=new Le(16777215);h&&d.instanceColor&&d.getColorAt(M,C);let S={root:c,source:d,local:f.clone(),color:C,index:m.entries.length};u.push(S),m.entries.push(S)}d.layers.set(1)}),s.set(c,u),c.userData.staticBatched=!0}let r=[];for(let c of i.values()){let u=c.decal?new Qt({color:16777215,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}):c.material,d=new ln(c.geometry,u,c.entries.length);d.castShadow=c.cast,d.receiveShadow=c.receive,d.frustumCulled=!1,d.userData.staticBatch=!0,d.userData.decal=c.decal,d.userData.disposeMaterial=c.decal;for(let h of c.entries)h.batch=d,c.decal&&d.setColorAt(h.index,h.color);d.instanceColor&&(d.instanceColor.needsUpdate=!0),e.add(d),r.push(d)}let a=new We,o=new We().makeScale(0,0,0);function l(c){c.updateWorldMatrix(!0,!0);for(let u of s.get(c)||[]){let d=!0;for(let h=u.source;h&&h!==e;h=h.parent)d&&=h.visible;a.copy(t).multiply(u.source.matrixWorld).multiply(u.local),u.batch.setMatrixAt(u.index,d?a:o),u.batch.instanceMatrix.needsUpdate=!0}}for(let c of n)l(c);return{meshes:r,roots:n,update:l,sourceMeshes:n.reduce((c,u)=>(u.traverse(d=>{d.isMesh&&c++}),c),0)}}function cl(n,e,t=.8,i=1.14){e.updateWorldMatrix(!0,!0),n.updateMatrixWorld(!0);let s=new on().setFromObject(e);if(s.isEmpty())return;let r=new on;for(let c of[s.min.x,s.max.x])for(let u of[s.min.y,s.max.y])for(let d of[s.min.z,s.max.z])r.expandByPoint(new B(c,u,d).applyMatrix4(n.matrixWorldInverse));let a=r.getCenter(new B),o=r.getSize(new B),l=Math.max(o.y,o.x/t,.1)*i;n.left=a.x-l*t/2,n.right=a.x+l*t/2,n.top=a.y+l/2,n.bottom=a.y-l/2,n.near=Math.max(.01,-r.max.z-1),n.far=Math.max(n.near+1,-r.min.z+1),n.updateProjectionMatrix()}function Id({figure:n,propModel:e,shadedBox:t,compact:i,terrainMaterial:s}){let r=new En;r.background=new Le("#26201a");let a=new hn(-4,4,8,-8,.1,60),o=new Ke;r.add(o);let l=new Ke,c=[],u=[],d=[],h=[8157814,8881278,7368297,9210241,7960176];for(let Z=0;Z<15;Z++)for(let ie=-5;ie<=5;ie++){let b=ie*.84+Z%2*.42;t(l,b,Z*.47+.24,-4.5,.81,.44,.38,h[(ie+Z*3+25)%h.length])}for(let Z=0;Z<15;Z++)for(let ie=0;ie<16;ie++)t(l,-4.65,Z*.47+.24,-4.4+ie*.82+Z%2*.41,.38,.44,.79,h[(ie+Z*3)%h.length]);let p=new gn(.487,.06,.487),_=[8675391,7557686,9463623,8345402,7950905],x=_.map(()=>[]);for(let Z=-12;Z<=12;Z++)for(let ie=-10;ie<=24;ie++){let b=(Z*7+ie*3+160)%5;x[b].push([Z*.5,-.044,ie*.5])}for(let Z=0;Z<5;Z++){let ie=new ln(p,s(_[Z],1),x[Z].length),b=new We;x[Z].forEach((g,L)=>{b.makeTranslation(...g),ie.setMatrixAt(L,b)}),ie.receiveShadow=!0,o.add(ie)}for(let Z of[-4.35,-1.5,2.4,4.4])t(l,Z,1.68,-4.24,.16,3.36,.2,4205856),t(l,Z,.18,-4.16,.25,.34,.3,3155228);for(let Z of[.5,2.7,3.27])t(l,0,Z,-4.21,9,.16,.22,4731170);o.add(i(l));let m=(Z,ie,b,g=0,L=Z)=>{let k=e({type:Z,id:L});return k.position.set(ie,0,b),k.rotation.y=g,o.add(k),c.push(k),k},f=(Z,ie,b,g,L,k,X,oe)=>t(Z,ie,b,g,L,k,X,oe),M=(Z,ie,b,g)=>{let L=new Ke;L.position.set(ie,b,g),Z.add(L),f(L,0,.02,0,.16,.035,.16,7754034),f(L,0,.12,0,.07,.18,.07,15783072);let k=new Ke;return k.position.y=.25,L.add(k),t(k,0,0,0,.065,.13,.065,16754222,!0),t(k,0,-.015,.002,.037,.08,.04,16768898,!0),d.push({m:k,phase:d.length*.8}),L};function C(Z,ie){let b=new Ke;b.position.set(Z,0,ie),o.add(b);for(let g of[-.67,.67])f(b,g,1.2,0,.09,2.4,.38,5519651);for(let g=0;g<4;g++){let L=.36+g*.48;f(b,0,L,.04,1.46,.075,.48,7359020);for(let k=0;k<6;k++){let X=-.55+k*.22,oe=[4875858,7756085,8676424,3562068,9664075,6698798][(k+g)%6],ae=.19+k%3*.035;f(b,X,L+ae/2+.06,.05,.12,ae,.12,oe),f(b,X,L+ae+.07,.05,.055,.075,.06,oe),f(b,X,L+ae+.11,.05,.065,.022,.065,11701077)}}i(b)}C(-3.3,-4.02),C(-1.73,-4.02);for(let Z=-3.55;Z<0;Z+=.96)m("counter",Z,-2.55);m("barrel",-4,-3.35),m("chair",-2.8,-1.55,Math.PI);let S=(Z,ie)=>{let b=new Ke;b.position.set(Z,0,ie),o.add(b);for(let g of[-.58,.58])for(let L of[-.39,.39])f(b,g,.32,L,.12,.64,.12,6504741);for(let g=0;g<4;g++)f(b,-.57+g*.38,.73,0,.37,.12,1.05,[9132850,8540974,9987896,8870191][g]);return f(b,0,.39,.22,1.3,.09,.07,5255967),f(b,.25,.87,-.24,.13,.18,.13,8277546),f(b,.25,.966,-.24,.11,.015,.11,12232575),f(b,-.35,.845,.15,.27,.1,.2,10254410),i(b),M(b,-.47,.79,-.24),b};S(.5,-.15),m("chair",.36,-1.13,0),m("chair",1.52,-.13,-Math.PI/2),S(.2,3.55),m("chair",.15,2.6,0),m("chair",1.23,3.55,-Math.PI/2);let T=new Ke;T.position.set(.85,0,-3.75),o.add(T);for(let Z of[-.65,.65])for(let ie=0;ie<4;ie++)f(T,Z,.27+ie*.38,0,.4,.36,.8,h[ie]);f(T,0,.09,.25,1.78,.17,1.32,6446677),f(T,0,1.64,0,1.77,.27,1.03,7367519);for(let Z=0;Z<6;Z++)for(let ie=0;ie<2;ie++)f(T,(ie-.5)*.65,1.88+Z*.22,-.1,.63,.2,.69,h[(Z+ie)%5]);f(T,0,.83,-.38,.95,1.18,.07,1577742);for(let Z of[-.22,.18]){let ie=f(T,Z,.27,.26,.68,.13,.15,4796445);ie.rotation.y=Z*2}i(T);let E=new Ke;E.position.set(.85,.4,-3.48),o.add(E);for(let Z=0;Z<4;Z++){let ie=new Ke;ie.position.set((Z-1.5)*.17,0,0),E.add(ie),t(ie,0,.1,0,.19,.33,.12,15763233,!0),t(ie,0,.06,.025,.095,.22,.1,16765798,!0),d.push({m:ie,phase:Z*1.5})}for(let[Z,ie]of[[-4.39,-2.1],[.65,-4.18]]){let b=m("torch",Z,ie);b.position.y=1.25}let A=new Ke;A.position.set(-.18,0,-.85),o.add(A),f(A,0,2.75,0,.028,.75,.028,5325620),f(A,0,2.36,0,.82,.075,.65,7358251);for(let Z of[-.31,.31])for(let ie of[-.23,.23])M(A,Z,2.4,ie);i(A),M(o,-3.5,.81,-2.45);let y=document.createElement("canvas");y.width=256,y.height=384;let w=y.getContext("2d");w.fillStyle="#6e2026",w.fillRect(0,0,256,384),w.strokeStyle="#b18c4a",w.lineWidth=7,w.strokeRect(14,14,228,356),w.lineWidth=3,w.strokeRect(26,26,204,332);for(let Z=47;Z<360;Z+=32)for(let ie=44;ie<230;ie+=34)w.fillStyle=(ie+Z)%3?"#b18a43":"#8a3f32",w.fillRect(ie,Z,9,5);w.save(),w.translate(128,192),w.rotate(Math.PI/4),w.strokeStyle="#b79850",w.lineWidth=6,w.strokeRect(-43,-43,86,86),w.strokeRect(-27,-27,54,54),w.restore();let R=new Hn(y);R.magFilter=vt,R.colorSpace=bt;let F=new je(new In(3.15,5.2),new Qt({map:R,roughness:1}));F.rotation.x=-Math.PI/2,F.position.set(-1.9,.006,1),F.receiveShadow=!0,o.add(F);let P=(Z,ie,b,g,L=!1,k,X={})=>{let oe={kind:Z,npcId:k,hands:["empty","empty"]};k||(oe.appearance={...window.Characters.defaultLook({0:"rogue",1:"wizard",2:"fighter",5:"cleric"}[Z],"male"),...X});let ae=n(Z,oe,{articulated:!0,base:!1});ae.position.set(ie,L?.2:0,b),ae.rotation.y=g,ae.scale.setScalar(1.08),r.add(ae);let $=ae.userData.rig;L&&($.legL.rotation.x=$.legR.rotation.x=-1.05);let j=new Ke;return t(j,0,0,0,.105,.12,.105,8805685),t(j,.062,.01,0,.04,.07,.025,11305040),j.position.set(.31,.53,.23),ae.add(j),u.push({m:ae,rig:$,mug:j,phase:u.length*3.4,seated:L,baseY:ae.position.y}),ae};P(5,-2.2,-3.1,.3,!1,"innkeeper"),P(2,.36,-1.13,.25,!0,void 0,{hair:"#593321",hairStyle:"short"}),P(0,1.52,-.13,-Math.PI/2,!0,void 0,{hair:"#392c22",cloth:"#6b674c"}),P(1,.15,2.6,.25,!0,void 0,{headgear:"none",hair:"#c7c4bf",beard:"none",cloth:"#385168",hairStyle:"short"});let z=new ri(15196629,4797992,.8);r.add(z);let I=new oi(16772309,2.1);I.position.set(-2,7,5),I.castShadow=!0,I.shadow.mapSize.set(1024,1024),I.shadow.camera.left=-8,I.shadow.camera.right=8,I.shadow.camera.top=8,I.shadow.camera.bottom=-8,I.shadow.normalBias=.02,r.add(I);let V=new ai(16747815,7,8,1.7);V.position.set(.85,.9,-3.03),r.add(V);let W=new ai(16758616,5,8,1.5);W.position.set(-1,2.3,-1.8),r.add(W);let q=new Pr(12,12,13480059,9990731);q.position.y=.018,q.material.transparent=!0,q.material.opacity=.16,r.add(q);let te=new Float32Array(36),J=new Et;J.setAttribute("position",new Vt(te,3));let Q=new br(J,new Ns({color:16766081,size:.035,transparent:!0,opacity:.8,depthWrite:!1}));r.add(Q);let se=document.createElement("canvas");se.width=se.height=32;let Ie=se.getContext("2d"),Ee=Ie.createRadialGradient(16,16,0,16,16,16);Ee.addColorStop(0,"rgba(130,119,100,.09)"),Ee.addColorStop(1,"rgba(130,119,100,0)"),Ie.fillStyle=Ee,Ie.fillRect(0,0,32,32);let at=new Ps({map:new Hn(se),transparent:!0,depthWrite:!1}),Ze=Array.from({length:3},()=>{let Z=new Mr(at);return r.add(Z),Z}),qe=new En,K=new hn(-1,1,1,-1,.1,20);qe.add(new ri(16773071,6903910,2));let ne=new oi(16777215,2.2);ne.position.set(-2,4,5),qe.add(ne);let pe=null,De=null,ye="",Ve=0,ut=.22,Be=0,Ge=null,st=0,ze=0,et=0;function wt(Z){Z&&(qe.remove(Z),Z.traverse(ie=>{if(ie.isInstancedMesh&&ie.dispose(),ie.userData.menuMaterials)for(let b of ie.userData.menuMaterials)b.dispose()}))}function Nt(Z,ie){Z?.traverse(b=>{if(b.isMesh){if(!b.userData.menuMaterials){let g=Array.isArray(b.material)?b.material:[b.material];b.userData.menuMaterials=g.map(L=>L.clone()),b.material=Array.isArray(b.material)?b.userData.menuMaterials:b.userData.menuMaterials[0]}for(let g of b.userData.menuMaterials)g.transparent=ie<1,g.opacity=ie,g.depthWrite=ie>=.99}})}function mt(Z){let ie=JSON.stringify([Z.kind,Z.classId,Z.appearance,Z.hands]);ie!==ye&&(wt(De),De=pe,pe=n(Z.kind,Z,{articulated:!0,base:!1}),qe.add(pe),ye=ie,Ve=ze,Nt(pe,0))}function St(Z){!Z||Z.dataset.liveRotation||(Z.dataset.liveRotation="true",Z.style.touchAction="pan-y",Z.onpointerdown=ie=>{Ge={x:ie.clientX,time:performance.now()},Be=0,Z.setPointerCapture(ie.pointerId)},Z.onpointermove=ie=>{if(!Ge)return;let b=performance.now(),g=(ie.clientX-Ge.x)*.012*(window.CinematicMenu.controls?.sensitivity||1);ut+=g,Be=un.clamp(g/Math.max(.008,(b-Ge.time)/1e3),-4,4),Ge={x:ie.clientX,time:b}},Z.onpointerup=Z.onpointercancel=()=>{Ge=null},Z.onclick=null)}function O(Z,ie,b,g){let L=Math.min(.05,Math.max(0,(ie-st)/1e3));st=ie;let k=b.animations&&!matchMedia("(prefers-reduced-motion: reduce)").matches;k&&(ze+=L);let X=ze,oe=Z.domElement.clientWidth,ae=Z.domElement.clientHeight;et=k?et+(+!!g-et)*Math.min(1,L*3):+!!g;let $=oe>650?5.3:3.65;a.left=-$,a.right=$,a.top=$*ae/oe,a.bottom=-$*ae/oe,a.position.set(7+Math.sin(X*.07)*.065-et*.2,10.8+Math.sin(X*.09)*.035,14-et*.3),a.lookAt(-.05,0,1.25),a.updateProjectionMatrix(),z.intensity=.4+b.ambient*1.8,I.intensity=b.lights?1.7:.65,V.intensity=b.lights?b.intensity*(6+Math.sin(X*8)*.18+Math.sin(X*17)*.1):0,W.intensity=b.lights?b.intensity*(4.3+Math.sin(X*5)*.1):0,q.visible=b.grid;for(let ce of c)for(let ve of ce.userData.flames||[])ve.userData.menuRestScaleY??=ve.scale.y,ve.scale.y=ve.userData.menuRestScaleY*(1+Math.sin(X*8+ve.position.x*4)*.08);for(let ce of d)ce.m.scale.y=1+Math.sin(X*8+ce.phase)*.09;for(let ce of u){let ve=X+ce.phase,Ue=ve%18,D=Ue>9&&Ue<14?Math.sin((Ue-9)/5*Math.PI):0;ce.m.position.y=ce.baseY+Math.sin(ve*1.4)*.008,ce.rig.torso.scale.y=1+Math.sin(ve*1.4)*.009,ce.rig.head.rotation.y=Math.sin(ve*.33)*.1,ce.rig.armR.rotation.x=-D*1.5,ce.rig.armR.rotation.z=-D*.25,ce.mug.position.set(.31-D*.11,.53+D*.42,.23-D*.16),ce.mug.rotation.x=-D*.4}for(let ce=0;ce<12;ce++){let ve=(X*.17+ce*.618)%1;te[ce*3]=.85+Math.sin(ce*4.2+ve*3)*.17,te[ce*3+1]=ve<.16?.25+ve*5:-100,te[ce*3+2]=-3.4+Math.sin(ce*2.1)*.12}if(Q.visible=k&&b.lights,J.attributes.position.needsUpdate=!0,Ze.forEach((ce,ve)=>{let Ue=(X*.07+ve*.2)%1;ce.position.set(.85+Math.sin(Ue*5)*.1,.8+Ue*1.4,-3.4),ce.scale.setScalar(.3+Ue*.45),ce.visible=b.lights}),Z.shadowMap.needsUpdate=k&&ie-(O.lastShadow||0)>120,Z.shadowMap.needsUpdate&&(O.lastShadow=ie),Z.setViewport(0,0,oe,ae),Z.setScissorTest(!1),Z.autoClear=!0,Z.render(r,a),!g?.actor||!g.anchor?.isConnected)return;mt(g.actor),St(g.anchor),Ge||(k&&window.CinematicMenu.controls?.inertia!==!1?(ut+=Be*L,Be*=Math.exp(-L*6)):Be=0),pe.rotation.y=ut,pe.position.y=Math.sin(X*1.6)*.008,pe.userData.rig.head.rotation.y=Math.sin(X*.55)*.025,pe.userData.rig.armR.rotation.z=Math.sin(X*1.2)*.025;let j=k?Math.min(1,(ze-Ve)/.22):1;Nt(pe,j),De&&(De.rotation.y=ut,Nt(De,1-j),j===1&&(wt(De),De=null));let le=g.anchor.getBoundingClientRect(),Ae=Z.domElement.getBoundingClientRect(),ue=le.left-Ae.left,he=ae-(le.bottom-Ae.top);le.width<1||le.height<1||(K.position.set(0,1.15,4),K.lookAt(0,.64,0),cl(K,pe,le.width/le.height,1.15),Z.setViewport(ue,he,le.width,le.height),Z.setScissor(Math.max(0,ue),Math.max(0,he),le.width,Math.min(le.height,ae-he)),Z.setScissorTest(!0),Z.autoClear=!1,Z.clearDepth(),Z.render(qe,K),Z.autoClear=!0,Z.setScissorTest(!1),Z.setViewport(0,0,oe,ae))}return{render:O,turn:Z=>{ut+=Z,Be=0},get debug(){return{clock:ze,rotation:ut,velocity:Be,camera:[...a.position],patrons:u.map(Z=>({head:Z.rig.head.rotation.y,arm:Z.rig.armR.rotation.x})),drawCalls:r.children.length}}}}var Ri={size:.058,decalDepth:.008,minW:.09,minH:.09,minD:.05};function nn(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),s=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|s}function Yn(n,e){if(e<=1)return nn(n,e);let t=Math.min(1,(e-1)*.9),i=n>>16&255,s=n>>8&255,r=n&255;return Math.round(i+(255-i)*t)<<16|Math.round(s+(255-s)*t)<<8|Math.round(r+(255-r)*t)}function h_(n){let e=n|0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Pd={skin:{hi:1.06,lo:.9,amp:.045,noise:2},hair:{hi:1.18,lo:.8,amp:.11,strands:!0},metal:{hi:1.22,lo:.76,amp:.1,glint:!0},cloth:{hi:1.12,lo:.82,amp:.08,pleats:!0},other:{hi:1.1,lo:.84,amp:.07}};function Ji(n,e=()=>"other",t=Ri.size,{minDepth:i=Ri.minD}={}){let s=[],r=Ri.decalDepth;function a(o,l){let c=o[8]==="f"?2:1,u=c===2?[0,1]:[0,2],d=o[c]-o[c+3]/2,h=[o];n.forEach((p,_)=>{if(_===l||p.length>8)return;let x=p[c]-p[c+3]/2,m=p[c]+p[c+3]/2;if(x>=d+r-1e-8||m<d-1e-8||Math.abs(m-d)<1e-8&&_<l)return;let[f,M]=u,C=p[f]-p[f+3]/2,S=p[f]+p[f+3]/2,T=p[M]-p[M+3]/2,E=p[M]+p[M+3]/2;h=h.flatMap(A=>{let y=A[f]-A[f+3]/2,w=A[f]+A[f+3]/2,R=A[M]-A[M+3]/2,F=A[M]+A[M+3]/2,P=Math.max(y,C),z=Math.min(w,S),I=Math.max(R,T),V=Math.min(F,E);return z-P<1e-8||V-I<1e-8?[A]:[[y,P,R,F],[z,w,R,F],[P,z,R,I],[P,z,V,F]].filter(([W,q,te,J])=>q-W>1e-8&&J-te>1e-8).map(([W,q,te,J])=>{let Q=[...A];return Q[f]=(W+q)/2,Q[f+3]=q-W,Q[M]=(te+J)/2,Q[M+3]=J-te,Q})})}),s.push(...h)}return n.forEach((o,l)=>{if(o.length>8||o[7])return;let[c,u,d,h,p,_,x]=o;if(h<Ri.minW||p<Ri.minH||_<i)return;let m=Pd[e(x)]||Pd.other,f=Math.max(1,Math.round(h/t)),M=Math.max(1,Math.round(p/t)),C=h/f,S=p/M,T=d+_/2+r/2,E=d+_/2+1e-4,A=h_(Math.round(c*997)*31+Math.round(u*991)*17+Math.round(d*983)*13+(x&65535)+l*7),y=Array.from({length:M},()=>Array(f).fill(null)),w=(P,z,I,V=1,W=1)=>{if(I!==x)for(let q=z;q<Math.min(M,z+W);q++)for(let te=P;te<Math.min(f,P+V);te++)y[q][te]=I};M>=3&&(w(0,0,Yn(x,m.hi),f),w(0,M-1,Yn(x,m.lo),f)),f>=4&&M>=4&&h>=.2&&(w(0,1,Yn(x,1+(m.hi-1)*.5),1,M-2),w(f-1,1,Yn(x,1-(1-m.lo)*.6),1,M-2));let R=Math.min(m.noise??3,Math.floor(f*M/8)),F=new Set;for(let P=0;P<R;P++){let z=f>2?1+Math.floor(A()*(f-2)):Math.floor(A()*f),I=M>2?1+Math.floor(A()*(M-2)):Math.floor(A()*M),V=z*64+I,W=(A()<.5?-1:1)*m.amp*(.55+A()*.6);Math.abs(W)<.04&&(W=W<0?-.04:.04),F.has(V)||(F.add(V),w(z,I,Yn(x,1+W)))}if(m.strands&&f>=3&&M>=3){for(let P=0;P<2;P++)w(1+Math.floor(A()*(f-2||1)),1,Yn(x,.86),1,Math.max(1,Math.min(M-2,2+Math.floor(A()*(M-2)))));w(Math.floor(A()*f),1,Yn(x,m.hi))}if(m.pleats&&p>=.2&&h>=.2&&M>=4)for(let P of[Math.round(f/3),Math.round(f*2/3)])P>0&&P<f&&w(P,1,Yn(x,.9),1,M-2);m.glint&&f>=2&&M>=2&&w(Math.min(1,f-1),Math.min(1,M-1),Yn(x,1.36));for(let P=0;P<M;P++)for(let z=0;z<f;z++){let I=y[P][z];if(I===null)continue;let V=1,W=1;for(;z+V<f&&y[P][z+V]===I;)V++;for(;P+W<M&&y[P+W].slice(z,z+V).every(q=>q===I);)W++;for(let q=P;q<P+W;q++)y[q].fill(null,z,z+V);a([c-h/2+(z+V/2)*C,u+p/2-(P+W/2)*S,T,V*C,W*S,r,I,!1,"f",E],l)}if(h>=.18&&_>=.15){let P=Math.max(1,Math.round(_/t)),z=_/P,I=new Map;for(let V=0;V<2;V++){let W=(A()<.5?-1:1)*m.amp*(.6+A()*.5);Math.abs(W)<.04&&(W=W<0?-.04:.04);let q=Math.floor(A()*f),te=Math.floor(A()*P);I.set(te*f+q,[c-h/2+(q+.5)*C,u+p/2+r/2,d-_/2+(te+.5)*z,C,r,z,Yn(x,1+W),!1,"t",E])}for(let V of I.values())a(V,l)}}),s}function Ld(n,e,t,i,s){i.fill(0);let r=0,a=0,o=l=>{i[l]||n[l*4]>=128||(i[l]=1,s[a++]=l)};for(let l=0;l<e;l++)o(l),o((t-1)*e+l);for(let l=0;l<t;l++)o(l*e),o(l*e+e-1);for(;r<a;){let l=s[r++],c=l%e;c&&o(l-1),c<e-1&&o(l+1),l>=e&&o(l-e),l<e*(t-1)&&o(l+e)}for(let l=0;l<e*t;l++){let c=i[l]?0:255;n[l*4]=n[l*4+1]=n[l*4+2]=c,n[l*4+3]=255}}var u_="approved-voxel-v4";var Dd={fighter:{cloth:"#315e84",trim:"#c6a04f",hair:"#75462e",skin:"#efbc88"},wizard:{cloth:"#62377e",trim:"#c6a04f",hair:"#c9c6d7",skin:"#efbc88"},rogue:{cloth:"#487844",trim:"#c6a04f",hair:"#352b32",skin:"#efbc88"},cleric:{cloth:"#8b3d46",trim:"#c6a04f",hair:"#734c32",skin:"#efbc88"},skeleton:{cloth:"#813a36",trim:"#c6a04f",hair:"#352b32",skin:"#d9c9a5"},dummy:{cloth:"#936c40",trim:"#c6a04f",hair:"#936c40",skin:"#936c40"}},Nd=Object.freeze({keeper:Object.freeze({name:"\u042D\u043B\u043B\u0435\u043D",role:"\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430",classId:"cleric",appearance:Object.freeze({gender:"female",hair:"#c9c6d7",hairStyle:"long",face:"soft"}),hood:!0,hands:Object.freeze(["empty","empty"])}),novice:Object.freeze({name:"\u041B\u0438\u043D",role:"\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A",classId:"cleric",appearance:Object.freeze({gender:"male",hair:"#75462e",hairStyle:"short",face:"soft"}),hood:!1,hands:Object.freeze(["empty","empty"])})}),Ud={ellen:"keeper",lin:"novice"};function d_(n){let e=Object.hasOwn(Ud,n)?Ud[n]:n;if(!Object.hasOwn(Nd,e))throw new Error("NPC must be registered in NPCS: "+n);return Nd[e]}function ih(n={},e=n.kind||0){let t=n.npcId||(n.type==="npc"?n.id:null),i=t?d_(t):null,s=i?.classId||(n.classId&&Object.hasOwn(Dd,n.classId)?n.classId:["rogue","wizard","fighter","skeleton","dummy","cleric"][e]||"cleric"),r=i?.appearance||n.appearance||{},a=Dd[s],o=["male","female"].includes(r.gender)?r.gender:!n.appearance&&e===1?"female":"male",l=(c,u)=>/^#[a-f0-9]{6}$/i.test(c||"")?c:u;return{style:u_,role:s,gender:o,skin:l(r.skin,a.skin),hair:l(r.hair,o==="female"&&s==="cleric"?"#c9c6d7":o==="female"&&s==="fighter"?"#d7a652":a.hair),cloth:l(r.cloth,a.cloth),trim:l(r.trim,a.trim),hairStyle:["short","long","bald"].includes(r.hairStyle)?r.hairStyle:s==="cleric"&&!i&&o==="male"?"bald":o==="female"&&s!=="rogue"?"long":"short",face:["soft","stern","beard"].includes(r.face)?r.face:s==="cleric"&&!i&&o==="male"?"beard":"soft",hood:i?i.hood:s==="cleric"&&o==="female",hands:i?.hands||n.hands||(s==="fighter"||s==="skeleton"?["sword","shield"]:s==="wizard"||s==="cleric"?["staff","empty"]:["sword","empty"])}}function ct(n,e){let t=parseInt(n.slice(1),16);return"#"+[t>>16,t>>8&255,t&255].map(i=>Math.min(255,Math.max(0,i+e)).toString(16).padStart(2,"0")).join("")}function hl(n={},e=n.kind||0){let t=ih(n,e),i=[],s="body",r=(x,m,f,M,C,S,T,E=0)=>{let A=["head","hair","beard","hood"].includes(s),y=A?1.24:1.2,w=A?1.1:s==="equipment"?.84:.76,R=A?1.2:1.12;i.push({x:x*y,y:A?.7494+(m-.945)*w:.13+(m-.13)*w,z:f*R,w:M*y,h:C*w,d:S*R,color:T,rz:E,section:s})},a=t.gender==="female",o=t.cloth,l=t.trim,c="#573b29",u="#9caeb9",d=t.skin,h=ct(o,17),p=ct(o,-20),_=a?.31:.36;if(t.role==="dummy")return s="equipment",r(0,.6,0,.1,.95,.1,c),r(0,.85,0,.65,.09,.1,"#a4814b"),r(0,1.15,0,.39,.38,.34,"#b8955e"),r(0,1.15,.18,.28,.26,.015,"#843d32"),r(0,1.15,.196,.14,.13,.02,l),{profile:t,parts:i};for(let x of[-.115,.115])r(x,.22,.025,.17,.15,.26,c),r(x,.29,.035,.18,.05,.23,ct(c,13)),r(x,.405,0,.145,.22,.18,"#343139"),r(x,.335,.109,.145,.04,.025,l),r(x,.22,.16,.15,.07,.025,ct(c,-14));r(0,.715,0,_,.37,.26,o),r(0,.665,.139,_,.22,.018,p),r(0,.87,.14,_,.045,.025,h),r(0,.535,0,_+.045,.055,.295,c),r(0,.535,.165,.09,.08,.04,l),r(0,.535,.189,.043,.035,.014,c);for(let x of[-(_/2+.065),_/2+.065])r(x,.79,0,.13,.19,.21,o,x<0?-.13:.13),r(x,.644,.035,.105,.12,.15,c),r(x,.57,.05,.102,.09,.115,d),r(x,.715,.11,.13,.035,.028,l),r(x,.643,.12,.105,.025,.035,ct(c,18));if(t.role==="fighter"){r(0,.74,.16,_+.01,.27,.07,p),r(0,.75,.202,_-.035,.18,.025,h),r(0,.865,.193,_+.025,.045,.035,l),r(0,.674,.202,_,.04,.03,l);for(let x of[-.25,.25])r(x,.9,0,.22,.13,.285,o),r(x,.923,.02,.17,.045,.25,h),r(x,.858,.139,.205,.035,.025,l),r(x,.75,.121,.12,.11,.04,u),r(x,.717,.151,.12,.026,.02,"#c8d0d2");for(let x of[-.135,.135])r(x,.458,.045,.165,.11,.27,o),r(x,.422,.185,.165,.035,.02,l),r(x,.47,.195,.07,.07,.012,h);r(0,.765,.225,.035,.11,.015,l),r(0,.485,.162,.075,.05,.018,"#c5a165")}else if(t.role==="wizard"){for(let x of[-.11,.11])r(x,.457,0,.13,a?.3:.22,.31,o),r(x,.34,.166,.13,.035,.025,l),r(x,.65,.152,.028,.31,.025,l),r(x,.47,.171,.045,.1,.02,h);r(0,.73,.148,.09,.3,.028,"#343139"),r(0,.871,.173,.05,.055,.03,l),r(0,.873,.196,.022,.022,.017,"#63c6ed");for(let x of[-.17,.17])r(x,.874,.16,.07,.12,.09,h,x<0?-.22:.22)}else if(t.role==="rogue"){r(0,.715,.165,_-.015,.285,.045,c),r(-.065,.7,.194,.13,.22,.018,ct(c,13)),r(.09,.7,.195,.1,.22,.02,ct(c,-10)),r(0,.75,-.17,.42,.38,.065,p),r(0,.92,.02,.45,.09,.35,h),r(-.17,.846,.129,.2,.07,.07,o,-.3),r(.12,.837,.152,.27,.07,.07,o,.22),r(0,.859,.196,.08,.06,.024,l),r(-.1,.725,.175,.05,.28,.035,c,-.6),r(.085,.639,.175,.09,.07,.03,c,-.6);for(let x of[-.16,.16])r(x,.496,.182,.1,.115,.06,c),r(x,.529,.218,.1,.035,.025,ct(c,17)),r(x,.509,.235,.025,.026,.014,l);for(let x of[-.17,.17])r(x,.428,-.04,.075,.15,.27,o)}else if(t.role==="cleric"){for(let x of[-.13,.13])r(x,.452,0,.16,.3,.3,o),r(x,.316,.173,.16,.035,.025,"#dfcea6"),r(x,.7,.163,.036,.3,.025,"#dfcea6");r(0,.7,.168,.1,.3,.028,"#4d7541");for(let x of[-.14,.14])r(x,.904,.02,.2,.075,.32,"#dfcea6",x<0?-.18:.18);r(0,.857,.176,.038,.14,.035,l),r(0,.875,.18,.105,.032,.035,l);for(let x of[-.235,.235])r(x,.73,.09,.13,.045,.22,"#dfcea6")}if(r(0,.537,-.155,_+.045,.055,.025,c),t.role==="fighter"&&(r(0,.75,-.16,_-.035,.23,.05,p),r(0,.87,-.19,_,.035,.025,l),r(0,.66,-.19,_,.035,.025,l)),t.role==="wizard"||t.role==="cleric")for(let x of[-.1,.1])r(x,.66,-.158,.025,.34,.026,t.role==="cleric"?"#dfcea6":l),r(x,.439,-.17,.14,.18,.024,p);if(t.role==="rogue"){for(let x of[-.1,.1])r(x,.75,-.21,.1,.33,.02,ct(o,x<0?8:-12));r(0,.575,-.208,.38,.025,.025,ct(o,15))}s="head",r(0,1.145,.03,.43,.4,.35,d),r(0,.955,.03,.13,.06,.14,d);for(let x of[-.239,.239])r(x,1.125,.045,.055,.11,.095,ct(d,-9));if(r(.205,1.13,.06,.016,.33,.29,ct(d,-15)),r(-.105,1.319,.029,.2,.017,.32,ct(d,15)),t.role==="skeleton"){r(0,1.145,.03,.43,.4,.35,t.skin);for(let x of[-.105,.105])r(x,1.15,.218,.094,.095,.028,"#292620");r(0,1.075,.219,.049,.058,.022,"#292620");for(let x of[-.12,-.06,0,.06,.12])r(x,1.01,.222,.035,.062,.026,ct(t.skin,10));for(let x of[-.15,.15])r(x,1.045,.2,.05,.09,.05,t.skin);r(0,.715,.169,.06,.13,.02,l)}else{for(let x of[-.1,.1])r(x,1.135,.218,.05,.085,.015,"#251e1c"),t.face==="stern"?r(x,1.206,.216,.073,.025,.018,t.hair,x<0?-.22:.22):a?r(x-.01,1.181,.217,.035,.012,.017,"#251e1c"):r(x,1.202,.216,.065,.014,.018,t.hair);r(0,1.025,.213,.056,.009,.012,ct(d,-55))}if(s="beard",t.face==="beard"&&t.role!=="skeleton"){for(let x of[-.165,-.11,.11,.165])r(x,1.036,.218,.06,.13,.035,t.hair);r(0,.994,.218,.27,.09,.04,t.hair),r(0,1.022,.243,.105,.03,.025,ct(t.hair,14))}if(s="hair",t.hairStyle!=="bald"&&t.role!=="skeleton"){if(!t.hood)r(0,1.34,-.005,.47,.06,.405,ct(t.hair,-8));else{r(0,1.352,.208,.395,.1,.072,ct(t.hair,-8));for(let f of[-1,1])r(f*.19,1.29,.208,.055,.115,.06,t.hair)}let x=[[1,2,3,2,1],[2,3,2,4,2],[2,2,4,3,2],[1,3,2,2,1]];if(!t.hood)for(let f=0;f<4;f++)for(let M=0;M<5;M++){let C=x[f][M],S=f%2?.014:-.012;r((M-2)*.095+S,1.325+(C-1)*.025,(f-1.5)*.104,.101,.06+(C-1)*.05,.111,ct(t.hair,[4,15,-9,8][(M+f)%4]))}let m=[{x:-.2,y:1.295,h:.11},{x:-.11,y:1.255,h:.2},{x:0,y:1.3,h:.11},{x:.1,y:1.265,h:.18},{x:.2,y:1.285,h:.13}];for(let f=0;f<m.length;f++){let M=m[f];r(M.x,M.y,.224,.104,M.h,.096,ct(t.hair,f%2?0:13))}for(let f of[-.223,.223])r(f,1.24,-.035,.067,.16,.32,ct(t.hair,-9)),r(f,1.205,.135,.073,.13,.08,t.hair);if(t.hood||r(0,1.225,-.17,.45,.25,.068,ct(t.hair,-9)),a&&!t.hood&&t.hairStyle==="short"){for(let f of[-.239,.239])r(f,1.11,.005,.073,.23,.31,t.hair),r(f,1.007,.015,.08,.07,.25,ct(t.hair,10));r(0,1.08,-.175,.46,.29,.075,t.hair)}if(t.hairStyle==="long"&&t.hood)for(let f of[-.218,.218])r(f,1.085,.225,.054,.15,.065,t.hair);if(t.hairStyle==="long"&&!t.hood)if(t.role==="fighter"&&a)r(.105,1.31,-.25,.16,.15,.15,t.hair),r(.11,1.08,-.25,.18,.36,.145,t.hair),r(.11,.865,-.24,.13,.09,.14,ct(t.hair,14)),r(.105,1.245,-.273,.17,.035,.15,"#352b32");else if(!a)r(0,1.43,-.19,.19,.16,.18,t.hair),r(.025,1.26,-.235,.2,.15,.16,t.hair),r(.025,1.335,-.248,.2,.03,.16,"#251e1c");else{for(let f=0;f<5;f++)r((f-2)*.094,1.035,-.18,.098,.4,.088,ct(t.hair,f%2?0:12));for(let f of[-.247,.247])r(f,1.06,.015,.075,.34,.27,t.hair),r(f,.873,.035,.08,.085,.24,ct(t.hair,14))}}if(s="hood",t.hood){let x="#dfcea6";r(0,1.444,-.025,.39,.065,.44,x),r(0,1.482,-.025,.25,.03,.38,t.cloth),r(0,1.23,-.23,.49,.4,.055,x);for(let m of[-1,1])r(m*.217,1.385,-.035,.078,.105,.43,x),r(m*.253,1.19,-.035,.064,.3,.43,x),r(m*.24,1.335,.2,.06,.07,.04,t.cloth),r(m*.266,1.165,.2,.03,.23,.04,ct(x,-16));r(0,1.409,.205,.34,.028,.025,t.cloth)}if(s="equipment",t.hands.includes("shield")&&(r(.36,.75,.2,.3,.48,.055,l),r(.36,.75,.238,.235,.405,.027,o),r(.36,.75,.26,.03,.19,.015,l),r(.36,.78,.261,.145,.03,.017,l),r(.36,.508,.2,.22,.045,.06,l),r(.36,.474,.2,.15,.038,.06,l)),t.hands.includes("sword")&&(r(-.345,.65,.16,.085,.38,.05,u,.42),r(-.418,.8,.16,.065,.14,.05,"#d6dcdf",.42),r(-.264,.466,.16,.17,.035,.07,l,.42),r(-.234,.411,.16,.045,.1,.045,c,.42)),t.hands.includes("staff"))if(r(-.34,.85,.05,.045,.96,.045,c),t.role==="cleric"){r(-.34,1.25,.05,.15,.13,.15,u);for(let x of[-.435,-.245])r(x,1.25,.05,.045,.12,.1,l);r(-.34,1.35,.05,.055,.065,.055,l)}else r(-.34,1.35,.05,.16,.05,.16,l),r(-.34,1.42,.05,.12,.12,.12,"#46bbed"),r(-.34,1.5,.05,.06,.05,.06,"#7bd8f7");if(t.hands.includes("bow")){for(let x=0;x<5;x++)r(-.33-.055*Math.sin(x*Math.PI/4),.55+x*.1,.07,.043,.13,.04,"#936c40");r(-.33,.75,.085,.01,.4,.01,"#cebfa0")}return{profile:t,parts:i}}var Ii=n=>n.map(([e,t])=>({hex:e,name:t})),f_={skin:Ii([["#f6dcc3","\u0424\u0430\u0440\u0444\u043E\u0440"],["#f2d4b4","\u0421\u0432\u0435\u0442\u043B\u0430\u044F"],["#e9bf90","\u0422\u0451\u043F\u043B\u0430\u044F"],["#e3bb8a","\u041F\u0435\u0441\u043E\u0447\u043D\u0430\u044F"],["#d9a577","\u0417\u0430\u0433\u0430\u0440"],["#c58d64","\u041C\u0435\u0434\u043D\u0430\u044F"],["#a8714d","\u0411\u0440\u043E\u043D\u0437\u0430"],["#8b5b42","\u041A\u0430\u0448\u0442\u0430\u043D\u043E\u0432\u0430\u044F"],["#6b4331","\u0422\u0451\u043C\u043D\u0430\u044F"],["#4a2f25","\u042D\u0431\u0435\u043D\u043E\u0432\u0430\u044F"],["#efbc88","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#f8dfca","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#eac2ad","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#d8a17a","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#b77a55","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#a26a48","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#70472f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#533827","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"]]),hair:Ii([["#1c1b20","\u0427\u0451\u0440\u043D\u044B\u0439"],["#26282e","\u0413\u0440\u0430\u0444\u0438\u0442"],["#3a2a22","\u0428\u043E\u043A\u043E\u043B\u0430\u0434"],["#493024","\u041A\u0430\u0448\u0442\u0430\u043D"],["#6a432c","\u041E\u0440\u0435\u0445"],["#8a5a34","\u041C\u0435\u0434\u043E\u0432\u044B\u0439"],["#a64f35","\u0420\u044B\u0436\u0438\u0439"],["#c4622f","\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439"],["#b7803c","\u0417\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u0439"],["#d9b45a","\u0411\u043B\u043E\u043D\u0434"],["#e6cf8a","\u041B\u0451\u043D"],["#c7c4bf","\u0421\u0435\u0434\u043E\u0439"],["#e8e6ee","\u0411\u0435\u043B\u044B\u0439"],["#8d8a99","\u041F\u0435\u043F\u0435\u043B"],["#4a7fd0","\u041B\u0430\u0437\u0443\u0440\u044C"],["#5a3fa8","\u0418\u043D\u0434\u0438\u0433\u043E"],["#c05a9a","\u041C\u0430\u043B\u0438\u043D\u0430"],["#e07aa8","\u0420\u043E\u0437\u043E\u0432\u044B\u0439"],["#3fa58a","\u0411\u0438\u0440\u044E\u0437\u0430"],["#5f9a45","\u041C\u043E\u0445"],["#b02f3d","\u0410\u043B\u044B\u0439"],["#3b6a8a","\u0421\u0442\u0430\u043B\u044C"],["#75462e","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#c9c6d7","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#d7a652","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#352b32","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#734c32","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#17191f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#f0e9dc","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#e0b969","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#cb763f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#77352b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#596779","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#5d437c","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"],["#395c57","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"],["#8d526b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"],["#ac86ba","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),eye:Ii([["#14141a","\u0427\u0451\u0440\u043D\u044B\u0435"],["#3a2418","\u0422\u0451\u043C\u043D\u043E-\u043A\u0430\u0440\u0438\u0435"],["#6a4a22","\u041A\u0430\u0440\u0438\u0435"],["#2f5fa8","\u0421\u0438\u043D\u0438\u0435"],["#2f7a5a","\u0417\u0435\u043B\u0451\u043D\u044B\u0435"],["#6a3fa0","\u0424\u0438\u0430\u043B\u043A\u043E\u0432\u044B\u0435"],["#c27a1c","\u042F\u043D\u0442\u0430\u0440\u043D\u044B\u0435"],["#8a8f9a","\u0421\u0435\u0440\u044B\u0435"],["#b02f3d","\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0435"]]),cloth:Ii([["#24456b","\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439"],["#315e84","\u0421\u0438\u043D\u0438\u0439"],["#4a7fb0","\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439"],["#2f7a7a","\u041C\u043E\u0440\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430"],["#566d70","\u0421\u043B\u0430\u043D\u0435\u0446"],["#2d4f2c","\u0425\u0432\u043E\u044F"],["#3f6b3b","\u0417\u0435\u043B\u0451\u043D\u044B\u0439"],["#487844","\u0422\u0440\u0430\u0432\u0430"],["#7a9a4a","\u041E\u043B\u0438\u0432\u0430"],["#452361","\u0418\u043D\u0434\u0438\u0433\u043E"],["#5d2f7e","\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],["#62377e","\u0410\u043C\u0435\u0442\u0438\u0441\u0442"],["#8a4a9a","\u041E\u0440\u0445\u0438\u0434\u0435\u044F"],["#c8688a","\u0420\u043E\u0437\u0430"],["#6a2330","\u0411\u0443\u0440\u0433\u0443\u043D\u0434"],["#8a2f3c","\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439"],["#843f37","\u041A\u0438\u0440\u043F\u0438\u0447"],["#b0452f","\u0422\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u0430"],["#c7792f","\u042F\u043D\u0442\u0430\u0440\u044C"],["#8a6a46","\u041B\u0435\u043D"],["#2a2a30","\u0423\u0433\u043E\u043B\u044C"],["#6c6c76","\u0421\u0435\u0440\u044B\u0439"],["#e6dcc4","\u041A\u0440\u0435\u043C\u043E\u0432\u044B\u0439"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#8b3d46","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#172b48","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#386f9a","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#528b91","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#244b3b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#74914b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#b28439","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#bf6d36","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#714c38","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#302d38","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#aaa69b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#cfbda0","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"],["#775b96","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"],["#a9617b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"],["#484c74","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),trim:Ii([["#d0a94a","\u0417\u043E\u043B\u043E\u0442\u043E"],["#c3a04c","\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"],["#e8c870","\u0421\u0432\u0435\u0442\u043B\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"],["#b6bdc5","\u0421\u0435\u0440\u0435\u0431\u0440\u043E"],["#8fa0b0","\u0421\u0442\u0430\u043B\u044C"],["#c5b895","\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C"],["#78552e","\u0411\u0440\u043E\u043D\u0437\u0430"],["#b87333","\u041C\u0435\u0434\u044C"],["#b02f3d","\u0410\u043B\u044B\u0439"],["#3d8be8","\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"],["#4fb58a","\u0418\u0437\u0443\u043C\u0440\u0443\u0434"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#2a2a30","\u0427\u0451\u0440\u043D\u044B\u0439"],["#c6a04f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#e4c778","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#dbb787","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#ad7748","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#926749","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#d8dce1","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#82919d","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#526374","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#e9dfc7","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#b18bbf","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#699ca0","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#4c5b4c","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"]]),leather:Ii([["#4b3626","\u0422\u0451\u043C\u043D\u0430\u044F \u043A\u043E\u0436\u0430"],["#5a3d28","\u041A\u043E\u0436\u0430"],["#6a4a30","\u0421\u0432\u0435\u0442\u043B\u0430\u044F \u043A\u043E\u0436\u0430"],["#8a6a46","\u0414\u0443\u0431\u043B\u0451\u043D\u0430\u044F"],["#2a2a30","\u0427\u0451\u0440\u043D\u0430\u044F"],["#3a3a44","\u0413\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u0430\u044F"],["#6a2330","\u041A\u0440\u0430\u0441\u043D\u0430\u044F"],["#2d4f2c","\u0417\u0435\u043B\u0451\u043D\u0430\u044F"],["#24456b","\u0421\u0438\u043D\u044F\u044F"]]),paint:Ii([["#b02f3d","\u0410\u043B\u044B\u0439"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#3d8be8","\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"],["#1a1a1f","\u0427\u0451\u0440\u043D\u044B\u0439"],["#3f9a5a","\u0417\u0435\u043B\u0451\u043D\u044B\u0439"],["#d0a94a","\u0417\u043E\u043B\u043E\u0442\u043E\u0439"],["#7a3fa8","\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],["#e07a2f","\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439"]]),gem:Ii([["#4aa8f0","\u0421\u0430\u043F\u0444\u0438\u0440"],["#e0475a","\u0420\u0443\u0431\u0438\u043D"],["#4fd08a","\u0418\u0437\u0443\u043C\u0440\u0443\u0434"],["#a86bf0","\u0410\u043C\u0435\u0442\u0438\u0441\u0442"],["#f0c040","\u0422\u043E\u043F\u0430\u0437"],["#40e0d0","\u0411\u0438\u0440\u044E\u0437\u0430"],["#f0f0ff","\u0410\u043B\u043C\u0430\u0437"],["#f07ac0","\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u043A\u0432\u0430\u0440\u0446"]])};var Kt=n=>n.map(([e,t])=>({id:e,name:t})),p_={gender:Kt([["male","\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],["female","\u0416\u0435\u043D\u0441\u043A\u0438\u0439"]]),ears:Kt([["round","\u041E\u0431\u044B\u0447\u043D\u044B\u0435"],["small","\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435"],["pointed","\u041E\u0441\u0442\u0440\u044B\u0435"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0435"]]),hairStyle:Kt([["bald","\u0411\u0435\u0437 \u0432\u043E\u043B\u043E\u0441"],["buzz","\u0401\u0436\u0438\u043A"],["short","\u0412\u0437\u044A\u0435\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435"],["spiky","\u0428\u0438\u043F\u044B"],["mohawk","\u0418\u0440\u043E\u043A\u0435\u0437"],["sweep","\u041A\u043E\u0441\u0430\u044F \u0447\u0451\u043B\u043A\u0430"],["bob","\u041A\u0430\u0440\u0435"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0435"],["wavy","\u0412\u043E\u043B\u043D\u044B"],["ponytail","\u0425\u0432\u043E\u0441\u0442"],["bun","\u041F\u0443\u0447\u043E\u043A"],["twin","\u0414\u0432\u0430 \u0445\u0432\u043E\u0441\u0442\u0430"],["braid","\u041A\u043E\u0441\u0430"],["curly","\u041A\u0443\u0434\u0440\u0438"]]),brows:Kt([["soft","\u041C\u044F\u0433\u043A\u0438\u0435"],["straight","\u0420\u043E\u0432\u043D\u044B\u0435"],["angry","\u0421\u0443\u0440\u043E\u0432\u044B\u0435"],["raised","\u041F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435"],["thick","\u0413\u0443\u0441\u0442\u044B\u0435"],["thin","\u0422\u043E\u043D\u043A\u0438\u0435"],["sad","\u041F\u0435\u0447\u0430\u043B\u044C\u043D\u044B\u0435"],["none","\u0411\u0435\u0437 \u0431\u0440\u043E\u0432\u0435\u0439"]]),eyes:Kt([["dot","\u0422\u043E\u0447\u043A\u0438"],["wide","\u0428\u0438\u0440\u043E\u043A\u0438\u0435"],["narrow","\u0423\u0437\u043A\u0438\u0435"],["happy","\u0420\u0430\u0434\u043E\u0441\u0442\u043D\u044B\u0435"],["sleepy","\u0421\u043E\u043D\u043D\u044B\u0435"],["sparkle","\u0411\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0435"],["big","\u0411\u043E\u043B\u044C\u0448\u0438\u0435"]]),mouth:Kt([["smile","\u0423\u043B\u044B\u0431\u043A\u0430"],["neutral","\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439"],["grin","\u0423\u0445\u043C\u044B\u043B\u043A\u0430 \u0441 \u0437\u0443\u0431\u0430\u043C\u0438"],["smirk","\u0423\u0441\u043C\u0435\u0448\u043A\u0430"],["open","\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439"],["cat","\u041A\u043E\u0448\u0430\u0447\u0438\u0439"],["frown","\u0425\u043C\u0443\u0440\u044B\u0439"]]),beard:Kt([["none","\u0411\u0435\u0437 \u0431\u043E\u0440\u043E\u0434\u044B"],["stubble","\u0429\u0435\u0442\u0438\u043D\u0430"],["mustache","\u0423\u0441\u044B"],["goatee","\u042D\u0441\u043F\u0430\u043D\u044C\u043E\u043B\u043A\u0430"],["short","\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F"],["full","\u0413\u0443\u0441\u0442\u0430\u044F"],["long","\u0414\u043B\u0438\u043D\u043D\u0430\u044F"],["sideburns","\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u044B"]]),marks:Kt([["freckles","\u0412\u0435\u0441\u043D\u0443\u0448\u043A\u0438"],["blush","\u0420\u0443\u043C\u044F\u043D\u0435\u0446"],["scar","\u0428\u0440\u0430\u043C"],["browscar","\u0428\u0440\u0430\u043C \u043D\u0430 \u0431\u0440\u043E\u0432\u0438"],["mole","\u0420\u043E\u0434\u0438\u043D\u043A\u0430"],["warpaint","\u0411\u043E\u0435\u0432\u0430\u044F \u0440\u0430\u0441\u043A\u0440\u0430\u0441\u043A\u0430"],["plaster","\u041F\u043B\u0430\u0441\u0442\u044B\u0440\u044C"]]),headgear:Kt([["none","\u0411\u0435\u0437 \u0443\u0431\u043E\u0440\u0430"],["hood","\u041A\u0430\u043F\u044E\u0448\u043E\u043D"],["wizhat","\u0428\u043B\u044F\u043F\u0430 \u043C\u0430\u0433\u0430"],["helm","\u0428\u043B\u0435\u043C"],["circlet","\u0414\u0438\u0430\u0434\u0435\u043C\u0430"],["headband","\u041F\u043E\u0432\u044F\u0437\u043A\u0430"],["cap","\u0411\u0435\u0440\u0435\u0442 \u0441 \u043F\u0435\u0440\u043E\u043C"],["crown","\u041A\u043E\u0440\u043E\u043D\u0430"]]),cape:Kt([["none","\u0411\u0435\u0437 \u043F\u043B\u0430\u0449\u0430"],["short","\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043F\u043B\u0430\u0449"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0449"],["mantle","\u041D\u0430\u043A\u0438\u0434\u043A\u0430"]]),accessories:Kt([["earring","\u0421\u0435\u0440\u044C\u0433\u0430"],["eyepatch","\u041F\u043E\u0432\u044F\u0437\u043A\u0430 \u043D\u0430 \u0433\u043B\u0430\u0437"],["glasses","\u041E\u0447\u043A\u0438"],["scarf","\u0428\u0430\u0440\u0444"],["amulet","\u0410\u043C\u0443\u043B\u0435\u0442"],["bracers","\u041D\u0430\u0440\u0443\u0447\u0438"]])},Od={fighter:Kt([["plate","\u041B\u0430\u0442\u044B"],["tabard","\u0421\u044E\u0440\u043A\u043E"],["leather","\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"],["knight","\u0422\u044F\u0436\u0451\u043B\u044B\u0435 \u043B\u0430\u0442\u044B"]]),wizard:Kt([["robe","\u041C\u0430\u043D\u0442\u0438\u044F"],["mantle","\u0421 \u0432\u043E\u0440\u043E\u0442\u043D\u0438\u043A\u043E\u043C"],["sash","\u0421 \u043A\u0443\u0448\u0430\u043A\u043E\u043C"],["scholar","\u0423\u0447\u0451\u043D\u044B\u0439 \u0436\u0438\u043B\u0435\u0442"]]),rogue:Kt([["leathers","\u041A\u043E\u0436\u0430 \u0441 \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u044C\u044E"],["vest","\u0416\u0438\u043B\u0435\u0442"],["tunic","\u0422\u0443\u043D\u0438\u043A\u0430"],["studded","\u041A\u043B\u0451\u043F\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"]]),cleric:Kt([["vestments","\u041E\u0431\u043B\u0430\u0447\u0435\u043D\u0438\u0435"],["surplice","\u0421\u0442\u0438\u0445\u0430\u0440\u044C"],["mail","\u041A\u043E\u043B\u044C\u0447\u0443\u0433\u0430"],["monk","\u0420\u044F\u0441\u0430 \u0441 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439"]])},Bd={fighter:"plate",wizard:"robe",rogue:"leathers",cleric:"vestments"},kd={skin:"skin",hair:"hair",hair2:"hair",brow:"hair",eye:"eye",beardColor:"hair",cloth:"cloth",cloth2:"cloth",trim:"trim",leather:"leather",accent:"cloth",markColor:"paint",hat:"cloth",capeColor:"cloth",gem:"gem"};var m_=new Set(["gender","ears","hairStyle","brows","eyes","mouth","beard","marks","headgear","cape","accessories","outfit","face","hood",...Object.keys(kd)]),g_={ears:"round",eyes:"dot",mouth:"smile",beard:"none",marks:[],headgear:"none",accessories:[],skin:"#e9bf90",hair2:null,brow:null,beardColor:null,cloth2:null,accent:null,hat:null,capeColor:null,eye:"#14141a",trim:"#d0a94a",gem:"#4aa8f0"},Fd={fighter:{cloth:"#315e84",leather:"#5a3d28",male:{hair:"#493024",hairStyle:"short",brows:"angry"},female:{hair:"#d9b45a",hairStyle:"ponytail",brows:"soft"}},wizard:{cloth:"#5d2f7e",leather:"#5a3d28",male:{hair:"#c7c4bf",hairStyle:"short",brows:"angry"},female:{hair:"#c7c4bf",hairStyle:"wavy",brows:"soft"}},rogue:{cloth:"#3f6b3b",leather:"#6a4a30",cape:"short",male:{hair:"#26282e",hairStyle:"bun",brows:"angry"},female:{hair:"#6a432c",hairStyle:"bob",brows:"soft"}},cleric:{cloth:"#8a2f3c",leather:"#5a3d28",male:{hair:"#493024",hairStyle:"bald",brows:"angry",beard:"full"},female:{hair:"#c7c4bf",hairStyle:"long",brows:"soft",headgear:"hood"}}};function sh(n,e="male"){let t=Fd[n]||Fd.fighter,i=t[e==="female"?"female":"male"];return{...x_(g_),gender:e==="female"?"female":"male",cloth:t.cloth,leather:t.leather,cape:t.cape||"none",outfit:Bd[n]||"plate",...i}}var x_=n=>JSON.parse(JSON.stringify(n));function ul(n,e){n=n||{};let t=n.gender==="female"?"female":"male",i=sh(e,t),s={...i};for(let a of Object.keys(n))n[a]!==void 0&&m_.has(a)&&(s[a]=n[a]);let r=n.brows===void 0&&n.face!==void 0;return r?(s.brows=n.face==="soft"?"soft":"angry",n.beard===void 0&&(s.beard=n.face==="beard"?"full":"none"),n.headgear===void 0&&(s.headgear=n.hood?"hood":"none")):n.hood&&n.headgear===void 0&&(s.headgear="hood"),r&&n.hairStyle==="short"&&t==="female"&&(s.hairStyle="bob"),r&&n.hairStyle==="long"&&t==="male"&&(s.hairStyle="bun"),Od[e]?.some(a=>a.id===s.outfit)||(s.outfit=Bd[e]||"plate"),Array.isArray(s.marks)||(s.marks=[]),Array.isArray(s.accessories)||(s.accessories=[]),s}var pl={headMinRatio:.34,headMaxRatio:.46,maxBoxes:200,maxWithTexels:520,texel:!0,defaultEye:1315866,outline:"#1b1620",classes:["fighter","rogue","wizard","cleric"],genders:["male","female"]};var __={fighter:{cloth:3235460,dark:2377067,trim:13674826,boots:4929062,belt:5913896},wizard:{cloth:6107006,dark:4531041,trim:13674826,boots:4929062,belt:5913896,gem:4033512},rogue:{cloth:4156219,dark:2969388,trim:12820556,boots:4929062,belt:6965808,leather:6965808},cleric:{cloth:9056060,dark:6955824,trim:13674826,boots:4929062,belt:5913896,cream:15392707,green:4152127}},Pi=12963024,ml=9081498,rh=6965808,Gd=10133667,Zn=15392707,ah=4152127,y_=10181190,zd=4857626,v_=16052454,dl=1710623,Vd=16777215,M_={0:"rogue",1:"wizard",2:"fighter",5:"cleric"},S_={0:"male",1:"female",2:"male"},b_={fighter:["sword","shield"],rogue:["sword","empty"],wizard:["staff","empty"],cleric:["staff","empty"]},fl={innkeeper:{name:"\u0411\u0440\u0430\u043C",role:"\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A",classId:"fighter",gender:"male",look:{hair:"#6a432c",hairStyle:"short",beard:"none",cloth:"#843f37"},hands:["empty","empty"]},"street-guard":{name:"\u0420\u0430\u0434\u0430",role:"\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430",classId:"fighter",gender:"female",look:{hair:"#6a432c",hairStyle:"braid",cloth:"#315e84"},hands:["sword","shield"]},keeper:{name:"\u042D\u043B\u043B\u0435\u043D",role:"\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430",classId:"cleric",gender:"female",look:{hair:"#c7c4bf",hairStyle:"long",brows:"soft",headgear:"hood"},hands:["empty","empty"],book:!0},novice:{name:"\u041B\u0438\u043D",role:"\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A",classId:"cleric",gender:"male",look:{hair:"#6a432c",hairStyle:"short",brows:"soft",beard:"none",cloth:"#843f37"},hands:["empty","empty"]}},DM=Object.fromEntries(Object.entries(fl).map(([n,e])=>[e.name,n])),jt=n=>typeof n=="number"?n:typeof n=="string"&&/^#[0-9a-f]{6}$/i.test(n)?parseInt(n.slice(1),16):void 0,Wr=(n,e,t)=>nn(n,1-t)+nn(e,t)&16777215;function Xr(n,e){let t=e?.gen&&typeof e.gen=="object"?e.gen:null,i=t?null:e?.npc||e?.npcId,s={ellen:"keeper",lin:"novice"}[i]||i||(e&&e.id&&fl[e.id]&&e.type==="npc"?e.id:null);if(s&&!Object.hasOwn(fl,s))throw Error("NPC must be registered: "+s);let r=t||(s?fl[s]:null),a=r?.classId||(pl.classes.includes(e?.classId)?e.classId:M_[n]);if(!a)return null;let o;r?o=ul({...sh(a,r.gender),...r.look,gender:r.gender},a):e?.appearance?o=ul(e.appearance,a):o=ul({gender:S_[n]||"male"},a);let l=__[a],c=jt(o.cloth)??l.cloth,u=jt(o.leather)??l.belt,d=jt(o.hair)??4796452;return{classId:a,gender:o.gender,npc:s,outfit:o.outfit,hairStyle:o.hairStyle,ears:o.ears,brows:o.brows,eyes:o.eyes,mouth:o.mouth,beard:o.beard,marks:o.marks,headgear:o.headgear,cape:o.cape,accessories:o.accessories,skin:jt(o.skin)??15318928,hair:d,hair2:jt(o.hair2)??null,brow:jt(o.brow)??nn(d,.85),eye:jt(o.eye)??pl.defaultEye,beardC:jt(o.beardColor)??d,cloth:c,cloth2:jt(o.cloth2)??(c===l.cloth?l.dark:nn(c,.78)),trim:jt(o.trim)??l.trim,leather:u,boots:nn(u,.83),gem:jt(o.gem)??4892912,accent:jt(o.accent)??null,markC:jt(o.markColor)??null,hat:jt(o.hat)??null,capeC:jt(o.capeColor)??nn(c,.86),hands:r?.hands||e?.hands||b_[a],book:!!r?.book,p:l}}function gl(n,e={}){let t=[],i=(m,f,M,C,S,T,E,A=!1)=>t.push([m,f,M,C,S,T,E,A]),s=n.gender==="female",r=n.classId==="wizard"||n.classId==="cleric",a=s?.29:.41,o=a/2+(s?.055:.08),l=s?.1:.14,c=n.outfit,u=n.classId,d=n.trim,h=n.cloth,p=n.cloth2,_=c==="vest"||c==="scholar"||c==="surplice"?Zn:c==="mail"||c==="tabard"?ml:h,x=c==="mail"||c==="tabard"?ml:c==="leather"||c==="studded"?n.leather:c==="surplice"?Zn:h;if(r){let m=s?a+.22:a+.06;i(0,.31,0,m,.3,.3,c==="surplice"?Zn:h),i(0,.17,0,m+.02,.045,.32,d);for(let f of[-1,1])i(f*.1,.14,.07,.14,.06,.16,n.boots)}else{for(let m of[-1,1])i(m*.1,.2,.03,.15,.13,.2,n.boots),i(m*.1,.32,.02,.14,.1,.15,p);s&&(i(0,.37,0,.46,.12,.3,p),i(0,.305,0,.48,.028,.32,d))}i(0,.56,0,a,.26,.25,x),i(0,.43,0,a+.02,.05,.27,c==="monk"?13154442:n.leather),i(0,.43,.14,.08,.065,.03,u==="wizard"?n.gem:d);for(let m of[-1,1])i(m*o,.55,0,l,.24,s?.15:.18,_),i(m*o,.4,.02,l-.02,.08,s?.1:.12,n.skin);return i(0,.9,.02,.46,.42,.4,n.skin),E_(i,n),I_(i,n),A_(i,n),n.beard!=="none"&&C_(i,n),R_(i,n),P_[u](i,n,a,o,c),n.cape!=="none"&&L_(i,n,a),D_(i,n),N_(i,n,a,o),U_(i,n,o,d),w_(t),(e.texel??pl.texel)&&t.push(...Ji(t,T_(n))),t}function w_(n){let t=n.map(()=>Array(6).fill(0));for(let i=0;i<n.length;i++)for(let s=0;s<i;s++){let r=n[s],a=n[i];for(let o=0;o<3;o++)if([0,1,2].filter(l=>l!==o).every(l=>Math.min(r[l]+r[l+3]/2,a[l]+a[l+3]/2)-Math.max(r[l]-r[l+3]/2,a[l]-a[l+3]/2)>1e-8))for(let l of[-1,1]){let c=o*2+(l===1?1:0);Math.abs(r[o]+l*r[o+3]/2-a[o]-l*a[o+3]/2)<1e-8&&(t[i][c]=Math.max(t[i][c],t[s][c]+1))}}n.forEach((i,s)=>{for(let r=0;r<3;r++){let a=t[s][r*2]*5e-4,o=t[s][r*2+1]*5e-4;i[r]+=(o-a)/2,i[r+3]+=o+a}})}function T_(n){let e=[n.hair,n.hair2,n.beardC,n.brow],t=[Pi,ml,Gd,n.trim],i=[n.cloth,n.cloth2,n.capeC,n.hat,n.accent,Zn,ah];return s=>s===n.skin?"skin":e.includes(s)?"hair":t.includes(s)?"metal":i.includes(s)?"cloth":"other"}function E_(n,e){let t=e.eye,i=pl.defaultEye,s=t!==i,r=e.accessories.includes("eyepatch"),a=e.gender==="female",o=a?13130346:y_;for(let u of[-1,1]){if(r&&u===-1)continue;let d=u*.1;switch(e.eyes){case"wide":n(d,.89,.226,.085,.075,.012,t),s&&n(d,.89,.232,.035,.045,.012,i);break;case"narrow":n(d,.885,.226,.08,.04,.012,t);break;case"happy":n(d,.885,.226,.09,.025,.012,t),n(d-.045,.862,.226,.025,.025,.012,t),n(d+.045,.862,.226,.025,.025,.012,t);break;case"sleepy":n(d,.88,.226,.07,.055,.012,t),n(d,.915,.228,.085,.028,.012,nn(e.skin,.82));break;case"sparkle":n(d,.895,.226,.075,.1,.012,t),s&&n(d,.88,.232,.035,.05,.012,i),n(d+.016,.92,.234,.022,.026,.012,Vd);break;case"big":n(d,.885,.226,.09,.11,.012,t),s&&n(d,.875,.232,.04,.055,.012,i),n(d+.018,.915,.234,.03,.03,.012,Vd);break;default:n(d,.89,.226,.06,.085,.012,t)}}if(a)for(let u of[-1,1])r&&u===-1||(n(u*.155,.935,.227,.035,.03,.012,dl),e.eyes!=="happy"&&n(u*.1,.942,.227,.09,.014,.012,dl)),n(u*.15,.815,.226,.06,.035,.012,Wr(e.skin,15043210,.35));r&&(n(-.1,.89,.232,.13,.11,.014,dl),n(0,.985,.226,.47,.022,.014,dl));let l=(u,d,h,p)=>n(u,d,.226,h,p,.012,e.brow);for(let u of[-1,1])switch(e.brows){case"soft":l(u*.1,.955,.08,.018);break;case"straight":l(u*.1,.955,.1,.03);break;case"angry":l(u*.075,.94,.06,.03),l(u*.14,.965,.06,.03);break;case"raised":l(u*.1,.99,.09,.028);break;case"thick":l(u*.1,.955,.11,.045);break;case"thin":l(u*.1,.96,.1,.014);break;case"sad":l(u*.075,.965,.06,.025),l(u*.14,.945,.06,.025);break;default:}let c=(u,d,h,p,_=o,x=.236)=>n(u,d+.015,x,h,p,.012,_);switch(e.mouth){case"neutral":c(0,.785,.08,.02);break;case"grin":c(0,.78,.14,.04,zd),c(0,.796,.12,.016,v_,.238),c(-.075,.8,.022,.022),c(.075,.8,.022,.022);break;case"smirk":c(-.01,.78,.07,.02),c(.05,.79,.04,.02),c(.08,.806,.022,.022);break;case"open":c(0,.775,.06,.05,zd),c(0,.762,.04,.018,12603482,.238);break;case"cat":c(-.035,.775,.045,.02),c(.035,.775,.045,.02),c(0,.79,.025,.03);break;case"frown":c(0,.78,.08,.02),c(-.05,.765,.022,.022),c(.05,.765,.022,.022);break;default:c(0,.78,a?.105:.09,a?.028:.02),c(-.055,.795,.022,.022),c(.055,.795,.022,.022)}}function A_(n,e){for(let t of[-1,1])e.ears==="small"?n(t*.235,.88,.02,.03,.07,.06,e.skin):e.ears==="pointed"?(n(t*.255,.9,.02,.06,.1,.06,e.skin),n(t*.285,.96,.02,.04,.07,.05,e.skin)):e.ears==="long"?(n(t*.26,.9,.02,.07,.09,.06,e.skin),n(t*.31,.97,.02,.05,.09,.05,e.skin),n(t*.34,1.04,.02,.04,.07,.05,e.skin)):n(t*.24,.88,.02,.04,.09,.07,e.skin)}function C_(n,e){let t=e.beardC,i=Wr(e.skin,t,.3),s=()=>{n(0,.75,.205,.34,.15,.05,t);for(let a of[-1,1])n(a*.17,.83,.2,.05,.2,.05,t)},r=()=>{for(let a of[-1,1])n(a*.21,.8,.12,.05,.26,.2,t);n(0,.818,.238,.18,.03,.04,t)};switch(e.beard){case"stubble":n(0,.745,.221,.42,.1,.012,i),n(0,.815,.221,.3,.035,.012,i);break;case"mustache":n(0,.818,.238,.2,.04,.04,t);for(let a of[-1,1])n(a*.115,.8,.236,.04,.05,.04,t);break;case"goatee":n(0,.74,.228,.1,.12,.04,t),n(0,.818,.238,.14,.03,.04,t);break;case"short":s();break;case"full":s(),r();break;case"long":s(),r(),n(0,.6,.2,.3,.2,.07,t),n(0,.48,.2,.2,.14,.06,t);break;case"sideburns":for(let a of[-1,1])n(a*.225,.88,.19,.04,.22,.07,t),n(a*.2,.82,.2,.05,.1,.05,t);break;default:}}function R_(n,e){let t=l=>e.marks.includes(l),r=(l,c,u,d=.03,h=.03)=>n(l,c,.229,d,h,.012,u),a=e.markC??Wr(e.skin,11878463,.55),o=Wr(e.skin,16777215,.38);if(t("freckles"))for(let l of[-1,1])for(let[c,u]of[[.08,.835],[.125,.84],[.105,.815],[.15,.82]])r(l*c,u,10119750,.02,.02);if(t("blush"))for(let l of[-1,1])n(l*.15,.812,.229,.07,.04,.012,14715514);if(t("scar"))for(let[l,c]of[[-.178,.812],[-.158,.784],[-.138,.756],[-.118,.728]])r(l+.024,c,o,.014,.03),r(l,c,a);if(t("browscar")){for(let[l,c]of[[-.13,1.03],[-.122,1],[-.114,.97]])r(l+.022,c,o,.012,.03),r(l,c,a,.026,.03);r(-.152,.985,a,.026,.014),r(-.1,.985,a,.026,.014)}if(t("mole")&&r(.075,.775,4861733,.022,.022),t("warpaint")){let l=e.markC??11546429;for(let c of[-1,1])for(let u of[0,.045])for(let d=0;d<3;d++)r(c*(.175-u-d*.022),.812-d*.03,l,.034,.03)}t("plaster")&&(n(0,.835,.229,.072,.03,.012,15787212),n(0,.835,.23,.032,.075,.012,15787212),n(0,.835,.232,.018,.018,.012,Wr(15787212,11901546,.5)))}function I_(n,e){let t=e.hair,i=e.hair2||t,s=e.hairStyle,r=e.headgear;if(s==="bald"||r==="hood")return;let a=[],o=[],l=[],c=(x,m,f,M,C,S,T,E=t)=>x.push([m,f,M,C,S,T,E]),u=()=>c(a,0,1.13,0,.5,.1,.46),d=()=>{c(o,0,1.06,.21,.48,.07,.06);for(let x of[-1,1])c(o,x*.2,1,.21,.08,.12,.06)},h=(x=.24,m=.98)=>{for(let f of[-1,1])c(l,f*.26,m,0,.05,x,.42)},p=-.255;switch(s){case"buzz":c(a,0,1.125,0,.48,.07,.43),c(o,0,1.07,.205,.46,.07,.04);for(let x of[-1,1])c(l,x*.245,.99,0,.02,.16,.38);p=-.2;break;case"short":u(),d(),h(),c(l,0,.93,-.22,.5,.38,.07),c(a,-.1,1.2,.02,.16,.08,.22),c(a,.12,1.21,-.06,.16,.1,.16),c(a,0,1.19,.13,.2,.05,.1);break;case"spiky":u(),d(),h(.2,1),c(l,0,.95,-.22,.5,.32,.07);for(let[x,m,f,M,C]of[[-.18,1.2,.06,.1,.14],[-.06,1.23,.08,.1,.2],[.06,1.23,0,.1,.2],[.18,1.2,-.04,.1,.14],[0,1.2,-.14,.12,.14]])c(a,x,m,f,M,C,.1);break;case"mohawk":c(a,0,1.22,0,.12,.22,.42),c(a,0,1.35,-.05,.12,.08,.26),c(a,0,1.12,0,.3,.04,.44),c(l,0,.98,-.2,.12,.3,.05);for(let x of[-1,1])c(l,x*.245,1.02,0,.02,.1,.36,nn(t,.6));p=-.225;break;case"sweep":u(),h(),c(l,0,.93,-.22,.5,.38,.07),c(a,-.05,1.19,0,.34,.07,.3),c(o,.12,1.1,.22,.2,.06,.05),c(o,0,1.06,.22,.2,.06,.05),c(o,-.12,1.02,.22,.2,.06,.05),c(o,-.2,.95,.22,.07,.12,.05);break;case"bob":u(),c(o,0,1.04,.215,.48,.1,.05);for(let x of[-1,1])c(l,x*.27,.84,0,.07,.34,.42);c(l,0,.85,-.22,.58,.4,.1),p=-.272;break;case"long":u(),d();for(let x of[-1,1])c(l,x*.27,.8,0,.07,.5,.38);c(l,0,.76,-.24,.54,.64,.1),c(a,0,1.2,-.02,.3,.08,.3),p=-.292;break;case"wavy":c(a,0,1.14,0,.54,.12,.5),c(a,0,1.22,-.02,.38,.06,.34),c(o,-.12,1.05,.215,.26,.08,.05),c(o,.14,1.07,.215,.2,.06,.05),c(o,.24,.97,.2,.05,.14,.05);for(let x of[-1,1])c(l,x*.29,.8,0,.08,.5,.4),c(l,x*.31,.56,.02,.07,.16,.34);c(l,0,.72,-.25,.62,.76,.12),p=-.312;break;case"ponytail":u(),d(),h(.2,1),c(l,0,.95,-.22,.5,.3,.07),c(a,0,1.17,-.17,.14,.1,.1,e.trim),c(a,0,1.22,-.26,.16,.16,.14),c(a,0,1.05,-.31,.16,.38,.12),c(a,0,.83,-.31,.12,.14,.1,i),p=-.32;break;case"bun":u(),d(),h(),c(l,0,.93,-.22,.5,.34,.07),c(a,0,1.24,-.02,.2,.12,.2),c(a,0,1.33,-.02,.14,.08,.14),c(a,0,1.19,-.02,.22,.03,.22,e.trim);break;case"twin":u(),d(),h(.2,1),c(l,0,.95,-.21,.5,.3,.06);for(let x of[-1,1])c(l,x*.3,.96,-.04,.1,.5,.14),c(l,x*.3,.66,-.04,.1,.1,.14,i),c(l,x*.28,1.1,-.04,.12,.05,.14,e.trim);break;case"braid":u(),d(),h(.2,1),c(l,0,.93,-.22,.5,.4,.07),c(l,.22,.88,.12,.1,.12,.1),c(l,.22,.76,.14,.09,.1,.1),c(l,.22,.64,.16,.1,.1,.1),c(l,.22,.55,.17,.09,.08,.09,i),c(l,.22,.5,.18,.1,.04,.1,e.trim);break;case"curly":c(a,0,1.2,0,.62,.28,.56);for(let x of[-1,1])c(l,x*.31,1.04,0,.1,.3,.5),c(o,x*.16,1.07,.23,.14,.08,.06);c(l,0,1,-.27,.6,.4,.12),p=-.332;break;default:u(),d(),h(),c(l,0,.93,-.22,.5,.38,.07)}if(e.hair2&&s!=="buzz"&&(o.push([-.14,.985,.223,.06,.2,.04,e.hair2]),l.push([.12,.93,p,.1,.3,.02,e.hair2])),e.gender==="female"&&!["buzz","mohawk"].includes(s))for(let x of[-1,1])c(o,x*.235,.86,.2,.055,.27,.06);let _=r==="helm"?["top","front"]:r==="wizhat"||r==="cap"?["top"]:[];for(let[x,m]of[["top",a],["front",o],["low",l]])if(!_.includes(x))for(let f of m)n(f[0],f[1],f[2],f[3],f[4],f[5],f[6])}var P_={fighter(n,e,t,i,s){let{trim:r}=e,a=(o,l)=>{for(let c of[-1,1])n(c*i,.7,0,o,.07,.2,r),n(c*i,.66,0,o,l,.18,e.cloth2)};if(s==="plate"){a(.17,.08);for(let o of[-1,1])n(o*.07,.62,.13,.03,.15,.012,r);n(0,.685,.13,.16,.03,.012,r),n(0,.71,-.02,t+.02,.03,.27,r)}if(s==="tabard"&&(n(0,.4,.135,.22,.4,.012,e.cloth),n(0,.53,.145,.03,.15,.012,r),n(0,.56,.145,.11,.03,.012,r),n(0,.21,.136,.22,.03,.012,r),n(0,.71,0,t+.02,.03,.27,r)),s==="leather"){n(0,.56,.13,t-.06,.25,.012,e.cloth),n(0,.56,.136,.02,.25,.012,nn(e.leather,.6));for(let o of[-1,1])n(o*i,.66,0,.15,.06,.19,e.cloth),n(o*.12,.56,.14,.05,.05,.012,r);n(0,.71,0,t+.02,.03,.27,r)}s==="knight"&&(a(.2,.12),n(0,.72,0,t-.02,.06,.29,Pi),n(0,.6,.13,t-.04,.2,.012,Pi),n(0,.6,.14,.03,.16,.012,r),n(0,.63,.14,.12,.03,.012,r),n(0,.385,.1,t+.02,.08,.29,Pi),n(0,.35,.1,t+.02,.02,.29,r))},wizard(n,e,t,i,s){let{trim:r}=e;for(let a of[-1,1])n(a*i,.47,0,.14,.04,.19,r);if(s==="robe"){for(let a of[-1,1])n(a*.1,.57,.128,.045,.24,.012,r);n(0,.71,0,t+.02,.04,.27,r),n(0,.5,.128,.03,.1,.012,r)}if(s==="mantle"&&(n(0,.72,0,t+.13,.09,.31,e.cloth2),n(0,.665,0,t+.15,.025,.33,r),n(0,.78,-.1,.3,.12,.08,e.cloth2),n(0,.72,.16,.05,.05,.02,e.gem)),s==="sash"){let a=e.accent??e.cloth2;for(let o=0;o<5;o++)n(-.12+o*.06,.68-o*.055,.13,.09,.07,.012,a);n(0,.45,0,t+.04,.1,.27,a),n(.09,.34,.14,.06,.12,.02,a),n(-.02,.33,.14,.06,.1,.02,a)}s==="scholar"&&(n(0,.56,.13,t-.1,.25,.012,e.cloth2),n(0,.64,.14,.1,.1,.012,Zn),n(0,.6,.145,.02,.2,.012,r),n(.19,.33,.12,.12,.12,.07,e.leather),n(.19,.385,.12,.13,.03,.075,r))},rogue(n,e,t,i,s){let{trim:r,leather:a}=e;if(s==="leathers"){for(let o=0;o<5;o++)n(-.12+o*.06,.67-o*.06,.13,.075,.06,.02,a);n(.18,.33,.12,.12,.12,.07,a),n(.18,.385,.12,.13,.03,.075,r)}if(s==="vest"){n(0,.56,.128,.06,.24,.012,Zn);for(let o of[-1,1])n(o*.1,.56,.13,.1,.25,.012,a);for(let o=0;o<3;o++)n(0,.64-o*.07,.14,.09,.015,.012,r)}if(s==="tunic"&&(n(0,.36,0,t+.02,.2,.28,e.cloth),n(0,.255,0,t+.04,.025,.3,r),n(0,.43,0,t+.03,.05,.29,a),n(0,.43,.15,.08,.065,.03,r),n(.14,.3,.15,.09,.09,.02,e.cloth2)),s==="studded"){for(let o=0;o<2;o++)for(let l=0;l<3;l++)n(-.1+l*.1,.64-o*.1,.135,.035,.035,.02,Pi);n(-.2,.71,0,.17,.07,.2,a),n(-.2,.74,0,.12,.03,.15,r),n(.18,.33,.12,.12,.12,.07,a)}},cleric(n,e,t,i,s){let{trim:r}=e;if(s==="vestments"){n(0,.5,.128,.15,.36,.012,ah),n(0,.66,.12,t-.02,.06,.26,Zn);for(let a of[-1,1])n(a*.13,.55,.13,.08,.26,.012,Zn),n(a*i,.43,0,.14,.04,.19,Zn);n(0,.59,.142,.03,.13,.012,r),n(0,.615,.142,.095,.03,.012,r),n(0,.3,.16,.24,.24,.012,ah),n(0,.3,.17,.03,.1,.012,r)}if(s==="surplice"){for(let a of[-1,1])n(a*.09,.5,.13,.04,.38,.012,e.cloth2),n(a*i,.43,0,.14,.04,.19,e.cloth2);n(0,.66,.12,t-.02,.05,.26,e.cloth2),n(0,.59,.142,.03,.13,.012,r),n(0,.615,.142,.095,.03,.012,r),n(0,.17,0,t+.13,.03,.33,e.cloth2)}if(s==="mail"){for(let a=0;a<4;a++)for(let o=0;o<4;o++)(a+o)%2===0&&n(-.12+o*.08,.66-a*.06,.13,.05,.03,.012,Pi);n(0,.69,0,t,.05,.27,nn(ml,1.15)),n(0,.36,.135,.22,.34,.012,e.cloth),n(0,.45,.145,.03,.14,.012,r),n(0,.48,.145,.1,.03,.012,r);for(let a of[-1,1])n(a*i,.43,0,.14,.04,.19,r)}if(s==="monk"){n(0,.66,0,t-.02,.05,.26,e.cloth2),n(.06,.31,.145,.04,.18,.03,13154442),n(.06,.2,.145,.06,.04,.04,13154442);for(let a=0;a<4;a++)n(-.1+a*.028,.6-Math.abs(a-1.5)*.02,.14,.03,.03,.012,rh);for(let a of[-1,1])n(a*i,.43,0,.14,.04,.19,e.cloth2)}}};function L_(n,e,t){let i=e.capeC,s=e.trim;if(e.cape==="short"&&(n(0,.72,0,t+.13,.09,.32,i),n(0,.56,-.17,t+.02,.42,.06,i)),e.cape==="long"){n(0,.72,0,t+.13,.09,.32,i),n(0,.42,-.18,t+.06,.66,.06,i),n(0,.095,-.18,t+.06,.03,.06,s);for(let r of[-1,1])n(r*(t/2+.05),.55,-.06,.05,.3,.2,i)}e.cape==="mantle"&&(n(0,.72,0,t+.17,.1,.34,i),n(0,.64,0,t+.19,.06,.32,i),n(0,.605,0,t+.2,.02,.33,s),n(0,.71,.17,.05,.05,.02,s),n(0,.62,-.18,t+.04,.25,.05,i))}function D_(n,e){let t=e.headgear,i=e.trim,s=e.hat;if(t==="hood"){let r=s??(e.classId==="cleric"?Zn:e.cloth),a=e.classId==="cleric"&&!s?e.cloth:e.trim;n(0,1.14,0,.56,.1,.5,r),n(0,1.185,0,.56,.03,.5,a),n(0,.92,-.24,.56,.56,.1,r),n(0,.98,-.295,.3,.4,.02,a);for(let o of[-1,1])n(o*.29,.9,-.02,.07,.5,.42,r),n(o*.3,1,0,.02,.06,.42,a);if(n(0,1.05,.21,.46,.06,.05,r),e.hairStyle!=="bald"){n(0,1,.205,.46,.07,.06,e.hair);for(let o of[-1,1])n(o*.2,.93,.205,.08,.14,.06,e.hair);e.hair2&&n(-.14,.96,.223,.06,.14,.04,e.hair2)}}if(t==="wizhat"){let r=s??e.cloth;n(0,1.12,0,.74,.05,.7,r),n(0,1.2,0,.46,.12,.44,r),n(0,1.31,-.02,.34,.1,.32,r),n(0,1.41,-.05,.22,.1,.2,r),n(.02,1.5,-.09,.12,.1,.12,r),n(0,1.15,0,.5,.04,.48,i)}if(t==="helm"){let r=s??Pi;n(0,1.13,0,.54,.14,.5,r);for(let a of[-1,1])n(a*.265,.99,0,.04,.3,.44,r);n(0,.96,.235,.05,.2,.02,r),n(0,.95,-.235,.5,.3,.05,r),n(0,1.065,0,.545,.025,.505,i),n(0,1.24,0,.06,.1,.3,i)}if(t==="circlet"&&(n(0,1.085,0,.5,.03,.52,s??i),n(0,1.105,.262,.05,.07,.02,e.gem,!0),n(0,1.085,.262,.09,.02,.02,s??i)),t==="headband"){let r=s??e.accent??e.cloth2;n(0,1.05,0,.5,.05,.52,r),n(.26,1.05,-.04,.06,.1,.12,r),n(.285,.97,-.1,.04,.14,.06,r),n(.285,.91,-.12,.04,.08,.05,r)}if(t==="cap"){let r=s??e.cloth2;n(0,1.15,0,.52,.12,.48,r),n(0,1.09,.25,.5,.035,.12,nn(r,.8)),n(.2,1.23,-.05,.04,.18,.06,i),n(.22,1.33,-.07,.04,.1,.05,nn(i,.85))}if(t==="crown"){n(0,1.15,0,.5,.07,.46,s??i);for(let[r,a]of[[-.2,.06],[-.1,.09],[0,.06],[.1,.09],[.2,.06]])n(r,1.185+a/2,0,.07,a,.08,s??i);n(0,1.15,.232,.05,.05,.02,e.gem,!0)}}function N_(n,e,t,i){let s=a=>e.accessories.includes(a),r=e.trim;if(s("earring")&&n(.245,.81,.03,.03,.07,.035,r),s("glasses")){for(let a of[-1,1]){let o=a*.1;n(o,.96,.238,.15,.02,.014,r),n(o,.82,.238,.15,.02,.014,r),n(o-.07,.89,.238,.02,.14,.014,r),n(o+.07,.89,.238,.02,.14,.014,r),n(a*.245,.9,.03,.02,.02,.34,r)}n(0,.9,.238,.05,.02,.014,r)}if(s("scarf")){let a=e.accent??e.cloth2;n(0,.7,0,t+.04,.07,.3,a),n(.1,.58,.15,.1,.22,.03,a),n(.1,.46,.15,.1,.03,.03,r)}if(s("amulet")&&(n(0,.64,.135,.16,.02,.012,r),n(0,.5,.145,.05,.06,.02,e.gem,!0),n(0,.56,.14,.02,.12,.012,r)),s("bracers"))for(let a of[-1,1])n(a*i,.47,0,.145,.08,.195,e.leather),n(a*i,.515,0,.15,.02,.2,r)}function U_(n,e,t,i){let{classId:s,hands:r}=e,a=o=>r.includes(o);if(a("sword")&&(n(-.34,.38,.09,.055,.1,.055,e.leather),n(-.34,.45,.09,.17,.035,.075,i),n(-.34,.72,.09,.05,.5,.04,Pi)),a("shield")){let o=s==="fighter"?e.cloth:e.p.cloth;n(.33,.5,.17,.27,.38,.05,i),n(.33,.5,.2,.21,.32,.03,o),n(.33,.5,.222,.03,.18,.02,i),n(.33,.53,.222,.13,.03,.02,i)}if(a("bow")){for(let o=0;o<5;o++)n(-.34-Math.abs(o-2)*-.02,.36+o*.12,.1,.06,.16,.05,10648640);n(-.4,.6,.1,.02,.6,.02,12957841)}a("staff")&&s==="wizard"&&(n(-.36,.62,.08,.05,.9,.05,rh),n(-.36,1.1,.08,.13,.06,.13,i),n(-.36,1.2,.08,.09,.13,.09,e.gem,!0)),a("staff")&&s!=="wizard"&&(n(-.34,.58,.09,.05,.82,.05,rh),n(-.34,1.04,.09,.15,.15,.15,Gd),n(-.34,1.04,.09,.19,.04,.19,i),n(-.34,1.04,.09,.04,.19,.19,i)),e.book&&n(-.3,.45,.13,.13,.16,.045,8007471)}function F_(){let s=[],r=(a,o,l,c,u,d,h)=>s.push([a,o,l,c,u,d,h,!1]);r(0,.46,-.07,.43,.34,.63,6841435),r(0,.56,.16,.37,.33,.28,6841435);for(let a of[-.15,.15])for(let o of[-.26,.17])r(a,.255,o,.13,.27,.14,6841435),r(a,.13,o+.03,.16,.09,.19,4539711);r(0,.71,.32,.4,.36,.37,6841435),r(0,.6,.5,.24,.13,.2,11511440),r(0,.64,.61,.09,.06,.04,1645337);for(let a of[-.13,.13])r(a,.94,.28,.105,.16,.125,6841435),r(a,.947,.348,.047,.082,.014,11511440),r(a,.744,.514,.036,.044,.018,1645337);return r(0,.55,-.49,.13,.13,.31,4539711),s}function Hd(n={},{texel:e=!0}={}){if(!n)return null;if(n.visual==="bandit"){let i=n.gen||{classId:"rogue",gender:"male",look:{},hands:["sword","empty"]},s=Xr(5,{gen:i});return{visual:"bandit",spec:s,boxes:gl(s,{texel:e})}}let t;if(n.visual==="beast")t=F_();else if(n.visual==="training")t=hl({},4).parts.map(i=>[i.x,i.y,i.z,i.w,i.h,i.d,parseInt(i.color.slice(1),16),!1]);else return null;return{visual:n.visual,boxes:e?[...t,...Ji(t,()=>n.visual==="beast"?"hair":"other")]:t}}function Wd(n,e,t){let i=null,s=()=>{i=null};return n.addEventListener("pointerdown",s,!0),e.addEventListener("pointerdown",r=>{let a=r.target.closest("button[data-action]");i=a?{button:a,context:t()}:null,r.stopPropagation()}),e.addEventListener("pointercancel",s),{clear:s,accept(r,a){let o=r.detail===0||!!i&&i.button===a&&i.context===t();return s(),o}}}var O_=Ed(),Mt=document.getElementById("viewport"),Un=document.createElement("canvas");Un.id="voxel-canvas";Un.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430: \u0434\u0432\u0438\u0433\u0430\u0439\u0442\u0435 \u043E\u0434\u043D\u0438\u043C \u043F\u0430\u043B\u044C\u0446\u0435\u043C, \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0439\u0442\u0435 \u0434\u0432\u0443\u043C\u044F");Mt.prepend(Un);var At=document.createElement("div");At.setAttribute("role","group");At.tabIndex=-1;var Ml=Wd(document,At,()=>{let n=window.objectPrompt?.p;return JSON.stringify([Te.state.world?.id,Te.state.scene,n?.id||[n?.x,n?.y],At.dataset.signature])});At.onclick=n=>{n.stopPropagation();let e=window.objectPrompt,t=n.target.closest("button[data-action]");if(!Ml.accept(n,t))return;let i=t&&e?.actions?.find(s=>s.id===t.dataset.action);i?.enabled&&(Te.dismissMapActions(),i.run?.())};At.addEventListener("keydown",n=>{n.key==="Escape"&&Te.mapTap(null)});At.className="object-prompt";At.hidden=!0;Mt.append(At);var pt;try{pt=new Hr({canvas:Un,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(n){throw Un.remove(),Mt.insertAdjacentHTML("afterbegin",'<p class="webgl-note">\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u0441\u0446\u0435\u043D\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u043B\u043E\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C.</p>'),n}pt.setPixelRatio(Math.min(window.devicePixelRatio||1,1));pt.shadowMap.enabled=!0;pt.shadowMap.type=Wi;pt.outputColorSpace=bt;pt.toneMapping=Vs;pt.toneMappingExposure=1.25;var Fn=new En;Fn.background=new Le("#0b1919");var Xt=new hn(-4,4,6,-6,.1,80),Nn=new Ke,Yr=new Ke,Js=new Ke;Fn.add(Nn,Yr,Js);var wl=new En,Xd=new Cn({color:16777215,toneMapped:!1,side:xn}),$s=new Ht(390,520,{depthBuffer:!0}),Ki=[];wl.background=new Le(0);var js=null,hh="",ci=null,xl,qd,Yd,jd=new En,B_=new hn(-1,1,1,-1,0,2),Rl=new Jt({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{mask:{value:$s.texture},texel:{value:new Oe(1/390,1/520)},gold:{value:new Le(16764534)}},vertexShader:"varying vec2 uvMask;void main(){uvMask=uv;gl_Position=vec4(position.xy,0.0,1.0);}",fragmentShader:"uniform sampler2D mask;uniform vec2 texel;uniform vec3 gold;varying vec2 uvMask;void main(){float center=texture2D(mask,uvMask).r;float edge=0.0;for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){edge=max(edge,texture2D(mask,uvMask+vec2(float(x),float(y))*texel).r);}}float alpha=step(0.4,edge)*(1.0-step(0.4,center));gl_FragColor=vec4(gold,alpha*0.95);}"});jd.add(new je(new In(2,2),Rl));function Qd(n){let e=n?.userData.hinge||n||null;if(e!==js){for(let t of Ki)wl.remove(t),t.isInstancedMesh&&t.dispose();Ki.length=0,js=e,hh="",e&&(e.updateWorldMatrix(!0,!0),e.traverse(t=>{if(!t.isMesh||t.userData.contactShadow)return;for(let s=t;s&&s!==e.parent;s=s.parent)if(!s.visible)return;let i;if(t.isInstancedMesh){i=new ln(t.geometry,Xd,t.count);for(let s=0;s<t.count;s++){let r=new We;t.getMatrixAt(s,r),i.setMatrixAt(s,r)}}else i=new je(t.geometry,Xd);i.matrixAutoUpdate=!1,i.userData.source=t,wl.add(i),Ki.push(i)}))}}var ef=new ri(12507101,3159078,.38);Fn.add(ef);var ph=new oi(11912909,.5);ph.position.set(3,10,5);Fn.add(ph);var Tl=document.createElement("canvas");Tl.width=Tl.height=64;var mh=Tl.getContext("2d"),Il=mh.createRadialGradient(32,32,5,32,32,31);Il.addColorStop(0,"rgba(12,18,20,.24)");Il.addColorStop(.55,"rgba(12,18,20,.12)");Il.addColorStop(1,"rgba(12,18,20,0)");mh.fillStyle=Il;mh.fillRect(0,0,64,64);var k_=new Hn(Tl),z_=new Cn({map:k_,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});function uh(n,e=.78,t=.65){let i=new je(new In(e,t),z_);i.rotation.x=-Math.PI/2,i.position.y=.012,i.userData.contactShadow=!0,n.add(i)}var Qs=new gn(1,1,1),oh=new Map,ht=new Map,er=new Map,$i=[],Ks=[],Zd=new Map;pt.shadowMap.autoUpdate=!1;var Te,tf="";var Ft=5.2,Jn={x:5.5,z:9.5},Jr=!1,_l=0;var hi;var Di=(n,e=!1)=>{let t=n+":"+e;return oh.has(t)||oh.set(t,e?new Cn({color:n,toneMapped:!1}):new Qt({color:n,roughness:.92,metalness:n===12820556?.35:0})),oh.get(t)};function ji(n,e,t,i,s,r,a,o,l=!1){let c=new je(Qs,Di(o,l));return c.position.set(e,t,i),c.scale.set(s,r,a),c.castShadow=!l,c.receiveShadow=!l,n.add(c),c}function Ot(n){for(let i of n.children.filter(s=>s.isGroup))Ot(i);let e=n.children.filter(i=>i.isMesh&&!i.isInstancedMesh&&i.userData.decal);if(e.length){let i=new Qt({color:16777215,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),s=new ln(Qs,i,e.length);s.frustumCulled=!1,s.userData.disposeMaterial=!0,e.forEach((r,a)=>{r.updateMatrix(),s.setMatrixAt(a,r.matrix),s.setColorAt(a,r.material.color),n.remove(r)}),s.userData.decal=!0,s.castShadow=!1,s.receiveShadow=!0,s.instanceMatrix.needsUpdate=!0,s.instanceColor.needsUpdate=!0,n.add(s)}let t=new Map;for(let i of n.children.filter(s=>s.isMesh&&!s.isInstancedMesh&&!s.userData.decal&&s.geometry===Qs)){let s=i.material.uuid+":"+i.castShadow+":"+i.receiveShadow;t.has(s)||t.set(s,[]),t.get(s).push(i)}for(let i of t.values()){if(i.length<2)continue;let s=new ln(Qs,i[0].material,i.length);i.forEach((r,a)=>{r.updateMatrix(),s.setMatrixAt(a,r.matrix),n.remove(r)}),s.castShadow=i[0].castShadow,s.receiveShadow=i[0].receiveShadow,n.add(s)}return n}var Sl=n=>new Le(n).getHex();function nf(n){let e=n>>16&255,t=n>>8&255,i=n&255;return[12820556,3752007,4278346,12109511,11782341,10203059,11581626,5524279].includes(n)?"metal":[7878449,7880250,8010038,8735040,5666672,8797013,11620717,6895950].includes(n)?"cloth":Math.abs(e-t)<18&&Math.abs(t-i)<18?"metal":"other"}function Zr(n,e){let t=ji(n,...e.slice(0,8));return t.userData.decal=!0,t.castShadow=!1,t.userData.decalFace=e[8],t}function N(n,e,t,i,s,r,a,o,l=!1){let c=ji(n,e,t,i,s,r,a,o,l),u=[e,t,i,s,r,a,Sl(o),l];for(let d of Ji([u],nf,Ri.size,{minDepth:.008}))Zr(n,d);return c}var lh=new Map,ch=new Map;function Qi(n,e=8){if(!lh.has(e)){let i=document.createElement("canvas");i.width=i.height=e;let s=i.getContext("2d");for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a===0||o===0?255:a===e-1||o===e-1?218:(o*31+a*17)%11===0?232:248;s.fillStyle=`rgb(${l},${l},${l})`,s.fillRect(o,a,1,1)}let r=new Hn(i);r.colorSpace=bt,r.magFilter=r.minFilter=vt,r.generateMipmaps=!1,lh.set(e,r)}let t=n+":"+e;return ch.has(t)||ch.set(t,new Qt({color:n,map:lh.get(e),roughness:1})),ch.get(t)}function Pl(n){return n.traverse(e=>{e.isMesh&&(e.castShadow=!1,e.receiveShadow=!1)}),n}function V_(n){let e=new je(new Rn(.38,.4,.1,24),Di(3749436));e.position.y=.08,e.castShadow=!0,e.receiveShadow=!0,n.add(e);let t=new je(new Rn(.395,.4,.035,24),Di(5262419));t.position.y=.035,n.add(t)}function G_(n,e){if(["chest","crate"].includes(e.type)){let s=e.type==="chest"?.263:.305;for(let r of[-.15,0,.15])N(n,r,.27,s,.012,.29,.007,6899502);if(e.type==="chest"){N(n,0,.33,.278,.03,.04,.015,3752007);for(let r of[-.24,.24])for(let a of[.14,.43])N(n,r,a,.263,.018,.018,.02,12820556);for(let r of[-.12,.04,.16])N(n,0,.553,r,.52,.009,.012,6899502)}}if(e.type==="barrel"){for(let s=0;s<12;s++){let r=s*Math.PI/6,a=ji(n,Math.sin(r)*.259,.285,Math.cos(r)*.259,.011,.5,.012,6899502);a.rotation.y=r}for(let s of[-.12,0,.12])N(n,s,.571,0,.009,.008,.33,6899502)}if(e.type==="books")for(let s=0;s<3;s++)for(let r=0;r<5;r++){let a=-.25+r*.12,o=.4+s*.38;for(let l of[-.075,.075])N(n,a,o+l,.233,.065,.016,.012,12820556);(r===1||r===4)&&N(n,a,o,.239,.038,.035,.009,13482893)}if(e.type==="desk"){for(let s of[-.21,-.06,.1,.23])N(n,0,.666,s,.76,.007,.01,6899502);N(n,.1,.71,.07,.011,.014,.23,8088650);for(let s=0;s<3;s++)for(let r of[-.02,.18])N(n,r,.709,-.004+s*.053,.06,.009,.008,8088650);N(n,.3,.713,-.2,.055,.1,.055,3752007),N(n,.27,.76,-.2,.015,.16,.015,13482893)}if(e.type==="door"||e.type==="portal"){let s=n.userData.hinge;for(let r of[.1,.21,.33,.44])N(s,r,.51,.056,.01,.89,.011,6899502);N(s,.28,.74,.06,.54,.055,.024,3752007);for(let r of[.08,.49])for(let a of[.38,.74])N(s,r,a,.084,.025,.025,.02,12820556)}if(e.type==="cover"){for(let s of[-.21,.21])N(n,s,.483,0,.018,.008,.29,5859403);N(n,0,.483,-.14,.42,.008,.015,5859403)}if(e.type==="chair"){for(let s of[-.14,.14])N(n,s,.81,-.144,.014,.14,.012,6899502);N(n,0,.49,0,.3,.012,.013,9125164)}if(e.type==="banner"){for(let s of[-.23,.23])N(n,s,.58,.043,.015,.54,.01,12820556);N(n,0,.29,.043,.48,.015,.01,12820556)}}function Kr(n,e,t={}){let i=new Ke;t.base!==!1&&V_(i);let s=n===3?Hd(e,{texel:t.texel??window.Characters?.RULES.texel??!0}):null,r=s?.spec||(n!==3&&n!==4?Xr(n,e):null);if(s&&!r){i.userData.enemyVisual=s.visual;for(let a of s.boxes)a.length>8?Zr(i,a):ji(i,...a)}else if(r){i.userData.characterStyle=r;let a;if(t.articulated){a={};for(let[o,l]of Object.entries({head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]})){let c=new Ke;c.position.set(...l),i.add(c),a[o]=c}i.userData.rig=a}for(let o of s?.boxes||gl(r,{texel:t.texel??window.Characters?.RULES.texel})){let l=[...o],c=i;if(a){let[u,d]=l,h=Math.abs(u)>.29||Math.abs(u)>.19&&d<.74?u<0?"armL":"armR":d>=.74?"head":d<.4?u<0?"legL":"legR":"torso";c=a[h],l[0]-=c.position.x,l[1]-=c.position.y,l[2]-=c.position.z}l.length>8?Zr(c,l):ji(c,...l)}}else{let{profile:a,parts:o}=hl(e||{},n);i.userData.characterStyle=a;let l=[];for(let h of o){let p=ji(i,h.x,h.y,h.z,h.w,h.h,h.d,h.color);p.rotation.z=h.rz,h.rz||l.push([h.x,h.y,h.z,h.w,h.h,h.d,Sl(h.color),!1])}let c=Sl(a.skin),u=Sl(a.cloth),d=h=>n===3&&h===c?"skin":n===4&&h===u?"other":nf(h);for(let h of Ji(l,d))Zr(i,h)}return Ot(i)}function Ll(){let n=new Ke;N(n,0,.23,0,.05,.43,.05,5585186),N(n,0,.44,0,.09,.08,.09,5391923);let e=[];for(let t=0;t<3;t++){let i=N(n,0,.51+t*.085,0,.095-t*.025,.12,.085-t*.025,[15038244,16758855,16768133][t],!0);i.userData.rest=i.position.clone(),e.push(i)}return n.userData.flames=e,Pl(n)}function sf(){let n=new Ke,e=[],t=new je(new Fs(.38,.028,6,24),Di(5524279));t.rotation.x=Math.PI/2,t.position.y=1.58,n.add(t);for(let i=0;i<6;i++){let s=i*Math.PI/3,r=Math.cos(s)*.38,a=Math.sin(s)*.38;N(n,r,1.68,a,.055,.19,.055,14534033);let o=N(n,r,1.83,a,.045,.1,.045,16764792,!0);o.userData.rest=o.position.clone(),e.push(o)}return n.userData.flames=e,Pl(n),n.traverse(i=>{i.isMesh&&(i.userData.disposeMaterial=!0,i.material=new Cn({color:i.material.color.clone(),transparent:!0,depthWrite:!1,toneMapped:!1}))}),n}function Jd(n,e=!1){n.castShadow=e,n.shadow.autoUpdate=!1,n.shadow.needsUpdate=e,n.shadow.mapSize.set(128,128),n.shadow.radius=1.8,n.shadow.bias=-.001,n.shadow.normalBias=.035,n.shadow.camera.near=.06,n.shadow.camera.far=12}function H_(n){let e=new Ke,t=7886126,i=12820556,s=13352345,r=10203059;if(n===40)N(e,0,.55,0,.58,.69,.15,6895950),N(e,.02,.55,.09,.49,.58,.035,s),N(e,-.26,.55,.11,.07,.69,.04,8408420),N(e,.14,.51,.13,.11,.13,.025,i);else if(n===41){let a=new je(new Us(.24),Di(6530741));a.position.y=.75,e.add(a),N(e,0,.4,0,.13,.22,.13,i),N(e,0,.28,0,.34,.08,.29,t)}else if(n===42){N(e,0,.55,0,.57,.58,.25,7953470),N(e,0,.87,0,.48,.09,.28,9795409),N(e,0,.46,.15,.35,.23,.07,10453079);for(let a of[-.18,.18])N(e,a,.64,.15,.045,.5,.035,5192232),N(e,a,.67,.18,.07,.08,.025,i);N(e,0,.96,0,.23,.055,.08,t)}else if(n===43){N(e,-.15,.43,0,.28,.27,.25,3229524),N(e,-.15,.62,0,.16,.1,.15,r),N(e,.18,.58,0,.035,.61,.035,t);for(let a=0;a<5;a++)N(e,.18+a*.022,.75+a*.045,0,.08,.08,.035,s)}else if(n===44)N(e,0,.4,0,.57,.2,.36,s),N(e,.02,.59,0,.41,.16,.29,10056013),N(e,-.15,.74,.06,.2,.1,.12,12752737),N(e,.19,.72,0,.1,.15,.12,7685938),N(e,0,.41,.19,.06,.23,.025,t);else if(n===45)N(e,0,.62,0,.59,.58,.1,r),N(e,0,.38,0,.39,.18,.1,r),N(e,0,.6,.065,.48,.48,.03,4745336),N(e,0,.6,.095,.06,.5,.025,i),N(e,0,.6,.095,.42,.06,.025,i);else if(n===46){N(e,0,.63,0,.48,.53,.14,r);for(let a of[-.32,.32])N(e,a,.81,0,.19,.17,.18,r);N(e,0,.34,0,.53,.1,.18,t);for(let a=0;a<5;a++)for(let o=0;o<4;o++)N(e,-.18+o*.12,.43+a*.09,.085,.04,.026,.012,12634562)}else if(n===47){for(let a=0;a<4;a++){let o=new je(new Fs(.23,.035,4,16),Qi(12558699));o.position.set(0,.58,(a-1.5)*.055),e.add(o)}N(e,.22,.32,0,.04,.25,.04,12558699)}else if(n===48){N(e,0,.38,0,.54,.23,.17,t);for(let a=0;a<4;a++)N(e,-.18+a*.12,.62,.02,.025,.39,.025,r),N(e,-.15+a*.12,.81,.02,.08,.025,.025,r)}else if(n===49){N(e,0,.57,0,.59,.29,.25,6518117),N(e,0,.55,.15,.58,.2,.04,8557956);for(let a of[-.18,.18])N(e,a,.57,0,.035,.32,.29,t)}else if(n===50)N(e,0,.47,0,.56,.24,.25,t),N(e,-.12,.64,0,.24,.08,.16,r),N(e,.15,.63,0,.16,.13,.17,6252658),N(e,0,.34,.15,.38,.05,.035,i);else if(n===51)N(e,0,.48,0,.065,.7,.065,t),N(e,0,.88,0,.3,.24,.25,r),N(e,0,1.03,0,.09,.06,.09,i);else if(n===52)N(e,0,.6,0,.09,.64,.07,i),N(e,0,.73,0,.41,.085,.07,i),N(e,0,.29,0,.27,.08,.15,t);else if(n===53){N(e,0,.56,0,.49,.31,.22,s);for(let a=0;a<4;a++)N(e,0,.44+a*.07,.13,.45,.018,.02,15787468);N(e,0,.55,.15,.13,.13,.035,11363932)}else N(e,0,.57,0,.14,.53,.12,14736841);return Ot(e)}function rf(n){if(n>=40)return H_(n);let e=new Ke,t=12820556,i=7886126;if(n===37)return Ll();if(n===31){for(let s=0;s<9;s++){let r=.2+s*.085,a=.15*Math.sin(s/8*Math.PI);N(e,a,r,0,.045,.11,.05,i)}N(e,0,.55,0,.015,.7,.02,14141844)}else if(n===32)N(e,0,.72,0,.07,.65,.045,12109511),N(e,0,.39,0,.3,.055,.07,t),N(e,0,.25,0,.07,.23,.07,i);else if(n===33){N(e,0,.58,0,.055,.91,.055,i);let s=new je(new Us(.15),Di(6539481,!0));s.position.y=1.12,e.add(s)}else if(n===34)N(e,0,.46,0,.32,.37,.3,8797013),N(e,0,.47,.17,.22,.23,.025,11620717),N(e,0,.74,0,.15,.2,.14,11782341),N(e,0,.86,0,.18,.07,.17,i);else if(n===35)for(let s=0;s<6;s++){let r=new je(new Rn(.21,.21,.05,12),Qi(t));r.position.set(s%2*.12-.06,.3+s*.055,s%3*.05),e.add(r)}else if(n===36){N(e,0,.47,0,.52,.66,.025,14140829);for(let s=0;s<5;s++)N(e,0,.64-s*.07,.022,.36-s%2*.08,.012,.008,8088650);N(e,.12,.28,.025,.1,.1,.025,9192504)}else N(e,0,.52,0,.075,.66,.075,t),N(e,0,.2,0,.18,.12,.18,t);return Ot(e)}function jr(n){let e=new Ke,t=6899502,i=12820556,s=8094328;if(n.model&&window.Props){let r=window.Props.build(n);if(r){for(let a of r)a.length>8?Zr(e,a):ji(e,...a);return Ot(e)}}if(n.portalKind){N(e,0,.035,0,.86,.07,.88,2304293);for(let r=0;r<4;r++){let a=n.portalKind==="stairs-up"?.16+r*.16:.08+r*.035;N(e,0,a/2+.07,.3-r*.2,.63,a,.18,t)}for(let r of[-.4,.4])N(e,r,.16,0,.08,.24,.96,9992270);return Ot(e)}switch(n.type){case"tree":{N(e,0,.58,0,.22,1.16,.22,7360567);let r=[4750141,6521672,3765067][n.variant||0];return N(e,0,1.3,0,.9,.55,.88,r),N(e,-.12,1.7,.02,.68,.38,.65,r),N(e,.16,1.95,-.04,.42,.22,.42,r),Ot(e)}case"shelf":for(let r of[-.38,.38])N(e,r,.58,-.26,.08,1.16,.12,t);for(let r of[.16,.56,.96]){N(e,0,r,0,.84,.07,.48,t);for(let a=0;a<3;a++)N(e,-.26+a*.26,r+.14,0,.15,.21,.22,[11901029,7901276,10841672][a])}return Ot(e);case"stove":return N(e,0,.32,0,.86,.64,.76,7959144),N(e,0,.35,.39,.5,.35,.02,2696738),N(e,0,.25,.405,.34,.09,.02,14647605,!0),N(e,0,.68,0,.94,.08,.84,4803912),N(e,0,.83,0,.35,.23,.35,3751484),N(e,0,1.14,-.29,.3,.8,.24,7828070),Ot(e);case"cart":N(e,0,.39,0,.63,.12,.8,t);for(let r of[-.3,.3])N(e,r,.6,0,.07,.36,.8,t);N(e,0,.57,-.37,.63,.32,.06,t);for(let r of[-.38,.38])for(let a of[-.25,.25])N(e,r,.24,a,.1,.3,.3,4278080);return N(e,-.12,.6,0,.25,.3,.34,11311473),N(e,.15,.58,.18,.22,.27,.26,9863254),Ot(e);case"counter":N(e,0,.35,0,.96,.7,.66,t),N(e,0,.75,0,.99,.1,.8,9859915),N(e,0,.36,.34,.72,.48,.03,8608823),N(e,.23,.86,.1,.12,.13,.12,13482893);break;case"table":for(let r of[-.31,.31])for(let a of[-.26,.26])N(e,r,.28,a,.08,.56,.08,t);N(e,0,.61,0,.85,.12,.78,9859915),N(e,-.16,.71,.04,.24,.08,.17,12491365),N(e,.2,.76,-.16,.12,.18,.12,13482893);break;case"lantern":N(e,0,.06,0,.5,.12,.5,s),N(e,0,.65,0,.12,1.22,.12,t),N(e,0,1.4,0,.3,.36,.3,4278346),N(e,0,1.4,.16,.19,.24,.02,16763254,!0),N(e,0,1.62,0,.4,.08,.4,t),Pl(e);break;case"waymark":N(e,0,.025,0,.74,.04,.74,9992270),N(e,0,.051,0,.52,.015,.06,i),N(e,0,.051,0,.06,.015,.52,i);break}if(["counter","table","lantern","waymark"].includes(n.type))return Ot(e);switch(n.type){case"clue":for(let o=0;o<4;o++){let l=N(e,(o%2-.5)*.18,.014,(o-1.5)*.13,.075,.014,.11,8549474);l.castShadow=!1}return Ot(e);case"torch":return Ll();case"chandelier":return sf();case"barrel":{let o=new je(new Rn(.24,.26,.55,12),Qi(7754290));o.position.y=.29,o.castShadow=!0,o.receiveShadow=!0,e.add(o);for(let l of[.13,.44]){let c=new je(new Rn(.255,.255,.045,12),Di(4278346));c.position.y=l,e.add(c)}N(e,0,.58,0,.04,.012,.42,5782566);break}case"crate":N(e,0,.28,0,.61,.55,.55,7886135);for(let o of[-.24,.24])N(e,o,.28,.287,.055,.57,.025,10517322),N(e,o,.57,0,.055,.028,.56,10517322);for(let o of[.06,.5])N(e,0,o,.29,.6,.045,.025,10254407);break;case"chair":for(let o of[-.2,.2])for(let l of[-.17,.17])N(e,o,.2,l,.065,.4,.065,t);N(e,0,.41,0,.5,.08,.44,8411961),N(e,0,.465,0,.4,.04,.35,7880250);for(let o of[-.21,.21])N(e,o,.64,-.18,.065,.55,.065,t);N(e,0,.81,-.18,.47,.22,.055,8411961);break;case"planter":{let o=new je(new Rn(.22,.14,.3,12),Qi(8540984));o.position.y=.17,o.castShadow=!0,o.receiveShadow=!0,e.add(o);for(let l=0;l<5;l++){let c=(l%3-1)*.09,u=(l%2-.5)*.15,d=.48+l%3*.07;N(e,c,.4,u,.025,.35,.025,5401661),N(e,c+.055,d,u,.13,.045,.055,6587210),n.id==="lilies"&&(N(e,c,d+.11,u,.12,.035,.055,14998957),N(e,c,d+.11,u,.055,.035,.12,15656635),N(e,c,d+.13,u,.035,.035,.035,i))}break}case"scrolls":N(e,0,.3,0,.61,.09,.45,8411702);for(let o of[-.24,.24])N(e,o,.15,0,.06,.29,.34,t);for(let o=0;o<3;o++){let l=new je(new Rn(.07,.07,.4,10),Qi(13746588));l.rotation.z=Math.PI/2,l.position.set(0,.43+o*.07,(o-1)*.1),l.castShadow=!0,e.add(l)}break;case"rack":for(let o of[-.3,.3])N(e,o,.47,0,.08,.9,.12,t);N(e,0,.69,0,.69,.085,.12,9135937);for(let o of[-.18,.04])N(e,o,.52,.13,.055,.6,.045,11581626),N(e,o,.8,.13,.19,.045,.075,i),N(e,o,.88,.13,.045,.12,.05,t);N(e,.27,.4,.1,.22,.32,.07,3957378),N(e,.27,.4,.145,.025,.23,.018,i);break;case"banner":N(e,0,.9,0,.65,.055,.08,t),N(e,0,.58,.02,.52,.61,.035,8010038),N(e,0,.58,.043,.04,.33,.02,i),N(e,0,.64,.046,.21,.04,.022,i);break;case"ground-item":N(e,0,.12,0,.34,.22,.29,8807746),N(e,0,.24,0,.26,.04,.22,11703654),N(e,0,.25,0,.05,.02,.2,5587501);break;case"npc":return Kr(5,{npcId:n.id,gen:n.npc});case"chest":N(e,0,.25,0,.64,.4,.45,t),N(e,0,.49,0,.62,.12,.43,8411193);for(let o of[-.24,.24])N(e,o,.3,.237,.05,.46,.035,i);N(e,0,.32,.25,.12,.13,.04,i);break;case"cover":N(e,0,.15,0,.7,.26,.65,4742496),N(e,0,.36,0,.64,.17,.57,s),N(e,0,.46,0,.47,.035,.4,9278855);break;case"altar":N(e,-.3,.3,0,.12,.5,.4,t),N(e,.3,.3,0,.12,.5,.4,t),N(e,0,.59,0,.86,.12,.58,11973019),N(e,0,.36,.3,.35,.43,.022,7878449);for(let o of[-.22,0,.22]){let l=N(e,o,.75,0,.05,.22,.05,14531961);l.castShadow=!1,l.receiveShadow=!1,N(e,o,.9,0,.05,.1,.05,16758594,!0)}break;case"books":N(e,0,.65,0,.65,1.25,.28,t);for(let o=0;o<3;o++){N(e,0,.25+o*.38,.2,.72,.065,.46,8674872);for(let l=0;l<5;l++)N(e,-.25+l*.12,.4+o*.38,.13,.08,.22+l%2*.05,.19,[8735040,5666672,11772783][l%3])}break;case"desk":for(let o of[-.32,.32])for(let l of[-.22,.22])N(e,o,.32,l,.075,.56,.075,t);N(e,0,.61,0,.86,.1,.64,8805950),N(e,.1,.68,.07,.35,.04,.28,13482893);let r=N(e,-.28,.76,-.14,.04,.24,.04,14927999);r.castShadow=!1,r.receiveShadow=!1;break;case"door":case"portal":N(e,-.37,.56,0,.15,1.12,.3,s),N(e,.37,.56,0,.15,1.12,.3,s),N(e,0,1.09,0,.72,.15,.31,s);let a=new Ke;a.position.x=-.28,N(a,.28,.52,0,.56,1.02,.1,t),N(a,.28,.38,.06,.54,.06,.024,3752007),N(a,.45,.57,.075,.06,.07,.035,i),e.add(a),e.userData.hinge=a,e.userData.axis=n.axis,n.axis==="horizontal"&&(e.rotation.y=Math.PI/2);break;case"decor":N(e,0,.52,0,.55,.95,.17,s),N(e,0,.6,.1,.33,.67,.03,4685194),N(e,0,.58,.122,.025,.67,.024,9812405);break}return G_(e,n),Ot(e)}var yl;function W_(){if(yl)return yl;let n=document.createElement("canvas");n.width=256,n.height=384;let e=n.getContext("2d");e.fillStyle="#823c36",e.fillRect(0,0,256,384),e.strokeStyle="#c3a168",e.lineWidth=4,e.strokeRect(12,12,232,360),e.lineWidth=2,e.strokeRect(22,22,212,340),e.save(),e.translate(128,192),e.beginPath(),e.arc(0,0,40,0,Math.PI*2),e.stroke();for(let i=0;i<12;i++)e.save(),e.rotate(i*Math.PI/6),e.beginPath(),e.moveTo(-6,-49),e.lineTo(0,-65),e.lineTo(6,-49),e.closePath(),e.fillStyle="#c3a168",e.fill(),e.restore();e.restore();for(let i of[63,321])e.beginPath(),e.moveTo(128,i-22),e.lineTo(150,i),e.lineTo(128,i+22),e.lineTo(106,i),e.closePath(),e.stroke();let t=new Hn(n);return t.colorSpace=bt,yl=new Qt({map:t,roughness:1}),yl}var Li;function X_(){let n=Te.scene,e=n.visualSeed??Te.state.seed;tf=n.id+":"+(n.layoutKey||"")+":"+Te.state.party.map(a=>a.id).join(","),Qd(null);for(let a of $i)a.light.shadow.dispose();$d(Nn),$d(Yr),ht.clear(),Zd.clear(),$i.length=0,er.clear(),Li=null;let t=new Map,i=null;function s(a,o,l,c,u,d,h,p=i){let _=p===null?h:"stone:"+p;t.has(_)||t.set(_,[]),t.get(_).push([a,o,l,c,u,d])}for(let a=0;a<n.H;a++)for(let o=0;o<n.W;o++){let l=World.tile(n,o,a),c=(o*113+a*71+e)%11/100;if(l==="floor"){let u=n.ground?.[a]?.[o]==="grass",d=window.WorldGen?.SURFACE_BY_CODE[n.surface?.[a]?.[o]];i=ll({surface:d,grass:u,outdoor:n.outdoor,id:n.id},o,a);let h=new Le(d?WorldGen.surfaceColor(d,o,a):u?5405500:n.id==="proc-tavern"?6836539:n.outdoor?9930866:4544347);h.offsetHSL(0,-c*.3,c*.24),s(o+.5,-.095,a+.5,1,.17,1,h.getHex());let p=(o*37+a*61+e)%17;(o*7+a*13)%19===0&&s(o+.7,.005,a+.24,.16,.007,.18,5859403,null)}else if(l==="wall"){if(i=ll({wall:!0,wallStyle:n.wallStyle},o,a),n.props.some(p=>["door","portal"].includes(p.type)&&p.x===o&&p.y===a)){s(o+.5,-.095,a+.5,1,.17,1,4544347,i===null?null:ll({},o,a));continue}if(n.outdoor&&a!==1){s(o+.5,.1,a+.5,.99,.2,.99,n.wallStyle?WorldGen.wallColor(n.wallStyle,o,a):7501415);continue}let u=World.tile(n,o,a-1)==="floor"&&!n.lights.some(p=>p.wallX===o&&p.wallY===a),d=u?.48:.94;for(let p=0;p<(u?2:4);p++){let _=new Le(n.wallStyle?WorldGen.wallColor(n.wallStyle,o,a):8486504);_.offsetHSL(0,-c,.01*(p%2)),p%2?(s(o+.125,.12+p*.235,a+.5,.22,.22,.97,_.getHex()),s(o+.5,.12+p*.235,a+.5,.47,.22,.97,_.getHex()),s(o+.875,.12+p*.235,a+.5,.22,.22,.97,_.getHex())):(s(o+.25,.12+p*.235,a+.5,.47,.22,.97,_.getHex()),s(o+.75,.12+p*.235,a+.5,.47,.22,.97,_.getHex()))}s(o+.5,d+.03,a+.5,.99,.06,.99,9671035),(o*19+a*43+e)%13===7&&s(o+.82,d+.064,a+.76,.11,.009,.08,7568982,null)}}for(let[a,o]of t){let l=typeof a=="string"?O_(Number(a.slice(6))):Qi(a,o.some(h=>h[1]>.05)?2:8),c=new ln(Qs,l,o.length),u=new We,d=new mn;o.forEach(([h,p,_,x,m,f],M)=>{u.compose(new B(h,p,_),d,new B(x,m,f)),c.setMatrixAt(M,u)}),c.castShadow=o.some(h=>h[1]>.12),c.receiveShadow=!0,Nn.add(c)}let r=[];for(let a of n.props){if(["torch","chandelier"].includes(a.type))continue;let o=jr(a);o.position.set(a.x+.5,0,a.y+.5),a.type==="npc"&&(o.userData.idleFacing=Ad(n,a,Te.state.world?.gen?.seed||Te.state.procedural?.seed||Te.state.world?.id||"")),a.solid!==!1&&!["door","portal","decor","banner"].includes(a.type)&&uh(o,.88,.78),o.userData.p=a,Nn.add(o),ht.set("prop:"+a.id,o),a.type==="door"&&Zd.set(a.id,o),!["npc","door","portal","chest","ground-item","torch","chandelier"].includes(a.type)&&!a.container&&r.push(o)}Li=Rd(r,Nn);for(let a of n.decor)if(a.kind==="bench"){let o=new Ke;N(o,0,.35,0,.88,.13,.35,7950386),N(o,0,.56,-.15,.88,.32,.07,6833454);for(let l of[-.32,.32])N(o,l,.18,0,.095,.3,.33,5322275);Ot(o),uh(o,1,.55),o.position.set(a.x+.5,0,a.y+.5),Nn.add(o)}else{let o=new Ke,l=new je(new In(a.w-.08,a.h-.08),W_());l.rotation.x=-Math.PI/2,l.position.y=.016,l.receiveShadow=!0,o.add(l);for(let c of[-1,1])N(o,c*(a.w/2-.08),.017,0,.025,.006,a.h-.08,10979920);o.position.set(a.x-.5+a.w/2,0,a.y-.5+a.h/2),Nn.add(o)}for(let a of n.lights){let o=a.id==="altar",l=a.kind==="chandelier",c=a.kind==="fixture"?new Ke:l?sf():Ll(),u=c.userData.flames||[];if(a.kind==="wall"){c.position.set(a.x,.56,a.y);let h=new Ke;N(h,-a.dx*.18,.26,-a.dy*.18,a.dx?.045:.15,.23,a.dy?.045:.15,3752007),N(h,-a.dx*.09,.11,-a.dy*.09,a.dx?.24:.045,.04,a.dy?.24:.045,3752007),Ot(h),Pl(h);let p=new Ke;p.position.copy(c.position),c.position.set(0,0,0),p.add(h,c),p.userData.p=n.props.find(_=>_.id===a.fixtureId),p.userData.lightSource=a.id,Nn.add(p),ht.set("prop:"+a.fixtureId,p)}else c.position.set(a.x,0,a.y),c.userData.lightSource=a.id,l&&(c.userData.p=n.props.find(h=>h.id===a.id),ht.set("prop:"+a.id,c)),Nn.add(c);o&&(c.visible=!1);let d=new ai(16760192,a.intensity??(o?2:12),a.distance??8,2);d.position.set(a.x,a.height??(o?.96:1.22),a.y),Jd(d),Fn.add(d),$i.push({model:c,flames:u,light:d,source:a,chandelier:l})}for(let a of Te.state.party){let o=new ai(16760192,12,10,2);Jd(o,!0),o.visible=!1,Fn.add(o),$i.push({light:o,portable:!0,actorId:a.id,flames:[]})}pt.shadowMap.needsUpdate=!0,Jr=!0,document.body.classList.add("voxel-ready"),xh()}function bl(n){n.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.geometry&&e.geometry!==Qs&&e.geometry.dispose(),e.userData.disposeMaterial&&e.material.dispose()})}function $d(n){for(let e of[...n.children])bl(e),n.remove(e);for(let e of $i)Fn.remove(e.light)}function vl(n,e,t,i=.94){let s=[[-i/2,-i/2],[i/2,-i/2],[i/2,i/2],[-i/2,i/2],[-i/2,-i/2]].map(([a,o])=>new B(n+a,.025,e+o)),r=new Ds(new Et().setFromPoints(s),new Hi({color:t,transparent:!0,opacity:.8}));return Js.add(r),r}function gh(){if(Te=window.gameDebug,!Te)return;tf!==Te.scene.id+":"+(Te.scene.layoutKey||"")+":"+Te.state.party.map(l=>l.id).join(",")&&X_();let n=Te.props.filter(l=>l.type==="ground-item");for(let[l,c]of ht)c.userData.p?.type==="ground-item"&&!n.some(u=>"prop:"+u.id===l)&&(Nn.remove(c),bl(c),ht.delete(l));for(let l of n)if(!ht.has("prop:"+l.id)){let c=jr(l);c.position.set(l.x+.5,0,l.y+.5),c.userData.p=l,Nn.add(c),ht.set("prop:"+l.id,c)}let e=Te.all(),t=new Set(e.map(l=>l.id));for(let l of e){let c=ht.get(l.id),u=JSON.stringify([l.hands||[],l.appearance||null,l.classId,l.visual||null,l.gen||null]);if(c&&c.userData.loadout!==u&&(Yr.remove(c),bl(c),ht.delete(l.id),c=null),c||(c=Kr(l.dummy?4:l.kind,l),uh(c,.8,.68),c.userData.loadout=u,Yr.add(c),ht.set(l.id,c)),er.has(l.id)||(c.position.set(l.x+.5,0,l.y+.5),c.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][l.facing||0]),c.visible=!l.dead&&(l.kind<3||l.dummy||window.visibility?.canSee(Te.active(),l)!==!1),c.userData.p=l,l.kind<3){if(!c.userData.torch){let h=Ll();h.scale.setScalar(.7),h.position.set(l.hands?.indexOf("torch")===0?-.32:.32,.37,.07),c.add(h),c.userData.torch=h}let d=c.userData.torch;d.visible=!!l.hands?.includes("torch"),d.userData.flames.forEach(h=>h.visible=!!l.torch)}}for(let[l,c]of ht)!l.startsWith("prop:")&&!t.has(l)&&(Yr.remove(c),bl(c),ht.delete(l));let i=ht.get("prop:novice");i&&(i.visible=Te.props.some(l=>l.id==="novice"));for(let l of Te.props){let c=ht.get("prop:"+l.id);if(c){if(c.visible=!(l.type==="chest"&&Te.state.loot[Te.state.scene+":"+l.id]),l.type==="npc"){let u=window.viewsDebug?.speaker,d=u&&(u.id?u.id===l.id:u.name===l.name);c.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][d?Cd(l,Te.active()):c.userData.idleFacing??0]}if(c.userData.hinge){let u=l.type==="door"&&Te.isOpen(l)||Te.departingNpc?.doorId===l.id?-Math.PI*.48:0;c.userData.hinge.userData.goal=u,Te.animate()||(c.userData.hinge.rotation.y=u)}c.userData.staticBatched&&Li.update(c)}}for(;Js.children.length;){let l=Js.children[0];l.traverse(c=>{c.geometry&&!c.userData.silhouette&&c.geometry.dispose(),c.material&&c.material.dispose(),c.isInstancedMesh&&c.dispose()}),Js.remove(l)}let s=Te.selected&&Te.props.find(l=>l.x===Te.selected.x&&l.y===Te.selected.y),r=Te.selected&&e.find(l=>l.x===Te.selected.x&&l.y===Te.selected.y),a=s?ht.get("prop:"+s.id):r?ht.get(r.id):null;Qd(a);let o=Te.active();if(vl(o.x+.5,o.y+.5,9481331,.74),Te.state.world?.gen)for(let l of window.WorldGen.Runtime.knownTraps(window.GeneratedWorlds.host(),Te.scene))vl(l.x+.5,l.y+.5,14187064,.82);if(Te.selected){a||vl(Te.selected.x+.5,Te.selected.y+.5,14925430);let l=Te.route||[];if(l.length){let u=new ln(new gn(.06,.025,.06),new Cn({color:13023111}),l.length);l.forEach((d,h)=>u.setMatrixAt(h,new We().makeTranslation(d.x+.5,.027,d.y+.5))),Js.add(u)}let c=l.at(-1);c&&vl(c.x+.5,c.y+.5,10337165,.68)}ef.intensity=Te.state.settings.lights?.65+Te.state.settings.ambient*.45:.85,ph.intensity=Te.state.settings.lights?.43:.85,pt.shadowMap.enabled=Te.state.settings.lights;for(let l of $i)l.portable&&(l.light.shadow.needsUpdate=!0);pt.shadowMap.needsUpdate=!0,ui()}function Ni(){let n=Mt.clientWidth||390,e=Mt.clientHeight||520,t=n/e;Xt.left=-Ft*t,Xt.right=Ft*t,Xt.top=Ft,Xt.bottom=-Ft,Xt.position.set(Jn.x,12,Jn.z+8.4),Xt.lookAt(Jn.x,0,Jn.z),Xt.updateProjectionMatrix(),Xt.updateMatrixWorld()}function xh(){let n=Mt.clientWidth||390,e=Mt.clientHeight||520;pt.setSize(n,e,!1),$s.setSize(n,e),Rl.uniforms.texel.value.set(1/n,1/e),Ni(),ui()}function El(n){Jn={x:n.x+.5,z:n.y+.5},Ni(),ui()}function _h(){let n=Te.scene,e=(Mt.clientWidth||390)/(Mt.clientHeight||520);Ft=Math.max(n.H*.5*.819,n.W*.5/e)+.5,Jn={x:n.W/2,z:n.H/2},Ni(),ui()}function Dl(){Ft=4.8,El(Te.active())}function q_(){let n=$s.width,e=$s.height,t=[n,e,...Xt.matrixWorld.elements,...Xt.projectionMatrix.elements,...Ki.flatMap(i=>i.matrix.elements)].join(",");t!==hh&&((!ci||ci.image.width!==n||ci.image.height!==e)&&(ci?.dispose(),xl=new Uint8Array(n*e*4),qd=new Uint8Array(n*e),Yd=new Int32Array(n*e),ci=new Gi(xl,n,e,tn),ci.minFilter=ci.magFilter=vt,Rl.uniforms.mask.value=ci),pt.setRenderTarget($s),pt.render(wl,Xt),pt.readRenderTargetPixels($s,0,0,n,e,xl),Ld(xl,n,e,qd,Yd),ci.needsUpdate=!0,hh=t)}function ui(){if(Jr){if(window.CinematicMenu?.active){cf(performance.now());return}if(pt.setRenderTarget(null),pt.render(Fn,Xt),js&&js.visible&&Ki.length){js.updateWorldMatrix(!0,!0);for(let e of Ki)e.matrix.copy(e.userData.source.matrixWorld);q_(),pt.setRenderTarget(null);let n=pt.autoClear;pt.autoClear=!1,pt.render(jd,B_),pt.autoClear=n}}}var Al=new Ir,Y_=new an(new B(0,1,0),0);function af(n,e){let t=Mt.getBoundingClientRect();return Al.setFromCamera(new Oe((n-t.left)/t.width*2-1,-(e-t.top)/t.height*2+1),Xt),Al.ray.intersectPlane(Y_,new B)}var yn=new Map;Al.layers.enable(1);var $r=!1,es,dh,of=0,lf=0;Un.addEventListener("pointerdown",n=>{if(Un.setPointerCapture(n.pointerId),yn.set(n.pointerId,{x:n.clientX,y:n.clientY}),yn.size===1&&(es={x:n.clientX,y:n.clientY},dh={...Jn},$r=!1),yn.size===2){let[e,t]=[...yn.values()];of=Math.hypot(e.x-t.x,e.y-t.y),lf=Ft,$r=!0}});Un.addEventListener("pointermove",n=>{if(yn.has(n.pointerId)){if(yn.set(n.pointerId,{x:n.clientX,y:n.clientY}),yn.size===2){let[e,t]=[...yn.values()];Ft=un.clamp(lf*of/Math.max(20,Math.hypot(e.x-t.x,e.y-t.y)),2.8,15)}else if(es){let e=n.clientX-es.x,t=n.clientY-es.y;Math.hypot(e,t)>5&&($r=!0),$r&&(Jn.x=dh.x-e*2*Ft/(Mt.clientHeight||520),Jn.z=dh.z-t*2*Ft/(Mt.clientHeight||520)/.819)}Ni(),ui()}});Un.addEventListener("pointerup",n=>{if(!$r&&yn.size===1){let e=af(n.clientX,n.clientY),t=[...ht.values()].filter(s=>s.visible&&s.userData.p&&s.userData.p.type!=="chandelier"),i=Al.intersectObjects(t,!0);if(i.length){let s=i[0].object;for(;s&&!s.userData.p;)s=s.parent;if(s){let r=s.userData.p;Te.mapTap(r),yn.delete(n.pointerId),es=null;return}}e&&World.tile(Te.scene,Math.floor(e.x),Math.floor(e.z))!=="void"?Te.mapTap({x:Math.floor(e.x),y:Math.floor(e.z)}):Te.mapTap(null)}yn.delete(n.pointerId),es=null});Un.addEventListener("pointercancel",n=>{yn.delete(n.pointerId),es=null});Un.addEventListener("wheel",n=>{n.preventDefault(),Ft=un.clamp(Ft*Math.exp(n.deltaY*.001),2.8,15),Ni(),ui()},{passive:!1});for(let[n,e]of Object.entries({"zoom-in":()=>{Ft=Math.max(2.8,Ft*.8),Ni(),ui()},"zoom-out":()=>{Ft=Math.min(15,Ft/.8),Ni(),ui()},"camera-center":()=>El(Te.active()),"camera-fit":_h}))document.getElementById(n).onclick=e;function Z_(n,e,t,i){let s=ht.get(n);s&&(er.set(n,{from:{x:e.x+.5,z:e.y+.5},to:{x:t.x+.5,z:t.y+.5},start:performance.now(),duration:Math.max(1,i),m:s}),s.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][s.userData.p?.facing||0])}function fh(n,e,t=!1,i=!0,s="damage"){let r=document.createElement("span");r.className="voxel-damage "+(t?"critical ":"")+(s==="heal"?"healing":""),r.textContent=e===0?"0":String(e),Mt.append(r),Ks.push({el:r,p:{x:n.x+.5,y:.9,z:n.y+.5},start:performance.now(),life:1100});let a=ht.get(n.id);a&&s!=="heal"&&(a.userData.hit=performance.now())}async function J_(n,e,t){let i=ht.get(n.id);if(i&&(i.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][n.facing||0],i.userData.strike={start:performance.now(),dx:Math.sign(e.x-n.x),dz:Math.sign(e.y-n.y)}),Math.abs(e.x-n.x)+Math.abs(e.y-n.y)>1){let s=new je(new gn(.07,.07,.19),Di(n.kind===1?7651315:13676131,!0));Fn.add(s),Ks.push({mesh:s,from:{x:n.x+.5,z:n.y+.5},to:{x:e.x+.5,z:e.y+.5},start:performance.now(),life:260})}t&&await new Promise(s=>setTimeout(s,260))}var Zs=new Map;function Kd(n,e,t,i=0){let s=JSON.stringify([Xr(n,t)||ih(t||{},n),i])+n+":"+(e||"")+":"+(t?.portalKind||"")+":"+(t?.visual||"");if(!Zs.has(s))try{hi||(hi=new Hr({alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),hi.setSize(360,450,!1),hi.setPixelRatio(1),hi.outputColorSpace=bt,hi.toneMapping=Vs,hi.toneMappingExposure=1.25);let a=new En;a.add(new ri(14937574,6181693,2));let o=new oi(16769716,2.8);o.position.set(-2,4,3),a.add(o);let l=e==="item"?rf(n):e?jr({...t,type:e}):Kr(n,t);l.rotation.y=i*Math.PI/2,a.add(l);let c=new hn(-.68,.68,.98,-.72,.1,20);c.position.set(1.8,1.6,4),c.lookAt(0,.67,0),cl(c,l),hi.render(a,c);let u=document.createElement("canvas");u.width=360,u.height=450,u.getContext("2d").drawImage(hi.domElement,0,0),Zs.size>80&&Zs.delete(Zs.keys().next().value),Zs.set(s,u),l.traverse(d=>{d.isInstancedMesh&&d.dispose()})}catch{return null}let r=document.createElement("canvas");return r.width=360,r.height=450,r.className="sprite",r.getContext("2d").drawImage(Zs.get(s),0,0),r}function $_(n){if(!n||!Te?.animate())return;let e=ht.get("prop:"+n.id)||ht.get(n.id);!e||n.type==="chandelier"||(e.userData.tap={start:performance.now(),type:n.type||"actor",baseY:e.userData.tap?.baseY??e.position.y,baseZ:e.userData.tap?.baseZ??e.rotation.z})}function qr(n){if(requestAnimationFrame(qr),window.CinematicMenu?.active&&Jr&&!document.hidden){n-_l>=30&&(_l=n,cf(n));return}if(document.hidden||document.getElementById("map-view").hidden||!Jr||n-_l<30)return;_l=n;let e=!qr.lastShadow||n-qr.lastShadow>80;e&&(qr.lastShadow=n);let t=Te.animate(),i=Te.active();for(let[a,o]of er){let l=Math.min(1,(n-o.start)/o.duration),c=1-(1-l)**3;o.m.position.set(un.lerp(o.from.x,o.to.x,c),t?Math.sin(l*Math.PI)*.035:0,un.lerp(o.from.z,o.to.z,c)),l===1&&(o.m.position.set(o.to.x,0,o.to.z),er.delete(a))}for(let a of ht.values()){if(a.userData.tap){let o=a.userData.tap,l=(n-o.start)/360;if(l<1){let c=Math.sin(l*Math.PI)*Math.sin(l*Math.PI*2);a.position.y=o.baseY+Math.sin(l*Math.PI)*(["npc","actor"].includes(o.type)?.045:.022),a.rotation.z=o.baseZ+c*(["door","portal","books","barrel"].includes(o.type)?.035:.016)}else a.position.y=o.baseY,a.rotation.z=o.baseZ,delete a.userData.tap;a.userData.staticBatched&&Li.update(a)}if(a.userData.strike){let o=a.userData.strike,l=(n-o.start)/280;l<1?(a.position.x=a.userData.p.x+.5+o.dx*Math.sin(l*Math.PI)*.1,a.position.z=a.userData.p.y+.5+o.dz*Math.sin(l*Math.PI)*.1):(delete a.userData.strike,a.position.set(a.userData.p.x+.5,0,a.userData.p.y+.5))}if(a.userData.hinge){let o=a.userData.hinge;o.rotation.y=un.lerp(o.rotation.y,o.userData.goal||0,.22)}}let s=new Set(window.Torches.lightSources().map(a=>a.id));for(let a of $i){let o=a.portable?Te.state.party.find(h=>h.id===a.actorId):null,l=a.source,c=l?.phase||2,u=!!Te.state.settings.lights&&(a.portable?!!o?.torch:s.has(l.id)),d=t?1+.035*Math.sin(n*.005+c)+.015*Math.sin(n*.012+c):1;if(a.light.visible=u,a.light.intensity=u?(l?.intensity??12)*(a.portable?.65:l?.id==="altar"?.22:a.chandelier?.3:.45)*Te.state.settings.intensity*d:0,a.portable&&u&&e&&(er.size||Ks.length||[...ht.values()].some(h=>h.userData.strike||h.userData.hinge&&Math.abs(h.userData.hinge.rotation.y-(h.userData.hinge.userData.goal||0))>.002)||!a.lastPosition||a.light.position.distanceToSquared(a.lastPosition)>1e-4)&&(a.light.shadow.needsUpdate=!0,pt.shadowMap.needsUpdate=!0,a.lastPosition=a.light.position.clone()),a.portable){let h=ht.get(o.id),p=h?.userData.torch;p&&(p.updateWorldMatrix(!0,!1),a.light.position.copy(p.localToWorld(new B(0,.64,0))),p.userData.flames.forEach((_,x)=>{_.position.copy(_.userData.rest),t&&(_.position.x+=Math.sin(n*.009+x)*.015)}))}else{if(l.kind==="wall"){let p=window.Torches.fixture(l.fixtureId).present;a.model.visible=p,a.flames.forEach(_=>_.visible=u)}let h=t?Math.sin(n*.008+c)*.018:0;if(a.light.position.x=l.x+h,a.light.position.z=l.y+h*.6,a.flames.forEach((p,_)=>{p.position.copy(p.userData.rest),t&&(p.position.x+=h*(_+1)*.5,p.position.y+=Math.sin(n*.009+c+_)*.018)}),a.chandelier){a.flames.forEach(_=>_.visible=u);let p=Te.state.party.some(_=>Math.hypot(_.x+.5-l.x,_.y+.5-l.y)<1.15);a.model.traverse(_=>{_.isMesh&&(_.material.opacity=un.lerp(_.material.opacity,p?.28:1,.14))})}}}for(let a=Ks.length-1;a>=0;a--){let o=Ks[a],l=(n-o.start)/o.life;if(l>=1){o.el?.remove(),o.mesh&&(Fn.remove(o.mesh),o.mesh.geometry.dispose()),Ks.splice(a,1);continue}if(o.el){let c=new B(o.p.x,o.p.y+l*.7,o.p.z).project(Xt);o.el.style.left=(c.x+1)*Mt.clientWidth/2+"px",o.el.style.top=(-c.y+1)*Mt.clientHeight/2+"px",o.el.style.opacity=String(1-Math.max(0,(l-.6)/.4))}else o.mesh.position.set(un.lerp(o.from.x,o.to.x,l),.65,un.lerp(o.from.z,o.to.z,l)),o.mesh.rotation.y=Math.atan2(o.to.x-o.from.x,o.to.z-o.from.z)}let r=window.objectPrompt;if(At.hidden=!r?.p||!document.getElementById("dialogue").hidden||!!window.CinematicMenu?.active,At.hidden&&Ml.clear(),r?.p){let a=r.p,o=new B(a.x+.5,.45,a.y+.5).project(Xt),l=(o.x+1)*Mt.clientWidth/2,c=(-o.y+1)*Mt.clientHeight/2,u=r.actions||[],d=JSON.stringify([a.name,u.map(M=>[M.id,M.label,M.enabled])]);if(At.dataset.signature!==d){Ml.clear(),At.dataset.signature=d;let M=document.createElement("strong");M.textContent=a.name;let C=u.map(S=>{let T=document.createElement("button");return T.type="button",T.dataset.action=S.id,T.textContent=S.label,T.disabled=!S.enabled,T});At.replaceChildren(M,...C),At.setAttribute("aria-label","\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \xB7 "+a.name)}let h=At.offsetWidth||190,p=At.offsetHeight||125,_=Mt.getBoundingClientRect(),x=document.getElementById("play-dock")?.getBoundingClientRect(),m=Math.min(Mt.clientHeight-6,x&&x.height?x.top-_.top-6:Mt.clientHeight-6),f=c-p-24;f<76&&(f=c+24),f=Math.max(6,Math.min(m-p,f)),At.hidden||=l<0||l>Mt.clientWidth||c<0||c>m||m<p,At.hidden&&Ml.clear(),At.style.left=Math.max(h/2+6,Math.min(Mt.clientWidth-h/2-6,l))+"px",At.style.top=f+"px"}ui()}new ResizeObserver(xh).observe(Mt);window.camera={center:El,reset:Dl,fit:_h,follow:n=>{Te.state.combat&&El(n)},zoom:n=>{Ft=un.clamp(5/n,2.8,15),Ni()},allowClick:()=>!0,get state(){return{scale:5/Ft,focus:Jn}}};window.fx={step:()=>{},strike:J_,impact:fh,door:()=>{},pulse:n=>fh(n,"\u041E\u0442\u043A\u043B\u0438\u043A",!1,!0,"heal")};var Cl;function cf(n){Cl||=Id({figure:Kr,propModel:jr,shadedBox:N,compact:Ot,terrainMaterial:Qi}),pt.setRenderTarget(null),Cl.render(pt,n,Te.state.settings,window.CinematicMenu.editor)}window.voxel={resize:xh,get staticBatchStats(){return Li&&{props:Li.roots.length,sourceMeshes:Li.sourceMeshes,drawMeshes:Li.meshes.length}},turnHero:n=>Cl?.turn(n),get menuDebug(){return Cl?.debug},buildModel:(n,e,t)=>Kr(n,e,t),buildItem:rf,buildProp:jr,compact:Ot,shadedBox:N,heroPortrait:(n,e=0)=>Kd(n.kind,null,n,e),portrait:Kd,sync:gh,move:Z_,impact:fh,tap:$_,reset:Dl,fit:_h,ground:af,get selectionMask(){return{root:js,objects:Ki,material:Rl}},get ready(){return Jr},get scene(){return Fn},get camera(){return Xt},get models(){return ht},get renderer(){return pt}};window.initCamera=()=>{gh(),Dl()};requestAnimationFrame(qr);function hf(){window.gameDebug?(gh(),Dl(),Te.render(),window.Heroes?.refreshPortraits()):setTimeout(hf,30)}hf();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
