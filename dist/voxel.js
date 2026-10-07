(()=>{var tu=0,rc=1,nu=2;var Wi=1,iu=2,Ns=3,wi=0,$t=1,gn=2,Wn=0,Us=1,ac=2,oc=3,lc=4,su=5;var Xi=100,ru=101,au=102,ou=103,lu=104,cu=200,hu=201,uu=202,du=203,cc=204,hc=205,fu=206,pu=207,mu=208,gu=209,xu=210,_u=211,yu=212,vu=213,Mu=214,Ta=0,Ea=1,Aa=2,vs=3,Ca=4,Ra=5,Ia=6,Pa=7,uc=0,Su=1,bu=2,In=0,dc=1,fc=2,pc=3,Fs=4,mc=5,gc=6,xc=7;var _c=300,Ti=301,qi=302,ro=303,ao=304,Cr=306,La=1e3,kn=1001,Da=1002,vt=1003,wu=1004;var Rr=1005;var Ft=1006,oo=1007;var Ei=1008;var Qt=1009,yc=1010,vc=1011,Os=1012,lo=1013,Pn=1014,xn=1015,Ln=1016,co=1017,ho=1018,Bs=1020,Mc=35902,Sc=35899,bc=1021,wc=1022,en=1023,zn=1026,Ai=1027,uo=1028,fo=1029,Ci=1030,po=1031;var mo=1033,Ir=33776,Pr=33777,Lr=33778,Dr=33779,go=35840,xo=35841,_o=35842,yo=35843,vo=36196,Mo=37492,So=37496,bo=37488,wo=37489,Nr=37490,To=37491,Eo=37808,Ao=37809,Co=37810,Ro=37811,Io=37812,Po=37813,Lo=37814,Do=37815,No=37816,Uo=37817,Fo=37818,Oo=37819,Bo=37820,ko=37821,zo=36492,Vo=36494,Go=36495,Ho=36283,Wo=36284,Ur=36285,Xo=36286;var cr=2300,Na=2301,ba=2302,Jl=2303,$l=2400,Kl=2401,jl=2402;var Tu=3200;var qo=0,Eu=1,li="",Ct="srgb",hr="srgb-linear",ur="linear",it="srgb";var wa=7680;var Au=519,Cu=512,Ru=513,Iu=514,Yo=515,Pu=516,Lu=517,Zo=518,Du=519,Tc=35044;var Ec="300 es",wn=2e3,Ms=2001;function lf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function cf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Nu(){let n=dr("canvas");return n.style.display="block",n}var Mh={},Ss=null;function fr(...n){let e="THREE."+n.shift();Ss?Ss("log",e,...n):console.log(e,...n)}function Uu(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=Uu(n);let e="THREE."+n.shift();if(Ss)Ss("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Fe(...n){n=Uu(n);let e="THREE."+n.shift();if(Ss)Ss("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function zi(...n){let e=n.join(" ");e in Mh||(Mh[e]=!0,Ne(...n))}function Fu(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var Ou={[Ta]:Ea,[Aa]:Ia,[Ca]:Pa,[vs]:Ra,[Ea]:Ta,[Ia]:Aa,[Pa]:Ca,[Ra]:vs},Vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sh=1234567,or=Math.PI/180,bs=180/Math.PI;function ni(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function Ac(n,e){return(n%e+e)%e}function hf(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function uf(n,e,t){return n!==e?(t-n)/(e-n):0}function lr(n,e,t){return(1-t)*n+t*e}function df(n,e,t,i){return lr(n,e,1-Math.exp(-t*i))}function ff(n,e=1){return e-Math.abs(Ac(n,e*2)-e)}function pf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function mf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function gf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function xf(n,e){return n+Math.random()*(e-n)}function _f(n){return n*(.5-Math.random())}function yf(n){n!==void 0&&(Sh=n);let e=Sh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vf(n){return n*or}function Mf(n){return n*bs}function Sf(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function bf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function wf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Tf(n,e,t,i,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),u=a((e+i)/2),d=s((e-i)/2),h=a((e-i)/2),p=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*u,o*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function rt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var hn={DEG2RAD:or,RAD2DEG:bs,generateUUID:ni,clamp:$e,euclideanModulo:Ac,mapLinear:hf,inverseLerp:uf,lerp:lr,damp:df,pingpong:ff,smoothstep:pf,smootherstep:mf,randInt:gf,randFloat:xf,randFloatSpread:_f,seededRandom:yf,degToRad:vf,radToDeg:Mf,isPowerOfTwo:Sf,ceilPowerOfTwo:bf,floorPowerOfTwo:wf,setQuaternionFromProperEuler:Tf,normalize:rt,denormalize:bn},Oe=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},fn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],h=s[a+0],p=s[a+1],_=s[a+2],x=s[a+3];if(d!==x||l!==h||c!==p||u!==_){let m=l*h+c*p+u*_+d*x;m<0&&(h=-h,p=-p,_=-_,x=-x,m=-m);let f=1-o;if(m<.9995){let S=Math.acos(m),C=Math.sin(S);f=Math.sin(f*S)/C,o=Math.sin(o*S)/C,l=l*f+h*o,c=c*f+p*o,u=u*f+_*o,d=d*f+x*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+_*o,d=d*f+x*o;let S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[a],h=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+u*d+l*p-c*h,e[t+1]=l*_+u*h+c*d-o*p,e[t+2]=c*_+u*p+o*h-l*d,e[t+3]=u*_-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),d=o(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"YXZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"ZXY":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"ZYX":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"YZX":this._x=h*u*d+c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d-h*p*_;break;case"XZY":this._x=h*u*d-c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d+h*p*_;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return El.copy(this).projectOnVector(e),this.sub(El)}reflect(e){return this.sub(El.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},El=new B,bh=new fn,ke=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],_=i[8],x=r[0],m=r[3],f=r[6],S=r[1],C=r[4],M=r[7],T=r[2],E=r[5],A=r[8];return s[0]=a*x+o*S+l*T,s[3]=a*m+o*C+l*E,s[6]=a*f+o*M+l*A,s[1]=c*x+u*S+d*T,s[4]=c*m+u*C+d*E,s[7]=c*f+u*M+d*A,s[2]=h*x+p*S+_*T,s[5]=h*m+p*C+_*E,s[8]=h*f+p*M+_*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,p=c*s-a*l,_=t*d+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return e[0]=d*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=h*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Al.makeScale(e,t)),this}rotate(e){return zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Al.makeRotation(-e)),this}translate(e,t){return zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Al.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Al=new ke,wh=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Th=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ef(){let n={enabled:!0,workingColorSpace:hr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===it&&(r.r=ii(r.r),r.g=ii(r.g),r.b=ii(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(r.r=ys(r.r),r.g=ys(r.g),r.b=ys(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===li?ur:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[hr]:{primaries:e,whitePoint:i,transfer:ur,toXYZ:wh,fromXYZ:Th,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:i,transfer:it,toXYZ:wh,fromXYZ:Th,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),n}var Je=Ef();function ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ys(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ts,Ua=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ts===void 0&&(ts=dr("canvas")),ts.width=e.width,ts.height=e.height;let r=ts.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=dr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ii(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ii(t[i]/255)*255):t[i]=ii(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Af=0,ws=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Cl(r[a].image)):s.push(Cl(r[a]))}else s=Cl(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Cl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ua.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var Cf=0,Rl=new B,Zt=class n extends Vn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=kn,r=kn,s=Ft,a=Ei,o=en,l=Qt,c=n.DEFAULT_ANISOTROPY,u=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=ni(),this.name="",this.source=new ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Rl).x}get height(){return this.source.getSize(Rl).y}get depth(){return this.source.getSize(Rl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case La:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case Da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case La:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case Da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=_c;Zt.DEFAULT_ANISOTROPY=1;var yt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],_=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(c+1)/2,M=(p+1)/2,T=(f+1)/2,E=(u+h)/4,A=(d+x)/4,y=(_+m)/4;return C>M&&C>T?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=E/i,s=A/i):M>T?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=E/r,s=y/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=A/s,r=y/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-_)*(m-_)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-_)/S,this.y=(d-x)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fa=class extends Vn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new Zt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ft,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new ws(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gt=class extends Fa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},pr=class extends Zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=vt,this.minFilter=vt,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oa=class extends Zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=vt,this.minFilter=vt,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var We=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,d,h,p,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,d,h,p,_,x,m)}set(e,t,i,r,s,a,o,l,c,u,d,h,p,_,x,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/ns.setFromMatrixColumn(e,0).length(),s=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let h=a*u,p=a*d,_=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+_*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,p=l*d,_=c*u,x=c*d;t[0]=h+x*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,p=l*d,_=c*u,x=c*d;t[0]=h-x*o,t[4]=-a*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,p=a*d,_=o*u,x=o*d;t[0]=l*u,t[4]=_*c-p,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,p=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=x-h*d,t[8]=_*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+_,t[10]=h-x*d}else if(e.order==="XZY"){let h=a*l,p=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=a*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rf,e,If)}lookAt(e,t,i){let r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),mi.crossVectors(i,nn),mi.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),mi.crossVectors(i,nn)),mi.normalize(),$r.crossVectors(nn,mi),r[0]=mi.x,r[4]=$r.x,r[8]=nn.x,r[1]=mi.y,r[5]=$r.y,r[9]=nn.y,r[2]=mi.z,r[6]=$r.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],_=i[2],x=i[6],m=i[10],f=i[14],S=i[3],C=i[7],M=i[11],T=i[15],E=r[0],A=r[4],y=r[8],w=r[12],R=r[1],F=r[5],P=r[9],z=r[13],I=r[2],V=r[6],W=r[10],q=r[14],te=r[3],J=r[7],Q=r[11],se=r[15];return s[0]=a*E+o*R+l*I+c*te,s[4]=a*A+o*F+l*V+c*J,s[8]=a*y+o*P+l*W+c*Q,s[12]=a*w+o*z+l*q+c*se,s[1]=u*E+d*R+h*I+p*te,s[5]=u*A+d*F+h*V+p*J,s[9]=u*y+d*P+h*W+p*Q,s[13]=u*w+d*z+h*q+p*se,s[2]=_*E+x*R+m*I+f*te,s[6]=_*A+x*F+m*V+f*J,s[10]=_*y+x*P+m*W+f*Q,s[14]=_*w+x*z+m*q+f*se,s[3]=S*E+C*R+M*I+T*te,s[7]=S*A+C*F+M*V+T*J,s[11]=S*y+C*P+M*W+T*Q,s[15]=S*w+C*z+M*q+T*se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],_=e[3],x=e[7],m=e[11],f=e[15],S=l*p-c*h,C=o*p-c*d,M=o*h-l*d,T=a*p-c*u,E=a*h-l*u,A=a*d-o*u;return t*(x*S-m*C+f*M)-i*(_*S-m*T+f*E)+r*(_*C-x*T+f*A)-s*(_*M-x*E+m*A)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],_=e[12],x=e[13],m=e[14],f=e[15],S=t*o-i*a,C=t*l-r*a,M=t*c-s*a,T=i*l-r*o,E=i*c-s*o,A=r*c-s*l,y=u*x-d*_,w=u*m-h*_,R=u*f-p*_,F=d*m-h*x,P=d*f-p*x,z=h*f-p*m,I=S*z-C*P+M*F+T*R-E*w+A*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/I;return e[0]=(o*z-l*P+c*F)*V,e[1]=(r*P-i*z-s*F)*V,e[2]=(x*A-m*E+f*T)*V,e[3]=(h*E-d*A-p*T)*V,e[4]=(l*R-a*z-c*w)*V,e[5]=(t*z-r*R+s*w)*V,e[6]=(m*M-_*A-f*C)*V,e[7]=(u*A-h*M+p*C)*V,e[8]=(a*P-o*R+c*y)*V,e[9]=(i*R-t*P-s*y)*V,e[10]=(_*E-x*M+f*S)*V,e[11]=(d*M-u*E-p*S)*V,e[12]=(o*w-a*F-l*y)*V,e[13]=(t*F-i*w+r*y)*V,e[14]=(x*C-_*T-m*S)*V,e[15]=(u*T-d*C+h*S)*V,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,p=s*u,_=s*d,x=a*u,m=a*d,f=o*d,S=l*c,C=l*u,M=l*d,T=i.x,E=i.y,A=i.z;return r[0]=(1-(x+f))*T,r[1]=(p+M)*T,r[2]=(_-C)*T,r[3]=0,r[4]=(p-M)*E,r[5]=(1-(h+f))*E,r[6]=(m+S)*E,r[7]=0,r[8]=(_+C)*A,r[9]=(m-S)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=ns.set(r[0],r[1],r[2]).length(),o=ns.set(r[4],r[5],r[6]).length(),l=ns.set(r[8],r[9],r[10]).length();s<0&&(a=-a),vn.copy(this);let c=1/a,u=1/o,d=1/l;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=d,vn.elements[9]*=d,vn.elements[10]*=d,t.setFromRotationMatrix(vn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=wn,l=!1){let c=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),p=(i+r)/(i-r),_,x;if(l)_=s/(a-s),x=a*s/(a-s);else if(o===wn)_=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Ms)_=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=wn,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),p=-(i+r)/(i-r),_,x;if(l)_=1/(a-s),x=a/(a-s);else if(o===wn)_=-2/(a-s),x=-(a+s)/(a-s);else if(o===Ms)_=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ns=new B,vn=new We,Rf=new B(0,0,0),If=new B(1,1,1),mi=new B,$r=new B,nn=new B,Eh=new We,Ah=new fn,si=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ah.setFromEuler(this),this.setFromQuaternion(Ah,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};si.DEFAULT_ORDER="XYZ";var Ts=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Pf=0,Ch=new B,is=new fn,$n=new We,Kr=new B,Ks=new B,Lf=new B,Df=new fn,Rh=new B(1,0,0),Ih=new B(0,1,0),Ph=new B(0,0,1),Lh={type:"added"},Nf={type:"removed"},ss={type:"childadded",child:null},Il={type:"childremoved",child:null},Rt=class n extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new B,t=new si,i=new fn,r=new B(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new We},normalMatrix:{value:new ke}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(Rh,e)}rotateY(e){return this.rotateOnAxis(Ih,e)}rotateZ(e){return this.rotateOnAxis(Ph,e)}translateOnAxis(e,t){return Ch.copy(e).applyQuaternion(this.quaternion),this.position.add(Ch.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rh,e)}translateY(e){return this.translateOnAxis(Ih,e)}translateZ(e){return this.translateOnAxis(Ph,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Kr.copy(e):Kr.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Ks,Kr,this.up):$n.lookAt(Kr,Ks,this.up),this.quaternion.setFromRotationMatrix($n),r&&($n.extractRotation(r.matrixWorld),is.setFromRotationMatrix($n),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lh),ss.child=e,this.dispatchEvent(ss),ss.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nf),Il.child=e,this.dispatchEvent(Il),Il.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lh),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Lf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,Df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Rt.DEFAULT_UP=new B(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ke=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Uf={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Pl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Le=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=Ac(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Pl(a,s,e+1/3),this.g=Pl(a,s,e),this.b=Pl(a,s,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=Ct){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){let i=Bu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return Je.workingToColorSpace(zt.copy(this),e),Math.round($e(zt.r*255,0,255))*65536+Math.round($e(zt.g*255,0,255))*256+Math.round($e(zt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(zt.copy(this),t);let i=zt.r,r=zt.g,s=zt.b,a=Math.max(i,r,s),o=Math.min(i,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Ct){Je.workingToColorSpace(zt.copy(this),e);let t=zt.r,i=zt.g,r=zt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(jr);let i=lr(gi.h,jr.h,t),r=lr(gi.s,jr.s,t),s=lr(gi.l,jr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zt=new Le;Le.NAMES=Bu;var Tn=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Mn=new B,Kn=new B,Ll=new B,jn=new B,rs=new B,as=new B,Dh=new B,Dl=new B,Nl=new B,Ul=new B,Fl=new yt,Ol=new yt,Bl=new yt,ti=class n{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Mn.subVectors(e,t),r.cross(Mn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Mn.subVectors(r,t),Kn.subVectors(i,t),Ll.subVectors(e,t);let a=Mn.dot(Mn),o=Mn.dot(Kn),l=Mn.dot(Ll),c=Kn.dot(Kn),u=Kn.dot(Ll),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let h=1/d,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jn.x),l.addScaledVector(a,jn.y),l.addScaledVector(o,jn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Fl.setScalar(0),Ol.setScalar(0),Bl.setScalar(0),Fl.fromBufferAttribute(e,t),Ol.fromBufferAttribute(e,i),Bl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Fl,s.x),a.addScaledVector(Ol,s.y),a.addScaledVector(Bl,s.z),a}static isFrontFacing(e,t,i,r){return Mn.subVectors(i,t),Kn.subVectors(e,t),Mn.cross(Kn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Mn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;rs.subVectors(r,i),as.subVectors(s,i),Dl.subVectors(e,i);let l=rs.dot(Dl),c=as.dot(Dl);if(l<=0&&c<=0)return t.copy(i);Nl.subVectors(e,r);let u=rs.dot(Nl),d=as.dot(Nl);if(u>=0&&d<=u)return t.copy(r);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(rs,a);Ul.subVectors(e,s);let p=rs.dot(Ul),_=as.dot(Ul);if(_>=0&&p<=_)return t.copy(s);let x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(as,o);let m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return Dh.subVectors(s,r),o=(d-u)/(d-u+(p-_)),t.copy(r).addScaledVector(Dh,o);let f=1/(m+x+h);return a=x*f,o=h*f,t.copy(i).addScaledVector(rs,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},an=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Sn):Sn.fromBufferAttribute(s,a),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qr.copy(i.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(js),ea.subVectors(this.max,js),os.subVectors(e.a,js),ls.subVectors(e.b,js),cs.subVectors(e.c,js),xi.subVectors(ls,os),_i.subVectors(cs,ls),Fi.subVectors(os,cs);let t=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Fi.z,Fi.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Fi.z,0,-Fi.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Fi.y,Fi.x,0];return!kl(t,os,ls,cs,ea)||(t=[1,0,0,0,1,0,0,0,1],!kl(t,os,ls,cs,ea))?!1:(ta.crossVectors(xi,_i),t=[ta.x,ta.y,ta.z],kl(t,os,ls,cs,ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new B,new B,new B,new B,new B,new B,new B,new B],Sn=new B,Qr=new an,os=new B,ls=new B,cs=new B,xi=new B,_i=new B,Fi=new B,js=new B,ea=new B,ta=new B,Oi=new B;function kl(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Oi.fromArray(n,s);let o=r.x*Math.abs(Oi.x)+r.y*Math.abs(Oi.y)+r.z*Math.abs(Oi.z),l=e.dot(Oi),c=t.dot(Oi),u=i.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var At=new B,na=new Oe,Ff=0,Vt=class extends Vn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ff++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Tc,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)na.fromBufferAttribute(this,t),na.applyMatrix3(e),this.setXY(t,na.x,na.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=bn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),r=rt(r,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var mr=class extends Vt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var gr=class extends Vt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var _t=class extends Vt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Of=new an,Qs=new B,zl=new B,Gn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Of.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);let t=Qs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Qs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add(zl)),this.expandByPoint(Qs.copy(e.center).sub(zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Bf=0,dn=new We,Vl=new Rt,hs=new B,sn=new an,er=new an,Dt=new B,Tt=class n extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lf(e)?gr:mr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,i){return dn.makeTranslation(e,t,i),this.applyMatrix4(dn),this}scale(e,t,i){return dn.makeScale(e,t,i),this.applyMatrix4(dn),this}lookAt(e){return Vl.lookAt(e),Vl.updateMatrix(),this.applyMatrix4(Vl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];er.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(sn.min,er.min),sn.expandByPoint(Dt),Dt.addVectors(sn.max,er.max),sn.expandByPoint(Dt)):(sn.expandByPoint(er.min),sn.expandByPoint(er.max))}sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Dt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Dt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),Dt.add(hs)),r=Math.max(r,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Vt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new B,l[y]=new B;let c=new B,u=new B,d=new B,h=new Oe,p=new Oe,_=new Oe,x=new B,m=new B;function f(y,w,R){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,w),d.fromBufferAttribute(i,R),h.fromBufferAttribute(s,y),p.fromBufferAttribute(s,w),_.fromBufferAttribute(s,R),u.sub(c),d.sub(c),p.sub(h),_.sub(h);let F=1/(p.x*_.y-_.x*p.y);isFinite(F)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(F),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(F),o[y].add(x),o[w].add(x),o[R].add(x),l[y].add(m),l[w].add(m),l[R].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let y=0,w=S.length;y<w;++y){let R=S[y],F=R.start,P=R.count;for(let z=F,I=F+P;z<I;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let C=new B,M=new B,T=new B,E=new B;function A(y){T.fromBufferAttribute(r,y),E.copy(T);let w=o[y];C.copy(w),C.sub(T.multiplyScalar(T.dot(w))).normalize(),M.crossVectors(E,w);let F=M.dot(l[y])<0?-1:1;a.setXYZW(y,C.x,C.y,C.z,F)}for(let y=0,w=S.length;y<w;++y){let R=S[y],F=R.start,P=R.count;for(let z=F,I=F+P;z<I;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){let _=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),p=0,_=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let f=0;f<u;f++)h[_++]=c[p++]}return new Vt(h,u,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,i);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ba=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Tc,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},qt=new B,xr=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=bn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),i=rt(i,this.array),r=rt(r,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){fr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){fr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Gl=new B,kf=new B,zf=new ke,rn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Gl.subVectors(i,t).cross(kf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Gl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||zf.getNormalMatrix(e),r=this.coplanarPoint(Gl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Vf=0,En=class extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Us,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=hc,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Au,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wa,this.stencilZFail=wa,this.stencilZPass=wa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Le().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new rn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},As=class extends En{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},us,tr=new B,ds=new B,fs=new B,ps=new Oe,nr=new Oe,ku=new We,ia=new B,ir=new B,sa=new B,Nh=new Oe,Hl=new Oe,Uh=new Oe,_r=class extends Rt{constructor(e=new As){if(super(),this.isSprite=!0,this.type="Sprite",us===void 0){us=new Tt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ba(t,5);us.setIndex([0,1,2,0,2,3]),us.setAttribute("position",new xr(i,3,0,!1)),us.setAttribute("uv",new xr(i,2,3,!1))}this.geometry=us,this.material=e,this.center=new Oe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ds.setFromMatrixScale(this.matrixWorld),ku.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),fs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ds.multiplyScalar(-fs.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let a=this.center;ra(ia.set(-.5,-.5,0),fs,a,ds,r,s),ra(ir.set(.5,-.5,0),fs,a,ds,r,s),ra(sa.set(.5,.5,0),fs,a,ds,r,s),Nh.set(0,0),Hl.set(1,0),Uh.set(1,1);let o=e.ray.intersectTriangle(ia,ir,sa,!1,tr);if(o===null&&(ra(ir.set(-.5,.5,0),fs,a,ds,r,s),Hl.set(0,1),o=e.ray.intersectTriangle(ia,sa,ir,!1,tr),o===null))return;let l=e.ray.origin.distanceTo(tr);l<e.near||l>e.far||t.push({distance:l,point:tr.clone(),uv:ti.getInterpolation(tr,ia,ir,sa,Nh,Hl,Uh,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ra(n,e,t,i,r,s){ps.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(nr.x=s*ps.x-r*ps.y,nr.y=r*ps.x+s*ps.y):nr.copy(ps),n.copy(e),n.x+=nr.x,n.y+=nr.y,n.applyMatrix4(ku)}var ei=new B,Wl=new B,aa=new B,oa=new B,Vi=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Wl.copy(e).add(t).multiplyScalar(.5),aa.copy(t).sub(e).normalize(),oa.copy(this.origin).sub(Wl);let s=e.distanceTo(t)*.5,a=-this.direction.dot(aa),o=oa.dot(this.direction),l=-oa.dot(aa),c=oa.lengthSq(),u=Math.abs(1-a*a),d,h,p,_;if(u>0)if(d=a*l-o,h=a*o-l,_=s*u,d>=0)if(h>=-_)if(h<=_){let x=1/u;d*=x,h*=x,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Wl).addScaledVector(aa,h),p}intersectSphere(e,t){if(e.radius<0)return null;ei.subVectors(e.center,this.origin);let i=ei.dot(this.direction),r=ei.dot(ei)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,i,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,_=t.x-a.x,x=t.y-a.y,m=t.z-a.z,f=i.x-a.x,S=i.y-a.y,C=i.z-a.z,M=Math.abs(l),T=Math.abs(c),E=Math.abs(u),A,y,w,R,F,P,z,I,V,W,q,te;if(M>=T&&M>=E?(w=l,P=d,V=_,te=f,l>=0?(A=c,y=u,R=h,F=p,z=x,I=m,W=S,q=C):(A=u,y=c,R=p,F=h,z=m,I=x,W=C,q=S)):T>=E?(w=c,P=h,V=x,te=S,c>=0?(A=u,y=l,R=p,F=d,z=m,I=_,W=C,q=f):(A=l,y=u,R=d,F=p,z=_,I=m,W=f,q=C)):(w=u,P=p,V=m,te=C,u>=0?(A=l,y=c,R=d,F=h,z=_,I=x,W=f,q=S):(A=c,y=l,R=h,F=d,z=x,I=_,W=S,q=f)),w===0)return null;let J=A/w,Q=y/w,se=1/w,Ie=R-J*P,Te=F-Q*P,at=z-J*V,Ze=I-Q*V,qe=W-J*te,K=q-Q*te,ne=qe*Ze-K*at,pe=Ie*K-Te*qe,De=at*Te-Ze*Ie;if(r){if(ne<0||pe<0||De<0)return null}else if((ne<0||pe<0||De<0)&&(ne>0||pe>0||De>0))return null;let ye=ne+pe+De;if(ye===0)return null;let Ve=se*(ne*P+pe*V+De*te);return(ye>0?Ve<0:Ve>0)?null:this.at(Ve/ye,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},An=class extends En{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Fh=new We,Bi=new Vi,la=new Gn,Oh=new B,ca=new B,ha=new B,ua=new B,Xl=new B,da=new B,Bh=new B,fa=new B,je=class extends Rt{constructor(e=new Tt,t=new An){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){da.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],d=s[l];u!==0&&(Xl.fromBufferAttribute(d,e),a?da.addScaledVector(Xl,u):da.addScaledVector(Xl.sub(t),u))}t.add(da)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(s),Bi.copy(e.ray).recast(e.near),!(la.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(la,Oh)===null||Bi.origin.distanceToSquared(Oh)>(e.far-e.near)**2))&&(Fh.copy(s).invert(),Bi.copy(e.ray).applyMatrix4(Fh),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let m=h[_],f=a[m.materialIndex],S=Math.max(m.start,p.start),C=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,T=C;M<T;M+=3){let E=o.getX(M),A=o.getX(M+1),y=o.getX(M+2);r=pa(this,f,e,i,c,u,d,E,A,y),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){let S=o.getX(m),C=o.getX(m+1),M=o.getX(m+2);r=pa(this,a,e,i,c,u,d,S,C,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let m=h[_],f=a[m.materialIndex],S=Math.max(m.start,p.start),C=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,T=C;M<T;M+=3){let E=M,A=M+1,y=M+2;r=pa(this,f,e,i,c,u,d,E,A,y),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){let S=m,C=m+1,M=m+2;r=pa(this,a,e,i,c,u,d,S,C,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Gf(n,e,t,i,r,s,a,o){let l;if(e.side===$t?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===wi,o),l===null)return null;fa.copy(o),fa.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(fa);return c<t.near||c>t.far?null:{distance:c,point:fa.clone(),object:n}}function pa(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ca),n.getVertexPosition(l,ha),n.getVertexPosition(c,ua);let u=Gf(n,e,t,i,ca,ha,ua,Bh);if(u){let d=new B;ti.getBarycoord(Bh,ca,ha,ua,d),r&&(u.uv=ti.getInterpolatedAttribute(r,o,l,c,d,new Oe)),s&&(u.uv1=ti.getInterpolatedAttribute(s,o,l,c,d,new Oe)),a&&(u.normal=ti.getInterpolatedAttribute(a,o,l,c,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new B,materialIndex:0};ti.getNormal(ca,ha,ua,h.normal),u.face=h,u.barycoord=d}return u}var Gi=class extends Zt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=vt,u=vt,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yr=class extends Vt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ms=new We,kh=new We,ma=[],zh=new an,Hf=new We,sr=new je,rr=new Gn,on=class extends je{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Hf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new an),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ms),zh.copy(e.boundingBox).applyMatrix4(ms),this.boundingBox.union(zh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ms),rr.copy(e.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(i),e.ray.intersectsSphere(rr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ms),kh.multiplyMatrices(i,ms),sr.matrixWorld=kh,sr.raycast(e,ma);for(let a=0,o=ma.length;a<o;a++){let l=ma[a];l.instanceId=s,l.object=this,t.push(l)}ma.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new yr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Gi(new Float32Array(r*this.count),r,this.count,uo,xn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ki=new Gn,Wf=new Oe(.5,.5),ga=new B,Cs=class{constructor(e=new rn,t=new rn,i=new rn,r=new rn,s=new rn,a=new rn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wn,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],p=s[7],_=s[8],x=s[9],m=s[10],f=s[11],S=s[12],C=s[13],M=s[14],T=s[15];if(r[0].setComponents(c-a,p-u,f-_,T-S).normalize(),r[1].setComponents(c+a,p+u,f+_,T+S).normalize(),r[2].setComponents(c+o,p+d,f+x,T+C).normalize(),r[3].setComponents(c-o,p-d,f-x,T-C).normalize(),i)r[4].setComponents(l,h,m,M).normalize(),r[5].setComponents(c-l,p-h,f-m,T-M).normalize();else if(r[4].setComponents(c-l,p-h,f-m,T-M).normalize(),t===wn)r[5].setComponents(c+l,p+h,f+m,T+M).normalize();else if(t===Ms)r[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=Wf.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(ga.x=r.normal.x>0?e.max.x:e.min.x,ga.y=r.normal.y>0?e.max.y:e.min.y,ga.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ga)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Hi=class extends En{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ka=new B,za=new B,Vh=new We,ar=new Vi,xa=new Gn,ql=new B,Gh=new B,Rs=class extends Rt{constructor(e=new Tt,t=new Hi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)ka.fromBufferAttribute(t,r-1),za.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ka.distanceTo(za);e.setAttribute("lineDistance",new _t(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xa.copy(i.boundingSphere),xa.applyMatrix4(r),xa.radius+=s,e.ray.intersectsSphere(xa)===!1)return;Vh.copy(r).invert(),ar.copy(e.ray).applyMatrix4(Vh);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let x=p,m=_-1;x<m;x+=c){let f=u.getX(x),S=u.getX(x+1),C=_a(this,e,ar,l,f,S,x);C&&t.push(C)}if(this.isLineLoop){let x=u.getX(_-1),m=u.getX(p),f=_a(this,e,ar,l,x,m,_-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let x=p,m=_-1;x<m;x+=c){let f=_a(this,e,ar,l,x,x+1,x);f&&t.push(f)}if(this.isLineLoop){let x=_a(this,e,ar,l,_-1,p,_-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function _a(n,e,t,i,r,s,a){let o=n.geometry.attributes.position;if(ka.fromBufferAttribute(o,r),za.fromBufferAttribute(o,s),t.distanceSqToSegment(ka,za,ql,Gh)>i)return;ql.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(ql);if(!(c<e.near||c>e.far))return{distance:c,point:Gh.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Hh=new B,Wh=new B,Va=class extends Rs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Hh.fromBufferAttribute(t,r),Wh.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Hh.distanceTo(Wh);e.setAttribute("lineDistance",new _t(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Is=class extends En{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Xh=new We,Ql=new Vi,ya=new Gn,va=new B,vr=class extends Rt{constructor(e=new Tt,t=new Is){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ya.copy(i.boundingSphere),ya.applyMatrix4(r),ya.radius+=s,e.ray.intersectsSphere(ya)===!1)return;Xh.copy(r).invert(),Ql.copy(e.ray).applyMatrix4(Xh);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=h,x=p;_<x;_++){let m=c.getX(_);va.fromBufferAttribute(d,m),qh(va,m,l,r,e,t,this)}}else{let h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=h,x=p;_<x;_++)va.fromBufferAttribute(d,_),qh(va,_,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function qh(n,e,t,i,r,s,a){let o=Ql.distanceSqToPoint(n);if(o<t){let l=new B;Ql.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Mr=class extends Zt{constructor(e=[],t=Ti,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Hn=class extends Zt{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var vi=class extends Zt{constructor(e,t,i=Pn,r,s,a,o=vt,l=vt,c,u=zn,d=1){if(u!==zn&&u!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ga=class extends vi{constructor(e,t=Pn,i=Ti,r,s,a=vt,o=vt,l,c=zn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Sr=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},pn=class n extends Tt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,p=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(d,2));function _(x,m,f,S,C,M,T,E,A,y,w){let R=M/A,F=T/y,P=M/2,z=T/2,I=E/2,V=A+1,W=y+1,q=0,te=0,J=new B;for(let Q=0;Q<W;Q++){let se=Q*F-z;for(let Ie=0;Ie<V;Ie++){let Te=Ie*R-P;J[x]=Te*S,J[m]=se*C,J[f]=I,c.push(J.x,J.y,J.z),J[x]=0,J[m]=0,J[f]=E>0?1:-1,u.push(J.x,J.y,J.z),d.push(Ie/A),d.push(1-Q/y),q+=1}}for(let Q=0;Q<y;Q++)for(let se=0;se<A;se++){let Ie=h+se+V*Q,Te=h+se+V*(Q+1),at=h+(se+1)+V*(Q+1),Ze=h+(se+1)+V*Q;l.push(Ie,Te,Ze),l.push(Te,at,Ze),te+=6}o.addGroup(p,te,w),p+=te,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Cn=class n extends Tt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],h=[],p=[],_=0,x=[],m=i/2,f=0;S(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new _t(d,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(p,2));function S(){let M=new B,T=new B,E=0,A=(t-e)/i;for(let y=0;y<=s;y++){let w=[],R=y/s,F=R*(t-e)+e;for(let P=0;P<=r;P++){let z=P/r,I=z*l+o,V=Math.sin(I),W=Math.cos(I);T.x=F*V,T.y=-R*i+m,T.z=F*W,d.push(T.x,T.y,T.z),M.set(V,A,W).normalize(),h.push(M.x,M.y,M.z),p.push(z,1-R),w.push(_++)}x.push(w)}for(let y=0;y<r;y++)for(let w=0;w<s;w++){let R=x[w][y],F=x[w+1][y],P=x[w+1][y+1],z=x[w][y+1];(e>0||w!==0)&&(u.push(R,F,z),E+=3),(t>0||w!==s-1)&&(u.push(F,P,z),E+=3)}c.addGroup(f,E,0),f+=E}function C(M){let T=_,E=new Oe,A=new B,y=0,w=M===!0?e:t,R=M===!0?1:-1;for(let P=1;P<=r;P++)d.push(0,m*R,0),h.push(0,R,0),p.push(.5,.5),_++;let F=_;for(let P=0;P<=r;P++){let I=P/r*l+o,V=Math.cos(I),W=Math.sin(I);A.x=w*W,A.y=m*R,A.z=w*V,d.push(A.x,A.y,A.z),h.push(0,R,0),E.x=V*.5+.5,E.y=W*.5*R+.5,p.push(E.x,E.y),_++}for(let P=0;P<r;P++){let z=T+P,I=F+P;M===!0?u.push(I,I+1,z):u.push(I+1,I,z),y+=3}c.addGroup(f,y,M===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ha=class n extends Tt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let s=[],a=[];o(r),c(i),u(),this.setAttribute("position",new _t(s,3)),this.setAttribute("normal",new _t(s.slice(),3)),this.setAttribute("uv",new _t(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let C=new B,M=new B,T=new B;for(let E=0;E<t.length;E+=3)p(t[E+0],C),p(t[E+1],M),p(t[E+2],T),l(C,M,T,S)}function l(S,C,M,T){let E=T+1,A=[];for(let y=0;y<=E;y++){A[y]=[];let w=S.clone().lerp(M,y/E),R=C.clone().lerp(M,y/E),F=E-y;for(let P=0;P<=F;P++)P===0&&y===E?A[y][P]=w:A[y][P]=w.clone().lerp(R,P/F)}for(let y=0;y<E;y++)for(let w=0;w<2*(E-y)-1;w++){let R=Math.floor(w/2);w%2===0?(h(A[y][R+1]),h(A[y+1][R]),h(A[y][R])):(h(A[y][R+1]),h(A[y+1][R+1]),h(A[y+1][R]))}}function c(S){let C=new B;for(let M=0;M<s.length;M+=3)C.x=s[M+0],C.y=s[M+1],C.z=s[M+2],C.normalize().multiplyScalar(S),s[M+0]=C.x,s[M+1]=C.y,s[M+2]=C.z}function u(){let S=new B;for(let C=0;C<s.length;C+=3){S.x=s[C+0],S.y=s[C+1],S.z=s[C+2];let M=m(S)/2/Math.PI+.5,T=f(S)/Math.PI+.5;a.push(M,1-T)}_(),d()}function d(){for(let S=0;S<a.length;S+=6){let C=a[S+0],M=a[S+2],T=a[S+4],E=Math.max(C,M,T),A=Math.min(C,M,T);E>.9&&A<.1&&(C<.2&&(a[S+0]+=1),M<.2&&(a[S+2]+=1),T<.2&&(a[S+4]+=1))}}function h(S){s.push(S.x,S.y,S.z)}function p(S,C){let M=S*3;C.x=e[M+0],C.y=e[M+1],C.z=e[M+2]}function _(){let S=new B,C=new B,M=new B,T=new B,E=new Oe,A=new Oe,y=new Oe;for(let w=0,R=0;w<s.length;w+=9,R+=6){S.set(s[w+0],s[w+1],s[w+2]),C.set(s[w+3],s[w+4],s[w+5]),M.set(s[w+6],s[w+7],s[w+8]),E.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),y.set(a[R+4],a[R+5]),T.copy(S).add(C).add(M).divideScalar(3);let F=m(T);x(E,R+0,S,F),x(A,R+2,C,F),x(y,R+4,M,F)}}function x(S,C,M,T){T<0&&S.x===1&&(a[C]=S.x-1),M.x===0&&M.z===0&&(a[C]=T/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Ps=class n extends Ha{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Rn=class n extends Tt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,p=[],_=[],x=[],m=[];for(let f=0;f<u;f++){let S=f*h-a;for(let C=0;C<c;C++){let M=C*d-s;_.push(M,-S,0),x.push(0,0,1),m.push(C/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){let C=S+c*f,M=S+c*(f+1),T=S+1+c*(f+1),E=S+1+c*f;p.push(C,M,E),p.push(M,T,E)}this.setIndex(p),this.setAttribute("position",new _t(_,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ls=class n extends Tt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);let l=[],c=[],u=[],d=[],h=new B,p=new B,_=new B;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let f=0;f<=r;f++){let S=f/r*s;p.x=(e+t*Math.cos(m))*Math.cos(S),p.y=(e+t*Math.cos(m))*Math.sin(S),p.z=t*Math.sin(m),c.push(p.x,p.y,p.z),h.x=e*Math.cos(S),h.y=e*Math.sin(S),_.subVectors(p,h).normalize(),u.push(_.x,_.y,_.z),d.push(f/r),d.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=r;m++){let f=(r+1)*x+m-1,S=(r+1)*(x-1)+m-1,C=(r+1)*(x-1)+m,M=(r+1)*x+m;l.push(f,S,M),l.push(S,C,M)}this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Yi(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Yh(r))r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Yh(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Ht(n){let e={};for(let t=0;t<n.length;t++){let i=Yi(n[t]);for(let r in i)e[r]=i[r]}return e}function Yh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Xf(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Cc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}var zu={clone:Yi,merge:Ht},qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jt=class extends En{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qf,this.fragmentShader=Yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=Xf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Le().setHex(r.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new B().fromArray(r.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(r.value);break;case"m4":this.uniforms[i].value=new We().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Wa=class extends Jt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},mn=class extends En{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qo,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Xa=class extends En{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},qa=class extends En{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function gs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Yl(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Mi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ya=class extends Mi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$l,endingEnd:$l}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kl:s=e,o=2*t-i;break;case jl:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Kl:a=e,l=2*i-t;break;case jl:a=1,l=i+r[1]-r[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(i-t)/(r-t),x=_*_,m=x*_,f=-h*m+2*h*x-h*_,S=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*_+1,C=(-1-p)*m+(1.5+p)*x+.5*_,M=p*m-p*x;for(let T=0;T!==o;++T)s[T]=f*a[u+T]+S*a[c+T]+C*a[l+T]+M*a[d+T];return s}},Za=class extends Mi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(r-t),d=1-u;for(let h=0;h!==o;++h)s[h]=a[c+h]*d+a[l+h]*u;return s}},Ja=class extends Mi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},$a=class extends Mi{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let _=(i-t)/(r-t),x=1-_;for(let m=0;m!==o;++m)s[m]=a[c+m]*x+a[l+m]*_;return s}let h=o*2,p=e-1;for(let _=0;_!==o;++_){let x=a[c+_],m=a[l+_],f=p*h+_*2,S=d[f],C=d[f+1],M=e*h+_*2,T=u[M],E=u[M+1],A=Jf(i,t,S,T,r);s[_]=Vu(A,x,C,E,m)}return s}};function Vu(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function Zf(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function Jf(n,e,t,i,r){let s=(n-e)/(r-e);for(let a=0;a<8;a++){let o=Vu(s,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let l=Zf(s,e,t,i,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var ln=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gs(t,this.TimeBufferType),this.values=gs(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:gs(e.times,Array),values:gs(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Yl(e.settings)&&(i.settings={inTangents:gs(e.settings.inTangents,Array),outTangents:gs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new $a(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case Na:t=this.InterpolantFactoryMethodLinear;break;case ba:t=this.InterpolantFactoryMethodSmooth;break;case Jl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return Na;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return Jl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Yl(this.settings)&&(Zh(this.settings.inTangents,e),Zh(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Fe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Fe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&cf(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Fe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===ba,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let _=0;_!==i;++_){let x=t[d+_];if(x!==t[h+_]||x!==t[p+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let p=0;p!==i;++p)t[h+p]=t[d+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Yl(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Zh(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=Na;var Si=class extends ln{constructor(e,t,i){super(e,t,i)}};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=cr;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends ln{constructor(e,t,i,r){super(e,t,i,r)}};Ka.prototype.ValueTypeName="color";var ja=class extends ln{constructor(e,t,i,r){super(e,t,i,r)}};ja.prototype.ValueTypeName="number";var Qa=class extends Mi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)fn.slerpFlat(s,0,a,c-o,a,c,l);return s}},br=class extends ln{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Qa(this.times,this.values,this.getValueSize(),e)}};br.prototype.ValueTypeName="quaternion";br.prototype.InterpolantFactoryMethodSmooth=void 0;var bi=class extends ln{constructor(e,t,i){super(e,t,i)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=cr;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var eo=class extends ln{constructor(e,t,i,r){super(e,t,i,r)}};eo.prototype.ValueTypeName="vector";var to=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],_=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Gu=new to,no=class{constructor(e){this.manager=e!==void 0?e:Gu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};no.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ds=class extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ri=class extends Ds{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Zl=new We,Jh=new B,$h=new B,wr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Jh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jh),$h.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($h),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Zl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Zl,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===Ms||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Zl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ma=new B,Sa=new fn,Bn=new B,Tr=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ma,Sa,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Bn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ma,Sa,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new B,Kh=new Oe,jh=new Oe,Yt=class extends Tr{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Kh,jh),t.subVectors(jh,Kh)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(or*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ec=class extends wr{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0}},ai=class extends Ds{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new ec}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},cn=class extends Tr{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},tc=class extends wr{constructor(){super(new cn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},oi=class extends Ds{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new tc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var xs=-90,_s=1,io=class extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Yt(xs,_s,e,t);r.layers=this.layers,this.add(r);let s=new Yt(xs,_s,e,t);s.layers=this.layers,this.add(s);let a=new Yt(xs,_s,e,t);a.layers=this.layers,this.add(a);let o=new Yt(xs,_s,e,t);o.layers=this.layers,this.add(o);let l=new Yt(xs,_s,e,t);l.layers=this.layers,this.add(l);let c=new Yt(xs,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===wn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},so=class extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Rc="\\[\\]\\.:\\/",$f=new RegExp("["+Rc+"]","g"),Ic="[^"+Rc+"]",Kf="[^"+Rc.replace("\\.","")+"]",jf=/((?:WC+[\/:])*)/.source.replace("WC",Ic),Qf=/(WCOD+)?/.source.replace("WCOD",Kf),ep=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ic),tp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ic),np=new RegExp("^"+jf+Qf+ep+tp+"$"),ip=["material","materials","bones","map"],nc=class{constructor(e,t,i){let r=i||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},xt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($f,"")}static parseTrackName(e){let t=np.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);ip.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=nc;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var F_=new Float32Array(1);var Qh=new We,Er=class{constructor(e,t,i=0,r=1/0){this.ray=new Vi(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ts,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Fe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Qh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qh),this}intersectObject(e,t=!0,i=[]){return ic(e,this,i,t),i.sort(eu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)ic(e[r],this,i,t);return i.sort(eu),i}};function eu(n,e){return n.distance-e.distance}function ic(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)ic(s[a],e,t,!0)}}var sc=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};var Ar=class extends Va{constructor(e=10,t=10,i=4473924,r=8947848){i=new Le(i),r=new Le(r);let s=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,p=0,_=-o;h<=t;h++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);let x=h===s?i:r;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}let u=new Tt;u.setAttribute("position",new _t(l,3)),u.setAttribute("color",new _t(c,3));let d=new Hi({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Pc(n,e,t,i){let r=sp(i);switch(t){case bc:return n*e;case uo:return n*e/r.components*r.byteLength;case fo:return n*e/r.components*r.byteLength;case Ci:return n*e*2/r.components*r.byteLength;case po:return n*e*2/r.components*r.byteLength;case wc:return n*e*3/r.components*r.byteLength;case en:return n*e*4/r.components*r.byteLength;case mo:return n*e*4/r.components*r.byteLength;case Ir:case Pr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Lr:case Dr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xo:case yo:return Math.max(n,16)*Math.max(e,8)/4;case go:case _o:return Math.max(n,8)*Math.max(e,8)/2;case vo:case Mo:case bo:case wo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case So:case Nr:case To:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ao:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Co:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Io:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case No:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Oo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Bo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ko:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case zo:case Vo:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ho:case Wo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ur:case Xo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sp(n){switch(n){case Qt:case yc:return{byteLength:1,components:1};case Os:case vc:case Ln:return{byteLength:2,components:1};case co:case ho:return{byteLength:2,components:4};case Pn:case lo:case xn:return{byteLength:4,components:1};case Mc:case Sc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function hd(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ap(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){let _=d[h],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){let x=d[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lp=`#ifdef USE_ALPHAHASH
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
#endif`,cp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fp=`#ifdef USE_AOMAP
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
#endif`,pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mp=`#ifdef USE_BATCHING
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
#endif`,gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_p=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vp=`#ifdef USE_IRIDESCENCE
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
#endif`,Mp=`#ifdef USE_BUMPMAP
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
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ip=`#define PI 3.141592653589793
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
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lp=`vec3 transformedNormal = objectNormal;
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
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Op="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kp=`#ifdef USE_ENVMAP
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
#endif`,zp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
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
}`,Jp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Qp=`#ifdef USE_ENVMAP
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
#endif`,e0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,t0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,n0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,s0=`PhysicalMaterial material;
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
#endif`,r0=`uniform sampler2D dfgLUT;
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
}`,a0=`
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
#endif`,o0=`#if defined( RE_IndirectDiffuse )
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
#endif`,l0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,c0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,h0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,x0=`#if defined( USE_POINTS_UV )
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
#endif`,_0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,v0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,M0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,b0=`#ifdef USE_MORPHTARGETS
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
#endif`,w0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,E0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,I0=`#ifdef USE_NORMALMAP
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
#endif`,P0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,L0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,F0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,O0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,B0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,q0=`float getShadowMask() {
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
}`,Y0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Z0=`#ifdef USE_SKINNING
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
#endif`,J0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$0=`#ifdef USE_SKINNING
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
#endif`,K0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,em=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tm=`#ifdef USE_TRANSMISSION
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
#endif`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lm=`uniform sampler2D t2D;
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`#include <common>
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
}`,pm=`#if DEPTH_PACKING == 3200
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
}`,mm=`#define DISTANCE
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
}`,gm=`#define DISTANCE
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_m=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`uniform float scale;
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
}`,vm=`uniform vec3 diffuse;
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
}`,Mm=`#include <common>
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
}`,Sm=`uniform vec3 diffuse;
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
}`,bm=`#define LAMBERT
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
}`,wm=`#define LAMBERT
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
}`,Tm=`#define MATCAP
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
}`,Em=`#define MATCAP
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
}`,Am=`#define NORMAL
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
}`,Cm=`#define NORMAL
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
}`,Rm=`#define PHONG
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
}`,Im=`#define PHONG
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
}`,Pm=`#define STANDARD
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
}`,Lm=`#define STANDARD
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
}`,Dm=`#define TOON
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
}`,Nm=`#define TOON
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
}`,Um=`uniform float size;
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
}`,Fm=`uniform vec3 diffuse;
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
}`,Om=`#include <common>
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
}`,Bm=`uniform vec3 color;
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
}`,km=`uniform float rotation;
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
}`,zm=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:op,alphahash_pars_fragment:lp,alphamap_fragment:cp,alphamap_pars_fragment:hp,alphatest_fragment:up,alphatest_pars_fragment:dp,aomap_fragment:fp,aomap_pars_fragment:pp,batching_pars_vertex:mp,batching_vertex:gp,begin_vertex:xp,beginnormal_vertex:_p,bsdfs:yp,iridescence_fragment:vp,bumpmap_pars_fragment:Mp,clipping_planes_fragment:Sp,clipping_planes_pars_fragment:bp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Tp,color_fragment:Ep,color_pars_fragment:Ap,color_pars_vertex:Cp,color_vertex:Rp,common:Ip,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Lp,displacementmap_pars_vertex:Dp,displacementmap_vertex:Np,emissivemap_fragment:Up,emissivemap_pars_fragment:Fp,colorspace_fragment:Op,colorspace_pars_fragment:Bp,envmap_fragment:kp,envmap_common_pars_fragment:zp,envmap_pars_fragment:Vp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:Qp,envmap_vertex:Hp,fog_vertex:Wp,fog_pars_vertex:Xp,fog_fragment:qp,fog_pars_fragment:Yp,gradientmap_pars_fragment:Zp,lightmap_pars_fragment:Jp,lights_lambert_fragment:$p,lights_lambert_pars_fragment:Kp,lights_pars_begin:jp,lights_toon_fragment:e0,lights_toon_pars_fragment:t0,lights_phong_fragment:n0,lights_phong_pars_fragment:i0,lights_physical_fragment:s0,lights_physical_pars_fragment:r0,lights_fragment_begin:a0,lights_fragment_maps:o0,lights_fragment_end:l0,lightprobes_pars_fragment:c0,logdepthbuf_fragment:h0,logdepthbuf_pars_fragment:u0,logdepthbuf_pars_vertex:d0,logdepthbuf_vertex:f0,map_fragment:p0,map_pars_fragment:m0,map_particle_fragment:g0,map_particle_pars_fragment:x0,metalnessmap_fragment:_0,metalnessmap_pars_fragment:y0,morphinstance_vertex:v0,morphcolor_vertex:M0,morphnormal_vertex:S0,morphtarget_pars_vertex:b0,morphtarget_vertex:w0,normal_fragment_begin:T0,normal_fragment_maps:E0,normal_pars_fragment:A0,normal_pars_vertex:C0,normal_vertex:R0,normalmap_pars_fragment:I0,clearcoat_normal_fragment_begin:P0,clearcoat_normal_fragment_maps:L0,clearcoat_pars_fragment:D0,iridescence_pars_fragment:N0,opaque_fragment:U0,packing:F0,premultiplied_alpha_fragment:O0,project_vertex:B0,dithering_fragment:k0,dithering_pars_fragment:z0,roughnessmap_fragment:V0,roughnessmap_pars_fragment:G0,shadowmap_pars_fragment:H0,shadowmap_pars_vertex:W0,shadowmap_vertex:X0,shadowmask_pars_fragment:q0,skinbase_vertex:Y0,skinning_pars_vertex:Z0,skinning_vertex:J0,skinnormal_vertex:$0,specularmap_fragment:K0,specularmap_pars_fragment:j0,tonemapping_fragment:Q0,tonemapping_pars_fragment:em,transmission_fragment:tm,transmission_pars_fragment:nm,uv_pars_fragment:im,uv_pars_vertex:sm,uv_vertex:rm,worldpos_vertex:am,background_vert:om,background_frag:lm,backgroundCube_vert:cm,backgroundCube_frag:hm,cube_vert:um,cube_frag:dm,depth_vert:fm,depth_frag:pm,distance_vert:mm,distance_frag:gm,equirect_vert:xm,equirect_frag:_m,linedashed_vert:ym,linedashed_frag:vm,meshbasic_vert:Mm,meshbasic_frag:Sm,meshlambert_vert:bm,meshlambert_frag:wm,meshmatcap_vert:Tm,meshmatcap_frag:Em,meshnormal_vert:Am,meshnormal_frag:Cm,meshphong_vert:Rm,meshphong_frag:Im,meshphysical_vert:Pm,meshphysical_frag:Lm,meshtoon_vert:Dm,meshtoon_frag:Nm,points_vert:Um,points_frag:Fm,shadow_vert:Om,shadow_frag:Bm,sprite_vert:km,sprite_frag:zm},me={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},qn={basic:{uniforms:Ht([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Ht([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Ht([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Ht([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Ht([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Ht([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Ht([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Ht([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Ht([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Ht([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Ht([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Ht([me.common,me.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Ht([me.lights,me.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};qn.physical={uniforms:Ht([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Jo={r:0,b:0,g:0},Vm=new We,ud=new ke;ud.set(-1,0,0,0,1,0,0,0,1);function Gm(n,e,t,i,r,s){let a=new Le(0),o=r===!0?0:1,l,c,u=null,d=0,h=null;function p(S){let C=S.isScene===!0?S.background:null;if(C&&C.isTexture){let M=S.backgroundBlurriness>0;C=e.get(C,M)}return C}function _(S){let C=!1,M=p(S);M===null?m(a,o):M&&M.isColor&&(m(M,1),C=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(S,C){let M=p(C);M&&(M.isCubeTexture||M.mapping===Cr)?(c===void 0&&(c=new je(new pn(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:Yi(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(C.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ud),c.material.toneMapped=Je.getTransfer(M.colorSpace)!==it,(u!==M||d!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,h=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new je(new Rn(2,2),new Jt({name:"BackgroundMaterial",uniforms:Yi(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=Je.getTransfer(M.colorSpace)!==it,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,h=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,C){S.getRGB(Jo,Cc(n)),t.buffers.color.setClear(Jo.r,Jo.g,Jo.b,C,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,C=1){a.set(S),o=C,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:_,addToRenderList:x,dispose:f}}function Hm(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,a=!1;function o(F,P,z,I,V){let W=!1,q=d(F,I,z,P);s!==q&&(s=q,c(s.object)),W=p(F,I,z,V),W&&_(F,I,z,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,M(F,P,z,I),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function u(F){return n.deleteVertexArray(F)}function d(F,P,z,I){let V=I.wireframe===!0,W=i[P.id];W===void 0&&(W={},i[P.id]=W);let q=F.isInstancedMesh===!0?F.id:0,te=W[q];te===void 0&&(te={},W[q]=te);let J=te[z.id];J===void 0&&(J={},te[z.id]=J);let Q=J[V];return Q===void 0&&(Q=h(l()),J[V]=Q),Q}function h(F){let P=[],z=[],I=[];for(let V=0;V<t;V++)P[V]=0,z[V]=0,I[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:I,object:F,attributes:{},index:null}}function p(F,P,z,I){let V=s.attributes,W=P.attributes,q=0,te=z.getAttributes();for(let J in te)if(te[J].location>=0){let se=V[J],Ie=W[J];if(Ie===void 0&&(J==="instanceMatrix"&&F.instanceMatrix&&(Ie=F.instanceMatrix),J==="instanceColor"&&F.instanceColor&&(Ie=F.instanceColor)),se===void 0||se.attribute!==Ie||Ie&&se.data!==Ie.data)return!0;q++}return s.attributesNum!==q||s.index!==I}function _(F,P,z,I){let V={},W=P.attributes,q=0,te=z.getAttributes();for(let J in te)if(te[J].location>=0){let se=W[J];se===void 0&&(J==="instanceMatrix"&&F.instanceMatrix&&(se=F.instanceMatrix),J==="instanceColor"&&F.instanceColor&&(se=F.instanceColor));let Ie={};Ie.attribute=se,se&&se.data&&(Ie.data=se.data),V[J]=Ie,q++}s.attributes=V,s.attributesNum=q,s.index=I}function x(){let F=s.newAttributes;for(let P=0,z=F.length;P<z;P++)F[P]=0}function m(F){f(F,0)}function f(F,P){let z=s.newAttributes,I=s.enabledAttributes,V=s.attributeDivisors;z[F]=1,I[F]===0&&(n.enableVertexAttribArray(F),I[F]=1),V[F]!==P&&(n.vertexAttribDivisor(F,P),V[F]=P)}function S(){let F=s.newAttributes,P=s.enabledAttributes;for(let z=0,I=P.length;z<I;z++)P[z]!==F[z]&&(n.disableVertexAttribArray(z),P[z]=0)}function C(F,P,z,I,V,W,q){q===!0?n.vertexAttribIPointer(F,P,z,V,W):n.vertexAttribPointer(F,P,z,I,V,W)}function M(F,P,z,I){x();let V=I.attributes,W=z.getAttributes(),q=P.defaultAttributeValues;for(let te in W){let J=W[te];if(J.location>=0){let Q=V[te];if(Q===void 0&&(te==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),te==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),Q!==void 0){let se=Q.normalized,Ie=Q.itemSize,Te=e.get(Q);if(Te===void 0)continue;let at=Te.buffer,Ze=Te.type,qe=Te.bytesPerElement,K=Ze===n.INT||Ze===n.UNSIGNED_INT||Q.gpuType===lo;if(Q.isInterleavedBufferAttribute){let ne=Q.data,pe=ne.stride,De=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let ye=0;ye<J.locationSize;ye++)f(J.location+ye,ne.meshPerAttribute);F.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ye=0;ye<J.locationSize;ye++)m(J.location+ye);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ye=0;ye<J.locationSize;ye++)C(J.location+ye,Ie/J.locationSize,Ze,se,pe*qe,(De+Ie/J.locationSize*ye)*qe,K)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<J.locationSize;ne++)f(J.location+ne,Q.meshPerAttribute);F.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<J.locationSize;ne++)m(J.location+ne);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ne=0;ne<J.locationSize;ne++)C(J.location+ne,Ie/J.locationSize,Ze,se,Ie*qe,Ie/J.locationSize*ne*qe,K)}}else if(q!==void 0){let se=q[te];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(J.location,se);break;case 3:n.vertexAttrib3fv(J.location,se);break;case 4:n.vertexAttrib4fv(J.location,se);break;default:n.vertexAttrib1fv(J.location,se)}}}}S()}function T(){w();for(let F in i){let P=i[F];for(let z in P){let I=P[z];for(let V in I){let W=I[V];for(let q in W)u(W[q].object),delete W[q];delete I[V]}}delete i[F]}}function E(F){if(i[F.id]===void 0)return;let P=i[F.id];for(let z in P){let I=P[z];for(let V in I){let W=I[V];for(let q in W)u(W[q].object),delete W[q];delete I[V]}}delete i[F.id]}function A(F){for(let P in i){let z=i[P];for(let I in z){let V=z[I];if(V[F.id]===void 0)continue;let W=V[F.id];for(let q in W)u(W[q].object),delete W[q];delete V[F.id]}}}function y(F){for(let P in i){let z=i[P],I=F.isInstancedMesh===!0?F.id:0,V=z[I];if(V!==void 0){for(let W in V){let q=V[W];for(let te in q)u(q[te].object),delete q[te];delete V[W]}delete z[I],Object.keys(z).length===0&&delete i[P]}}}function w(){R(),a=!0,s!==r&&(s=r,c(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function Wm(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Xm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==en&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let y=A===Ln&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Qt&&A!==xn&&!y&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ne("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:C,maxFragmentUniforms:M,maxSamples:T,samples:E}}function qm(n){let e=this,t=null,i=0,r=!1,s=!1,a=new rn,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let _=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{let S=s?0:i,C=S*4,M=f.clippingState||null;l.value=M,M=u(_,h,C,p);for(let T=0;T!==C;++T)M[T]=t[T];f.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,_){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,_!==!0||m===null){let f=p+x*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let C=0,M=p;C!==x;++C,M+=4)a.copy(d[C]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var zs=4,Ym=6,Zm=20,Jm=256,Fr=new cn,Hu=new Le,Lc=null,Dc=0,Nc=0,Uc=!1,$m=new B,Zi=new B,Ko=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=$m}=s;Lc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lc,Dc,Nc),this._renderer.xr.enabled=Uc,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:Ln,format:en,colorSpace:hr,depthBuffer:!1},r=Wu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wu(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Km(s)),this._blurMaterial=Qm(s,e,t),this._ggxMaterial=jm(s,e,t)}return r}_compileMaterial(e){let t=new je(new Tt,e);this._renderer.compile(t,Fr)}_sceneToCubeUV(e,t,i,r,s){let l=new Yt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Hu),d.toneMapping=In,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new je(new pn,new An({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,f=!1,S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,f=!0):(m.color.copy(Hu),f=!0);for(let C=0;C<6;C++){let M=C%3;M===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):M===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));let T=this._cubeSize;ks(r,M*T,C>2?T:0,T,T),d.setRenderTarget(r),f&&d.render(x,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Ti||e.mapping===qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=qu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xu());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;ks(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Fr)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:_}=this,x=this._sizeLods[i],m=3*x*(i>_-zs?i-_+zs:0),f=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-t,ks(s,m,f,3*x,2*x),r.setRenderTarget(s),r.render(o,Fr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,ks(e,m,f,3*x,2*x),r.setRenderTarget(e),r.render(o,Fr)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],d=3*u*(r>this._lodMax-zs?r-this._lodMax+zs:0),h=4*(this._cubeSize-u);ks(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,Fr)}};function Km(n){let e=[],t=[],i=n,r=n-zs+1+Ym;for(let s=0;s<r;s++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,_=new Float32Array(p*h*d),x=new Float32Array(p*h*d);for(let f=0;f<d;f++){let S=f%3*2/3-1,C=f>2?0:-1,M=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];_.set(M,p*h*f);for(let T=0;T<h;T++){let E=u[T*2]*2-1,A=u[T*2+1]*2-1;f===0?Zi.set(1,A,E):f===1?Zi.set(-E,1,-A):f===2?Zi.set(-E,A,1):f===3?Zi.set(-1,A,-E):f===4?Zi.set(-E,-1,A):Zi.set(E,A,-1),Zi.toArray(x,(f*h+T)*p)}}let m=new Tt;m.setAttribute("position",new Vt(_,p)),m.setAttribute("outputDirection",new Vt(x,p)),t.push(new je(m,null)),i>zs&&i--}return{lodMeshes:t,sizeLods:e}}function Wu(n,e,t){let i=new Gt(n,e,t);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function jm(n,e,t){return new Jt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Jm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qo(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Qm(n,e,t){return new Jt({name:"SphericalGaussianBlur",defines:{SAMPLES:Zm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Qo(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Xu(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qo(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function qu(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Qo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var jo=class extends Gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Mr(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pn(5,5,5),s=new Jt({name:"CubemapFromEquirect",uniforms:Yi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Wn});s.uniforms.tEquirect.value=t;let a=new je(r,s),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=Ft),new io(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function eg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){let p=h.mapping;if(p===ro||p===ao)if(e.has(h)){let _=e.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let x=new jo(_.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,_=p===ro||p===ao,x=p===Ti||p===qi;if(_||x){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new Ko(n)),m=_?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let S=h.image;return _&&S&&S.height>0||x&&S&&l(S)?(i===null&&(i=new Ko(n)),m=_?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===ro?h.mapping=Ti:p===ao&&(h.mapping=qi),h}function l(h){let p=0,_=6;for(let x=0;x<_;x++)h[x]!==void 0&&p++;return p===_}function c(h){let p=h.target;p.removeEventListener("dispose",c);let _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function tg(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&zi("WebGLRenderer: "+i+" extension not supported."),r}}}function ng(n,e,t,i){let r={},s=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete r[h.id];let p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,_=d.attributes.position,x=0;if(_===void 0)return;if(p!==null){let S=p.array;x=p.version;for(let C=0,M=S.length;C<M;C+=3){let T=S[C+0],E=S[C+1],A=S[C+2];h.push(T,E,E,A,A,T)}}else{let S=_.array;x=_.version;for(let C=0,M=S.length/3-1;C<M;C+=3){let T=C+0,E=C+1,A=C+2;h.push(T,E,E,A,A,T)}}let m=new(_.count>=65535?gr:mr)(h,1);m.version=x;let f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){let h=s.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function ig(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,s,d*a),t.update(h,i,1)}function c(d,h,p){p!==0&&(n.drawElementsInstanced(i,h,s,d*a,p),t.update(h,i,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,p);let x=0;for(let m=0;m<p;m++)x+=h[m];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function sg(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Fe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function rg(n,e,t){let i=new WeakMap,r=new yt;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],C=0;p===!0&&(C=1),_===!0&&(C=2),x===!0&&(C=3);let M=o.attributes.position.count*C,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let E=new Float32Array(M*T*4*d),A=new pr(E,M,T,d);A.type=xn,A.needsUpdate=!0;let y=C*4;for(let R=0;R<d;R++){let F=m[R],P=f[R],z=S[R],I=M*T*4*R;for(let V=0;V<F.count;V++){let W=V*y;p===!0&&(r.fromBufferAttribute(F,V),E[I+W+0]=r.x,E[I+W+1]=r.y,E[I+W+2]=r.z,E[I+W+3]=0),_===!0&&(r.fromBufferAttribute(P,V),E[I+W+4]=r.x,E[I+W+5]=r.y,E[I+W+6]=r.z,E[I+W+7]=0),x===!0&&(r.fromBufferAttribute(z,V),E[I+W+8]=r.x,E[I+W+9]=r.y,E[I+W+10]=r.z,E[I+W+11]=z.itemSize===4?r.w:1)}}h={count:d,texture:A,size:new Oe(M,T)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function ag(n,e,t,i,r){let s=new WeakMap;function a(c){let u=r.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return h}function o(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var og={[dc]:"LINEAR_TONE_MAPPING",[fc]:"REINHARD_TONE_MAPPING",[pc]:"CINEON_TONE_MAPPING",[Fs]:"ACES_FILMIC_TONE_MAPPING",[gc]:"AGX_TONE_MAPPING",[xc]:"NEUTRAL_TONE_MAPPING",[mc]:"CUSTOM_TONE_MAPPING"};function lg(n,e,t,i,r,s){let a=new Gt(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Tt;c.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new _t([0,2,0,0,2,0],2));let u=new Wa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new je(c,u),h=new cn(-1,1,1,-1,0,1),p=null,_=null,x=!1,m,f=null,S=[],C=!1;this.setSize=function(M,T){a.setSize(M,T),o!==null&&o.setSize(M,T),l!==null&&l.setSize(M,T);for(let E=0;E<S.length;E++){let A=S[E];A.setSize&&A.setSize(M,T)}},this.setEffects=function(M){S=M,C=S.length>0&&S[0].isRenderPass===!0;let T=a.width,E=a.height;S.length>0&&o===null&&(o=new Gt(T,E,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),l=new Gt(T,E,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){let y=S[A];y.setSize&&y.setSize(T,E)}},this.begin=function(M,T){if(x||M.toneMapping===In&&S.length===0)return!1;if(f=T,T!==null){let E=T.width,A=T.height;(a.width!==E||a.height!==A)&&this.setSize(E,A)}return C===!1&&M.setRenderTarget(a),m=M.toneMapping,M.toneMapping=In,!0},this.hasRenderPass=function(){return C},this.end=function(M,T){M.toneMapping=m,x=!0;let E=a,A=o;for(let y=0;y<S.length;y++){let w=S[y];w.enabled!==!1&&(w.render(M,A,E,T),w.needsSwap!==!1&&(E=A,A=A===o?l:o))}if(p!==M.outputColorSpace||_!==M.toneMapping){p=M.outputColorSpace,_=M.toneMapping,u.defines={},Je.getTransfer(p)===it&&(u.defines.SRGB_TRANSFER="");let y=og[_];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,M.setRenderTarget(f),M.render(d,h),f=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var dd=new Zt,Bc=new vi(1,1),fd=new pr,pd=new Oa,md=new Mr,Yu=[],Zu=[],Ju=new Float32Array(16),$u=new Float32Array(9),Ku=new Float32Array(4);function Gs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=Yu[r];if(s===void 0&&(s=new Float32Array(r),Yu[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function It(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function el(n,e){let t=Zu[e];t===void 0&&(t=new Int32Array(e),Zu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function cg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function hg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function ug(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function dg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function fg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,i))return;Ku.set(i),n.uniformMatrix2fv(this.addr,!1,Ku),Pt(t,i)}}function pg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,i))return;$u.set(i),n.uniformMatrix3fv(this.addr,!1,$u),Pt(t,i)}}function mg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,i))return;Ju.set(i),n.uniformMatrix4fv(this.addr,!1,Ju),Pt(t,i)}}function gg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function xg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function _g(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function yg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function vg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Mg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function Sg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function bg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function wg(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Bc.compareFunction=t.isReversedDepthBuffer()?Zo:Yo,s=Bc):s=dd,t.setTexture2D(e||s,r)}function Tg(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||pd,r)}function Eg(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||md,r)}function Ag(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||fd,r)}function Cg(n){switch(n){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return xg;case 35668:case 35672:return _g;case 35669:case 35673:return yg;case 5125:return vg;case 36294:return Mg;case 36295:return Sg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Tg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Ag}}function Rg(n,e){n.uniform1fv(this.addr,e)}function Ig(n,e){let t=Gs(e,this.size,2);n.uniform2fv(this.addr,t)}function Pg(n,e){let t=Gs(e,this.size,3);n.uniform3fv(this.addr,t)}function Lg(n,e){let t=Gs(e,this.size,4);n.uniform4fv(this.addr,t)}function Dg(n,e){let t=Gs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Ng(n,e){let t=Gs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ug(n,e){let t=Gs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Fg(n,e){n.uniform1iv(this.addr,e)}function Og(n,e){n.uniform2iv(this.addr,e)}function Bg(n,e){n.uniform3iv(this.addr,e)}function kg(n,e){n.uniform4iv(this.addr,e)}function zg(n,e){n.uniform1uiv(this.addr,e)}function Vg(n,e){n.uniform2uiv(this.addr,e)}function Gg(n,e){n.uniform3uiv(this.addr,e)}function Hg(n,e){n.uniform4uiv(this.addr,e)}function Wg(n,e,t){let i=this.cache,r=e.length,s=el(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Bc:a=dd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Xg(n,e,t){let i=this.cache,r=e.length,s=el(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||pd,s[a])}function qg(n,e,t){let i=this.cache,r=e.length,s=el(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||md,s[a])}function Yg(n,e,t){let i=this.cache,r=e.length,s=el(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Pt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||fd,s[a])}function Zg(n){switch(n){case 5126:return Rg;case 35664:return Ig;case 35665:return Pg;case 35666:return Lg;case 35674:return Dg;case 35675:return Ng;case 35676:return Ug;case 5124:case 35670:return Fg;case 35667:case 35671:return Og;case 35668:case 35672:return Bg;case 35669:case 35673:return kg;case 5125:return zg;case 36294:return Vg;case 36295:return Gg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Wg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}}var kc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Cg(t.type)}},zc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zg(t.type)}},Vc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},Fc=/(\w+)(\])?(\[|\.)?/g;function ju(n,e){n.seq.push(e),n.map[e.id]=e}function Jg(n,e,t){let i=n.name,r=i.length;for(Fc.lastIndex=0;;){let s=Fc.exec(i),a=Fc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ju(t,c===void 0?new kc(o,n,e):new zc(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Vc(o),ju(t,d)),t=d}}}var Vs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Jg(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function Qu(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var $g=37297,Kg=0;function jg(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var ed=new ke;function Qg(n){Je._getMatrix(ed,Je.workingColorSpace,n);let e=`mat3( ${ed.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case ur:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function td(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+jg(n.getShaderSource(e),o)}else return s}function ex(n,e){let t=Qg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var tx={[dc]:"Linear",[fc]:"Reinhard",[pc]:"Cineon",[Fs]:"ACESFilmic",[gc]:"AgX",[xc]:"Neutral",[mc]:"Custom"};function nx(n,e){let t=tx[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var $o=new B;function ix(){Je.getLuminanceCoefficients($o);let n=$o.x.toFixed(4),e=$o.y.toFixed(4),t=$o.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function rx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ax(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Br(n){return n!==""}function nd(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function id(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ox=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gc(n){return n.replace(ox,cx)}var lx=new Map;function cx(n,e){let t=Xe[e];if(t===void 0){let i=lx.get(e);if(i!==void 0)t=Xe[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Gc(t)}var hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sd(n){return n.replace(hx,ux)}function ux(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rd(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var dx={[Wi]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function fx(n){return dx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var px={[Ti]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE_UV"};function mx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":px[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var gx={[qi]:"ENVMAP_MODE_REFRACTION"};function xx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":gx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var _x={[uc]:"ENVMAP_BLENDING_MULTIPLY",[Su]:"ENVMAP_BLENDING_MIX",[bu]:"ENVMAP_BLENDING_ADD"};function yx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":_x[n.combine]||"ENVMAP_BLENDING_NONE"}function vx(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Mx(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=fx(t),c=mx(t),u=xx(t),d=yx(t),h=vx(t),p=sx(t),_=rx(s),x=r.createProgram(),m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Br).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Br).join(`
`),f.length>0&&(f+=`
`)):(m=[rd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),f=[rd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?Xe.tonemapping_pars_fragment:"",t.toneMapping!==In?nx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,ex("linearToOutputTexel",t.outputColorSpace),ix(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Br).join(`
`)),a=Gc(a),a=nd(a,t),a=id(a,t),o=Gc(o),o=nd(o,t),o=id(o,t),a=sd(a),o=sd(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let C=S+m+a,M=S+f+o,T=Qu(r,r.VERTEX_SHADER,C),E=Qu(r,r.FRAGMENT_SHADER,M);r.attachShader(x,T),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(F){if(n.debug.checkShaderErrors){let P=r.getProgramInfoLog(x)||"",z=r.getShaderInfoLog(T)||"",I=r.getShaderInfoLog(E)||"",V=P.trim(),W=z.trim(),q=I.trim(),te=!0,J=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,T,E);else{let Q=td(r,T,"vertex"),se=td(r,E,"fragment");Fe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+V+`
`+Q+`
`+se)}else V!==""?Ne("WebGLProgram: Program Info Log:",V):(W===""||q==="")&&(J=!1);J&&(F.diagnostics={runnable:te,programLog:V,vertexShader:{log:W,prefix:m},fragmentShader:{log:q,prefix:f}})}r.deleteShader(T),r.deleteShader(E),y=new Vs(r,x),w=ax(r,x)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(x,$g)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=E,this}var Sx=0,Hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Wc(e),t.set(e,i)),i}},Wc=class{constructor(e){this.id=Sx++,this.code=e,this.usedTimes=0}};function bx(n){return n===Ci||n===Nr||n===Ur}function wx(n,e,t,i,r,s){let a=new Ts,o=new Hc,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,w,R,F,P,z){let I=F.fog,V=P.geometry,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,te=e.get(y.envMap||W,q),J=te&&te.mapping===Cr?te.image.height:null,Q=p[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Ne("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let se=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ie=se!==void 0?se.length:0,Te=0;V.morphAttributes.position!==void 0&&(Te=1),V.morphAttributes.normal!==void 0&&(Te=2),V.morphAttributes.color!==void 0&&(Te=3);let at,Ze,qe,K;if(Q){let dt=qn[Q];at=dt.vertexShader,Ze=dt.fragmentShader}else{at=y.vertexShader,Ze=y.fragmentShader;let dt=o.getVertexShaderStage(y),tt=o.getFragmentShaderStage(y);o.update(y,dt,tt),qe=dt.id,K=tt.id}let ne=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),De=P.isInstancedMesh===!0,ye=P.isBatchedMesh===!0,Ve=!!y.map,ut=!!y.matcap,Be=!!te,Ge=!!y.aoMap,st=!!y.lightMap,ze=!!y.bumpMap&&y.wireframe===!1,et=!!y.normalMap,bt=!!y.displacementMap,Lt=!!y.emissiveMap,mt=!!y.metalnessMap,St=!!y.roughnessMap,O=y.anisotropy>0,Z=y.clearcoat>0,ie=y.dispersion>0,b=y.retroreflectivity>0,g=y.iridescence>0,L=y.sheen>0,k=y.transmission>0,X=O&&!!y.anisotropyMap,oe=Z&&!!y.clearcoatMap,ae=Z&&!!y.clearcoatNormalMap,$=Z&&!!y.clearcoatRoughnessMap,j=g&&!!y.iridescenceMap,le=g&&!!y.iridescenceThicknessMap,Ee=L&&!!y.sheenColorMap,ue=L&&!!y.sheenRoughnessMap,he=!!y.specularMap,ce=!!y.specularColorMap,ve=!!y.specularIntensityMap,Ue=k&&!!y.transmissionMap,D=k&&!!y.thicknessMap,de=!!y.gradientMap,ee=!!y.alphaMap,fe=y.alphaTest>0,_e=!!y.alphaHash,re=!!y.extensions,Pe=In;y.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Pe=n.toneMapping);let Ae={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:at,fragmentShader:Ze,defines:y.defines,customVertexShaderID:qe,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:ye,batchingColor:ye&&P._colorsTexture!==null,instancing:De,instancingColor:De&&P.instanceColor!==null,instancingMorph:De&&P.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ve,matcap:ut,envMap:Be,envMapMode:Be&&te.mapping,envMapCubeUVHeight:J,aoMap:Ge,lightMap:st,bumpMap:ze,normalMap:et,displacementMap:bt,emissiveMap:Lt,normalMapObjectSpace:et&&y.normalMapType===Eu,normalMapTangentSpace:et&&y.normalMapType===qo,packedNormalMap:et&&y.normalMapType===qo&&bx(y.normalMap.format),metalnessMap:mt,roughnessMap:St,anisotropy:O,anisotropyMap:X,clearcoat:Z,clearcoatMap:oe,clearcoatNormalMap:ae,clearcoatRoughnessMap:$,dispersion:ie,retroreflection:b,iridescence:g,iridescenceMap:j,iridescenceThicknessMap:le,sheen:L,sheenColorMap:Ee,sheenRoughnessMap:ue,specularMap:he,specularColorMap:ce,specularIntensityMap:ve,transmission:k,transmissionMap:Ue,thicknessMap:D,gradientMap:de,opaque:y.transparent===!1&&y.blending===Us&&y.alphaToCoverage===!1,alphaMap:ee,alphaTest:fe,alphaHash:_e,combine:y.combine,mapUv:Ve&&_(y.map.channel),aoMapUv:Ge&&_(y.aoMap.channel),lightMapUv:st&&_(y.lightMap.channel),bumpMapUv:ze&&_(y.bumpMap.channel),normalMapUv:et&&_(y.normalMap.channel),displacementMapUv:bt&&_(y.displacementMap.channel),emissiveMapUv:Lt&&_(y.emissiveMap.channel),metalnessMapUv:mt&&_(y.metalnessMap.channel),roughnessMapUv:St&&_(y.roughnessMap.channel),anisotropyMapUv:X&&_(y.anisotropyMap.channel),clearcoatMapUv:oe&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(y.sheenRoughnessMap.channel),specularMapUv:he&&_(y.specularMap.channel),specularColorMapUv:ce&&_(y.specularColorMap.channel),specularIntensityMapUv:ve&&_(y.specularIntensityMap.channel),transmissionMapUv:Ue&&_(y.transmissionMap.channel),thicknessMapUv:D&&_(y.thicknessMap.channel),alphaMapUv:ee&&_(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(et||O),vertexNormals:!!V.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!V.attributes.uv&&(Ve||ee),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||V.attributes.normal===void 0&&et===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Te,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Ve&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===it,decodeVideoTextureEmissive:Lt&&y.emissiveMap.isVideoTexture===!0&&Je.getTransfer(y.emissiveMap.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===gn,flipSided:y.side===$t,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&y.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function m(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)w.push(R),w.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(f(w,y),S(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function f(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function S(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function C(y){let w=p[y.type],R;if(w){let F=qn[w];R=zu.clone(F.uniforms)}else R=y.uniforms;return R}function M(y,w){let R=u.get(w);return R!==void 0?++R.usedTimes:(R=new Mx(n,w,y,r),c.push(R),u.set(w,R)),R}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:C,acquireProgram:M,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:A}}function Tx(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Ex(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ad(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function od(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,x,m,f){let S=n[e];return S===void 0?(S={id:h.id,object:h,geometry:p,material:_,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:f},n[e]=S):(S.id=h.id,S.object=h,S.geometry=p,S.material=_,S.materialVariant=a(h),S.groupOrder=x,S.renderOrder=h.renderOrder,S.z=m,S.group=f),e++,S}function l(h,p,_,x,m,f,S){S.reversedDepth===!0&&(m=-m);let C=o(h,p,_,x,m,f);_.transmission>0?i.push(C):_.transparent===!0?r.push(C):t.push(C)}function c(h,p,_,x,m,f){let S=o(h,p,_,x,m,f);_.transmission>0?i.unshift(S):_.transparent===!0?r.unshift(S):t.unshift(S)}function u(h,p){t.length>1&&t.sort(h||Ex),i.length>1&&i.sort(p||ad),r.length>1&&r.sort(p||ad)}function d(){for(let h=e,p=n.length;h<p;h++){let _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function Ax(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new od,n.set(i,[a])):r>=s.length?(a=new od,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Cx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new Le};break;case"SpotLight":t={position:new B,direction:new B,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function Rx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Ix=0;function Px(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Lx(n){let e=new Cx,t=Rx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);let r=new B,s=new We,a=new We;function o(c){let u=0,d=0,h=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let p=0,_=0,x=0,m=0,f=0,S=0,C=0,M=0,T=0,E=0,A=0,y=0,w=0,R=0;c.sort(Px);for(let P=0,z=c.length;P<z;P++){let I=c[P],V=I.color,W=I.intensity,q=I.distance,te=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ci?te=I.shadow.map.texture:te=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=V.r*W,d+=V.g*W,h+=V.b*W;else if(I.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(I.sh.coefficients[J],W);R++}else if(I.isSunLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[_]=se,i.sunShadowMap[_]=te;let Ie=Q.getViewportCount();for(let Te=0;Te<Ie;Te++)i.sunShadowMatrix[x+Te]=Q.getMatrix(Te),i.sunShadowCascade[x+Te]=Q._cascadeData[Te];x+=Ie,_++}i.sun[p]=J,p++}else if(I.isDirectionalLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,i.directionalShadow[m]=se,i.directionalShadowMap[m]=te,i.directionalShadowMatrix[m]=I.shadow.matrix,T++}i.directional[m]=J,m++}else if(I.isSpotLight){let J=e.get(I);J.position.setFromMatrixPosition(I.matrixWorld),J.color.copy(V).multiplyScalar(W),J.distance=q,J.coneCos=Math.cos(I.angle),J.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),J.decay=I.decay,i.spot[S]=J;let Q=I.shadow;if(I.map&&(i.spotLightMap[y]=I.map,y++,Q.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[S]=Q.matrix,I.castShadow){let se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,i.spotShadow[S]=se,i.spotShadowMap[S]=te,A++}S++}else if(I.isRectAreaLight){let J=e.get(I);J.color.copy(V).multiplyScalar(W),J.halfWidth.set(I.width*.5,0,0),J.halfHeight.set(0,I.height*.5,0),i.rectArea[C]=J,C++}else if(I.isPointLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),J.distance=I.distance,J.decay=I.decay,I.castShadow){let Q=I.shadow,se=t.get(I);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,se.shadowCameraNear=Q.camera.near,se.shadowCameraFar=Q.camera.far,i.pointShadow[f]=se,i.pointShadowMap[f]=te,i.pointShadowMatrix[f]=I.shadow.matrix,E++}i.point[f]=J,f++}else if(I.isHemisphereLight){let J=e.get(I);J.skyColor.copy(I.color).multiplyScalar(W),J.groundColor.copy(I.groundColor).multiplyScalar(W),i.hemi[M]=J,M++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let F=i.hash;(F.sunLength!==p||F.directionalLength!==m||F.pointLength!==f||F.spotLength!==S||F.rectAreaLength!==C||F.hemiLength!==M||F.numSunShadows!==_||F.numDirectionalShadows!==T||F.numPointShadows!==E||F.numSpotShadows!==A||F.numSpotMaps!==y||F.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=m,i.spot.length=S,i.rectArea.length=C,i.point.length=f,i.hemi.length=M,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+y-w,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,F.sunLength=p,F.directionalLength=m,F.pointLength=f,F.spotLength=S,F.rectAreaLength=C,F.hemiLength=M,F.numSunShadows=_,F.numDirectionalShadows=T,F.numPointShadows=E,F.numSpotShadows=A,F.numSpotMaps=y,F.numLightProbes=R,i.version=Ix++)}function l(c,u){let d=0,h=0,p=0,_=0,x=0,m=0,f=u.matrixWorldInverse;for(let S=0,C=c.length;S<C;S++){let M=c[S];if(M.isSunLight){let T=i.sun[d];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(f),d++}else if(M.isDirectionalLight){let T=i.directional[h];T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),h++}else if(M.isSpotLight){let T=i.spot[_];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),_++}else if(M.isRectAreaLight){let T=i.rectArea[x];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(f),a.identity(),s.copy(M.matrixWorld),s.premultiply(f),a.extractRotation(s),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){let T=i.point[p];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){let T=i.hemi[m];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function ld(n){let e=new Lx(n),t=[],i=[],r=[];function s(h){d.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Dx(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new ld(n),e.set(r,[o])):s>=a.length?(o=new ld(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var Nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ux=`uniform sampler2D shadow_pass;
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
}`,Fx=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Ox=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],cd=new We,Or=new B,Oc=new B;function Bx(n,e,t){let i=new Cs,r=new Oe,s=new Oe,a=new yt,o=new Xa,l=new qa,c={},u=t.maxTextureSize,d={[wi]:$t,[$t]:wi,[gn]:gn},h=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Nx,fragmentShader:Ux}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new Tt;_.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new je(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wi;let f=this.type;this.render=function(E,A,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===iu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wi);let w=n.getRenderTarget(),R=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),P=n.state;P.setBlending(Wn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let z=f!==this.type;z&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(V=>V.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,V=E.length;I<V;I++){let W=E[I],q=W.shadow;if(q===void 0){Ne("WebGLShadowMap:",W,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);let te=q.getFrameExtents();r.multiply(te),s.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,q.mapSize.y=s.y));let J=n.state.buffers.depth.getReversed();if(q.camera._reversedDepth=J,q.map===null||z===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Ns){if(W.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Gt(r.x,r.y,{format:Ci,type:Ln,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),q.map.texture.name=W.name+".shadowMap",q.map.depthTexture=new vi(r.x,r.y,xn),q.map.depthTexture.name=W.name+".shadowMapDepth",q.map.depthTexture.format=zn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=vt,q.map.depthTexture.magFilter=vt}else W.isPointLight?(q.map=new jo(r.x),q.map.depthTexture=new Ga(r.x,Pn)):(q.map=new Gt(r.x,r.y),q.map.depthTexture=new vi(r.x,r.y,Pn)),q.map.depthTexture.name=W.name+".shadowMap",q.map.depthTexture.format=zn,this.type===Wi?(q.map.depthTexture.compareFunction=J?Zo:Yo,q.map.depthTexture.minFilter=Ft,q.map.depthTexture.magFilter=Ft):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=vt,q.map.depthTexture.magFilter=vt);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==r.x||q.map.height!==r.y)&&q.map.setSize(r.x,r.y);let Q=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();W.isPointLight!==!0&&q.updateMatrices(W,y);for(let se=0;se<Q;se++){let Ie=q.getCamera(se);if(W.isPointLight){let Te=q.camera,at=q.matrix,Ze=W.distance||Te.far;Ze!==Te.far&&(Te.far=Ze,Te.updateProjectionMatrix()),Or.setFromMatrixPosition(W.matrixWorld),Te.position.copy(Or),Oc.copy(Te.position),Oc.add(Fx[se]),Te.up.copy(Ox[se]),Te.lookAt(Oc),Te.updateMatrixWorld(),at.makeTranslation(-Or.x,-Or.y,-Or.z),cd.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),q._frustum.setFromProjectionMatrix(cd,Te.coordinateSystem,Te.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)n.setRenderTarget(q.map,se),n.clear();else{se===0&&(n.setRenderTarget(q.map),n.clear());let Te=q.getViewport(se);a.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),P.viewport(a)}i=q.getFrustum(se),M(A,y,Ie,W,this.type)}q.isPointLightShadow!==!0&&this.type===Ns&&S(q,y),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,R,F)};function S(E,A){let y=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Gt(r.x,r.y,{format:Ci,type:Ln}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(A,null,y,h,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(A,null,y,p,x,null)}function C(E,A,y,w){let R=null,F=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(F!==void 0)R=F;else if(R=y.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let P=R.uuid,z=A.uuid,I=c[P];I===void 0&&(I={},c[P]=I);let V=I[z];V===void 0&&(V=R.clone(),I[z]=V,A.addEventListener("dispose",T)),R=V}if(R.visible=A.visible,R.wireframe=A.wireframe,w===Ns?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:d[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let P=n.properties.get(R);P.light=y}return R}function M(E,A,y,w,R){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===Ns)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let z=e.update(E),I=E.material;if(Array.isArray(I)){let V=z.groups;for(let W=0,q=V.length;W<q;W++){let te=V[W],J=I[te.materialIndex];if(J&&J.visible){let Q=C(E,J,w,R);E.onBeforeShadow(n,E,A,y,z,Q,te),n.renderBufferDirect(y,null,z,Q,E,te),E.onAfterShadow(n,E,A,y,z,Q,te)}}}else if(I.visible){let V=C(E,I,w,R);E.onBeforeShadow(n,E,A,y,z,V,null),n.renderBufferDirect(y,null,z,V,E,null),E.onAfterShadow(n,E,A,y,z,V,null)}}let P=E.children;for(let z=0,I=P.length;z<I;z++)M(P[z],A,y,w,R)}function T(E){E.target.removeEventListener("dispose",T);for(let y in c){let w=c[y],R=E.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function kx(n,e){function t(){let D=!1,de=new yt,ee=null,fe=new yt(0,0,0,0);return{setMask:function(_e){ee!==_e&&!D&&(n.colorMask(_e,_e,_e,_e),ee=_e)},setLocked:function(_e){D=_e},setClear:function(_e,re,Pe,Ae,dt){dt===!0&&(_e*=Ae,re*=Ae,Pe*=Ae),de.set(_e,re,Pe,Ae),fe.equals(de)===!1&&(n.clearColor(_e,re,Pe,Ae),fe.copy(de))},reset:function(){D=!1,ee=null,fe.set(-1,0,0,0)}}}function i(){let D=!1,de=!1,ee=null,fe=null,_e=null;return{setReversed:function(re){if(de!==re){let Pe=e.get("EXT_clip_control");re?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),de=re;let Ae=_e;_e=null,this.setClear(Ae)}},getReversed:function(){return de},setTest:function(re){re?ne(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(re){ee!==re&&!D&&(n.depthMask(re),ee=re)},setFunc:function(re){if(de&&(re=Ou[re]),fe!==re){switch(re){case Ta:n.depthFunc(n.NEVER);break;case Ea:n.depthFunc(n.ALWAYS);break;case Aa:n.depthFunc(n.LESS);break;case vs:n.depthFunc(n.LEQUAL);break;case Ca:n.depthFunc(n.EQUAL);break;case Ra:n.depthFunc(n.GEQUAL);break;case Ia:n.depthFunc(n.GREATER);break;case Pa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=re}},setLocked:function(re){D=re},setClear:function(re){_e!==re&&(_e=re,de&&(re=1-re),n.clearDepth(re))},reset:function(){D=!1,ee=null,fe=null,_e=null,de=!1}}}function r(){let D=!1,de=null,ee=null,fe=null,_e=null,re=null,Pe=null,Ae=null,dt=null;return{setTest:function(tt){D||(tt?ne(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(tt){de!==tt&&!D&&(n.stencilMask(tt),de=tt)},setFunc:function(tt,yn,Fn){(ee!==tt||fe!==yn||_e!==Fn)&&(n.stencilFunc(tt,yn,Fn),ee=tt,fe=yn,_e=Fn)},setOp:function(tt,yn,Fn){(re!==tt||Pe!==yn||Ae!==Fn)&&(n.stencilOp(tt,yn,Fn),re=tt,Pe=yn,Ae=Fn)},setLocked:function(tt){D=tt},setClear:function(tt){dt!==tt&&(n.clearStencil(tt),dt=tt)},reset:function(){D=!1,de=null,ee=null,fe=null,_e=null,re=null,Pe=null,Ae=null,dt=null}}}let s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap,u={},d={},h={},p=new WeakMap,_=[],x=null,m=!1,f=null,S=null,C=null,M=null,T=null,E=null,A=null,y=new Le(0,0,0),w=0,R=!1,F=null,P=null,z=null,I=null,V=null,W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,te=0,J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(J)[1]),q=te>=1):J.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),q=te>=2);let Q=null,se={},Ie=n.getParameter(n.SCISSOR_BOX),Te=n.getParameter(n.VIEWPORT),at=new yt().fromArray(Ie),Ze=new yt().fromArray(Te);function qe(D,de,ee,fe){let _e=new Uint8Array(4),re=n.createTexture();n.bindTexture(D,re),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<ee;Pe++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(de+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return re}let K={};K[n.TEXTURE_2D]=qe(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=qe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=qe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=qe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(vs),ze(!1),et(rc),ne(n.CULL_FACE),Ge(Wn);function ne(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function pe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function De(D,de){return h[D]!==de?(n.bindFramebuffer(D,de),h[D]=de,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function ye(D,de){let ee=_,fe=!1;if(D){ee=p.get(de),ee===void 0&&(ee=[],p.set(de,ee));let _e=D.textures;if(ee.length!==_e.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Pe=_e.length;re<Pe;re++)ee[re]=n.COLOR_ATTACHMENT0+re;ee.length=_e.length,fe=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,fe=!0);fe&&n.drawBuffers(ee)}function Ve(D){return x!==D?(n.useProgram(D),x=D,!0):!1}let ut={[Xi]:n.FUNC_ADD,[ru]:n.FUNC_SUBTRACT,[au]:n.FUNC_REVERSE_SUBTRACT};ut[ou]=n.MIN,ut[lu]=n.MAX;let Be={[cu]:n.ZERO,[hu]:n.ONE,[uu]:n.SRC_COLOR,[cc]:n.SRC_ALPHA,[xu]:n.SRC_ALPHA_SATURATE,[mu]:n.DST_COLOR,[fu]:n.DST_ALPHA,[du]:n.ONE_MINUS_SRC_COLOR,[hc]:n.ONE_MINUS_SRC_ALPHA,[gu]:n.ONE_MINUS_DST_COLOR,[pu]:n.ONE_MINUS_DST_ALPHA,[_u]:n.CONSTANT_COLOR,[yu]:n.ONE_MINUS_CONSTANT_COLOR,[vu]:n.CONSTANT_ALPHA,[Mu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ge(D,de,ee,fe,_e,re,Pe,Ae,dt,tt){if(D===Wn){m===!0&&(pe(n.BLEND),m=!1);return}if(m===!1&&(ne(n.BLEND),m=!0),D!==su){if(D!==f||tt!==R){if((S!==Xi||T!==Xi)&&(n.blendEquation(n.FUNC_ADD),S=Xi,T=Xi),tt)switch(D){case Us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ac:n.blendFunc(n.ONE,n.ONE);break;case oc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case lc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Fe("WebGLState: Invalid blending: ",D);break}else switch(D){case Us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ac:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case oc:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lc:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",D);break}C=null,M=null,E=null,A=null,y.set(0,0,0),w=0,f=D,R=tt}return}_e=_e||de,re=re||ee,Pe=Pe||fe,(de!==S||_e!==T)&&(n.blendEquationSeparate(ut[de],ut[_e]),S=de,T=_e),(ee!==C||fe!==M||re!==E||Pe!==A)&&(n.blendFuncSeparate(Be[ee],Be[fe],Be[re],Be[Pe]),C=ee,M=fe,E=re,A=Pe),(Ae.equals(y)===!1||dt!==w)&&(n.blendColor(Ae.r,Ae.g,Ae.b,dt),y.copy(Ae),w=dt),f=D,R=!1}function st(D,de){D.side===gn?pe(n.CULL_FACE):ne(n.CULL_FACE);let ee=D.side===$t;de&&(ee=!ee),ze(ee),D.blending===Us&&D.transparent===!1?Ge(Wn):Ge(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);let fe=D.stencilWrite;o.setTest(fe),fe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(D){F!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),F=D)}function et(D){D!==tu?(ne(n.CULL_FACE),D!==P&&(D===rc?n.cullFace(n.BACK):D===nu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),P=D}function bt(D){D!==z&&(q&&n.lineWidth(D),z=D)}function Lt(D,de,ee){D?(ne(n.POLYGON_OFFSET_FILL),(I!==de||V!==ee)&&(I=de,V=ee,a.getReversed()&&(de=-de),n.polygonOffset(de,ee))):pe(n.POLYGON_OFFSET_FILL)}function mt(D){D?ne(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function St(D){D===void 0&&(D=n.TEXTURE0+W-1),Q!==D&&(n.activeTexture(D),Q=D)}function O(D,de,ee){ee===void 0&&(Q===null?ee=n.TEXTURE0+W-1:ee=Q);let fe=se[ee];fe===void 0&&(fe={type:void 0,texture:void 0},se[ee]=fe),(fe.type!==D||fe.texture!==de)&&(Q!==ee&&(n.activeTexture(ee),Q=ee),n.bindTexture(D,de||K[D]),fe.type=D,fe.texture=de)}function Z(){let D=se[Q];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ie(){try{n.compressedTexImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function g(){try{n.texSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function L(){try{n.texSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function X(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function oe(){try{n.texStorage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function ae(){try{n.texStorage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function $(){try{n.texImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function j(){try{n.texImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function le(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function Ee(D,de){d[D]!==de&&(n.pixelStorei(D,de),d[D]=de)}function ue(D){at.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),at.copy(D))}function he(D){Ze.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Ze.copy(D))}function ce(D,de){let ee=c.get(de);ee===void 0&&(ee=new WeakMap,c.set(de,ee));let fe=ee.get(D);fe===void 0&&(fe=n.getUniformBlockIndex(de,D.name),ee.set(D,fe))}function ve(D,de){let fe=c.get(de).get(D);l.get(de)!==fe&&(n.uniformBlockBinding(de,fe,D.__bindingPointIndex),l.set(de,fe))}function Ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},Q=null,se={},h={},p=new WeakMap,_=[],x=null,m=!1,f=null,S=null,C=null,M=null,T=null,E=null,A=null,y=new Le(0,0,0),w=0,R=!1,F=null,P=null,z=null,I=null,V=null,at.set(0,0,n.canvas.width,n.canvas.height),Ze.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:pe,bindFramebuffer:De,drawBuffers:ye,useProgram:Ve,setBlending:Ge,setMaterial:st,setFlipSided:ze,setCullFace:et,setLineWidth:bt,setPolygonOffset:Lt,setScissorTest:mt,activeTexture:St,bindTexture:O,unbindTexture:Z,compressedTexImage2D:ie,compressedTexImage3D:b,texImage2D:$,texImage3D:j,pixelStorei:Ee,getParameter:le,updateUBOMapping:ce,uniformBlockBinding:ve,texStorage2D:oe,texStorage3D:ae,texSubImage2D:g,texSubImage3D:L,compressedTexSubImage2D:k,compressedTexSubImage3D:X,scissor:ue,viewport:he,reset:Ue}}function zx(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,u=new WeakMap,d=new Set,h,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,g){return _?new OffscreenCanvas(b,g):dr("canvas")}function m(b,g,L){let k=1,X=ie(b);if((X.width>L||X.height>L)&&(k=L/Math.max(X.width,X.height)),k<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let oe=Math.floor(k*X.width),ae=Math.floor(k*X.height);h===void 0&&(h=x(oe,ae));let $=g?x(oe,ae):h;return $.width=oe,$.height=ae,$.getContext("2d").drawImage(b,0,0,oe,ae),Ne("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+oe+"x"+ae+")."),$}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),b;return b}function f(b){return b.generateMipmaps}function S(b){n.generateMipmap(b)}function C(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(b,g,L,k,X,oe=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ae;k&&(ae=e.get("EXT_texture_norm16"),ae||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=g;if(g===n.RED&&(L===n.FLOAT&&($=n.R32F),L===n.HALF_FLOAT&&($=n.R16F),L===n.UNSIGNED_BYTE&&($=n.R8),L===n.UNSIGNED_SHORT&&ae&&($=ae.R16_EXT),L===n.SHORT&&ae&&($=ae.R16_SNORM_EXT)),g===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.R8UI),L===n.UNSIGNED_SHORT&&($=n.R16UI),L===n.UNSIGNED_INT&&($=n.R32UI),L===n.BYTE&&($=n.R8I),L===n.SHORT&&($=n.R16I),L===n.INT&&($=n.R32I)),g===n.RG&&(L===n.FLOAT&&($=n.RG32F),L===n.HALF_FLOAT&&($=n.RG16F),L===n.UNSIGNED_BYTE&&($=n.RG8),L===n.UNSIGNED_SHORT&&ae&&($=ae.RG16_EXT),L===n.SHORT&&ae&&($=ae.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.RG8UI),L===n.UNSIGNED_SHORT&&($=n.RG16UI),L===n.UNSIGNED_INT&&($=n.RG32UI),L===n.BYTE&&($=n.RG8I),L===n.SHORT&&($=n.RG16I),L===n.INT&&($=n.RG32I)),g===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.RGB8UI),L===n.UNSIGNED_SHORT&&($=n.RGB16UI),L===n.UNSIGNED_INT&&($=n.RGB32UI),L===n.BYTE&&($=n.RGB8I),L===n.SHORT&&($=n.RGB16I),L===n.INT&&($=n.RGB32I)),g===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&($=n.RGBA8UI),L===n.UNSIGNED_SHORT&&($=n.RGBA16UI),L===n.UNSIGNED_INT&&($=n.RGBA32UI),L===n.BYTE&&($=n.RGBA8I),L===n.SHORT&&($=n.RGBA16I),L===n.INT&&($=n.RGBA32I)),g===n.RGB&&(L===n.UNSIGNED_SHORT&&ae&&($=ae.RGB16_EXT),L===n.SHORT&&ae&&($=ae.RGB16_SNORM_EXT),L===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),L===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),g===n.RGBA){let j=oe?ur:Je.getTransfer(X);L===n.FLOAT&&($=n.RGBA32F),L===n.HALF_FLOAT&&($=n.RGBA16F),L===n.UNSIGNED_BYTE&&($=j===it?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT&&ae&&($=ae.RGBA16_EXT),L===n.SHORT&&ae&&($=ae.RGBA16_SNORM_EXT),L===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function T(b,g){let L;return b?g===null||g===Pn||g===Bs?L=n.DEPTH24_STENCIL8:g===xn?L=n.DEPTH32F_STENCIL8:g===Os&&(L=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Pn||g===Bs?L=n.DEPTH_COMPONENT24:g===xn?L=n.DEPTH_COMPONENT32F:g===Os&&(L=n.DEPTH_COMPONENT16),L}function E(b,g){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==vt&&b.minFilter!==Ft?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function A(b){let g=b.target;g.removeEventListener("dispose",A),w(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&d.delete(g)}function y(b){let g=b.target;g.removeEventListener("dispose",y),F(g)}function w(b){let g=i.get(b);if(g.__webglInit===void 0)return;let L=b.source,k=p.get(L);if(k){let X=k[g.__cacheKey];X.usedTimes--,X.usedTimes===0&&R(b),Object.keys(k).length===0&&p.delete(L)}i.remove(b)}function R(b){let g=i.get(b);n.deleteTexture(g.__webglTexture);let L=b.source,k=p.get(L);delete k[g.__cacheKey],a.memory.textures--}function F(b){let g=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let X=0;X<g.__webglFramebuffer[k].length;X++)n.deleteFramebuffer(g.__webglFramebuffer[k][X]);else n.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)n.deleteFramebuffer(g.__webglFramebuffer[k]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let L=b.textures;for(let k=0,X=L.length;k<X;k++){let oe=i.get(L[k]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(L[k])}i.remove(b)}let P=0;function z(){P=0}function I(){return P}function V(b){P=b}function W(){let b=P;return b>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+r.maxTextures),P+=1,b}function q(b){let g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function te(b,g){let L=i.get(b);if(b.isVideoTexture&&O(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&L.__version!==b.version){let k=b.image;if(k===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{pe(L,b,g);return}}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+g)}function J(b,g){let L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){pe(L,b,g);return}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+g)}function Q(b,g){let L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){pe(L,b,g);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+g)}function se(b,g){let L=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&L.__version!==b.version){De(L,b,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+g)}let Ie={[La]:n.REPEAT,[kn]:n.CLAMP_TO_EDGE,[Da]:n.MIRRORED_REPEAT},Te={[vt]:n.NEAREST,[wu]:n.NEAREST_MIPMAP_NEAREST,[Rr]:n.NEAREST_MIPMAP_LINEAR,[Ft]:n.LINEAR,[oo]:n.LINEAR_MIPMAP_NEAREST,[Ei]:n.LINEAR_MIPMAP_LINEAR},at={[Cu]:n.NEVER,[Du]:n.ALWAYS,[Ru]:n.LESS,[Yo]:n.LEQUAL,[Iu]:n.EQUAL,[Zo]:n.GEQUAL,[Pu]:n.GREATER,[Lu]:n.NOTEQUAL};function Ze(b,g){if(g.type===xn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Ft||g.magFilter===oo||g.magFilter===Rr||g.magFilter===Ei||g.minFilter===Ft||g.minFilter===oo||g.minFilter===Rr||g.minFilter===Ei)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Ie[g.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Ie[g.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Ie[g.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Te[g.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Te[g.minFilter]),g.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,at[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===vt||g.minFilter!==Rr&&g.minFilter!==Ei||g.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){let L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function qe(b,g){let L=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",A));let k=g.source,X=p.get(k);X===void 0&&(X={},p.set(k,X));let oe=q(g);if(oe!==b.__cacheKey){X[oe]===void 0&&(X[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),X[oe].usedTimes++;let ae=X[b.__cacheKey];ae!==void 0&&(X[b.__cacheKey].usedTimes--,ae.usedTimes===0&&R(g)),b.__cacheKey=oe,b.__webglTexture=X[oe].texture}return L}function K(b,g,L){return Math.floor(Math.floor(b/L)/g)}function ne(b,g,L,k){let oe=b.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,L,k,g.data);else{oe.sort((Ee,ue)=>Ee.start-ue.start);let ae=0;for(let Ee=1;Ee<oe.length;Ee++){let ue=oe[ae],he=oe[Ee],ce=ue.start+ue.count,ve=K(he.start,g.width,4),Ue=K(ue.start,g.width,4);he.start<=ce+1&&ve===Ue&&K(he.start+he.count-1,g.width,4)===ve?ue.count=Math.max(ue.count,he.start+he.count-ue.start):(++ae,oe[ae]=he)}oe.length=ae+1;let $=t.getParameter(n.UNPACK_ROW_LENGTH),j=t.getParameter(n.UNPACK_SKIP_PIXELS),le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let Ee=0,ue=oe.length;Ee<ue;Ee++){let he=oe[Ee],ce=Math.floor(he.start/4),ve=Math.ceil(he.count/4),Ue=ce%g.width,D=Math.floor(ce/g.width),de=ve,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Ue,D,de,ee,L,k,g.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,j),t.pixelStorei(n.UNPACK_SKIP_ROWS,le)}}function pe(b,g,L){let k=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=n.TEXTURE_3D);let X=qe(b,g),oe=g.source;t.bindTexture(k,b.__webglTexture,n.TEXTURE0+L);let ae=i.get(oe);if(oe.version!==ae.__version||X===!0){if(t.activeTexture(n.TEXTURE0+L),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let ee=Je.getPrimaries(Je.workingColorSpace),fe=g.colorSpace===li?null:Je.getPrimaries(g.colorSpace),_e=g.colorSpace===li||ee===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let j=m(g.image,!1,r.maxTextureSize);j=Z(g,j);let le=s.convert(g.format,g.colorSpace),Ee=s.convert(g.type),ue=M(g.internalFormat,le,Ee,g.normalized,g.colorSpace,g.isVideoTexture);Ze(k,g);let he,ce=g.mipmaps,ve=g.isVideoTexture!==!0,Ue=ae.__version===void 0||X===!0,D=oe.dataReady,de=E(g,j);if(g.isDepthTexture)ue=T(g.format===Ai,g.type),Ue&&(ve?t.texStorage2D(n.TEXTURE_2D,1,ue,j.width,j.height):t.texImage2D(n.TEXTURE_2D,0,ue,j.width,j.height,0,le,Ee,null));else if(g.isDataTexture)if(ce.length>0){ve&&Ue&&t.texStorage2D(n.TEXTURE_2D,de,ue,ce[0].width,ce[0].height);for(let ee=0,fe=ce.length;ee<fe;ee++)he=ce[ee],ve?D&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,le,Ee,he.data):t.texImage2D(n.TEXTURE_2D,ee,ue,he.width,he.height,0,le,Ee,he.data);g.generateMipmaps=!1}else ve?(Ue&&t.texStorage2D(n.TEXTURE_2D,de,ue,j.width,j.height),D&&ne(g,j,le,Ee)):t.texImage2D(n.TEXTURE_2D,0,ue,j.width,j.height,0,le,Ee,j.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){ve&&Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,ce[0].width,ce[0].height,j.depth);for(let ee=0,fe=ce.length;ee<fe;ee++)if(he=ce[ee],g.format!==en)if(le!==null)if(ve){if(D)if(g.layerUpdates.size>0){let _e=Pc(he.width,he.height,g.format,g.type);for(let re of g.layerUpdates){let Pe=he.data.subarray(re*_e/he.data.BYTES_PER_ELEMENT,(re+1)*_e/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,re,he.width,he.height,1,le,Pe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,j.depth,le,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,ue,he.width,he.height,j.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ve?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,j.depth,le,Ee,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,ue,he.width,he.height,j.depth,0,le,Ee,he.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{ve&&Ue&&t.texStorage2D(n.TEXTURE_2D,de,ue,ce[0].width,ce[0].height);for(let ee=0,fe=ce.length;ee<fe;ee++)he=ce[ee],g.format!==en?le!==null?ve?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,le,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,ue,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ve?D&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,he.width,he.height,le,Ee,he.data):t.texImage2D(n.TEXTURE_2D,ee,ue,he.width,he.height,0,le,Ee,he.data)}else if(g.isDataArrayTexture)if(ve){if(Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,j.width,j.height,j.depth),D)if(g.layerUpdates.size>0){let ee=Pc(j.width,j.height,g.format,g.type);for(let fe of g.layerUpdates){let _e=j.data.subarray(fe*ee/j.data.BYTES_PER_ELEMENT,(fe+1)*ee/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,j.width,j.height,1,le,Ee,_e)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,le,Ee,j.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,j.width,j.height,j.depth,0,le,Ee,j.data);else if(g.isData3DTexture)ve?(Ue&&t.texStorage3D(n.TEXTURE_3D,de,ue,j.width,j.height,j.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,le,Ee,j.data)):t.texImage3D(n.TEXTURE_3D,0,ue,j.width,j.height,j.depth,0,le,Ee,j.data);else if(g.isFramebufferTexture){if(Ue)if(ve)t.texStorage2D(n.TEXTURE_2D,de,ue,j.width,j.height);else{let ee=j.width,fe=j.height;for(let _e=0;_e<de;_e++)t.texImage2D(n.TEXTURE_2D,_e,ue,ee,fe,0,le,Ee,null),ee>>=1,fe>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){let ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),j.parentNode!==ee){ee.appendChild(j),d.add(g),ee.onpaint=fe=>{let _e=fe.changedElements;for(let re of d)_e.includes(re.image)&&(re.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,j);else{let _e=n.RGBA,re=n.RGBA,Pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,_e,re,Pe,j)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ce.length>0){if(ve&&Ue){let ee=ie(ce[0]);t.texStorage2D(n.TEXTURE_2D,de,ue,ee.width,ee.height)}for(let ee=0,fe=ce.length;ee<fe;ee++)he=ce[ee],ve?D&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,le,Ee,he):t.texImage2D(n.TEXTURE_2D,ee,ue,le,Ee,he);g.generateMipmaps=!1}else if(ve){if(Ue){let ee=ie(j);t.texStorage2D(n.TEXTURE_2D,de,ue,ee.width,ee.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le,Ee,j)}else t.texImage2D(n.TEXTURE_2D,0,ue,le,Ee,j);f(g)&&S(k),ae.__version=oe.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function De(b,g,L){if(g.image.length!==6)return;let k=qe(b,g),X=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+L);let oe=i.get(X);if(X.version!==oe.__version||k===!0){t.activeTexture(n.TEXTURE0+L);let ae=Je.getPrimaries(Je.workingColorSpace),$=g.colorSpace===li?null:Je.getPrimaries(g.colorSpace),j=g.colorSpace===li||ae===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let le=g.isCompressedTexture||g.image[0].isCompressedTexture,Ee=g.image[0]&&g.image[0].isDataTexture,ue=[];for(let re=0;re<6;re++)!le&&!Ee?ue[re]=m(g.image[re],!0,r.maxCubemapSize):ue[re]=Ee?g.image[re].image:g.image[re],ue[re]=Z(g,ue[re]);let he=ue[0],ce=s.convert(g.format,g.colorSpace),ve=s.convert(g.type),Ue=M(g.internalFormat,ce,ve,g.normalized,g.colorSpace),D=g.isVideoTexture!==!0,de=oe.__version===void 0||k===!0,ee=X.dataReady,fe=E(g,he);Ze(n.TEXTURE_CUBE_MAP,g);let _e;if(le){D&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ue,he.width,he.height);for(let re=0;re<6;re++){_e=ue[re].mipmaps;for(let Pe=0;Pe<_e.length;Pe++){let Ae=_e[Pe];g.format!==en?ce!==null?D?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Ae.width,Ae.height,ce,Ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Ue,Ae.width,Ae.height,0,Ae.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Ae.width,Ae.height,ce,ve,Ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Ue,Ae.width,Ae.height,0,ce,ve,Ae.data)}}}else{if(_e=g.mipmaps,D&&de){_e.length>0&&fe++;let re=ie(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Ue,re.width,re.height)}for(let re=0;re<6;re++)if(Ee){D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ue[re].width,ue[re].height,ce,ve,ue[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ue,ue[re].width,ue[re].height,0,ce,ve,ue[re].data);for(let Pe=0;Pe<_e.length;Pe++){let dt=_e[Pe].image[re].image;D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,dt.width,dt.height,ce,ve,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Ue,dt.width,dt.height,0,ce,ve,dt.data)}}else{D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ce,ve,ue[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ue,ce,ve,ue[re]);for(let Pe=0;Pe<_e.length;Pe++){let Ae=_e[Pe];D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,ce,ve,Ae.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Ue,ce,ve,Ae.image[re])}}}f(g)&&S(n.TEXTURE_CUBE_MAP),oe.__version=X.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function ye(b,g,L,k,X,oe){let ae=s.convert(L.format,L.colorSpace),$=s.convert(L.type),j=M(L.internalFormat,ae,$,L.normalized,L.colorSpace),le=i.get(g),Ee=i.get(L);if(Ee.__renderTarget=g,!le.__hasExternalTextures){let ue=Math.max(1,g.width>>oe),he=Math.max(1,g.height>>oe);X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?t.texImage3D(X,oe,j,ue,he,g.depth,0,ae,$,null):t.texImage2D(X,oe,j,ue,he,0,ae,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),St(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,X,Ee.__webglTexture,0,mt(g)):(X===n.TEXTURE_2D||X>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,X,Ee.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(b,g,L){if(n.bindRenderbuffer(n.RENDERBUFFER,b),g.depthBuffer){let k=g.depthTexture,X=k&&k.isDepthTexture?k.type:null,oe=T(g.stencilBuffer,X),ae=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;St(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(g),oe,g.width,g.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(g),oe,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,oe,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,b)}else{let k=g.textures;for(let X=0;X<k.length;X++){let oe=k[X],ae=s.convert(oe.format,oe.colorSpace),$=s.convert(oe.type),j=M(oe.internalFormat,ae,$,oe.normalized,oe.colorSpace);St(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(g),j,g.width,g.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(g),j,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,j,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(b,g,L){let k=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let X=i.get(g.depthTexture);if(X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),k){if(X.__webglInit===void 0&&(X.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),X.__webglTexture===void 0){X.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,g.depthTexture);let le=s.convert(g.depthTexture.format),Ee=s.convert(g.depthTexture.type),ue;g.depthTexture.format===zn?ue=n.DEPTH_COMPONENT24:g.depthTexture.format===Ai&&(ue=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ue,g.width,g.height,0,le,Ee,null)}}else te(g.depthTexture,0);let oe=X.__webglTexture,ae=mt(g),$=k?n.TEXTURE_CUBE_MAP_POSITIVE_X+L:n.TEXTURE_2D,j=g.depthTexture.format===Ai?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===zn)St(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,oe,0);else if(g.depthTexture.format===Ai)St(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(b){let g=i.get(b),L=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){let k=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){let X=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",X)};k.addEventListener("dispose",X),g.__depthDisposeCallback=X}g.__boundDepthTexture=k}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(L)for(let k=0;k<6;k++)ut(g.__webglFramebuffer[k],b,k);else{let k=b.texture.mipmaps;k&&k.length>0?ut(g.__webglFramebuffer[0],b,0):ut(g.__webglFramebuffer,b,0)}else if(L){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=n.createRenderbuffer(),Ve(g.__webglDepthbuffer[k],b,!1);else{let X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=g.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}else{let k=b.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),Ve(g.__webglDepthbuffer,b,!1);else{let X=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ge(b,g,L){let k=i.get(b);g!==void 0&&ye(k.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&Be(b)}function st(b){let g=b.texture,L=i.get(b),k=i.get(g);b.addEventListener("dispose",y);let X=b.textures,oe=b.isWebGLCubeRenderTarget===!0,ae=X.length>1;if(ae||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=g.version,a.memory.textures++),oe){L.__webglFramebuffer=[];for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer[$]=[];for(let j=0;j<g.mipmaps.length;j++)L.__webglFramebuffer[$][j]=n.createFramebuffer()}else L.__webglFramebuffer[$]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer=[];for(let $=0;$<g.mipmaps.length;$++)L.__webglFramebuffer[$]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(ae)for(let $=0,j=X.length;$<j;$++){let le=i.get(X[$]);le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&St(b)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let $=0;$<X.length;$++){let j=X[$];L.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[$]);let le=s.convert(j.format,j.colorSpace),Ee=s.convert(j.type),ue=M(j.internalFormat,le,Ee,j.normalized,j.colorSpace,b.isXRRenderTarget===!0),he=mt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ue,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,L.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),Ve(L.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Ze(n.TEXTURE_CUBE_MAP,g);for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0)for(let j=0;j<g.mipmaps.length;j++)ye(L.__webglFramebuffer[$][j],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,j);else ye(L.__webglFramebuffer[$],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(g)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let $=0,j=X.length;$<j;$++){let le=X[$],Ee=i.get(le),ue=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,Ee.__webglTexture),Ze(ue,le),ye(L.__webglFramebuffer,b,le,n.COLOR_ATTACHMENT0+$,ue,0),f(le)&&S(ue)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&($=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,k.__webglTexture),Ze($,g),g.mipmaps&&g.mipmaps.length>0)for(let j=0;j<g.mipmaps.length;j++)ye(L.__webglFramebuffer[j],b,g,n.COLOR_ATTACHMENT0,$,j);else ye(L.__webglFramebuffer,b,g,n.COLOR_ATTACHMENT0,$,0);f(g)&&S($),t.unbindTexture()}b.depthBuffer&&Be(b)}function ze(b){let g=b.textures;for(let L=0,k=g.length;L<k;L++){let X=g[L];if(f(X)){let oe=C(b),ae=i.get(X).__webglTexture;t.bindTexture(oe,ae),S(oe),t.unbindTexture()}}}let et=[],bt=[];function Lt(b){if(b.samples>0){if(St(b)===!1){let g=b.textures,L=b.width,k=b.height,X=n.COLOR_BUFFER_BIT,oe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(b),$=g.length>1;if($)for(let le=0;le<g.length;le++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);let j=b.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let le=0;le<g.length;le++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(X|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(X|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Ee=i.get(g[le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ee,0)}n.blitFramebuffer(0,0,L,k,0,0,L,k,X,n.NEAREST),l===!0&&(et.length=0,bt.length=0,et.push(n.COLOR_ATTACHMENT0+le),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(et.push(oe),bt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,bt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,et))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let le=0;le<g.length;le++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Ee=i.get(g[le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,Ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let g=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function mt(b){return Math.min(r.maxSamples,b.samples)}function St(b){let g=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function O(b){let g=a.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function Z(b,g){let L=b.colorSpace,k=b.format,X=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||L!==hr&&L!==li&&(Je.getTransfer(L)===it?(k!==en||X!==Qt)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",L)),g}function ie(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.getTextureUnits=I,this.setTextureUnits=V,this.setTexture2D=te,this.setTexture2DArray=J,this.setTexture3D=Q,this.setTextureCube=se,this.rebindTextures=Ge,this.setupRenderTarget=st,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Vx(n,e){function t(i,r=li){let s,a=Je.getTransfer(r);if(i===Qt)return n.UNSIGNED_BYTE;if(i===co)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ho)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Sc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===yc)return n.BYTE;if(i===vc)return n.SHORT;if(i===Os)return n.UNSIGNED_SHORT;if(i===lo)return n.INT;if(i===Pn)return n.UNSIGNED_INT;if(i===xn)return n.FLOAT;if(i===Ln)return n.HALF_FLOAT;if(i===bc)return n.ALPHA;if(i===wc)return n.RGB;if(i===en)return n.RGBA;if(i===zn)return n.DEPTH_COMPONENT;if(i===Ai)return n.DEPTH_STENCIL;if(i===uo)return n.RED;if(i===fo)return n.RED_INTEGER;if(i===Ci)return n.RG;if(i===po)return n.RG_INTEGER;if(i===mo)return n.RGBA_INTEGER;if(i===Ir||i===Pr||i===Lr||i===Dr)if(a===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ir)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Lr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ir)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Lr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===go||i===xo||i===_o||i===yo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===go)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_o)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===vo||i===Mo||i===So||i===bo||i===wo||i===Nr||i===To)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===vo||i===Mo)return a===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===So)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===bo)return s.COMPRESSED_R11_EAC;if(i===wo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Nr)return s.COMPRESSED_RG11_EAC;if(i===To)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Eo||i===Ao||i===Co||i===Ro||i===Io||i===Po||i===Lo||i===Do||i===No||i===Uo||i===Fo||i===Oo||i===Bo||i===ko)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Eo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ao)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Co)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ro)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Io)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Po)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Lo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Do)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===No)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Oo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bo)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ko)return a===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zo||i===Vo||i===Go)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===zo)return a===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Go)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ho||i===Wo||i===Ur||i===Xo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ho)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Wo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ur)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Gx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hx=`
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

}`,Xc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Sr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Jt({vertexShader:Gx,fragmentShader:Hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new Rn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qc=class extends Vn{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,_=null,x=typeof XRWebGLBinding<"u",m=new Xc,f={},S=t.getContextAttributes(),C=null,M=null,T=[],E=[],A=new Oe,y=null,w=null,R=new Yt;R.viewport=new yt;let F=new Yt;F.viewport=new yt;let P=[R,F],z=new so,I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ne=T[K];return ne===void 0&&(ne=new Es,T[K]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(K){let ne=T[K];return ne===void 0&&(ne=new Es,T[K]=ne),ne.getGripSpace()},this.getHand=function(K){let ne=T[K];return ne===void 0&&(ne=new Es,T[K]=ne),ne.getHandSpace()};function W(K){let ne=E.indexOf(K.inputSource);if(ne===-1)return;let pe=T[ne];pe!==void 0&&(pe.update(K.inputSource,K.frame,c||a),pe.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",te);for(let K=0;K<T.length;K++){let ne=E[K];ne!==null&&(E[K]=null,T[K].disconnect(ne))}I=null,V=null,m.reset();for(let K in f)delete f[K];if(e.setRenderTarget(C),p=null,h=null,d=null,r=null,M=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),w!==null){let K=w.camera;K.fov=w.fov,K.zoom=w.zoom,K.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",q),r.addEventListener("inputsourceschange",te),S.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,De=null,ye=null;S.depth&&(ye=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=S.stencil?Ai:zn,De=S.stencil?Bs:Pn);let Ve={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Ve),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Gt(h.textureWidth,h.textureHeight,{format:en,type:Qt,depthTexture:new vi(h.textureWidth,h.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let pe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Gt(p.framebufferWidth,p.framebufferHeight,{format:en,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),qe.setContext(r),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(K){for(let ne=0;ne<K.removed.length;ne++){let pe=K.removed[ne],De=E.indexOf(pe);De>=0&&(E[De]=null,T[De].disconnect(pe))}for(let ne=0;ne<K.added.length;ne++){let pe=K.added[ne],De=E.indexOf(pe);if(De===-1){for(let Ve=0;Ve<T.length;Ve++)if(Ve>=E.length){E.push(pe),De=Ve;break}else if(E[Ve]===null){E[Ve]=pe,De=Ve;break}if(De===-1)break}let ye=T[De];ye&&ye.connect(pe)}}let J=new B,Q=new B;function se(K,ne,pe){J.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(pe.matrixWorld);let De=J.distanceTo(Q),ye=ne.projectionMatrix.elements,Ve=pe.projectionMatrix.elements,ut=ye[14]/(ye[10]-1),Be=ye[14]/(ye[10]+1),Ge=(ye[9]+1)/ye[5],st=(ye[9]-1)/ye[5],ze=(ye[8]-1)/ye[0],et=(Ve[8]+1)/Ve[0],bt=ut*ze,Lt=ut*et,mt=De/(-ze+et),St=mt*-ze;if(ne.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(St),K.translateZ(mt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ye[10]===-1)K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let O=ut+mt,Z=Be+mt,ie=bt-St,b=Lt+(De-St),g=Ge*Be/Z*O,L=st*Be/Z*O;K.projectionMatrix.makePerspective(ie,b,g,L,O,Z),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ie(K,ne){ne===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ne.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ne=K.near,pe=K.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),z.near=F.near=R.near=ne,z.far=F.far=R.far=pe,(I!==z.near||V!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),I=z.near,V=z.far),z.layers.mask=K.layers.mask|6,R.layers.mask=z.layers.mask&-5,F.layers.mask=z.layers.mask&-3;let De=K.parent,ye=z.cameras;Ie(z,De);for(let Ve=0;Ve<ye.length;Ve++)Ie(ye[Ve],De);ye.length===2?se(z,R,F):z.projectionMatrix.copy(R.projectionMatrix),w===null&&K.isPerspectiveCamera&&(w={camera:K,fov:K.fov,zoom:K.zoom}),Te(K,z,De)};function Te(K,ne,pe){pe===null?K.matrix.copy(ne.matrixWorld):(K.matrix.copy(pe.matrixWorld),K.matrix.invert(),K.matrix.multiply(ne.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=bs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(K){return f[K]};let at=null;function Ze(K,ne){if(u=ne.getViewerPose(c||a),_=ne,u!==null){let pe=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let De=!1;pe.length!==z.cameras.length&&(z.cameras.length=0,De=!0);for(let Be=0;Be<pe.length;Be++){let Ge=pe[Be],st=null;if(p!==null)st=p.getViewport(Ge);else{let et=d.getViewSubImage(h,Ge);st=et.viewport,Be===0&&(e.setRenderTargetTextures(M,et.colorTexture,et.depthStencilTexture),e.setRenderTarget(M))}let ze=P[Be];ze===void 0&&(ze=new Yt,ze.layers.enable(Be),ze.viewport=new yt,P[Be]=ze),ze.matrix.fromArray(Ge.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ge.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(st.x,st.y,st.width,st.height),Be===0&&(z.matrix.copy(ze.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),De===!0&&z.cameras.push(ze)}let ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let Be=d.getDepthInformation(pe[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,r.renderState)}if(ye&&ye.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Be=0;Be<pe.length;Be++){let Ge=pe[Be].camera;if(Ge){let st=f[Ge];st||(st=new Sr,f[Ge]=st);let ze=d.getCameraImage(Ge);st.sourceTexture=ze}}}}for(let pe=0;pe<T.length;pe++){let De=E[pe],ye=T[pe];De!==null&&ye!==void 0&&ye.update(De,ne,c||a)}at&&at(K,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}let qe=new hd;qe.setAnimationLoop(Ze),this.setAnimationLoop=function(K){at=K},this.dispose=function(){}}},Wx=new We,gd=new ke;gd.set(-1,0,0,0,1,0,0,0,1);function Xx(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Cc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,S,C,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,C):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===$t&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===$t&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let S=e.get(f),C=S.envMap,M=S.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(Wx.makeRotationFromEuler(M)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(gd),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,C){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=C*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===$t&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function qx(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){let E=T.program;i.uniformBlockBinding(M,E)}function c(M,T){let E=r[M.id];E===void 0&&(m(M),E=u(M),r[M.id]=E,M.addEventListener("dispose",S));let A=T.program;i.updateUBOMapping(M,A);let y=e.render.frame;s[M.id]!==y&&(h(M),s[M.id]=y)}function u(M){let T=d();M.__bindingPointIndex=T;let E=n.createBuffer(),A=M.__size,y=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,A,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let T=r[M.id],E=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let y=0,w=E.length;y<w;y++){let R=E[y];if(Array.isArray(R))for(let F=0,P=R.length;F<P;F++)p(R[F],y,F,A);else p(R,y,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,T,E,A){if(x(M,T,E,A)===!0){let y=M.__offset,w=M.value;if(Array.isArray(w)){let R=0;for(let F=0;F<w.length;F++){let P=w[F],z=f(P);_(P,M.__data,R),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(R+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(w,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,M.__data)}}function _(M,T,E){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,E)}function x(M,T,E,A){let y=M.value,w=T+"_"+E;if(A[w]===void 0)return typeof y=="number"||typeof y=="boolean"?A[w]=y:ArrayBuffer.isView(y)?A[w]=y.slice():A[w]=y.clone(),!0;{let R=A[w];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return A[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function m(M){let T=M.uniforms,E=0,A=16;for(let w=0,R=T.length;w<R;w++){let F=Array.isArray(T[w])?T[w]:[T[w]];for(let P=0,z=F.length;P<z;P++){let I=F[P],V=Array.isArray(I.value)?I.value:[I.value];for(let W=0,q=V.length;W<q;W++){let te=V[W],J=f(te),Q=E%A,se=Q%J.boundary,Ie=Q+se;E+=se,Ie!==0&&A-Ie<J.storage&&(E+=A-Ie),I.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=E,E+=J.storage}}}let y=E%A;return y>0&&(E+=A-y),M.__size=E,M.__cache={},this}function f(M){let T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",M),T}function S(M){let T=M.target;T.removeEventListener("dispose",S);let E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function C(){for(let M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:C}}var Yx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xn=null;function Zx(){return Xn===null&&(Xn=new Gi(Yx,16,16,Ci,Ln),Xn.name="DFG_LUT",Xn.minFilter=Ft,Xn.magFilter=Ft,Xn.wrapS=kn,Xn.wrapT=kn,Xn.generateMipmaps=!1,Xn.needsUpdate=!0),Xn}var kr=class{constructor(e={}){let{canvas:t=Nu(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Qt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;let x=p,m=new Set([mo,po,fo]),f=new Set([Qt,Pn,Os,Bs,co,ho]),S=new Uint32Array(4),C=new Int32Array(4),M=new B,T=null,E=null,A=[],y=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,F=!1,P=null,z=null,I=null,V=null;this._outputColorSpace=Ct;let W=0,q=0,te=null,J=-1,Q=null,se=new yt,Ie=new yt,Te=null,at=new Le(0),Ze=0,qe=t.width,K=t.height,ne=1,pe=null,De=null,ye=new yt(0,0,qe,K),Ve=new yt(0,0,qe,K),ut=!1,Be=new Cs,Ge=!1,st=!1,ze=new We,et=new B,bt=new yt,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mt=!1;function St(){return te===null?ne:1}let O=i;function Z(v,U){return t.getContext(v,U)}let ie,b,g,L,k,X,oe,ae,$,j,le,Ee,ue,he,ce,ve,Ue,D,de,ee,fe,_e,re;try{let v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",yn,!1),O===null){let U="webgl2";if(O=Z(U,v),O===null)throw Z(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pe()}catch(v){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),Fe("WebGLRenderer: "+v.message),v}function Pe(){ie=new tg(O),ie.init(),fe=new Vx(O,ie),b=new Xm(O,ie,e,fe),g=new kx(O,ie),b.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),z=O.createFramebuffer(),I=O.createFramebuffer(),V=O.createFramebuffer(),L=new sg(O),k=new Tx,X=new zx(O,ie,g,k,b,fe,L),oe=new eg(R),ae=new ap(O),_e=new Hm(O,ae),$=new ng(O,ae,L,_e),j=new ag(O,$,ae,_e,L),D=new rg(O,b,X),ce=new qm(k),le=new wx(R,oe,ie,b,_e,ce),Ee=new Xx(R,k),ue=new Ax,he=new Dx(ie),Ue=new Gm(R,oe,g,j,_,l),ve=new Bx(R,j,b),re=new qx(O,L,b,g),de=new Wm(O,ie,L),ee=new ig(O,ie,L),L.programs=le.programs,R.capabilities=b,R.extensions=ie,R.properties=k,R.renderLists=ue,R.shadowMap=ve,R.state=g,R.info=L}x!==Qt&&(w=new lg(x,t.width,t.height,o,r,s));let Ae=new qc(R,O);this.xr=Ae,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=ie.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ie.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(v){v!==void 0&&(ne=v,this.setSize(qe,K,!1))},this.getSize=function(v){return v.set(qe,K)},this.setSize=function(v,U,Y=!0){if(Ae.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}qe=v,K=U,t.width=Math.floor(v*ne),t.height=Math.floor(U*ne),Y===!0&&(t.style.width=v+"px",t.style.height=U+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(qe*ne,K*ne).floor()},this.setDrawingBufferSize=function(v,U,Y){qe=v,K=U,ne=Y,t.width=Math.floor(v*Y),t.height=Math.floor(U*Y),this.setViewport(0,0,v,U)},this.setEffects=function(v){if(x===Qt){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let U=0;U<v.length;U++)if(v[U].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(se)},this.getViewport=function(v){return v.copy(ye)},this.setViewport=function(v,U,Y,G){v.isVector4?ye.set(v.x,v.y,v.z,v.w):ye.set(v,U,Y,G),g.viewport(se.copy(ye).multiplyScalar(ne).round())},this.getScissor=function(v){return v.copy(Ve)},this.setScissor=function(v,U,Y,G){v.isVector4?Ve.set(v.x,v.y,v.z,v.w):Ve.set(v,U,Y,G),g.scissor(Ie.copy(Ve).multiplyScalar(ne).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(v){g.setScissorTest(ut=v)},this.setOpaqueSort=function(v){pe=v},this.setTransparentSort=function(v){De=v},this.getClearColor=function(v){return v.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(v=!0,U=!0,Y=!0){let G=0;if(v){let H=!1;if(te!==null){let xe=te.texture.format;H=m.has(xe)}if(H){let xe=te.texture.type,Se=f.has(xe),ge=Ue.getClearColor(),be=Ue.getClearAlpha(),Re=ge.r,He=ge.g,Ye=ge.b;Se?(S[0]=Re,S[1]=He,S[2]=Ye,S[3]=be,O.clearBufferuiv(O.COLOR,0,S)):(C[0]=Re,C[1]=He,C[2]=Ye,C[3]=be,O.clearBufferiv(O.COLOR,0,C))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),P=v},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),Ue.dispose(),ue.dispose(),he.dispose(),k.dispose(),oe.dispose(),j.dispose(),_e.dispose(),re.dispose(),le.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",dh),Ae.removeEventListener("sessionend",fh),Ui.stop()};function dt(v){v.preventDefault(),fr("WebGLRenderer: Context Lost."),F=!0}function tt(){fr("WebGLRenderer: Context Restored."),F=!1;let v=L.autoReset,U=ve.enabled,Y=ve.autoUpdate,G=ve.needsUpdate,H=ve.type;Pe(),L.autoReset=v,ve.enabled=U,ve.autoUpdate=Y,ve.needsUpdate=G,ve.type=H}function yn(v){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Fn(v){let U=v.target;U.removeEventListener("dispose",Fn),ef(U)}function ef(v){tf(v),k.remove(v)}function tf(v){let U=k.get(v).programs;U!==void 0&&(U.forEach(function(Y){le.releaseProgram(Y)}),v.isShaderMaterial&&le.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,Y,G,H,xe){U===null&&(U=Lt);let Se=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=rf(v,U,Y,G,H);g.setMaterial(G,Se);let be=Y.index,Re=1;if(G.wireframe===!0){if(be=$.getWireframeAttribute(Y),be===void 0)return;Re=2}let He=Y.drawRange,Ye=Y.attributes.position,we=He.start*Re,nt=(He.start+He.count)*Re;xe!==null&&(we=Math.max(we,xe.start*Re),nt=Math.min(nt,(xe.start+xe.count)*Re)),be!==null?(we=Math.max(we,0),nt=Math.min(nt,be.count)):Ye!=null&&(we=Math.max(we,0),nt=Math.min(nt,Ye.count));let Et=nt-we;if(Et<0||Et===1/0)return;_e.setup(H,G,ge,Y,be);let gt,lt=de;if(be!==null&&(gt=ae.get(be),lt=ee,lt.setIndex(gt)),H.isMesh)G.wireframe===!0?(g.setLineWidth(G.wireframeLinewidth*St()),lt.setMode(O.LINES)):lt.setMode(O.TRIANGLES);else if(H.isLine){let Bt=G.linewidth;Bt===void 0&&(Bt=1),g.setLineWidth(Bt*St()),H.isLineSegments?lt.setMode(O.LINES):H.isLineLoop?lt.setMode(O.LINE_LOOP):lt.setMode(O.LINE_STRIP)}else H.isPoints?lt.setMode(O.POINTS):H.isSprite&&lt.setMode(O.TRIANGLES);if(H.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))lt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Bt=H._multiDrawStarts,Me=H._multiDrawCounts,Xt=H._multiDrawCount,Qe=be?ae.get(be).bytesPerElement:1,un=k.get(G).currentProgram.getUniforms();for(let On=0;On<Xt;On++)un.setValue(O,"_gl_DrawID",On),lt.render(Bt[On]/Qe,Me[On])}else if(H.isInstancedMesh)lt.renderInstances(we,Et,H.count);else if(Y.isInstancedBufferGeometry){let Bt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Me=Math.min(Y.instanceCount,Bt);lt.renderInstances(we,Et,Me)}else lt.render(we,Et)};function uh(v,U,Y,G){P!==null&&v.isNodeMaterial&&P.setObject(G,v),Ge===!0&&ce.setState(v,Y,!1),v.transparent===!0&&v.side===gn&&v.forceSinglePass===!1?(v.side=$t,v.needsUpdate=!0,Jr(v,U,G),v.side=wi,v.needsUpdate=!0,Jr(v,U,G),v.side=gn):Jr(v,U,G)}this.compile=function(v,U,Y=null){Y===null&&(Y=v),P!==null&&P.renderStart(v,U,Y),E=he.get(Y),E.init(U),y.push(E),Y.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),v!==Y&&v.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights(),P!==null&&P.updateLights(E.state.lightsArray),st=this.localClippingEnabled,Ge=ce.init(this.clippingPlanes,st),Ge===!0&&ce.setGlobalState(this.clippingPlanes,U),P!==null&&ve.render(E.state.shadowsArray,Y,U);let G=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let xe=H.material;if(xe)if(Array.isArray(xe))for(let Se=0;Se<xe.length;Se++){let ge=xe[Se];uh(ge,Y,U,H),G.add(ge)}else uh(xe,Y,U,H),G.add(xe)}),E=y.pop(),P!==null&&P.renderEnd(),G},this.compileAsync=function(v,U,Y=null){let G=this.compile(v,U,Y);return new Promise(H=>{function xe(){if(G.forEach(function(Se){let be=k.get(Se).currentProgram;(be===void 0||be.isReady())&&G.delete(Se)}),G.size===0){H(v);return}setTimeout(xe,10)}ie.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let wl=null;function nf(v){wl&&wl(v)}function dh(){Ui.stop()}function fh(){Ui.start()}let Ui=new hd;Ui.setAnimationLoop(nf),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(v){wl=v,Ae.setAnimationLoop(v),v===null?Ui.stop():Ui.start()},Ae.addEventListener("sessionstart",dh),Ae.addEventListener("sessionend",fh),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;P!==null&&P.renderStart(v,U);let Y=Ae.enabled===!0&&Ae.isPresenting===!0,G=w!==null&&(te===null||Y)&&w.begin(R,te);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(U),U=Ae.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,U,te),E=he.get(v,y.length),E.init(U),E.state.textureUnits=X.getTextureUnits(),y.push(E),ze.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Be.setFromProjectionMatrix(ze,wn,U.reversedDepth),st=this.localClippingEnabled,Ge=ce.init(this.clippingPlanes,st),T=ue.get(v,A.length),T.init(),A.push(T),Ae.enabled===!0&&Ae.isPresenting===!0){let Se=R.xr.getDepthSensingMesh();Se!==null&&Tl(Se,U,-1/0,R.sortObjects)}Tl(v,U,0,R.sortObjects),T.finish(),P!==null&&P.updateLights(E.state.lightsArray),R.sortObjects===!0&&T.sort(pe,De),mt=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,mt&&Ue.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ge===!0&&ce.beginShadows();let H=E.state.shadowsArray;if(ve.render(H,v,U),Ge===!0&&ce.endShadows(),(G&&w.hasRenderPass())===!1){let Se=T.opaque,ge=T.transmissive;if(E.setupLights(),U.isArrayCamera){let be=U.cameras;if(ge.length>0)for(let Re=0,He=be.length;Re<He;Re++){let Ye=be[Re];mh(Se,ge,v,Ye)}mt&&Ue.render(v);for(let Re=0,He=be.length;Re<He;Re++){let Ye=be[Re];ph(T,v,Ye,Ye.viewport)}}else ge.length>0&&mh(Se,ge,v,U),mt&&Ue.render(v),ph(T,v,U)}te!==null&&q===0&&(X.updateMultisampleRenderTarget(te),X.updateRenderTargetMipmap(te)),G&&w.end(R),v.isScene===!0&&v.onAfterRender(R,v,U),_e.resetDefaultState(),J=-1,Q=null,y.pop(),y.length>0?(E=y[y.length-1],X.setTextureUnits(E.state.textureUnits),Ge===!0&&ce.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?T=A[A.length-1]:T=null,P!==null&&P.renderEnd()};function Tl(v,U,Y,G){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)Y=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLightProbeGrid)E.pushLightProbeGrid(v);else if(v.isLight)E.pushLight(v),v.castShadow&&E.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Be)){G&&bt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ze);let Se=j.update(v),ge=v.material;ge.visible&&T.push(v,Se,ge,Y,bt.z,null,U)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Be))){let Se=j.update(v),ge=v.material;if(G&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),bt.copy(v.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),bt.copy(Se.boundingSphere.center)),bt.applyMatrix4(v.matrixWorld).applyMatrix4(ze)),Array.isArray(ge)){let be=Se.groups;for(let Re=0,He=be.length;Re<He;Re++){let Ye=be[Re],we=ge[Ye.materialIndex];we&&we.visible&&T.push(v,Se,we,Y,bt.z,Ye,U)}}else ge.visible&&T.push(v,Se,ge,Y,bt.z,null,U)}}let xe=v.children;for(let Se=0,ge=xe.length;Se<ge;Se++)Tl(xe[Se],U,Y,G)}function ph(v,U,Y,G){let{opaque:H,transmissive:xe,transparent:Se}=v;E.setupLightsView(Y),Ge===!0&&ce.setGlobalState(R.clippingPlanes,Y),G&&g.viewport(se.copy(G)),H.length>0&&Zr(H,U,Y),xe.length>0&&Zr(xe,U,Y),Se.length>0&&Zr(Se,U,Y),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function mh(v,U,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let we=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Gt(1,1,{generateMipmaps:!0,type:we?Ln:Qt,minFilter:Ei,samples:Math.max(4,b.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Je.workingColorSpace})}let xe=E.state.transmissionRenderTarget[G.id],Se=G.viewport||se;xe.setSize(Se.z*R.transmissionResolutionScale,Se.w*R.transmissionResolutionScale);let ge=R.getRenderTarget(),be=R.getActiveCubeFace(),Re=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(at),Ze=R.getClearAlpha(),Ze<1&&R.setClearColor(16777215,.5),R.clear(),mt&&Ue.render(Y);let He=R.toneMapping;R.toneMapping=In;let Ye=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),Ge===!0&&ce.setGlobalState(R.clippingPlanes,G),Zr(v,Y,G),X.updateMultisampleRenderTarget(xe),X.updateRenderTargetMipmap(xe),ie.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let nt=0,Et=U.length;nt<Et;nt++){let gt=U[nt],{object:lt,geometry:Bt,material:Me,group:Xt}=gt;if(Me.side===gn&&lt.layers.test(G.layers)){let Qe=Me.side;Me.side=$t,Me.needsUpdate=!0,gh(lt,Y,G,Bt,Me,Xt),Me.side=Qe,Me.needsUpdate=!0,we=!0}}we===!0&&(X.updateMultisampleRenderTarget(xe),X.updateRenderTargetMipmap(xe))}R.setRenderTarget(ge,be,Re),R.setClearColor(at,Ze),Ye!==void 0&&(G.viewport=Ye),R.toneMapping=He}function Zr(v,U,Y){let G=U.isScene===!0?U.overrideMaterial:null;for(let H=0,xe=v.length;H<xe;H++){let Se=v[H],{object:ge,geometry:be,group:Re}=Se,He=Se.material;He.allowOverride===!0&&G!==null&&(He=G),ge.layers.test(Y.layers)&&gh(ge,U,Y,be,He,Re)}}function gh(v,U,Y,G,H,xe){P!==null&&H.isNodeMaterial&&P.setObject(v,H),v.onBeforeRender(R,U,Y,G,H,xe),v.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(R,U,Y,G,v,xe),H.transparent===!0&&H.side===gn&&H.forceSinglePass===!1?(H.side=$t,H.needsUpdate=!0,R.renderBufferDirect(Y,U,G,H,v,xe),H.side=wi,H.needsUpdate=!0,R.renderBufferDirect(Y,U,G,H,v,xe),H.side=gn):R.renderBufferDirect(Y,U,G,H,v,xe),v.onAfterRender(R,U,Y,G,H,xe)}function Jr(v,U,Y){U.isScene!==!0&&(U=Lt);let G=k.get(v),H=E.state.lights,xe=E.state.shadowsArray,Se=H.state.version,ge=le.getParameters(v,H.state,xe,U,Y,E.state.lightProbeGridArray),be=le.getProgramCacheKey(ge),Re=G.programs;G.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;let He=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;G.envMap=oe.get(v.envMap||G.environment,He),G.envMapRotation=G.environment!==null&&v.envMap===null?U.environmentRotation:v.envMapRotation,Re===void 0&&(v.addEventListener("dispose",Fn),Re=new Map,G.programs=Re);let Ye=Re.get(be);if(Ye!==void 0){if(G.currentProgram===Ye&&G.lightsStateVersion===Se)return _h(v,ge),Ye}else ge.uniforms=le.getUniforms(v),P!==null&&v.isNodeMaterial&&P.build(v,Y,ge),v.onBeforeCompile(ge,R),Ye=le.acquireProgram(ge,be),Re.set(be,Ye),G.uniforms=ge.uniforms;let we=G.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(we.clippingPlanes=ce.uniform),_h(v,ge),G.needsLights=of(v),G.lightsStateVersion=Se,G.needsLights&&(we.ambientLightColor.value=H.state.ambient,we.lightProbe.value=H.state.probe,we.sunLights.value=H.state.sun,we.sunLightShadows.value=H.state.sunShadow,we.directionalLights.value=H.state.directional,we.directionalLightShadows.value=H.state.directionalShadow,we.spotLights.value=H.state.spot,we.spotLightShadows.value=H.state.spotShadow,we.rectAreaLights.value=H.state.rectArea,we.ltc_1.value=H.state.rectAreaLTC1,we.ltc_2.value=H.state.rectAreaLTC2,we.pointLights.value=H.state.point,we.pointLightShadows.value=H.state.pointShadow,we.hemisphereLights.value=H.state.hemi,we.sunShadowMatrix.value=H.state.sunShadowMatrix,we.sunShadowCascade.value=H.state.sunShadowCascade,we.directionalShadowMatrix.value=H.state.directionalShadowMatrix,we.spotLightMatrix.value=H.state.spotLightMatrix,we.spotLightMap.value=H.state.spotLightMap,we.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=Ye,G.uniformsList=null,Ye}function xh(v){if(v.uniformsList===null){let U=v.currentProgram.getUniforms();v.uniformsList=Vs.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function _h(v,U){let Y=k.get(v);Y.outputColorSpace=U.outputColorSpace,Y.batching=U.batching,Y.batchingColor=U.batchingColor,Y.instancing=U.instancing,Y.instancingColor=U.instancingColor,Y.instancingMorph=U.instancingMorph,Y.skinning=U.skinning,Y.morphTargets=U.morphTargets,Y.morphNormals=U.morphNormals,Y.morphColors=U.morphColors,Y.morphTargetsCount=U.morphTargetsCount,Y.numClippingPlanes=U.numClippingPlanes,Y.numIntersection=U.numClipIntersection,Y.vertexAlphas=U.vertexAlphas,Y.vertexTangents=U.vertexTangents,Y.toneMapping=U.toneMapping}function sf(v,U){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;M.setFromMatrixPosition(U.matrixWorld);for(let Y=0,G=v.length;Y<G;Y++){let H=v[Y];if(H.texture!==null&&H.boundingBox.containsPoint(M))return H}return null}function rf(v,U,Y,G,H){U.isScene!==!0&&(U=Lt),X.resetTextureUnits();let xe=U.fog,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,ge=te===null?R.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Je.workingColorSpace,be=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Re=oe.get(G.envMap||Se,be),He=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ye=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),we=!!Y.morphAttributes.position,nt=!!Y.morphAttributes.normal,Et=!!Y.morphAttributes.color,gt=In;G.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(gt=R.toneMapping);let lt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Bt=lt!==void 0?lt.length:0,Me=k.get(G),Xt=E.state.lights;if(Ge===!0&&(st===!0||v!==Q)){let ft=v===Q&&G.id===J;ce.setState(G,v,ft)}let Qe=!1;G.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Xt.state.version||Me.outputColorSpace!==ge||H.isBatchedMesh&&Me.batching===!1||!H.isBatchedMesh&&Me.batching===!0||H.isBatchedMesh&&Me.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Me.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Me.instancing===!1||!H.isInstancedMesh&&Me.instancing===!0||H.isSkinnedMesh&&Me.skinning===!1||!H.isSkinnedMesh&&Me.skinning===!0||H.isInstancedMesh&&Me.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Me.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Me.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Me.instancingMorph===!1&&H.morphTexture!==null||Me.envMap!==Re||G.fog===!0&&Me.fog!==xe||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ce.numPlanes||Me.numIntersection!==ce.numIntersection)||Me.vertexAlphas!==He||Me.vertexTangents!==Ye||Me.morphTargets!==we||Me.morphNormals!==nt||Me.morphColors!==Et||Me.toneMapping!==gt||Me.morphTargetsCount!==Bt||!!Me.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Me.__version=G.version);let un=Me.currentProgram;Qe===!0&&(un=Jr(G,U,H),P&&G.isNodeMaterial&&P.onUpdateProgram(G,un,Me));let On=!1,di=!1,Qi=!1,ot=un.getUniforms(),wt=Me.uniforms;if(g.useProgram(un.program)&&(On=!0,di=!0,Qi=!0),G.id!==J&&(J=G.id,di=!0),Me.needsLights){let ft=sf(E.state.lightProbeGridArray,H);Me.lightProbeGrid!==ft&&(Me.lightProbeGrid=ft,di=!0)}if(On||Q!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ot.setValue(O,"projectionMatrix",v.projectionMatrix),ot.setValue(O,"viewMatrix",v.matrixWorldInverse);let pi=ot.map.cameraPosition;pi!==void 0&&pi.setValue(O,et.setFromMatrixPosition(v.matrixWorld)),b.logarithmicDepthBuffer&&ot.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ot.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,di=!0,Qi=!0)}if(Me.needsLights&&(Xt.state.sunShadowMap.length>0&&ot.setValue(O,"sunShadowMap",Xt.state.sunShadowMap,X),Xt.state.directionalShadowMap.length>0&&ot.setValue(O,"directionalShadowMap",Xt.state.directionalShadowMap,X),Xt.state.spotShadowMap.length>0&&ot.setValue(O,"spotShadowMap",Xt.state.spotShadowMap,X),Xt.state.pointShadowMap.length>0&&ot.setValue(O,"pointShadowMap",Xt.state.pointShadowMap,X)),H.isSkinnedMesh){ot.setOptional(O,H,"bindMatrix"),ot.setOptional(O,H,"bindMatrixInverse");let ft=H.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ot.setValue(O,"boneTexture",ft.boneTexture,X))}H.isBatchedMesh&&(ot.setOptional(O,H,"batchingTexture"),ot.setValue(O,"batchingTexture",H._matricesTexture,X),ot.setOptional(O,H,"batchingIdTexture"),ot.setValue(O,"batchingIdTexture",H._indirectTexture,X),ot.setOptional(O,H,"batchingColorTexture"),H._colorsTexture!==null&&ot.setValue(O,"batchingColorTexture",H._colorsTexture,X));let fi=Y.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&D.update(H,Y,un),(di||Me.receiveShadow!==H.receiveShadow)&&(Me.receiveShadow=H.receiveShadow,ot.setValue(O,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(wt.envMapIntensity.value=U.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=Zx()),di){if(ot.setValue(O,"toneMappingExposure",R.toneMappingExposure),Me.needsLights&&af(wt,Qi),xe&&G.fog===!0&&Ee.refreshFogUniforms(wt,xe),Ee.refreshMaterialUniforms(wt,G,ne,K,E.state.transmissionRenderTarget[v.id]),Me.needsLights&&Me.lightProbeGrid){let ft=Me.lightProbeGrid;wt.probesSH.value=ft.texture,wt.probesMin.value.copy(ft.boundingBox.min),wt.probesMax.value.copy(ft.boundingBox.max),wt.probesResolution.value.copy(ft.resolution)}Vs.upload(O,xh(Me),wt,X)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Vs.upload(O,xh(Me),wt,X),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ot.setValue(O,"center",H.center),ot.setValue(O,"modelViewMatrix",H.modelViewMatrix),ot.setValue(O,"normalMatrix",H.normalMatrix),ot.setValue(O,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){let ft=G.uniformsGroups;for(let pi=0,es=ft.length;pi<es;pi++){let vh=ft[pi];re.update(vh,un),re.bind(vh,un)}}return un}function af(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.sunLights.needsUpdate=U,v.sunLightShadows.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function of(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(v,U,Y){let G=k.get(v);G.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),k.get(v.texture).__webglTexture=U,k.get(v.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,U){let Y=k.get(v);Y.__webglFramebuffer=U,Y.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(v,U=0,Y=0){te=v,W=U,q=Y;let G=null,H=!1,xe=!1;if(v){let ge=k.get(v);if(ge.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(O.FRAMEBUFFER,ge.__webglFramebuffer),se.copy(v.viewport),Ie.copy(v.scissor),Te=v.scissorTest,g.viewport(se),g.scissor(Ie),g.setScissorTest(Te),J=-1;return}else if(ge.__webglFramebuffer===void 0)X.setupRenderTarget(v);else if(ge.__hasExternalTextures)X.rebindTextures(v,k.get(v.texture).__webglTexture,k.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let He=v.depthTexture;if(ge.__boundDepthTexture!==He){if(He!==null&&k.has(He)&&(v.width!==He.image.width||v.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(v)}}let be=v.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(xe=!0);let Re=k.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Re[U])?G=Re[U][Y]:G=Re[U],H=!0):v.samples>0&&X.useMultisampledRTT(v)===!1?G=k.get(v).__webglMultisampledFramebuffer:Array.isArray(Re)?G=Re[Y]:G=Re,se.copy(v.viewport),Ie.copy(v.scissor),Te=v.scissorTest}else se.copy(ye).multiplyScalar(ne).floor(),Ie.copy(Ve).multiplyScalar(ne).floor(),Te=ut;if(Y!==0&&(G=z),g.bindFramebuffer(O.FRAMEBUFFER,G)&&g.drawBuffers(v,G),g.viewport(se),g.scissor(Ie),g.setScissorTest(Te),H){let ge=k.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,Y)}else if(xe){let ge=U;for(let be=0;be<v.textures.length;be++){let Re=k.get(v.textures[be]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+be,Re.__webglTexture,Y,ge)}}else if(v!==null&&Y!==0){let ge=k.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ge.__webglTexture,Y)}J=-1};function yh(v){let U=k.get(v);return(U.__readFormat!==v.format||U.__readType!==v.type)&&(U.__readFormat=v.format,U.__readType=v.type,U.__formatReadable=b.textureFormatReadable(v.format),U.__typeReadable=b.textureTypeReadable(v.type)),U}this.readRenderTargetPixels=function(v,U,Y,G,H,xe,Se,ge=0){if(!(v&&v.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be){g.bindFramebuffer(O.FRAMEBUFFER,be);try{let Re=v.textures[ge],He=Re.format,Ye=Re.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);let we=yh(Re);if(we.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-G&&Y>=0&&Y<=v.height-H&&O.readPixels(U,Y,G,H,fe.convert(He),fe.convert(Ye),xe)}finally{let Re=te!==null?k.get(te).__webglFramebuffer:null;g.bindFramebuffer(O.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(v,U,Y,G,H,xe,Se,ge=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be)if(U>=0&&U<=v.width-G&&Y>=0&&Y<=v.height-H){g.bindFramebuffer(O.FRAMEBUFFER,be);let Re=v.textures[ge],He=Re.format,Ye=Re.type;v.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ge);let we=yh(Re);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,nt),O.bufferData(O.PIXEL_PACK_BUFFER,xe.byteLength,O.STREAM_READ),O.readPixels(U,Y,G,H,fe.convert(He),fe.convert(Ye),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Et=te!==null?k.get(te).__webglFramebuffer:null;g.bindFramebuffer(O.FRAMEBUFFER,Et);let gt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Fu(O,gt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,nt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xe),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(nt),O.deleteSync(gt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,U=null,Y=0){let G=Math.pow(2,-Y),H=Math.floor(v.image.width*G),xe=Math.floor(v.image.height*G),Se=U!==null?U.x:0,ge=U!==null?U.y:0;X.setTexture2D(v,0),O.copyTexSubImage2D(O.TEXTURE_2D,Y,0,0,Se,ge,H,xe),g.unbindTexture()},this.copyTextureToTexture=function(v,U,Y=null,G=null,H=0,xe=0){let Se,ge,be,Re,He,Ye,we,nt,Et,gt=v.isCompressedTexture?v.mipmaps[xe]:v.image;if(Y!==null)Se=Y.max.x-Y.min.x,ge=Y.max.y-Y.min.y,be=Y.isBox3?Y.max.z-Y.min.z:1,Re=Y.min.x,He=Y.min.y,Ye=Y.isBox3?Y.min.z:0;else{let wt=Math.pow(2,-H);Se=Math.floor(gt.width*wt),ge=Math.floor(gt.height*wt),v.isDataArrayTexture?be=gt.depth:v.isData3DTexture?be=Math.floor(gt.depth*wt):be=1,Re=0,He=0,Ye=0}G!==null?(we=G.x,nt=G.y,Et=G.z):(we=0,nt=0,Et=0);let lt=fe.convert(U.format),Bt=fe.convert(U.type),Me;U.isData3DTexture?(X.setTexture3D(U,0),Me=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(X.setTexture2DArray(U,0),Me=O.TEXTURE_2D_ARRAY):(X.setTexture2D(U,0),Me=O.TEXTURE_2D),g.activeTexture(O.TEXTURE0),g.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),g.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),g.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);let Xt=g.getParameter(O.UNPACK_ROW_LENGTH),Qe=g.getParameter(O.UNPACK_IMAGE_HEIGHT),un=g.getParameter(O.UNPACK_SKIP_PIXELS),On=g.getParameter(O.UNPACK_SKIP_ROWS),di=g.getParameter(O.UNPACK_SKIP_IMAGES);g.pixelStorei(O.UNPACK_ROW_LENGTH,gt.width),g.pixelStorei(O.UNPACK_IMAGE_HEIGHT,gt.height),g.pixelStorei(O.UNPACK_SKIP_PIXELS,Re),g.pixelStorei(O.UNPACK_SKIP_ROWS,He),g.pixelStorei(O.UNPACK_SKIP_IMAGES,Ye);let Qi=v.isDataArrayTexture||v.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(v.isDepthTexture){let wt=k.get(v),fi=k.get(U),ft=k.get(wt.__renderTarget),pi=k.get(fi.__renderTarget);g.bindFramebuffer(O.READ_FRAMEBUFFER,ft.__webglFramebuffer),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let es=0;es<be;es++)Qi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,k.get(v).__webglTexture,H,Ye+es),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,k.get(U).__webglTexture,xe,Et+es)),O.blitFramebuffer(Re,He,Se,ge,we,nt,Se,ge,O.DEPTH_BUFFER_BIT,O.NEAREST);g.bindFramebuffer(O.READ_FRAMEBUFFER,null),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||k.has(v)){let wt=k.get(v),fi=k.get(U);g.bindFramebuffer(O.READ_FRAMEBUFFER,I),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,V);for(let ft=0;ft<be;ft++)Qi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,wt.__webglTexture,H,Ye+ft):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,wt.__webglTexture,H),ot?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,fi.__webglTexture,xe,Et+ft):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,fi.__webglTexture,xe),H!==0?O.blitFramebuffer(Re,He,Se,ge,we,nt,Se,ge,O.COLOR_BUFFER_BIT,O.NEAREST):ot?O.copyTexSubImage3D(Me,xe,we,nt,Et+ft,Re,He,Se,ge):O.copyTexSubImage2D(Me,xe,we,nt,Re,He,Se,ge);g.bindFramebuffer(O.READ_FRAMEBUFFER,null),g.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ot?v.isDataTexture||v.isData3DTexture?O.texSubImage3D(Me,xe,we,nt,Et,Se,ge,be,lt,Bt,gt.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Me,xe,we,nt,Et,Se,ge,be,lt,gt.data):O.texSubImage3D(Me,xe,we,nt,Et,Se,ge,be,lt,Bt,gt):v.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xe,we,nt,Se,ge,lt,Bt,gt.data):v.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xe,we,nt,gt.width,gt.height,lt,gt.data):O.texSubImage2D(O.TEXTURE_2D,xe,we,nt,Se,ge,lt,Bt,gt);g.pixelStorei(O.UNPACK_ROW_LENGTH,Xt),g.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qe),g.pixelStorei(O.UNPACK_SKIP_PIXELS,un),g.pixelStorei(O.UNPACK_SKIP_ROWS,On),g.pixelStorei(O.UNPACK_SKIP_IMAGES,di),xe===0&&U.generateMipmaps&&O.generateMipmap(Me),g.unbindTexture()},this.initRenderTarget=function(v){k.get(v).__webglFramebuffer===void 0&&X.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?X.setTextureCube(v,0):v.isData3DTexture?X.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?X.setTexture2DArray(v,0):X.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){W=0,q=0,te=null,g.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}};var Jx=[[0,1],[1,0],[0,-1],[-1,0]];function $x(n){let e=2166136261;for(let t of String(n))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}function xd(n,e,t=""){if(Number.isInteger(e.facing)&&e.facing>=0&&e.facing<4)return e.facing;let i=n.props.filter(o=>o.type==="npc").slice().sort((o,l)=>o.id<l.id?-1:o.id>l.id?1:0),r=Math.max(0,i.findIndex(o=>o.id===e.id)),s=($x(t+":"+n.id)+r)%4;return Jx.map(([o,l],c)=>({i:c,x:e.x+o,y:e.y+l})).filter(o=>n.tiles[o.y]?.[o.x]==="floor"&&!n.props.some(l=>l.x===o.x&&l.y===o.y&&l.solid!==!1)).sort((o,l)=>(o.i-s+4)%4-(l.i-s+4)%4)[0]?.i??s}function _d(n,e){let t=e.x-n.x,i=e.y-n.y;return Math.abs(t)>Math.abs(i)?t>0?1:3:i<0?2:0}function yd(n,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),i=new Map,r=new Map;for(let c of n){let u=[];c.updateWorldMatrix(!0,!0),c.traverse(d=>{if(!d.isMesh||Array.isArray(d.material))return;let h=!!d.userData.decal,p=d.material,x=d.geometry.type+JSON.stringify(d.geometry.parameters||{})+":"+(h?"decal":p.uuid)+":"+d.castShadow+":"+d.receiveShadow;i.has(x)||i.set(x,{geometry:d.geometry,material:p,decal:h,cast:d.castShadow,receive:d.receiveShadow,entries:[]});let m=i.get(x),f=new We;for(let S=0;S<(d.isInstancedMesh?d.count:1);S++){d.isInstancedMesh?d.getMatrixAt(S,f):f.identity();let C=new Le(16777215);h&&d.instanceColor&&d.getColorAt(S,C);let M={root:c,source:d,local:f.clone(),color:C,index:m.entries.length};u.push(M),m.entries.push(M)}d.layers.set(1)}),r.set(c,u),c.userData.staticBatched=!0}let s=[];for(let c of i.values()){let u=c.decal?new mn({color:16777215,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}):c.material,d=new on(c.geometry,u,c.entries.length);d.castShadow=c.cast,d.receiveShadow=c.receive,d.frustumCulled=!1,d.userData.staticBatch=!0,d.userData.decal=c.decal,d.userData.disposeMaterial=c.decal;for(let h of c.entries)h.batch=d,c.decal&&d.setColorAt(h.index,h.color);d.instanceColor&&(d.instanceColor.needsUpdate=!0),e.add(d),s.push(d)}let a=new We,o=new We().makeScale(0,0,0);function l(c){c.updateWorldMatrix(!0,!0);for(let u of r.get(c)||[]){let d=!0;for(let h=u.source;h&&h!==e;h=h.parent)d&&=h.visible;a.copy(t).multiply(u.source.matrixWorld).multiply(u.local),u.batch.setMatrixAt(u.index,d?a:o),u.batch.instanceMatrix.needsUpdate=!0}}for(let c of n)l(c);return{meshes:s,roots:n,update:l,sourceMeshes:n.reduce((c,u)=>(u.traverse(d=>{d.isMesh&&c++}),c),0)}}function tl(n,e,t=.8,i=1.14){e.updateWorldMatrix(!0,!0),n.updateMatrixWorld(!0);let r=new an().setFromObject(e);if(r.isEmpty())return;let s=new an;for(let c of[r.min.x,r.max.x])for(let u of[r.min.y,r.max.y])for(let d of[r.min.z,r.max.z])s.expandByPoint(new B(c,u,d).applyMatrix4(n.matrixWorldInverse));let a=s.getCenter(new B),o=s.getSize(new B),l=Math.max(o.y,o.x/t,.1)*i;n.left=a.x-l*t/2,n.right=a.x+l*t/2,n.top=a.y+l/2,n.bottom=a.y-l/2,n.near=Math.max(.01,-s.max.z-1),n.far=Math.max(n.near+1,-s.min.z+1),n.updateProjectionMatrix()}function vd({figure:n,propModel:e,shadedBox:t,compact:i,terrainMaterial:r}){let s=new Tn;s.background=new Le("#26201a");let a=new cn(-4,4,8,-8,.1,60),o=new Ke;s.add(o);let l=new Ke,c=[],u=[],d=[],h=[8157814,8881278,7368297,9210241,7960176];for(let Z=0;Z<15;Z++)for(let ie=-5;ie<=5;ie++){let b=ie*.84+Z%2*.42;t(l,b,Z*.47+.24,-4.5,.81,.44,.38,h[(ie+Z*3+25)%h.length])}for(let Z=0;Z<15;Z++)for(let ie=0;ie<16;ie++)t(l,-4.65,Z*.47+.24,-4.4+ie*.82+Z%2*.41,.38,.44,.79,h[(ie+Z*3)%h.length]);let p=new pn(.487,.06,.487),_=[8675391,7557686,9463623,8345402,7950905],x=_.map(()=>[]);for(let Z=-12;Z<=12;Z++)for(let ie=-10;ie<=24;ie++){let b=(Z*7+ie*3+160)%5;x[b].push([Z*.5,-.044,ie*.5])}for(let Z=0;Z<5;Z++){let ie=new on(p,r(_[Z],1),x[Z].length),b=new We;x[Z].forEach((g,L)=>{b.makeTranslation(...g),ie.setMatrixAt(L,b)}),ie.receiveShadow=!0,o.add(ie)}for(let Z of[-4.35,-1.5,2.4,4.4])t(l,Z,1.68,-4.24,.16,3.36,.2,4205856),t(l,Z,.18,-4.16,.25,.34,.3,3155228);for(let Z of[.5,2.7,3.27])t(l,0,Z,-4.21,9,.16,.22,4731170);o.add(i(l));let m=(Z,ie,b,g=0,L=Z)=>{let k=e({type:Z,id:L});return k.position.set(ie,0,b),k.rotation.y=g,o.add(k),c.push(k),k},f=(Z,ie,b,g,L,k,X,oe)=>t(Z,ie,b,g,L,k,X,oe),S=(Z,ie,b,g)=>{let L=new Ke;L.position.set(ie,b,g),Z.add(L),f(L,0,.02,0,.16,.035,.16,7754034),f(L,0,.12,0,.07,.18,.07,15783072);let k=new Ke;return k.position.y=.25,L.add(k),t(k,0,0,0,.065,.13,.065,16754222,!0),t(k,0,-.015,.002,.037,.08,.04,16768898,!0),d.push({m:k,phase:d.length*.8}),L};function C(Z,ie){let b=new Ke;b.position.set(Z,0,ie),o.add(b);for(let g of[-.67,.67])f(b,g,1.2,0,.09,2.4,.38,5519651);for(let g=0;g<4;g++){let L=.36+g*.48;f(b,0,L,.04,1.46,.075,.48,7359020);for(let k=0;k<6;k++){let X=-.55+k*.22,oe=[4875858,7756085,8676424,3562068,9664075,6698798][(k+g)%6],ae=.19+k%3*.035;f(b,X,L+ae/2+.06,.05,.12,ae,.12,oe),f(b,X,L+ae+.07,.05,.055,.075,.06,oe),f(b,X,L+ae+.11,.05,.065,.022,.065,11701077)}}i(b)}C(-3.3,-4.02),C(-1.73,-4.02);for(let Z=-3.55;Z<0;Z+=.96)m("counter",Z,-2.55);m("barrel",-4,-3.35),m("chair",-2.8,-1.55,Math.PI);let M=(Z,ie)=>{let b=new Ke;b.position.set(Z,0,ie),o.add(b);for(let g of[-.58,.58])for(let L of[-.39,.39])f(b,g,.32,L,.12,.64,.12,6504741);for(let g=0;g<4;g++)f(b,-.57+g*.38,.73,0,.37,.12,1.05,[9132850,8540974,9987896,8870191][g]);return f(b,0,.39,.22,1.3,.09,.07,5255967),f(b,.25,.87,-.24,.13,.18,.13,8277546),f(b,.25,.966,-.24,.11,.015,.11,12232575),f(b,-.35,.845,.15,.27,.1,.2,10254410),i(b),S(b,-.47,.79,-.24),b};M(.5,-.15),m("chair",.36,-1.13,0),m("chair",1.52,-.13,-Math.PI/2),M(.2,3.55),m("chair",.15,2.6,0),m("chair",1.23,3.55,-Math.PI/2);let T=new Ke;T.position.set(.85,0,-3.75),o.add(T);for(let Z of[-.65,.65])for(let ie=0;ie<4;ie++)f(T,Z,.27+ie*.38,0,.4,.36,.8,h[ie]);f(T,0,.09,.25,1.78,.17,1.32,6446677),f(T,0,1.64,0,1.77,.27,1.03,7367519);for(let Z=0;Z<6;Z++)for(let ie=0;ie<2;ie++)f(T,(ie-.5)*.65,1.88+Z*.22,-.1,.63,.2,.69,h[(Z+ie)%5]);f(T,0,.83,-.38,.95,1.18,.07,1577742);for(let Z of[-.22,.18]){let ie=f(T,Z,.27,.26,.68,.13,.15,4796445);ie.rotation.y=Z*2}i(T);let E=new Ke;E.position.set(.85,.4,-3.48),o.add(E);for(let Z=0;Z<4;Z++){let ie=new Ke;ie.position.set((Z-1.5)*.17,0,0),E.add(ie),t(ie,0,.1,0,.19,.33,.12,15763233,!0),t(ie,0,.06,.025,.095,.22,.1,16765798,!0),d.push({m:ie,phase:Z*1.5})}for(let[Z,ie]of[[-4.39,-2.1],[.65,-4.18]]){let b=m("torch",Z,ie);b.position.y=1.25}let A=new Ke;A.position.set(-.18,0,-.85),o.add(A),f(A,0,2.75,0,.028,.75,.028,5325620),f(A,0,2.36,0,.82,.075,.65,7358251);for(let Z of[-.31,.31])for(let ie of[-.23,.23])S(A,Z,2.4,ie);i(A),S(o,-3.5,.81,-2.45);let y=document.createElement("canvas");y.width=256,y.height=384;let w=y.getContext("2d");w.fillStyle="#6e2026",w.fillRect(0,0,256,384),w.strokeStyle="#b18c4a",w.lineWidth=7,w.strokeRect(14,14,228,356),w.lineWidth=3,w.strokeRect(26,26,204,332);for(let Z=47;Z<360;Z+=32)for(let ie=44;ie<230;ie+=34)w.fillStyle=(ie+Z)%3?"#b18a43":"#8a3f32",w.fillRect(ie,Z,9,5);w.save(),w.translate(128,192),w.rotate(Math.PI/4),w.strokeStyle="#b79850",w.lineWidth=6,w.strokeRect(-43,-43,86,86),w.strokeRect(-27,-27,54,54),w.restore();let R=new Hn(y);R.magFilter=vt,R.colorSpace=Ct;let F=new je(new Rn(3.15,5.2),new mn({map:R,roughness:1}));F.rotation.x=-Math.PI/2,F.position.set(-1.9,.006,1),F.receiveShadow=!0,o.add(F);let P=(Z,ie,b,g,L=!1,k,X={})=>{let oe={kind:Z,npcId:k,hands:["empty","empty"]};k||(oe.appearance={...window.Characters.defaultLook({0:"rogue",1:"wizard",2:"fighter",5:"cleric"}[Z],"male"),...X});let ae=n(Z,oe,{articulated:!0,base:!1});ae.position.set(ie,L?.2:0,b),ae.rotation.y=g,ae.scale.setScalar(1.08),s.add(ae);let $=ae.userData.rig;L&&($.legL.rotation.x=$.legR.rotation.x=-1.05);let j=new Ke;return t(j,0,0,0,.105,.12,.105,8805685),t(j,.062,.01,0,.04,.07,.025,11305040),j.position.set(.31,.53,.23),ae.add(j),u.push({m:ae,rig:$,mug:j,phase:u.length*3.4,seated:L,baseY:ae.position.y}),ae};P(5,-2.2,-3.1,.3,!1,"innkeeper"),P(2,.36,-1.13,.25,!0,void 0,{hair:"#593321",hairStyle:"short"}),P(0,1.52,-.13,-Math.PI/2,!0,void 0,{hair:"#392c22",cloth:"#6b674c"}),P(1,.15,2.6,.25,!0,void 0,{headgear:"none",hair:"#c7c4bf",beard:"none",cloth:"#385168",hairStyle:"short"});let z=new ri(15196629,4797992,.8);s.add(z);let I=new oi(16772309,2.1);I.position.set(-2,7,5),I.castShadow=!0,I.shadow.mapSize.set(1024,1024),I.shadow.camera.left=-8,I.shadow.camera.right=8,I.shadow.camera.top=8,I.shadow.camera.bottom=-8,I.shadow.normalBias=.02,s.add(I);let V=new ai(16747815,7,8,1.7);V.position.set(.85,.9,-3.03),s.add(V);let W=new ai(16758616,5,8,1.5);W.position.set(-1,2.3,-1.8),s.add(W);let q=new Ar(12,12,13480059,9990731);q.position.y=.018,q.material.transparent=!0,q.material.opacity=.16,s.add(q);let te=new Float32Array(36),J=new Tt;J.setAttribute("position",new Vt(te,3));let Q=new vr(J,new Is({color:16766081,size:.035,transparent:!0,opacity:.8,depthWrite:!1}));s.add(Q);let se=document.createElement("canvas");se.width=se.height=32;let Ie=se.getContext("2d"),Te=Ie.createRadialGradient(16,16,0,16,16,16);Te.addColorStop(0,"rgba(130,119,100,.09)"),Te.addColorStop(1,"rgba(130,119,100,0)"),Ie.fillStyle=Te,Ie.fillRect(0,0,32,32);let at=new As({map:new Hn(se),transparent:!0,depthWrite:!1}),Ze=Array.from({length:3},()=>{let Z=new _r(at);return s.add(Z),Z}),qe=new Tn,K=new cn(-1,1,1,-1,.1,20);qe.add(new ri(16773071,6903910,2));let ne=new oi(16777215,2.2);ne.position.set(-2,4,5),qe.add(ne);let pe=null,De=null,ye="",Ve=0,ut=.22,Be=0,Ge=null,st=0,ze=0,et=0;function bt(Z){Z&&(qe.remove(Z),Z.traverse(ie=>{if(ie.isInstancedMesh&&ie.dispose(),ie.userData.menuMaterials)for(let b of ie.userData.menuMaterials)b.dispose()}))}function Lt(Z,ie){Z?.traverse(b=>{if(b.isMesh){if(!b.userData.menuMaterials){let g=Array.isArray(b.material)?b.material:[b.material];b.userData.menuMaterials=g.map(L=>L.clone()),b.material=Array.isArray(b.material)?b.userData.menuMaterials:b.userData.menuMaterials[0]}for(let g of b.userData.menuMaterials)g.transparent=ie<1,g.opacity=ie,g.depthWrite=ie>=.99}})}function mt(Z){let ie=JSON.stringify([Z.kind,Z.classId,Z.appearance,Z.hands]);ie!==ye&&(bt(De),De=pe,pe=n(Z.kind,Z,{articulated:!0,base:!1}),qe.add(pe),ye=ie,Ve=ze,Lt(pe,0))}function St(Z){!Z||Z.dataset.liveRotation||(Z.dataset.liveRotation="true",Z.style.touchAction="pan-y",Z.onpointerdown=ie=>{Ge={x:ie.clientX,time:performance.now()},Be=0,Z.setPointerCapture(ie.pointerId)},Z.onpointermove=ie=>{if(!Ge)return;let b=performance.now(),g=(ie.clientX-Ge.x)*.012*(window.CinematicMenu.controls?.sensitivity||1);ut+=g,Be=hn.clamp(g/Math.max(.008,(b-Ge.time)/1e3),-4,4),Ge={x:ie.clientX,time:b}},Z.onpointerup=Z.onpointercancel=()=>{Ge=null},Z.onclick=null)}function O(Z,ie,b,g){let L=Math.min(.05,Math.max(0,(ie-st)/1e3));st=ie;let k=b.animations&&!matchMedia("(prefers-reduced-motion: reduce)").matches;k&&(ze+=L);let X=ze,oe=Z.domElement.clientWidth,ae=Z.domElement.clientHeight;et=k?et+(+!!g-et)*Math.min(1,L*3):+!!g;let $=oe>650?5.3:3.65;a.left=-$,a.right=$,a.top=$*ae/oe,a.bottom=-$*ae/oe,a.position.set(7+Math.sin(X*.07)*.065-et*.2,10.8+Math.sin(X*.09)*.035,14-et*.3),a.lookAt(-.05,0,1.25),a.updateProjectionMatrix(),z.intensity=.4+b.ambient*1.8,I.intensity=b.lights?1.7:.65,V.intensity=b.lights?b.intensity*(6+Math.sin(X*8)*.18+Math.sin(X*17)*.1):0,W.intensity=b.lights?b.intensity*(4.3+Math.sin(X*5)*.1):0,q.visible=b.grid;for(let ce of c)for(let ve of ce.userData.flames||[])ve.userData.menuRestScaleY??=ve.scale.y,ve.scale.y=ve.userData.menuRestScaleY*(1+Math.sin(X*8+ve.position.x*4)*.08);for(let ce of d)ce.m.scale.y=1+Math.sin(X*8+ce.phase)*.09;for(let ce of u){let ve=X+ce.phase,Ue=ve%18,D=Ue>9&&Ue<14?Math.sin((Ue-9)/5*Math.PI):0;ce.m.position.y=ce.baseY+Math.sin(ve*1.4)*.008,ce.rig.torso.scale.y=1+Math.sin(ve*1.4)*.009,ce.rig.head.rotation.y=Math.sin(ve*.33)*.1,ce.rig.armR.rotation.x=-D*1.5,ce.rig.armR.rotation.z=-D*.25,ce.mug.position.set(.31-D*.11,.53+D*.42,.23-D*.16),ce.mug.rotation.x=-D*.4}for(let ce=0;ce<12;ce++){let ve=(X*.17+ce*.618)%1;te[ce*3]=.85+Math.sin(ce*4.2+ve*3)*.17,te[ce*3+1]=ve<.16?.25+ve*5:-100,te[ce*3+2]=-3.4+Math.sin(ce*2.1)*.12}if(Q.visible=k&&b.lights,J.attributes.position.needsUpdate=!0,Ze.forEach((ce,ve)=>{let Ue=(X*.07+ve*.2)%1;ce.position.set(.85+Math.sin(Ue*5)*.1,.8+Ue*1.4,-3.4),ce.scale.setScalar(.3+Ue*.45),ce.visible=b.lights}),Z.shadowMap.needsUpdate=k&&ie-(O.lastShadow||0)>120,Z.shadowMap.needsUpdate&&(O.lastShadow=ie),Z.setViewport(0,0,oe,ae),Z.setScissorTest(!1),Z.autoClear=!0,Z.render(s,a),!g?.actor||!g.anchor?.isConnected)return;mt(g.actor),St(g.anchor),Ge||(k&&window.CinematicMenu.controls?.inertia!==!1?(ut+=Be*L,Be*=Math.exp(-L*6)):Be=0),pe.rotation.y=ut,pe.position.y=Math.sin(X*1.6)*.008,pe.userData.rig.head.rotation.y=Math.sin(X*.55)*.025,pe.userData.rig.armR.rotation.z=Math.sin(X*1.2)*.025;let j=k?Math.min(1,(ze-Ve)/.22):1;Lt(pe,j),De&&(De.rotation.y=ut,Lt(De,1-j),j===1&&(bt(De),De=null));let le=g.anchor.getBoundingClientRect(),Ee=Z.domElement.getBoundingClientRect(),ue=le.left-Ee.left,he=ae-(le.bottom-Ee.top);le.width<1||le.height<1||(K.position.set(0,1.15,4),K.lookAt(0,.64,0),tl(K,pe,le.width/le.height,1.15),Z.setViewport(ue,he,le.width,le.height),Z.setScissor(Math.max(0,ue),Math.max(0,he),le.width,Math.min(le.height,ae-he)),Z.setScissorTest(!0),Z.autoClear=!1,Z.clearDepth(),Z.render(qe,K),Z.autoClear=!0,Z.setScissorTest(!1),Z.setViewport(0,0,oe,ae))}return{render:O,turn:Z=>{ut+=Z,Be=0},get debug(){return{clock:ze,rotation:ut,velocity:Be,camera:[...a.position],patrons:u.map(Z=>({head:Z.rig.head.rotation.y,arm:Z.rig.armR.rotation.x})),drawCalls:s.children.length}}}}var Ri={size:.058,decalDepth:.008,minW:.09,minH:.09,minD:.05};function tn(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),r=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|r}function Yn(n,e){if(e<=1)return tn(n,e);let t=Math.min(1,(e-1)*.9),i=n>>16&255,r=n>>8&255,s=n&255;return Math.round(i+(255-i)*t)<<16|Math.round(r+(255-r)*t)<<8|Math.round(s+(255-s)*t)}function Kx(n){let e=n|0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Md={skin:{hi:1.06,lo:.9,amp:.045,noise:2},hair:{hi:1.18,lo:.8,amp:.11,strands:!0},metal:{hi:1.22,lo:.76,amp:.1,glint:!0},cloth:{hi:1.12,lo:.82,amp:.08,pleats:!0},other:{hi:1.1,lo:.84,amp:.07}};function zr(n,e=()=>"other",t=Ri.size,{minDepth:i=Ri.minD}={}){let r=[],s=Ri.decalDepth;function a(o,l){let c=o[8]==="f"?2:1,u=c===2?[0,1]:[0,2],d=o[c]-o[c+3]/2,h=[o];n.forEach((p,_)=>{if(_===l||p.length>8)return;let x=p[c]-p[c+3]/2,m=p[c]+p[c+3]/2;if(x>=d+s-1e-8||m<d-1e-8||Math.abs(m-d)<1e-8&&_<l)return;let[f,S]=u,C=p[f]-p[f+3]/2,M=p[f]+p[f+3]/2,T=p[S]-p[S+3]/2,E=p[S]+p[S+3]/2;h=h.flatMap(A=>{let y=A[f]-A[f+3]/2,w=A[f]+A[f+3]/2,R=A[S]-A[S+3]/2,F=A[S]+A[S+3]/2,P=Math.max(y,C),z=Math.min(w,M),I=Math.max(R,T),V=Math.min(F,E);return z-P<1e-8||V-I<1e-8?[A]:[[y,P,R,F],[z,w,R,F],[P,z,R,I],[P,z,V,F]].filter(([W,q,te,J])=>q-W>1e-8&&J-te>1e-8).map(([W,q,te,J])=>{let Q=[...A];return Q[f]=(W+q)/2,Q[f+3]=q-W,Q[S]=(te+J)/2,Q[S+3]=J-te,Q})})}),r.push(...h)}return n.forEach((o,l)=>{if(o.length>8||o[7])return;let[c,u,d,h,p,_,x]=o;if(h<Ri.minW||p<Ri.minH||_<i)return;let m=Md[e(x)]||Md.other,f=Math.max(1,Math.round(h/t)),S=Math.max(1,Math.round(p/t)),C=h/f,M=p/S,T=d+_/2+s/2,E=d+_/2+1e-4,A=Kx(Math.round(c*997)*31+Math.round(u*991)*17+Math.round(d*983)*13+(x&65535)+l*7),y=Array.from({length:S},()=>Array(f).fill(null)),w=(P,z,I,V=1,W=1)=>{if(I!==x)for(let q=z;q<Math.min(S,z+W);q++)for(let te=P;te<Math.min(f,P+V);te++)y[q][te]=I};S>=3&&(w(0,0,Yn(x,m.hi),f),w(0,S-1,Yn(x,m.lo),f)),f>=4&&S>=4&&h>=.2&&(w(0,1,Yn(x,1+(m.hi-1)*.5),1,S-2),w(f-1,1,Yn(x,1-(1-m.lo)*.6),1,S-2));let R=Math.min(m.noise??3,Math.floor(f*S/8)),F=new Set;for(let P=0;P<R;P++){let z=f>2?1+Math.floor(A()*(f-2)):Math.floor(A()*f),I=S>2?1+Math.floor(A()*(S-2)):Math.floor(A()*S),V=z*64+I,W=(A()<.5?-1:1)*m.amp*(.55+A()*.6);Math.abs(W)<.04&&(W=W<0?-.04:.04),F.has(V)||(F.add(V),w(z,I,Yn(x,1+W)))}if(m.strands&&f>=3&&S>=3){for(let P=0;P<2;P++)w(1+Math.floor(A()*(f-2||1)),1,Yn(x,.86),1,Math.max(1,Math.min(S-2,2+Math.floor(A()*(S-2)))));w(Math.floor(A()*f),1,Yn(x,m.hi))}if(m.pleats&&p>=.2&&h>=.2&&S>=4)for(let P of[Math.round(f/3),Math.round(f*2/3)])P>0&&P<f&&w(P,1,Yn(x,.9),1,S-2);m.glint&&f>=2&&S>=2&&w(Math.min(1,f-1),Math.min(1,S-1),Yn(x,1.36));for(let P=0;P<S;P++)for(let z=0;z<f;z++){let I=y[P][z];if(I===null)continue;let V=1,W=1;for(;z+V<f&&y[P][z+V]===I;)V++;for(;P+W<S&&y[P+W].slice(z,z+V).every(q=>q===I);)W++;for(let q=P;q<P+W;q++)y[q].fill(null,z,z+V);a([c-h/2+(z+V/2)*C,u+p/2-(P+W/2)*M,T,V*C,W*M,s,I,!1,"f",E],l)}if(h>=.18&&_>=.15){let P=Math.max(1,Math.round(_/t)),z=_/P,I=new Map;for(let V=0;V<2;V++){let W=(A()<.5?-1:1)*m.amp*(.6+A()*.5);Math.abs(W)<.04&&(W=W<0?-.04:.04);let q=Math.floor(A()*f),te=Math.floor(A()*P);I.set(te*f+q,[c-h/2+(q+.5)*C,u+p/2+s/2,d-_/2+(te+.5)*z,C,s,z,Yn(x,1+W),!1,"t",E])}for(let V of I.values())a(V,l)}}),r}function Sd(n,e,t,i,r){i.fill(0);let s=0,a=0,o=l=>{i[l]||n[l*4]>=128||(i[l]=1,r[a++]=l)};for(let l=0;l<e;l++)o(l),o((t-1)*e+l);for(let l=0;l<t;l++)o(l*e),o(l*e+e-1);for(;s<a;){let l=r[s++],c=l%e;c&&o(l-1),c<e-1&&o(l+1),l>=e&&o(l-e),l<e*(t-1)&&o(l+e)}for(let l=0;l<e*t;l++){let c=i[l]?0:255;n[l*4]=n[l*4+1]=n[l*4+2]=c,n[l*4+3]=255}}var jx="approved-voxel-v4";var bd={fighter:{cloth:"#315e84",trim:"#c6a04f",hair:"#75462e",skin:"#efbc88"},wizard:{cloth:"#62377e",trim:"#c6a04f",hair:"#c9c6d7",skin:"#efbc88"},rogue:{cloth:"#487844",trim:"#c6a04f",hair:"#352b32",skin:"#efbc88"},cleric:{cloth:"#8b3d46",trim:"#c6a04f",hair:"#734c32",skin:"#efbc88"},skeleton:{cloth:"#813a36",trim:"#c6a04f",hair:"#352b32",skin:"#d9c9a5"},dummy:{cloth:"#936c40",trim:"#c6a04f",hair:"#936c40",skin:"#936c40"}},wd=Object.freeze({keeper:Object.freeze({name:"\u042D\u043B\u043B\u0435\u043D",role:"\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430",classId:"cleric",appearance:Object.freeze({gender:"female",hair:"#c9c6d7",hairStyle:"long",face:"soft"}),hood:!0,hands:Object.freeze(["empty","empty"])}),novice:Object.freeze({name:"\u041B\u0438\u043D",role:"\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A",classId:"cleric",appearance:Object.freeze({gender:"male",hair:"#75462e",hairStyle:"short",face:"soft"}),hood:!1,hands:Object.freeze(["empty","empty"])})}),Td={ellen:"keeper",lin:"novice"};function Qx(n){let e=Object.hasOwn(Td,n)?Td[n]:n;if(!Object.hasOwn(wd,e))throw new Error("NPC must be registered in NPCS: "+n);return wd[e]}function Zc(n={},e=n.kind||0){let t=n.npcId||(n.type==="npc"?n.id:null),i=t?Qx(t):null,r=i?.classId||(n.classId&&Object.hasOwn(bd,n.classId)?n.classId:["rogue","wizard","fighter","skeleton","dummy","cleric"][e]||"cleric"),s=i?.appearance||n.appearance||{},a=bd[r],o=["male","female"].includes(s.gender)?s.gender:!n.appearance&&e===1?"female":"male",l=(c,u)=>/^#[a-f0-9]{6}$/i.test(c||"")?c:u;return{style:jx,role:r,gender:o,skin:l(s.skin,a.skin),hair:l(s.hair,o==="female"&&r==="cleric"?"#c9c6d7":o==="female"&&r==="fighter"?"#d7a652":a.hair),cloth:l(s.cloth,a.cloth),trim:l(s.trim,a.trim),hairStyle:["short","long","bald"].includes(s.hairStyle)?s.hairStyle:r==="cleric"&&!i&&o==="male"?"bald":o==="female"&&r!=="rogue"?"long":"short",face:["soft","stern","beard"].includes(s.face)?s.face:r==="cleric"&&!i&&o==="male"?"beard":"soft",hood:i?i.hood:r==="cleric"&&o==="female",hands:i?.hands||n.hands||(r==="fighter"||r==="skeleton"?["sword","shield"]:r==="wizard"||r==="cleric"?["staff","empty"]:["sword","empty"])}}function ct(n,e){let t=parseInt(n.slice(1),16);return"#"+[t>>16,t>>8&255,t&255].map(i=>Math.min(255,Math.max(0,i+e)).toString(16).padStart(2,"0")).join("")}function Ed(n={},e=n.kind||0){let t=Zc(n,e),i=[],r="body",s=(x,m,f,S,C,M,T,E=0)=>{let A=["head","hair","beard","hood"].includes(r),y=A?1.24:1.2,w=A?1.1:r==="equipment"?.84:.76,R=A?1.2:1.12;i.push({x:x*y,y:A?.7494+(m-.945)*w:.13+(m-.13)*w,z:f*R,w:S*y,h:C*w,d:M*R,color:T,rz:E,section:r})},a=t.gender==="female",o=t.cloth,l=t.trim,c="#573b29",u="#9caeb9",d=t.skin,h=ct(o,17),p=ct(o,-20),_=a?.31:.36;if(t.role==="dummy")return r="equipment",s(0,.6,0,.1,.95,.1,c),s(0,.85,0,.65,.09,.1,"#a4814b"),s(0,1.15,0,.39,.38,.34,"#b8955e"),s(0,1.15,.18,.28,.26,.015,"#843d32"),s(0,1.15,.196,.14,.13,.02,l),{profile:t,parts:i};for(let x of[-.115,.115])s(x,.22,.025,.17,.15,.26,c),s(x,.29,.035,.18,.05,.23,ct(c,13)),s(x,.405,0,.145,.22,.18,"#343139"),s(x,.335,.109,.145,.04,.025,l),s(x,.22,.16,.15,.07,.025,ct(c,-14));s(0,.715,0,_,.37,.26,o),s(0,.665,.139,_,.22,.018,p),s(0,.87,.14,_,.045,.025,h),s(0,.535,0,_+.045,.055,.295,c),s(0,.535,.165,.09,.08,.04,l),s(0,.535,.189,.043,.035,.014,c);for(let x of[-(_/2+.065),_/2+.065])s(x,.79,0,.13,.19,.21,o,x<0?-.13:.13),s(x,.644,.035,.105,.12,.15,c),s(x,.57,.05,.102,.09,.115,d),s(x,.715,.11,.13,.035,.028,l),s(x,.643,.12,.105,.025,.035,ct(c,18));if(t.role==="fighter"){s(0,.74,.16,_+.01,.27,.07,p),s(0,.75,.202,_-.035,.18,.025,h),s(0,.865,.193,_+.025,.045,.035,l),s(0,.674,.202,_,.04,.03,l);for(let x of[-.25,.25])s(x,.9,0,.22,.13,.285,o),s(x,.923,.02,.17,.045,.25,h),s(x,.858,.139,.205,.035,.025,l),s(x,.75,.121,.12,.11,.04,u),s(x,.717,.151,.12,.026,.02,"#c8d0d2");for(let x of[-.135,.135])s(x,.458,.045,.165,.11,.27,o),s(x,.422,.185,.165,.035,.02,l),s(x,.47,.195,.07,.07,.012,h);s(0,.765,.225,.035,.11,.015,l),s(0,.485,.162,.075,.05,.018,"#c5a165")}else if(t.role==="wizard"){for(let x of[-.11,.11])s(x,.457,0,.13,a?.3:.22,.31,o),s(x,.34,.166,.13,.035,.025,l),s(x,.65,.152,.028,.31,.025,l),s(x,.47,.171,.045,.1,.02,h);s(0,.73,.148,.09,.3,.028,"#343139"),s(0,.871,.173,.05,.055,.03,l),s(0,.873,.196,.022,.022,.017,"#63c6ed");for(let x of[-.17,.17])s(x,.874,.16,.07,.12,.09,h,x<0?-.22:.22)}else if(t.role==="rogue"){s(0,.715,.165,_-.015,.285,.045,c),s(-.065,.7,.194,.13,.22,.018,ct(c,13)),s(.09,.7,.195,.1,.22,.02,ct(c,-10)),s(0,.75,-.17,.42,.38,.065,p),s(0,.92,.02,.45,.09,.35,h),s(-.17,.846,.129,.2,.07,.07,o,-.3),s(.12,.837,.152,.27,.07,.07,o,.22),s(0,.859,.196,.08,.06,.024,l),s(-.1,.725,.175,.05,.28,.035,c,-.6),s(.085,.639,.175,.09,.07,.03,c,-.6);for(let x of[-.16,.16])s(x,.496,.182,.1,.115,.06,c),s(x,.529,.218,.1,.035,.025,ct(c,17)),s(x,.509,.235,.025,.026,.014,l);for(let x of[-.17,.17])s(x,.428,-.04,.075,.15,.27,o)}else if(t.role==="cleric"){for(let x of[-.13,.13])s(x,.452,0,.16,.3,.3,o),s(x,.316,.173,.16,.035,.025,"#dfcea6"),s(x,.7,.163,.036,.3,.025,"#dfcea6");s(0,.7,.168,.1,.3,.028,"#4d7541");for(let x of[-.14,.14])s(x,.904,.02,.2,.075,.32,"#dfcea6",x<0?-.18:.18);s(0,.857,.176,.038,.14,.035,l),s(0,.875,.18,.105,.032,.035,l);for(let x of[-.235,.235])s(x,.73,.09,.13,.045,.22,"#dfcea6")}if(s(0,.537,-.155,_+.045,.055,.025,c),t.role==="fighter"&&(s(0,.75,-.16,_-.035,.23,.05,p),s(0,.87,-.19,_,.035,.025,l),s(0,.66,-.19,_,.035,.025,l)),t.role==="wizard"||t.role==="cleric")for(let x of[-.1,.1])s(x,.66,-.158,.025,.34,.026,t.role==="cleric"?"#dfcea6":l),s(x,.439,-.17,.14,.18,.024,p);if(t.role==="rogue"){for(let x of[-.1,.1])s(x,.75,-.21,.1,.33,.02,ct(o,x<0?8:-12));s(0,.575,-.208,.38,.025,.025,ct(o,15))}r="head",s(0,1.145,.03,.43,.4,.35,d),s(0,.955,.03,.13,.06,.14,d);for(let x of[-.239,.239])s(x,1.125,.045,.055,.11,.095,ct(d,-9));if(s(.205,1.13,.06,.016,.33,.29,ct(d,-15)),s(-.105,1.319,.029,.2,.017,.32,ct(d,15)),t.role==="skeleton"){s(0,1.145,.03,.43,.4,.35,t.skin);for(let x of[-.105,.105])s(x,1.15,.218,.094,.095,.028,"#292620");s(0,1.075,.219,.049,.058,.022,"#292620");for(let x of[-.12,-.06,0,.06,.12])s(x,1.01,.222,.035,.062,.026,ct(t.skin,10));for(let x of[-.15,.15])s(x,1.045,.2,.05,.09,.05,t.skin);s(0,.715,.169,.06,.13,.02,l)}else{for(let x of[-.1,.1])s(x,1.135,.218,.05,.085,.015,"#251e1c"),t.face==="stern"?s(x,1.206,.216,.073,.025,.018,t.hair,x<0?-.22:.22):a?s(x-.01,1.181,.217,.035,.012,.017,"#251e1c"):s(x,1.202,.216,.065,.014,.018,t.hair);s(0,1.025,.213,.056,.009,.012,ct(d,-55))}if(r="beard",t.face==="beard"&&t.role!=="skeleton"){for(let x of[-.165,-.11,.11,.165])s(x,1.036,.218,.06,.13,.035,t.hair);s(0,.994,.218,.27,.09,.04,t.hair),s(0,1.022,.243,.105,.03,.025,ct(t.hair,14))}if(r="hair",t.hairStyle!=="bald"&&t.role!=="skeleton"){if(!t.hood)s(0,1.34,-.005,.47,.06,.405,ct(t.hair,-8));else{s(0,1.352,.208,.395,.1,.072,ct(t.hair,-8));for(let f of[-1,1])s(f*.19,1.29,.208,.055,.115,.06,t.hair)}let x=[[1,2,3,2,1],[2,3,2,4,2],[2,2,4,3,2],[1,3,2,2,1]];if(!t.hood)for(let f=0;f<4;f++)for(let S=0;S<5;S++){let C=x[f][S],M=f%2?.014:-.012;s((S-2)*.095+M,1.325+(C-1)*.025,(f-1.5)*.104,.101,.06+(C-1)*.05,.111,ct(t.hair,[4,15,-9,8][(S+f)%4]))}let m=[{x:-.2,y:1.295,h:.11},{x:-.11,y:1.255,h:.2},{x:0,y:1.3,h:.11},{x:.1,y:1.265,h:.18},{x:.2,y:1.285,h:.13}];for(let f=0;f<m.length;f++){let S=m[f];s(S.x,S.y,.224,.104,S.h,.096,ct(t.hair,f%2?0:13))}for(let f of[-.223,.223])s(f,1.24,-.035,.067,.16,.32,ct(t.hair,-9)),s(f,1.205,.135,.073,.13,.08,t.hair);if(t.hood||s(0,1.225,-.17,.45,.25,.068,ct(t.hair,-9)),a&&!t.hood&&t.hairStyle==="short"){for(let f of[-.239,.239])s(f,1.11,.005,.073,.23,.31,t.hair),s(f,1.007,.015,.08,.07,.25,ct(t.hair,10));s(0,1.08,-.175,.46,.29,.075,t.hair)}if(t.hairStyle==="long"&&t.hood)for(let f of[-.218,.218])s(f,1.085,.225,.054,.15,.065,t.hair);if(t.hairStyle==="long"&&!t.hood)if(t.role==="fighter"&&a)s(.105,1.31,-.25,.16,.15,.15,t.hair),s(.11,1.08,-.25,.18,.36,.145,t.hair),s(.11,.865,-.24,.13,.09,.14,ct(t.hair,14)),s(.105,1.245,-.273,.17,.035,.15,"#352b32");else if(!a)s(0,1.43,-.19,.19,.16,.18,t.hair),s(.025,1.26,-.235,.2,.15,.16,t.hair),s(.025,1.335,-.248,.2,.03,.16,"#251e1c");else{for(let f=0;f<5;f++)s((f-2)*.094,1.035,-.18,.098,.4,.088,ct(t.hair,f%2?0:12));for(let f of[-.247,.247])s(f,1.06,.015,.075,.34,.27,t.hair),s(f,.873,.035,.08,.085,.24,ct(t.hair,14))}}if(r="hood",t.hood){let x="#dfcea6";s(0,1.444,-.025,.39,.065,.44,x),s(0,1.482,-.025,.25,.03,.38,t.cloth),s(0,1.23,-.23,.49,.4,.055,x);for(let m of[-1,1])s(m*.217,1.385,-.035,.078,.105,.43,x),s(m*.253,1.19,-.035,.064,.3,.43,x),s(m*.24,1.335,.2,.06,.07,.04,t.cloth),s(m*.266,1.165,.2,.03,.23,.04,ct(x,-16));s(0,1.409,.205,.34,.028,.025,t.cloth)}if(r="equipment",t.hands.includes("shield")&&(s(.36,.75,.2,.3,.48,.055,l),s(.36,.75,.238,.235,.405,.027,o),s(.36,.75,.26,.03,.19,.015,l),s(.36,.78,.261,.145,.03,.017,l),s(.36,.508,.2,.22,.045,.06,l),s(.36,.474,.2,.15,.038,.06,l)),t.hands.includes("sword")&&(s(-.345,.65,.16,.085,.38,.05,u,.42),s(-.418,.8,.16,.065,.14,.05,"#d6dcdf",.42),s(-.264,.466,.16,.17,.035,.07,l,.42),s(-.234,.411,.16,.045,.1,.045,c,.42)),t.hands.includes("staff"))if(s(-.34,.85,.05,.045,.96,.045,c),t.role==="cleric"){s(-.34,1.25,.05,.15,.13,.15,u);for(let x of[-.435,-.245])s(x,1.25,.05,.045,.12,.1,l);s(-.34,1.35,.05,.055,.065,.055,l)}else s(-.34,1.35,.05,.16,.05,.16,l),s(-.34,1.42,.05,.12,.12,.12,"#46bbed"),s(-.34,1.5,.05,.06,.05,.06,"#7bd8f7");if(t.hands.includes("bow")){for(let x=0;x<5;x++)s(-.33-.055*Math.sin(x*Math.PI/4),.55+x*.1,.07,.043,.13,.04,"#936c40");s(-.33,.75,.085,.01,.4,.01,"#cebfa0")}return{profile:t,parts:i}}var Ii=n=>n.map(([e,t])=>({hex:e,name:t})),e_={skin:Ii([["#f6dcc3","\u0424\u0430\u0440\u0444\u043E\u0440"],["#f2d4b4","\u0421\u0432\u0435\u0442\u043B\u0430\u044F"],["#e9bf90","\u0422\u0451\u043F\u043B\u0430\u044F"],["#e3bb8a","\u041F\u0435\u0441\u043E\u0447\u043D\u0430\u044F"],["#d9a577","\u0417\u0430\u0433\u0430\u0440"],["#c58d64","\u041C\u0435\u0434\u043D\u0430\u044F"],["#a8714d","\u0411\u0440\u043E\u043D\u0437\u0430"],["#8b5b42","\u041A\u0430\u0448\u0442\u0430\u043D\u043E\u0432\u0430\u044F"],["#6b4331","\u0422\u0451\u043C\u043D\u0430\u044F"],["#4a2f25","\u042D\u0431\u0435\u043D\u043E\u0432\u0430\u044F"],["#efbc88","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#f8dfca","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#eac2ad","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#d8a17a","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#b77a55","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#a26a48","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#70472f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#533827","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"]]),hair:Ii([["#1c1b20","\u0427\u0451\u0440\u043D\u044B\u0439"],["#26282e","\u0413\u0440\u0430\u0444\u0438\u0442"],["#3a2a22","\u0428\u043E\u043A\u043E\u043B\u0430\u0434"],["#493024","\u041A\u0430\u0448\u0442\u0430\u043D"],["#6a432c","\u041E\u0440\u0435\u0445"],["#8a5a34","\u041C\u0435\u0434\u043E\u0432\u044B\u0439"],["#a64f35","\u0420\u044B\u0436\u0438\u0439"],["#c4622f","\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439"],["#b7803c","\u0417\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u0439"],["#d9b45a","\u0411\u043B\u043E\u043D\u0434"],["#e6cf8a","\u041B\u0451\u043D"],["#c7c4bf","\u0421\u0435\u0434\u043E\u0439"],["#e8e6ee","\u0411\u0435\u043B\u044B\u0439"],["#8d8a99","\u041F\u0435\u043F\u0435\u043B"],["#4a7fd0","\u041B\u0430\u0437\u0443\u0440\u044C"],["#5a3fa8","\u0418\u043D\u0434\u0438\u0433\u043E"],["#c05a9a","\u041C\u0430\u043B\u0438\u043D\u0430"],["#e07aa8","\u0420\u043E\u0437\u043E\u0432\u044B\u0439"],["#3fa58a","\u0411\u0438\u0440\u044E\u0437\u0430"],["#5f9a45","\u041C\u043E\u0445"],["#b02f3d","\u0410\u043B\u044B\u0439"],["#3b6a8a","\u0421\u0442\u0430\u043B\u044C"],["#75462e","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#c9c6d7","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#d7a652","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#352b32","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#734c32","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#17191f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#f0e9dc","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#e0b969","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#cb763f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#77352b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#596779","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#5d437c","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"],["#395c57","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"],["#8d526b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"],["#ac86ba","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),eye:Ii([["#14141a","\u0427\u0451\u0440\u043D\u044B\u0435"],["#3a2418","\u0422\u0451\u043C\u043D\u043E-\u043A\u0430\u0440\u0438\u0435"],["#6a4a22","\u041A\u0430\u0440\u0438\u0435"],["#2f5fa8","\u0421\u0438\u043D\u0438\u0435"],["#2f7a5a","\u0417\u0435\u043B\u0451\u043D\u044B\u0435"],["#6a3fa0","\u0424\u0438\u0430\u043B\u043A\u043E\u0432\u044B\u0435"],["#c27a1c","\u042F\u043D\u0442\u0430\u0440\u043D\u044B\u0435"],["#8a8f9a","\u0421\u0435\u0440\u044B\u0435"],["#b02f3d","\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0435"]]),cloth:Ii([["#24456b","\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439"],["#315e84","\u0421\u0438\u043D\u0438\u0439"],["#4a7fb0","\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439"],["#2f7a7a","\u041C\u043E\u0440\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430"],["#566d70","\u0421\u043B\u0430\u043D\u0435\u0446"],["#2d4f2c","\u0425\u0432\u043E\u044F"],["#3f6b3b","\u0417\u0435\u043B\u0451\u043D\u044B\u0439"],["#487844","\u0422\u0440\u0430\u0432\u0430"],["#7a9a4a","\u041E\u043B\u0438\u0432\u0430"],["#452361","\u0418\u043D\u0434\u0438\u0433\u043E"],["#5d2f7e","\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],["#62377e","\u0410\u043C\u0435\u0442\u0438\u0441\u0442"],["#8a4a9a","\u041E\u0440\u0445\u0438\u0434\u0435\u044F"],["#c8688a","\u0420\u043E\u0437\u0430"],["#6a2330","\u0411\u0443\u0440\u0433\u0443\u043D\u0434"],["#8a2f3c","\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439"],["#843f37","\u041A\u0438\u0440\u043F\u0438\u0447"],["#b0452f","\u0422\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u0430"],["#c7792f","\u042F\u043D\u0442\u0430\u0440\u044C"],["#8a6a46","\u041B\u0435\u043D"],["#2a2a30","\u0423\u0433\u043E\u043B\u044C"],["#6c6c76","\u0421\u0435\u0440\u044B\u0439"],["#e6dcc4","\u041A\u0440\u0435\u043C\u043E\u0432\u044B\u0439"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#8b3d46","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#172b48","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#386f9a","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#528b91","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#244b3b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#74914b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#b28439","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#bf6d36","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#714c38","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#302d38","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#aaa69b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#cfbda0","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"],["#775b96","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"],["#a9617b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"],["#484c74","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),trim:Ii([["#d0a94a","\u0417\u043E\u043B\u043E\u0442\u043E"],["#c3a04c","\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"],["#e8c870","\u0421\u0432\u0435\u0442\u043B\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"],["#b6bdc5","\u0421\u0435\u0440\u0435\u0431\u0440\u043E"],["#8fa0b0","\u0421\u0442\u0430\u043B\u044C"],["#c5b895","\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C"],["#78552e","\u0411\u0440\u043E\u043D\u0437\u0430"],["#b87333","\u041C\u0435\u0434\u044C"],["#b02f3d","\u0410\u043B\u044B\u0439"],["#3d8be8","\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"],["#4fb58a","\u0418\u0437\u0443\u043C\u0440\u0443\u0434"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#2a2a30","\u0427\u0451\u0440\u043D\u044B\u0439"],["#c6a04f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#e4c778","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#dbb787","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#ad7748","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#926749","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#d8dce1","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#82919d","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#526374","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#e9dfc7","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#b18bbf","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#699ca0","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#4c5b4c","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"]]),leather:Ii([["#4b3626","\u0422\u0451\u043C\u043D\u0430\u044F \u043A\u043E\u0436\u0430"],["#5a3d28","\u041A\u043E\u0436\u0430"],["#6a4a30","\u0421\u0432\u0435\u0442\u043B\u0430\u044F \u043A\u043E\u0436\u0430"],["#8a6a46","\u0414\u0443\u0431\u043B\u0451\u043D\u0430\u044F"],["#2a2a30","\u0427\u0451\u0440\u043D\u0430\u044F"],["#3a3a44","\u0413\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u0430\u044F"],["#6a2330","\u041A\u0440\u0430\u0441\u043D\u0430\u044F"],["#2d4f2c","\u0417\u0435\u043B\u0451\u043D\u0430\u044F"],["#24456b","\u0421\u0438\u043D\u044F\u044F"]]),paint:Ii([["#b02f3d","\u0410\u043B\u044B\u0439"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#3d8be8","\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"],["#1a1a1f","\u0427\u0451\u0440\u043D\u044B\u0439"],["#3f9a5a","\u0417\u0435\u043B\u0451\u043D\u044B\u0439"],["#d0a94a","\u0417\u043E\u043B\u043E\u0442\u043E\u0439"],["#7a3fa8","\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],["#e07a2f","\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439"]]),gem:Ii([["#4aa8f0","\u0421\u0430\u043F\u0444\u0438\u0440"],["#e0475a","\u0420\u0443\u0431\u0438\u043D"],["#4fd08a","\u0418\u0437\u0443\u043C\u0440\u0443\u0434"],["#a86bf0","\u0410\u043C\u0435\u0442\u0438\u0441\u0442"],["#f0c040","\u0422\u043E\u043F\u0430\u0437"],["#40e0d0","\u0411\u0438\u0440\u044E\u0437\u0430"],["#f0f0ff","\u0410\u043B\u043C\u0430\u0437"],["#f07ac0","\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u043A\u0432\u0430\u0440\u0446"]])};var Kt=n=>n.map(([e,t])=>({id:e,name:t})),t_={gender:Kt([["male","\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],["female","\u0416\u0435\u043D\u0441\u043A\u0438\u0439"]]),ears:Kt([["round","\u041E\u0431\u044B\u0447\u043D\u044B\u0435"],["small","\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435"],["pointed","\u041E\u0441\u0442\u0440\u044B\u0435"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0435"]]),hairStyle:Kt([["bald","\u0411\u0435\u0437 \u0432\u043E\u043B\u043E\u0441"],["buzz","\u0401\u0436\u0438\u043A"],["short","\u0412\u0437\u044A\u0435\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435"],["spiky","\u0428\u0438\u043F\u044B"],["mohawk","\u0418\u0440\u043E\u043A\u0435\u0437"],["sweep","\u041A\u043E\u0441\u0430\u044F \u0447\u0451\u043B\u043A\u0430"],["bob","\u041A\u0430\u0440\u0435"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0435"],["wavy","\u0412\u043E\u043B\u043D\u044B"],["ponytail","\u0425\u0432\u043E\u0441\u0442"],["bun","\u041F\u0443\u0447\u043E\u043A"],["twin","\u0414\u0432\u0430 \u0445\u0432\u043E\u0441\u0442\u0430"],["braid","\u041A\u043E\u0441\u0430"],["curly","\u041A\u0443\u0434\u0440\u0438"]]),brows:Kt([["soft","\u041C\u044F\u0433\u043A\u0438\u0435"],["straight","\u0420\u043E\u0432\u043D\u044B\u0435"],["angry","\u0421\u0443\u0440\u043E\u0432\u044B\u0435"],["raised","\u041F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435"],["thick","\u0413\u0443\u0441\u0442\u044B\u0435"],["thin","\u0422\u043E\u043D\u043A\u0438\u0435"],["sad","\u041F\u0435\u0447\u0430\u043B\u044C\u043D\u044B\u0435"],["none","\u0411\u0435\u0437 \u0431\u0440\u043E\u0432\u0435\u0439"]]),eyes:Kt([["dot","\u0422\u043E\u0447\u043A\u0438"],["wide","\u0428\u0438\u0440\u043E\u043A\u0438\u0435"],["narrow","\u0423\u0437\u043A\u0438\u0435"],["happy","\u0420\u0430\u0434\u043E\u0441\u0442\u043D\u044B\u0435"],["sleepy","\u0421\u043E\u043D\u043D\u044B\u0435"],["sparkle","\u0411\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0435"],["big","\u0411\u043E\u043B\u044C\u0448\u0438\u0435"]]),mouth:Kt([["smile","\u0423\u043B\u044B\u0431\u043A\u0430"],["neutral","\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439"],["grin","\u0423\u0445\u043C\u044B\u043B\u043A\u0430 \u0441 \u0437\u0443\u0431\u0430\u043C\u0438"],["smirk","\u0423\u0441\u043C\u0435\u0448\u043A\u0430"],["open","\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439"],["cat","\u041A\u043E\u0448\u0430\u0447\u0438\u0439"],["frown","\u0425\u043C\u0443\u0440\u044B\u0439"]]),beard:Kt([["none","\u0411\u0435\u0437 \u0431\u043E\u0440\u043E\u0434\u044B"],["stubble","\u0429\u0435\u0442\u0438\u043D\u0430"],["mustache","\u0423\u0441\u044B"],["goatee","\u042D\u0441\u043F\u0430\u043D\u044C\u043E\u043B\u043A\u0430"],["short","\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F"],["full","\u0413\u0443\u0441\u0442\u0430\u044F"],["long","\u0414\u043B\u0438\u043D\u043D\u0430\u044F"],["sideburns","\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u044B"]]),marks:Kt([["freckles","\u0412\u0435\u0441\u043D\u0443\u0448\u043A\u0438"],["blush","\u0420\u0443\u043C\u044F\u043D\u0435\u0446"],["scar","\u0428\u0440\u0430\u043C"],["browscar","\u0428\u0440\u0430\u043C \u043D\u0430 \u0431\u0440\u043E\u0432\u0438"],["mole","\u0420\u043E\u0434\u0438\u043D\u043A\u0430"],["warpaint","\u0411\u043E\u0435\u0432\u0430\u044F \u0440\u0430\u0441\u043A\u0440\u0430\u0441\u043A\u0430"],["plaster","\u041F\u043B\u0430\u0441\u0442\u044B\u0440\u044C"]]),headgear:Kt([["none","\u0411\u0435\u0437 \u0443\u0431\u043E\u0440\u0430"],["hood","\u041A\u0430\u043F\u044E\u0448\u043E\u043D"],["wizhat","\u0428\u043B\u044F\u043F\u0430 \u043C\u0430\u0433\u0430"],["helm","\u0428\u043B\u0435\u043C"],["circlet","\u0414\u0438\u0430\u0434\u0435\u043C\u0430"],["headband","\u041F\u043E\u0432\u044F\u0437\u043A\u0430"],["cap","\u0411\u0435\u0440\u0435\u0442 \u0441 \u043F\u0435\u0440\u043E\u043C"],["crown","\u041A\u043E\u0440\u043E\u043D\u0430"]]),cape:Kt([["none","\u0411\u0435\u0437 \u043F\u043B\u0430\u0449\u0430"],["short","\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043F\u043B\u0430\u0449"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0449"],["mantle","\u041D\u0430\u043A\u0438\u0434\u043A\u0430"]]),accessories:Kt([["earring","\u0421\u0435\u0440\u044C\u0433\u0430"],["eyepatch","\u041F\u043E\u0432\u044F\u0437\u043A\u0430 \u043D\u0430 \u0433\u043B\u0430\u0437"],["glasses","\u041E\u0447\u043A\u0438"],["scarf","\u0428\u0430\u0440\u0444"],["amulet","\u0410\u043C\u0443\u043B\u0435\u0442"],["bracers","\u041D\u0430\u0440\u0443\u0447\u0438"]])},Cd={fighter:Kt([["plate","\u041B\u0430\u0442\u044B"],["tabard","\u0421\u044E\u0440\u043A\u043E"],["leather","\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"],["knight","\u0422\u044F\u0436\u0451\u043B\u044B\u0435 \u043B\u0430\u0442\u044B"]]),wizard:Kt([["robe","\u041C\u0430\u043D\u0442\u0438\u044F"],["mantle","\u0421 \u0432\u043E\u0440\u043E\u0442\u043D\u0438\u043A\u043E\u043C"],["sash","\u0421 \u043A\u0443\u0448\u0430\u043A\u043E\u043C"],["scholar","\u0423\u0447\u0451\u043D\u044B\u0439 \u0436\u0438\u043B\u0435\u0442"]]),rogue:Kt([["leathers","\u041A\u043E\u0436\u0430 \u0441 \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u044C\u044E"],["vest","\u0416\u0438\u043B\u0435\u0442"],["tunic","\u0422\u0443\u043D\u0438\u043A\u0430"],["studded","\u041A\u043B\u0451\u043F\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"]]),cleric:Kt([["vestments","\u041E\u0431\u043B\u0430\u0447\u0435\u043D\u0438\u0435"],["surplice","\u0421\u0442\u0438\u0445\u0430\u0440\u044C"],["mail","\u041A\u043E\u043B\u044C\u0447\u0443\u0433\u0430"],["monk","\u0420\u044F\u0441\u0430 \u0441 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439"]])},Rd={fighter:"plate",wizard:"robe",rogue:"leathers",cleric:"vestments"},Id={skin:"skin",hair:"hair",hair2:"hair",brow:"hair",eye:"eye",beardColor:"hair",cloth:"cloth",cloth2:"cloth",trim:"trim",leather:"leather",accent:"cloth",markColor:"paint",hat:"cloth",capeColor:"cloth",gem:"gem"};var n_=new Set(["gender","ears","hairStyle","brows","eyes","mouth","beard","marks","headgear","cape","accessories","outfit","face","hood",...Object.keys(Id)]),i_={ears:"round",eyes:"dot",mouth:"smile",beard:"none",marks:[],headgear:"none",accessories:[],skin:"#e9bf90",hair2:null,brow:null,beardColor:null,cloth2:null,accent:null,hat:null,capeColor:null,eye:"#14141a",trim:"#d0a94a",gem:"#4aa8f0"},Ad={fighter:{cloth:"#315e84",leather:"#5a3d28",male:{hair:"#493024",hairStyle:"short",brows:"angry"},female:{hair:"#d9b45a",hairStyle:"ponytail",brows:"soft"}},wizard:{cloth:"#5d2f7e",leather:"#5a3d28",male:{hair:"#c7c4bf",hairStyle:"short",brows:"angry"},female:{hair:"#c7c4bf",hairStyle:"wavy",brows:"soft"}},rogue:{cloth:"#3f6b3b",leather:"#6a4a30",cape:"short",male:{hair:"#26282e",hairStyle:"bun",brows:"angry"},female:{hair:"#6a432c",hairStyle:"bob",brows:"soft"}},cleric:{cloth:"#8a2f3c",leather:"#5a3d28",male:{hair:"#493024",hairStyle:"bald",brows:"angry",beard:"full"},female:{hair:"#c7c4bf",hairStyle:"long",brows:"soft",headgear:"hood"}}};function Jc(n,e="male"){let t=Ad[n]||Ad.fighter,i=t[e==="female"?"female":"male"];return{...s_(i_),gender:e==="female"?"female":"male",cloth:t.cloth,leather:t.leather,cape:t.cape||"none",outfit:Rd[n]||"plate",...i}}var s_=n=>JSON.parse(JSON.stringify(n));function nl(n,e){n=n||{};let t=n.gender==="female"?"female":"male",i=Jc(e,t),r={...i};for(let a of Object.keys(n))n[a]!==void 0&&n_.has(a)&&(r[a]=n[a]);let s=n.brows===void 0&&n.face!==void 0;return s?(r.brows=n.face==="soft"?"soft":"angry",n.beard===void 0&&(r.beard=n.face==="beard"?"full":"none"),n.headgear===void 0&&(r.headgear=n.hood?"hood":"none")):n.hood&&n.headgear===void 0&&(r.headgear="hood"),s&&n.hairStyle==="short"&&t==="female"&&(r.hairStyle="bob"),s&&n.hairStyle==="long"&&t==="male"&&(r.hairStyle="bun"),Cd[e]?.some(a=>a.id===r.outfit)||(r.outfit=Rd[e]||"plate"),Array.isArray(r.marks)||(r.marks=[]),Array.isArray(r.accessories)||(r.accessories=[]),r}var rl={headMinRatio:.34,headMaxRatio:.46,maxBoxes:200,maxWithTexels:520,texel:!0,defaultEye:1315866,outline:"#1b1620",classes:["fighter","rogue","wizard","cleric"],genders:["male","female"]};var r_={fighter:{cloth:3235460,dark:2377067,trim:13674826,boots:4929062,belt:5913896},wizard:{cloth:6107006,dark:4531041,trim:13674826,boots:4929062,belt:5913896,gem:4033512},rogue:{cloth:4156219,dark:2969388,trim:12820556,boots:4929062,belt:6965808,leather:6965808},cleric:{cloth:9056060,dark:6955824,trim:13674826,boots:4929062,belt:5913896,cream:15392707,green:4152127}},Pi=12963024,al=9081498,$c=6965808,Dd=10133667,Zn=15392707,Kc=4152127,a_=10181190,Pd=4857626,o_=16052454,il=1710623,Ld=16777215,l_={0:"rogue",1:"wizard",2:"fighter",5:"cleric"},c_={0:"male",1:"female",2:"male"},h_={fighter:["sword","shield"],rogue:["sword","empty"],wizard:["staff","empty"],cleric:["staff","empty"]},sl={innkeeper:{name:"\u0411\u0440\u0430\u043C",role:"\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A",classId:"fighter",gender:"male",look:{hair:"#6a432c",hairStyle:"short",beard:"none",cloth:"#843f37"},hands:["empty","empty"]},"street-guard":{name:"\u0420\u0430\u0434\u0430",role:"\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430",classId:"fighter",gender:"female",look:{hair:"#6a432c",hairStyle:"braid",cloth:"#315e84"},hands:["sword","shield"]},keeper:{name:"\u042D\u043B\u043B\u0435\u043D",role:"\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430",classId:"cleric",gender:"female",look:{hair:"#c7c4bf",hairStyle:"long",brows:"soft",headgear:"hood"},hands:["empty","empty"],book:!0},novice:{name:"\u041B\u0438\u043D",role:"\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A",classId:"cleric",gender:"male",look:{hair:"#6a432c",hairStyle:"short",brows:"soft",beard:"none",cloth:"#843f37"},hands:["empty","empty"]}},vM=Object.fromEntries(Object.entries(sl).map(([n,e])=>[e.name,n])),jt=n=>typeof n=="number"?n:typeof n=="string"&&/^#[0-9a-f]{6}$/i.test(n)?parseInt(n.slice(1),16):void 0,Vr=(n,e,t)=>tn(n,1-t)+tn(e,t)&16777215;function jc(n,e){let t=e?.gen&&typeof e.gen=="object"?e.gen:null,i=t?null:e?.npc||e?.npcId,r={ellen:"keeper",lin:"novice"}[i]||i||(e&&e.id&&sl[e.id]&&e.type==="npc"?e.id:null);if(r&&!Object.hasOwn(sl,r))throw Error("NPC must be registered: "+r);let s=t||(r?sl[r]:null),a=s?.classId||(rl.classes.includes(e?.classId)?e.classId:l_[n]);if(!a)return null;let o;s?o=nl({...Jc(a,s.gender),...s.look,gender:s.gender},a):e?.appearance?o=nl(e.appearance,a):o=nl({gender:c_[n]||"male"},a);let l=r_[a],c=jt(o.cloth)??l.cloth,u=jt(o.leather)??l.belt,d=jt(o.hair)??4796452;return{classId:a,gender:o.gender,npc:r,outfit:o.outfit,hairStyle:o.hairStyle,ears:o.ears,brows:o.brows,eyes:o.eyes,mouth:o.mouth,beard:o.beard,marks:o.marks,headgear:o.headgear,cape:o.cape,accessories:o.accessories,skin:jt(o.skin)??15318928,hair:d,hair2:jt(o.hair2)??null,brow:jt(o.brow)??tn(d,.85),eye:jt(o.eye)??rl.defaultEye,beardC:jt(o.beardColor)??d,cloth:c,cloth2:jt(o.cloth2)??(c===l.cloth?l.dark:tn(c,.78)),trim:jt(o.trim)??l.trim,leather:u,boots:tn(u,.83),gem:jt(o.gem)??4892912,accent:jt(o.accent)??null,markC:jt(o.markColor)??null,hat:jt(o.hat)??null,capeC:jt(o.capeColor)??tn(c,.86),hands:s?.hands||e?.hands||h_[a],book:!!s?.book,p:l}}function Nd(n,e={}){let t=[],i=(m,f,S,C,M,T,E,A=!1)=>t.push([m,f,S,C,M,T,E,A]),r=n.gender==="female",s=n.classId==="wizard"||n.classId==="cleric",a=r?.29:.41,o=a/2+(r?.055:.08),l=r?.1:.14,c=n.outfit,u=n.classId,d=n.trim,h=n.cloth,p=n.cloth2,_=c==="vest"||c==="scholar"||c==="surplice"?Zn:c==="mail"||c==="tabard"?al:h,x=c==="mail"||c==="tabard"?al:c==="leather"||c==="studded"?n.leather:c==="surplice"?Zn:h;if(s){let m=r?a+.22:a+.06;i(0,.31,0,m,.3,.3,c==="surplice"?Zn:h),i(0,.17,0,m+.02,.045,.32,d);for(let f of[-1,1])i(f*.1,.14,.07,.14,.06,.16,n.boots)}else{for(let m of[-1,1])i(m*.1,.2,.03,.15,.13,.2,n.boots),i(m*.1,.32,.02,.14,.1,.15,p);r&&(i(0,.37,0,.46,.12,.3,p),i(0,.305,0,.48,.028,.32,d))}i(0,.56,0,a,.26,.25,x),i(0,.43,0,a+.02,.05,.27,c==="monk"?13154442:n.leather),i(0,.43,.14,.08,.065,.03,u==="wizard"?n.gem:d);for(let m of[-1,1])i(m*o,.55,0,l,.24,r?.15:.18,_),i(m*o,.4,.02,l-.02,.08,r?.1:.12,n.skin);return i(0,.9,.02,.46,.42,.4,n.skin),f_(i,n),x_(i,n),p_(i,n),n.beard!=="none"&&m_(i,n),g_(i,n),__[u](i,n,a,o,c),n.cape!=="none"&&y_(i,n,a),v_(i,n),M_(i,n,a,o),S_(i,n,o,d),u_(t),(e.texel??rl.texel)&&t.push(...zr(t,d_(n))),t}function u_(n){let t=n.map(()=>Array(6).fill(0));for(let i=0;i<n.length;i++)for(let r=0;r<i;r++){let s=n[r],a=n[i];for(let o=0;o<3;o++)if([0,1,2].filter(l=>l!==o).every(l=>Math.min(s[l]+s[l+3]/2,a[l]+a[l+3]/2)-Math.max(s[l]-s[l+3]/2,a[l]-a[l+3]/2)>1e-8))for(let l of[-1,1]){let c=o*2+(l===1?1:0);Math.abs(s[o]+l*s[o+3]/2-a[o]-l*a[o+3]/2)<1e-8&&(t[i][c]=Math.max(t[i][c],t[r][c]+1))}}n.forEach((i,r)=>{for(let s=0;s<3;s++){let a=t[r][s*2]*5e-4,o=t[r][s*2+1]*5e-4;i[s]+=(o-a)/2,i[s+3]+=o+a}})}function d_(n){let e=[n.hair,n.hair2,n.beardC,n.brow],t=[Pi,al,Dd,n.trim],i=[n.cloth,n.cloth2,n.capeC,n.hat,n.accent,Zn,Kc];return r=>r===n.skin?"skin":e.includes(r)?"hair":t.includes(r)?"metal":i.includes(r)?"cloth":"other"}function f_(n,e){let t=e.eye,i=rl.defaultEye,r=t!==i,s=e.accessories.includes("eyepatch"),a=e.gender==="female",o=a?13130346:a_;for(let u of[-1,1]){if(s&&u===-1)continue;let d=u*.1;switch(e.eyes){case"wide":n(d,.89,.226,.085,.075,.012,t),r&&n(d,.89,.232,.035,.045,.012,i);break;case"narrow":n(d,.885,.226,.08,.04,.012,t);break;case"happy":n(d,.885,.226,.09,.025,.012,t),n(d-.045,.862,.226,.025,.025,.012,t),n(d+.045,.862,.226,.025,.025,.012,t);break;case"sleepy":n(d,.88,.226,.07,.055,.012,t),n(d,.915,.228,.085,.028,.012,tn(e.skin,.82));break;case"sparkle":n(d,.895,.226,.075,.1,.012,t),r&&n(d,.88,.232,.035,.05,.012,i),n(d+.016,.92,.234,.022,.026,.012,Ld);break;case"big":n(d,.885,.226,.09,.11,.012,t),r&&n(d,.875,.232,.04,.055,.012,i),n(d+.018,.915,.234,.03,.03,.012,Ld);break;default:n(d,.89,.226,.06,.085,.012,t)}}if(a)for(let u of[-1,1])s&&u===-1||(n(u*.155,.935,.227,.035,.03,.012,il),e.eyes!=="happy"&&n(u*.1,.942,.227,.09,.014,.012,il)),n(u*.15,.815,.226,.06,.035,.012,Vr(e.skin,15043210,.35));s&&(n(-.1,.89,.232,.13,.11,.014,il),n(0,.985,.226,.47,.022,.014,il));let l=(u,d,h,p)=>n(u,d,.226,h,p,.012,e.brow);for(let u of[-1,1])switch(e.brows){case"soft":l(u*.1,.955,.08,.018);break;case"straight":l(u*.1,.955,.1,.03);break;case"angry":l(u*.075,.94,.06,.03),l(u*.14,.965,.06,.03);break;case"raised":l(u*.1,.99,.09,.028);break;case"thick":l(u*.1,.955,.11,.045);break;case"thin":l(u*.1,.96,.1,.014);break;case"sad":l(u*.075,.965,.06,.025),l(u*.14,.945,.06,.025);break;default:}let c=(u,d,h,p,_=o,x=.236)=>n(u,d+.015,x,h,p,.012,_);switch(e.mouth){case"neutral":c(0,.785,.08,.02);break;case"grin":c(0,.78,.14,.04,Pd),c(0,.796,.12,.016,o_,.238),c(-.075,.8,.022,.022),c(.075,.8,.022,.022);break;case"smirk":c(-.01,.78,.07,.02),c(.05,.79,.04,.02),c(.08,.806,.022,.022);break;case"open":c(0,.775,.06,.05,Pd),c(0,.762,.04,.018,12603482,.238);break;case"cat":c(-.035,.775,.045,.02),c(.035,.775,.045,.02),c(0,.79,.025,.03);break;case"frown":c(0,.78,.08,.02),c(-.05,.765,.022,.022),c(.05,.765,.022,.022);break;default:c(0,.78,a?.105:.09,a?.028:.02),c(-.055,.795,.022,.022),c(.055,.795,.022,.022)}}function p_(n,e){for(let t of[-1,1])e.ears==="small"?n(t*.235,.88,.02,.03,.07,.06,e.skin):e.ears==="pointed"?(n(t*.255,.9,.02,.06,.1,.06,e.skin),n(t*.285,.96,.02,.04,.07,.05,e.skin)):e.ears==="long"?(n(t*.26,.9,.02,.07,.09,.06,e.skin),n(t*.31,.97,.02,.05,.09,.05,e.skin),n(t*.34,1.04,.02,.04,.07,.05,e.skin)):n(t*.24,.88,.02,.04,.09,.07,e.skin)}function m_(n,e){let t=e.beardC,i=Vr(e.skin,t,.3),r=()=>{n(0,.75,.205,.34,.15,.05,t);for(let a of[-1,1])n(a*.17,.83,.2,.05,.2,.05,t)},s=()=>{for(let a of[-1,1])n(a*.21,.8,.12,.05,.26,.2,t);n(0,.818,.238,.18,.03,.04,t)};switch(e.beard){case"stubble":n(0,.745,.221,.42,.1,.012,i),n(0,.815,.221,.3,.035,.012,i);break;case"mustache":n(0,.818,.238,.2,.04,.04,t);for(let a of[-1,1])n(a*.115,.8,.236,.04,.05,.04,t);break;case"goatee":n(0,.74,.228,.1,.12,.04,t),n(0,.818,.238,.14,.03,.04,t);break;case"short":r();break;case"full":r(),s();break;case"long":r(),s(),n(0,.6,.2,.3,.2,.07,t),n(0,.48,.2,.2,.14,.06,t);break;case"sideburns":for(let a of[-1,1])n(a*.225,.88,.19,.04,.22,.07,t),n(a*.2,.82,.2,.05,.1,.05,t);break;default:}}function g_(n,e){let t=l=>e.marks.includes(l),s=(l,c,u,d=.03,h=.03)=>n(l,c,.229,d,h,.012,u),a=e.markC??Vr(e.skin,11878463,.55),o=Vr(e.skin,16777215,.38);if(t("freckles"))for(let l of[-1,1])for(let[c,u]of[[.08,.835],[.125,.84],[.105,.815],[.15,.82]])s(l*c,u,10119750,.02,.02);if(t("blush"))for(let l of[-1,1])n(l*.15,.812,.229,.07,.04,.012,14715514);if(t("scar"))for(let[l,c]of[[-.178,.812],[-.158,.784],[-.138,.756],[-.118,.728]])s(l+.024,c,o,.014,.03),s(l,c,a);if(t("browscar")){for(let[l,c]of[[-.13,1.03],[-.122,1],[-.114,.97]])s(l+.022,c,o,.012,.03),s(l,c,a,.026,.03);s(-.152,.985,a,.026,.014),s(-.1,.985,a,.026,.014)}if(t("mole")&&s(.075,.775,4861733,.022,.022),t("warpaint")){let l=e.markC??11546429;for(let c of[-1,1])for(let u of[0,.045])for(let d=0;d<3;d++)s(c*(.175-u-d*.022),.812-d*.03,l,.034,.03)}t("plaster")&&(n(0,.835,.229,.072,.03,.012,15787212),n(0,.835,.23,.032,.075,.012,15787212),n(0,.835,.232,.018,.018,.012,Vr(15787212,11901546,.5)))}function x_(n,e){let t=e.hair,i=e.hair2||t,r=e.hairStyle,s=e.headgear;if(r==="bald"||s==="hood")return;let a=[],o=[],l=[],c=(x,m,f,S,C,M,T,E=t)=>x.push([m,f,S,C,M,T,E]),u=()=>c(a,0,1.13,0,.5,.1,.46),d=()=>{c(o,0,1.06,.21,.48,.07,.06);for(let x of[-1,1])c(o,x*.2,1,.21,.08,.12,.06)},h=(x=.24,m=.98)=>{for(let f of[-1,1])c(l,f*.26,m,0,.05,x,.42)},p=-.255;switch(r){case"buzz":c(a,0,1.125,0,.48,.07,.43),c(o,0,1.07,.205,.46,.07,.04);for(let x of[-1,1])c(l,x*.245,.99,0,.02,.16,.38);p=-.2;break;case"short":u(),d(),h(),c(l,0,.93,-.22,.5,.38,.07),c(a,-.1,1.2,.02,.16,.08,.22),c(a,.12,1.21,-.06,.16,.1,.16),c(a,0,1.19,.13,.2,.05,.1);break;case"spiky":u(),d(),h(.2,1),c(l,0,.95,-.22,.5,.32,.07);for(let[x,m,f,S,C]of[[-.18,1.2,.06,.1,.14],[-.06,1.23,.08,.1,.2],[.06,1.23,0,.1,.2],[.18,1.2,-.04,.1,.14],[0,1.2,-.14,.12,.14]])c(a,x,m,f,S,C,.1);break;case"mohawk":c(a,0,1.22,0,.12,.22,.42),c(a,0,1.35,-.05,.12,.08,.26),c(a,0,1.12,0,.3,.04,.44),c(l,0,.98,-.2,.12,.3,.05);for(let x of[-1,1])c(l,x*.245,1.02,0,.02,.1,.36,tn(t,.6));p=-.225;break;case"sweep":u(),h(),c(l,0,.93,-.22,.5,.38,.07),c(a,-.05,1.19,0,.34,.07,.3),c(o,.12,1.1,.22,.2,.06,.05),c(o,0,1.06,.22,.2,.06,.05),c(o,-.12,1.02,.22,.2,.06,.05),c(o,-.2,.95,.22,.07,.12,.05);break;case"bob":u(),c(o,0,1.04,.215,.48,.1,.05);for(let x of[-1,1])c(l,x*.27,.84,0,.07,.34,.42);c(l,0,.85,-.22,.58,.4,.1),p=-.272;break;case"long":u(),d();for(let x of[-1,1])c(l,x*.27,.8,0,.07,.5,.38);c(l,0,.76,-.24,.54,.64,.1),c(a,0,1.2,-.02,.3,.08,.3),p=-.292;break;case"wavy":c(a,0,1.14,0,.54,.12,.5),c(a,0,1.22,-.02,.38,.06,.34),c(o,-.12,1.05,.215,.26,.08,.05),c(o,.14,1.07,.215,.2,.06,.05),c(o,.24,.97,.2,.05,.14,.05);for(let x of[-1,1])c(l,x*.29,.8,0,.08,.5,.4),c(l,x*.31,.56,.02,.07,.16,.34);c(l,0,.72,-.25,.62,.76,.12),p=-.312;break;case"ponytail":u(),d(),h(.2,1),c(l,0,.95,-.22,.5,.3,.07),c(a,0,1.17,-.17,.14,.1,.1,e.trim),c(a,0,1.22,-.26,.16,.16,.14),c(a,0,1.05,-.31,.16,.38,.12),c(a,0,.83,-.31,.12,.14,.1,i),p=-.32;break;case"bun":u(),d(),h(),c(l,0,.93,-.22,.5,.34,.07),c(a,0,1.24,-.02,.2,.12,.2),c(a,0,1.33,-.02,.14,.08,.14),c(a,0,1.19,-.02,.22,.03,.22,e.trim);break;case"twin":u(),d(),h(.2,1),c(l,0,.95,-.21,.5,.3,.06);for(let x of[-1,1])c(l,x*.3,.96,-.04,.1,.5,.14),c(l,x*.3,.66,-.04,.1,.1,.14,i),c(l,x*.28,1.1,-.04,.12,.05,.14,e.trim);break;case"braid":u(),d(),h(.2,1),c(l,0,.93,-.22,.5,.4,.07),c(l,.22,.88,.12,.1,.12,.1),c(l,.22,.76,.14,.09,.1,.1),c(l,.22,.64,.16,.1,.1,.1),c(l,.22,.55,.17,.09,.08,.09,i),c(l,.22,.5,.18,.1,.04,.1,e.trim);break;case"curly":c(a,0,1.2,0,.62,.28,.56);for(let x of[-1,1])c(l,x*.31,1.04,0,.1,.3,.5),c(o,x*.16,1.07,.23,.14,.08,.06);c(l,0,1,-.27,.6,.4,.12),p=-.332;break;default:u(),d(),h(),c(l,0,.93,-.22,.5,.38,.07)}if(e.hair2&&r!=="buzz"&&(o.push([-.14,.985,.223,.06,.2,.04,e.hair2]),l.push([.12,.93,p,.1,.3,.02,e.hair2])),e.gender==="female"&&!["buzz","mohawk"].includes(r))for(let x of[-1,1])c(o,x*.235,.86,.2,.055,.27,.06);let _=s==="helm"?["top","front"]:s==="wizhat"||s==="cap"?["top"]:[];for(let[x,m]of[["top",a],["front",o],["low",l]])if(!_.includes(x))for(let f of m)n(f[0],f[1],f[2],f[3],f[4],f[5],f[6])}var __={fighter(n,e,t,i,r){let{trim:s}=e,a=(o,l)=>{for(let c of[-1,1])n(c*i,.7,0,o,.07,.2,s),n(c*i,.66,0,o,l,.18,e.cloth2)};if(r==="plate"){a(.17,.08);for(let o of[-1,1])n(o*.07,.62,.13,.03,.15,.012,s);n(0,.685,.13,.16,.03,.012,s),n(0,.71,-.02,t+.02,.03,.27,s)}if(r==="tabard"&&(n(0,.4,.135,.22,.4,.012,e.cloth),n(0,.53,.145,.03,.15,.012,s),n(0,.56,.145,.11,.03,.012,s),n(0,.21,.136,.22,.03,.012,s),n(0,.71,0,t+.02,.03,.27,s)),r==="leather"){n(0,.56,.13,t-.06,.25,.012,e.cloth),n(0,.56,.136,.02,.25,.012,tn(e.leather,.6));for(let o of[-1,1])n(o*i,.66,0,.15,.06,.19,e.cloth),n(o*.12,.56,.14,.05,.05,.012,s);n(0,.71,0,t+.02,.03,.27,s)}r==="knight"&&(a(.2,.12),n(0,.72,0,t-.02,.06,.29,Pi),n(0,.6,.13,t-.04,.2,.012,Pi),n(0,.6,.14,.03,.16,.012,s),n(0,.63,.14,.12,.03,.012,s),n(0,.385,.1,t+.02,.08,.29,Pi),n(0,.35,.1,t+.02,.02,.29,s))},wizard(n,e,t,i,r){let{trim:s}=e;for(let a of[-1,1])n(a*i,.47,0,.14,.04,.19,s);if(r==="robe"){for(let a of[-1,1])n(a*.1,.57,.128,.045,.24,.012,s);n(0,.71,0,t+.02,.04,.27,s),n(0,.5,.128,.03,.1,.012,s)}if(r==="mantle"&&(n(0,.72,0,t+.13,.09,.31,e.cloth2),n(0,.665,0,t+.15,.025,.33,s),n(0,.78,-.1,.3,.12,.08,e.cloth2),n(0,.72,.16,.05,.05,.02,e.gem)),r==="sash"){let a=e.accent??e.cloth2;for(let o=0;o<5;o++)n(-.12+o*.06,.68-o*.055,.13,.09,.07,.012,a);n(0,.45,0,t+.04,.1,.27,a),n(.09,.34,.14,.06,.12,.02,a),n(-.02,.33,.14,.06,.1,.02,a)}r==="scholar"&&(n(0,.56,.13,t-.1,.25,.012,e.cloth2),n(0,.64,.14,.1,.1,.012,Zn),n(0,.6,.145,.02,.2,.012,s),n(.19,.33,.12,.12,.12,.07,e.leather),n(.19,.385,.12,.13,.03,.075,s))},rogue(n,e,t,i,r){let{trim:s,leather:a}=e;if(r==="leathers"){for(let o=0;o<5;o++)n(-.12+o*.06,.67-o*.06,.13,.075,.06,.02,a);n(.18,.33,.12,.12,.12,.07,a),n(.18,.385,.12,.13,.03,.075,s)}if(r==="vest"){n(0,.56,.128,.06,.24,.012,Zn);for(let o of[-1,1])n(o*.1,.56,.13,.1,.25,.012,a);for(let o=0;o<3;o++)n(0,.64-o*.07,.14,.09,.015,.012,s)}if(r==="tunic"&&(n(0,.36,0,t+.02,.2,.28,e.cloth),n(0,.255,0,t+.04,.025,.3,s),n(0,.43,0,t+.03,.05,.29,a),n(0,.43,.15,.08,.065,.03,s),n(.14,.3,.15,.09,.09,.02,e.cloth2)),r==="studded"){for(let o=0;o<2;o++)for(let l=0;l<3;l++)n(-.1+l*.1,.64-o*.1,.135,.035,.035,.02,Pi);n(-.2,.71,0,.17,.07,.2,a),n(-.2,.74,0,.12,.03,.15,s),n(.18,.33,.12,.12,.12,.07,a)}},cleric(n,e,t,i,r){let{trim:s}=e;if(r==="vestments"){n(0,.5,.128,.15,.36,.012,Kc),n(0,.66,.12,t-.02,.06,.26,Zn);for(let a of[-1,1])n(a*.13,.55,.13,.08,.26,.012,Zn),n(a*i,.43,0,.14,.04,.19,Zn);n(0,.59,.142,.03,.13,.012,s),n(0,.615,.142,.095,.03,.012,s),n(0,.3,.16,.24,.24,.012,Kc),n(0,.3,.17,.03,.1,.012,s)}if(r==="surplice"){for(let a of[-1,1])n(a*.09,.5,.13,.04,.38,.012,e.cloth2),n(a*i,.43,0,.14,.04,.19,e.cloth2);n(0,.66,.12,t-.02,.05,.26,e.cloth2),n(0,.59,.142,.03,.13,.012,s),n(0,.615,.142,.095,.03,.012,s),n(0,.17,0,t+.13,.03,.33,e.cloth2)}if(r==="mail"){for(let a=0;a<4;a++)for(let o=0;o<4;o++)(a+o)%2===0&&n(-.12+o*.08,.66-a*.06,.13,.05,.03,.012,Pi);n(0,.69,0,t,.05,.27,tn(al,1.15)),n(0,.36,.135,.22,.34,.012,e.cloth),n(0,.45,.145,.03,.14,.012,s),n(0,.48,.145,.1,.03,.012,s);for(let a of[-1,1])n(a*i,.43,0,.14,.04,.19,s)}if(r==="monk"){n(0,.66,0,t-.02,.05,.26,e.cloth2),n(.06,.31,.145,.04,.18,.03,13154442),n(.06,.2,.145,.06,.04,.04,13154442);for(let a=0;a<4;a++)n(-.1+a*.028,.6-Math.abs(a-1.5)*.02,.14,.03,.03,.012,$c);for(let a of[-1,1])n(a*i,.43,0,.14,.04,.19,e.cloth2)}}};function y_(n,e,t){let i=e.capeC,r=e.trim;if(e.cape==="short"&&(n(0,.72,0,t+.13,.09,.32,i),n(0,.56,-.17,t+.02,.42,.06,i)),e.cape==="long"){n(0,.72,0,t+.13,.09,.32,i),n(0,.42,-.18,t+.06,.66,.06,i),n(0,.095,-.18,t+.06,.03,.06,r);for(let s of[-1,1])n(s*(t/2+.05),.55,-.06,.05,.3,.2,i)}e.cape==="mantle"&&(n(0,.72,0,t+.17,.1,.34,i),n(0,.64,0,t+.19,.06,.32,i),n(0,.605,0,t+.2,.02,.33,r),n(0,.71,.17,.05,.05,.02,r),n(0,.62,-.18,t+.04,.25,.05,i))}function v_(n,e){let t=e.headgear,i=e.trim,r=e.hat;if(t==="hood"){let s=r??(e.classId==="cleric"?Zn:e.cloth),a=e.classId==="cleric"&&!r?e.cloth:e.trim;n(0,1.14,0,.56,.1,.5,s),n(0,1.185,0,.56,.03,.5,a),n(0,.92,-.24,.56,.56,.1,s),n(0,.98,-.295,.3,.4,.02,a);for(let o of[-1,1])n(o*.29,.9,-.02,.07,.5,.42,s),n(o*.3,1,0,.02,.06,.42,a);if(n(0,1.05,.21,.46,.06,.05,s),e.hairStyle!=="bald"){n(0,1,.205,.46,.07,.06,e.hair);for(let o of[-1,1])n(o*.2,.93,.205,.08,.14,.06,e.hair);e.hair2&&n(-.14,.96,.223,.06,.14,.04,e.hair2)}}if(t==="wizhat"){let s=r??e.cloth;n(0,1.12,0,.74,.05,.7,s),n(0,1.2,0,.46,.12,.44,s),n(0,1.31,-.02,.34,.1,.32,s),n(0,1.41,-.05,.22,.1,.2,s),n(.02,1.5,-.09,.12,.1,.12,s),n(0,1.15,0,.5,.04,.48,i)}if(t==="helm"){let s=r??Pi;n(0,1.13,0,.54,.14,.5,s);for(let a of[-1,1])n(a*.265,.99,0,.04,.3,.44,s);n(0,.96,.235,.05,.2,.02,s),n(0,.95,-.235,.5,.3,.05,s),n(0,1.065,0,.545,.025,.505,i),n(0,1.24,0,.06,.1,.3,i)}if(t==="circlet"&&(n(0,1.085,0,.5,.03,.52,r??i),n(0,1.105,.262,.05,.07,.02,e.gem,!0),n(0,1.085,.262,.09,.02,.02,r??i)),t==="headband"){let s=r??e.accent??e.cloth2;n(0,1.05,0,.5,.05,.52,s),n(.26,1.05,-.04,.06,.1,.12,s),n(.285,.97,-.1,.04,.14,.06,s),n(.285,.91,-.12,.04,.08,.05,s)}if(t==="cap"){let s=r??e.cloth2;n(0,1.15,0,.52,.12,.48,s),n(0,1.09,.25,.5,.035,.12,tn(s,.8)),n(.2,1.23,-.05,.04,.18,.06,i),n(.22,1.33,-.07,.04,.1,.05,tn(i,.85))}if(t==="crown"){n(0,1.15,0,.5,.07,.46,r??i);for(let[s,a]of[[-.2,.06],[-.1,.09],[0,.06],[.1,.09],[.2,.06]])n(s,1.185+a/2,0,.07,a,.08,r??i);n(0,1.15,.232,.05,.05,.02,e.gem,!0)}}function M_(n,e,t,i){let r=a=>e.accessories.includes(a),s=e.trim;if(r("earring")&&n(.245,.81,.03,.03,.07,.035,s),r("glasses")){for(let a of[-1,1]){let o=a*.1;n(o,.96,.238,.15,.02,.014,s),n(o,.82,.238,.15,.02,.014,s),n(o-.07,.89,.238,.02,.14,.014,s),n(o+.07,.89,.238,.02,.14,.014,s),n(a*.245,.9,.03,.02,.02,.34,s)}n(0,.9,.238,.05,.02,.014,s)}if(r("scarf")){let a=e.accent??e.cloth2;n(0,.7,0,t+.04,.07,.3,a),n(.1,.58,.15,.1,.22,.03,a),n(.1,.46,.15,.1,.03,.03,s)}if(r("amulet")&&(n(0,.64,.135,.16,.02,.012,s),n(0,.5,.145,.05,.06,.02,e.gem,!0),n(0,.56,.14,.02,.12,.012,s)),r("bracers"))for(let a of[-1,1])n(a*i,.47,0,.145,.08,.195,e.leather),n(a*i,.515,0,.15,.02,.2,s)}function S_(n,e,t,i){let{classId:r,hands:s}=e,a=o=>s.includes(o);if(a("sword")&&(n(-.34,.38,.09,.055,.1,.055,e.leather),n(-.34,.45,.09,.17,.035,.075,i),n(-.34,.72,.09,.05,.5,.04,Pi)),a("shield")){let o=r==="fighter"?e.cloth:e.p.cloth;n(.33,.5,.17,.27,.38,.05,i),n(.33,.5,.2,.21,.32,.03,o),n(.33,.5,.222,.03,.18,.02,i),n(.33,.53,.222,.13,.03,.02,i)}if(a("bow")){for(let o=0;o<5;o++)n(-.34-Math.abs(o-2)*-.02,.36+o*.12,.1,.06,.16,.05,10648640);n(-.4,.6,.1,.02,.6,.02,12957841)}a("staff")&&r==="wizard"&&(n(-.36,.62,.08,.05,.9,.05,$c),n(-.36,1.1,.08,.13,.06,.13,i),n(-.36,1.2,.08,.09,.13,.09,e.gem,!0)),a("staff")&&r!=="wizard"&&(n(-.34,.58,.09,.05,.82,.05,$c),n(-.34,1.04,.09,.15,.15,.15,Dd),n(-.34,1.04,.09,.19,.04,.19,i),n(-.34,1.04,.09,.04,.19,.19,i)),e.book&&n(-.3,.45,.13,.13,.16,.045,8007471)}var Mt=document.getElementById("viewport"),Nn=document.createElement("canvas");Nn.id="voxel-canvas";Nn.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430: \u0434\u0432\u0438\u0433\u0430\u0439\u0442\u0435 \u043E\u0434\u043D\u0438\u043C \u043F\u0430\u043B\u044C\u0446\u0435\u043C, \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0439\u0442\u0435 \u0434\u0432\u0443\u043C\u044F");Mt.prepend(Nn);var Nt=document.createElement("div");Nt.setAttribute("role","group");Nt.tabIndex=-1;Nt.onclick=n=>{n.stopPropagation();let e=window.objectPrompt,t=n.target.closest("button[data-action]"),i=t&&e?.actions?.find(r=>r.id===t.dataset.action);i?.enabled&&(Ce.dismissMapActions(),i.run?.())};Nt.addEventListener("pointerdown",n=>n.stopPropagation());Nt.addEventListener("keydown",n=>{n.key==="Escape"&&Ce.mapTap(null)});Nt.className="object-prompt";Nt.hidden=!0;Mt.append(Nt);var pt;try{pt=new kr({canvas:Nn,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(n){throw Nn.remove(),Mt.insertAdjacentHTML("afterbegin",'<p class="webgl-note">\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u0441\u0446\u0435\u043D\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u043B\u043E\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C.</p>'),n}pt.setPixelRatio(Math.min(window.devicePixelRatio||1,1));pt.shadowMap.enabled=!0;pt.shadowMap.type=Wi;pt.outputColorSpace=Ct;pt.toneMapping=Fs;pt.toneMappingExposure=1.25;var Un=new Tn;Un.background=new Le("#0b1919");var Wt=new cn(-4,4,6,-6,.1,80),Dn=new Ke,Hr=new Ke,Ws=new Ke;Un.add(Dn,Hr,Ws);var fl=new Tn,Ud=new An({color:16777215,toneMapped:!1,side:gn}),Xs=new Gt(390,520,{depthBuffer:!0}),$i=[];fl.background=new Le(0);var Ys=null,nh="",ci=null,ol,Fd,Od,Gd=new Tn,b_=new cn(-1,1,1,-1,0,2),yl=new Jt({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{mask:{value:Xs.texture},texel:{value:new Oe(1/390,1/520)},gold:{value:new Le(16764534)}},vertexShader:"varying vec2 uvMask;void main(){uvMask=uv;gl_Position=vec4(position.xy,0.0,1.0);}",fragmentShader:"uniform sampler2D mask;uniform vec2 texel;uniform vec3 gold;varying vec2 uvMask;void main(){float center=texture2D(mask,uvMask).r;float edge=0.0;for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){edge=max(edge,texture2D(mask,uvMask+vec2(float(x),float(y))*texel).r);}}float alpha=step(0.4,edge)*(1.0-step(0.4,center));gl_FragColor=vec4(gold,alpha*0.95);}"});Gd.add(new je(new Rn(2,2),yl));function Hd(n){let e=n?.userData.hinge||n||null;if(e!==Ys){for(let t of $i)fl.remove(t),t.isInstancedMesh&&t.dispose();$i.length=0,Ys=e,nh="",e&&(e.updateWorldMatrix(!0,!0),e.traverse(t=>{if(!t.isMesh||t.userData.contactShadow)return;for(let r=t;r&&r!==e.parent;r=r.parent)if(!r.visible)return;let i;if(t.isInstancedMesh){i=new on(t.geometry,Ud,t.count);for(let r=0;r<t.count;r++){let s=new We;t.getMatrixAt(r,s),i.setMatrixAt(r,s)}}else i=new je(t.geometry,Ud);i.matrixAutoUpdate=!1,i.userData.source=t,fl.add(i),$i.push(i)}))}}var Wd=new ri(12507101,3159078,.38);Un.add(Wd);var ah=new oi(11912909,.5);ah.position.set(3,10,5);Un.add(ah);var pl=document.createElement("canvas");pl.width=pl.height=64;var oh=pl.getContext("2d"),vl=oh.createRadialGradient(32,32,5,32,32,31);vl.addColorStop(0,"rgba(12,18,20,.24)");vl.addColorStop(.55,"rgba(12,18,20,.12)");vl.addColorStop(1,"rgba(12,18,20,0)");oh.fillStyle=vl;oh.fillRect(0,0,64,64);var w_=new Hn(pl),T_=new An({map:w_,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});function ih(n,e=.78,t=.65){let i=new je(new Rn(e,t),T_);i.rotation.x=-Math.PI/2,i.position.y=.012,i.userData.contactShadow=!0,n.add(i)}var Zs=new pn(1,1,1),Qc=new Map,ht=new Map,Js=new Map,Ji=[],qs=[],Bd=new Map;pt.shadowMap.autoUpdate=!1;var Ce,Xd="";var Ut=5.2,Jn={x:5.5,z:9.5},Wr=!1,ll=0;var hi;var Di=(n,e=!1)=>{let t=n+":"+e;return Qc.has(t)||Qc.set(t,e?new An({color:n,toneMapped:!1}):new mn({color:n,roughness:.92,metalness:n===12820556?.35:0})),Qc.get(t)};function $s(n,e,t,i,r,s,a,o,l=!1){let c=new je(Zs,Di(o,l));return c.position.set(e,t,i),c.scale.set(r,s,a),c.castShadow=!l,c.receiveShadow=!l,n.add(c),c}function Ot(n){for(let i of n.children.filter(r=>r.isGroup))Ot(i);let e=n.children.filter(i=>i.isMesh&&!i.isInstancedMesh&&i.userData.decal);if(e.length){let i=new mn({color:16777215,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),r=new on(Zs,i,e.length);r.frustumCulled=!1,r.userData.disposeMaterial=!0,e.forEach((s,a)=>{s.updateMatrix(),r.setMatrixAt(a,s.matrix),r.setColorAt(a,s.material.color),n.remove(s)}),r.userData.decal=!0,r.castShadow=!1,r.receiveShadow=!0,r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0,n.add(r)}let t=new Map;for(let i of n.children.filter(r=>r.isMesh&&!r.isInstancedMesh&&!r.userData.decal&&r.geometry===Zs)){let r=i.material.uuid+":"+i.castShadow+":"+i.receiveShadow;t.has(r)||t.set(r,[]),t.get(r).push(i)}for(let i of t.values()){if(i.length<2)continue;let r=new on(Zs,i[0].material,i.length);i.forEach((s,a)=>{s.updateMatrix(),r.setMatrixAt(a,s.matrix),n.remove(s)}),r.castShadow=i[0].castShadow,r.receiveShadow=i[0].receiveShadow,n.add(r)}return n}var ul=n=>new Le(n).getHex();function qd(n){let e=n>>16&255,t=n>>8&255,i=n&255;return[12820556,3752007,4278346,12109511,11782341,10203059,11581626,5524279].includes(n)?"metal":[7878449,7880250,8010038,8735040,5666672,8797013,11620717,6895950].includes(n)?"cloth":Math.abs(e-t)<18&&Math.abs(t-i)<18?"metal":"other"}function ml(n,e){let t=$s(n,...e.slice(0,8));return t.userData.decal=!0,t.castShadow=!1,t.userData.decalFace=e[8],t}function N(n,e,t,i,r,s,a,o,l=!1){let c=$s(n,e,t,i,r,s,a,o,l),u=[e,t,i,r,s,a,ul(o),l];for(let d of zr([u],qd,Ri.size,{minDepth:.008}))ml(n,d);return c}var eh=new Map,th=new Map;function Ki(n,e=8){if(!eh.has(e)){let i=document.createElement("canvas");i.width=i.height=e;let r=i.getContext("2d");for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a===0||o===0?255:a===e-1||o===e-1?218:(o*31+a*17)%11===0?232:248;r.fillStyle=`rgb(${l},${l},${l})`,r.fillRect(o,a,1,1)}let s=new Hn(i);s.colorSpace=Ct,s.magFilter=s.minFilter=vt,s.generateMipmaps=!1,eh.set(e,s)}let t=n+":"+e;return th.has(t)||th.set(t,new mn({color:n,map:eh.get(e),roughness:1})),th.get(t)}function Ml(n){return n.traverse(e=>{e.isMesh&&(e.castShadow=!1,e.receiveShadow=!1)}),n}function E_(n){let e=new je(new Cn(.38,.4,.1,24),Di(3749436));e.position.y=.08,e.castShadow=!0,e.receiveShadow=!0,n.add(e);let t=new je(new Cn(.395,.4,.035,24),Di(5262419));t.position.y=.035,n.add(t)}function A_(n,e){if(["chest","crate"].includes(e.type)){let r=e.type==="chest"?.263:.305;for(let s of[-.15,0,.15])N(n,s,.27,r,.012,.29,.007,6899502);if(e.type==="chest"){N(n,0,.33,.278,.03,.04,.015,3752007);for(let s of[-.24,.24])for(let a of[.14,.43])N(n,s,a,.263,.018,.018,.02,12820556);for(let s of[-.12,.04,.16])N(n,0,.553,s,.52,.009,.012,6899502)}}if(e.type==="barrel"){for(let r=0;r<12;r++){let s=r*Math.PI/6,a=$s(n,Math.sin(s)*.259,.285,Math.cos(s)*.259,.011,.5,.012,6899502);a.rotation.y=s}for(let r of[-.12,0,.12])N(n,r,.571,0,.009,.008,.33,6899502)}if(e.type==="books")for(let r=0;r<3;r++)for(let s=0;s<5;s++){let a=-.25+s*.12,o=.4+r*.38;for(let l of[-.075,.075])N(n,a,o+l,.233,.065,.016,.012,12820556);(s===1||s===4)&&N(n,a,o,.239,.038,.035,.009,13482893)}if(e.type==="desk"){for(let r of[-.21,-.06,.1,.23])N(n,0,.666,r,.76,.007,.01,6899502);N(n,.1,.71,.07,.011,.014,.23,8088650);for(let r=0;r<3;r++)for(let s of[-.02,.18])N(n,s,.709,-.004+r*.053,.06,.009,.008,8088650);N(n,.3,.713,-.2,.055,.1,.055,3752007),N(n,.27,.76,-.2,.015,.16,.015,13482893)}if(e.type==="door"||e.type==="portal"){let r=n.userData.hinge;for(let s of[.1,.21,.33,.44])N(r,s,.51,.056,.01,.89,.011,6899502);N(r,.28,.74,.06,.54,.055,.024,3752007);for(let s of[.08,.49])for(let a of[.38,.74])N(r,s,a,.084,.025,.025,.02,12820556)}if(e.type==="cover"){for(let r of[-.21,.21])N(n,r,.483,0,.018,.008,.29,5859403);N(n,0,.483,-.14,.42,.008,.015,5859403)}if(e.type==="chair"){for(let r of[-.14,.14])N(n,r,.81,-.144,.014,.14,.012,6899502);N(n,0,.49,0,.3,.012,.013,9125164)}if(e.type==="banner"){for(let r of[-.23,.23])N(n,r,.58,.043,.015,.54,.01,12820556);N(n,0,.29,.043,.48,.015,.01,12820556)}}function qr(n,e,t={}){let i=new Ke;t.base!==!1&&E_(i);let r=n!==3&&n!==4?jc(n,e):null;if(r){i.userData.characterStyle=r;let s;if(t.articulated){s={};for(let[a,o]of Object.entries({head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]})){let l=new Ke;l.position.set(...o),i.add(l),s[a]=l}i.userData.rig=s}for(let a of Nd(r,{texel:t.texel??window.Characters?.RULES.texel})){let o=[...a],l=i;if(s){let[c,u]=o,d=Math.abs(c)>.29||Math.abs(c)>.19&&u<.74?c<0?"armL":"armR":u>=.74?"head":u<.4?c<0?"legL":"legR":"torso";l=s[d],o[0]-=l.position.x,o[1]-=l.position.y,o[2]-=l.position.z}o.length>8?ml(l,o):$s(l,...o)}}else{let{profile:s,parts:a}=Ed(e||{},n);i.userData.characterStyle=s;let o=[];for(let d of a){let h=$s(i,d.x,d.y,d.z,d.w,d.h,d.d,d.color);h.rotation.z=d.rz,d.rz||o.push([d.x,d.y,d.z,d.w,d.h,d.d,ul(d.color),!1])}let l=ul(s.skin),c=ul(s.cloth),u=d=>n===3&&d===l?"skin":n===4&&d===c?"other":qd(d);for(let d of zr(o,u))ml(i,d)}return Ot(i)}function Sl(){let n=new Ke;N(n,0,.23,0,.05,.43,.05,5585186),N(n,0,.44,0,.09,.08,.09,5391923);let e=[];for(let t=0;t<3;t++){let i=N(n,0,.51+t*.085,0,.095-t*.025,.12,.085-t*.025,[15038244,16758855,16768133][t],!0);i.userData.rest=i.position.clone(),e.push(i)}return n.userData.flames=e,Ml(n)}function Yd(){let n=new Ke,e=[],t=new je(new Ls(.38,.028,6,24),Di(5524279));t.rotation.x=Math.PI/2,t.position.y=1.58,n.add(t);for(let i=0;i<6;i++){let r=i*Math.PI/3,s=Math.cos(r)*.38,a=Math.sin(r)*.38;N(n,s,1.68,a,.055,.19,.055,14534033);let o=N(n,s,1.83,a,.045,.1,.045,16764792,!0);o.userData.rest=o.position.clone(),e.push(o)}return n.userData.flames=e,Ml(n),n.traverse(i=>{i.isMesh&&(i.userData.disposeMaterial=!0,i.material=new An({color:i.material.color.clone(),transparent:!0,depthWrite:!1,toneMapped:!1}))}),n}function kd(n,e=!1){n.castShadow=e,n.shadow.autoUpdate=!1,n.shadow.needsUpdate=e,n.shadow.mapSize.set(128,128),n.shadow.radius=1.8,n.shadow.bias=-.001,n.shadow.normalBias=.035,n.shadow.camera.near=.06,n.shadow.camera.far=12}function C_(n){let e=new Ke,t=7886126,i=12820556,r=13352345,s=10203059;if(n===40)N(e,0,.55,0,.58,.69,.15,6895950),N(e,.02,.55,.09,.49,.58,.035,r),N(e,-.26,.55,.11,.07,.69,.04,8408420),N(e,.14,.51,.13,.11,.13,.025,i);else if(n===41){let a=new je(new Ps(.24),Di(6530741));a.position.y=.75,e.add(a),N(e,0,.4,0,.13,.22,.13,i),N(e,0,.28,0,.34,.08,.29,t)}else if(n===42){N(e,0,.55,0,.57,.58,.25,7953470),N(e,0,.87,0,.48,.09,.28,9795409),N(e,0,.46,.15,.35,.23,.07,10453079);for(let a of[-.18,.18])N(e,a,.64,.15,.045,.5,.035,5192232),N(e,a,.67,.18,.07,.08,.025,i);N(e,0,.96,0,.23,.055,.08,t)}else if(n===43){N(e,-.15,.43,0,.28,.27,.25,3229524),N(e,-.15,.62,0,.16,.1,.15,s),N(e,.18,.58,0,.035,.61,.035,t);for(let a=0;a<5;a++)N(e,.18+a*.022,.75+a*.045,0,.08,.08,.035,r)}else if(n===44)N(e,0,.4,0,.57,.2,.36,r),N(e,.02,.59,0,.41,.16,.29,10056013),N(e,-.15,.74,.06,.2,.1,.12,12752737),N(e,.19,.72,0,.1,.15,.12,7685938),N(e,0,.41,.19,.06,.23,.025,t);else if(n===45)N(e,0,.62,0,.59,.58,.1,s),N(e,0,.38,0,.39,.18,.1,s),N(e,0,.6,.065,.48,.48,.03,4745336),N(e,0,.6,.095,.06,.5,.025,i),N(e,0,.6,.095,.42,.06,.025,i);else if(n===46){N(e,0,.63,0,.48,.53,.14,s);for(let a of[-.32,.32])N(e,a,.81,0,.19,.17,.18,s);N(e,0,.34,0,.53,.1,.18,t);for(let a=0;a<5;a++)for(let o=0;o<4;o++)N(e,-.18+o*.12,.43+a*.09,.085,.04,.026,.012,12634562)}else if(n===47){for(let a=0;a<4;a++){let o=new je(new Ls(.23,.035,4,16),Ki(12558699));o.position.set(0,.58,(a-1.5)*.055),e.add(o)}N(e,.22,.32,0,.04,.25,.04,12558699)}else if(n===48){N(e,0,.38,0,.54,.23,.17,t);for(let a=0;a<4;a++)N(e,-.18+a*.12,.62,.02,.025,.39,.025,s),N(e,-.15+a*.12,.81,.02,.08,.025,.025,s)}else if(n===49){N(e,0,.57,0,.59,.29,.25,6518117),N(e,0,.55,.15,.58,.2,.04,8557956);for(let a of[-.18,.18])N(e,a,.57,0,.035,.32,.29,t)}else if(n===50)N(e,0,.47,0,.56,.24,.25,t),N(e,-.12,.64,0,.24,.08,.16,s),N(e,.15,.63,0,.16,.13,.17,6252658),N(e,0,.34,.15,.38,.05,.035,i);else if(n===51)N(e,0,.48,0,.065,.7,.065,t),N(e,0,.88,0,.3,.24,.25,s),N(e,0,1.03,0,.09,.06,.09,i);else if(n===52)N(e,0,.6,0,.09,.64,.07,i),N(e,0,.73,0,.41,.085,.07,i),N(e,0,.29,0,.27,.08,.15,t);else if(n===53){N(e,0,.56,0,.49,.31,.22,r);for(let a=0;a<4;a++)N(e,0,.44+a*.07,.13,.45,.018,.02,15787468);N(e,0,.55,.15,.13,.13,.035,11363932)}else N(e,0,.57,0,.14,.53,.12,14736841);return Ot(e)}function Zd(n){if(n>=40)return C_(n);let e=new Ke,t=12820556,i=7886126;if(n===37)return Sl();if(n===31){for(let r=0;r<9;r++){let s=.2+r*.085,a=.15*Math.sin(r/8*Math.PI);N(e,a,s,0,.045,.11,.05,i)}N(e,0,.55,0,.015,.7,.02,14141844)}else if(n===32)N(e,0,.72,0,.07,.65,.045,12109511),N(e,0,.39,0,.3,.055,.07,t),N(e,0,.25,0,.07,.23,.07,i);else if(n===33){N(e,0,.58,0,.055,.91,.055,i);let r=new je(new Ps(.15),Di(6539481,!0));r.position.y=1.12,e.add(r)}else if(n===34)N(e,0,.46,0,.32,.37,.3,8797013),N(e,0,.47,.17,.22,.23,.025,11620717),N(e,0,.74,0,.15,.2,.14,11782341),N(e,0,.86,0,.18,.07,.17,i);else if(n===35)for(let r=0;r<6;r++){let s=new je(new Cn(.21,.21,.05,12),Ki(t));s.position.set(r%2*.12-.06,.3+r*.055,r%3*.05),e.add(s)}else if(n===36){N(e,0,.47,0,.52,.66,.025,14140829);for(let r=0;r<5;r++)N(e,0,.64-r*.07,.022,.36-r%2*.08,.012,.008,8088650);N(e,.12,.28,.025,.1,.1,.025,9192504)}else N(e,0,.52,0,.075,.66,.075,t),N(e,0,.2,0,.18,.12,.18,t);return Ot(e)}function Yr(n){let e=new Ke,t=6899502,i=12820556,r=8094328;if(n.model&&window.Props){let s=window.Props.build(n);if(s){for(let a of s)a.length>8?ml(e,a):$s(e,...a);return Ot(e)}}if(n.portalKind){N(e,0,.035,0,.86,.07,.88,2304293);for(let s=0;s<4;s++){let a=n.portalKind==="stairs-up"?.16+s*.16:.08+s*.035;N(e,0,a/2+.07,.3-s*.2,.63,a,.18,t)}for(let s of[-.4,.4])N(e,s,.16,0,.08,.24,.96,9992270);return Ot(e)}switch(n.type){case"tree":{N(e,0,.58,0,.22,1.16,.22,7360567);let s=[4750141,6521672,3765067][n.variant||0];return N(e,0,1.3,0,.9,.55,.88,s),N(e,-.12,1.7,.02,.68,.38,.65,s),N(e,.16,1.95,-.04,.42,.22,.42,s),Ot(e)}case"shelf":for(let s of[-.38,.38])N(e,s,.58,-.26,.08,1.16,.12,t);for(let s of[.16,.56,.96]){N(e,0,s,0,.84,.07,.48,t);for(let a=0;a<3;a++)N(e,-.26+a*.26,s+.14,0,.15,.21,.22,[11901029,7901276,10841672][a])}return Ot(e);case"stove":return N(e,0,.32,0,.86,.64,.76,7959144),N(e,0,.35,.39,.5,.35,.02,2696738),N(e,0,.25,.405,.34,.09,.02,14647605,!0),N(e,0,.68,0,.94,.08,.84,4803912),N(e,0,.83,0,.35,.23,.35,3751484),N(e,0,1.14,-.29,.3,.8,.24,7828070),Ot(e);case"cart":N(e,0,.39,0,.63,.12,.8,t);for(let s of[-.3,.3])N(e,s,.6,0,.07,.36,.8,t);N(e,0,.57,-.37,.63,.32,.06,t);for(let s of[-.38,.38])for(let a of[-.25,.25])N(e,s,.24,a,.1,.3,.3,4278080);return N(e,-.12,.6,0,.25,.3,.34,11311473),N(e,.15,.58,.18,.22,.27,.26,9863254),Ot(e);case"counter":N(e,0,.35,0,.96,.7,.66,t),N(e,0,.75,0,.99,.1,.8,9859915),N(e,0,.36,.34,.72,.48,.03,8608823),N(e,.23,.86,.1,.12,.13,.12,13482893);break;case"table":for(let s of[-.31,.31])for(let a of[-.26,.26])N(e,s,.28,a,.08,.56,.08,t);N(e,0,.61,0,.85,.12,.78,9859915),N(e,-.16,.71,.04,.24,.08,.17,12491365),N(e,.2,.76,-.16,.12,.18,.12,13482893);break;case"lantern":N(e,0,.06,0,.5,.12,.5,r),N(e,0,.65,0,.12,1.22,.12,t),N(e,0,1.4,0,.3,.36,.3,4278346),N(e,0,1.4,.16,.19,.24,.02,16763254,!0),N(e,0,1.62,0,.4,.08,.4,t),Ml(e);break;case"waymark":N(e,0,.025,0,.74,.04,.74,9992270),N(e,0,.051,0,.52,.015,.06,i),N(e,0,.051,0,.06,.015,.52,i);break}if(["counter","table","lantern","waymark"].includes(n.type))return Ot(e);switch(n.type){case"clue":for(let o=0;o<4;o++){let l=N(e,(o%2-.5)*.18,.014,(o-1.5)*.13,.075,.014,.11,8549474);l.castShadow=!1}return Ot(e);case"torch":return Sl();case"chandelier":return Yd();case"barrel":{let o=new je(new Cn(.24,.26,.55,12),Ki(7754290));o.position.y=.29,o.castShadow=!0,o.receiveShadow=!0,e.add(o);for(let l of[.13,.44]){let c=new je(new Cn(.255,.255,.045,12),Di(4278346));c.position.y=l,e.add(c)}N(e,0,.58,0,.04,.012,.42,5782566);break}case"crate":N(e,0,.28,0,.61,.55,.55,7886135);for(let o of[-.24,.24])N(e,o,.28,.287,.055,.57,.025,10517322),N(e,o,.57,0,.055,.028,.56,10517322);for(let o of[.06,.5])N(e,0,o,.29,.6,.045,.025,10254407);break;case"chair":for(let o of[-.2,.2])for(let l of[-.17,.17])N(e,o,.2,l,.065,.4,.065,t);N(e,0,.41,0,.5,.08,.44,8411961),N(e,0,.465,0,.4,.04,.35,7880250);for(let o of[-.21,.21])N(e,o,.64,-.18,.065,.55,.065,t);N(e,0,.81,-.18,.47,.22,.055,8411961);break;case"planter":{let o=new je(new Cn(.22,.14,.3,12),Ki(8540984));o.position.y=.17,o.castShadow=!0,o.receiveShadow=!0,e.add(o);for(let l=0;l<5;l++){let c=(l%3-1)*.09,u=(l%2-.5)*.15,d=.48+l%3*.07;N(e,c,.4,u,.025,.35,.025,5401661),N(e,c+.055,d,u,.13,.045,.055,6587210),n.id==="lilies"&&(N(e,c,d+.11,u,.12,.035,.055,14998957),N(e,c,d+.11,u,.055,.035,.12,15656635),N(e,c,d+.13,u,.035,.035,.035,i))}break}case"scrolls":N(e,0,.3,0,.61,.09,.45,8411702);for(let o of[-.24,.24])N(e,o,.15,0,.06,.29,.34,t);for(let o=0;o<3;o++){let l=new je(new Cn(.07,.07,.4,10),Ki(13746588));l.rotation.z=Math.PI/2,l.position.set(0,.43+o*.07,(o-1)*.1),l.castShadow=!0,e.add(l)}break;case"rack":for(let o of[-.3,.3])N(e,o,.47,0,.08,.9,.12,t);N(e,0,.69,0,.69,.085,.12,9135937);for(let o of[-.18,.04])N(e,o,.52,.13,.055,.6,.045,11581626),N(e,o,.8,.13,.19,.045,.075,i),N(e,o,.88,.13,.045,.12,.05,t);N(e,.27,.4,.1,.22,.32,.07,3957378),N(e,.27,.4,.145,.025,.23,.018,i);break;case"banner":N(e,0,.9,0,.65,.055,.08,t),N(e,0,.58,.02,.52,.61,.035,8010038),N(e,0,.58,.043,.04,.33,.02,i),N(e,0,.64,.046,.21,.04,.022,i);break;case"ground-item":N(e,0,.12,0,.34,.22,.29,8807746),N(e,0,.24,0,.26,.04,.22,11703654),N(e,0,.25,0,.05,.02,.2,5587501);break;case"npc":return qr(5,{npcId:n.id,gen:n.npc});case"chest":N(e,0,.25,0,.64,.4,.45,t),N(e,0,.49,0,.62,.12,.43,8411193);for(let o of[-.24,.24])N(e,o,.3,.237,.05,.46,.035,i);N(e,0,.32,.25,.12,.13,.04,i);break;case"cover":N(e,0,.15,0,.7,.26,.65,4742496),N(e,0,.36,0,.64,.17,.57,r),N(e,0,.46,0,.47,.035,.4,9278855);break;case"altar":N(e,-.3,.3,0,.12,.5,.4,t),N(e,.3,.3,0,.12,.5,.4,t),N(e,0,.59,0,.86,.12,.58,11973019),N(e,0,.36,.3,.35,.43,.022,7878449);for(let o of[-.22,0,.22]){let l=N(e,o,.75,0,.05,.22,.05,14531961);l.castShadow=!1,l.receiveShadow=!1,N(e,o,.9,0,.05,.1,.05,16758594,!0)}break;case"books":N(e,0,.65,0,.65,1.25,.28,t);for(let o=0;o<3;o++){N(e,0,.25+o*.38,.2,.72,.065,.46,8674872);for(let l=0;l<5;l++)N(e,-.25+l*.12,.4+o*.38,.13,.08,.22+l%2*.05,.19,[8735040,5666672,11772783][l%3])}break;case"desk":for(let o of[-.32,.32])for(let l of[-.22,.22])N(e,o,.32,l,.075,.56,.075,t);N(e,0,.61,0,.86,.1,.64,8805950),N(e,.1,.68,.07,.35,.04,.28,13482893);let s=N(e,-.28,.76,-.14,.04,.24,.04,14927999);s.castShadow=!1,s.receiveShadow=!1;break;case"door":case"portal":N(e,-.37,.56,0,.15,1.12,.3,r),N(e,.37,.56,0,.15,1.12,.3,r),N(e,0,1.09,0,.72,.15,.31,r);let a=new Ke;a.position.x=-.28,N(a,.28,.52,0,.56,1.02,.1,t),N(a,.28,.38,.06,.54,.06,.024,3752007),N(a,.45,.57,.075,.06,.07,.035,i),e.add(a),e.userData.hinge=a,e.userData.axis=n.axis,n.axis==="horizontal"&&(e.rotation.y=Math.PI/2);break;case"decor":N(e,0,.52,0,.55,.95,.17,r),N(e,0,.6,.1,.33,.67,.03,4685194),N(e,0,.58,.122,.025,.67,.024,9812405);break}return A_(e,n),Ot(e)}var cl;function R_(){if(cl)return cl;let n=document.createElement("canvas");n.width=256,n.height=384;let e=n.getContext("2d");e.fillStyle="#823c36",e.fillRect(0,0,256,384),e.strokeStyle="#c3a168",e.lineWidth=4,e.strokeRect(12,12,232,360),e.lineWidth=2,e.strokeRect(22,22,212,340),e.save(),e.translate(128,192),e.beginPath(),e.arc(0,0,40,0,Math.PI*2),e.stroke();for(let i=0;i<12;i++)e.save(),e.rotate(i*Math.PI/6),e.beginPath(),e.moveTo(-6,-49),e.lineTo(0,-65),e.lineTo(6,-49),e.closePath(),e.fillStyle="#c3a168",e.fill(),e.restore();e.restore();for(let i of[63,321])e.beginPath(),e.moveTo(128,i-22),e.lineTo(150,i),e.lineTo(128,i+22),e.lineTo(106,i),e.closePath(),e.stroke();let t=new Hn(n);return t.colorSpace=Ct,cl=new mn({map:t,roughness:1}),cl}var Li;function I_(){let n=Ce.scene,e=n.visualSeed??Ce.state.seed;Xd=n.id+":"+(n.layoutKey||"")+":"+Ce.state.party.map(s=>s.id).join(","),Hd(null);for(let s of Ji)s.light.shadow.dispose();zd(Dn),zd(Hr),ht.clear(),Bd.clear(),Ji.length=0,Js.clear(),Li=null;let t=new Map;function i(s,a,o,l,c,u,d){t.has(d)||t.set(d,[]),t.get(d).push([s,a,o,l,c,u])}for(let s=0;s<n.H;s++)for(let a=0;a<n.W;a++){let o=World.tile(n,a,s),l=(a*113+s*71+e)%11/100;if(o==="floor"){let c=n.ground?.[s]?.[a]==="grass",u=window.WorldGen?.SURFACE_BY_CODE[n.surface?.[s]?.[a]],d=new Le(u?WorldGen.surfaceColor(u,a,s):c?5405500:n.id==="proc-tavern"?6836539:n.outdoor?9930866:4544347);d.offsetHSL(0,-l*.3,l*.24),i(a+.5,-.095,s+.5,1,.17,1,d.getHex());let h=(a*37+s*61+e)%17;(a*7+s*13)%19===0&&i(a+.7,.005,s+.24,.16,.007,.18,5859403)}else if(o==="wall"){if(n.props.some(h=>["door","portal"].includes(h.type)&&h.x===a&&h.y===s)){i(a+.5,-.095,s+.5,1,.17,1,4544347);continue}if(n.outdoor&&s!==1){i(a+.5,.1,s+.5,.99,.2,.99,n.wallStyle?WorldGen.wallColor(n.wallStyle,a,s):7501415);continue}let c=World.tile(n,a,s-1)==="floor"&&!n.lights.some(h=>h.wallX===a&&h.wallY===s),u=c?.48:.94;for(let h=0;h<(c?2:4);h++){let p=new Le(n.wallStyle?WorldGen.wallColor(n.wallStyle,a,s):8486504);p.offsetHSL(0,-l,.01*(h%2)),h%2?(i(a+.125,.12+h*.235,s+.5,.22,.22,.97,p.getHex()),i(a+.5,.12+h*.235,s+.5,.47,.22,.97,p.getHex()),i(a+.875,.12+h*.235,s+.5,.22,.22,.97,p.getHex())):(i(a+.25,.12+h*.235,s+.5,.47,.22,.97,p.getHex()),i(a+.75,.12+h*.235,s+.5,.47,.22,.97,p.getHex()))}i(a+.5,u+.03,s+.5,.99,.06,.99,9671035),(a*19+s*43+e)%13===7&&i(a+.82,u+.064,s+.76,.11,.009,.08,7568982)}}for(let[s,a]of t){let o=new on(Zs,Ki(s,a.some(u=>u[1]>.05)?2:8),a.length),l=new We,c=new fn;a.forEach(([u,d,h,p,_,x],m)=>{l.compose(new B(u,d,h),c,new B(p,_,x)),o.setMatrixAt(m,l)}),o.castShadow=a.some(u=>u[1]>.12),o.receiveShadow=!0,Dn.add(o)}let r=[];for(let s of n.props){if(["torch","chandelier"].includes(s.type))continue;let a=Yr(s);a.position.set(s.x+.5,0,s.y+.5),s.type==="npc"&&(a.userData.idleFacing=xd(n,s,Ce.state.world?.gen?.seed||Ce.state.procedural?.seed||Ce.state.world?.id||"")),s.solid!==!1&&!["door","portal","decor","banner"].includes(s.type)&&ih(a,.88,.78),a.userData.p=s,Dn.add(a),ht.set("prop:"+s.id,a),s.type==="door"&&Bd.set(s.id,a),!["npc","door","portal","chest","ground-item","torch","chandelier"].includes(s.type)&&!s.container&&r.push(a)}Li=yd(r,Dn);for(let s of n.decor)if(s.kind==="bench"){let a=new Ke;N(a,0,.35,0,.88,.13,.35,7950386),N(a,0,.56,-.15,.88,.32,.07,6833454);for(let o of[-.32,.32])N(a,o,.18,0,.095,.3,.33,5322275);Ot(a),ih(a,1,.55),a.position.set(s.x+.5,0,s.y+.5),Dn.add(a)}else{let a=new Ke,o=new je(new Rn(s.w-.08,s.h-.08),R_());o.rotation.x=-Math.PI/2,o.position.y=.016,o.receiveShadow=!0,a.add(o);for(let l of[-1,1])N(a,l*(s.w/2-.08),.017,0,.025,.006,s.h-.08,10979920);a.position.set(s.x-.5+s.w/2,0,s.y-.5+s.h/2),Dn.add(a)}for(let s of n.lights){let a=s.id==="altar",o=s.kind==="chandelier",l=s.kind==="fixture"?new Ke:o?Yd():Sl(),c=l.userData.flames||[];if(s.kind==="wall"){l.position.set(s.x,.56,s.y);let d=new Ke;N(d,-s.dx*.18,.26,-s.dy*.18,s.dx?.045:.15,.23,s.dy?.045:.15,3752007),N(d,-s.dx*.09,.11,-s.dy*.09,s.dx?.24:.045,.04,s.dy?.24:.045,3752007),Ot(d),Ml(d);let h=new Ke;h.position.copy(l.position),l.position.set(0,0,0),h.add(d,l),h.userData.p=n.props.find(p=>p.id===s.fixtureId),h.userData.lightSource=s.id,Dn.add(h),ht.set("prop:"+s.fixtureId,h)}else l.position.set(s.x,0,s.y),l.userData.lightSource=s.id,o&&(l.userData.p=n.props.find(d=>d.id===s.id),ht.set("prop:"+s.id,l)),Dn.add(l);a&&(l.visible=!1);let u=new ai(16760192,s.intensity??(a?2:12),s.distance??8,2);u.position.set(s.x,s.height??(a?.96:1.22),s.y),kd(u),Un.add(u),Ji.push({model:l,flames:c,light:u,source:s,chandelier:o})}for(let s of Ce.state.party){let a=new ai(16760192,12,10,2);kd(a,!0),a.visible=!1,Un.add(a),Ji.push({light:a,portable:!0,actorId:s.id,flames:[]})}pt.shadowMap.needsUpdate=!0,Wr=!0,document.body.classList.add("voxel-ready"),ch()}function dl(n){n.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.geometry&&e.geometry!==Zs&&e.geometry.dispose(),e.userData.disposeMaterial&&e.material.dispose()})}function zd(n){for(let e of[...n.children])dl(e),n.remove(e);for(let e of Ji)Un.remove(e.light)}function hl(n,e,t,i=.94){let r=[[-i/2,-i/2],[i/2,-i/2],[i/2,i/2],[-i/2,i/2],[-i/2,-i/2]].map(([a,o])=>new B(n+a,.025,e+o)),s=new Rs(new Tt().setFromPoints(r),new Hi({color:t,transparent:!0,opacity:.8}));return Ws.add(s),s}function lh(){if(Ce=window.gameDebug,!Ce)return;Xd!==Ce.scene.id+":"+(Ce.scene.layoutKey||"")+":"+Ce.state.party.map(l=>l.id).join(",")&&I_();let n=Ce.props.filter(l=>l.type==="ground-item");for(let[l,c]of ht)c.userData.p?.type==="ground-item"&&!n.some(u=>"prop:"+u.id===l)&&(Dn.remove(c),dl(c),ht.delete(l));for(let l of n)if(!ht.has("prop:"+l.id)){let c=Yr(l);c.position.set(l.x+.5,0,l.y+.5),c.userData.p=l,Dn.add(c),ht.set("prop:"+l.id,c)}let e=Ce.all(),t=new Set(e.map(l=>l.id));for(let l of e){let c=ht.get(l.id),u=JSON.stringify([l.hands||[],l.appearance||null,l.classId]);if(c&&c.userData.loadout!==u&&(Hr.remove(c),dl(c),ht.delete(l.id),c=null),c||(c=qr(l.dummy?4:l.kind,l),ih(c,.8,.68),c.userData.loadout=u,Hr.add(c),ht.set(l.id,c)),Js.has(l.id)||(c.position.set(l.x+.5,0,l.y+.5),c.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][l.facing||0]),c.visible=!l.dead&&(l.kind<3||l.dummy||window.visibility?.canSee(Ce.active(),l)!==!1),c.userData.p=l,l.kind<3){if(!c.userData.torch){let h=Sl();h.scale.setScalar(.7),h.position.set(l.hands?.indexOf("torch")===0?-.32:.32,.37,.07),c.add(h),c.userData.torch=h}let d=c.userData.torch;d.visible=!!l.hands?.includes("torch"),d.userData.flames.forEach(h=>h.visible=!!l.torch)}}for(let[l,c]of ht)!l.startsWith("prop:")&&!t.has(l)&&(Hr.remove(c),dl(c),ht.delete(l));let i=ht.get("prop:novice");i&&(i.visible=Ce.props.some(l=>l.id==="novice"));for(let l of Ce.props){let c=ht.get("prop:"+l.id);if(c){if(c.visible=!(l.type==="chest"&&Ce.state.loot[Ce.state.scene+":"+l.id]),l.type==="npc"){let u=window.viewsDebug?.speaker,d=u&&(u.id?u.id===l.id:u.name===l.name);c.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][d?_d(l,Ce.active()):c.userData.idleFacing??0]}if(c.userData.hinge){let u=l.type==="door"&&Ce.isOpen(l)||Ce.departingNpc?.doorId===l.id?-Math.PI*.48:0;c.userData.hinge.userData.goal=u,Ce.animate()||(c.userData.hinge.rotation.y=u)}c.userData.staticBatched&&Li.update(c)}}for(;Ws.children.length;){let l=Ws.children[0];l.traverse(c=>{c.geometry&&!c.userData.silhouette&&c.geometry.dispose(),c.material&&c.material.dispose(),c.isInstancedMesh&&c.dispose()}),Ws.remove(l)}let r=Ce.selected&&Ce.props.find(l=>l.x===Ce.selected.x&&l.y===Ce.selected.y),s=Ce.selected&&e.find(l=>l.x===Ce.selected.x&&l.y===Ce.selected.y),a=r?ht.get("prop:"+r.id):s?ht.get(s.id):null;Hd(a);let o=Ce.active();if(hl(o.x+.5,o.y+.5,9481331,.74),Ce.state.world?.gen)for(let l of window.WorldGen.Runtime.knownTraps(window.GeneratedWorlds.host(),Ce.scene))hl(l.x+.5,l.y+.5,14187064,.82);if(Ce.selected){a||hl(Ce.selected.x+.5,Ce.selected.y+.5,14925430);let l=Ce.route||[];if(l.length){let u=new on(new pn(.06,.025,.06),new An({color:13023111}),l.length);l.forEach((d,h)=>u.setMatrixAt(h,new We().makeTranslation(d.x+.5,.027,d.y+.5))),Ws.add(u)}let c=l.at(-1);c&&hl(c.x+.5,c.y+.5,10337165,.68)}Wd.intensity=Ce.state.settings.lights?.65+Ce.state.settings.ambient*.45:.85,ah.intensity=Ce.state.settings.lights?.43:.85,pt.shadowMap.enabled=Ce.state.settings.lights;for(let l of Ji)l.portable&&(l.light.shadow.needsUpdate=!0);pt.shadowMap.needsUpdate=!0,ui()}function Ni(){let n=Mt.clientWidth||390,e=Mt.clientHeight||520,t=n/e;Wt.left=-Ut*t,Wt.right=Ut*t,Wt.top=Ut,Wt.bottom=-Ut,Wt.position.set(Jn.x,12,Jn.z+8.4),Wt.lookAt(Jn.x,0,Jn.z),Wt.updateProjectionMatrix(),Wt.updateMatrixWorld()}function ch(){let n=Mt.clientWidth||390,e=Mt.clientHeight||520;pt.setSize(n,e,!1),Xs.setSize(n,e),yl.uniforms.texel.value.set(1/n,1/e),Ni(),ui()}function gl(n){Jn={x:n.x+.5,z:n.y+.5},Ni(),ui()}function hh(){let n=Ce.scene,e=(Mt.clientWidth||390)/(Mt.clientHeight||520);Ut=Math.max(n.H*.5*.819,n.W*.5/e)+.5,Jn={x:n.W/2,z:n.H/2},Ni(),ui()}function bl(){Ut=4.8,gl(Ce.active())}function P_(){let n=Xs.width,e=Xs.height,t=[n,e,...Wt.matrixWorld.elements,...Wt.projectionMatrix.elements,...$i.flatMap(i=>i.matrix.elements)].join(",");t!==nh&&((!ci||ci.image.width!==n||ci.image.height!==e)&&(ci?.dispose(),ol=new Uint8Array(n*e*4),Fd=new Uint8Array(n*e),Od=new Int32Array(n*e),ci=new Gi(ol,n,e,en),ci.minFilter=ci.magFilter=vt,yl.uniforms.mask.value=ci),pt.setRenderTarget(Xs),pt.render(fl,Wt),pt.readRenderTargetPixels(Xs,0,0,n,e,ol),Sd(ol,n,e,Fd,Od),ci.needsUpdate=!0,nh=t)}function ui(){if(Wr){if(window.CinematicMenu?.active){jd(performance.now());return}if(pt.setRenderTarget(null),pt.render(Un,Wt),Ys&&Ys.visible&&$i.length){Ys.updateWorldMatrix(!0,!0);for(let e of $i)e.matrix.copy(e.userData.source.matrixWorld);P_(),pt.setRenderTarget(null);let n=pt.autoClear;pt.autoClear=!1,pt.render(Gd,b_),pt.autoClear=n}}}var xl=new Er,L_=new rn(new B(0,1,0),0);function Jd(n,e){let t=Mt.getBoundingClientRect();return xl.setFromCamera(new Oe((n-t.left)/t.width*2-1,-(e-t.top)/t.height*2+1),Wt),xl.ray.intersectPlane(L_,new B)}var _n=new Map;xl.layers.enable(1);var Xr=!1,ji,sh,$d=0,Kd=0;Nn.addEventListener("pointerdown",n=>{if(Nn.setPointerCapture(n.pointerId),_n.set(n.pointerId,{x:n.clientX,y:n.clientY}),_n.size===1&&(ji={x:n.clientX,y:n.clientY},sh={...Jn},Xr=!1),_n.size===2){let[e,t]=[..._n.values()];$d=Math.hypot(e.x-t.x,e.y-t.y),Kd=Ut,Xr=!0}});Nn.addEventListener("pointermove",n=>{if(_n.has(n.pointerId)){if(_n.set(n.pointerId,{x:n.clientX,y:n.clientY}),_n.size===2){let[e,t]=[..._n.values()];Ut=hn.clamp(Kd*$d/Math.max(20,Math.hypot(e.x-t.x,e.y-t.y)),2.8,15)}else if(ji){let e=n.clientX-ji.x,t=n.clientY-ji.y;Math.hypot(e,t)>5&&(Xr=!0),Xr&&(Jn.x=sh.x-e*2*Ut/(Mt.clientHeight||520),Jn.z=sh.z-t*2*Ut/(Mt.clientHeight||520)/.819)}Ni(),ui()}});Nn.addEventListener("pointerup",n=>{if(!Xr&&_n.size===1){let e=Jd(n.clientX,n.clientY),t=[...ht.values()].filter(r=>r.visible&&r.userData.p&&r.userData.p.type!=="chandelier"),i=xl.intersectObjects(t,!0);if(i.length){let r=i[0].object;for(;r&&!r.userData.p;)r=r.parent;if(r){let s=r.userData.p;Ce.mapTap(s),_n.delete(n.pointerId),ji=null;return}}e&&World.tile(Ce.scene,Math.floor(e.x),Math.floor(e.z))!=="void"?Ce.mapTap({x:Math.floor(e.x),y:Math.floor(e.z)}):Ce.mapTap(null)}_n.delete(n.pointerId),ji=null});Nn.addEventListener("pointercancel",n=>{_n.delete(n.pointerId),ji=null});Nn.addEventListener("wheel",n=>{n.preventDefault(),Ut=hn.clamp(Ut*Math.exp(n.deltaY*.001),2.8,15),Ni(),ui()},{passive:!1});for(let[n,e]of Object.entries({"zoom-in":()=>{Ut=Math.max(2.8,Ut*.8),Ni(),ui()},"zoom-out":()=>{Ut=Math.min(15,Ut/.8),Ni(),ui()},"camera-center":()=>gl(Ce.active()),"camera-fit":hh}))document.getElementById(n).onclick=e;function D_(n,e,t,i){let r=ht.get(n);r&&(Js.set(n,{from:{x:e.x+.5,z:e.y+.5},to:{x:t.x+.5,z:t.y+.5},start:performance.now(),duration:Math.max(1,i),m:r}),r.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][r.userData.p?.facing||0])}function rh(n,e,t=!1,i=!0,r="damage"){let s=document.createElement("span");s.className="voxel-damage "+(t?"critical ":"")+(r==="heal"?"healing":""),s.textContent=e===0?"0":String(e),Mt.append(s),qs.push({el:s,p:{x:n.x+.5,y:.9,z:n.y+.5},start:performance.now(),life:1100});let a=ht.get(n.id);a&&r!=="heal"&&(a.userData.hit=performance.now())}async function N_(n,e,t){let i=ht.get(n.id);if(i&&(i.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][n.facing||0],i.userData.strike={start:performance.now(),dx:Math.sign(e.x-n.x),dz:Math.sign(e.y-n.y)}),Math.abs(e.x-n.x)+Math.abs(e.y-n.y)>1){let r=new je(new pn(.07,.07,.19),Di(n.kind===1?7651315:13676131,!0));Un.add(r),qs.push({mesh:r,from:{x:n.x+.5,z:n.y+.5},to:{x:e.x+.5,z:e.y+.5},start:performance.now(),life:260})}t&&await new Promise(r=>setTimeout(r,260))}var Hs=new Map;function Vd(n,e,t,i=0){let r=JSON.stringify([jc(n,t)||Zc(t||{},n),i])+n+":"+(e||"")+":"+(t?.portalKind||"");if(!Hs.has(r))try{hi||(hi=new kr({alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),hi.setSize(360,450,!1),hi.setPixelRatio(1),hi.outputColorSpace=Ct,hi.toneMapping=Fs,hi.toneMappingExposure=1.25);let a=new Tn;a.add(new ri(14937574,6181693,2));let o=new oi(16769716,2.8);o.position.set(-2,4,3),a.add(o);let l=e==="item"?Zd(n):e?Yr({...t,type:e}):qr(n,t);l.rotation.y=i*Math.PI/2,a.add(l);let c=new cn(-.68,.68,.98,-.72,.1,20);c.position.set(1.8,1.6,4),c.lookAt(0,.67,0),tl(c,l),hi.render(a,c);let u=document.createElement("canvas");u.width=360,u.height=450,u.getContext("2d").drawImage(hi.domElement,0,0),Hs.size>80&&Hs.delete(Hs.keys().next().value),Hs.set(r,u),l.traverse(d=>{d.isInstancedMesh&&d.dispose()})}catch{return null}let s=document.createElement("canvas");return s.width=360,s.height=450,s.className="sprite",s.getContext("2d").drawImage(Hs.get(r),0,0),s}function U_(n){if(!n||!Ce?.animate())return;let e=ht.get("prop:"+n.id)||ht.get(n.id);!e||n.type==="chandelier"||(e.userData.tap={start:performance.now(),type:n.type||"actor",baseY:e.userData.tap?.baseY??e.position.y,baseZ:e.userData.tap?.baseZ??e.rotation.z})}function Gr(n){if(requestAnimationFrame(Gr),window.CinematicMenu?.active&&Wr&&!document.hidden){n-ll>=30&&(ll=n,jd(n));return}if(document.hidden||document.getElementById("map-view").hidden||!Wr||n-ll<30)return;ll=n;let e=!Gr.lastShadow||n-Gr.lastShadow>80;e&&(Gr.lastShadow=n);let t=Ce.animate(),i=Ce.active();for(let[a,o]of Js){let l=Math.min(1,(n-o.start)/o.duration),c=1-(1-l)**3;o.m.position.set(hn.lerp(o.from.x,o.to.x,c),t?Math.sin(l*Math.PI)*.035:0,hn.lerp(o.from.z,o.to.z,c)),l===1&&(o.m.position.set(o.to.x,0,o.to.z),Js.delete(a))}for(let a of ht.values()){if(a.userData.tap){let o=a.userData.tap,l=(n-o.start)/360;if(l<1){let c=Math.sin(l*Math.PI)*Math.sin(l*Math.PI*2);a.position.y=o.baseY+Math.sin(l*Math.PI)*(["npc","actor"].includes(o.type)?.045:.022),a.rotation.z=o.baseZ+c*(["door","portal","books","barrel"].includes(o.type)?.035:.016)}else a.position.y=o.baseY,a.rotation.z=o.baseZ,delete a.userData.tap;a.userData.staticBatched&&Li.update(a)}if(a.userData.strike){let o=a.userData.strike,l=(n-o.start)/280;l<1?(a.position.x=a.userData.p.x+.5+o.dx*Math.sin(l*Math.PI)*.1,a.position.z=a.userData.p.y+.5+o.dz*Math.sin(l*Math.PI)*.1):(delete a.userData.strike,a.position.set(a.userData.p.x+.5,0,a.userData.p.y+.5))}if(a.userData.hinge){let o=a.userData.hinge;o.rotation.y=hn.lerp(o.rotation.y,o.userData.goal||0,.22)}}let r=new Set(window.Torches.lightSources().map(a=>a.id));for(let a of Ji){let o=a.portable?Ce.state.party.find(h=>h.id===a.actorId):null,l=a.source,c=l?.phase||2,u=!!Ce.state.settings.lights&&(a.portable?!!o?.torch:r.has(l.id)),d=t?1+.035*Math.sin(n*.005+c)+.015*Math.sin(n*.012+c):1;if(a.light.visible=u,a.light.intensity=u?(l?.intensity??12)*(a.portable?.65:l?.id==="altar"?.22:a.chandelier?.3:.45)*Ce.state.settings.intensity*d:0,a.portable&&u&&e&&(Js.size||qs.length||[...ht.values()].some(h=>h.userData.strike||h.userData.hinge&&Math.abs(h.userData.hinge.rotation.y-(h.userData.hinge.userData.goal||0))>.002)||!a.lastPosition||a.light.position.distanceToSquared(a.lastPosition)>1e-4)&&(a.light.shadow.needsUpdate=!0,pt.shadowMap.needsUpdate=!0,a.lastPosition=a.light.position.clone()),a.portable){let h=ht.get(o.id),p=h?.userData.torch;p&&(p.updateWorldMatrix(!0,!1),a.light.position.copy(p.localToWorld(new B(0,.64,0))),p.userData.flames.forEach((_,x)=>{_.position.copy(_.userData.rest),t&&(_.position.x+=Math.sin(n*.009+x)*.015)}))}else{if(l.kind==="wall"){let p=window.Torches.fixture(l.fixtureId).present;a.model.visible=p,a.flames.forEach(_=>_.visible=u)}let h=t?Math.sin(n*.008+c)*.018:0;if(a.light.position.x=l.x+h,a.light.position.z=l.y+h*.6,a.flames.forEach((p,_)=>{p.position.copy(p.userData.rest),t&&(p.position.x+=h*(_+1)*.5,p.position.y+=Math.sin(n*.009+c+_)*.018)}),a.chandelier){a.flames.forEach(_=>_.visible=u);let p=Ce.state.party.some(_=>Math.hypot(_.x+.5-l.x,_.y+.5-l.y)<1.15);a.model.traverse(_=>{_.isMesh&&(_.material.opacity=hn.lerp(_.material.opacity,p?.28:1,.14))})}}}for(let a=qs.length-1;a>=0;a--){let o=qs[a],l=(n-o.start)/o.life;if(l>=1){o.el?.remove(),o.mesh&&(Un.remove(o.mesh),o.mesh.geometry.dispose()),qs.splice(a,1);continue}if(o.el){let c=new B(o.p.x,o.p.y+l*.7,o.p.z).project(Wt);o.el.style.left=(c.x+1)*Mt.clientWidth/2+"px",o.el.style.top=(-c.y+1)*Mt.clientHeight/2+"px",o.el.style.opacity=String(1-Math.max(0,(l-.6)/.4))}else o.mesh.position.set(hn.lerp(o.from.x,o.to.x,l),.65,hn.lerp(o.from.z,o.to.z,l)),o.mesh.rotation.y=Math.atan2(o.to.x-o.from.x,o.to.z-o.from.z)}let s=window.objectPrompt;if(Nt.hidden=!s?.p||!document.getElementById("dialogue").hidden||!!window.CinematicMenu?.active,s?.p){let a=s.p,o=new B(a.x+.5,.45,a.y+.5).project(Wt),l=(o.x+1)*Mt.clientWidth/2,c=(-o.y+1)*Mt.clientHeight/2,u=s.actions||[],d=JSON.stringify([a.name,u.map(S=>[S.id,S.label,S.enabled])]);if(Nt.dataset.signature!==d){Nt.dataset.signature=d;let S=document.createElement("strong");S.textContent=a.name;let C=u.map(M=>{let T=document.createElement("button");return T.type="button",T.dataset.action=M.id,T.textContent=M.label,T.disabled=!M.enabled,T});Nt.replaceChildren(S,...C),Nt.setAttribute("aria-label","\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \xB7 "+a.name)}let h=Nt.offsetWidth||190,p=Nt.offsetHeight||125,_=Mt.getBoundingClientRect(),x=document.getElementById("play-dock")?.getBoundingClientRect(),m=Math.min(Mt.clientHeight-6,x&&x.height?x.top-_.top-6:Mt.clientHeight-6),f=c-p-24;f<76&&(f=c+24),f=Math.max(6,Math.min(m-p,f)),Nt.hidden||=l<0||l>Mt.clientWidth||c<0||c>m||m<p,Nt.style.left=Math.max(h/2+6,Math.min(Mt.clientWidth-h/2-6,l))+"px",Nt.style.top=f+"px"}ui()}new ResizeObserver(ch).observe(Mt);window.camera={center:gl,reset:bl,fit:hh,follow:n=>{Ce.state.combat&&gl(n)},zoom:n=>{Ut=hn.clamp(5/n,2.8,15),Ni()},allowClick:()=>!0,get state(){return{scale:5/Ut,focus:Jn}}};window.fx={step:()=>{},strike:N_,impact:rh,door:()=>{},pulse:n=>rh(n,"\u041E\u0442\u043A\u043B\u0438\u043A",!1,!0,"heal")};var _l;function jd(n){_l||=vd({figure:qr,propModel:Yr,shadedBox:N,compact:Ot,terrainMaterial:Ki}),pt.setRenderTarget(null),_l.render(pt,n,Ce.state.settings,window.CinematicMenu.editor)}window.voxel={resize:ch,get staticBatchStats(){return Li&&{props:Li.roots.length,sourceMeshes:Li.sourceMeshes,drawMeshes:Li.meshes.length}},turnHero:n=>_l?.turn(n),get menuDebug(){return _l?.debug},buildModel:(n,e,t)=>qr(n,e,t),buildItem:Zd,buildProp:Yr,compact:Ot,shadedBox:N,heroPortrait:(n,e=0)=>Vd(n.kind,null,n,e),portrait:Vd,sync:lh,move:D_,impact:rh,tap:U_,reset:bl,fit:hh,ground:Jd,get selectionMask(){return{root:Ys,objects:$i,material:yl}},get ready(){return Wr},get scene(){return Un},get camera(){return Wt},get models(){return ht},get renderer(){return pt}};window.initCamera=()=>{lh(),bl()};requestAnimationFrame(Gr);function Qd(){window.gameDebug?(lh(),bl(),Ce.render(),window.Heroes?.refreshPortraits()):setTimeout(Qd,30)}Qd();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
