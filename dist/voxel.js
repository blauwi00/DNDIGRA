(()=>{var Ru=0,Ic=1,Iu=2;var ts=1,Pu=2,Js=3,Di=0,jt=1,Mn=2,Zn=0,$s=1,Pc=2,Lc=3,Dc=4,Lu=5;var ns=100,Du=101,Nu=102,Uu=103,Fu=104,Ou=200,Bu=201,ku=202,zu=203,Nc=204,Uc=205,Vu=206,Gu=207,Hu=208,Wu=209,Xu=210,qu=211,Yu=212,Zu=213,Ju=214,Ha=0,Wa=1,Xa=2,Ds=3,qa=4,Ya=5,Za=6,Ja=7,Fc=0,$u=1,Ku=2,Un=0,Oc=1,Bc=2,kc=3,Ks=4,zc=5,Vc=6,Gc=7;var Hc=300,Ni=301,is=302,wo=303,To=304,Gr=306,$a=1e3,xn=1001,Ka=1002,yt=1003,ju=1004;var Hr=1005;var Pt=1006,Eo=1007;var Ui=1008;var tn=1009,Wc=1010,Xc=1011,js=1012,Ao=1013,Fn=1014,Sn=1015,On=1016,Co=1017,Ro=1018,Qs=1020,qc=35902,Yc=35899,Zc=1021,Jc=1022,nn=1023,Xn=1026,Fi=1027,Io=1028,Po=1029,Oi=1030,Lo=1031;var Do=1033,Wr=33776,Xr=33777,qr=33778,Yr=33779,No=35840,Uo=35841,Fo=35842,Oo=35843,Bo=36196,ko=37492,zo=37496,Vo=37488,Go=37489,Zr=37490,Ho=37491,Wo=37808,Xo=37809,qo=37810,Yo=37811,Zo=37812,Jo=37813,$o=37814,Ko=37815,jo=37816,Qo=37817,el=37818,tl=37819,nl=37820,il=37821,sl=36492,rl=36494,al=36495,ol=36283,ll=36284,Jr=36285,cl=36286;var wr=2300,ja=2301,za=2302,vc=2303,Mc=2400,Sc=2401,bc=2402;var Qu=3200;var hl=0,ed=1,fi="",St="srgb",Tr="srgb-linear",Er="linear",st="srgb";var Va=7680;var td=519,nd=512,id=513,sd=514,ul=515,rd=516,ad=517,dl=518,od=519,$c=35044;var Kc="300 es",Rn=2e3,Ns=2001;function $f(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Kf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Us(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ld(){let n=Us("canvas");return n.style.display="block",n}var Zh={},Fs=null;function Ar(...n){let e="THREE."+n.shift();Fs?Fs("log",e,...n):console.log(e,...n)}function cd(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=cd(n);let e="THREE."+n.shift();if(Fs)Fs("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Oe(...n){n=cd(n);let e="THREE."+n.shift();if(Fs)Fs("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function $i(...n){let e=n.join(" ");e in Zh||(Zh[e]=!0,Ne(...n))}function hd(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var ud={[Ha]:Wa,[Xa]:Za,[qa]:Ja,[Ds]:Ya,[Wa]:Ha,[Za]:Xa,[Ja]:qa,[Ya]:Ds},qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jh=1234567,Sr=Math.PI/180,Os=180/Math.PI;function oi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function jc(n,e){return(n%e+e)%e}function jf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Qf(n,e,t){return n!==e?(t-n)/(e-n):0}function br(n,e,t){return(1-t)*n+t*e}function ep(n,e,t,i){return br(n,e,1-Math.exp(-t*i))}function tp(n,e=1){return e-Math.abs(jc(n,e*2)-e)}function np(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function ip(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function sp(n,e){return n+Math.floor(Math.random()*(e-n+1))}function rp(n,e){return n+Math.random()*(e-n)}function ap(n){return n*(.5-Math.random())}function op(n){n!==void 0&&(Jh=n);let e=Jh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lp(n){return n*Sr}function cp(n){return n*Os}function hp(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function up(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function dp(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function fp(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),d=a((e+i)/2),u=r((e-i)/2),h=a((e-i)/2),p=r((i-e)/2),x=a((i-e)/2);switch(s){case"XYX":n.set(o*d,l*u,l*h,o*c);break;case"YZY":n.set(l*h,o*d,l*u,o*c);break;case"ZXZ":n.set(l*u,l*h,o*d,o*c);break;case"XZX":n.set(o*d,l*x,l*p,o*c);break;case"YXY":n.set(l*p,o*d,l*x,o*c);break;case"ZYZ":n.set(l*x,l*p,o*d,o*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function at(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var dn={DEG2RAD:Sr,RAD2DEG:Os,generateUUID:oi,clamp:Ke,euclideanModulo:jc,mapLinear:jf,inverseLerp:Qf,lerp:br,damp:ep,pingpong:tp,smoothstep:np,smootherstep:ip,randInt:sp,randFloat:rp,randFloatSpread:ap,seededRandom:op,degToRad:lp,radToDeg:cp,isPowerOfTwo:hp,ceilPowerOfTwo:up,floorPowerOfTwo:dp,setQuaternionFromProperEuler:fp,normalize:at,denormalize:Cn},Ue=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_n=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3],h=r[a+0],p=r[a+1],x=r[a+2],g=r[a+3];if(u!==g||l!==h||c!==p||d!==x){let m=l*h+c*p+d*x+u*g;m<0&&(h=-h,p=-p,x=-x,g=-g,m=-m);let f=1-o;if(m<.9995){let v=Math.acos(m),A=Math.sin(v);f=Math.sin(f*v)/A,o=Math.sin(o*v)/A,l=l*f+h*o,c=c*f+p*o,d=d*f+x*o,u=u*f+g*o}else{l=l*f+h*o,c=c*f+p*o,d=d*f+x*o,u=u*f+g*o;let v=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=v,c*=v,d*=v,u*=v}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],u=r[a],h=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+d*u+l*p-c*h,e[t+1]=l*x+d*h+c*u-o*p,e[t+2]=c*x+d*p+o*h-l*u,e[t+3]=d*x-o*u-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),u=o(r/2),h=l(i/2),p=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*p*x,this._y=c*p*u-h*d*x,this._z=c*d*x+h*p*u,this._w=c*d*u-h*p*x;break;case"YXZ":this._x=h*d*u+c*p*x,this._y=c*p*u-h*d*x,this._z=c*d*x-h*p*u,this._w=c*d*u+h*p*x;break;case"ZXY":this._x=h*d*u-c*p*x,this._y=c*p*u+h*d*x,this._z=c*d*x+h*p*u,this._w=c*d*u-h*p*x;break;case"ZYX":this._x=h*d*u-c*p*x,this._y=c*p*u+h*d*x,this._z=c*d*x-h*p*u,this._w=c*d*u+h*p*x;break;case"YZX":this._x=h*d*u+c*p*x,this._y=c*p*u+h*d*x,this._z=c*d*x-h*p*u,this._w=c*d*u-h*p*x;break;case"XZY":this._x=h*d*u-c*p*x,this._y=c*p*u-h*d*x,this._z=c*d*x+h*p*u,this._w=c*d*u+h*p*x;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=i+o+u;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>u){let p=2*Math.sqrt(1+i-o-u);this._w=(d-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+d)/p}else{let p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-s*o,this._w=a*d-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($h.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($h.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*d,this.y=i+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kl.copy(this).projectOnVector(e),this.sub(Kl)}reflect(e){return this.sub(Kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kl=new k,$h=new _n,ke=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],p=i[5],x=i[8],g=s[0],m=s[3],f=s[6],v=s[1],A=s[4],S=s[7],T=s[2],E=s[5],R=s[8];return r[0]=a*g+o*v+l*T,r[3]=a*m+o*A+l*E,r[6]=a*f+o*S+l*R,r[1]=c*g+d*v+u*T,r[4]=c*m+d*A+u*E,r[7]=c*f+d*S+u*R,r[2]=h*g+p*v+x*T,r[5]=h*m+p*A+x*E,r[8]=h*f+p*S+x*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,p=c*r-a*l,x=t*u+i*h+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/x;return e[0]=u*g,e[1]=(s*c-d*i)*g,e[2]=(o*i-s*a)*g,e[3]=h*g,e[4]=(d*t-s*l)*g,e[5]=(s*r-o*t)*g,e[6]=p*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*r)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return $i("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jl.makeScale(e,t)),this}rotate(e){return $i("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jl.makeRotation(-e)),this}translate(e,t){return $i("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},jl=new ke,Kh=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jh=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pp(){let n={enabled:!0,workingColorSpace:Tr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===st&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(s.r=Ls(s.r),s.g=Ls(s.g),s.b=Ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?Er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return $i("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return $i("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Tr]:{primaries:e,whitePoint:i,transfer:Er,toXYZ:Kh,fromXYZ:jh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:e,whitePoint:i,transfer:st,toXYZ:Kh,fromXYZ:jh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:St}}}),n}var $e=pp();function li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ls(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var fs,Qa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{fs===void 0&&(fs=Us("canvas")),fs.width=e.width,fs.height=e.height;let s=fs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=fs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Us("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(li(t[i]/255)*255):t[i]=li(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},mp=0,Bs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ql(s[a].image)):r.push(Ql(s[a]))}else r=Ql(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Ql(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qa.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var gp=0,ec=new k,Wt=class n extends qn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=xn,s=xn,r=Pt,a=Ui,o=nn,l=tn,c=n.DEFAULT_ANISOTROPY,d=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=oi(),this.name="",this.source=new Bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ec).x}get height(){return this.source.getSize(ec).y}get depth(){return this.source.getSize(ec).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $a:e.x=e.x-Math.floor(e.x);break;case xn:e.x=e.x<0?0:1;break;case Ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $a:e.y=e.y-Math.floor(e.y);break;case xn:e.y=e.y<0?0:1;break;case Ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Hc;Wt.DEFAULT_ANISOTROPY=1;var vt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],p=l[5],x=l[9],g=l[2],m=l[6],f=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+g)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,S=(p+1)/2,T=(f+1)/2,E=(d+h)/4,R=(u+g)/4,y=(x+m)/4;return A>S&&A>T?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=E/i,r=R/i):S>T?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=E/s,r=y/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=R/r,s=y/r),this.set(i,s,r,t),this}let v=Math.sqrt((m-x)*(m-x)+(u-g)*(u-g)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(m-x)/v,this.y=(u-g)/v,this.z=(h-d)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},eo=class extends qn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Wt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Bs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xt=class extends eo{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Cr=class extends Wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var to=class extends Wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var We=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,d,u,h,p,x,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,d,u,h,p,x,g,m)}set(e,t,i,s,r,a,o,l,c,d,u,h,p,x,g,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=u,f[14]=h,f[3]=p,f[7]=x,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/ps.setFromMatrixColumn(e,0).length(),r=1/ps.setFromMatrixColumn(e,1).length(),a=1/ps.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let h=a*d,p=a*u,x=o*d,g=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=p+x*c,t[5]=h-g*c,t[9]=-o*l,t[2]=g-h*c,t[6]=x+p*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*d,p=l*u,x=c*d,g=c*u;t[0]=h+g*o,t[4]=x*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-x,t[6]=g+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*d,p=l*u,x=c*d,g=c*u;t[0]=h-g*o,t[4]=-a*u,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*d,t[9]=g-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*d,p=a*u,x=o*d,g=o*u;t[0]=l*d,t[4]=x*c-p,t[8]=h*c+g,t[1]=l*u,t[5]=g*c+h,t[9]=p*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,p=a*c,x=o*l,g=o*c;t[0]=l*d,t[4]=g-h*u,t[8]=x*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*u+x,t[10]=h-g*u}else if(e.order==="XZY"){let h=a*l,p=a*c,x=o*l,g=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+g,t[5]=a*d,t[9]=p*u-x,t[2]=x*u-p,t[6]=o*d,t[10]=g*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xp,e,_p)}lookAt(e,t,i){let s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),wi.crossVectors(i,rn),wi.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),wi.crossVectors(i,rn)),wi.normalize(),fa.crossVectors(rn,wi),s[0]=wi.x,s[4]=fa.x,s[8]=rn.x,s[1]=wi.y,s[5]=fa.y,s[9]=rn.y,s[2]=wi.z,s[6]=fa.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],p=i[13],x=i[2],g=i[6],m=i[10],f=i[14],v=i[3],A=i[7],S=i[11],T=i[15],E=s[0],R=s[4],y=s[8],w=s[12],L=s[1],C=s[5],I=s[9],U=s[13],P=s[2],z=s[6],H=s[10],G=s[14],J=s[3],Z=s[7],Q=s[11],ie=s[15];return r[0]=a*E+o*L+l*P+c*J,r[4]=a*R+o*C+l*z+c*Z,r[8]=a*y+o*I+l*H+c*Q,r[12]=a*w+o*U+l*G+c*ie,r[1]=d*E+u*L+h*P+p*J,r[5]=d*R+u*C+h*z+p*Z,r[9]=d*y+u*I+h*H+p*Q,r[13]=d*w+u*U+h*G+p*ie,r[2]=x*E+g*L+m*P+f*J,r[6]=x*R+g*C+m*z+f*Z,r[10]=x*y+g*I+m*H+f*Q,r[14]=x*w+g*U+m*G+f*ie,r[3]=v*E+A*L+S*P+T*J,r[7]=v*R+A*C+S*z+T*Z,r[11]=v*y+A*I+S*H+T*Q,r[15]=v*w+A*U+S*G+T*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],p=e[14],x=e[3],g=e[7],m=e[11],f=e[15],v=l*p-c*h,A=o*p-c*u,S=o*h-l*u,T=a*p-c*d,E=a*h-l*d,R=a*u-o*d;return t*(g*v-m*A+f*S)-i*(x*v-m*T+f*E)+s*(x*A-g*T+f*R)-r*(x*S-g*E+m*R)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],p=e[11],x=e[12],g=e[13],m=e[14],f=e[15],v=t*o-i*a,A=t*l-s*a,S=t*c-r*a,T=i*l-s*o,E=i*c-r*o,R=s*c-r*l,y=d*g-u*x,w=d*m-h*x,L=d*f-p*x,C=u*m-h*g,I=u*f-p*g,U=h*f-p*m,P=v*U-A*I+S*C+T*L-E*w+R*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/P;return e[0]=(o*U-l*I+c*C)*z,e[1]=(s*I-i*U-r*C)*z,e[2]=(g*R-m*E+f*T)*z,e[3]=(h*E-u*R-p*T)*z,e[4]=(l*L-a*U-c*w)*z,e[5]=(t*U-s*L+r*w)*z,e[6]=(m*S-x*R-f*A)*z,e[7]=(d*R-h*S+p*A)*z,e[8]=(a*I-o*L+c*y)*z,e[9]=(i*L-t*I-r*y)*z,e[10]=(x*E-g*S+f*v)*z,e[11]=(u*S-d*E-p*v)*z,e[12]=(o*w-a*C-l*y)*z,e[13]=(t*C-i*w+s*y)*z,e[14]=(g*A-x*T-m*v)*z,e[15]=(d*T-u*A+h*v)*z,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,p=r*d,x=r*u,g=a*d,m=a*u,f=o*u,v=l*c,A=l*d,S=l*u,T=i.x,E=i.y,R=i.z;return s[0]=(1-(g+f))*T,s[1]=(p+S)*T,s[2]=(x-A)*T,s[3]=0,s[4]=(p-S)*E,s[5]=(1-(h+f))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(x+A)*R,s[9]=(m-v)*R,s[10]=(1-(h+g))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ps.set(s[0],s[1],s[2]).length(),o=ps.set(s[4],s[5],s[6]).length(),l=ps.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Tn.copy(this);let c=1/a,d=1/o,u=1/l;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=d,Tn.elements[5]*=d,Tn.elements[6]*=d,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Rn,l=!1){let c=this.elements,d=2*r/(t-e),u=2*r/(i-s),h=(t+e)/(t-e),p=(i+s)/(i-s),x,g;if(l)x=r/(a-r),g=a*r/(a-r);else if(o===Rn)x=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ns)x=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Rn,l=!1){let c=this.elements,d=2/(t-e),u=2/(i-s),h=-(t+e)/(t-e),p=-(i+s)/(i-s),x,g;if(l)x=1/(a-r),g=a/(a-r);else if(o===Rn)x=-2/(a-r),g=-(a+r)/(a-r);else if(o===Ns)x=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ps=new k,Tn=new We,xp=new k(0,0,0),_p=new k(1,1,1),wi=new k,fa=new k,rn=new k,Qh=new We,eu=new _n,ci=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Qh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return eu.setFromEuler(this),this.setFromQuaternion(eu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ci.DEFAULT_ORDER="XYZ";var ks=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},yp=0,tu=new k,ms=new _n,ti=new We,pa=new k,dr=new k,vp=new k,Mp=new _n,nu=new k(1,0,0),iu=new k(0,1,0),su=new k(0,0,1),ru={type:"added"},Sp={type:"removed"},gs={type:"childadded",child:null},tc={type:"childremoved",child:null},Lt=class n extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new k,t=new ci,i=new _n,s=new k(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new ke}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ks,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.multiply(ms),this}rotateOnWorldAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.premultiply(ms),this}rotateX(e){return this.rotateOnAxis(nu,e)}rotateY(e){return this.rotateOnAxis(iu,e)}rotateZ(e){return this.rotateOnAxis(su,e)}translateOnAxis(e,t){return tu.copy(e).applyQuaternion(this.quaternion),this.position.add(tu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nu,e)}translateY(e){return this.translateOnAxis(iu,e)}translateZ(e){return this.translateOnAxis(su,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?pa.copy(e):pa.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(dr,pa,this.up):ti.lookAt(pa,dr,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(ti),this.quaternion.premultiply(ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ru),gs.child=e,this.dispatchEvent(gs),gs.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sp),tc.child=e,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ru),gs.child=e,this.dispatchEvent(gs),gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,e,vp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,Mp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Lt.DEFAULT_UP=new k(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var qe=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},bp={type:"move"},zs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let g of e.hand.values()){let m=t.getJointPose(g,i),f=this._getHandJoint(c,g);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),p=.02,x=.005;c.inputState.pinching&&h>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new qe;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},ma={h:0,s:0,l:0};function nc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Le=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=jc(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=nc(a,r,e+1/3),this.g=nc(a,r,e),this.b=nc(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=St){function i(r){r!==void 0&&parseFloat(r)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){let i=dd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return $e.workingToColorSpace(Gt.copy(this),e),Math.round(Ke(Gt.r*255,0,255))*65536+Math.round(Ke(Gt.g*255,0,255))*256+Math.round(Ke(Gt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Gt.copy(this),t);let i=Gt.r,s=Gt.g,r=Gt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=St){$e.workingToColorSpace(Gt.copy(this),e);let t=Gt.r,i=Gt.g,s=Gt.b;return e!==St?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+t,Ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ti),e.getHSL(ma);let i=br(Ti.h,ma.h,t),s=br(Ti.s,ma.s,t),r=br(Ti.l,ma.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Gt=new Le;Le.NAMES=dd;var In=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new k,ni=new k,ic=new k,ii=new k,xs=new k,_s=new k,au=new k,sc=new k,rc=new k,ac=new k,oc=new vt,lc=new vt,cc=new vt,ai=class n{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){En.subVectors(s,t),ni.subVectors(i,t),ic.subVectors(e,t);let a=En.dot(En),o=En.dot(ni),l=En.dot(ic),c=ni.dot(ni),d=ni.dot(ic),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let h=1/u,p=(c*l-o*d)*h,x=(a*d-o*l)*h;return r.set(1-p-x,x,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ii.x),l.addScaledVector(a,ii.y),l.addScaledVector(o,ii.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return oc.setScalar(0),lc.setScalar(0),cc.setScalar(0),oc.fromBufferAttribute(e,t),lc.fromBufferAttribute(e,i),cc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(oc,r.x),a.addScaledVector(lc,r.y),a.addScaledVector(cc,r.z),a}static isFrontFacing(e,t,i,s){return En.subVectors(i,t),ni.subVectors(e,t),En.cross(ni).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),En.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;xs.subVectors(s,i),_s.subVectors(r,i),sc.subVectors(e,i);let l=xs.dot(sc),c=_s.dot(sc);if(l<=0&&c<=0)return t.copy(i);rc.subVectors(e,s);let d=xs.dot(rc),u=_s.dot(rc);if(d>=0&&u<=d)return t.copy(s);let h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(xs,a);ac.subVectors(e,r);let p=xs.dot(ac),x=_s.dot(ac);if(x>=0&&p<=x)return t.copy(r);let g=p*c-l*x;if(g<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(i).addScaledVector(_s,o);let m=d*x-p*u;if(m<=0&&u-d>=0&&p-x>=0)return au.subVectors(r,s),o=(u-d)/(u-d+(p-x)),t.copy(s).addScaledVector(au,o);let f=1/(m+g+h);return a=g*f,o=h*f,t.copy(i).addScaledVector(xs,a).addScaledVector(_s,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ln=class{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ga.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ga.copy(i.boundingBox)),ga.applyMatrix4(e.matrixWorld),this.union(ga)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fr),xa.subVectors(this.max,fr),ys.subVectors(e.a,fr),vs.subVectors(e.b,fr),Ms.subVectors(e.c,fr),Ei.subVectors(vs,ys),Ai.subVectors(Ms,vs),qi.subVectors(ys,Ms);let t=[0,-Ei.z,Ei.y,0,-Ai.z,Ai.y,0,-qi.z,qi.y,Ei.z,0,-Ei.x,Ai.z,0,-Ai.x,qi.z,0,-qi.x,-Ei.y,Ei.x,0,-Ai.y,Ai.x,0,-qi.y,qi.x,0];return!hc(t,ys,vs,Ms,xa)||(t=[1,0,0,0,1,0,0,0,1],!hc(t,ys,vs,Ms,xa))?!1:(_a.crossVectors(Ei,Ai),t=[_a.x,_a.y,_a.z],hc(t,ys,vs,Ms,xa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},si=[new k,new k,new k,new k,new k,new k,new k,new k],An=new k,ga=new ln,ys=new k,vs=new k,Ms=new k,Ei=new k,Ai=new k,qi=new k,fr=new k,xa=new k,_a=new k,Yi=new k;function hc(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Yi.fromArray(n,r);let o=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),l=e.dot(Yi),c=t.dot(Yi),d=i.dot(Yi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var It=new k,ya=new Ue,wp=0,Ht=class extends qn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$c,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ya.fromBufferAttribute(this,t),ya.applyMatrix3(e),this.setXY(t,ya.x,ya.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Cn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Rr=class extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Ir=class extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var _t=class extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}},Tp=new ln,pr=new k,uc=new k,Yn=class{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Tp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);let t=pr.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(pr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(uc)),this.expandByPoint(pr.copy(e.center).sub(uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ep=0,gn=new We,dc=new Lt,Ss=new k,an=new ln,mr=new ln,Ft=new k,At=class n extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($f(e)?Ir:Rr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,i){return gn.makeTranslation(e,t,i),this.applyMatrix4(gn),this}scale(e,t,i){return gn.makeScale(e,t,i),this.applyMatrix4(gn),this}lookAt(e){return dc.lookAt(e),dc.updateMatrix(),this.applyMatrix4(dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){let i=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(an.min,mr.min),an.expandByPoint(Ft),Ft.addVectors(an.max,mr.max),an.expandByPoint(Ft)):(an.expandByPoint(mr.min),an.expandByPoint(mr.max))}an.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ft));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Ft.fromBufferAttribute(o,c),l&&(Ss.fromBufferAttribute(e,c),Ft.add(Ss)),s=Math.max(s,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ht(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new k,l[y]=new k;let c=new k,d=new k,u=new k,h=new Ue,p=new Ue,x=new Ue,g=new k,m=new k;function f(y,w,L){c.fromBufferAttribute(i,y),d.fromBufferAttribute(i,w),u.fromBufferAttribute(i,L),h.fromBufferAttribute(r,y),p.fromBufferAttribute(r,w),x.fromBufferAttribute(r,L),d.sub(c),u.sub(c),p.sub(h),x.sub(h);let C=1/(p.x*x.y-x.x*p.y);isFinite(C)&&(g.copy(d).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(C),o[y].add(g),o[w].add(g),o[L].add(g),l[y].add(m),l[w].add(m),l[L].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let y=0,w=v.length;y<w;++y){let L=v[y],C=L.start,I=L.count;for(let U=C,P=C+I;U<P;U+=3)f(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let A=new k,S=new k,T=new k,E=new k;function R(y){T.fromBufferAttribute(s,y),E.copy(T);let w=o[y];A.copy(w),A.sub(T.multiplyScalar(T.dot(w))).normalize(),S.crossVectors(E,w);let C=S.dot(l[y])<0?-1:1;a.setXYZW(y,A.x,A.y,A.z,C)}for(let y=0,w=v.length;y<w;++y){let L=v[y],C=L.start,I=L.count;for(let U=C,P=C+I;U<P;U+=3)R(e.getX(U+0)),R(e.getX(U+1)),R(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let s=new k,r=new k,a=new k,o=new k,l=new k,c=new k,d=new k,u=new k;if(e)for(let h=0,p=e.count;h<p;h+=3){let x=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d),p=0,x=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*d;for(let f=0;f<d;f++)h[x++]=c[p++]}return new Ht(h,d,u)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){let h=c[d],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){let p=c[u];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],u=r[c];for(let h=0,p=u.length;h<p;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},no=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$c,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Zt=new k,Pr=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Cn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ar("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ar("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},fc=new k,Ap=new k,Cp=new ke,on=class{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=fc.subVectors(i,t).cross(Ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(fc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Cp.getNormalMatrix(e),s=this.coplanarPoint(fc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rp=0,Pn=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=$s,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nc,this.blendDst=Uc,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=td,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Va,this.stencilZFail=Va,this.stencilZPass=Va,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Le().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new on().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ue().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Vs=class extends Pn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},bs,gr=new k,ws=new k,Ts=new k,Es=new Ue,xr=new Ue,fd=new We,va=new k,_r=new k,Ma=new k,ou=new Ue,pc=new Ue,lu=new Ue,Lr=class extends Lt{constructor(e=new Vs){if(super(),this.isSprite=!0,this.type="Sprite",bs===void 0){bs=new At;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new no(t,5);bs.setIndex([0,1,2,0,2,3]),bs.setAttribute("position",new Pr(i,3,0,!1)),bs.setAttribute("uv",new Pr(i,2,3,!1))}this.geometry=bs,this.material=e,this.center=new Ue(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Oe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ws.setFromMatrixScale(this.matrixWorld),fd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ts.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ws.multiplyScalar(-Ts.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;Sa(va.set(-.5,-.5,0),Ts,a,ws,s,r),Sa(_r.set(.5,-.5,0),Ts,a,ws,s,r),Sa(Ma.set(.5,.5,0),Ts,a,ws,s,r),ou.set(0,0),pc.set(1,0),lu.set(1,1);let o=e.ray.intersectTriangle(va,_r,Ma,!1,gr);if(o===null&&(Sa(_r.set(-.5,.5,0),Ts,a,ws,s,r),pc.set(0,1),o=e.ray.intersectTriangle(va,Ma,_r,!1,gr),o===null))return;let l=e.ray.origin.distanceTo(gr);l<e.near||l>e.far||t.push({distance:l,point:gr.clone(),uv:ai.getInterpolation(gr,va,_r,Ma,ou,pc,lu,new Ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Sa(n,e,t,i,s,r){Es.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(xr.x=r*Es.x-s*Es.y,xr.y=s*Es.x+r*Es.y):xr.copy(Es),n.copy(e),n.x+=xr.x,n.y+=xr.y,n.applyMatrix4(fd)}var ri=new k,mc=new k,ba=new k,wa=new k,Ki=class{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){mc.copy(e).add(t).multiplyScalar(.5),ba.copy(t).sub(e).normalize(),wa.copy(this.origin).sub(mc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ba),o=wa.dot(this.direction),l=-wa.dot(ba),c=wa.lengthSq(),d=Math.abs(1-a*a),u,h,p,x;if(d>0)if(u=a*l-o,h=a*o-l,x=r*d,u>=0)if(h>=-x)if(h<=x){let g=1/d;u*=g,h*=g,p=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h<=-x?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+h*(h+2*l)+c):h<=x?(u=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(mc).addScaledVector(ba,h),p}intersectSphere(e,t){if(e.radius<0)return null;ri.subVectors(e.center,this.origin);let i=ri.dot(this.direction),s=ri.dot(ri)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,u=e.x-a.x,h=e.y-a.y,p=e.z-a.z,x=t.x-a.x,g=t.y-a.y,m=t.z-a.z,f=i.x-a.x,v=i.y-a.y,A=i.z-a.z,S=Math.abs(l),T=Math.abs(c),E=Math.abs(d),R,y,w,L,C,I,U,P,z,H,G,J;if(S>=T&&S>=E?(w=l,I=u,z=x,J=f,l>=0?(R=c,y=d,L=h,C=p,U=g,P=m,H=v,G=A):(R=d,y=c,L=p,C=h,U=m,P=g,H=A,G=v)):T>=E?(w=c,I=h,z=g,J=v,c>=0?(R=d,y=l,L=p,C=u,U=m,P=x,H=A,G=f):(R=l,y=d,L=u,C=p,U=x,P=m,H=f,G=A)):(w=d,I=p,z=m,J=A,d>=0?(R=l,y=c,L=u,C=h,U=x,P=g,H=f,G=v):(R=c,y=l,L=h,C=u,U=g,P=x,H=v,G=f)),w===0)return null;let Z=R/w,Q=y/w,ie=1/w,Ie=L-Z*I,Ee=C-Q*I,ot=U-Z*z,Je=P-Q*z,Ye=H-Z*J,j=G-Q*J,ne=Ye*Je-j*ot,pe=Ie*j-Ee*Ye,De=ot*Ee-Je*Ie;if(s){if(ne<0||pe<0||De<0)return null}else if((ne<0||pe<0||De<0)&&(ne>0||pe>0||De>0))return null;let ve=ne+pe+De;if(ve===0)return null;let Ve=ie*(ne*I+pe*z+De*J);return(ve>0?Ve<0:Ve>0)?null:this.at(Ve/ve,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ln=class extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},cu=new We,Zi=new Ki,Ta=new Yn,hu=new k,Ea=new k,Aa=new k,Ca=new k,gc=new k,Ra=new k,uu=new k,Ia=new k,je=class extends Lt{constructor(e=new At,t=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ra.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],u=r[l];d!==0&&(gc.fromBufferAttribute(u,e),a?Ra.addScaledVector(gc,d):Ra.addScaledVector(gc.sub(t),d))}t.add(Ra)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ta.copy(i.boundingSphere),Ta.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(Ta.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(Ta,hu)===null||Zi.origin.distanceToSquared(hu)>(e.far-e.near)**2))&&(cu.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(cu),!(i.boundingBox!==null&&Zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=h.length;x<g;x++){let m=h[x],f=a[m.materialIndex],v=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,T=A;S<T;S+=3){let E=o.getX(S),R=o.getX(S+1),y=o.getX(S+2);s=Pa(this,f,e,i,c,d,u,E,R,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=x,f=g;m<f;m+=3){let v=o.getX(m),A=o.getX(m+1),S=o.getX(m+2);s=Pa(this,a,e,i,c,d,u,v,A,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,g=h.length;x<g;x++){let m=h[x],f=a[m.materialIndex],v=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,T=A;S<T;S+=3){let E=S,R=S+1,y=S+2;s=Pa(this,f,e,i,c,d,u,E,R,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=x,f=g;m<f;m+=3){let v=m,A=m+1,S=m+2;s=Pa(this,a,e,i,c,d,u,v,A,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Ip(n,e,t,i,s,r,a,o){let l;if(e.side===jt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Di,o),l===null)return null;Ia.copy(o),Ia.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Ia);return c<t.near||c>t.far?null:{distance:c,point:Ia.clone(),object:n}}function Pa(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Ea),n.getVertexPosition(l,Aa),n.getVertexPosition(c,Ca);let d=Ip(n,e,t,i,Ea,Aa,Ca,uu);if(d){let u=new k;ai.getBarycoord(uu,Ea,Aa,Ca,u),s&&(d.uv=ai.getInterpolatedAttribute(s,o,l,c,u,new Ue)),r&&(d.uv1=ai.getInterpolatedAttribute(r,o,l,c,u,new Ue)),a&&(d.normal=ai.getInterpolatedAttribute(a,o,l,c,u,new k),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new k,materialIndex:0};ai.getNormal(Ea,Aa,Ca,h.normal),d.face=h,d.barycoord=u}return d}var ji=class extends Wt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=yt,d=yt,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dr=class extends Ht{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},As=new We,du=new We,La=[],fu=new ln,Pp=new We,yr=new je,vr=new Yn,cn=class extends je{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Pp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,As),fu.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(fu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,As),vr.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(yr.geometry=this.geometry,yr.material=this.material,yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vr.copy(this.boundingSphere),vr.applyMatrix4(i),e.ray.intersectsSphere(vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,As),du.multiplyMatrices(i,As),yr.matrixWorld=du,yr.raycast(e,La);for(let a=0,o=La.length;a<o;a++){let l=La[a];l.instanceId=r,l.object=this,t.push(l)}La.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Dr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ji(new Float32Array(s*this.count),s,this.count,Io,Sn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ji=new Yn,Lp=new Ue(.5,.5),Da=new k,Gs=class{constructor(e=new on,t=new on,i=new on,s=new on,r=new on,a=new on){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Rn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],p=r[7],x=r[8],g=r[9],m=r[10],f=r[11],v=r[12],A=r[13],S=r[14],T=r[15];if(s[0].setComponents(c-a,p-d,f-x,T-v).normalize(),s[1].setComponents(c+a,p+d,f+x,T+v).normalize(),s[2].setComponents(c+o,p+u,f+g,T+A).normalize(),s[3].setComponents(c-o,p-u,f-g,T-A).normalize(),i)s[4].setComponents(l,h,m,S).normalize(),s[5].setComponents(c-l,p-h,f-m,T-S).normalize();else if(s[4].setComponents(c-l,p-h,f-m,T-S).normalize(),t===Rn)s[5].setComponents(c+l,p+h,f+m,T+S).normalize();else if(t===Ns)s[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);let t=Lp.distanceTo(e.center);return Ji.radius=.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Da.x=s.normal.x>0?e.max.x:e.min.x,Da.y=s.normal.y>0?e.max.y:e.min.y,Da.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Da)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Qi=class extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},io=new k,so=new k,pu=new We,Mr=new Ki,Na=new Yn,xc=new k,mu=new k,Hs=class extends Lt{constructor(e=new At,t=new Qi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)io.fromBufferAttribute(t,s-1),so.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=io.distanceTo(so);e.setAttribute("lineDistance",new _t(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Na.copy(i.boundingSphere),Na.applyMatrix4(s),Na.radius+=r,e.ray.intersectsSphere(Na)===!1)return;pu.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(pu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){let p=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let g=p,m=x-1;g<m;g+=c){let f=d.getX(g),v=d.getX(g+1),A=Ua(this,e,Mr,l,f,v,g);A&&t.push(A)}if(this.isLineLoop){let g=d.getX(x-1),m=d.getX(p),f=Ua(this,e,Mr,l,g,m,x-1);f&&t.push(f)}}else{let p=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let g=p,m=x-1;g<m;g+=c){let f=Ua(this,e,Mr,l,g,g+1,g);f&&t.push(f)}if(this.isLineLoop){let g=Ua(this,e,Mr,l,x-1,p,x-1);g&&t.push(g)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ua(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(io.fromBufferAttribute(o,s),so.fromBufferAttribute(o,r),t.distanceSqToSegment(io,so,xc,mu)>i)return;xc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(xc);if(!(c<e.near||c>e.far))return{distance:c,point:mu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var gu=new k,xu=new k,ro=class extends Hs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)gu.fromBufferAttribute(t,s),xu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+gu.distanceTo(xu);e.setAttribute("lineDistance",new _t(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ws=class extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},_u=new We,wc=new Ki,Fa=new Yn,Oa=new k,Nr=class extends Lt{constructor(e=new At,t=new Ws){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fa.copy(i.boundingSphere),Fa.applyMatrix4(s),Fa.radius+=r,e.ray.intersectsSphere(Fa)===!1)return;_u.copy(s).invert(),wc.copy(e.ray).applyMatrix4(_u);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let x=h,g=p;x<g;x++){let m=c.getX(x);Oa.fromBufferAttribute(u,m),yu(Oa,m,l,s,e,t,this)}}else{let h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=h,g=p;x<g;x++)Oa.fromBufferAttribute(u,x),yu(Oa,x,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function yu(n,e,t,i,s,r,a){let o=wc.distanceSqToPoint(n);if(o<t){let l=new k;wc.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ur=class extends Wt{constructor(e=[],t=Ni,i,s,r,a,o,l,c,d){super(e,t,i,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dn=class extends Wt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ri=class extends Wt{constructor(e,t,i=Fn,s,r,a,o=yt,l=yt,c,d=Xn,u=1){if(d!==Xn&&d!==Fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ao=class extends Ri{constructor(e,t=Fn,i=Ni,s,r,a=yt,o=yt,l,c=Xn){let d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Fr=class extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},yn=class n extends At{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],u=[],h=0,p=0;x("z","y","x",-1,-1,i,t,e,a,r,0),x("z","y","x",1,-1,i,t,-e,a,r,1),x("x","z","y",1,1,e,i,t,s,a,2),x("x","z","y",1,-1,e,i,-t,s,a,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(u,2));function x(g,m,f,v,A,S,T,E,R,y,w){let L=S/R,C=T/y,I=S/2,U=T/2,P=E/2,z=R+1,H=y+1,G=0,J=0,Z=new k;for(let Q=0;Q<H;Q++){let ie=Q*C-U;for(let Ie=0;Ie<z;Ie++){let Ee=Ie*L-I;Z[g]=Ee*v,Z[m]=ie*A,Z[f]=P,c.push(Z.x,Z.y,Z.z),Z[g]=0,Z[m]=0,Z[f]=E>0?1:-1,d.push(Z.x,Z.y,Z.z),u.push(Ie/R),u.push(1-Q/y),G+=1}}for(let Q=0;Q<y;Q++)for(let ie=0;ie<R;ie++){let Ie=h+ie+z*Q,Ee=h+ie+z*(Q+1),ot=h+(ie+1)+z*(Q+1),Je=h+(ie+1)+z*Q;l.push(Ie,Ee,Je),l.push(Ee,ot,Je),J+=6}o.addGroup(p,J,w),p+=J,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Nn=class n extends At{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let d=[],u=[],h=[],p=[],x=0,g=[],m=i/2,f=0;v(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(d),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(p,2));function v(){let S=new k,T=new k,E=0,R=(t-e)/i;for(let y=0;y<=r;y++){let w=[],L=y/r,C=L*(t-e)+e;for(let I=0;I<=s;I++){let U=I/s,P=U*l+o,z=Math.sin(P),H=Math.cos(P);T.x=C*z,T.y=-L*i+m,T.z=C*H,u.push(T.x,T.y,T.z),S.set(z,R,H).normalize(),h.push(S.x,S.y,S.z),p.push(U,1-L),w.push(x++)}g.push(w)}for(let y=0;y<s;y++)for(let w=0;w<r;w++){let L=g[w][y],C=g[w+1][y],I=g[w+1][y+1],U=g[w][y+1];(e>0||w!==0)&&(d.push(L,C,U),E+=3),(t>0||w!==r-1)&&(d.push(C,I,U),E+=3)}c.addGroup(f,E,0),f+=E}function A(S){let T=x,E=new Ue,R=new k,y=0,w=S===!0?e:t,L=S===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*L,0),h.push(0,L,0),p.push(.5,.5),x++;let C=x;for(let I=0;I<=s;I++){let P=I/s*l+o,z=Math.cos(P),H=Math.sin(P);R.x=w*H,R.y=m*L,R.z=w*z,u.push(R.x,R.y,R.z),h.push(0,L,0),E.x=z*.5+.5,E.y=H*.5*L+.5,p.push(E.x,E.y),x++}for(let I=0;I<s;I++){let U=T+I,P=C+I;S===!0?d.push(P,P+1,U):d.push(P+1,P,U),y+=3}c.addGroup(f,y,S===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var oo=class n extends At{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],a=[];o(s),c(i),d(),this.setAttribute("position",new _t(r,3)),this.setAttribute("normal",new _t(r.slice(),3)),this.setAttribute("uv",new _t(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let A=new k,S=new k,T=new k;for(let E=0;E<t.length;E+=3)p(t[E+0],A),p(t[E+1],S),p(t[E+2],T),l(A,S,T,v)}function l(v,A,S,T){let E=T+1,R=[];for(let y=0;y<=E;y++){R[y]=[];let w=v.clone().lerp(S,y/E),L=A.clone().lerp(S,y/E),C=E-y;for(let I=0;I<=C;I++)I===0&&y===E?R[y][I]=w:R[y][I]=w.clone().lerp(L,I/C)}for(let y=0;y<E;y++)for(let w=0;w<2*(E-y)-1;w++){let L=Math.floor(w/2);w%2===0?(h(R[y][L+1]),h(R[y+1][L]),h(R[y][L])):(h(R[y][L+1]),h(R[y+1][L+1]),h(R[y+1][L]))}}function c(v){let A=new k;for(let S=0;S<r.length;S+=3)A.x=r[S+0],A.y=r[S+1],A.z=r[S+2],A.normalize().multiplyScalar(v),r[S+0]=A.x,r[S+1]=A.y,r[S+2]=A.z}function d(){let v=new k;for(let A=0;A<r.length;A+=3){v.x=r[A+0],v.y=r[A+1],v.z=r[A+2];let S=m(v)/2/Math.PI+.5,T=f(v)/Math.PI+.5;a.push(S,1-T)}x(),u()}function u(){for(let v=0;v<a.length;v+=6){let A=a[v+0],S=a[v+2],T=a[v+4],E=Math.max(A,S,T),R=Math.min(A,S,T);E>.9&&R<.1&&(A<.2&&(a[v+0]+=1),S<.2&&(a[v+2]+=1),T<.2&&(a[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function p(v,A){let S=v*3;A.x=e[S+0],A.y=e[S+1],A.z=e[S+2]}function x(){let v=new k,A=new k,S=new k,T=new k,E=new Ue,R=new Ue,y=new Ue;for(let w=0,L=0;w<r.length;w+=9,L+=6){v.set(r[w+0],r[w+1],r[w+2]),A.set(r[w+3],r[w+4],r[w+5]),S.set(r[w+6],r[w+7],r[w+8]),E.set(a[L+0],a[L+1]),R.set(a[L+2],a[L+3]),y.set(a[L+4],a[L+5]),T.copy(v).add(A).add(S).divideScalar(3);let C=m(T);g(E,L+0,v,C),g(R,L+2,A,C),g(y,L+4,S,C)}}function g(v,A,S,T){T<0&&v.x===1&&(a[A]=v.x-1),S.x===0&&S.z===0&&(a[A]=T/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Xs=class n extends oo{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},vn=class n extends At{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,p=[],x=[],g=[],m=[];for(let f=0;f<d;f++){let v=f*h-a;for(let A=0;A<c;A++){let S=A*u-r;x.push(S,-v,0),g.push(0,0,1),m.push(A/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){let A=v+c*f,S=v+c*(f+1),T=v+1+c*(f+1),E=v+1+c*f;p.push(A,S,E),p.push(S,T,E)}this.setIndex(p),this.setAttribute("position",new _t(x,3)),this.setAttribute("normal",new _t(g,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var qs=class n extends At{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],d=[],u=[],h=new k,p=new k,x=new k;for(let g=0;g<=i;g++){let m=a+g/i*o;for(let f=0;f<=s;f++){let v=f/s*r;p.x=(e+t*Math.cos(m))*Math.cos(v),p.y=(e+t*Math.cos(m))*Math.sin(v),p.z=t*Math.sin(m),c.push(p.x,p.y,p.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),x.subVectors(p,h).normalize(),d.push(x.x,x.y,x.z),u.push(f/s),u.push(g/i)}}for(let g=1;g<=i;g++)for(let m=1;m<=s;m++){let f=(s+1)*g+m-1,v=(s+1)*(g-1)+m-1,A=(s+1)*(g-1)+m,S=(s+1)*g+m;l.push(f,v,S),l.push(v,A,S)}this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function ss(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(vu(s))s.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(vu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function qt(n){let e={};for(let t=0;t<n.length;t++){let i=ss(n[t]);for(let s in i)e[s]=i[s]}return e}function vu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Dp(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}var pd={clone:ss,merge:qt},Np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Up=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$t=class extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Np,this.fragmentShader=Up,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=Dp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Le().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ue().fromArray(s.value);break;case"v3":this.uniforms[i].value=new k().fromArray(s.value);break;case"v4":this.uniforms[i].value=new vt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new We().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},lo=class extends $t{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Kt=class extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hl,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var co=class extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ho=class extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Cs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function _c(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Ii=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},uo=class extends Ii{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mc,endingEnd:Mc}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Sc:r=e,o=2*t-i;break;case bc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Sc:a=e,l=2*i-t;break;case bc:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,p=this._weightNext,x=(i-t)/(s-t),g=x*x,m=g*x,f=-h*m+2*h*g-h*x,v=(1+h)*m+(-1.5-2*h)*g+(-.5+h)*x+1,A=(-1-p)*m+(1.5+p)*g+.5*x,S=p*m-p*g;for(let T=0;T!==o;++T)r[T]=f*a[d+T]+v*a[c+T]+A*a[l+T]+S*a[u+T];return r}},fo=class extends Ii{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(i-t)/(s-t),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}},po=class extends Ii{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},mo=class extends Ii{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.inTangents,u=this.outTangents;if(!d||!u){let x=(i-t)/(s-t),g=1-x;for(let m=0;m!==o;++m)r[m]=a[c+m]*g+a[l+m]*x;return r}let h=o*2,p=e-1;for(let x=0;x!==o;++x){let g=a[c+x],m=a[l+x],f=p*h+x*2,v=u[f],A=u[f+1],S=e*h+x*2,T=d[S],E=d[S+1],R=Op(i,t,v,T,s);r[x]=md(R,g,A,E,m)}return r}};function md(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Fp(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Op(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=md(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Fp(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var hn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Cs(t,this.TimeBufferType),this.values=Cs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Cs(e.times,Array),values:Cs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),_c(e.settings)&&(i.settings={inTangents:Cs(e.settings.inTangents,Array),outTangents:Cs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new mo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case wr:t=this.InterpolantFactoryMethodDiscrete;break;case ja:t=this.InterpolantFactoryMethodLinear;break;case za:t=this.InterpolantFactoryMethodSmooth;break;case vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wr;case this.InterpolantFactoryMethodLinear:return ja;case this.InterpolantFactoryMethodSmooth:return za;case this.InterpolantFactoryMethodBezier:return vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;_c(this.settings)&&(Mu(this.settings.inTangents,e),Mu(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Oe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Oe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Oe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Oe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Kf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Oe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===za,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{let u=o*i,h=u-i,p=u+i;for(let x=0;x!==i;++x){let g=t[u+x];if(g!==t[h+x]||g!==t[p+x]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*i,h=a*i;for(let p=0;p!==i;++p)t[h+p]=t[u+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,_c(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Mu(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=ja;var Pi=class extends hn{constructor(e,t,i){super(e,t,i)}};Pi.prototype.ValueTypeName="bool";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=wr;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var go=class extends hn{constructor(e,t,i,s){super(e,t,i,s)}};go.prototype.ValueTypeName="color";var xo=class extends hn{constructor(e,t,i,s){super(e,t,i,s)}};xo.prototype.ValueTypeName="number";var _o=class extends Ii{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let d=c+o;c!==d;c+=4)_n.slerpFlat(r,0,a,c-o,a,c,l);return r}},Or=class extends hn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new _o(this.times,this.values,this.getValueSize(),e)}};Or.prototype.ValueTypeName="quaternion";Or.prototype.InterpolantFactoryMethodSmooth=void 0;var Li=class extends hn{constructor(e,t,i){super(e,t,i)}};Li.prototype.ValueTypeName="string";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=wr;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends hn{constructor(e,t,i,s){super(e,t,i,s)}};yo.prototype.ValueTypeName="vector";var Ga={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Su(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Su(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Su(n){try{let e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var vo=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){let u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){let p=c[u],x=c[u+1];if(p.global&&(p.lastIndex=0),p.test(d))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gd=new vo,Ys=class{constructor(e){this.manager=e!==void 0?e:gd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ys.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rs=new WeakMap,Mo=class extends Ys{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Ga.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Rs.get(a);u===void 0&&(u=[],Rs.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=Us("img");function l(){d(),t&&t(this);let u=Rs.get(this)||[];for(let h=0;h<u.length;h++){let p=u[h];p.onLoad&&p.onLoad(this)}Rs.delete(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),Ga.remove(`image:${e}`);let h=Rs.get(this)||[];for(let p=0;p<h.length;p++){let x=h[p];x.onError&&x.onError(u)}Rs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ga.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Br=class extends Ys{constructor(e){super(e)}load(e,t,i,s){let r=new Wt,a=new Mo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},Zs=class extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},hi=class extends Zs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},yc=new We,bu=new k,wu=new k,kr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gs,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(bu),wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){yc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(yc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Ns||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(yc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ba=new k,ka=new _n,Wn=new k,zr=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ba,ka,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ba,ka,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ba,ka,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ba,ka,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ci=new k,Tu=new Ue,Eu=new Ue,Jt=class extends zr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Tu,Eu),t.subVectors(Eu,Tu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Sr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Tc=class extends kr{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}},ui=class extends Zs{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Tc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},un=class extends zr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ec=class extends kr{constructor(){super(new un(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},di=class extends Zs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Ec}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Is=-90,Ps=1,So=class extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Jt(Is,Ps,e,t);s.layers=this.layers,this.add(s);let r=new Jt(Is,Ps,e,t);r.layers=this.layers,this.add(r);let a=new Jt(Is,Ps,e,t);a.layers=this.layers,this.add(a);let o=new Jt(Is,Ps,e,t);o.layers=this.layers,this.add(o);let l=new Jt(Is,Ps,e,t);l.layers=this.layers,this.add(l);let c=new Jt(Is,Ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Rn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,h,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},bo=class extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var eh="\\[\\]\\.:\\/",Bp=new RegExp("["+eh+"]","g"),th="[^"+eh+"]",kp="[^"+eh.replace("\\.","")+"]",zp=/((?:WC+[\/:])*)/.source.replace("WC",th),Vp=/(WCOD+)?/.source.replace("WCOD",kp),Gp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",th),Hp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",th),Wp=new RegExp("^"+zp+Vp+Gp+Hp+"$"),Xp=["material","materials","bones","map"],Ac=class{constructor(e,t,i){let s=i||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},xt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Bp,"")}static parseTrackName(e){let t=Wp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Xp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Oe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Oe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Oe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Oe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Oe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Oe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=Ac;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Fy=new Float32Array(1);var Au=new We,es=class{constructor(e,t,i=0,s=1/0){this.ray=new Ki(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new ks,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Oe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Au.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Au),this}intersectObject(e,t=!0,i=[]){return Cc(e,this,i,t),i.sort(Cu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Cc(e[s],this,i,t);return i.sort(Cu),i}};function Cu(n,e){return n.distance-e.distance}function Cc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)Cc(r[a],e,t,!0)}}var Rc=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};var Vr=class extends ro{constructor(e=10,t=10,i=4473924,s=8947848){i=new Le(i),s=new Le(s);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let h=0,p=0,x=-o;h<=t;h++,x+=a){l.push(-o,0,x,o,0,x),l.push(x,0,-o,x,0,o);let g=h===r?i:s;g.toArray(c,p),p+=3,g.toArray(c,p),p+=3,g.toArray(c,p),p+=3,g.toArray(c,p),p+=3}let d=new At;d.setAttribute("position",new _t(l,3)),d.setAttribute("color",new _t(c,3));let u=new Qi({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function nh(n,e,t,i){let s=qp(i);switch(t){case Zc:return n*e;case Io:return n*e/s.components*s.byteLength;case Po:return n*e/s.components*s.byteLength;case Oi:return n*e*2/s.components*s.byteLength;case Lo:return n*e*2/s.components*s.byteLength;case Jc:return n*e*3/s.components*s.byteLength;case nn:return n*e*4/s.components*s.byteLength;case Do:return n*e*4/s.components*s.byteLength;case Wr:case Xr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case qr:case Yr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uo:case Oo:return Math.max(n,16)*Math.max(e,8)/4;case No:case Fo:return Math.max(n,8)*Math.max(e,8)/2;case Bo:case ko:case Vo:case Go:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zo:case Zr:case Ho:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case qo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Zo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Jo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case $o:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ko:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case jo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case el:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case tl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case nl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case il:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case sl:case rl:case al:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ol:case ll:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Jr:case cl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qp(n){switch(n){case tn:case Wc:return{byteLength:1,components:1};case js:case Xc:case On:return{byteLength:2,components:1};case Co:case Ro:return{byteLength:2,components:4};case Fn:case Ao:case Sn:return{byteLength:4,components:1};case qc:case Yc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Bd(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Zp(n){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let d=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,d);else{u.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<u.length;p++){let x=u[h],g=u[p];g.start<=x.start+x.count+1?x.count=Math.max(x.count,g.start+g.count-x.start):(++h,u[h]=g)}u.length=h+1;for(let p=0,x=u.length;p<x;p++){let g=u[p];n.bufferSubData(c,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Jp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$p=`#ifdef USE_ALPHAHASH
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
#endif`,Kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,em=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tm=`#ifdef USE_AOMAP
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
#endif`,nm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,im=`#ifdef USE_BATCHING
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
#endif`,sm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,am=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,om=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lm=`#ifdef USE_IRIDESCENCE
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
#endif`,cm=`#ifdef USE_BUMPMAP
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
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,_m=`#define PI 3.141592653589793
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
} // validated`,ym=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vm=`vec3 transformedNormal = objectNormal;
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
#endif`,Mm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Em=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Am=`#ifdef USE_ENVMAP
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
#endif`,Cm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rm=`#ifdef USE_ENVMAP
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
#endif`,Im=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Lm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Um=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fm=`#ifdef USE_GRADIENTMAP
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
}`,Om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Gm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qm=`PhysicalMaterial material;
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
#endif`,Ym=`uniform sampler2D dfgLUT;
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
}`,Zm=`
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
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
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
#endif`,$m=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Km=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,n0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,r0=`#if defined( USE_POINTS_UV )
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
#endif`,a0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,l0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,c0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u0=`#ifdef USE_MORPHTARGETS
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
#endif`,d0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,p0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_0=`#ifdef USE_NORMALMAP
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
#endif`,y0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,v0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,T0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,C0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,R0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,I0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,N0=`float getShadowMask() {
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
}`,U0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F0=`#ifdef USE_SKINNING
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
#endif`,O0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,B0=`#ifdef USE_SKINNING
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
#endif`,k0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,V0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,G0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,H0=`#ifdef USE_TRANSMISSION
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
#endif`,W0=`#ifdef USE_TRANSMISSION
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
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,J0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$0=`uniform sampler2D t2D;
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
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`#include <common>
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
}`,ng=`#if DEPTH_PACKING == 3200
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
}`,ig=`#define DISTANCE
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
}`,sg=`#define DISTANCE
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
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,hg=`uniform vec3 diffuse;
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
}`,ug=`#define LAMBERT
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
}`,dg=`#define LAMBERT
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
}`,fg=`#define MATCAP
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
}`,pg=`#define MATCAP
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
}`,mg=`#define NORMAL
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
}`,gg=`#define NORMAL
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
}`,xg=`#define PHONG
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
}`,_g=`#define PHONG
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
}`,yg=`#define STANDARD
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
}`,vg=`#define STANDARD
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
}`,Mg=`#define TOON
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
}`,Sg=`#define TOON
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
}`,bg=`uniform float size;
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
}`,wg=`uniform vec3 diffuse;
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
}`,Tg=`#include <common>
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
}`,Eg=`uniform vec3 color;
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
}`,Ag=`uniform float rotation;
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
}`,Cg=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Jp,alphahash_pars_fragment:$p,alphamap_fragment:Kp,alphamap_pars_fragment:jp,alphatest_fragment:Qp,alphatest_pars_fragment:em,aomap_fragment:tm,aomap_pars_fragment:nm,batching_pars_vertex:im,batching_vertex:sm,begin_vertex:rm,beginnormal_vertex:am,bsdfs:om,iridescence_fragment:lm,bumpmap_pars_fragment:cm,clipping_planes_fragment:hm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:dm,clipping_planes_vertex:fm,color_fragment:pm,color_pars_fragment:mm,color_pars_vertex:gm,color_vertex:xm,common:_m,cube_uv_reflection_fragment:ym,defaultnormal_vertex:vm,displacementmap_pars_vertex:Mm,displacementmap_vertex:Sm,emissivemap_fragment:bm,emissivemap_pars_fragment:wm,colorspace_fragment:Tm,colorspace_pars_fragment:Em,envmap_fragment:Am,envmap_common_pars_fragment:Cm,envmap_pars_fragment:Rm,envmap_pars_vertex:Im,envmap_physical_pars_fragment:Vm,envmap_vertex:Pm,fog_vertex:Lm,fog_pars_vertex:Dm,fog_fragment:Nm,fog_pars_fragment:Um,gradientmap_pars_fragment:Fm,lightmap_pars_fragment:Om,lights_lambert_fragment:Bm,lights_lambert_pars_fragment:km,lights_pars_begin:zm,lights_toon_fragment:Gm,lights_toon_pars_fragment:Hm,lights_phong_fragment:Wm,lights_phong_pars_fragment:Xm,lights_physical_fragment:qm,lights_physical_pars_fragment:Ym,lights_fragment_begin:Zm,lights_fragment_maps:Jm,lights_fragment_end:$m,lightprobes_pars_fragment:Km,logdepthbuf_fragment:jm,logdepthbuf_pars_fragment:Qm,logdepthbuf_pars_vertex:e0,logdepthbuf_vertex:t0,map_fragment:n0,map_pars_fragment:i0,map_particle_fragment:s0,map_particle_pars_fragment:r0,metalnessmap_fragment:a0,metalnessmap_pars_fragment:o0,morphinstance_vertex:l0,morphcolor_vertex:c0,morphnormal_vertex:h0,morphtarget_pars_vertex:u0,morphtarget_vertex:d0,normal_fragment_begin:f0,normal_fragment_maps:p0,normal_pars_fragment:m0,normal_pars_vertex:g0,normal_vertex:x0,normalmap_pars_fragment:_0,clearcoat_normal_fragment_begin:y0,clearcoat_normal_fragment_maps:v0,clearcoat_pars_fragment:M0,iridescence_pars_fragment:S0,opaque_fragment:b0,packing:w0,premultiplied_alpha_fragment:T0,project_vertex:E0,dithering_fragment:A0,dithering_pars_fragment:C0,roughnessmap_fragment:R0,roughnessmap_pars_fragment:I0,shadowmap_pars_fragment:P0,shadowmap_pars_vertex:L0,shadowmap_vertex:D0,shadowmask_pars_fragment:N0,skinbase_vertex:U0,skinning_pars_vertex:F0,skinning_vertex:O0,skinnormal_vertex:B0,specularmap_fragment:k0,specularmap_pars_fragment:z0,tonemapping_fragment:V0,tonemapping_pars_fragment:G0,transmission_fragment:H0,transmission_pars_fragment:W0,uv_pars_fragment:X0,uv_pars_vertex:q0,uv_vertex:Y0,worldpos_vertex:Z0,background_vert:J0,background_frag:$0,backgroundCube_vert:K0,backgroundCube_frag:j0,cube_vert:Q0,cube_frag:eg,depth_vert:tg,depth_frag:ng,distance_vert:ig,distance_frag:sg,equirect_vert:rg,equirect_frag:ag,linedashed_vert:og,linedashed_frag:lg,meshbasic_vert:cg,meshbasic_frag:hg,meshlambert_vert:ug,meshlambert_frag:dg,meshmatcap_vert:fg,meshmatcap_frag:pg,meshnormal_vert:mg,meshnormal_frag:gg,meshphong_vert:xg,meshphong_frag:_g,meshphysical_vert:yg,meshphysical_frag:vg,meshtoon_vert:Mg,meshtoon_frag:Sg,points_vert:bg,points_frag:wg,shadow_vert:Tg,shadow_frag:Eg,sprite_vert:Ag,sprite_frag:Cg},me={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},$n={basic:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:qt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:qt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:qt([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:qt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:qt([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:qt([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:qt([me.common,me.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:qt([me.lights,me.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};$n.physical={uniforms:qt([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var fl={r:0,b:0,g:0},Rg=new We,kd=new ke;kd.set(-1,0,0,0,1,0,0,0,1);function Ig(n,e,t,i,s,r){let a=new Le(0),o=s===!0?0:1,l,c,d=null,u=0,h=null;function p(v){let A=v.isScene===!0?v.background:null;if(A&&A.isTexture){let S=v.backgroundBlurriness>0;A=e.get(A,S)}return A}function x(v){let A=!1,S=p(v);S===null?m(a,o):S&&S.isColor&&(m(S,1),A=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(v,A){let S=p(A);S&&(S.isCubeTexture||S.mapping===Gr)?(c===void 0&&(c=new je(new yn(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:ss($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Rg.makeRotationFromEuler(A.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(kd),c.material.toneMapped=$e.getTransfer(S.colorSpace)!==st,(d!==S||u!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=S,u=S.version,h=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new je(new vn(2,2),new $t({name:"BackgroundMaterial",uniforms:ss($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=$e.getTransfer(S.colorSpace)!==st,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||u!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=S,u=S.version,h=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,A){v.getRGB(fl,Qc(n)),t.buffers.color.setClear(fl.r,fl.g,fl.b,A,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,A=1){a.set(v),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:x,addToRenderList:g,dispose:f}}function Pg(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(C,I,U,P,z){let H=!1,G=u(C,P,U,I);r!==G&&(r=G,c(r.object)),H=p(C,P,U,z),H&&x(C,P,U,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,S(C,I,U,P),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function d(C){return n.deleteVertexArray(C)}function u(C,I,U,P){let z=P.wireframe===!0,H=i[I.id];H===void 0&&(H={},i[I.id]=H);let G=C.isInstancedMesh===!0?C.id:0,J=H[G];J===void 0&&(J={},H[G]=J);let Z=J[U.id];Z===void 0&&(Z={},J[U.id]=Z);let Q=Z[z];return Q===void 0&&(Q=h(l()),Z[z]=Q),Q}function h(C){let I=[],U=[],P=[];for(let z=0;z<t;z++)I[z]=0,U[z]=0,P[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:P,object:C,attributes:{},index:null}}function p(C,I,U,P){let z=r.attributes,H=I.attributes,G=0,J=U.getAttributes();for(let Z in J)if(J[Z].location>=0){let ie=z[Z],Ie=H[Z];if(Ie===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(Ie=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(Ie=C.instanceColor)),ie===void 0||ie.attribute!==Ie||Ie&&ie.data!==Ie.data)return!0;G++}return r.attributesNum!==G||r.index!==P}function x(C,I,U,P){let z={},H=I.attributes,G=0,J=U.getAttributes();for(let Z in J)if(J[Z].location>=0){let ie=H[Z];ie===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor));let Ie={};Ie.attribute=ie,ie&&ie.data&&(Ie.data=ie.data),z[Z]=Ie,G++}r.attributes=z,r.attributesNum=G,r.index=P}function g(){let C=r.newAttributes;for(let I=0,U=C.length;I<U;I++)C[I]=0}function m(C){f(C,0)}function f(C,I){let U=r.newAttributes,P=r.enabledAttributes,z=r.attributeDivisors;U[C]=1,P[C]===0&&(n.enableVertexAttribArray(C),P[C]=1),z[C]!==I&&(n.vertexAttribDivisor(C,I),z[C]=I)}function v(){let C=r.newAttributes,I=r.enabledAttributes;for(let U=0,P=I.length;U<P;U++)I[U]!==C[U]&&(n.disableVertexAttribArray(U),I[U]=0)}function A(C,I,U,P,z,H,G){G===!0?n.vertexAttribIPointer(C,I,U,z,H):n.vertexAttribPointer(C,I,U,P,z,H)}function S(C,I,U,P){g();let z=P.attributes,H=U.getAttributes(),G=I.defaultAttributeValues;for(let J in H){let Z=H[J];if(Z.location>=0){let Q=z[J];if(Q===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(Q=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(Q=C.instanceColor)),Q!==void 0){let ie=Q.normalized,Ie=Q.itemSize,Ee=e.get(Q);if(Ee===void 0)continue;let ot=Ee.buffer,Je=Ee.type,Ye=Ee.bytesPerElement,j=Je===n.INT||Je===n.UNSIGNED_INT||Q.gpuType===Ao;if(Q.isInterleavedBufferAttribute){let ne=Q.data,pe=ne.stride,De=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let ve=0;ve<Z.locationSize;ve++)f(Z.location+ve,ne.meshPerAttribute);C.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ve=0;ve<Z.locationSize;ve++)m(Z.location+ve);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let ve=0;ve<Z.locationSize;ve++)A(Z.location+ve,Ie/Z.locationSize,Je,ie,pe*Ye,(De+Ie/Z.locationSize*ve)*Ye,j)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<Z.locationSize;ne++)f(Z.location+ne,Q.meshPerAttribute);C.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<Z.locationSize;ne++)m(Z.location+ne);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let ne=0;ne<Z.locationSize;ne++)A(Z.location+ne,Ie/Z.locationSize,Je,ie,Ie*Ye,Ie/Z.locationSize*ne*Ye,j)}}else if(G!==void 0){let ie=G[J];if(ie!==void 0)switch(ie.length){case 2:n.vertexAttrib2fv(Z.location,ie);break;case 3:n.vertexAttrib3fv(Z.location,ie);break;case 4:n.vertexAttrib4fv(Z.location,ie);break;default:n.vertexAttrib1fv(Z.location,ie)}}}}v()}function T(){w();for(let C in i){let I=i[C];for(let U in I){let P=I[U];for(let z in P){let H=P[z];for(let G in H)d(H[G].object),delete H[G];delete P[z]}}delete i[C]}}function E(C){if(i[C.id]===void 0)return;let I=i[C.id];for(let U in I){let P=I[U];for(let z in P){let H=P[z];for(let G in H)d(H[G].object),delete H[G];delete P[z]}}delete i[C.id]}function R(C){for(let I in i){let U=i[I];for(let P in U){let z=U[P];if(z[C.id]===void 0)continue;let H=z[C.id];for(let G in H)d(H[G].object),delete H[G];delete z[C.id]}}}function y(C){for(let I in i){let U=i[I],P=C.isInstancedMesh===!0?C.id:0,z=U[P];if(z!==void 0){for(let H in z){let G=z[H];for(let J in G)d(G[J].object),delete G[J];delete z[H]}delete U[P],Object.keys(U).length===0&&delete i[I]}}}function w(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:g,enableAttribute:m,disableUnusedAttributes:v}}function Lg(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let h=0;for(let p=0;p<d;p++)h+=c[p];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Dg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==nn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let y=R===On&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==tn&&R!==Sn&&!y&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(Ne("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:g,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:A,maxFragmentUniforms:S,maxSamples:T,samples:E}}function Ng(n){let e=this,t=null,i=0,s=!1,r=!1,a=new on,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){let p=u.length!==0||h||i!==0||s;return s=h,i=u.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,p){let x=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||x===null||x.length===0||r&&!m)r?d(null):c();else{let v=r?0:i,A=v*4,S=f.clippingState||null;l.value=S,S=d(x,h,A,p);for(let T=0;T!==A;++T)S[T]=t[T];f.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,p,x){let g=u!==null?u.length:0,m=null;if(g!==0){if(m=l.value,x!==!0||m===null){let f=p+g*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,S=p;A!==g;++A,S+=4)a.copy(u[A]).applyMatrix4(v,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}var tr=4,Ug=6,Fg=20,Og=256,$r=new un,xd=new Le,ih=null,sh=0,rh=0,ah=!1,Bg=new k,rs=new k,ml=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Bg}=r;ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ih,sh,rh),this._renderer.xr.enabled=ah,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ni||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ih=this._renderer.getRenderTarget(),sh=this._renderer.getActiveCubeFace(),rh=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:On,format:nn,colorSpace:Tr,depthBuffer:!1},s=_d(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_d(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=kg(r)),this._blurMaterial=Vg(r,e,t),this._ggxMaterial=zg(r,e,t)}return s}_compileMaterial(e){let t=new je(new At,e);this._renderer.compile(t,$r)}_sceneToCubeUV(e,t,i,s,r){let l=new Jt(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,p=u.toneMapping;u.getClearColor(xd),u.toneMapping=Un,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new je(new yn,new Ln({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));let g=this._backgroundBox,m=g.material,f=!1,v=e.background;v?v.isColor&&(m.color.copy(v),e.background=null,f=!0):(m.color.copy(xd),f=!0);for(let A=0;A<6;A++){let S=A%3;S===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[A],r.y,r.z)):S===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[A]));let T=this._cubeSize;er(s,S*T,A>2?T:0,T,T),u.setRenderTarget(s),f&&u.render(g,l),u.render(e,l)}u.toneMapping=p,u.autoClear=h,e.background=v}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ni||e.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;er(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,$r)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),h=c*1.25,p=u*h,{_lodMax:x}=this,g=this._sizeLods[i],m=3*g*(i>x-tr?i-x+tr:0),f=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-t,er(r,m,f,3*g,2*g),s.setRenderTarget(r),s.render(o,$r),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,er(e,m,f,3*g,2*g),s.setRenderTarget(e),s.render(o,$r)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let d=this._sizeLods[s],u=3*d*(s>this._lodMax-tr?s-this._lodMax+tr:0),h=4*(this._cubeSize-d);er(t,u,h,3*d,2*d),a.setRenderTarget(t),a.render(l,$r)}};function kg(n){let e=[],t=[],i=n,s=n-tr+1+Ug;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,h=6,p=3,x=new Float32Array(p*h*u),g=new Float32Array(p*h*u);for(let f=0;f<u;f++){let v=f%3*2/3-1,A=f>2?0:-1,S=[v,A,0,v+2/3,A,0,v+2/3,A+1,0,v,A,0,v+2/3,A+1,0,v,A+1,0];x.set(S,p*h*f);for(let T=0;T<h;T++){let E=d[T*2]*2-1,R=d[T*2+1]*2-1;f===0?rs.set(1,R,E):f===1?rs.set(-E,1,-R):f===2?rs.set(-E,R,1):f===3?rs.set(-1,R,-E):f===4?rs.set(-E,-1,R):rs.set(E,R,-1),rs.toArray(g,(f*h+T)*p)}}let m=new At;m.setAttribute("position",new Ht(x,p)),m.setAttribute("outputDirection",new Ht(g,p)),t.push(new je(m,null)),i>tr&&i--}return{lodMeshes:t,sizeLods:e}}function _d(n,e,t){let i=new Xt(n,e,t);return i.texture.mapping=Gr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function er(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function zg(n,e,t){return new $t({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Og,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Vg(n,e,t){return new $t({name:"SphericalGaussianBlur",defines:{SAMPLES:Fg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function yd(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function vd(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function xl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var gl=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Ur(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new yn(5,5,5),r=new $t({name:"CubemapFromEquirect",uniforms:ss(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:Zn});r.uniforms.tEquirect.value=t;let a=new je(s,r),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Pt),new So(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function Gg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===wo||p===To)if(e.has(h)){let x=e.get(h).texture;return o(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let g=new gl(x.height);return g.fromEquirectangularTexture(n,h),e.set(h,g),h.addEventListener("dispose",c),o(g.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,x=p===wo||p===To,g=p===Ni||p===is;if(x||g){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new ml(n)),m=x?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let v=h.image;return x&&v&&v.height>0||g&&v&&l(v)?(i===null&&(i=new ml(n)),m=x?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",d),m.texture):null}}}return h}function o(h,p){return p===wo?h.mapping=Ni:p===To&&(h.mapping=is),h}function l(h){let p=0,x=6;for(let g=0;g<x;g++)h[g]!==void 0&&p++;return p===x}function c(h){let p=h.target;p.removeEventListener("dispose",c);let x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function d(h){let p=h.target;p.removeEventListener("dispose",d);let x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function Hg(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&$i("WebGLRenderer: "+i+" extension not supported."),s}}}function Wg(n,e,t,i){let s={},r=new WeakMap;function a(u){let h=u.target;h.index!==null&&e.remove(h.index);for(let x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(e.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){let h=u.attributes;for(let p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(u){let h=[],p=u.index,x=u.attributes.position,g=0;if(x===void 0)return;if(p!==null){let v=p.array;g=p.version;for(let A=0,S=v.length;A<S;A+=3){let T=v[A+0],E=v[A+1],R=v[A+2];h.push(T,E,E,R,R,T)}}else{let v=x.array;g=x.version;for(let A=0,S=v.length/3-1;A<S;A+=3){let T=A+0,E=A+1,R=A+2;h.push(T,E,E,R,R,T)}}let m=new(x.count>=65535?Ir:Rr)(h,1);m.version=g;let f=r.get(u);f&&e.remove(f),r.set(u,m)}function d(u){let h=r.get(u);if(h){let p=u.index;p!==null&&h.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Xg(n,e,t){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,h){n.drawElements(i,h,r,u*a),t.update(h,i,1)}function c(u,h,p){p!==0&&(n.drawElementsInstanced(i,h,r,u*a,p),t.update(h,i,p))}function d(u,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,u,0,p);let g=0;for(let m=0;m<p;m++)g+=h[m];t.update(g,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function qg(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Oe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Yg(n,e,t){let i=new WeakMap,s=new vt;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0,h=i.get(o);if(h===void 0||h.count!==u){let w=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],A=0;p===!0&&(A=1),x===!0&&(A=2),g===!0&&(A=3);let S=o.attributes.position.count*A,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let E=new Float32Array(S*T*4*u),R=new Cr(E,S,T,u);R.type=Sn,R.needsUpdate=!0;let y=A*4;for(let L=0;L<u;L++){let C=m[L],I=f[L],U=v[L],P=S*T*4*L;for(let z=0;z<C.count;z++){let H=z*y;p===!0&&(s.fromBufferAttribute(C,z),E[P+H+0]=s.x,E[P+H+1]=s.y,E[P+H+2]=s.z,E[P+H+3]=0),x===!0&&(s.fromBufferAttribute(I,z),E[P+H+4]=s.x,E[P+H+5]=s.y,E[P+H+6]=s.z,E[P+H+7]=0),g===!0&&(s.fromBufferAttribute(U,z),E[P+H+8]=s.x,E[P+H+9]=s.y,E[P+H+10]=s.z,E[P+H+11]=U.itemSize===4?s.w:1)}}h={count:u,texture:R,size:new Ue(S,T)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];let x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Zg(n,e,t,i,s){let r=new WeakMap;function a(c){let d=s.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return h}function o(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var Jg={[Oc]:"LINEAR_TONE_MAPPING",[Bc]:"REINHARD_TONE_MAPPING",[kc]:"CINEON_TONE_MAPPING",[Ks]:"ACES_FILMIC_TONE_MAPPING",[Vc]:"AGX_TONE_MAPPING",[Gc]:"NEUTRAL_TONE_MAPPING",[zc]:"CUSTOM_TONE_MAPPING"};function $g(n,e,t,i,s,r){let a=new Xt(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new At;c.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new _t([0,2,0,0,2,0],2));let d=new lo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new je(c,d),h=new un(-1,1,1,-1,0,1),p=null,x=null,g=!1,m,f=null,v=[],A=!1;this.setSize=function(S,T){a.setSize(S,T),o!==null&&o.setSize(S,T),l!==null&&l.setSize(S,T);for(let E=0;E<v.length;E++){let R=v[E];R.setSize&&R.setSize(S,T)}},this.setEffects=function(S){v=S,A=v.length>0&&v[0].isRenderPass===!0;let T=a.width,E=a.height;v.length>0&&o===null&&(o=new Xt(T,E,{type:On,depthBuffer:!1,stencilBuffer:!1}),l=new Xt(T,E,{type:On,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<v.length;R++){let y=v[R];y.setSize&&y.setSize(T,E)}},this.begin=function(S,T){if(g||S.toneMapping===Un&&v.length===0)return!1;if(f=T,T!==null){let E=T.width,R=T.height;(a.width!==E||a.height!==R)&&this.setSize(E,R)}return A===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=Un,!0},this.hasRenderPass=function(){return A},this.end=function(S,T){S.toneMapping=m,g=!0;let E=a,R=o;for(let y=0;y<v.length;y++){let w=v[y];w.enabled!==!1&&(w.render(S,R,E,T),w.needsSwap!==!1&&(E=R,R=R===o?l:o))}if(p!==S.outputColorSpace||x!==S.toneMapping){p=S.outputColorSpace,x=S.toneMapping,d.defines={},$e.getTransfer(p)===st&&(d.defines.SRGB_TRANSFER="");let y=Jg[x];y&&(d.defines[y]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(f),S.render(u,h),f=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}var zd=new Wt,ch=new Ri(1,1),Vd=new Cr,Gd=new to,Hd=new Ur,Md=[],Sd=[],bd=new Float32Array(16),wd=new Float32Array(9),Td=new Float32Array(4);function ir(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Md[s];if(r===void 0&&(r=new Float32Array(s),Md[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function _l(n,e){let t=Sd[e];t===void 0&&(t=new Int32Array(e),Sd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Kg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function jg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function Qg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function ex(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function tx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,i))return;Td.set(i),n.uniformMatrix2fv(this.addr,!1,Td),Nt(t,i)}}function nx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,i))return;wd.set(i),n.uniformMatrix3fv(this.addr,!1,wd),Nt(t,i)}}function ix(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,i))return;bd.set(i),n.uniformMatrix4fv(this.addr,!1,bd),Nt(t,i)}}function sx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function rx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function ax(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function ox(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function lx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function cx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function hx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function ux(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function dx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ch.compareFunction=t.isReversedDepthBuffer()?dl:ul,r=ch):r=zd,t.setTexture2D(e||r,s)}function fx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Gd,s)}function px(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Hd,s)}function mx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Vd,s)}function gx(n){switch(n){case 5126:return Kg;case 35664:return jg;case 35665:return Qg;case 35666:return ex;case 35674:return tx;case 35675:return nx;case 35676:return ix;case 5124:case 35670:return sx;case 35667:case 35671:return rx;case 35668:case 35672:return ax;case 35669:case 35673:return ox;case 5125:return lx;case 36294:return cx;case 36295:return hx;case 36296:return ux;case 35678:case 36198:case 36298:case 36306:case 35682:return dx;case 35679:case 36299:case 36307:return fx;case 35680:case 36300:case 36308:case 36293:return px;case 36289:case 36303:case 36311:case 36292:return mx}}function xx(n,e){n.uniform1fv(this.addr,e)}function _x(n,e){let t=ir(e,this.size,2);n.uniform2fv(this.addr,t)}function yx(n,e){let t=ir(e,this.size,3);n.uniform3fv(this.addr,t)}function vx(n,e){let t=ir(e,this.size,4);n.uniform4fv(this.addr,t)}function Mx(n,e){let t=ir(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Sx(n,e){let t=ir(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function bx(n,e){let t=ir(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function wx(n,e){n.uniform1iv(this.addr,e)}function Tx(n,e){n.uniform2iv(this.addr,e)}function Ex(n,e){n.uniform3iv(this.addr,e)}function Ax(n,e){n.uniform4iv(this.addr,e)}function Cx(n,e){n.uniform1uiv(this.addr,e)}function Rx(n,e){n.uniform2uiv(this.addr,e)}function Ix(n,e){n.uniform3uiv(this.addr,e)}function Px(n,e){n.uniform4uiv(this.addr,e)}function Lx(n,e,t){let i=this.cache,s=e.length,r=_l(t,s);Dt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ch:a=zd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Dx(n,e,t){let i=this.cache,s=e.length,r=_l(t,s);Dt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Gd,r[a])}function Nx(n,e,t){let i=this.cache,s=e.length,r=_l(t,s);Dt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Hd,r[a])}function Ux(n,e,t){let i=this.cache,s=e.length,r=_l(t,s);Dt(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Vd,r[a])}function Fx(n){switch(n){case 5126:return xx;case 35664:return _x;case 35665:return yx;case 35666:return vx;case 35674:return Mx;case 35675:return Sx;case 35676:return bx;case 5124:case 35670:return wx;case 35667:case 35671:return Tx;case 35668:case 35672:return Ex;case 35669:case 35673:return Ax;case 5125:return Cx;case 36294:return Rx;case 36295:return Ix;case 36296:return Px;case 35678:case 36198:case 36298:case 36306:case 35682:return Lx;case 35679:case 36299:case 36307:return Dx;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Ux}}var hh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=gx(t.type)}},uh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fx(t.type)}},dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},oh=/(\w+)(\])?(\[|\.)?/g;function Ed(n,e){n.seq.push(e),n.map[e.id]=e}function Ox(n,e,t){let i=n.name,s=i.length;for(oh.lastIndex=0;;){let r=oh.exec(i),a=oh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ed(t,c===void 0?new hh(o,n,e):new uh(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new dh(o),Ed(t,u)),t=u}}}var nr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ox(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Ad(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Bx=37297,kx=0;function zx(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Cd=new ke;function Vx(n){$e._getMatrix(Cd,$e.workingColorSpace,n);let e=`mat3( ${Cd.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Er:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Rd(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+zx(n.getShaderSource(e),o)}else return r}function Gx(n,e){let t=Vx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Hx={[Oc]:"Linear",[Bc]:"Reinhard",[kc]:"Cineon",[Ks]:"ACESFilmic",[Vc]:"AgX",[Gc]:"Neutral",[zc]:"Custom"};function Wx(n,e){let t=Hx[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var pl=new k;function Xx(){$e.getLuminanceCoefficients(pl);let n=pl.x.toFixed(4),e=pl.y.toFixed(4),t=pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jr).join(`
`)}function Yx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Zx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function jr(n){return n!==""}function Id(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Jx=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(n){return n.replace(Jx,Kx)}var $x=new Map;function Kx(n,e){let t=Xe[e];if(t===void 0){let i=$x.get(e);if(i!==void 0)t=Xe[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return fh(t)}var jx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ld(n){return n.replace(jx,Qx)}function Qx(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dd(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var e_={[ts]:"SHADOWMAP_TYPE_PCF",[Js]:"SHADOWMAP_TYPE_VSM"};function t_(n){return e_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var n_={[Ni]:"ENVMAP_TYPE_CUBE",[is]:"ENVMAP_TYPE_CUBE",[Gr]:"ENVMAP_TYPE_CUBE_UV"};function i_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":n_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var s_={[is]:"ENVMAP_MODE_REFRACTION"};function r_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":s_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var a_={[Fc]:"ENVMAP_BLENDING_MULTIPLY",[$u]:"ENVMAP_BLENDING_MIX",[Ku]:"ENVMAP_BLENDING_ADD"};function o_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":a_[n.combine]||"ENVMAP_BLENDING_NONE"}function l_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function c_(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=t_(t),c=i_(t),d=r_(t),u=o_(t),h=l_(t),p=qx(t),x=Yx(r),g=s.createProgram(),m,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(jr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(jr).join(`
`),f.length>0&&(f+=`
`)):(m=[Dd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jr).join(`
`),f=[Dd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Un?Wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Gx("linearToOutputTexel",t.outputColorSpace),Xx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(jr).join(`
`)),a=fh(a),a=Id(a,t),a=Pd(a,t),o=fh(o),o=Id(o,t),o=Pd(o,t),a=Ld(a),o=Ld(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let A=v+m+a,S=v+f+o,T=Ad(s,s.VERTEX_SHADER,A),E=Ad(s,s.FRAGMENT_SHADER,S);s.attachShader(g,T),s.attachShader(g,E),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function R(C){if(n.debug.checkShaderErrors){let I=s.getProgramInfoLog(g)||"",U=s.getShaderInfoLog(T)||"",P=s.getShaderInfoLog(E)||"",z=I.trim(),H=U.trim(),G=P.trim(),J=!0,Z=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,T,E);else{let Q=Rd(s,T,"vertex"),ie=Rd(s,E,"fragment");Oe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+Q+`
`+ie)}else z!==""?Ne("WebGLProgram: Program Info Log:",z):(H===""||G==="")&&(Z=!1);Z&&(C.diagnostics={runnable:J,programLog:z,vertexShader:{log:H,prefix:m},fragmentShader:{log:G,prefix:f}})}s.deleteShader(T),s.deleteShader(E),y=new nr(s,g),w=Zx(s,g)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(g,Bx)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=E,this}var h_=0,ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new mh(e),t.set(e,i)),i}},mh=class{constructor(e){this.id=h_++,this.code=e,this.usedTimes=0}};function u_(n){return n===Oi||n===Zr||n===Jr}function d_(n,e,t,i,s,r){let a=new ks,o=new ph,l=new Set,c=[],d=new Map,u=i.logarithmicDepthBuffer,h=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,w,L,C,I,U){let P=C.fog,z=I.geometry,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?C.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,J=e.get(y.envMap||H,G),Z=J&&J.mapping===Gr?J.image.height:null,Q=p[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Ne("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let ie=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Ie=ie!==void 0?ie.length:0,Ee=0;z.morphAttributes.position!==void 0&&(Ee=1),z.morphAttributes.normal!==void 0&&(Ee=2),z.morphAttributes.color!==void 0&&(Ee=3);let ot,Je,Ye,j;if(Q){let ft=$n[Q];ot=ft.vertexShader,Je=ft.fragmentShader}else{ot=y.vertexShader,Je=y.fragmentShader;let ft=o.getVertexShaderStage(y),nt=o.getFragmentShaderStage(y);o.update(y,ft,nt),Ye=ft.id,j=nt.id}let ne=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),De=I.isInstancedMesh===!0,ve=I.isBatchedMesh===!0,Ve=!!y.map,dt=!!y.matcap,Be=!!J,Ge=!!y.aoMap,rt=!!y.lightMap,ze=!!y.bumpMap&&y.wireframe===!1,tt=!!y.normalMap,Tt=!!y.displacementMap,Ut=!!y.emissiveMap,mt=!!y.metalnessMap,wt=!!y.roughnessMap,B=y.anisotropy>0,$=y.clearcoat>0,se=y.dispersion>0,b=y.retroreflectivity>0,_=y.iridescence>0,D=y.sheen>0,V=y.transmission>0,q=B&&!!y.anisotropyMap,oe=$&&!!y.clearcoatMap,ae=$&&!!y.clearcoatNormalMap,K=$&&!!y.clearcoatRoughnessMap,ee=_&&!!y.iridescenceMap,le=_&&!!y.iridescenceThicknessMap,Ae=D&&!!y.sheenColorMap,ue=D&&!!y.sheenRoughnessMap,he=!!y.specularMap,ce=!!y.specularColorMap,Me=!!y.specularIntensityMap,Fe=V&&!!y.transmissionMap,N=V&&!!y.thicknessMap,de=!!y.gradientMap,te=!!y.alphaMap,fe=y.alphaTest>0,ye=!!y.alphaHash,re=!!y.extensions,Pe=Un;y.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Pe=n.toneMapping);let Ce={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:ot,fragmentShader:Je,defines:y.defines,customVertexShaderID:Ye,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:ve,batchingColor:ve&&I._colorsTexture!==null,instancing:De,instancingColor:De&&I.instanceColor!==null,instancingMorph:De&&I.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ve,matcap:dt,envMap:Be,envMapMode:Be&&J.mapping,envMapCubeUVHeight:Z,aoMap:Ge,lightMap:rt,bumpMap:ze,normalMap:tt,displacementMap:Tt,emissiveMap:Ut,normalMapObjectSpace:tt&&y.normalMapType===ed,normalMapTangentSpace:tt&&y.normalMapType===hl,packedNormalMap:tt&&y.normalMapType===hl&&u_(y.normalMap.format),metalnessMap:mt,roughnessMap:wt,anisotropy:B,anisotropyMap:q,clearcoat:$,clearcoatMap:oe,clearcoatNormalMap:ae,clearcoatRoughnessMap:K,dispersion:se,retroreflection:b,iridescence:_,iridescenceMap:ee,iridescenceThicknessMap:le,sheen:D,sheenColorMap:Ae,sheenRoughnessMap:ue,specularMap:he,specularColorMap:ce,specularIntensityMap:Me,transmission:V,transmissionMap:Fe,thicknessMap:N,gradientMap:de,opaque:y.transparent===!1&&y.blending===$s&&y.alphaToCoverage===!1,alphaMap:te,alphaTest:fe,alphaHash:ye,combine:y.combine,mapUv:Ve&&x(y.map.channel),aoMapUv:Ge&&x(y.aoMap.channel),lightMapUv:rt&&x(y.lightMap.channel),bumpMapUv:ze&&x(y.bumpMap.channel),normalMapUv:tt&&x(y.normalMap.channel),displacementMapUv:Tt&&x(y.displacementMap.channel),emissiveMapUv:Ut&&x(y.emissiveMap.channel),metalnessMapUv:mt&&x(y.metalnessMap.channel),roughnessMapUv:wt&&x(y.roughnessMap.channel),anisotropyMapUv:q&&x(y.anisotropyMap.channel),clearcoatMapUv:oe&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:ae&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:le&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&x(y.sheenRoughnessMap.channel),specularMapUv:he&&x(y.specularMap.channel),specularColorMapUv:ce&&x(y.specularColorMap.channel),specularIntensityMapUv:Me&&x(y.specularIntensityMap.channel),transmissionMapUv:Fe&&x(y.transmissionMap.channel),thicknessMapUv:N&&x(y.thicknessMap.channel),alphaMapUv:te&&x(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(tt||B),vertexNormals:!!z.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!z.attributes.uv&&(Ve||te),fog:!!P,useFog:y.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||z.attributes.normal===void 0&&tt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pe,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Ee,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Ve&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===st,decodeVideoTextureEmissive:Ut&&y.emissiveMap.isVideoTexture===!0&&$e.getTransfer(y.emissiveMap.colorSpace)===st,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Mn,flipSided:y.side===jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:re&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&y.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function m(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let L in y.defines)w.push(L),w.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(f(w,y),v(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function f(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numSunLights),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numSunLightShadows),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function v(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function A(y){let w=p[y.type],L;if(w){let C=$n[w];L=pd.clone(C.uniforms)}else L=y.uniforms;return L}function S(y,w){let L=d.get(w);return L!==void 0?++L.usedTimes:(L=new c_(n,w,y,s),c.push(L),d.set(w,L)),L}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function R(){o.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:A,acquireProgram:S,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:R}}function f_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function p_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Nd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ud(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,x,g,m,f){let v=n[e];return v===void 0?(v={id:h.id,object:h,geometry:p,material:x,materialVariant:a(h),groupOrder:g,renderOrder:h.renderOrder,z:m,group:f},n[e]=v):(v.id=h.id,v.object=h,v.geometry=p,v.material=x,v.materialVariant=a(h),v.groupOrder=g,v.renderOrder=h.renderOrder,v.z=m,v.group=f),e++,v}function l(h,p,x,g,m,f,v){v.reversedDepth===!0&&(m=-m);let A=o(h,p,x,g,m,f);x.transmission>0?i.push(A):x.transparent===!0?s.push(A):t.push(A)}function c(h,p,x,g,m,f){let v=o(h,p,x,g,m,f);x.transmission>0?i.unshift(v):x.transparent===!0?s.unshift(v):t.unshift(v)}function d(h,p){t.length>1&&t.sort(h||p_),i.length>1&&i.sort(p||Nd),s.length>1&&s.sort(p||Nd)}function u(){for(let h=e,p=n.length;h<p;h++){let x=n[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:u,sort:d}}function m_(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new Ud,n.set(i,[a])):s>=r.length?(a=new Ud,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function g_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new k,color:new Le};break;case"SpotLight":t={position:new k,direction:new k,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function x_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var __=0;function y_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function v_(n){let e=new g_,t=x_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let s=new k,r=new We,a=new We;function o(c){let d=0,u=0,h=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let p=0,x=0,g=0,m=0,f=0,v=0,A=0,S=0,T=0,E=0,R=0,y=0,w=0,L=0;c.sort(y_);for(let I=0,U=c.length;I<U;I++){let P=c[I],z=P.color,H=P.intensity,G=P.distance,J=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Oi?J=P.shadow.map.texture:J=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=z.r*H,u+=z.g*H,h+=z.b*H;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(P.sh.coefficients[Z],H);L++}else if(P.isSunLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,ie=t.get(P);ie.shadowIntensity=Q.intensity,ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[x]=ie,i.sunShadowMap[x]=J;let Ie=Q.getViewportCount();for(let Ee=0;Ee<Ie;Ee++)i.sunShadowMatrix[g+Ee]=Q.getMatrix(Ee),i.sunShadowCascade[g+Ee]=Q._cascadeData[Ee];g+=Ie,x++}i.sun[p]=Z,p++}else if(P.isDirectionalLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,ie=t.get(P);ie.shadowIntensity=Q.intensity,ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize=Q.mapSize,i.directionalShadow[m]=ie,i.directionalShadowMap[m]=J,i.directionalShadowMatrix[m]=P.shadow.matrix,T++}i.directional[m]=Z,m++}else if(P.isSpotLight){let Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(z).multiplyScalar(H),Z.distance=G,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,i.spot[v]=Z;let Q=P.shadow;if(P.map&&(i.spotLightMap[y]=P.map,y++,Q.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[v]=Q.matrix,P.castShadow){let ie=t.get(P);ie.shadowIntensity=Q.intensity,ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize=Q.mapSize,i.spotShadow[v]=ie,i.spotShadowMap[v]=J,R++}v++}else if(P.isRectAreaLight){let Z=e.get(P);Z.color.copy(z).multiplyScalar(H),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),i.rectArea[A]=Z,A++}else if(P.isPointLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){let Q=P.shadow,ie=t.get(P);ie.shadowIntensity=Q.intensity,ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize=Q.mapSize,ie.shadowCameraNear=Q.camera.near,ie.shadowCameraFar=Q.camera.far,i.pointShadow[f]=ie,i.pointShadowMap[f]=J,i.pointShadowMatrix[f]=P.shadow.matrix,E++}i.point[f]=Z,f++}else if(P.isHemisphereLight){let Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(H),Z.groundColor.copy(P.groundColor).multiplyScalar(H),i.hemi[S]=Z,S++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;let C=i.hash;(C.sunLength!==p||C.directionalLength!==m||C.pointLength!==f||C.spotLength!==v||C.rectAreaLength!==A||C.hemiLength!==S||C.numSunShadows!==x||C.numDirectionalShadows!==T||C.numPointShadows!==E||C.numSpotShadows!==R||C.numSpotMaps!==y||C.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=m,i.spot.length=v,i.rectArea.length=A,i.point.length=f,i.hemi.length=S,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=g,i.sunShadowCascade.length=g,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+y-w,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=L,C.sunLength=p,C.directionalLength=m,C.pointLength=f,C.spotLength=v,C.rectAreaLength=A,C.hemiLength=S,C.numSunShadows=x,C.numDirectionalShadows=T,C.numPointShadows=E,C.numSpotShadows=R,C.numSpotMaps=y,C.numLightProbes=L,i.version=__++)}function l(c,d){let u=0,h=0,p=0,x=0,g=0,m=0,f=d.matrixWorldInverse;for(let v=0,A=c.length;v<A;v++){let S=c[v];if(S.isSunLight){let T=i.sun[u];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),u++}else if(S.isDirectionalLight){let T=i.directional[h];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),h++}else if(S.isSpotLight){let T=i.spot[x];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),x++}else if(S.isRectAreaLight){let T=i.rectArea[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),a.identity(),r.copy(S.matrixWorld),r.premultiply(f),a.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){let T=i.point[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),p++}else if(S.isHemisphereLight){let T=i.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function Fd(n){let e=new v_(n),t=[],i=[],s=[];function r(h){u.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function d(h){e.setupView(t,h)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function M_(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Fd(n),e.set(s,[o])):r>=a.length?(o=new Fd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var S_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b_=`uniform sampler2D shadow_pass;
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
}`,w_=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],T_=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Od=new We,Kr=new k,lh=new k;function E_(n,e,t){let i=new Gs,s=new Ue,r=new Ue,a=new vt,o=new co,l=new ho,c={},d=t.maxTextureSize,u={[Di]:jt,[jt]:Di,[Mn]:Mn},h=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:S_,fragmentShader:b_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let x=new At;x.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new je(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ts;let f=this.type;this.render=function(E,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Pu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ts);let w=n.getRenderTarget(),L=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Zn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let U=f!==this.type;U&&R.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(z=>z.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,z=E.length;P<z;P++){let H=E[P],G=H.shadow;if(G===void 0){Ne("WebGLShadowMap:",H,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let J=G.getFrameExtents();s.multiply(J),r.copy(G.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/J.x),s.x=r.x*J.x,G.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/J.y),s.y=r.y*J.y,G.mapSize.y=r.y));let Z=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Z,G.map===null||U===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Js){if(H.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Xt(s.x,s.y,{format:Oi,type:On,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),G.map.texture.name=H.name+".shadowMap",G.map.depthTexture=new Ri(s.x,s.y,Sn),G.map.depthTexture.name=H.name+".shadowMapDepth",G.map.depthTexture.format=Xn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=yt,G.map.depthTexture.magFilter=yt}else H.isPointLight?(G.map=new gl(s.x),G.map.depthTexture=new ao(s.x,Fn)):(G.map=new Xt(s.x,s.y),G.map.depthTexture=new Ri(s.x,s.y,Fn)),G.map.depthTexture.name=H.name+".shadowMap",G.map.depthTexture.format=Xn,this.type===ts?(G.map.depthTexture.compareFunction=Z?dl:ul,G.map.depthTexture.minFilter=Pt,G.map.depthTexture.magFilter=Pt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=yt,G.map.depthTexture.magFilter=yt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let Q=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();H.isPointLight!==!0&&G.updateMatrices(H,y);for(let ie=0;ie<Q;ie++){let Ie=G.getCamera(ie);if(H.isPointLight){let Ee=G.camera,ot=G.matrix,Je=H.distance||Ee.far;Je!==Ee.far&&(Ee.far=Je,Ee.updateProjectionMatrix()),Kr.setFromMatrixPosition(H.matrixWorld),Ee.position.copy(Kr),lh.copy(Ee.position),lh.add(w_[ie]),Ee.up.copy(T_[ie]),Ee.lookAt(lh),Ee.updateMatrixWorld(),ot.makeTranslation(-Kr.x,-Kr.y,-Kr.z),Od.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Od,Ee.coordinateSystem,Ee.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,ie),n.clear();else{ie===0&&(n.setRenderTarget(G.map),n.clear());let Ee=G.getViewport(ie);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),I.viewport(a)}i=G.getFrustum(ie),S(R,y,Ie,H,this.type)}G.isPointLightShadow!==!0&&this.type===Js&&v(G,y),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,L,C)};function v(E,R){let y=e.update(g);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Xt(s.x,s.y,{format:Oi,type:On}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,y,h,g,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,y,p,g,null)}function A(E,R,y,w){let L=null,C=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)L=C;else if(L=y.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let I=L.uuid,U=R.uuid,P=c[I];P===void 0&&(P={},c[I]=P);let z=P[U];z===void 0&&(z=L.clone(),P[U]=z,R.addEventListener("dispose",T)),L=z}if(L.visible=R.visible,L.wireframe=R.wireframe,w===Js?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:u[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,y.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let I=n.properties.get(L);I.light=y}return L}function S(E,R,y,w,L){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Js)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let U=e.update(E),P=E.material;if(Array.isArray(P)){let z=U.groups;for(let H=0,G=z.length;H<G;H++){let J=z[H],Z=P[J.materialIndex];if(Z&&Z.visible){let Q=A(E,Z,w,L);E.onBeforeShadow(n,E,R,y,U,Q,J),n.renderBufferDirect(y,null,U,Q,E,J),E.onAfterShadow(n,E,R,y,U,Q,J)}}}else if(P.visible){let z=A(E,P,w,L);E.onBeforeShadow(n,E,R,y,U,z,null),n.renderBufferDirect(y,null,U,z,E,null),E.onAfterShadow(n,E,R,y,U,z,null)}}let I=E.children;for(let U=0,P=I.length;U<P;U++)S(I[U],R,y,w,L)}function T(E){E.target.removeEventListener("dispose",T);for(let y in c){let w=c[y],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function A_(n,e){function t(){let N=!1,de=new vt,te=null,fe=new vt(0,0,0,0);return{setMask:function(ye){te!==ye&&!N&&(n.colorMask(ye,ye,ye,ye),te=ye)},setLocked:function(ye){N=ye},setClear:function(ye,re,Pe,Ce,ft){ft===!0&&(ye*=Ce,re*=Ce,Pe*=Ce),de.set(ye,re,Pe,Ce),fe.equals(de)===!1&&(n.clearColor(ye,re,Pe,Ce),fe.copy(de))},reset:function(){N=!1,te=null,fe.set(-1,0,0,0)}}}function i(){let N=!1,de=!1,te=null,fe=null,ye=null;return{setReversed:function(re){if(de!==re){let Pe=e.get("EXT_clip_control");re?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),de=re;let Ce=ye;ye=null,this.setClear(Ce)}},getReversed:function(){return de},setTest:function(re){re?ne(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(re){te!==re&&!N&&(n.depthMask(re),te=re)},setFunc:function(re){if(de&&(re=ud[re]),fe!==re){switch(re){case Ha:n.depthFunc(n.NEVER);break;case Wa:n.depthFunc(n.ALWAYS);break;case Xa:n.depthFunc(n.LESS);break;case Ds:n.depthFunc(n.LEQUAL);break;case qa:n.depthFunc(n.EQUAL);break;case Ya:n.depthFunc(n.GEQUAL);break;case Za:n.depthFunc(n.GREATER);break;case Ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=re}},setLocked:function(re){N=re},setClear:function(re){ye!==re&&(ye=re,de&&(re=1-re),n.clearDepth(re))},reset:function(){N=!1,te=null,fe=null,ye=null,de=!1}}}function s(){let N=!1,de=null,te=null,fe=null,ye=null,re=null,Pe=null,Ce=null,ft=null;return{setTest:function(nt){N||(nt?ne(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(nt){de!==nt&&!N&&(n.stencilMask(nt),de=nt)},setFunc:function(nt,wn,Gn){(te!==nt||fe!==wn||ye!==Gn)&&(n.stencilFunc(nt,wn,Gn),te=nt,fe=wn,ye=Gn)},setOp:function(nt,wn,Gn){(re!==nt||Pe!==wn||Ce!==Gn)&&(n.stencilOp(nt,wn,Gn),re=nt,Pe=wn,Ce=Gn)},setLocked:function(nt){N=nt},setClear:function(nt){ft!==nt&&(n.clearStencil(nt),ft=nt)},reset:function(){N=!1,de=null,te=null,fe=null,ye=null,re=null,Pe=null,Ce=null,ft=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},u={},h={},p=new WeakMap,x=[],g=null,m=!1,f=null,v=null,A=null,S=null,T=null,E=null,R=null,y=new Le(0,0,0),w=0,L=!1,C=null,I=null,U=null,P=null,z=null,H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,J=0,Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(Z)[1]),G=J>=1):Z.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),G=J>=2);let Q=null,ie={},Ie=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),ot=new vt().fromArray(Ie),Je=new vt().fromArray(Ee);function Ye(N,de,te,fe){let ye=new Uint8Array(4),re=n.createTexture();n.bindTexture(N,re),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<te;Pe++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(de+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return re}let j={};j[n.TEXTURE_2D]=Ye(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=Ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=Ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=Ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(Ds),ze(!1),tt(Ic),ne(n.CULL_FACE),Ge(Zn);function ne(N){d[N]!==!0&&(n.enable(N),d[N]=!0)}function pe(N){d[N]!==!1&&(n.disable(N),d[N]=!1)}function De(N,de){return h[N]!==de?(n.bindFramebuffer(N,de),h[N]=de,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function ve(N,de){let te=x,fe=!1;if(N){te=p.get(de),te===void 0&&(te=[],p.set(de,te));let ye=N.textures;if(te.length!==ye.length||te[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Pe=ye.length;re<Pe;re++)te[re]=n.COLOR_ATTACHMENT0+re;te.length=ye.length,fe=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,fe=!0);fe&&n.drawBuffers(te)}function Ve(N){return g!==N?(n.useProgram(N),g=N,!0):!1}let dt={[ns]:n.FUNC_ADD,[Du]:n.FUNC_SUBTRACT,[Nu]:n.FUNC_REVERSE_SUBTRACT};dt[Uu]=n.MIN,dt[Fu]=n.MAX;let Be={[Ou]:n.ZERO,[Bu]:n.ONE,[ku]:n.SRC_COLOR,[Nc]:n.SRC_ALPHA,[Xu]:n.SRC_ALPHA_SATURATE,[Hu]:n.DST_COLOR,[Vu]:n.DST_ALPHA,[zu]:n.ONE_MINUS_SRC_COLOR,[Uc]:n.ONE_MINUS_SRC_ALPHA,[Wu]:n.ONE_MINUS_DST_COLOR,[Gu]:n.ONE_MINUS_DST_ALPHA,[qu]:n.CONSTANT_COLOR,[Yu]:n.ONE_MINUS_CONSTANT_COLOR,[Zu]:n.CONSTANT_ALPHA,[Ju]:n.ONE_MINUS_CONSTANT_ALPHA};function Ge(N,de,te,fe,ye,re,Pe,Ce,ft,nt){if(N===Zn){m===!0&&(pe(n.BLEND),m=!1);return}if(m===!1&&(ne(n.BLEND),m=!0),N!==Lu){if(N!==f||nt!==L){if((v!==ns||T!==ns)&&(n.blendEquation(n.FUNC_ADD),v=ns,T=ns),nt)switch(N){case $s:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pc:n.blendFunc(n.ONE,n.ONE);break;case Lc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Oe("WebGLState: Invalid blending: ",N);break}else switch(N){case $s:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Lc:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",N);break}A=null,S=null,E=null,R=null,y.set(0,0,0),w=0,f=N,L=nt}return}ye=ye||de,re=re||te,Pe=Pe||fe,(de!==v||ye!==T)&&(n.blendEquationSeparate(dt[de],dt[ye]),v=de,T=ye),(te!==A||fe!==S||re!==E||Pe!==R)&&(n.blendFuncSeparate(Be[te],Be[fe],Be[re],Be[Pe]),A=te,S=fe,E=re,R=Pe),(Ce.equals(y)===!1||ft!==w)&&(n.blendColor(Ce.r,Ce.g,Ce.b,ft),y.copy(Ce),w=ft),f=N,L=!1}function rt(N,de){N.side===Mn?pe(n.CULL_FACE):ne(n.CULL_FACE);let te=N.side===jt;de&&(te=!te),ze(te),N.blending===$s&&N.transparent===!1?Ge(Zn):Ge(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let fe=N.stencilWrite;o.setTest(fe),fe&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ut(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function ze(N){C!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),C=N)}function tt(N){N!==Ru?(ne(n.CULL_FACE),N!==I&&(N===Ic?n.cullFace(n.BACK):N===Iu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),I=N}function Tt(N){N!==U&&(G&&n.lineWidth(N),U=N)}function Ut(N,de,te){N?(ne(n.POLYGON_OFFSET_FILL),(P!==de||z!==te)&&(P=de,z=te,a.getReversed()&&(de=-de),n.polygonOffset(de,te))):pe(n.POLYGON_OFFSET_FILL)}function mt(N){N?ne(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function wt(N){N===void 0&&(N=n.TEXTURE0+H-1),Q!==N&&(n.activeTexture(N),Q=N)}function B(N,de,te){te===void 0&&(Q===null?te=n.TEXTURE0+H-1:te=Q);let fe=ie[te];fe===void 0&&(fe={type:void 0,texture:void 0},ie[te]=fe),(fe.type!==N||fe.texture!==de)&&(Q!==te&&(n.activeTexture(te),Q=te),n.bindTexture(N,de||j[N]),fe.type=N,fe.texture=de)}function $(){let N=ie[Q];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function se(){try{n.compressedTexImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function _(){try{n.texSubImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function D(){try{n.texSubImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function oe(){try{n.texStorage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function ae(){try{n.texStorage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function K(){try{n.texImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function ee(){try{n.texImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function le(N){return u[N]!==void 0?u[N]:n.getParameter(N)}function Ae(N,de){u[N]!==de&&(n.pixelStorei(N,de),u[N]=de)}function ue(N){ot.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),ot.copy(N))}function he(N){Je.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Je.copy(N))}function ce(N,de){let te=c.get(de);te===void 0&&(te=new WeakMap,c.set(de,te));let fe=te.get(N);fe===void 0&&(fe=n.getUniformBlockIndex(de,N.name),te.set(N,fe))}function Me(N,de){let fe=c.get(de).get(N);l.get(de)!==fe&&(n.uniformBlockBinding(de,fe,N.__bindingPointIndex),l.set(de,fe))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},u={},Q=null,ie={},h={},p=new WeakMap,x=[],g=null,m=!1,f=null,v=null,A=null,S=null,T=null,E=null,R=null,y=new Le(0,0,0),w=0,L=!1,C=null,I=null,U=null,P=null,z=null,ot.set(0,0,n.canvas.width,n.canvas.height),Je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:pe,bindFramebuffer:De,drawBuffers:ve,useProgram:Ve,setBlending:Ge,setMaterial:rt,setFlipSided:ze,setCullFace:tt,setLineWidth:Tt,setPolygonOffset:Ut,setScissorTest:mt,activeTexture:wt,bindTexture:B,unbindTexture:$,compressedTexImage2D:se,compressedTexImage3D:b,texImage2D:K,texImage3D:ee,pixelStorei:Ae,getParameter:le,updateUBOMapping:ce,uniformBlockBinding:Me,texStorage2D:oe,texStorage3D:ae,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:ue,viewport:he,reset:Fe}}function C_(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,d=new WeakMap,u=new Set,h,p=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return x?new OffscreenCanvas(b,_):Us("canvas")}function m(b,_,D){let V=1,q=se(b);if((q.width>D||q.height>D)&&(V=D/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let oe=Math.floor(V*q.width),ae=Math.floor(V*q.height);h===void 0&&(h=g(oe,ae));let K=_?g(oe,ae):h;return K.width=oe,K.height=ae,K.getContext("2d").drawImage(b,0,0,oe,ae),Ne("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+oe+"x"+ae+")."),K}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),b;return b}function f(b){return b.generateMipmaps}function v(b){n.generateMipmap(b)}function A(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(b,_,D,V,q,oe=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ae;V&&(ae=e.get("EXT_texture_norm16"),ae||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=_;if(_===n.RED&&(D===n.FLOAT&&(K=n.R32F),D===n.HALF_FLOAT&&(K=n.R16F),D===n.UNSIGNED_BYTE&&(K=n.R8),D===n.UNSIGNED_SHORT&&ae&&(K=ae.R16_EXT),D===n.SHORT&&ae&&(K=ae.R16_SNORM_EXT)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(K=n.R8UI),D===n.UNSIGNED_SHORT&&(K=n.R16UI),D===n.UNSIGNED_INT&&(K=n.R32UI),D===n.BYTE&&(K=n.R8I),D===n.SHORT&&(K=n.R16I),D===n.INT&&(K=n.R32I)),_===n.RG&&(D===n.FLOAT&&(K=n.RG32F),D===n.HALF_FLOAT&&(K=n.RG16F),D===n.UNSIGNED_BYTE&&(K=n.RG8),D===n.UNSIGNED_SHORT&&ae&&(K=ae.RG16_EXT),D===n.SHORT&&ae&&(K=ae.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(K=n.RG8UI),D===n.UNSIGNED_SHORT&&(K=n.RG16UI),D===n.UNSIGNED_INT&&(K=n.RG32UI),D===n.BYTE&&(K=n.RG8I),D===n.SHORT&&(K=n.RG16I),D===n.INT&&(K=n.RG32I)),_===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(K=n.RGB8UI),D===n.UNSIGNED_SHORT&&(K=n.RGB16UI),D===n.UNSIGNED_INT&&(K=n.RGB32UI),D===n.BYTE&&(K=n.RGB8I),D===n.SHORT&&(K=n.RGB16I),D===n.INT&&(K=n.RGB32I)),_===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),D===n.UNSIGNED_INT&&(K=n.RGBA32UI),D===n.BYTE&&(K=n.RGBA8I),D===n.SHORT&&(K=n.RGBA16I),D===n.INT&&(K=n.RGBA32I)),_===n.RGB&&(D===n.UNSIGNED_SHORT&&ae&&(K=ae.RGB16_EXT),D===n.SHORT&&ae&&(K=ae.RGB16_SNORM_EXT),D===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),_===n.RGBA){let ee=oe?Er:$e.getTransfer(q);D===n.FLOAT&&(K=n.RGBA32F),D===n.HALF_FLOAT&&(K=n.RGBA16F),D===n.UNSIGNED_BYTE&&(K=ee===st?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT&&ae&&(K=ae.RGBA16_EXT),D===n.SHORT&&ae&&(K=ae.RGBA16_SNORM_EXT),D===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function T(b,_){let D;return b?_===null||_===Fn||_===Qs?D=n.DEPTH24_STENCIL8:_===Sn?D=n.DEPTH32F_STENCIL8:_===js&&(D=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Fn||_===Qs?D=n.DEPTH_COMPONENT24:_===Sn?D=n.DEPTH_COMPONENT32F:_===js&&(D=n.DEPTH_COMPONENT16),D}function E(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==yt&&b.minFilter!==Pt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){let _=b.target;_.removeEventListener("dispose",R),w(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&u.delete(_)}function y(b){let _=b.target;_.removeEventListener("dispose",y),C(_)}function w(b){let _=i.get(b);if(_.__webglInit===void 0)return;let D=b.source,V=p.get(D);if(V){let q=V[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&L(b),Object.keys(V).length===0&&p.delete(D)}i.remove(b)}function L(b){let _=i.get(b);n.deleteTexture(_.__webglTexture);let D=b.source,V=p.get(D);delete V[_.__cacheKey],a.memory.textures--}function C(b){let _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let q=0;q<_.__webglFramebuffer[V].length;q++)n.deleteFramebuffer(_.__webglFramebuffer[V][q]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let D=b.textures;for(let V=0,q=D.length;V<q;V++){let oe=i.get(D[V]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(D[V])}i.remove(b)}let I=0;function U(){I=0}function P(){return I}function z(b){I=b}function H(){let b=I;return b>=s.maxTextures&&Ne("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),I+=1,b}function G(b){let _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function J(b,_){let D=i.get(b);if(b.isVideoTexture&&B(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&D.__version!==b.version){let V=b.image;if(V===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{pe(D,b,_);return}}else b.isExternalTexture&&(D.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function Z(b,_){let D=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&D.__version!==b.version){pe(D,b,_);return}else b.isExternalTexture&&(D.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function Q(b,_){let D=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&D.__version!==b.version){pe(D,b,_);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function ie(b,_){let D=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&D.__version!==b.version){De(D,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}let Ie={[$a]:n.REPEAT,[xn]:n.CLAMP_TO_EDGE,[Ka]:n.MIRRORED_REPEAT},Ee={[yt]:n.NEAREST,[ju]:n.NEAREST_MIPMAP_NEAREST,[Hr]:n.NEAREST_MIPMAP_LINEAR,[Pt]:n.LINEAR,[Eo]:n.LINEAR_MIPMAP_NEAREST,[Ui]:n.LINEAR_MIPMAP_LINEAR},ot={[nd]:n.NEVER,[od]:n.ALWAYS,[id]:n.LESS,[ul]:n.LEQUAL,[sd]:n.EQUAL,[dl]:n.GEQUAL,[rd]:n.GREATER,[ad]:n.NOTEQUAL};function Je(b,_){if(_.type===Sn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Pt||_.magFilter===Eo||_.magFilter===Hr||_.magFilter===Ui||_.minFilter===Pt||_.minFilter===Eo||_.minFilter===Hr||_.minFilter===Ui)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Ie[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Ie[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Ie[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Ee[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Ee[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ot[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===yt||_.minFilter!==Hr&&_.minFilter!==Ui||_.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ye(b,_){let D=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));let V=_.source,q=p.get(V);q===void 0&&(q={},p.set(V,q));let oe=G(_);if(oe!==b.__cacheKey){q[oe]===void 0&&(q[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,D=!0),q[oe].usedTimes++;let ae=q[b.__cacheKey];ae!==void 0&&(q[b.__cacheKey].usedTimes--,ae.usedTimes===0&&L(_)),b.__cacheKey=oe,b.__webglTexture=q[oe].texture}return D}function j(b,_,D){return Math.floor(Math.floor(b/D)/_)}function ne(b,_,D,V){let oe=b.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,D,V,_.data);else{oe.sort((Ae,ue)=>Ae.start-ue.start);let ae=0;for(let Ae=1;Ae<oe.length;Ae++){let ue=oe[ae],he=oe[Ae],ce=ue.start+ue.count,Me=j(he.start,_.width,4),Fe=j(ue.start,_.width,4);he.start<=ce+1&&Me===Fe&&j(he.start+he.count-1,_.width,4)===Me?ue.count=Math.max(ue.count,he.start+he.count-ue.start):(++ae,oe[ae]=he)}oe.length=ae+1;let K=t.getParameter(n.UNPACK_ROW_LENGTH),ee=t.getParameter(n.UNPACK_SKIP_PIXELS),le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Ae=0,ue=oe.length;Ae<ue;Ae++){let he=oe[Ae],ce=Math.floor(he.start/4),Me=Math.ceil(he.count/4),Fe=ce%_.width,N=Math.floor(ce/_.width),de=Me,te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Fe,N,de,te,D,V,_.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,K),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(n.UNPACK_SKIP_ROWS,le)}}function pe(b,_,D){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);let q=Ye(b,_),oe=_.source;t.bindTexture(V,b.__webglTexture,n.TEXTURE0+D);let ae=i.get(oe);if(oe.version!==ae.__version||q===!0){if(t.activeTexture(n.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let te=$e.getPrimaries($e.workingColorSpace),fe=_.colorSpace===fi?null:$e.getPrimaries(_.colorSpace),ye=_.colorSpace===fi||te===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let ee=m(_.image,!1,s.maxTextureSize);ee=$(_,ee);let le=r.convert(_.format,_.colorSpace),Ae=r.convert(_.type),ue=S(_.internalFormat,le,Ae,_.normalized,_.colorSpace,_.isVideoTexture);Je(V,_);let he,ce=_.mipmaps,Me=_.isVideoTexture!==!0,Fe=ae.__version===void 0||q===!0,N=oe.dataReady,de=E(_,ee);if(_.isDepthTexture)ue=T(_.format===Fi,_.type),Fe&&(Me?t.texStorage2D(n.TEXTURE_2D,1,ue,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,ue,ee.width,ee.height,0,le,Ae,null));else if(_.isDataTexture)if(ce.length>0){Me&&Fe&&t.texStorage2D(n.TEXTURE_2D,de,ue,ce[0].width,ce[0].height);for(let te=0,fe=ce.length;te<fe;te++)he=ce[te],Me?N&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,he.width,he.height,le,Ae,he.data):t.texImage2D(n.TEXTURE_2D,te,ue,he.width,he.height,0,le,Ae,he.data);_.generateMipmaps=!1}else Me?(Fe&&t.texStorage2D(n.TEXTURE_2D,de,ue,ee.width,ee.height),N&&ne(_,ee,le,Ae)):t.texImage2D(n.TEXTURE_2D,0,ue,ee.width,ee.height,0,le,Ae,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Me&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,ce[0].width,ce[0].height,ee.depth);for(let te=0,fe=ce.length;te<fe;te++)if(he=ce[te],_.format!==nn)if(le!==null)if(Me){if(N)if(_.layerUpdates.size>0){let ye=nh(he.width,he.height,_.format,_.type);for(let re of _.layerUpdates){let Pe=he.data.subarray(re*ye/he.data.BYTES_PER_ELEMENT,(re+1)*ye/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,re,he.width,he.height,1,le,Pe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,ee.depth,le,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,ue,he.width,he.height,ee.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,ee.depth,le,Ae,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,ue,he.width,he.height,ee.depth,0,le,Ae,he.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Me&&Fe&&t.texStorage2D(n.TEXTURE_2D,de,ue,ce[0].width,ce[0].height);for(let te=0,fe=ce.length;te<fe;te++)he=ce[te],_.format!==nn?le!==null?Me?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,he.width,he.height,le,he.data):t.compressedTexImage2D(n.TEXTURE_2D,te,ue,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?N&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,he.width,he.height,le,Ae,he.data):t.texImage2D(n.TEXTURE_2D,te,ue,he.width,he.height,0,le,Ae,he.data)}else if(_.isDataArrayTexture)if(Me){if(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,ue,ee.width,ee.height,ee.depth),N)if(_.layerUpdates.size>0){let te=nh(ee.width,ee.height,_.format,_.type);for(let fe of _.layerUpdates){let ye=ee.data.subarray(fe*te/ee.data.BYTES_PER_ELEMENT,(fe+1)*te/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,ee.width,ee.height,1,le,Ae,ye)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,le,Ae,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,ee.width,ee.height,ee.depth,0,le,Ae,ee.data);else if(_.isData3DTexture)Me?(Fe&&t.texStorage3D(n.TEXTURE_3D,de,ue,ee.width,ee.height,ee.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,le,Ae,ee.data)):t.texImage3D(n.TEXTURE_3D,0,ue,ee.width,ee.height,ee.depth,0,le,Ae,ee.data);else if(_.isFramebufferTexture){if(Fe)if(Me)t.texStorage2D(n.TEXTURE_2D,de,ue,ee.width,ee.height);else{let te=ee.width,fe=ee.height;for(let ye=0;ye<de;ye++)t.texImage2D(n.TEXTURE_2D,ye,ue,te,fe,0,le,Ae,null),te>>=1,fe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let te=n.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ee.parentNode!==te){te.appendChild(ee),u.add(_),te.onpaint=fe=>{let ye=fe.changedElements;for(let re of u)ye.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ee);else{let ye=n.RGBA,re=n.RGBA,Pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ye,re,Pe,ee)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ce.length>0){if(Me&&Fe){let te=se(ce[0]);t.texStorage2D(n.TEXTURE_2D,de,ue,te.width,te.height)}for(let te=0,fe=ce.length;te<fe;te++)he=ce[te],Me?N&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,le,Ae,he):t.texImage2D(n.TEXTURE_2D,te,ue,le,Ae,he);_.generateMipmaps=!1}else if(Me){if(Fe){let te=se(ee);t.texStorage2D(n.TEXTURE_2D,de,ue,te.width,te.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le,Ae,ee)}else t.texImage2D(n.TEXTURE_2D,0,ue,le,Ae,ee);f(_)&&v(V),ae.__version=oe.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function De(b,_,D){if(_.image.length!==6)return;let V=Ye(b,_),q=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+D);let oe=i.get(q);if(q.version!==oe.__version||V===!0){t.activeTexture(n.TEXTURE0+D);let ae=$e.getPrimaries($e.workingColorSpace),K=_.colorSpace===fi?null:$e.getPrimaries(_.colorSpace),ee=_.colorSpace===fi||ae===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let le=_.isCompressedTexture||_.image[0].isCompressedTexture,Ae=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let re=0;re<6;re++)!le&&!Ae?ue[re]=m(_.image[re],!0,s.maxCubemapSize):ue[re]=Ae?_.image[re].image:_.image[re],ue[re]=$(_,ue[re]);let he=ue[0],ce=r.convert(_.format,_.colorSpace),Me=r.convert(_.type),Fe=S(_.internalFormat,ce,Me,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,de=oe.__version===void 0||V===!0,te=q.dataReady,fe=E(_,he);Je(n.TEXTURE_CUBE_MAP,_);let ye;if(le){N&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Fe,he.width,he.height);for(let re=0;re<6;re++){ye=ue[re].mipmaps;for(let Pe=0;Pe<ye.length;Pe++){let Ce=ye[Pe];_.format!==nn?ce!==null?N?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Ce.width,Ce.height,ce,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Fe,Ce.width,Ce.height,0,Ce.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Ce.width,Ce.height,ce,Me,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Fe,Ce.width,Ce.height,0,ce,Me,Ce.data)}}}else{if(ye=_.mipmaps,N&&de){ye.length>0&&fe++;let re=se(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Fe,re.width,re.height)}for(let re=0;re<6;re++)if(Ae){N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ue[re].width,ue[re].height,ce,Me,ue[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Fe,ue[re].width,ue[re].height,0,ce,Me,ue[re].data);for(let Pe=0;Pe<ye.length;Pe++){let ft=ye[Pe].image[re].image;N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,ft.width,ft.height,ce,Me,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Fe,ft.width,ft.height,0,ce,Me,ft.data)}}else{N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ce,Me,ue[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Fe,ce,Me,ue[re]);for(let Pe=0;Pe<ye.length;Pe++){let Ce=ye[Pe];N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,ce,Me,Ce.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Fe,ce,Me,Ce.image[re])}}}f(_)&&v(n.TEXTURE_CUBE_MAP),oe.__version=q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ve(b,_,D,V,q,oe){let ae=r.convert(D.format,D.colorSpace),K=r.convert(D.type),ee=S(D.internalFormat,ae,K,D.normalized,D.colorSpace),le=i.get(_),Ae=i.get(D);if(Ae.__renderTarget=_,!le.__hasExternalTextures){let ue=Math.max(1,_.width>>oe),he=Math.max(1,_.height>>oe);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,oe,ee,ue,he,_.depth,0,ae,K,null):t.texImage2D(q,oe,ee,ue,he,0,ae,K,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),wt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,q,Ae.__webglTexture,0,mt(_)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,q,Ae.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(b,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){let V=_.depthTexture,q=V&&V.isDepthTexture?V.type:null,oe=T(_.stencilBuffer,q),ae=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;wt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(_),oe,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(_),oe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,oe,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,b)}else{let V=_.textures;for(let q=0;q<V.length;q++){let oe=V[q],ae=r.convert(oe.format,oe.colorSpace),K=r.convert(oe.type),ee=S(oe.internalFormat,ae,K,oe.normalized,oe.colorSpace);wt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(_),ee,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(_),ee,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ee,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function dt(b,_,D){let V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=i.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Je(n.TEXTURE_CUBE_MAP,_.depthTexture);let le=r.convert(_.depthTexture.format),Ae=r.convert(_.depthTexture.type),ue;_.depthTexture.format===Xn?ue=n.DEPTH_COMPONENT24:_.depthTexture.format===Fi&&(ue=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ue,_.width,_.height,0,le,Ae,null)}}else J(_.depthTexture,0);let oe=q.__webglTexture,ae=mt(_),K=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,ee=_.depthTexture.format===Fi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Xn)wt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,K,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,ee,K,oe,0);else if(_.depthTexture.format===Fi)wt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,K,oe,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,ee,K,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(b){let _=i.get(b),D=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){let V=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){let q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=V}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let V=0;V<6;V++)dt(_.__webglFramebuffer[V],b,V);else{let V=b.texture.mipmaps;V&&V.length>0?dt(_.__webglFramebuffer[0],b,0):dt(_.__webglFramebuffer,b,0)}else if(D){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),Ve(_.__webglDepthbuffer[V],b,!1);else{let q=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,oe)}}else{let V=b.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ve(_.__webglDepthbuffer,b,!1);else{let q=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ge(b,_,D){let V=i.get(b);_!==void 0&&ve(V.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Be(b)}function rt(b){let _=b.texture,D=i.get(b),V=i.get(_);b.addEventListener("dispose",y);let q=b.textures,oe=b.isWebGLCubeRenderTarget===!0,ae=q.length>1;if(ae||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),oe){D.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[K]=[];for(let ee=0;ee<_.mipmaps.length;ee++)D.__webglFramebuffer[K][ee]=n.createFramebuffer()}else D.__webglFramebuffer[K]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)D.__webglFramebuffer[K]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(ae)for(let K=0,ee=q.length;K<ee;K++){let le=i.get(q[K]);le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&wt(b)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let K=0;K<q.length;K++){let ee=q[K];D.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[K]);let le=r.convert(ee.format,ee.colorSpace),Ae=r.convert(ee.type),ue=S(ee.internalFormat,le,Ae,ee.normalized,ee.colorSpace,b.isXRRenderTarget===!0),he=mt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ue,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,D.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),Ve(D.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Je(n.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let ee=0;ee<_.mipmaps.length;ee++)ve(D.__webglFramebuffer[K][ee],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ee);else ve(D.__webglFramebuffer[K],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);f(_)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let K=0,ee=q.length;K<ee;K++){let le=q[K],Ae=i.get(le),ue=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,Ae.__webglTexture),Je(ue,le),ve(D.__webglFramebuffer,b,le,n.COLOR_ATTACHMENT0+K,ue,0),f(le)&&v(ue)}t.unbindTexture()}else{let K=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(K=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(K,V.__webglTexture),Je(K,_),_.mipmaps&&_.mipmaps.length>0)for(let ee=0;ee<_.mipmaps.length;ee++)ve(D.__webglFramebuffer[ee],b,_,n.COLOR_ATTACHMENT0,K,ee);else ve(D.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,K,0);f(_)&&v(K),t.unbindTexture()}b.depthBuffer&&Be(b)}function ze(b){let _=b.textures;for(let D=0,V=_.length;D<V;D++){let q=_[D];if(f(q)){let oe=A(b),ae=i.get(q).__webglTexture;t.bindTexture(oe,ae),v(oe),t.unbindTexture()}}}let tt=[],Tt=[];function Ut(b){if(b.samples>0){if(wt(b)===!1){let _=b.textures,D=b.width,V=b.height,q=n.COLOR_BUFFER_BIT,oe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(b),K=_.length>1;if(K)for(let le=0;le<_.length;le++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);let ee=b.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let le=0;le<_.length;le++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Ae=i.get(_[le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,D,V,0,0,D,V,q,n.NEAREST),l===!0&&(tt.length=0,Tt.length=0,tt.push(n.COLOR_ATTACHMENT0+le),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(tt.push(oe),Tt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Tt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,tt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let le=0;le<_.length;le++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);let Ae=i.get(_[le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function mt(b){return Math.min(s.maxSamples,b.samples)}function wt(b){let _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function B(b){let _=a.render.frame;d.get(b)!==_&&(d.set(b,_),b.update())}function $(b,_){let D=b.colorSpace,V=b.format,q=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||D!==Tr&&D!==fi&&($e.getTransfer(D)===st?(V!==nn||q!==tn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",D)),_}function se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=U,this.getTextureUnits=P,this.setTextureUnits=z,this.setTexture2D=J,this.setTexture2DArray=Z,this.setTexture3D=Q,this.setTextureCube=ie,this.rebindTextures=Ge,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function R_(n,e){function t(i,s=fi){let r,a=$e.getTransfer(s);if(i===tn)return n.UNSIGNED_BYTE;if(i===Co)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ro)return n.UNSIGNED_SHORT_5_5_5_1;if(i===qc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Yc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wc)return n.BYTE;if(i===Xc)return n.SHORT;if(i===js)return n.UNSIGNED_SHORT;if(i===Ao)return n.INT;if(i===Fn)return n.UNSIGNED_INT;if(i===Sn)return n.FLOAT;if(i===On)return n.HALF_FLOAT;if(i===Zc)return n.ALPHA;if(i===Jc)return n.RGB;if(i===nn)return n.RGBA;if(i===Xn)return n.DEPTH_COMPONENT;if(i===Fi)return n.DEPTH_STENCIL;if(i===Io)return n.RED;if(i===Po)return n.RED_INTEGER;if(i===Oi)return n.RG;if(i===Lo)return n.RG_INTEGER;if(i===Do)return n.RGBA_INTEGER;if(i===Wr||i===Xr||i===qr||i===Yr)if(a===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Wr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Wr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===No||i===Uo||i===Fo||i===Oo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===No)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Bo||i===ko||i===zo||i===Vo||i===Go||i===Zr||i===Ho)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Bo||i===ko)return a===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===zo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Vo)return r.COMPRESSED_R11_EAC;if(i===Go)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Zr)return r.COMPRESSED_RG11_EAC;if(i===Ho)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Wo||i===Xo||i===qo||i===Yo||i===Zo||i===Jo||i===$o||i===Ko||i===jo||i===Qo||i===el||i===tl||i===nl||i===il)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Wo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Jo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$o)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ko)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===el)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===tl)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nl)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===il)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sl||i===rl||i===al)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===sl)return a===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ol||i===ll||i===Jr||i===cl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ol)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var I_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,P_=`
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

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Fr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new $t({vertexShader:I_,fragmentShader:P_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new vn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xh=class extends qn{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,p=null,x=null,g=typeof XRWebGLBinding<"u",m=new gh,f={},v=t.getContextAttributes(),A=null,S=null,T=[],E=[],R=new Ue,y=null,w=null,L=new Jt;L.viewport=new vt;let C=new Jt;C.viewport=new vt;let I=[L,C],U=new bo,P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=T[j];return ne===void 0&&(ne=new zs,T[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=T[j];return ne===void 0&&(ne=new zs,T[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=T[j];return ne===void 0&&(ne=new zs,T[j]=ne),ne.getHandSpace()};function H(j){let ne=E.indexOf(j.inputSource);if(ne===-1)return;let pe=T[ne];pe!==void 0&&(pe.update(j.inputSource,j.frame,c||a),pe.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",J);for(let j=0;j<T.length;j++){let ne=E[j];ne!==null&&(E[j]=null,T[j].disconnect(ne))}P=null,z=null,m.reset();for(let j in f)delete f[j];if(e.setRenderTarget(A),p=null,h=null,u=null,s=null,S=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),w!==null){let j=w.camera;j.fov=w.fov,j.zoom=w.zoom,j.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",G),s.addEventListener("inputsourceschange",J),v.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,De=null,ve=null;v.depth&&(ve=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=v.stencil?Fi:Xn,De=v.stencil?Qs:Fn);let Ve={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(Ve),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Xt(h.textureWidth,h.textureHeight,{format:nn,type:tn,depthTexture:new Ri(h.textureWidth,h.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let pe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Xt(p.framebufferWidth,p.framebufferHeight,{format:nn,type:tn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(j){for(let ne=0;ne<j.removed.length;ne++){let pe=j.removed[ne],De=E.indexOf(pe);De>=0&&(E[De]=null,T[De].disconnect(pe))}for(let ne=0;ne<j.added.length;ne++){let pe=j.added[ne],De=E.indexOf(pe);if(De===-1){for(let Ve=0;Ve<T.length;Ve++)if(Ve>=E.length){E.push(pe),De=Ve;break}else if(E[Ve]===null){E[Ve]=pe,De=Ve;break}if(De===-1)break}let ve=T[De];ve&&ve.connect(pe)}}let Z=new k,Q=new k;function ie(j,ne,pe){Z.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(pe.matrixWorld);let De=Z.distanceTo(Q),ve=ne.projectionMatrix.elements,Ve=pe.projectionMatrix.elements,dt=ve[14]/(ve[10]-1),Be=ve[14]/(ve[10]+1),Ge=(ve[9]+1)/ve[5],rt=(ve[9]-1)/ve[5],ze=(ve[8]-1)/ve[0],tt=(Ve[8]+1)/Ve[0],Tt=dt*ze,Ut=dt*tt,mt=De/(-ze+tt),wt=mt*-ze;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(wt),j.translateZ(mt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ve[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let B=dt+mt,$=Be+mt,se=Tt-wt,b=Ut+(De-wt),_=Ge*Be/$*B,D=rt*Be/$*B;j.projectionMatrix.makePerspective(se,b,_,D,B,$),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Ie(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ne=j.near,pe=j.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),U.near=C.near=L.near=ne,U.far=C.far=L.far=pe,(P!==U.near||z!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),P=U.near,z=U.far),U.layers.mask=j.layers.mask|6,L.layers.mask=U.layers.mask&-5,C.layers.mask=U.layers.mask&-3;let De=j.parent,ve=U.cameras;Ie(U,De);for(let Ve=0;Ve<ve.length;Ve++)Ie(ve[Ve],De);ve.length===2?ie(U,L,C):U.projectionMatrix.copy(L.projectionMatrix),w===null&&j.isPerspectiveCamera&&(w={camera:j,fov:j.fov,zoom:j.zoom}),Ee(j,U,De)};function Ee(j,ne,pe){pe===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(pe.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Os*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(j){return f[j]};let ot=null;function Je(j,ne){if(d=ne.getViewerPose(c||a),x=ne,d!==null){let pe=d.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let De=!1;pe.length!==U.cameras.length&&(U.cameras.length=0,De=!0);for(let Be=0;Be<pe.length;Be++){let Ge=pe[Be],rt=null;if(p!==null)rt=p.getViewport(Ge);else{let tt=u.getViewSubImage(h,Ge);rt=tt.viewport,Be===0&&(e.setRenderTargetTextures(S,tt.colorTexture,tt.depthStencilTexture),e.setRenderTarget(S))}let ze=I[Be];ze===void 0&&(ze=new Jt,ze.layers.enable(Be),ze.viewport=new vt,I[Be]=ze),ze.matrix.fromArray(Ge.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ge.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(rt.x,rt.y,rt.width,rt.height),Be===0&&(U.matrix.copy(ze.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),De===!0&&U.cameras.push(ze)}let ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=i.getBinding();let Be=u.getDepthInformation(pe[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,s.renderState)}if(ve&&ve.includes("camera-access")&&g){e.state.unbindTexture(),u=i.getBinding();for(let Be=0;Be<pe.length;Be++){let Ge=pe[Be].camera;if(Ge){let rt=f[Ge];rt||(rt=new Fr,f[Ge]=rt);let ze=u.getCameraImage(Ge);rt.sourceTexture=ze}}}}for(let pe=0;pe<T.length;pe++){let De=E[pe],ve=T[pe];De!==null&&ve!==void 0&&ve.update(De,ne,c||a)}ot&&ot(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),x=null}let Ye=new Bd;Ye.setAnimationLoop(Je),this.setAnimationLoop=function(j){ot=j},this.dispose=function(){}}},L_=new We,Wd=new ke;Wd.set(-1,0,0,0,1,0,0,0,1);function D_(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Qc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,v,A,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(r(m,f),x(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,A):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===jt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===jt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let v=e.get(f),A=v.envMap,S=v.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(L_.makeRotationFromEuler(S)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Wd),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=A*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){let v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function N_(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){let E=T.program;i.uniformBlockBinding(S,E)}function c(S,T){let E=s[S.id];E===void 0&&(m(S),E=d(S),s[S.id]=E,S.addEventListener("dispose",v));let R=T.program;i.updateUBOMapping(S,R);let y=e.render.frame;r[S.id]!==y&&(h(S),r[S.id]=y)}function d(S){let T=u();S.__bindingPointIndex=T;let E=n.createBuffer(),R=S.__size,y=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){let T=s[S.id],E=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let y=0,w=E.length;y<w;y++){let L=E[y];if(Array.isArray(L))for(let C=0,I=L.length;C<I;C++)p(L[C],y,C,R);else p(L,y,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,T,E,R){if(g(S,T,E,R)===!0){let y=S.__offset,w=S.value;if(Array.isArray(w)){let L=0;for(let C=0;C<w.length;C++){let I=w[C],U=f(I);x(I,S.__data,L),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(L+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,S.__data)}}function x(S,T,E){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,E)}function g(S,T,E,R){let y=S.value,w=T+"_"+E;if(R[w]===void 0)return typeof y=="number"||typeof y=="boolean"?R[w]=y:ArrayBuffer.isView(y)?R[w]=y.slice():R[w]=y.clone(),!0;{let L=R[w];if(typeof y=="number"||typeof y=="boolean"){if(L!==y)return R[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(L.equals(y)===!1)return L.copy(y),!0}}return!1}function m(S){let T=S.uniforms,E=0,R=16;for(let w=0,L=T.length;w<L;w++){let C=Array.isArray(T[w])?T[w]:[T[w]];for(let I=0,U=C.length;I<U;I++){let P=C[I],z=Array.isArray(P.value)?P.value:[P.value];for(let H=0,G=z.length;H<G;H++){let J=z[H],Z=f(J),Q=E%R,ie=Q%Z.boundary,Ie=Q+ie;E+=ie,Ie!==0&&R-Ie<Z.storage&&(E+=R-Ie),P.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=E,E+=Z.storage}}}let y=E%R;return y>0&&(E+=R-y),S.__size=E,S.__cache={},this}function f(S){let T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",S),T}function v(S){let T=S.target;T.removeEventListener("dispose",v);let E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function A(){for(let S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}var U_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function F_(){return Jn===null&&(Jn=new ji(U_,16,16,Oi,On),Jn.name="DFG_LUT",Jn.minFilter=Pt,Jn.magFilter=Pt,Jn.wrapS=xn,Jn.wrapT=xn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var Qr=class{constructor(e={}){let{canvas:t=ld(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:p=tn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let g=p,m=new Set([Do,Lo,Po]),f=new Set([tn,Fn,js,Qs,Co,Ro]),v=new Uint32Array(4),A=new Int32Array(4),S=new k,T=null,E=null,R=[],y=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,C=!1,I=null,U=null,P=null,z=null;this._outputColorSpace=St;let H=0,G=0,J=null,Z=-1,Q=null,ie=new vt,Ie=new vt,Ee=null,ot=new Le(0),Je=0,Ye=t.width,j=t.height,ne=1,pe=null,De=null,ve=new vt(0,0,Ye,j),Ve=new vt(0,0,Ye,j),dt=!1,Be=new Gs,Ge=!1,rt=!1,ze=new We,tt=new k,Tt=new vt,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mt=!1;function wt(){return J===null?ne:1}let B=i;function $(M,O){return t.getContext(M,O)}let se,b,_,D,V,q,oe,ae,K,ee,le,Ae,ue,he,ce,Me,Fe,N,de,te,fe,ye,re;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",nt,!1),t.addEventListener("webglcontextcreationerror",wn,!1),B===null){let O="webgl2";if(B=$(O,M),B===null)throw $(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pe()}catch(M){throw t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",wn,!1),Oe("WebGLRenderer: "+M.message),M}function Pe(){se=new Hg(B),se.init(),fe=new R_(B,se),b=new Dg(B,se,e,fe),_=new A_(B,se),b.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),U=B.createFramebuffer(),P=B.createFramebuffer(),z=B.createFramebuffer(),D=new qg(B),V=new f_,q=new C_(B,se,_,V,b,fe,D),oe=new Gg(L),ae=new Zp(B),ye=new Pg(B,ae),K=new Wg(B,ae,D,ye),ee=new Zg(B,K,ae,ye,D),N=new Yg(B,b,q),ce=new Ng(V),le=new d_(L,oe,se,b,ye,ce),Ae=new D_(L,V),ue=new m_,he=new M_(se),Fe=new Ig(L,oe,_,ee,x,l),Me=new E_(L,ee,b),re=new N_(B,D,b,_),de=new Lg(B,se,D),te=new Xg(B,se,D),D.programs=le.programs,L.capabilities=b,L.extensions=se,L.properties=V,L.renderLists=ue,L.shadowMap=Me,L.state=_,L.info=D}g!==tn&&(w=new $g(g,t.width,t.height,o,s,r));let Ce=new xh(L,B);this.xr=Ce,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let M=se.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=se.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(M){M!==void 0&&(ne=M,this.setSize(Ye,j,!1))},this.getSize=function(M){return M.set(Ye,j)},this.setSize=function(M,O,Y=!0){if(Ce.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}Ye=M,j=O,t.width=Math.floor(M*ne),t.height=Math.floor(O*ne),Y===!0&&(t.style.width=M+"px",t.style.height=O+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(Ye*ne,j*ne).floor()},this.setDrawingBufferSize=function(M,O,Y){Ye=M,j=O,ne=Y,t.width=Math.floor(M*Y),t.height=Math.floor(O*Y),this.setViewport(0,0,M,O)},this.setEffects=function(M){if(g===tn){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let O=0;O<M.length;O++)if(M[O].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ie)},this.getViewport=function(M){return M.copy(ve)},this.setViewport=function(M,O,Y,W){M.isVector4?ve.set(M.x,M.y,M.z,M.w):ve.set(M,O,Y,W),_.viewport(ie.copy(ve).multiplyScalar(ne).round())},this.getScissor=function(M){return M.copy(Ve)},this.setScissor=function(M,O,Y,W){M.isVector4?Ve.set(M.x,M.y,M.z,M.w):Ve.set(M,O,Y,W),_.scissor(Ie.copy(Ve).multiplyScalar(ne).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(M){_.setScissorTest(dt=M)},this.setOpaqueSort=function(M){pe=M},this.setTransparentSort=function(M){De=M},this.getClearColor=function(M){return M.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(M=!0,O=!0,Y=!0){let W=0;if(M){let X=!1;if(J!==null){let xe=J.texture.format;X=m.has(xe)}if(X){let xe=J.texture.type,be=f.has(xe),ge=Fe.getClearColor(),we=Fe.getClearAlpha(),Re=ge.r,He=ge.g,Ze=ge.b;be?(v[0]=Re,v[1]=He,v[2]=Ze,v[3]=we,B.clearBufferuiv(B.COLOR,0,v)):(A[0]=Re,A[1]=He,A[2]=Ze,A[3]=we,B.clearBufferiv(B.COLOR,0,A))}else W|=B.COLOR_BUFFER_BIT}O&&(W|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),I=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",wn,!1),Fe.dispose(),ue.dispose(),he.dispose(),V.dispose(),oe.dispose(),ee.dispose(),ye.dispose(),re.dispose(),le.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",kh),Ce.removeEventListener("sessionend",zh),Xi.stop()};function ft(M){M.preventDefault(),Ar("WebGLRenderer: Context Lost."),C=!0}function nt(){Ar("WebGLRenderer: Context Restored."),C=!1;let M=D.autoReset,O=Me.enabled,Y=Me.autoUpdate,W=Me.needsUpdate,X=Me.type;Pe(),D.autoReset=M,Me.enabled=O,Me.autoUpdate=Y,Me.needsUpdate=W,Me.type=X}function wn(M){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Gn(M){let O=M.target;O.removeEventListener("dispose",Gn),Hf(O)}function Hf(M){Wf(M),V.remove(M)}function Wf(M){let O=V.get(M).programs;O!==void 0&&(O.forEach(function(Y){le.releaseProgram(Y)}),M.isShaderMaterial&&le.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,Y,W,X,xe){O===null&&(O=Ut);let be=X.isMesh&&X.matrixWorld.determinantAffine()<0,ge=Yf(M,O,Y,W,X);_.setMaterial(W,be);let we=Y.index,Re=1;if(W.wireframe===!0){if(we=K.getWireframeAttribute(Y),we===void 0)return;Re=2}let He=Y.drawRange,Ze=Y.attributes.position,Te=He.start*Re,it=(He.start+He.count)*Re;xe!==null&&(Te=Math.max(Te,xe.start*Re),it=Math.min(it,(xe.start+xe.count)*Re)),we!==null?(Te=Math.max(Te,0),it=Math.min(it,we.count)):Ze!=null&&(Te=Math.max(Te,0),it=Math.min(it,Ze.count));let Rt=it-Te;if(Rt<0||Rt===1/0)return;ye.setup(X,W,ge,Y,we);let gt,ct=de;if(we!==null&&(gt=ae.get(we),ct=te,ct.setIndex(gt)),X.isMesh)W.wireframe===!0?(_.setLineWidth(W.wireframeLinewidth*wt()),ct.setMode(B.LINES)):ct.setMode(B.TRIANGLES);else if(X.isLine){let zt=W.linewidth;zt===void 0&&(zt=1),_.setLineWidth(zt*wt()),X.isLineSegments?ct.setMode(B.LINES):X.isLineLoop?ct.setMode(B.LINE_LOOP):ct.setMode(B.LINE_STRIP)}else X.isPoints?ct.setMode(B.POINTS):X.isSprite&&ct.setMode(B.TRIANGLES);if(X.isBatchedMesh)if(se.get("WEBGL_multi_draw"))ct.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let zt=X._multiDrawStarts,Se=X._multiDrawCounts,Yt=X._multiDrawCount,Qe=we?ae.get(we).bytesPerElement:1,mn=V.get(W).currentProgram.getUniforms();for(let Hn=0;Hn<Yt;Hn++)mn.setValue(B,"_gl_DrawID",Hn),ct.render(zt[Hn]/Qe,Se[Hn])}else if(X.isInstancedMesh)ct.renderInstances(Te,Rt,X.count);else if(Y.isInstancedBufferGeometry){let zt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Se=Math.min(Y.instanceCount,zt);ct.renderInstances(Te,Rt,Se)}else ct.render(Te,Rt)};function Bh(M,O,Y,W){I!==null&&M.isNodeMaterial&&I.setObject(W,M),Ge===!0&&ce.setState(M,Y,!1),M.transparent===!0&&M.side===Mn&&M.forceSinglePass===!1?(M.side=jt,M.needsUpdate=!0,da(M,O,W),M.side=Di,M.needsUpdate=!0,da(M,O,W),M.side=Mn):da(M,O,W)}this.compile=function(M,O,Y=null){Y===null&&(Y=M),I!==null&&I.renderStart(M,O,Y),E=he.get(Y),E.init(O),y.push(E),Y.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),M!==Y&&M.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights(),I!==null&&I.updateLights(E.state.lightsArray),rt=this.localClippingEnabled,Ge=ce.init(this.clippingPlanes,rt),Ge===!0&&ce.setGlobalState(this.clippingPlanes,O),I!==null&&Me.render(E.state.shadowsArray,Y,O);let W=new Set;return M.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let xe=X.material;if(xe)if(Array.isArray(xe))for(let be=0;be<xe.length;be++){let ge=xe[be];Bh(ge,Y,O,X),W.add(ge)}else Bh(xe,Y,O,X),W.add(xe)}),E=y.pop(),I!==null&&I.renderEnd(),W},this.compileAsync=function(M,O,Y=null){let W=this.compile(M,O,Y);return new Promise(X=>{function xe(){if(W.forEach(function(be){let we=V.get(be).currentProgram;(we===void 0||we.isReady())&&W.delete(be)}),W.size===0){X(M);return}setTimeout(xe,10)}se.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Jl=null;function Xf(M){Jl&&Jl(M)}function kh(){Xi.stop()}function zh(){Xi.start()}let Xi=new Bd;Xi.setAnimationLoop(Xf),typeof self<"u"&&Xi.setContext(self),this.setAnimationLoop=function(M){Jl=M,Ce.setAnimationLoop(M),M===null?Xi.stop():Xi.start()},Ce.addEventListener("sessionstart",kh),Ce.addEventListener("sessionend",zh),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(M,O);let Y=Ce.enabled===!0&&Ce.isPresenting===!0,W=w!==null&&(J===null||Y)&&w.begin(L,J);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(O),O=Ce.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,O,J),E=he.get(M,y.length),E.init(O),E.state.textureUnits=q.getTextureUnits(),y.push(E),ze.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Be.setFromProjectionMatrix(ze,Rn,O.reversedDepth),rt=this.localClippingEnabled,Ge=ce.init(this.clippingPlanes,rt),T=ue.get(M,R.length),T.init(),R.push(T),Ce.enabled===!0&&Ce.isPresenting===!0){let be=L.xr.getDepthSensingMesh();be!==null&&$l(be,O,-1/0,L.sortObjects)}$l(M,O,0,L.sortObjects),T.finish(),I!==null&&I.updateLights(E.state.lightsArray),L.sortObjects===!0&&T.sort(pe,De),mt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,mt&&Fe.addToRenderList(T,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ge===!0&&ce.beginShadows();let X=E.state.shadowsArray;if(Me.render(X,M,O),Ge===!0&&ce.endShadows(),(W&&w.hasRenderPass())===!1){let be=T.opaque,ge=T.transmissive;if(E.setupLights(),O.isArrayCamera){let we=O.cameras;if(ge.length>0)for(let Re=0,He=we.length;Re<He;Re++){let Ze=we[Re];Gh(be,ge,M,Ze)}mt&&Fe.render(M);for(let Re=0,He=we.length;Re<He;Re++){let Ze=we[Re];Vh(T,M,Ze,Ze.viewport)}}else ge.length>0&&Gh(be,ge,M,O),mt&&Fe.render(M),Vh(T,M,O)}J!==null&&G===0&&(q.updateMultisampleRenderTarget(J),q.updateRenderTargetMipmap(J)),W&&w.end(L),M.isScene===!0&&M.onAfterRender(L,M,O),ye.resetDefaultState(),Z=-1,Q=null,y.pop(),y.length>0?(E=y[y.length-1],q.setTextureUnits(E.state.textureUnits),Ge===!0&&ce.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,I!==null&&I.renderEnd()};function $l(M,O,Y,W){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)Y=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Be)){W&&Tt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ze);let be=ee.update(M),ge=M.material;ge.visible&&T.push(M,be,ge,Y,Tt.z,null,O)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Be))){let be=ee.update(M),ge=M.material;if(W&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Tt.copy(M.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Tt.copy(be.boundingSphere.center)),Tt.applyMatrix4(M.matrixWorld).applyMatrix4(ze)),Array.isArray(ge)){let we=be.groups;for(let Re=0,He=we.length;Re<He;Re++){let Ze=we[Re],Te=ge[Ze.materialIndex];Te&&Te.visible&&T.push(M,be,Te,Y,Tt.z,Ze,O)}}else ge.visible&&T.push(M,be,ge,Y,Tt.z,null,O)}}let xe=M.children;for(let be=0,ge=xe.length;be<ge;be++)$l(xe[be],O,Y,W)}function Vh(M,O,Y,W){let{opaque:X,transmissive:xe,transparent:be}=M;E.setupLightsView(Y),Ge===!0&&ce.setGlobalState(L.clippingPlanes,Y),W&&_.viewport(ie.copy(W)),X.length>0&&ua(X,O,Y),xe.length>0&&ua(xe,O,Y),be.length>0&&ua(be,O,Y),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Gh(M,O,Y,W){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){let Te=se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new Xt(1,1,{generateMipmaps:!0,type:Te?On:tn,minFilter:Ui,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}let xe=E.state.transmissionRenderTarget[W.id],be=W.viewport||ie;xe.setSize(be.z*L.transmissionResolutionScale,be.w*L.transmissionResolutionScale);let ge=L.getRenderTarget(),we=L.getActiveCubeFace(),Re=L.getActiveMipmapLevel();L.setRenderTarget(xe),L.getClearColor(ot),Je=L.getClearAlpha(),Je<1&&L.setClearColor(16777215,.5),L.clear(),mt&&Fe.render(Y);let He=L.toneMapping;L.toneMapping=Un;let Ze=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),Ge===!0&&ce.setGlobalState(L.clippingPlanes,W),ua(M,Y,W),q.updateMultisampleRenderTarget(xe),q.updateRenderTargetMipmap(xe),se.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let it=0,Rt=O.length;it<Rt;it++){let gt=O[it],{object:ct,geometry:zt,material:Se,group:Yt}=gt;if(Se.side===Mn&&ct.layers.test(W.layers)){let Qe=Se.side;Se.side=jt,Se.needsUpdate=!0,Hh(ct,Y,W,zt,Se,Yt),Se.side=Qe,Se.needsUpdate=!0,Te=!0}}Te===!0&&(q.updateMultisampleRenderTarget(xe),q.updateRenderTargetMipmap(xe))}L.setRenderTarget(ge,we,Re),L.setClearColor(ot,Je),Ze!==void 0&&(W.viewport=Ze),L.toneMapping=He}function ua(M,O,Y){let W=O.isScene===!0?O.overrideMaterial:null;for(let X=0,xe=M.length;X<xe;X++){let be=M[X],{object:ge,geometry:we,group:Re}=be,He=be.material;He.allowOverride===!0&&W!==null&&(He=W),ge.layers.test(Y.layers)&&Hh(ge,O,Y,we,He,Re)}}function Hh(M,O,Y,W,X,xe){I!==null&&X.isNodeMaterial&&I.setObject(M,X),M.onBeforeRender(L,O,Y,W,X,xe),M.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),X.onBeforeRender(L,O,Y,W,M,xe),X.transparent===!0&&X.side===Mn&&X.forceSinglePass===!1?(X.side=jt,X.needsUpdate=!0,L.renderBufferDirect(Y,O,W,X,M,xe),X.side=Di,X.needsUpdate=!0,L.renderBufferDirect(Y,O,W,X,M,xe),X.side=Mn):L.renderBufferDirect(Y,O,W,X,M,xe),M.onAfterRender(L,O,Y,W,X,xe)}function da(M,O,Y){O.isScene!==!0&&(O=Ut);let W=V.get(M),X=E.state.lights,xe=E.state.shadowsArray,be=X.state.version,ge=le.getParameters(M,X.state,xe,O,Y,E.state.lightProbeGridArray),we=le.getProgramCacheKey(ge),Re=W.programs;W.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?O.environment:null,W.fog=O.fog;let He=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;W.envMap=oe.get(M.envMap||W.environment,He),W.envMapRotation=W.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Re===void 0&&(M.addEventListener("dispose",Gn),Re=new Map,W.programs=Re);let Ze=Re.get(we);if(Ze!==void 0){if(W.currentProgram===Ze&&W.lightsStateVersion===be)return Xh(M,ge),Ze}else ge.uniforms=le.getUniforms(M),I!==null&&M.isNodeMaterial&&I.build(M,Y,ge),M.onBeforeCompile(ge,L),Ze=le.acquireProgram(ge,we),Re.set(we,Ze),W.uniforms=ge.uniforms;let Te=W.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Te.clippingPlanes=ce.uniform),Xh(M,ge),W.needsLights=Jf(M),W.lightsStateVersion=be,W.needsLights&&(Te.ambientLightColor.value=X.state.ambient,Te.lightProbe.value=X.state.probe,Te.sunLights.value=X.state.sun,Te.sunLightShadows.value=X.state.sunShadow,Te.directionalLights.value=X.state.directional,Te.directionalLightShadows.value=X.state.directionalShadow,Te.spotLights.value=X.state.spot,Te.spotLightShadows.value=X.state.spotShadow,Te.rectAreaLights.value=X.state.rectArea,Te.ltc_1.value=X.state.rectAreaLTC1,Te.ltc_2.value=X.state.rectAreaLTC2,Te.pointLights.value=X.state.point,Te.pointLightShadows.value=X.state.pointShadow,Te.hemisphereLights.value=X.state.hemi,Te.sunShadowMatrix.value=X.state.sunShadowMatrix,Te.sunShadowCascade.value=X.state.sunShadowCascade,Te.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Te.spotLightMatrix.value=X.state.spotLightMatrix,Te.spotLightMap.value=X.state.spotLightMap,Te.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=E.state.lightProbeGridArray.length>0,W.currentProgram=Ze,W.uniformsList=null,Ze}function Wh(M){if(M.uniformsList===null){let O=M.currentProgram.getUniforms();M.uniformsList=nr.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function Xh(M,O){let Y=V.get(M);Y.outputColorSpace=O.outputColorSpace,Y.batching=O.batching,Y.batchingColor=O.batchingColor,Y.instancing=O.instancing,Y.instancingColor=O.instancingColor,Y.instancingMorph=O.instancingMorph,Y.skinning=O.skinning,Y.morphTargets=O.morphTargets,Y.morphNormals=O.morphNormals,Y.morphColors=O.morphColors,Y.morphTargetsCount=O.morphTargetsCount,Y.numClippingPlanes=O.numClippingPlanes,Y.numIntersection=O.numClipIntersection,Y.vertexAlphas=O.vertexAlphas,Y.vertexTangents=O.vertexTangents,Y.toneMapping=O.toneMapping}function qf(M,O){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(O.matrixWorld);for(let Y=0,W=M.length;Y<W;Y++){let X=M[Y];if(X.texture!==null&&X.boundingBox.containsPoint(S))return X}return null}function Yf(M,O,Y,W,X){O.isScene!==!0&&(O=Ut),q.resetTextureUnits();let xe=O.fog,be=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?O.environment:null,ge=J===null?L.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:$e.workingColorSpace,we=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Re=oe.get(W.envMap||be,we),He=W.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ze=!!Y.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Te=!!Y.morphAttributes.position,it=!!Y.morphAttributes.normal,Rt=!!Y.morphAttributes.color,gt=Un;W.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(gt=L.toneMapping);let ct=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,zt=ct!==void 0?ct.length:0,Se=V.get(W),Yt=E.state.lights;if(Ge===!0&&(rt===!0||M!==Q)){let pt=M===Q&&W.id===Z;ce.setState(W,M,pt)}let Qe=!1;W.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==Yt.state.version||Se.outputColorSpace!==ge||X.isBatchedMesh&&Se.batching===!1||!X.isBatchedMesh&&Se.batching===!0||X.isBatchedMesh&&Se.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Se.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Se.instancing===!1||!X.isInstancedMesh&&Se.instancing===!0||X.isSkinnedMesh&&Se.skinning===!1||!X.isSkinnedMesh&&Se.skinning===!0||X.isInstancedMesh&&Se.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Se.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Se.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Se.instancingMorph===!1&&X.morphTexture!==null||Se.envMap!==Re||W.fog===!0&&Se.fog!==xe||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ce.numPlanes||Se.numIntersection!==ce.numIntersection)||Se.vertexAlphas!==He||Se.vertexTangents!==Ze||Se.morphTargets!==Te||Se.morphNormals!==it||Se.morphColors!==Rt||Se.toneMapping!==gt||Se.morphTargetsCount!==zt||!!Se.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Se.__version=W.version);let mn=Se.currentProgram;Qe===!0&&(mn=da(W,O,X),I&&W.isNodeMaterial&&I.onUpdateProgram(W,mn,Se));let Hn=!1,Mi=!1,us=!1,lt=mn.getUniforms(),Et=Se.uniforms;if(_.useProgram(mn.program)&&(Hn=!0,Mi=!0,us=!0),W.id!==Z&&(Z=W.id,Mi=!0),Se.needsLights){let pt=qf(E.state.lightProbeGridArray,X);Se.lightProbeGrid!==pt&&(Se.lightProbeGrid=pt,Mi=!0)}if(Hn||Q!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),lt.setValue(B,"projectionMatrix",M.projectionMatrix),lt.setValue(B,"viewMatrix",M.matrixWorldInverse);let bi=lt.map.cameraPosition;bi!==void 0&&bi.setValue(B,tt.setFromMatrixPosition(M.matrixWorld)),b.logarithmicDepthBuffer&&lt.setValue(B,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&lt.setValue(B,"isOrthographic",M.isOrthographicCamera===!0),Q!==M&&(Q=M,Mi=!0,us=!0)}if(Se.needsLights&&(Yt.state.sunShadowMap.length>0&&lt.setValue(B,"sunShadowMap",Yt.state.sunShadowMap,q),Yt.state.directionalShadowMap.length>0&&lt.setValue(B,"directionalShadowMap",Yt.state.directionalShadowMap,q),Yt.state.spotShadowMap.length>0&&lt.setValue(B,"spotShadowMap",Yt.state.spotShadowMap,q),Yt.state.pointShadowMap.length>0&&lt.setValue(B,"pointShadowMap",Yt.state.pointShadowMap,q)),X.isSkinnedMesh){lt.setOptional(B,X,"bindMatrix"),lt.setOptional(B,X,"bindMatrixInverse");let pt=X.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),lt.setValue(B,"boneTexture",pt.boneTexture,q))}X.isBatchedMesh&&(lt.setOptional(B,X,"batchingTexture"),lt.setValue(B,"batchingTexture",X._matricesTexture,q),lt.setOptional(B,X,"batchingIdTexture"),lt.setValue(B,"batchingIdTexture",X._indirectTexture,q),lt.setOptional(B,X,"batchingColorTexture"),X._colorsTexture!==null&&lt.setValue(B,"batchingColorTexture",X._colorsTexture,q));let Si=Y.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&N.update(X,Y,mn),(Mi||Se.receiveShadow!==X.receiveShadow)&&(Se.receiveShadow=X.receiveShadow,lt.setValue(B,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&O.environment!==null&&(Et.envMapIntensity.value=O.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=F_()),Mi){if(lt.setValue(B,"toneMappingExposure",L.toneMappingExposure),Se.needsLights&&Zf(Et,us),xe&&W.fog===!0&&Ae.refreshFogUniforms(Et,xe),Ae.refreshMaterialUniforms(Et,W,ne,j,E.state.transmissionRenderTarget[M.id]),Se.needsLights&&Se.lightProbeGrid){let pt=Se.lightProbeGrid;Et.probesSH.value=pt.texture,Et.probesMin.value.copy(pt.boundingBox.min),Et.probesMax.value.copy(pt.boundingBox.max),Et.probesResolution.value.copy(pt.resolution)}nr.upload(B,Wh(Se),Et,q)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(nr.upload(B,Wh(Se),Et,q),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&lt.setValue(B,"center",X.center),lt.setValue(B,"modelViewMatrix",X.modelViewMatrix),lt.setValue(B,"normalMatrix",X.normalMatrix),lt.setValue(B,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){let pt=W.uniformsGroups;for(let bi=0,ds=pt.length;bi<ds;bi++){let Yh=pt[bi];re.update(Yh,mn),re.bind(Yh,mn)}}return mn}function Zf(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.sunLights.needsUpdate=O,M.sunLightShadows.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function Jf(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(M,O,Y){let W=V.get(M);W.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),V.get(M.texture).__webglTexture=O,V.get(M.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Y,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,O){let Y=V.get(M);Y.__webglFramebuffer=O,Y.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(M,O=0,Y=0){J=M,H=O,G=Y;let W=null,X=!1,xe=!1;if(M){let ge=V.get(M);if(ge.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(B.FRAMEBUFFER,ge.__webglFramebuffer),ie.copy(M.viewport),Ie.copy(M.scissor),Ee=M.scissorTest,_.viewport(ie),_.scissor(Ie),_.setScissorTest(Ee),Z=-1;return}else if(ge.__webglFramebuffer===void 0)q.setupRenderTarget(M);else if(ge.__hasExternalTextures)q.rebindTextures(M,V.get(M.texture).__webglTexture,V.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let He=M.depthTexture;if(ge.__boundDepthTexture!==He){if(He!==null&&V.has(He)&&(M.width!==He.image.width||M.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(M)}}let we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(xe=!0);let Re=V.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Re[O])?W=Re[O][Y]:W=Re[O],X=!0):M.samples>0&&q.useMultisampledRTT(M)===!1?W=V.get(M).__webglMultisampledFramebuffer:Array.isArray(Re)?W=Re[Y]:W=Re,ie.copy(M.viewport),Ie.copy(M.scissor),Ee=M.scissorTest}else ie.copy(ve).multiplyScalar(ne).floor(),Ie.copy(Ve).multiplyScalar(ne).floor(),Ee=dt;if(Y!==0&&(W=U),_.bindFramebuffer(B.FRAMEBUFFER,W)&&_.drawBuffers(M,W),_.viewport(ie),_.scissor(Ie),_.setScissorTest(Ee),X){let ge=V.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,ge.__webglTexture,Y)}else if(xe){let ge=O;for(let we=0;we<M.textures.length;we++){let Re=V.get(M.textures[we]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+we,Re.__webglTexture,Y,ge)}}else if(M!==null&&Y!==0){let ge=V.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ge.__webglTexture,Y)}Z=-1};function qh(M){let O=V.get(M);return(O.__readFormat!==M.format||O.__readType!==M.type)&&(O.__readFormat=M.format,O.__readType=M.type,O.__formatReadable=b.textureFormatReadable(M.format),O.__typeReadable=b.textureTypeReadable(M.type)),O}this.readRenderTargetPixels=function(M,O,Y,W,X,xe,be,ge=0){if(!(M&&M.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we){_.bindFramebuffer(B.FRAMEBUFFER,we);try{let Re=M.textures[ge],He=Re.format,Ze=Re.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ge);let Te=qh(Re);if(Te.__formatReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-W&&Y>=0&&Y<=M.height-X&&B.readPixels(O,Y,W,X,fe.convert(He),fe.convert(Ze),xe)}finally{let Re=J!==null?V.get(J).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(M,O,Y,W,X,xe,be,ge=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we)if(O>=0&&O<=M.width-W&&Y>=0&&Y<=M.height-X){_.bindFramebuffer(B.FRAMEBUFFER,we);let Re=M.textures[ge],He=Re.format,Ze=Re.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ge);let Te=qh(Re);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let it=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,it),B.bufferData(B.PIXEL_PACK_BUFFER,xe.byteLength,B.STREAM_READ),B.readPixels(O,Y,W,X,fe.convert(He),fe.convert(Ze),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let Rt=J!==null?V.get(J).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Rt);let gt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await hd(B,gt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,it),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,xe),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(it),B.deleteSync(gt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,O=null,Y=0){let W=Math.pow(2,-Y),X=Math.floor(M.image.width*W),xe=Math.floor(M.image.height*W),be=O!==null?O.x:0,ge=O!==null?O.y:0;q.setTexture2D(M,0),B.copyTexSubImage2D(B.TEXTURE_2D,Y,0,0,be,ge,X,xe),_.unbindTexture()},this.copyTextureToTexture=function(M,O,Y=null,W=null,X=0,xe=0){let be,ge,we,Re,He,Ze,Te,it,Rt,gt=M.isCompressedTexture?M.mipmaps[xe]:M.image;if(Y!==null)be=Y.max.x-Y.min.x,ge=Y.max.y-Y.min.y,we=Y.isBox3?Y.max.z-Y.min.z:1,Re=Y.min.x,He=Y.min.y,Ze=Y.isBox3?Y.min.z:0;else{let Et=Math.pow(2,-X);be=Math.floor(gt.width*Et),ge=Math.floor(gt.height*Et),M.isDataArrayTexture?we=gt.depth:M.isData3DTexture?we=Math.floor(gt.depth*Et):we=1,Re=0,He=0,Ze=0}W!==null?(Te=W.x,it=W.y,Rt=W.z):(Te=0,it=0,Rt=0);let ct=fe.convert(O.format),zt=fe.convert(O.type),Se;O.isData3DTexture?(q.setTexture3D(O,0),Se=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(q.setTexture2DArray(O,0),Se=B.TEXTURE_2D_ARRAY):(q.setTexture2D(O,0),Se=B.TEXTURE_2D),_.activeTexture(B.TEXTURE0),_.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),_.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);let Yt=_.getParameter(B.UNPACK_ROW_LENGTH),Qe=_.getParameter(B.UNPACK_IMAGE_HEIGHT),mn=_.getParameter(B.UNPACK_SKIP_PIXELS),Hn=_.getParameter(B.UNPACK_SKIP_ROWS),Mi=_.getParameter(B.UNPACK_SKIP_IMAGES);_.pixelStorei(B.UNPACK_ROW_LENGTH,gt.width),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,gt.height),_.pixelStorei(B.UNPACK_SKIP_PIXELS,Re),_.pixelStorei(B.UNPACK_SKIP_ROWS,He),_.pixelStorei(B.UNPACK_SKIP_IMAGES,Ze);let us=M.isDataArrayTexture||M.isData3DTexture,lt=O.isDataArrayTexture||O.isData3DTexture;if(M.isDepthTexture){let Et=V.get(M),Si=V.get(O),pt=V.get(Et.__renderTarget),bi=V.get(Si.__renderTarget);_.bindFramebuffer(B.READ_FRAMEBUFFER,pt.__webglFramebuffer),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let ds=0;ds<we;ds++)us&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,V.get(M).__webglTexture,X,Ze+ds),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,V.get(O).__webglTexture,xe,Rt+ds)),B.blitFramebuffer(Re,He,be,ge,Te,it,be,ge,B.DEPTH_BUFFER_BIT,B.NEAREST);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(X!==0||M.isRenderTargetTexture||V.has(M)){let Et=V.get(M),Si=V.get(O);_.bindFramebuffer(B.READ_FRAMEBUFFER,P),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,z);for(let pt=0;pt<we;pt++)us?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Et.__webglTexture,X,Ze+pt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Et.__webglTexture,X),lt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Si.__webglTexture,xe,Rt+pt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Si.__webglTexture,xe),X!==0?B.blitFramebuffer(Re,He,be,ge,Te,it,be,ge,B.COLOR_BUFFER_BIT,B.NEAREST):lt?B.copyTexSubImage3D(Se,xe,Te,it,Rt+pt,Re,He,be,ge):B.copyTexSubImage2D(Se,xe,Te,it,Re,He,be,ge);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else lt?M.isDataTexture||M.isData3DTexture?B.texSubImage3D(Se,xe,Te,it,Rt,be,ge,we,ct,zt,gt.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(Se,xe,Te,it,Rt,be,ge,we,ct,gt.data):B.texSubImage3D(Se,xe,Te,it,Rt,be,ge,we,ct,zt,gt):M.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,xe,Te,it,be,ge,ct,zt,gt.data):M.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,xe,Te,it,gt.width,gt.height,ct,gt.data):B.texSubImage2D(B.TEXTURE_2D,xe,Te,it,be,ge,ct,zt,gt);_.pixelStorei(B.UNPACK_ROW_LENGTH,Yt),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(B.UNPACK_SKIP_PIXELS,mn),_.pixelStorei(B.UNPACK_SKIP_ROWS,Hn),_.pixelStorei(B.UNPACK_SKIP_IMAGES,Mi),xe===0&&O.generateMipmaps&&B.generateMipmap(Se),_.unbindTexture()},this.initRenderTarget=function(M){V.get(M).__webglFramebuffer===void 0&&q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?q.setTextureCube(M,0):M.isData3DTexture?q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?q.setTexture2DArray(M,0):q.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){H=0,G=0,J=null,_.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}};var O_=new Set(["cobble","flagstone","stone","stone_dark","moss","cracked","wet"]),B_=new Set(["stone","rough","cave","castle"]);function yl({surface:n,wall:e=!1,wallStyle:t,grass:i=!1,outdoor:s=!1,id:r},a,o){let l=(Math.imul(a,73856093)^Math.imul(o,19349663))>>>0;return e?!t||B_.has(t)?8+l%4:null:n&&!O_.has(n)||!n&&(i||s||r==="proc-tavern")?null:n==="moss"?l%2?3:5:n==="cracked"?[0,2,4,6][l%4]:[0,1,2,4,6,7][l%6]}function k_(n){let e=Math.floor(n/4),t=n%4,i=n<8?.015:.08,s=n<8?.015:.08,r=n<8?.97:.84,a=n<8?.97:.4;return{x:(t+i)/4,y:1-(e+s+a)/3,w:r/4,h:a/3}}function Xd(n=new Br){let e=new Map,t,i=!1;function s(r,a){let o=t.clone(),l=k_(a);o.colorSpace=St,o.wrapS=o.wrapT=xn,o.magFilter=Pt,o.minFilter=Pt,o.generateMipmaps=!1,o.offset.set(l.x,l.y),o.repeat.set(l.w,l.h),o.needsUpdate=!0,r.map=o,r.color.setHex(16777215),r.needsUpdate=!0}return r=>{if(!e.has(r)){let a=new Kt({color:r<8?7436155:11905683,roughness:1});e.set(r,a),t&&s(a,r)}return i||(i=!0,n.load("assets/terrain-materials.png",a=>{t=a;for(let[o,l]of e)s(l,o)},void 0,()=>{})),e.get(r)}}var z_=[[0,1],[1,0],[0,-1],[-1,0]];function V_(n){let e=2166136261;for(let t of String(n))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0}function qd(n,e,t=""){if(Number.isInteger(e.facing)&&e.facing>=0&&e.facing<4)return e.facing;let i=n.props.filter(o=>o.type==="npc").slice().sort((o,l)=>o.id<l.id?-1:o.id>l.id?1:0),s=Math.max(0,i.findIndex(o=>o.id===e.id)),r=(V_(t+":"+n.id)+s)%4;return z_.map(([o,l],c)=>({i:c,x:e.x+o,y:e.y+l})).filter(o=>n.tiles[o.y]?.[o.x]==="floor"&&!n.props.some(l=>l.x===o.x&&l.y===o.y&&l.solid!==!1)).sort((o,l)=>(o.i-r+4)%4-(l.i-r+4)%4)[0]?.i??r}function Yd(n,e){let t=e.x-n.x,i=e.y-n.y;return Math.abs(t)>Math.abs(i)?t>0?1:3:i<0?2:0}function Zd(n,e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),i=new Map,s=new Map;for(let c of n){let d=[];c.updateWorldMatrix(!0,!0),c.traverse(u=>{if(!u.isMesh||Array.isArray(u.material))return;let h=!!u.userData.decal,p=u.material,g=u.geometry.type+JSON.stringify(u.geometry.parameters||{})+":"+(h?"decal":p.uuid)+":"+u.castShadow+":"+u.receiveShadow;i.has(g)||i.set(g,{geometry:u.geometry,material:p,decal:h,cast:u.castShadow,receive:u.receiveShadow,entries:[]});let m=i.get(g),f=new We;for(let v=0;v<(u.isInstancedMesh?u.count:1);v++){u.isInstancedMesh?u.getMatrixAt(v,f):f.identity();let A=new Le(16777215);h&&u.instanceColor&&u.getColorAt(v,A);let S={root:c,source:u,local:f.clone(),color:A,index:m.entries.length};d.push(S),m.entries.push(S)}u.layers.set(1)}),s.set(c,d),c.userData.staticBatched=!0}let r=[];for(let c of i.values()){let d=c.decal?new Kt({color:16777215,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}):c.material,u=new cn(c.geometry,d,c.entries.length);u.castShadow=c.cast,u.receiveShadow=c.receive,u.frustumCulled=!1,u.userData.staticBatch=!0,u.userData.decal=c.decal,u.userData.disposeMaterial=c.decal;for(let h of c.entries)h.batch=u,c.decal&&u.setColorAt(h.index,h.color);u.instanceColor&&(u.instanceColor.needsUpdate=!0),e.add(u),r.push(u)}let a=new We,o=new We().makeScale(0,0,0);function l(c){c.updateWorldMatrix(!0,!0);for(let d of s.get(c)||[]){let u=!0;for(let h=d.source;h&&h!==e;h=h.parent)u&&=h.visible;a.copy(t).multiply(d.source.matrixWorld).multiply(d.local),d.batch.setMatrixAt(d.index,u?a:o),d.batch.instanceMatrix.needsUpdate=!0}}for(let c of n)l(c);return{meshes:r,roots:n,update:l,sourceMeshes:n.reduce((c,d)=>(d.traverse(u=>{u.isMesh&&c++}),c),0)}}var Jd=(n,e)=>`${n},${e}`;function G_(n,e){if(!Number.isSafeInteger(n)||n<=0)throw new RangeError(`${e} must be a positive integer`)}function $d({width:n,height:e,bounds:t,pins:i=[],chunkSize:s=16,maxChunks:r=12,margin:a=1,previousMode:o="detail"}={}){for(let[C,I]of Object.entries({width:n,height:e,chunkSize:s,maxChunks:r}))G_(I,C);if(!Number.isSafeInteger(a)||a<0)throw new RangeError("margin must be a non-negative integer");if(!t||!["minX","minY","maxX","maxY"].every(C=>Number.isFinite(t[C]))||t.minX>t.maxX||t.minY>t.maxY)throw new TypeError("bounds must contain finite ordered ground coordinates");if(!Array.isArray(i))throw new TypeError("pins must be an array");if(o!=="detail"&&o!=="overview")throw new TypeError("previousMode must be detail or overview");let l=Math.ceil(n/s),c=Math.ceil(e/s),d=(C,I,U=!1)=>({id:Jd(C,I),x:C*s,y:I*s,w:Math.min(s,n-C*s),h:Math.min(s,e-I*s),pinned:U}),u=new Map;for(let C of i){if(!C||!Number.isFinite(C.x)||!Number.isFinite(C.y))throw new TypeError("each pin must contain finite x and y");if(C.x<0||C.y<0||C.x>=n||C.y>=e)continue;let I=Math.floor(C.x/s),U=Math.floor(C.y/s);u.set(Jd(I,U),d(I,U,!0))}let h=[...u.values()].sort((C,I)=>C.y-I.y||C.x-I.x),p=[],x=t.maxX>=0&&t.maxY>=0&&t.minX<n&&t.minY<e,g=Math.max(0,Math.floor(t.minX/s)),m=Math.max(0,Math.floor(t.minY/s)),f=Math.min(l-1,Math.floor(t.maxX/s)),v=Math.min(c-1,Math.floor(t.maxY/s));if(x)for(let C=m;C<=v;C++)for(let I=g;I<=f;I++)p.push(d(I,C));let A=p.map(C=>C.id),S=h.map(C=>C.id),T=u.size+p.reduce((C,I)=>C+ +!u.has(I.id),0),E=Math.max(1,u.size,r-Math.max(1,Math.ceil(r*.2))),R=T>r||o==="overview"&&T>E?"overview":"detail",y=[...h],w=new Set(S),L=C=>{y.length>=r||w.has(C.id)||(w.add(C.id),y.push(C))};if(R==="detail"){p.forEach(L);let C=Math.min(a,Math.max(l,c));for(let I=1;x&&I<=C&&y.length<r;I++){let U=Math.max(0,g-I),P=Math.min(l-1,f+I),z=Math.max(0,m-I),H=Math.min(c-1,v+I);for(let G=z;G<=H&&y.length<r;G++)for(let J=U;J<=P&&y.length<r;J++)J>=g&&J<=f&&G>=m&&G<=v||Math.max(g-J,J-f,m-G,G-v)===I&&L(d(J,G))}}return{mode:R,chunks:y,visibleKeys:A,pinnedKeys:S,budgetOverflow:Math.max(0,u.size-r)}}var H_=n=>{let e=setTimeout(n,0);return()=>clearTimeout(e)},_h=()=>globalThis.performance?.now?.()??Date.now();function Kd({build:n,release:e,schedule:t=H_,onChange:i,onError:s}={}){for(let[C,I]of Object.entries({build:n,release:e,schedule:t}))if(typeof I!="function")throw new TypeError(`${C} must be a function`);for(let[C,I]of Object.entries({onChange:i,onError:s}))if(I!==void 0&&typeof I!="function")throw new TypeError(`${C} must be a function`);let r=new Map,a=[],o=null,l=!1,c=0,d=0,u=0,h=0,p=0,x=0,g=null,m=new Map,f=new Set,v=()=>({readyIds:[...m.keys()],readyCount:m.size,queuedCount:a.length,builtCount:u,releasedCount:h,generation:d,errors:p,lastBuildDuration:x,lastError:g});function A(C,I){p++,g=C instanceof Error?C.message:String(C);try{s?.(C,I)}catch(U){p++,g=String(U?.message??U)}}function S(){try{i?.(v())}catch(C){A(C,null)}}function T(C){h++;try{e(C.resource,C.chunk)}catch(I){A(I,C.chunk)}}function E(){let C=o;if(o=null,!!C){C.active=!1;try{C.cancel?.()}catch(I){A(I,null)}}}function R(){if(o||l||!a.length)return;let C={active:!0,cancel:null};o=C;let I=!0,U=()=>{if(I){queueMicrotask(U);return}!C.active||o!==C||(C.active=!1,o=null,L(1))};try{let P=t(U);typeof P=="function"&&(C.cancel=P)}catch(P){o===C&&(o=null),C.active=!1,A(P,null),S()}finally{I=!1}}function y(C){if(!C||!Array.isArray(C.chunks))throw new TypeError("plan.chunks must be an array");let I=new Map;for(let J of C.chunks){if(!J||typeof J.id!="string"||!J.id)throw new TypeError("chunk.id must be a nonempty string");if(I.has(J.id))throw new TypeError(`duplicate chunk.id: ${J.id}`);I.set(J.id,J)}let U=[...r.values()],P=[...I.values()];if(P.length===U.length&&P.every((J,Z)=>["id","x","y","w","h","pinned"].every(Q=>J[Q]===U[Z][Q]))&&!f.size){R();return}let H=++c;r=I,a=[],f.clear();let G=[];for(let[J,Z]of m){let Q=r.get(J);!Q||["x","y","w","h"].some(ie=>Z.chunk[ie]!==Q[ie])?(m.delete(J),G.push(Z)):Z.chunk=Q}E(),G.forEach(T),c===H&&(a=[...r.values()].filter(J=>!m.has(J.id)),S(),R())}function w(){c++,d++,r=new Map,a=[],f.clear();let C=[...m.values()];m.clear(),E(),C.forEach(T),S()}function L(C=1){if(!Number.isSafeInteger(C)||C<0)throw new RangeError("flush limit must be a non-negative integer");if(l||C===0)return 0;E(),l=!0;let I=c,U=0;try{for(;a.length&&U<C&&c===I;){let P=a.shift();if(!r.has(P.id)||m.has(P.id))continue;U++;let z,H=_h();try{z=n(P),u++}catch(J){x=Math.max(0,_h()-H),c===I&&f.add(P.id),A(J,P),S();continue}x=Math.max(0,_h()-H);let G={resource:z,chunk:P};c!==I||!r.has(P.id)?T(G):m.set(P.id,G),S()}}finally{l=!1,R()}return U}return{update:y,reset:w,flush:L,isReady:C=>m.has(C),get stats(){return v()}}}function jd(n,e=""){let t=new URLSearchParams(e),i=t.get("qa")==="1",s=n.regionStreaming||{},r=(a,o,l,c)=>Number.isInteger(Number(a))&&Number(a)>=l&&Number(a)<=c?Number(a):o;return{enabled:!!n.outdoor&&n.W*n.H>=1024&&s.enabled!==!1&&!(i&&t.get("regionFull")==="1"),chunkSize:r(i?t.get("regionChunk")??s.chunkSize:s.chunkSize,16,8,32),maxChunks:r(i?t.get("regionBudget")??s.maxChunks:s.maxChunks,12,4,32),margin:1}}var yh=(n,e,t)=>`${Math.floor(n/t)},${Math.floor(e/t)}`;function ta(n,e,t,i,s){return!n?.enabled||e?.mode==="detail"&&!!t?.isReady(yh(i,s,n.chunkSize))}function Qd(n){let e=new es,t=[];for(let i of[-1,1])for(let s of[-1,1])e.setFromCamera(new Ue(i,s),n),!(Math.abs(e.ray.direction.y)<1e-7)&&t.push(e.ray.origin.clone().addScaledVector(e.ray.direction,-e.ray.origin.y/e.ray.direction.y));return t.length?{minX:Math.min(...t.map(i=>i.x)),minY:Math.min(...t.map(i=>i.z)),maxX:Math.max(...t.map(i=>i.x)),maxY:Math.max(...t.map(i=>i.z))}:{minX:0,minY:0,maxX:0,maxY:0}}function ef(n,{padding:e=1,lights:t=[]}={}){let i={minX:n.minX-e,minY:n.minY-e,maxX:n.maxX+e,maxY:n.maxY+e};for(let s of t){let r=s.distance??8,a=Math.max(n.minX-s.x,0,s.x-n.maxX),o=Math.max(n.minY-s.y,0,s.y-n.maxY);if(Math.hypot(a,o)>r)continue;let l=s.wallX??Math.floor(s.x),c=s.wallY??Math.floor(s.y);i.minX=Math.min(i.minX,l),i.maxX=Math.max(i.maxX,l+1),i.minY=Math.min(i.minY,c),i.maxY=Math.max(i.maxY,c+1)}return i}function tf(n,e=new Map,t=[],i=null,s=null,r=new Map){let a=[],o=new Set,l=h=>{if(!h||!Number.isFinite(h.x)||!Number.isFinite(h.y))return;let p=`${h.x},${h.y}`;o.has(p)||(o.add(p),a.push({x:h.x,y:h.y}))},c=h=>l(h?.userData.regionAnchor),d=h=>{if(!h)return;let p=h.id?h:n.props.find(x=>x.x===h.x&&x.y===h.y);p&&c(r.get("prop:"+p.id))},u=n.active();if(l(u),u)for(let[h,p]of[[1,0],[-1,0],[0,1],[0,-1]])l({x:u.x+h,y:u.y+p});for(let h of n.state.party||[])l(h);if(n.state.combat)for(let h of n.all())l(h);if(l(n.selected),l(s?.p),l(n.departingNpc),d(n.selected),d(s?.p),d(n.departingNpc),i){let h=n.props.find(p=>i.id?p.id===i.id:p.name===i.name);l(h),d(h)}for(let h of(n.route||[]).slice(0,3))l(h);for(let h of e.values())c(h.m),l({x:h.from.x-.5,y:h.from.z-.5}),l({x:h.to.x-.5,y:h.to.z-.5});for(let h of r.values())(h.userData.tap||h.userData.strike)&&c(h);for(let h of t)h.p&&l({x:h.p.x-.5,y:h.p.z-.5}),h.from&&l({x:h.from.x-.5,y:h.from.z-.5}),h.to&&l({x:h.to.x-.5,y:h.to.z-.5});return a}function vl(n,{sharedGeometries:e=new Set}={}){let t=new Set,i=new Set,s=new Set;n.traverse(r=>{if(r.isInstancedMesh&&r.dispose(),r.isLight&&r.shadow?.dispose(),r.geometry&&!e.has(r.geometry)&&t.add(r.geometry),r.userData.disposeMaterial)for(let a of[].concat(r.material||[]))i.add(a);if(r.userData.disposeTexture)for(let a of[].concat(r.material||[]))for(let o of Object.values(a))o?.isTexture&&s.add(o)});for(let r of t)r.dispose();for(let r of i)r.dispose();for(let r of s)r.dispose()}function Ml(n){let e=new Set,t=new Set,i=new Set,s=0,r=0;return n.traverse(a=>{a.isMesh&&s++,a.isLight&&r++,a.geometry&&e.add(a.geometry);for(let o of[].concat(a.material||[])){t.add(o);for(let l of Object.values(o))l?.isTexture&&i.add(l)}}),{meshes:s,geometries:e.size,materials:t.size,textures:i.size,lights:r}}function Sl(n,e,t=.8,i=1.14){e.updateWorldMatrix(!0,!0),n.updateMatrixWorld(!0);let s=new ln().setFromObject(e);if(s.isEmpty())return;let r=new ln;for(let c of[s.min.x,s.max.x])for(let d of[s.min.y,s.max.y])for(let u of[s.min.z,s.max.z])r.expandByPoint(new k(c,d,u).applyMatrix4(n.matrixWorldInverse));let a=r.getCenter(new k),o=r.getSize(new k),l=Math.max(o.y,o.x/t,.1)*i;n.left=a.x-l*t/2,n.right=a.x+l*t/2,n.top=a.y+l/2,n.bottom=a.y-l/2,n.near=Math.max(.01,-r.max.z-1),n.far=Math.max(n.near+1,-r.min.z+1),n.updateProjectionMatrix()}function nf({figure:n,propModel:e,shadedBox:t,compact:i,terrainMaterial:s}){let r=new In;r.background=new Le("#26201a");let a=new un(-4,4,8,-8,.1,60),o=new qe;r.add(o);let l=new qe,c=[],d=[],u=[],h=[8157814,8881278,7368297,9210241,7960176];for(let $=0;$<15;$++)for(let se=-5;se<=5;se++){let b=se*.84+$%2*.42;t(l,b,$*.47+.24,-4.5,.81,.44,.38,h[(se+$*3+25)%h.length])}for(let $=0;$<15;$++)for(let se=0;se<16;se++)t(l,-4.65,$*.47+.24,-4.4+se*.82+$%2*.41,.38,.44,.79,h[(se+$*3)%h.length]);let p=new yn(.487,.06,.487),x=[8675391,7557686,9463623,8345402,7950905],g=x.map(()=>[]);for(let $=-12;$<=12;$++)for(let se=-10;se<=24;se++){let b=($*7+se*3+160)%5;g[b].push([$*.5,-.044,se*.5])}for(let $=0;$<5;$++){let se=new cn(p,s(x[$],1),g[$].length),b=new We;g[$].forEach((_,D)=>{b.makeTranslation(..._),se.setMatrixAt(D,b)}),se.receiveShadow=!0,o.add(se)}for(let $ of[-4.35,-1.5,2.4,4.4])t(l,$,1.68,-4.24,.16,3.36,.2,4205856),t(l,$,.18,-4.16,.25,.34,.3,3155228);for(let $ of[.5,2.7,3.27])t(l,0,$,-4.21,9,.16,.22,4731170);o.add(i(l));let m=($,se,b,_=0,D=$)=>{let V=e({type:$,id:D});return V.position.set(se,0,b),V.rotation.y=_,o.add(V),c.push(V),V},f=($,se,b,_,D,V,q,oe)=>t($,se,b,_,D,V,q,oe),v=($,se,b,_)=>{let D=new qe;D.position.set(se,b,_),$.add(D),f(D,0,.02,0,.16,.035,.16,7754034),f(D,0,.12,0,.07,.18,.07,15783072);let V=new qe;return V.position.y=.25,D.add(V),t(V,0,0,0,.065,.13,.065,16754222,!0),t(V,0,-.015,.002,.037,.08,.04,16768898,!0),u.push({m:V,phase:u.length*.8}),D};function A($,se){let b=new qe;b.position.set($,0,se),o.add(b);for(let _ of[-.67,.67])f(b,_,1.2,0,.09,2.4,.38,5519651);for(let _=0;_<4;_++){let D=.36+_*.48;f(b,0,D,.04,1.46,.075,.48,7359020);for(let V=0;V<6;V++){let q=-.55+V*.22,oe=[4875858,7756085,8676424,3562068,9664075,6698798][(V+_)%6],ae=.19+V%3*.035;f(b,q,D+ae/2+.06,.05,.12,ae,.12,oe),f(b,q,D+ae+.07,.05,.055,.075,.06,oe),f(b,q,D+ae+.11,.05,.065,.022,.065,11701077)}}i(b)}A(-3.3,-4.02),A(-1.73,-4.02);for(let $=-3.55;$<0;$+=.96)m("counter",$,-2.55);m("barrel",-4,-3.35),m("chair",-2.8,-1.55,Math.PI);let S=($,se)=>{let b=new qe;b.position.set($,0,se),o.add(b);for(let _ of[-.58,.58])for(let D of[-.39,.39])f(b,_,.32,D,.12,.64,.12,6504741);for(let _=0;_<4;_++)f(b,-.57+_*.38,.73,0,.37,.12,1.05,[9132850,8540974,9987896,8870191][_]);return f(b,0,.39,.22,1.3,.09,.07,5255967),f(b,.25,.87,-.24,.13,.18,.13,8277546),f(b,.25,.966,-.24,.11,.015,.11,12232575),f(b,-.35,.845,.15,.27,.1,.2,10254410),i(b),v(b,-.47,.79,-.24),b};S(.5,-.15),m("chair",.36,-1.13,0),m("chair",1.52,-.13,-Math.PI/2),S(.2,3.55),m("chair",.15,2.6,0),m("chair",1.23,3.55,-Math.PI/2);let T=new qe;T.position.set(.85,0,-3.75),o.add(T);for(let $ of[-.65,.65])for(let se=0;se<4;se++)f(T,$,.27+se*.38,0,.4,.36,.8,h[se]);f(T,0,.09,.25,1.78,.17,1.32,6446677),f(T,0,1.64,0,1.77,.27,1.03,7367519);for(let $=0;$<6;$++)for(let se=0;se<2;se++)f(T,(se-.5)*.65,1.88+$*.22,-.1,.63,.2,.69,h[($+se)%5]);f(T,0,.83,-.38,.95,1.18,.07,1577742);for(let $ of[-.22,.18]){let se=f(T,$,.27,.26,.68,.13,.15,4796445);se.rotation.y=$*2}i(T);let E=new qe;E.position.set(.85,.4,-3.48),o.add(E);for(let $=0;$<4;$++){let se=new qe;se.position.set(($-1.5)*.17,0,0),E.add(se),t(se,0,.1,0,.19,.33,.12,15763233,!0),t(se,0,.06,.025,.095,.22,.1,16765798,!0),u.push({m:se,phase:$*1.5})}for(let[$,se]of[[-4.39,-2.1],[.65,-4.18]]){let b=m("torch",$,se);b.position.y=1.25}let R=new qe;R.position.set(-.18,0,-.85),o.add(R),f(R,0,2.75,0,.028,.75,.028,5325620),f(R,0,2.36,0,.82,.075,.65,7358251);for(let $ of[-.31,.31])for(let se of[-.23,.23])v(R,$,2.4,se);i(R),v(o,-3.5,.81,-2.45);let y=document.createElement("canvas");y.width=256,y.height=384;let w=y.getContext("2d");w.fillStyle="#6e2026",w.fillRect(0,0,256,384),w.strokeStyle="#b18c4a",w.lineWidth=7,w.strokeRect(14,14,228,356),w.lineWidth=3,w.strokeRect(26,26,204,332);for(let $=47;$<360;$+=32)for(let se=44;se<230;se+=34)w.fillStyle=(se+$)%3?"#b18a43":"#8a3f32",w.fillRect(se,$,9,5);w.save(),w.translate(128,192),w.rotate(Math.PI/4),w.strokeStyle="#b79850",w.lineWidth=6,w.strokeRect(-43,-43,86,86),w.strokeRect(-27,-27,54,54),w.restore();let L=new Dn(y);L.magFilter=yt,L.colorSpace=St;let C=new je(new vn(3.15,5.2),new Kt({map:L,roughness:1}));C.rotation.x=-Math.PI/2,C.position.set(-1.9,.006,1),C.receiveShadow=!0,o.add(C);let I=($,se,b,_,D=!1,V,q={})=>{let oe={kind:$,npcId:V,hands:["empty","empty"]};V||(oe.appearance={...window.Characters.defaultLook({0:"rogue",1:"wizard",2:"fighter",5:"cleric"}[$],"male"),...q});let ae=n($,oe,{articulated:!0,base:!1});ae.position.set(se,D?.2:0,b),ae.rotation.y=_,ae.scale.setScalar(1.08),r.add(ae);let K=ae.userData.rig;D&&(K.legL.rotation.x=K.legR.rotation.x=-1.05);let ee=new qe;return t(ee,0,0,0,.105,.12,.105,8805685),t(ee,.062,.01,0,.04,.07,.025,11305040),ee.position.set(.31,.53,.23),ae.add(ee),d.push({m:ae,rig:K,mug:ee,phase:d.length*3.4,seated:D,baseY:ae.position.y}),ae};I(5,-2.2,-3.1,.3,!1,"innkeeper"),I(2,.36,-1.13,.25,!0,void 0,{hair:"#593321",hairStyle:"short"}),I(0,1.52,-.13,-Math.PI/2,!0,void 0,{hair:"#392c22",cloth:"#6b674c"}),I(1,.15,2.6,.25,!0,void 0,{headgear:"none",hair:"#c7c4bf",beard:"none",cloth:"#385168",hairStyle:"short"});let U=new hi(15196629,4797992,.8);r.add(U);let P=new di(16772309,2.1);P.position.set(-2,7,5),P.castShadow=!0,P.shadow.mapSize.set(1024,1024),P.shadow.camera.left=-8,P.shadow.camera.right=8,P.shadow.camera.top=8,P.shadow.camera.bottom=-8,P.shadow.normalBias=.02,r.add(P);let z=new ui(16747815,7,8,1.7);z.position.set(.85,.9,-3.03),r.add(z);let H=new ui(16758616,5,8,1.5);H.position.set(-1,2.3,-1.8),r.add(H);let G=new Vr(12,12,13480059,9990731);G.position.y=.018,G.material.transparent=!0,G.material.opacity=.16,r.add(G);let J=new Float32Array(36),Z=new At;Z.setAttribute("position",new Ht(J,3));let Q=new Nr(Z,new Ws({color:16766081,size:.035,transparent:!0,opacity:.8,depthWrite:!1}));r.add(Q);let ie=document.createElement("canvas");ie.width=ie.height=32;let Ie=ie.getContext("2d"),Ee=Ie.createRadialGradient(16,16,0,16,16,16);Ee.addColorStop(0,"rgba(130,119,100,.09)"),Ee.addColorStop(1,"rgba(130,119,100,0)"),Ie.fillStyle=Ee,Ie.fillRect(0,0,32,32);let ot=new Vs({map:new Dn(ie),transparent:!0,depthWrite:!1}),Je=Array.from({length:3},()=>{let $=new Lr(ot);return r.add($),$}),Ye=new In,j=new un(-1,1,1,-1,.1,20);Ye.add(new hi(16773071,6903910,2));let ne=new di(16777215,2.2);ne.position.set(-2,4,5),Ye.add(ne);let pe=null,De=null,ve="",Ve=0,dt=.22,Be=0,Ge=null,rt=0,ze=0,tt=0;function Tt($){$&&(Ye.remove($),$.traverse(se=>{if(se.isInstancedMesh&&se.dispose(),se.userData.menuMaterials)for(let b of se.userData.menuMaterials)b.dispose()}))}function Ut($,se){$?.traverse(b=>{if(b.isMesh){if(!b.userData.menuMaterials){let _=Array.isArray(b.material)?b.material:[b.material];b.userData.menuMaterials=_.map(D=>D.clone()),b.material=Array.isArray(b.material)?b.userData.menuMaterials:b.userData.menuMaterials[0]}for(let _ of b.userData.menuMaterials)_.transparent=se<1,_.opacity=se,_.depthWrite=se>=.99}})}function mt($){let se=JSON.stringify([$.kind,$.classId,$.appearance,$.hands]);se!==ve&&(Tt(De),De=pe,pe=n($.kind,$,{articulated:!0,base:!1}),Ye.add(pe),ve=se,Ve=ze,Ut(pe,0))}function wt($){!$||$.dataset.liveRotation||($.dataset.liveRotation="true",$.style.touchAction="pan-y",$.onpointerdown=se=>{Ge={x:se.clientX,time:performance.now()},Be=0,$.setPointerCapture(se.pointerId)},$.onpointermove=se=>{if(!Ge)return;let b=performance.now(),_=(se.clientX-Ge.x)*.012*(window.CinematicMenu.controls?.sensitivity||1);dt+=_,Be=dn.clamp(_/Math.max(.008,(b-Ge.time)/1e3),-4,4),Ge={x:se.clientX,time:b}},$.onpointerup=$.onpointercancel=()=>{Ge=null},$.onclick=null)}function B($,se,b,_){let D=Math.min(.05,Math.max(0,(se-rt)/1e3));rt=se;let V=b.animations&&!matchMedia("(prefers-reduced-motion: reduce)").matches;V&&(ze+=D);let q=ze,oe=$.domElement.clientWidth,ae=$.domElement.clientHeight;tt=V?tt+(+!!_-tt)*Math.min(1,D*3):+!!_;let K=oe>650?5.3:3.65;a.left=-K,a.right=K,a.top=K*ae/oe,a.bottom=-K*ae/oe,a.position.set(7+Math.sin(q*.07)*.065-tt*.2,10.8+Math.sin(q*.09)*.035,14-tt*.3),a.lookAt(-.05,0,1.25),a.updateProjectionMatrix(),U.intensity=.4+b.ambient*1.8,P.intensity=b.lights?1.7:.65,z.intensity=b.lights?b.intensity*(6+Math.sin(q*8)*.18+Math.sin(q*17)*.1):0,H.intensity=b.lights?b.intensity*(4.3+Math.sin(q*5)*.1):0,G.visible=b.grid;for(let ce of c)for(let Me of ce.userData.flames||[])Me.userData.menuRestScaleY??=Me.scale.y,Me.scale.y=Me.userData.menuRestScaleY*(1+Math.sin(q*8+Me.position.x*4)*.08);for(let ce of u)ce.m.scale.y=1+Math.sin(q*8+ce.phase)*.09;for(let ce of d){let Me=q+ce.phase,Fe=Me%18,N=Fe>9&&Fe<14?Math.sin((Fe-9)/5*Math.PI):0;ce.m.position.y=ce.baseY+Math.sin(Me*1.4)*.008,ce.rig.torso.scale.y=1+Math.sin(Me*1.4)*.009,ce.rig.head.rotation.y=Math.sin(Me*.33)*.1,ce.rig.armR.rotation.x=-N*1.5,ce.rig.armR.rotation.z=-N*.25,ce.mug.position.set(.31-N*.11,.53+N*.42,.23-N*.16),ce.mug.rotation.x=-N*.4}for(let ce=0;ce<12;ce++){let Me=(q*.17+ce*.618)%1;J[ce*3]=.85+Math.sin(ce*4.2+Me*3)*.17,J[ce*3+1]=Me<.16?.25+Me*5:-100,J[ce*3+2]=-3.4+Math.sin(ce*2.1)*.12}if(Q.visible=V&&b.lights,Z.attributes.position.needsUpdate=!0,Je.forEach((ce,Me)=>{let Fe=(q*.07+Me*.2)%1;ce.position.set(.85+Math.sin(Fe*5)*.1,.8+Fe*1.4,-3.4),ce.scale.setScalar(.3+Fe*.45),ce.visible=b.lights}),$.shadowMap.needsUpdate=V&&se-(B.lastShadow||0)>120,$.shadowMap.needsUpdate&&(B.lastShadow=se),$.setViewport(0,0,oe,ae),$.setScissorTest(!1),$.autoClear=!0,$.render(r,a),!_?.actor||!_.anchor?.isConnected)return;mt(_.actor),wt(_.anchor),Ge||(V&&window.CinematicMenu.controls?.inertia!==!1?(dt+=Be*D,Be*=Math.exp(-D*6)):Be=0),pe.rotation.y=dt,pe.position.y=Math.sin(q*1.6)*.008,pe.userData.rig.head.rotation.y=Math.sin(q*.55)*.025,pe.userData.rig.armR.rotation.z=Math.sin(q*1.2)*.025;let ee=V?Math.min(1,(ze-Ve)/.22):1;Ut(pe,ee),De&&(De.rotation.y=dt,Ut(De,1-ee),ee===1&&(Tt(De),De=null));let le=_.anchor.getBoundingClientRect(),Ae=$.domElement.getBoundingClientRect(),ue=le.left-Ae.left,he=ae-(le.bottom-Ae.top);le.width<1||le.height<1||(j.position.set(0,1.15,4),j.lookAt(0,.64,0),Sl(j,pe,le.width/le.height,1.15),$.setViewport(ue,he,le.width,le.height),$.setScissor(Math.max(0,ue),Math.max(0,he),le.width,Math.min(le.height,ae-he)),$.setScissorTest(!0),$.autoClear=!1,$.clearDepth(),$.render(Ye,j),$.autoClear=!0,$.setScissorTest(!1),$.setViewport(0,0,oe,ae))}return{render:B,turn:$=>{dt+=$,Be=0},get debug(){return{clock:ze,rotation:dt,velocity:Be,camera:[...a.position],patrons:d.map($=>({head:$.rig.head.rotation.y,arm:$.rig.armR.rotation.x})),drawCalls:r.children.length}}}}var Bi={size:.058,decalDepth:.008,minW:.09,minH:.09,minD:.05};function sn(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),s=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|s}function Kn(n,e){if(e<=1)return sn(n,e);let t=Math.min(1,(e-1)*.9),i=n>>16&255,s=n>>8&255,r=n&255;return Math.round(i+(255-i)*t)<<16|Math.round(s+(255-s)*t)<<8|Math.round(r+(255-r)*t)}function W_(n){let e=n|0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var sf={skin:{hi:1.06,lo:.9,amp:.045,noise:2},hair:{hi:1.18,lo:.8,amp:.11,strands:!0},metal:{hi:1.22,lo:.76,amp:.1,glint:!0},cloth:{hi:1.12,lo:.82,amp:.08,pleats:!0},other:{hi:1.1,lo:.84,amp:.07}};function as(n,e=()=>"other",t=Bi.size,{minDepth:i=Bi.minD}={}){let s=[],r=Bi.decalDepth;function a(o,l){let c=o[8]==="f"?2:1,d=c===2?[0,1]:[0,2],u=o[c]-o[c+3]/2,h=[o];n.forEach((p,x)=>{if(x===l||p.length>8)return;let g=p[c]-p[c+3]/2,m=p[c]+p[c+3]/2;if(g>=u+r-1e-8||m<u-1e-8||Math.abs(m-u)<1e-8&&x<l)return;let[f,v]=d,A=p[f]-p[f+3]/2,S=p[f]+p[f+3]/2,T=p[v]-p[v+3]/2,E=p[v]+p[v+3]/2;h=h.flatMap(R=>{let y=R[f]-R[f+3]/2,w=R[f]+R[f+3]/2,L=R[v]-R[v+3]/2,C=R[v]+R[v+3]/2,I=Math.max(y,A),U=Math.min(w,S),P=Math.max(L,T),z=Math.min(C,E);return U-I<1e-8||z-P<1e-8?[R]:[[y,I,L,C],[U,w,L,C],[I,U,L,P],[I,U,z,C]].filter(([H,G,J,Z])=>G-H>1e-8&&Z-J>1e-8).map(([H,G,J,Z])=>{let Q=[...R];return Q[f]=(H+G)/2,Q[f+3]=G-H,Q[v]=(J+Z)/2,Q[v+3]=Z-J,Q})})}),s.push(...h)}return n.forEach((o,l)=>{if(o.length>8||o[7])return;let[c,d,u,h,p,x,g]=o;if(h<Bi.minW||p<Bi.minH||x<i)return;let m=sf[e(g)]||sf.other,f=Math.max(1,Math.round(h/t)),v=Math.max(1,Math.round(p/t)),A=h/f,S=p/v,T=u+x/2+r/2,E=u+x/2+1e-4,R=W_(Math.round(c*997)*31+Math.round(d*991)*17+Math.round(u*983)*13+(g&65535)+l*7),y=Array.from({length:v},()=>Array(f).fill(null)),w=(I,U,P,z=1,H=1)=>{if(P!==g)for(let G=U;G<Math.min(v,U+H);G++)for(let J=I;J<Math.min(f,I+z);J++)y[G][J]=P};v>=3&&(w(0,0,Kn(g,m.hi),f),w(0,v-1,Kn(g,m.lo),f)),f>=4&&v>=4&&h>=.2&&(w(0,1,Kn(g,1+(m.hi-1)*.5),1,v-2),w(f-1,1,Kn(g,1-(1-m.lo)*.6),1,v-2));let L=Math.min(m.noise??3,Math.floor(f*v/8)),C=new Set;for(let I=0;I<L;I++){let U=f>2?1+Math.floor(R()*(f-2)):Math.floor(R()*f),P=v>2?1+Math.floor(R()*(v-2)):Math.floor(R()*v),z=U*64+P,H=(R()<.5?-1:1)*m.amp*(.55+R()*.6);Math.abs(H)<.04&&(H=H<0?-.04:.04),C.has(z)||(C.add(z),w(U,P,Kn(g,1+H)))}if(m.strands&&f>=3&&v>=3){for(let I=0;I<2;I++)w(1+Math.floor(R()*(f-2||1)),1,Kn(g,.86),1,Math.max(1,Math.min(v-2,2+Math.floor(R()*(v-2)))));w(Math.floor(R()*f),1,Kn(g,m.hi))}if(m.pleats&&p>=.2&&h>=.2&&v>=4)for(let I of[Math.round(f/3),Math.round(f*2/3)])I>0&&I<f&&w(I,1,Kn(g,.9),1,v-2);m.glint&&f>=2&&v>=2&&w(Math.min(1,f-1),Math.min(1,v-1),Kn(g,1.36));for(let I=0;I<v;I++)for(let U=0;U<f;U++){let P=y[I][U];if(P===null)continue;let z=1,H=1;for(;U+z<f&&y[I][U+z]===P;)z++;for(;I+H<v&&y[I+H].slice(U,U+z).every(G=>G===P);)H++;for(let G=I;G<I+H;G++)y[G].fill(null,U,U+z);a([c-h/2+(U+z/2)*A,d+p/2-(I+H/2)*S,T,z*A,H*S,r,P,!1,"f",E],l)}if(h>=.18&&x>=.15){let I=Math.max(1,Math.round(x/t)),U=x/I,P=new Map;for(let z=0;z<2;z++){let H=(R()<.5?-1:1)*m.amp*(.6+R()*.5);Math.abs(H)<.04&&(H=H<0?-.04:.04);let G=Math.floor(R()*f),J=Math.floor(R()*I);P.set(J*f+G,[c-h/2+(G+.5)*A,d+p/2+r/2,u-x/2+(J+.5)*U,A,r,U,Kn(g,1+H),!1,"t",E])}for(let z of P.values())a(z,l)}}),s}function rf(n,e,t,i,s){i.fill(0);let r=0,a=0,o=l=>{i[l]||n[l*4]>=128||(i[l]=1,s[a++]=l)};for(let l=0;l<e;l++)o(l),o((t-1)*e+l);for(let l=0;l<t;l++)o(l*e),o(l*e+e-1);for(;r<a;){let l=s[r++],c=l%e;c&&o(l-1),c<e-1&&o(l+1),l>=e&&o(l-e),l<e*(t-1)&&o(l+e)}for(let l=0;l<e*t;l++){let c=i[l]?0:255;n[l*4]=n[l*4+1]=n[l*4+2]=c,n[l*4+3]=255}}var X_="approved-voxel-v4";var af={fighter:{cloth:"#315e84",trim:"#c6a04f",hair:"#75462e",skin:"#efbc88"},wizard:{cloth:"#62377e",trim:"#c6a04f",hair:"#c9c6d7",skin:"#efbc88"},rogue:{cloth:"#487844",trim:"#c6a04f",hair:"#352b32",skin:"#efbc88"},cleric:{cloth:"#8b3d46",trim:"#c6a04f",hair:"#734c32",skin:"#efbc88"},skeleton:{cloth:"#813a36",trim:"#c6a04f",hair:"#352b32",skin:"#d9c9a5"},dummy:{cloth:"#936c40",trim:"#c6a04f",hair:"#936c40",skin:"#936c40"}},of=Object.freeze({keeper:Object.freeze({name:"\u042D\u043B\u043B\u0435\u043D",role:"\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430",classId:"cleric",appearance:Object.freeze({gender:"female",hair:"#c9c6d7",hairStyle:"long",face:"soft"}),hood:!0,hands:Object.freeze(["empty","empty"])}),novice:Object.freeze({name:"\u041B\u0438\u043D",role:"\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A",classId:"cleric",appearance:Object.freeze({gender:"male",hair:"#75462e",hairStyle:"short",face:"soft"}),hood:!1,hands:Object.freeze(["empty","empty"])})}),lf={ellen:"keeper",lin:"novice"};function q_(n){let e=Object.hasOwn(lf,n)?lf[n]:n;if(!Object.hasOwn(of,e))throw new Error("NPC must be registered in NPCS: "+n);return of[e]}function vh(n={},e=n.kind||0){let t=n.npcId||(n.type==="npc"?n.id:null),i=t?q_(t):null,s=i?.classId||(n.classId&&Object.hasOwn(af,n.classId)?n.classId:["rogue","wizard","fighter","skeleton","dummy","cleric"][e]||"cleric"),r=i?.appearance||n.appearance||{},a=af[s],o=["male","female"].includes(r.gender)?r.gender:!n.appearance&&e===1?"female":"male",l=(c,d)=>/^#[a-f0-9]{6}$/i.test(c||"")?c:d;return{style:X_,role:s,gender:o,skin:l(r.skin,a.skin),hair:l(r.hair,o==="female"&&s==="cleric"?"#c9c6d7":o==="female"&&s==="fighter"?"#d7a652":a.hair),cloth:l(r.cloth,a.cloth),trim:l(r.trim,a.trim),hairStyle:["short","long","bald"].includes(r.hairStyle)?r.hairStyle:s==="cleric"&&!i&&o==="male"?"bald":o==="female"&&s!=="rogue"?"long":"short",face:["soft","stern","beard"].includes(r.face)?r.face:s==="cleric"&&!i&&o==="male"?"beard":"soft",hood:i?i.hood:s==="cleric"&&o==="female",hands:i?.hands||n.hands||(s==="fighter"||s==="skeleton"?["sword","shield"]:s==="wizard"||s==="cleric"?["staff","empty"]:["sword","empty"])}}function ht(n,e){let t=parseInt(n.slice(1),16);return"#"+[t>>16,t>>8&255,t&255].map(i=>Math.min(255,Math.max(0,i+e)).toString(16).padStart(2,"0")).join("")}function bl(n={},e=n.kind||0){let t=vh(n,e),i=[],s="body",r=(g,m,f,v,A,S,T,E=0)=>{let R=["head","hair","beard","hood"].includes(s),y=R?1.24:1.2,w=R?1.1:s==="equipment"?.84:.76,L=R?1.2:1.12;i.push({x:g*y,y:R?.7494+(m-.945)*w:.13+(m-.13)*w,z:f*L,w:v*y,h:A*w,d:S*L,color:T,rz:E,section:s})},a=t.gender==="female",o=t.cloth,l=t.trim,c="#573b29",d="#9caeb9",u=t.skin,h=ht(o,17),p=ht(o,-20),x=a?.31:.36;if(t.role==="dummy")return s="equipment",r(0,.6,0,.1,.95,.1,c),r(0,.85,0,.65,.09,.1,"#a4814b"),r(0,1.15,0,.39,.38,.34,"#b8955e"),r(0,1.15,.18,.28,.26,.015,"#843d32"),r(0,1.15,.196,.14,.13,.02,l),{profile:t,parts:i};for(let g of[-.115,.115])r(g,.22,.025,.17,.15,.26,c),r(g,.29,.035,.18,.05,.23,ht(c,13)),r(g,.405,0,.145,.22,.18,"#343139"),r(g,.335,.109,.145,.04,.025,l),r(g,.22,.16,.15,.07,.025,ht(c,-14));r(0,.715,0,x,.37,.26,o),r(0,.665,.139,x,.22,.018,p),r(0,.87,.14,x,.045,.025,h),r(0,.535,0,x+.045,.055,.295,c),r(0,.535,.165,.09,.08,.04,l),r(0,.535,.189,.043,.035,.014,c);for(let g of[-(x/2+.065),x/2+.065])r(g,.79,0,.13,.19,.21,o,g<0?-.13:.13),r(g,.644,.035,.105,.12,.15,c),r(g,.57,.05,.102,.09,.115,u),r(g,.715,.11,.13,.035,.028,l),r(g,.643,.12,.105,.025,.035,ht(c,18));if(t.role==="fighter"){r(0,.74,.16,x+.01,.27,.07,p),r(0,.75,.202,x-.035,.18,.025,h),r(0,.865,.193,x+.025,.045,.035,l),r(0,.674,.202,x,.04,.03,l);for(let g of[-.25,.25])r(g,.9,0,.22,.13,.285,o),r(g,.923,.02,.17,.045,.25,h),r(g,.858,.139,.205,.035,.025,l),r(g,.75,.121,.12,.11,.04,d),r(g,.717,.151,.12,.026,.02,"#c8d0d2");for(let g of[-.135,.135])r(g,.458,.045,.165,.11,.27,o),r(g,.422,.185,.165,.035,.02,l),r(g,.47,.195,.07,.07,.012,h);r(0,.765,.225,.035,.11,.015,l),r(0,.485,.162,.075,.05,.018,"#c5a165")}else if(t.role==="wizard"){for(let g of[-.11,.11])r(g,.457,0,.13,a?.3:.22,.31,o),r(g,.34,.166,.13,.035,.025,l),r(g,.65,.152,.028,.31,.025,l),r(g,.47,.171,.045,.1,.02,h);r(0,.73,.148,.09,.3,.028,"#343139"),r(0,.871,.173,.05,.055,.03,l),r(0,.873,.196,.022,.022,.017,"#63c6ed");for(let g of[-.17,.17])r(g,.874,.16,.07,.12,.09,h,g<0?-.22:.22)}else if(t.role==="rogue"){r(0,.715,.165,x-.015,.285,.045,c),r(-.065,.7,.194,.13,.22,.018,ht(c,13)),r(.09,.7,.195,.1,.22,.02,ht(c,-10)),r(0,.75,-.17,.42,.38,.065,p),r(0,.92,.02,.45,.09,.35,h),r(-.17,.846,.129,.2,.07,.07,o,-.3),r(.12,.837,.152,.27,.07,.07,o,.22),r(0,.859,.196,.08,.06,.024,l),r(-.1,.725,.175,.05,.28,.035,c,-.6),r(.085,.639,.175,.09,.07,.03,c,-.6);for(let g of[-.16,.16])r(g,.496,.182,.1,.115,.06,c),r(g,.529,.218,.1,.035,.025,ht(c,17)),r(g,.509,.235,.025,.026,.014,l);for(let g of[-.17,.17])r(g,.428,-.04,.075,.15,.27,o)}else if(t.role==="cleric"){for(let g of[-.13,.13])r(g,.452,0,.16,.3,.3,o),r(g,.316,.173,.16,.035,.025,"#dfcea6"),r(g,.7,.163,.036,.3,.025,"#dfcea6");r(0,.7,.168,.1,.3,.028,"#4d7541");for(let g of[-.14,.14])r(g,.904,.02,.2,.075,.32,"#dfcea6",g<0?-.18:.18);r(0,.857,.176,.038,.14,.035,l),r(0,.875,.18,.105,.032,.035,l);for(let g of[-.235,.235])r(g,.73,.09,.13,.045,.22,"#dfcea6")}if(r(0,.537,-.155,x+.045,.055,.025,c),t.role==="fighter"&&(r(0,.75,-.16,x-.035,.23,.05,p),r(0,.87,-.19,x,.035,.025,l),r(0,.66,-.19,x,.035,.025,l)),t.role==="wizard"||t.role==="cleric")for(let g of[-.1,.1])r(g,.66,-.158,.025,.34,.026,t.role==="cleric"?"#dfcea6":l),r(g,.439,-.17,.14,.18,.024,p);if(t.role==="rogue"){for(let g of[-.1,.1])r(g,.75,-.21,.1,.33,.02,ht(o,g<0?8:-12));r(0,.575,-.208,.38,.025,.025,ht(o,15))}s="head",r(0,1.145,.03,.43,.4,.35,u),r(0,.955,.03,.13,.06,.14,u);for(let g of[-.239,.239])r(g,1.125,.045,.055,.11,.095,ht(u,-9));if(r(.205,1.13,.06,.016,.33,.29,ht(u,-15)),r(-.105,1.319,.029,.2,.017,.32,ht(u,15)),t.role==="skeleton"){r(0,1.145,.03,.43,.4,.35,t.skin);for(let g of[-.105,.105])r(g,1.15,.218,.094,.095,.028,"#292620");r(0,1.075,.219,.049,.058,.022,"#292620");for(let g of[-.12,-.06,0,.06,.12])r(g,1.01,.222,.035,.062,.026,ht(t.skin,10));for(let g of[-.15,.15])r(g,1.045,.2,.05,.09,.05,t.skin);r(0,.715,.169,.06,.13,.02,l)}else{for(let g of[-.1,.1])r(g,1.135,.218,.05,.085,.015,"#251e1c"),t.face==="stern"?r(g,1.206,.216,.073,.025,.018,t.hair,g<0?-.22:.22):a?r(g-.01,1.181,.217,.035,.012,.017,"#251e1c"):r(g,1.202,.216,.065,.014,.018,t.hair);r(0,1.025,.213,.056,.009,.012,ht(u,-55))}if(s="beard",t.face==="beard"&&t.role!=="skeleton"){for(let g of[-.165,-.11,.11,.165])r(g,1.036,.218,.06,.13,.035,t.hair);r(0,.994,.218,.27,.09,.04,t.hair),r(0,1.022,.243,.105,.03,.025,ht(t.hair,14))}if(s="hair",t.hairStyle!=="bald"&&t.role!=="skeleton"){if(!t.hood)r(0,1.34,-.005,.47,.06,.405,ht(t.hair,-8));else{r(0,1.352,.208,.395,.1,.072,ht(t.hair,-8));for(let f of[-1,1])r(f*.19,1.29,.208,.055,.115,.06,t.hair)}let g=[[1,2,3,2,1],[2,3,2,4,2],[2,2,4,3,2],[1,3,2,2,1]];if(!t.hood)for(let f=0;f<4;f++)for(let v=0;v<5;v++){let A=g[f][v],S=f%2?.014:-.012;r((v-2)*.095+S,1.325+(A-1)*.025,(f-1.5)*.104,.101,.06+(A-1)*.05,.111,ht(t.hair,[4,15,-9,8][(v+f)%4]))}let m=[{x:-.2,y:1.295,h:.11},{x:-.11,y:1.255,h:.2},{x:0,y:1.3,h:.11},{x:.1,y:1.265,h:.18},{x:.2,y:1.285,h:.13}];for(let f=0;f<m.length;f++){let v=m[f];r(v.x,v.y,.224,.104,v.h,.096,ht(t.hair,f%2?0:13))}for(let f of[-.223,.223])r(f,1.24,-.035,.067,.16,.32,ht(t.hair,-9)),r(f,1.205,.135,.073,.13,.08,t.hair);if(t.hood||r(0,1.225,-.17,.45,.25,.068,ht(t.hair,-9)),a&&!t.hood&&t.hairStyle==="short"){for(let f of[-.239,.239])r(f,1.11,.005,.073,.23,.31,t.hair),r(f,1.007,.015,.08,.07,.25,ht(t.hair,10));r(0,1.08,-.175,.46,.29,.075,t.hair)}if(t.hairStyle==="long"&&t.hood)for(let f of[-.218,.218])r(f,1.085,.225,.054,.15,.065,t.hair);if(t.hairStyle==="long"&&!t.hood)if(t.role==="fighter"&&a)r(.105,1.31,-.25,.16,.15,.15,t.hair),r(.11,1.08,-.25,.18,.36,.145,t.hair),r(.11,.865,-.24,.13,.09,.14,ht(t.hair,14)),r(.105,1.245,-.273,.17,.035,.15,"#352b32");else if(!a)r(0,1.43,-.19,.19,.16,.18,t.hair),r(.025,1.26,-.235,.2,.15,.16,t.hair),r(.025,1.335,-.248,.2,.03,.16,"#251e1c");else{for(let f=0;f<5;f++)r((f-2)*.094,1.035,-.18,.098,.4,.088,ht(t.hair,f%2?0:12));for(let f of[-.247,.247])r(f,1.06,.015,.075,.34,.27,t.hair),r(f,.873,.035,.08,.085,.24,ht(t.hair,14))}}if(s="hood",t.hood){let g="#dfcea6";r(0,1.444,-.025,.39,.065,.44,g),r(0,1.482,-.025,.25,.03,.38,t.cloth),r(0,1.23,-.23,.49,.4,.055,g);for(let m of[-1,1])r(m*.217,1.385,-.035,.078,.105,.43,g),r(m*.253,1.19,-.035,.064,.3,.43,g),r(m*.24,1.335,.2,.06,.07,.04,t.cloth),r(m*.266,1.165,.2,.03,.23,.04,ht(g,-16));r(0,1.409,.205,.34,.028,.025,t.cloth)}if(s="equipment",t.hands.includes("shield")&&(r(.36,.75,.2,.3,.48,.055,l),r(.36,.75,.238,.235,.405,.027,o),r(.36,.75,.26,.03,.19,.015,l),r(.36,.78,.261,.145,.03,.017,l),r(.36,.508,.2,.22,.045,.06,l),r(.36,.474,.2,.15,.038,.06,l)),t.hands.includes("sword")&&(r(-.345,.65,.16,.085,.38,.05,d,.42),r(-.418,.8,.16,.065,.14,.05,"#d6dcdf",.42),r(-.264,.466,.16,.17,.035,.07,l,.42),r(-.234,.411,.16,.045,.1,.045,c,.42)),t.hands.includes("staff"))if(r(-.34,.85,.05,.045,.96,.045,c),t.role==="cleric"){r(-.34,1.25,.05,.15,.13,.15,d);for(let g of[-.435,-.245])r(g,1.25,.05,.045,.12,.1,l);r(-.34,1.35,.05,.055,.065,.055,l)}else r(-.34,1.35,.05,.16,.05,.16,l),r(-.34,1.42,.05,.12,.12,.12,"#46bbed"),r(-.34,1.5,.05,.06,.05,.06,"#7bd8f7");if(t.hands.includes("bow")){for(let g=0;g<5;g++)r(-.33-.055*Math.sin(g*Math.PI/4),.55+g*.1,.07,.043,.13,.04,"#936c40");r(-.33,.75,.085,.01,.4,.01,"#cebfa0")}return{profile:t,parts:i}}var ki=n=>n.map(([e,t])=>({hex:e,name:t})),Y_={skin:ki([["#f6dcc3","\u0424\u0430\u0440\u0444\u043E\u0440"],["#f2d4b4","\u0421\u0432\u0435\u0442\u043B\u0430\u044F"],["#e9bf90","\u0422\u0451\u043F\u043B\u0430\u044F"],["#e3bb8a","\u041F\u0435\u0441\u043E\u0447\u043D\u0430\u044F"],["#d9a577","\u0417\u0430\u0433\u0430\u0440"],["#c58d64","\u041C\u0435\u0434\u043D\u0430\u044F"],["#a8714d","\u0411\u0440\u043E\u043D\u0437\u0430"],["#8b5b42","\u041A\u0430\u0448\u0442\u0430\u043D\u043E\u0432\u0430\u044F"],["#6b4331","\u0422\u0451\u043C\u043D\u0430\u044F"],["#4a2f25","\u042D\u0431\u0435\u043D\u043E\u0432\u0430\u044F"],["#efbc88","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#f8dfca","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#eac2ad","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#d8a17a","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#b77a55","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#a26a48","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#70472f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#533827","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"]]),hair:ki([["#1c1b20","\u0427\u0451\u0440\u043D\u044B\u0439"],["#26282e","\u0413\u0440\u0430\u0444\u0438\u0442"],["#3a2a22","\u0428\u043E\u043A\u043E\u043B\u0430\u0434"],["#493024","\u041A\u0430\u0448\u0442\u0430\u043D"],["#6a432c","\u041E\u0440\u0435\u0445"],["#8a5a34","\u041C\u0435\u0434\u043E\u0432\u044B\u0439"],["#a64f35","\u0420\u044B\u0436\u0438\u0439"],["#c4622f","\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439"],["#b7803c","\u0417\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u0439"],["#d9b45a","\u0411\u043B\u043E\u043D\u0434"],["#e6cf8a","\u041B\u0451\u043D"],["#c7c4bf","\u0421\u0435\u0434\u043E\u0439"],["#e8e6ee","\u0411\u0435\u043B\u044B\u0439"],["#8d8a99","\u041F\u0435\u043F\u0435\u043B"],["#4a7fd0","\u041B\u0430\u0437\u0443\u0440\u044C"],["#5a3fa8","\u0418\u043D\u0434\u0438\u0433\u043E"],["#c05a9a","\u041C\u0430\u043B\u0438\u043D\u0430"],["#e07aa8","\u0420\u043E\u0437\u043E\u0432\u044B\u0439"],["#3fa58a","\u0411\u0438\u0440\u044E\u0437\u0430"],["#5f9a45","\u041C\u043E\u0445"],["#b02f3d","\u0410\u043B\u044B\u0439"],["#3b6a8a","\u0421\u0442\u0430\u043B\u044C"],["#75462e","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#c9c6d7","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#d7a652","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#352b32","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#734c32","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#17191f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#f0e9dc","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#e0b969","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#cb763f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#77352b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#596779","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#5d437c","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"],["#395c57","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"],["#8d526b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"],["#ac86ba","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),eye:ki([["#14141a","\u0427\u0451\u0440\u043D\u044B\u0435"],["#3a2418","\u0422\u0451\u043C\u043D\u043E-\u043A\u0430\u0440\u0438\u0435"],["#6a4a22","\u041A\u0430\u0440\u0438\u0435"],["#2f5fa8","\u0421\u0438\u043D\u0438\u0435"],["#2f7a5a","\u0417\u0435\u043B\u0451\u043D\u044B\u0435"],["#6a3fa0","\u0424\u0438\u0430\u043B\u043A\u043E\u0432\u044B\u0435"],["#c27a1c","\u042F\u043D\u0442\u0430\u0440\u043D\u044B\u0435"],["#8a8f9a","\u0421\u0435\u0440\u044B\u0435"],["#b02f3d","\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0435"]]),cloth:ki([["#24456b","\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439"],["#315e84","\u0421\u0438\u043D\u0438\u0439"],["#4a7fb0","\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439"],["#2f7a7a","\u041C\u043E\u0440\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430"],["#566d70","\u0421\u043B\u0430\u043D\u0435\u0446"],["#2d4f2c","\u0425\u0432\u043E\u044F"],["#3f6b3b","\u0417\u0435\u043B\u0451\u043D\u044B\u0439"],["#487844","\u0422\u0440\u0430\u0432\u0430"],["#7a9a4a","\u041E\u043B\u0438\u0432\u0430"],["#452361","\u0418\u043D\u0434\u0438\u0433\u043E"],["#5d2f7e","\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],["#62377e","\u0410\u043C\u0435\u0442\u0438\u0441\u0442"],["#8a4a9a","\u041E\u0440\u0445\u0438\u0434\u0435\u044F"],["#c8688a","\u0420\u043E\u0437\u0430"],["#6a2330","\u0411\u0443\u0440\u0433\u0443\u043D\u0434"],["#8a2f3c","\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439"],["#843f37","\u041A\u0438\u0440\u043F\u0438\u0447"],["#b0452f","\u0422\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u0430"],["#c7792f","\u042F\u043D\u0442\u0430\u0440\u044C"],["#8a6a46","\u041B\u0435\u043D"],["#2a2a30","\u0423\u0433\u043E\u043B\u044C"],["#6c6c76","\u0421\u0435\u0440\u044B\u0439"],["#e6dcc4","\u041A\u0440\u0435\u043C\u043E\u0432\u044B\u0439"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#8b3d46","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#172b48","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#386f9a","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#528b91","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#244b3b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#74914b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#b28439","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#bf6d36","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#714c38","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#302d38","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#aaa69b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#cfbda0","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"],["#775b96","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"],["#a9617b","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"],["#484c74","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),trim:ki([["#d0a94a","\u0417\u043E\u043B\u043E\u0442\u043E"],["#c3a04c","\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"],["#e8c870","\u0421\u0432\u0435\u0442\u043B\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"],["#b6bdc5","\u0421\u0435\u0440\u0435\u0431\u0440\u043E"],["#8fa0b0","\u0421\u0442\u0430\u043B\u044C"],["#c5b895","\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C"],["#78552e","\u0411\u0440\u043E\u043D\u0437\u0430"],["#b87333","\u041C\u0435\u0434\u044C"],["#b02f3d","\u0410\u043B\u044B\u0439"],["#3d8be8","\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"],["#4fb58a","\u0418\u0437\u0443\u043C\u0440\u0443\u0434"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#2a2a30","\u0427\u0451\u0440\u043D\u044B\u0439"],["#c6a04f","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"],["#e4c778","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"],["#dbb787","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"],["#ad7748","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"],["#926749","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"],["#d8dce1","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"],["#82919d","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"],["#526374","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"],["#e9dfc7","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"],["#b18bbf","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"],["#699ca0","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"],["#4c5b4c","\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"]]),leather:ki([["#4b3626","\u0422\u0451\u043C\u043D\u0430\u044F \u043A\u043E\u0436\u0430"],["#5a3d28","\u041A\u043E\u0436\u0430"],["#6a4a30","\u0421\u0432\u0435\u0442\u043B\u0430\u044F \u043A\u043E\u0436\u0430"],["#8a6a46","\u0414\u0443\u0431\u043B\u0451\u043D\u0430\u044F"],["#2a2a30","\u0427\u0451\u0440\u043D\u0430\u044F"],["#3a3a44","\u0413\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u0430\u044F"],["#6a2330","\u041A\u0440\u0430\u0441\u043D\u0430\u044F"],["#2d4f2c","\u0417\u0435\u043B\u0451\u043D\u0430\u044F"],["#24456b","\u0421\u0438\u043D\u044F\u044F"]]),paint:ki([["#b02f3d","\u0410\u043B\u044B\u0439"],["#f0ece0","\u0411\u0435\u043B\u044B\u0439"],["#3d8be8","\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"],["#1a1a1f","\u0427\u0451\u0440\u043D\u044B\u0439"],["#3f9a5a","\u0417\u0435\u043B\u0451\u043D\u044B\u0439"],["#d0a94a","\u0417\u043E\u043B\u043E\u0442\u043E\u0439"],["#7a3fa8","\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"],["#e07a2f","\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439"]]),gem:ki([["#4aa8f0","\u0421\u0430\u043F\u0444\u0438\u0440"],["#e0475a","\u0420\u0443\u0431\u0438\u043D"],["#4fd08a","\u0418\u0437\u0443\u043C\u0440\u0443\u0434"],["#a86bf0","\u0410\u043C\u0435\u0442\u0438\u0441\u0442"],["#f0c040","\u0422\u043E\u043F\u0430\u0437"],["#40e0d0","\u0411\u0438\u0440\u044E\u0437\u0430"],["#f0f0ff","\u0410\u043B\u043C\u0430\u0437"],["#f07ac0","\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u043A\u0432\u0430\u0440\u0446"]])};var Qt=n=>n.map(([e,t])=>({id:e,name:t})),Z_={gender:Qt([["male","\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],["female","\u0416\u0435\u043D\u0441\u043A\u0438\u0439"]]),ears:Qt([["round","\u041E\u0431\u044B\u0447\u043D\u044B\u0435"],["small","\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435"],["pointed","\u041E\u0441\u0442\u0440\u044B\u0435"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0435"]]),hairStyle:Qt([["bald","\u0411\u0435\u0437 \u0432\u043E\u043B\u043E\u0441"],["buzz","\u0401\u0436\u0438\u043A"],["short","\u0412\u0437\u044A\u0435\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435"],["spiky","\u0428\u0438\u043F\u044B"],["mohawk","\u0418\u0440\u043E\u043A\u0435\u0437"],["sweep","\u041A\u043E\u0441\u0430\u044F \u0447\u0451\u043B\u043A\u0430"],["bob","\u041A\u0430\u0440\u0435"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0435"],["wavy","\u0412\u043E\u043B\u043D\u044B"],["ponytail","\u0425\u0432\u043E\u0441\u0442"],["bun","\u041F\u0443\u0447\u043E\u043A"],["twin","\u0414\u0432\u0430 \u0445\u0432\u043E\u0441\u0442\u0430"],["braid","\u041A\u043E\u0441\u0430"],["curly","\u041A\u0443\u0434\u0440\u0438"]]),brows:Qt([["soft","\u041C\u044F\u0433\u043A\u0438\u0435"],["straight","\u0420\u043E\u0432\u043D\u044B\u0435"],["angry","\u0421\u0443\u0440\u043E\u0432\u044B\u0435"],["raised","\u041F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435"],["thick","\u0413\u0443\u0441\u0442\u044B\u0435"],["thin","\u0422\u043E\u043D\u043A\u0438\u0435"],["sad","\u041F\u0435\u0447\u0430\u043B\u044C\u043D\u044B\u0435"],["none","\u0411\u0435\u0437 \u0431\u0440\u043E\u0432\u0435\u0439"]]),eyes:Qt([["dot","\u0422\u043E\u0447\u043A\u0438"],["wide","\u0428\u0438\u0440\u043E\u043A\u0438\u0435"],["narrow","\u0423\u0437\u043A\u0438\u0435"],["happy","\u0420\u0430\u0434\u043E\u0441\u0442\u043D\u044B\u0435"],["sleepy","\u0421\u043E\u043D\u043D\u044B\u0435"],["sparkle","\u0411\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0435"],["big","\u0411\u043E\u043B\u044C\u0448\u0438\u0435"]]),mouth:Qt([["smile","\u0423\u043B\u044B\u0431\u043A\u0430"],["neutral","\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439"],["grin","\u0423\u0445\u043C\u044B\u043B\u043A\u0430 \u0441 \u0437\u0443\u0431\u0430\u043C\u0438"],["smirk","\u0423\u0441\u043C\u0435\u0448\u043A\u0430"],["open","\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439"],["cat","\u041A\u043E\u0448\u0430\u0447\u0438\u0439"],["frown","\u0425\u043C\u0443\u0440\u044B\u0439"]]),beard:Qt([["none","\u0411\u0435\u0437 \u0431\u043E\u0440\u043E\u0434\u044B"],["stubble","\u0429\u0435\u0442\u0438\u043D\u0430"],["mustache","\u0423\u0441\u044B"],["goatee","\u042D\u0441\u043F\u0430\u043D\u044C\u043E\u043B\u043A\u0430"],["short","\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F"],["full","\u0413\u0443\u0441\u0442\u0430\u044F"],["long","\u0414\u043B\u0438\u043D\u043D\u0430\u044F"],["sideburns","\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u044B"]]),marks:Qt([["freckles","\u0412\u0435\u0441\u043D\u0443\u0448\u043A\u0438"],["blush","\u0420\u0443\u043C\u044F\u043D\u0435\u0446"],["scar","\u0428\u0440\u0430\u043C"],["browscar","\u0428\u0440\u0430\u043C \u043D\u0430 \u0431\u0440\u043E\u0432\u0438"],["mole","\u0420\u043E\u0434\u0438\u043D\u043A\u0430"],["warpaint","\u0411\u043E\u0435\u0432\u0430\u044F \u0440\u0430\u0441\u043A\u0440\u0430\u0441\u043A\u0430"],["plaster","\u041F\u043B\u0430\u0441\u0442\u044B\u0440\u044C"]]),headgear:Qt([["none","\u0411\u0435\u0437 \u0443\u0431\u043E\u0440\u0430"],["hood","\u041A\u0430\u043F\u044E\u0448\u043E\u043D"],["wizhat","\u0428\u043B\u044F\u043F\u0430 \u043C\u0430\u0433\u0430"],["helm","\u0428\u043B\u0435\u043C"],["circlet","\u0414\u0438\u0430\u0434\u0435\u043C\u0430"],["headband","\u041F\u043E\u0432\u044F\u0437\u043A\u0430"],["cap","\u0411\u0435\u0440\u0435\u0442 \u0441 \u043F\u0435\u0440\u043E\u043C"],["crown","\u041A\u043E\u0440\u043E\u043D\u0430"]]),cape:Qt([["none","\u0411\u0435\u0437 \u043F\u043B\u0430\u0449\u0430"],["short","\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043F\u043B\u0430\u0449"],["long","\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0449"],["mantle","\u041D\u0430\u043A\u0438\u0434\u043A\u0430"]]),accessories:Qt([["earring","\u0421\u0435\u0440\u044C\u0433\u0430"],["eyepatch","\u041F\u043E\u0432\u044F\u0437\u043A\u0430 \u043D\u0430 \u0433\u043B\u0430\u0437"],["glasses","\u041E\u0447\u043A\u0438"],["scarf","\u0428\u0430\u0440\u0444"],["amulet","\u0410\u043C\u0443\u043B\u0435\u0442"],["bracers","\u041D\u0430\u0440\u0443\u0447\u0438"]])},hf={fighter:Qt([["plate","\u041B\u0430\u0442\u044B"],["tabard","\u0421\u044E\u0440\u043A\u043E"],["leather","\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"],["knight","\u0422\u044F\u0436\u0451\u043B\u044B\u0435 \u043B\u0430\u0442\u044B"]]),wizard:Qt([["robe","\u041C\u0430\u043D\u0442\u0438\u044F"],["mantle","\u0421 \u0432\u043E\u0440\u043E\u0442\u043D\u0438\u043A\u043E\u043C"],["sash","\u0421 \u043A\u0443\u0448\u0430\u043A\u043E\u043C"],["scholar","\u0423\u0447\u0451\u043D\u044B\u0439 \u0436\u0438\u043B\u0435\u0442"]]),rogue:Qt([["leathers","\u041A\u043E\u0436\u0430 \u0441 \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u044C\u044E"],["vest","\u0416\u0438\u043B\u0435\u0442"],["tunic","\u0422\u0443\u043D\u0438\u043A\u0430"],["studded","\u041A\u043B\u0451\u043F\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"]]),cleric:Qt([["vestments","\u041E\u0431\u043B\u0430\u0447\u0435\u043D\u0438\u0435"],["surplice","\u0421\u0442\u0438\u0445\u0430\u0440\u044C"],["mail","\u041A\u043E\u043B\u044C\u0447\u0443\u0433\u0430"],["monk","\u0420\u044F\u0441\u0430 \u0441 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439"]])},uf={fighter:"plate",wizard:"robe",rogue:"leathers",cleric:"vestments"},df={skin:"skin",hair:"hair",hair2:"hair",brow:"hair",eye:"eye",beardColor:"hair",cloth:"cloth",cloth2:"cloth",trim:"trim",leather:"leather",accent:"cloth",markColor:"paint",hat:"cloth",capeColor:"cloth",gem:"gem"};var J_=new Set(["gender","ears","hairStyle","brows","eyes","mouth","beard","marks","headgear","cape","accessories","outfit","face","hood",...Object.keys(df)]),$_={ears:"round",eyes:"dot",mouth:"smile",beard:"none",marks:[],headgear:"none",accessories:[],skin:"#e9bf90",hair2:null,brow:null,beardColor:null,cloth2:null,accent:null,hat:null,capeColor:null,eye:"#14141a",trim:"#d0a94a",gem:"#4aa8f0"},cf={fighter:{cloth:"#315e84",leather:"#5a3d28",male:{hair:"#493024",hairStyle:"short",brows:"angry"},female:{hair:"#d9b45a",hairStyle:"ponytail",brows:"soft"}},wizard:{cloth:"#5d2f7e",leather:"#5a3d28",male:{hair:"#c7c4bf",hairStyle:"short",brows:"angry"},female:{hair:"#c7c4bf",hairStyle:"wavy",brows:"soft"}},rogue:{cloth:"#3f6b3b",leather:"#6a4a30",cape:"short",male:{hair:"#26282e",hairStyle:"bun",brows:"angry"},female:{hair:"#6a432c",hairStyle:"bob",brows:"soft"}},cleric:{cloth:"#8a2f3c",leather:"#5a3d28",male:{hair:"#493024",hairStyle:"bald",brows:"angry",beard:"full"},female:{hair:"#c7c4bf",hairStyle:"long",brows:"soft",headgear:"hood"}}};function Mh(n,e="male"){let t=cf[n]||cf.fighter,i=t[e==="female"?"female":"male"];return{...K_($_),gender:e==="female"?"female":"male",cloth:t.cloth,leather:t.leather,cape:t.cape||"none",outfit:uf[n]||"plate",...i}}var K_=n=>JSON.parse(JSON.stringify(n));function wl(n,e){n=n||{};let t=n.gender==="female"?"female":"male",i=Mh(e,t),s={...i};for(let a of Object.keys(n))n[a]!==void 0&&J_.has(a)&&(s[a]=n[a]);let r=n.brows===void 0&&n.face!==void 0;return r?(s.brows=n.face==="soft"?"soft":"angry",n.beard===void 0&&(s.beard=n.face==="beard"?"full":"none"),n.headgear===void 0&&(s.headgear=n.hood?"hood":"none")):n.hood&&n.headgear===void 0&&(s.headgear="hood"),r&&n.hairStyle==="short"&&t==="female"&&(s.hairStyle="bob"),r&&n.hairStyle==="long"&&t==="male"&&(s.hairStyle="bun"),hf[e]?.some(a=>a.id===s.outfit)||(s.outfit=uf[e]||"plate"),Array.isArray(s.marks)||(s.marks=[]),Array.isArray(s.accessories)||(s.accessories=[]),s}var Al={headMinRatio:.34,headMaxRatio:.46,maxBoxes:200,maxWithTexels:520,texel:!0,defaultEye:1315866,outline:"#1b1620",classes:["fighter","rogue","wizard","cleric"],genders:["male","female"]};var j_={fighter:{cloth:3235460,dark:2377067,trim:13674826,boots:4929062,belt:5913896},wizard:{cloth:6107006,dark:4531041,trim:13674826,boots:4929062,belt:5913896,gem:4033512},rogue:{cloth:4156219,dark:2969388,trim:12820556,boots:4929062,belt:6965808,leather:6965808},cleric:{cloth:9056060,dark:6955824,trim:13674826,boots:4929062,belt:5913896,cream:15392707,green:4152127}},zi=12963024,Cl=9081498,Sh=6965808,mf=10133667,jn=15392707,bh=4152127,Q_=10181190,ff=4857626,ey=16052454,Tl=1710623,pf=16777215,ty={0:"rogue",1:"wizard",2:"fighter",5:"cleric"},ny={0:"male",1:"female",2:"male"},iy={fighter:["sword","shield"],rogue:["sword","empty"],wizard:["staff","empty"],cleric:["staff","empty"]},El={innkeeper:{name:"\u0411\u0440\u0430\u043C",role:"\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A",classId:"fighter",gender:"male",look:{hair:"#6a432c",hairStyle:"short",beard:"none",cloth:"#843f37"},hands:["empty","empty"]},"street-guard":{name:"\u0420\u0430\u0434\u0430",role:"\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430",classId:"fighter",gender:"female",look:{hair:"#6a432c",hairStyle:"braid",cloth:"#315e84"},hands:["sword","shield"]},keeper:{name:"\u042D\u043B\u043B\u0435\u043D",role:"\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430",classId:"cleric",gender:"female",look:{hair:"#c7c4bf",hairStyle:"long",brows:"soft",headgear:"hood"},hands:["empty","empty"],book:!0},novice:{name:"\u041B\u0438\u043D",role:"\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A",classId:"cleric",gender:"male",look:{hair:"#6a432c",hairStyle:"short",brows:"soft",beard:"none",cloth:"#843f37"},hands:["empty","empty"]}},vS=Object.fromEntries(Object.entries(El).map(([n,e])=>[e.name,n])),en=n=>typeof n=="number"?n:typeof n=="string"&&/^#[0-9a-f]{6}$/i.test(n)?parseInt(n.slice(1),16):void 0,na=(n,e,t)=>sn(n,1-t)+sn(e,t)&16777215;function ia(n,e){let t=e?.gen&&typeof e.gen=="object"?e.gen:null,i=t?null:e?.npc||e?.npcId,s={ellen:"keeper",lin:"novice"}[i]||i||(e&&e.id&&El[e.id]&&e.type==="npc"?e.id:null);if(s&&!Object.hasOwn(El,s))throw Error("NPC must be registered: "+s);let r=t||(s?El[s]:null),a=r?.classId||(Al.classes.includes(e?.classId)?e.classId:ty[n]);if(!a)return null;let o;r?o=wl({...Mh(a,r.gender),...r.look,gender:r.gender},a):e?.appearance?o=wl(e.appearance,a):o=wl({gender:ny[n]||"male"},a);let l=j_[a],c=en(o.cloth)??l.cloth,d=en(o.leather)??l.belt,u=en(o.hair)??4796452;return{classId:a,gender:o.gender,npc:s,outfit:o.outfit,hairStyle:o.hairStyle,ears:o.ears,brows:o.brows,eyes:o.eyes,mouth:o.mouth,beard:o.beard,marks:o.marks,headgear:o.headgear,cape:o.cape,accessories:o.accessories,skin:en(o.skin)??15318928,hair:u,hair2:en(o.hair2)??null,brow:en(o.brow)??sn(u,.85),eye:en(o.eye)??Al.defaultEye,beardC:en(o.beardColor)??u,cloth:c,cloth2:en(o.cloth2)??(c===l.cloth?l.dark:sn(c,.78)),trim:en(o.trim)??l.trim,leather:d,boots:sn(d,.83),gem:en(o.gem)??4892912,accent:en(o.accent)??null,markC:en(o.markColor)??null,hat:en(o.hat)??null,capeC:en(o.capeColor)??sn(c,.86),hands:r?.hands||e?.hands||iy[a],book:!!r?.book,p:l}}function Rl(n,e={}){let t=[],i=(m,f,v,A,S,T,E,R=!1)=>t.push([m,f,v,A,S,T,E,R]),s=n.gender==="female",r=n.classId==="wizard"||n.classId==="cleric",a=s?.29:.41,o=a/2+(s?.055:.08),l=s?.1:.14,c=n.outfit,d=n.classId,u=n.trim,h=n.cloth,p=n.cloth2,x=c==="vest"||c==="scholar"||c==="surplice"?jn:c==="mail"||c==="tabard"?Cl:h,g=c==="mail"||c==="tabard"?Cl:c==="leather"||c==="studded"?n.leather:c==="surplice"?jn:h;if(r){let m=s?a+.22:a+.06;i(0,.31,0,m,.3,.3,c==="surplice"?jn:h),i(0,.17,0,m+.02,.045,.32,u);for(let f of[-1,1])i(f*.1,.14,.07,.14,.06,.16,n.boots)}else{for(let m of[-1,1])i(m*.1,.2,.03,.15,.13,.2,n.boots),i(m*.1,.32,.02,.14,.1,.15,p);s&&(i(0,.37,0,.46,.12,.3,p),i(0,.305,0,.48,.028,.32,u))}i(0,.56,0,a,.26,.25,g),i(0,.43,0,a+.02,.05,.27,c==="monk"?13154442:n.leather),i(0,.43,.14,.08,.065,.03,d==="wizard"?n.gem:u);for(let m of[-1,1])i(m*o,.55,0,l,.24,s?.15:.18,x),i(m*o,.4,.02,l-.02,.08,s?.1:.12,n.skin);return i(0,.9,.02,.46,.42,.4,n.skin),ay(i,n),hy(i,n),oy(i,n),n.beard!=="none"&&ly(i,n),cy(i,n),uy[d](i,n,a,o,c),n.cape!=="none"&&dy(i,n,a),fy(i,n),py(i,n,a,o),my(i,n,o,u),sy(t),(e.texel??Al.texel)&&t.push(...as(t,ry(n))),t}function sy(n){let t=n.map(()=>Array(6).fill(0));for(let i=0;i<n.length;i++)for(let s=0;s<i;s++){let r=n[s],a=n[i];for(let o=0;o<3;o++)if([0,1,2].filter(l=>l!==o).every(l=>Math.min(r[l]+r[l+3]/2,a[l]+a[l+3]/2)-Math.max(r[l]-r[l+3]/2,a[l]-a[l+3]/2)>1e-8))for(let l of[-1,1]){let c=o*2+(l===1?1:0);Math.abs(r[o]+l*r[o+3]/2-a[o]-l*a[o+3]/2)<1e-8&&(t[i][c]=Math.max(t[i][c],t[s][c]+1))}}n.forEach((i,s)=>{for(let r=0;r<3;r++){let a=t[s][r*2]*5e-4,o=t[s][r*2+1]*5e-4;i[r]+=(o-a)/2,i[r+3]+=o+a}})}function ry(n){let e=[n.hair,n.hair2,n.beardC,n.brow],t=[zi,Cl,mf,n.trim],i=[n.cloth,n.cloth2,n.capeC,n.hat,n.accent,jn,bh];return s=>s===n.skin?"skin":e.includes(s)?"hair":t.includes(s)?"metal":i.includes(s)?"cloth":"other"}function ay(n,e){let t=e.eye,i=Al.defaultEye,s=t!==i,r=e.accessories.includes("eyepatch"),a=e.gender==="female",o=a?13130346:Q_;for(let d of[-1,1]){if(r&&d===-1)continue;let u=d*.1;switch(e.eyes){case"wide":n(u,.89,.226,.085,.075,.012,t),s&&n(u,.89,.232,.035,.045,.012,i);break;case"narrow":n(u,.885,.226,.08,.04,.012,t);break;case"happy":n(u,.885,.226,.09,.025,.012,t),n(u-.045,.862,.226,.025,.025,.012,t),n(u+.045,.862,.226,.025,.025,.012,t);break;case"sleepy":n(u,.88,.226,.07,.055,.012,t),n(u,.915,.228,.085,.028,.012,sn(e.skin,.82));break;case"sparkle":n(u,.895,.226,.075,.1,.012,t),s&&n(u,.88,.232,.035,.05,.012,i),n(u+.016,.92,.234,.022,.026,.012,pf);break;case"big":n(u,.885,.226,.09,.11,.012,t),s&&n(u,.875,.232,.04,.055,.012,i),n(u+.018,.915,.234,.03,.03,.012,pf);break;default:n(u,.89,.226,.06,.085,.012,t)}}if(a)for(let d of[-1,1])r&&d===-1||(n(d*.155,.935,.227,.035,.03,.012,Tl),e.eyes!=="happy"&&n(d*.1,.942,.227,.09,.014,.012,Tl)),n(d*.15,.815,.226,.06,.035,.012,na(e.skin,15043210,.35));r&&(n(-.1,.89,.232,.13,.11,.014,Tl),n(0,.985,.226,.47,.022,.014,Tl));let l=(d,u,h,p)=>n(d,u,.226,h,p,.012,e.brow);for(let d of[-1,1])switch(e.brows){case"soft":l(d*.1,.955,.08,.018);break;case"straight":l(d*.1,.955,.1,.03);break;case"angry":l(d*.075,.94,.06,.03),l(d*.14,.965,.06,.03);break;case"raised":l(d*.1,.99,.09,.028);break;case"thick":l(d*.1,.955,.11,.045);break;case"thin":l(d*.1,.96,.1,.014);break;case"sad":l(d*.075,.965,.06,.025),l(d*.14,.945,.06,.025);break;default:}let c=(d,u,h,p,x=o,g=.236)=>n(d,u+.015,g,h,p,.012,x);switch(e.mouth){case"neutral":c(0,.785,.08,.02);break;case"grin":c(0,.78,.14,.04,ff),c(0,.796,.12,.016,ey,.238),c(-.075,.8,.022,.022),c(.075,.8,.022,.022);break;case"smirk":c(-.01,.78,.07,.02),c(.05,.79,.04,.02),c(.08,.806,.022,.022);break;case"open":c(0,.775,.06,.05,ff),c(0,.762,.04,.018,12603482,.238);break;case"cat":c(-.035,.775,.045,.02),c(.035,.775,.045,.02),c(0,.79,.025,.03);break;case"frown":c(0,.78,.08,.02),c(-.05,.765,.022,.022),c(.05,.765,.022,.022);break;default:c(0,.78,a?.105:.09,a?.028:.02),c(-.055,.795,.022,.022),c(.055,.795,.022,.022)}}function oy(n,e){for(let t of[-1,1])e.ears==="small"?n(t*.235,.88,.02,.03,.07,.06,e.skin):e.ears==="pointed"?(n(t*.255,.9,.02,.06,.1,.06,e.skin),n(t*.285,.96,.02,.04,.07,.05,e.skin)):e.ears==="long"?(n(t*.26,.9,.02,.07,.09,.06,e.skin),n(t*.31,.97,.02,.05,.09,.05,e.skin),n(t*.34,1.04,.02,.04,.07,.05,e.skin)):n(t*.24,.88,.02,.04,.09,.07,e.skin)}function ly(n,e){let t=e.beardC,i=na(e.skin,t,.3),s=()=>{n(0,.75,.205,.34,.15,.05,t);for(let a of[-1,1])n(a*.17,.83,.2,.05,.2,.05,t)},r=()=>{for(let a of[-1,1])n(a*.21,.8,.12,.05,.26,.2,t);n(0,.818,.238,.18,.03,.04,t)};switch(e.beard){case"stubble":n(0,.745,.221,.42,.1,.012,i),n(0,.815,.221,.3,.035,.012,i);break;case"mustache":n(0,.818,.238,.2,.04,.04,t);for(let a of[-1,1])n(a*.115,.8,.236,.04,.05,.04,t);break;case"goatee":n(0,.74,.228,.1,.12,.04,t),n(0,.818,.238,.14,.03,.04,t);break;case"short":s();break;case"full":s(),r();break;case"long":s(),r(),n(0,.6,.2,.3,.2,.07,t),n(0,.48,.2,.2,.14,.06,t);break;case"sideburns":for(let a of[-1,1])n(a*.225,.88,.19,.04,.22,.07,t),n(a*.2,.82,.2,.05,.1,.05,t);break;default:}}function cy(n,e){let t=l=>e.marks.includes(l),r=(l,c,d,u=.03,h=.03)=>n(l,c,.229,u,h,.012,d),a=e.markC??na(e.skin,11878463,.55),o=na(e.skin,16777215,.38);if(t("freckles"))for(let l of[-1,1])for(let[c,d]of[[.08,.835],[.125,.84],[.105,.815],[.15,.82]])r(l*c,d,10119750,.02,.02);if(t("blush"))for(let l of[-1,1])n(l*.15,.812,.229,.07,.04,.012,14715514);if(t("scar"))for(let[l,c]of[[-.178,.812],[-.158,.784],[-.138,.756],[-.118,.728]])r(l+.024,c,o,.014,.03),r(l,c,a);if(t("browscar")){for(let[l,c]of[[-.13,1.03],[-.122,1],[-.114,.97]])r(l+.022,c,o,.012,.03),r(l,c,a,.026,.03);r(-.152,.985,a,.026,.014),r(-.1,.985,a,.026,.014)}if(t("mole")&&r(.075,.775,4861733,.022,.022),t("warpaint")){let l=e.markC??11546429;for(let c of[-1,1])for(let d of[0,.045])for(let u=0;u<3;u++)r(c*(.175-d-u*.022),.812-u*.03,l,.034,.03)}t("plaster")&&(n(0,.835,.229,.072,.03,.012,15787212),n(0,.835,.23,.032,.075,.012,15787212),n(0,.835,.232,.018,.018,.012,na(15787212,11901546,.5)))}function hy(n,e){let t=e.hair,i=e.hair2||t,s=e.hairStyle,r=e.headgear;if(s==="bald"||r==="hood")return;let a=[],o=[],l=[],c=(g,m,f,v,A,S,T,E=t)=>g.push([m,f,v,A,S,T,E]),d=()=>c(a,0,1.13,0,.5,.1,.46),u=()=>{c(o,0,1.06,.21,.48,.07,.06);for(let g of[-1,1])c(o,g*.2,1,.21,.08,.12,.06)},h=(g=.24,m=.98)=>{for(let f of[-1,1])c(l,f*.26,m,0,.05,g,.42)},p=-.255;switch(s){case"buzz":c(a,0,1.125,0,.48,.07,.43),c(o,0,1.07,.205,.46,.07,.04);for(let g of[-1,1])c(l,g*.245,.99,0,.02,.16,.38);p=-.2;break;case"short":d(),u(),h(),c(l,0,.93,-.22,.5,.38,.07),c(a,-.1,1.2,.02,.16,.08,.22),c(a,.12,1.21,-.06,.16,.1,.16),c(a,0,1.19,.13,.2,.05,.1);break;case"spiky":d(),u(),h(.2,1),c(l,0,.95,-.22,.5,.32,.07);for(let[g,m,f,v,A]of[[-.18,1.2,.06,.1,.14],[-.06,1.23,.08,.1,.2],[.06,1.23,0,.1,.2],[.18,1.2,-.04,.1,.14],[0,1.2,-.14,.12,.14]])c(a,g,m,f,v,A,.1);break;case"mohawk":c(a,0,1.22,0,.12,.22,.42),c(a,0,1.35,-.05,.12,.08,.26),c(a,0,1.12,0,.3,.04,.44),c(l,0,.98,-.2,.12,.3,.05);for(let g of[-1,1])c(l,g*.245,1.02,0,.02,.1,.36,sn(t,.6));p=-.225;break;case"sweep":d(),h(),c(l,0,.93,-.22,.5,.38,.07),c(a,-.05,1.19,0,.34,.07,.3),c(o,.12,1.1,.22,.2,.06,.05),c(o,0,1.06,.22,.2,.06,.05),c(o,-.12,1.02,.22,.2,.06,.05),c(o,-.2,.95,.22,.07,.12,.05);break;case"bob":d(),c(o,0,1.04,.215,.48,.1,.05);for(let g of[-1,1])c(l,g*.27,.84,0,.07,.34,.42);c(l,0,.85,-.22,.58,.4,.1),p=-.272;break;case"long":d(),u();for(let g of[-1,1])c(l,g*.27,.8,0,.07,.5,.38);c(l,0,.76,-.24,.54,.64,.1),c(a,0,1.2,-.02,.3,.08,.3),p=-.292;break;case"wavy":c(a,0,1.14,0,.54,.12,.5),c(a,0,1.22,-.02,.38,.06,.34),c(o,-.12,1.05,.215,.26,.08,.05),c(o,.14,1.07,.215,.2,.06,.05),c(o,.24,.97,.2,.05,.14,.05);for(let g of[-1,1])c(l,g*.29,.8,0,.08,.5,.4),c(l,g*.31,.56,.02,.07,.16,.34);c(l,0,.72,-.25,.62,.76,.12),p=-.312;break;case"ponytail":d(),u(),h(.2,1),c(l,0,.95,-.22,.5,.3,.07),c(a,0,1.17,-.17,.14,.1,.1,e.trim),c(a,0,1.22,-.26,.16,.16,.14),c(a,0,1.05,-.31,.16,.38,.12),c(a,0,.83,-.31,.12,.14,.1,i),p=-.32;break;case"bun":d(),u(),h(),c(l,0,.93,-.22,.5,.34,.07),c(a,0,1.24,-.02,.2,.12,.2),c(a,0,1.33,-.02,.14,.08,.14),c(a,0,1.19,-.02,.22,.03,.22,e.trim);break;case"twin":d(),u(),h(.2,1),c(l,0,.95,-.21,.5,.3,.06);for(let g of[-1,1])c(l,g*.3,.96,-.04,.1,.5,.14),c(l,g*.3,.66,-.04,.1,.1,.14,i),c(l,g*.28,1.1,-.04,.12,.05,.14,e.trim);break;case"braid":d(),u(),h(.2,1),c(l,0,.93,-.22,.5,.4,.07),c(l,.22,.88,.12,.1,.12,.1),c(l,.22,.76,.14,.09,.1,.1),c(l,.22,.64,.16,.1,.1,.1),c(l,.22,.55,.17,.09,.08,.09,i),c(l,.22,.5,.18,.1,.04,.1,e.trim);break;case"curly":c(a,0,1.2,0,.62,.28,.56);for(let g of[-1,1])c(l,g*.31,1.04,0,.1,.3,.5),c(o,g*.16,1.07,.23,.14,.08,.06);c(l,0,1,-.27,.6,.4,.12),p=-.332;break;default:d(),u(),h(),c(l,0,.93,-.22,.5,.38,.07)}if(e.hair2&&s!=="buzz"&&(o.push([-.14,.985,.223,.06,.2,.04,e.hair2]),l.push([.12,.93,p,.1,.3,.02,e.hair2])),e.gender==="female"&&!["buzz","mohawk"].includes(s))for(let g of[-1,1])c(o,g*.235,.86,.2,.055,.27,.06);let x=r==="helm"?["top","front"]:r==="wizhat"||r==="cap"?["top"]:[];for(let[g,m]of[["top",a],["front",o],["low",l]])if(!x.includes(g))for(let f of m)n(f[0],f[1],f[2],f[3],f[4],f[5],f[6])}var uy={fighter(n,e,t,i,s){let{trim:r}=e,a=(o,l)=>{for(let c of[-1,1])n(c*i,.7,0,o,.07,.2,r),n(c*i,.66,0,o,l,.18,e.cloth2)};if(s==="plate"){a(.17,.08);for(let o of[-1,1])n(o*.07,.62,.13,.03,.15,.012,r);n(0,.685,.13,.16,.03,.012,r),n(0,.71,-.02,t+.02,.03,.27,r)}if(s==="tabard"&&(n(0,.4,.135,.22,.4,.012,e.cloth),n(0,.53,.145,.03,.15,.012,r),n(0,.56,.145,.11,.03,.012,r),n(0,.21,.136,.22,.03,.012,r),n(0,.71,0,t+.02,.03,.27,r)),s==="leather"){n(0,.56,.13,t-.06,.25,.012,e.cloth),n(0,.56,.136,.02,.25,.012,sn(e.leather,.6));for(let o of[-1,1])n(o*i,.66,0,.15,.06,.19,e.cloth),n(o*.12,.56,.14,.05,.05,.012,r);n(0,.71,0,t+.02,.03,.27,r)}s==="knight"&&(a(.2,.12),n(0,.72,0,t-.02,.06,.29,zi),n(0,.6,.13,t-.04,.2,.012,zi),n(0,.6,.14,.03,.16,.012,r),n(0,.63,.14,.12,.03,.012,r),n(0,.385,.1,t+.02,.08,.29,zi),n(0,.35,.1,t+.02,.02,.29,r))},wizard(n,e,t,i,s){let{trim:r}=e;for(let a of[-1,1])n(a*i,.47,0,.14,.04,.19,r);if(s==="robe"){for(let a of[-1,1])n(a*.1,.57,.128,.045,.24,.012,r);n(0,.71,0,t+.02,.04,.27,r),n(0,.5,.128,.03,.1,.012,r)}if(s==="mantle"&&(n(0,.72,0,t+.13,.09,.31,e.cloth2),n(0,.665,0,t+.15,.025,.33,r),n(0,.78,-.1,.3,.12,.08,e.cloth2),n(0,.72,.16,.05,.05,.02,e.gem)),s==="sash"){let a=e.accent??e.cloth2;for(let o=0;o<5;o++)n(-.12+o*.06,.68-o*.055,.13,.09,.07,.012,a);n(0,.45,0,t+.04,.1,.27,a),n(.09,.34,.14,.06,.12,.02,a),n(-.02,.33,.14,.06,.1,.02,a)}s==="scholar"&&(n(0,.56,.13,t-.1,.25,.012,e.cloth2),n(0,.64,.14,.1,.1,.012,jn),n(0,.6,.145,.02,.2,.012,r),n(.19,.33,.12,.12,.12,.07,e.leather),n(.19,.385,.12,.13,.03,.075,r))},rogue(n,e,t,i,s){let{trim:r,leather:a}=e;if(s==="leathers"){for(let o=0;o<5;o++)n(-.12+o*.06,.67-o*.06,.13,.075,.06,.02,a);n(.18,.33,.12,.12,.12,.07,a),n(.18,.385,.12,.13,.03,.075,r)}if(s==="vest"){n(0,.56,.128,.06,.24,.012,jn);for(let o of[-1,1])n(o*.1,.56,.13,.1,.25,.012,a);for(let o=0;o<3;o++)n(0,.64-o*.07,.14,.09,.015,.012,r)}if(s==="tunic"&&(n(0,.36,0,t+.02,.2,.28,e.cloth),n(0,.255,0,t+.04,.025,.3,r),n(0,.43,0,t+.03,.05,.29,a),n(0,.43,.15,.08,.065,.03,r),n(.14,.3,.15,.09,.09,.02,e.cloth2)),s==="studded"){for(let o=0;o<2;o++)for(let l=0;l<3;l++)n(-.1+l*.1,.64-o*.1,.135,.035,.035,.02,zi);n(-.2,.71,0,.17,.07,.2,a),n(-.2,.74,0,.12,.03,.15,r),n(.18,.33,.12,.12,.12,.07,a)}},cleric(n,e,t,i,s){let{trim:r}=e;if(s==="vestments"){n(0,.5,.128,.15,.36,.012,bh),n(0,.66,.12,t-.02,.06,.26,jn);for(let a of[-1,1])n(a*.13,.55,.13,.08,.26,.012,jn),n(a*i,.43,0,.14,.04,.19,jn);n(0,.59,.142,.03,.13,.012,r),n(0,.615,.142,.095,.03,.012,r),n(0,.3,.16,.24,.24,.012,bh),n(0,.3,.17,.03,.1,.012,r)}if(s==="surplice"){for(let a of[-1,1])n(a*.09,.5,.13,.04,.38,.012,e.cloth2),n(a*i,.43,0,.14,.04,.19,e.cloth2);n(0,.66,.12,t-.02,.05,.26,e.cloth2),n(0,.59,.142,.03,.13,.012,r),n(0,.615,.142,.095,.03,.012,r),n(0,.17,0,t+.13,.03,.33,e.cloth2)}if(s==="mail"){for(let a=0;a<4;a++)for(let o=0;o<4;o++)(a+o)%2===0&&n(-.12+o*.08,.66-a*.06,.13,.05,.03,.012,zi);n(0,.69,0,t,.05,.27,sn(Cl,1.15)),n(0,.36,.135,.22,.34,.012,e.cloth),n(0,.45,.145,.03,.14,.012,r),n(0,.48,.145,.1,.03,.012,r);for(let a of[-1,1])n(a*i,.43,0,.14,.04,.19,r)}if(s==="monk"){n(0,.66,0,t-.02,.05,.26,e.cloth2),n(.06,.31,.145,.04,.18,.03,13154442),n(.06,.2,.145,.06,.04,.04,13154442);for(let a=0;a<4;a++)n(-.1+a*.028,.6-Math.abs(a-1.5)*.02,.14,.03,.03,.012,Sh);for(let a of[-1,1])n(a*i,.43,0,.14,.04,.19,e.cloth2)}}};function dy(n,e,t){let i=e.capeC,s=e.trim;if(e.cape==="short"&&(n(0,.72,0,t+.13,.09,.32,i),n(0,.56,-.17,t+.02,.42,.06,i)),e.cape==="long"){n(0,.72,0,t+.13,.09,.32,i),n(0,.42,-.18,t+.06,.66,.06,i),n(0,.095,-.18,t+.06,.03,.06,s);for(let r of[-1,1])n(r*(t/2+.05),.55,-.06,.05,.3,.2,i)}e.cape==="mantle"&&(n(0,.72,0,t+.17,.1,.34,i),n(0,.64,0,t+.19,.06,.32,i),n(0,.605,0,t+.2,.02,.33,s),n(0,.71,.17,.05,.05,.02,s),n(0,.62,-.18,t+.04,.25,.05,i))}function fy(n,e){let t=e.headgear,i=e.trim,s=e.hat;if(t==="hood"){let r=s??(e.classId==="cleric"?jn:e.cloth),a=e.classId==="cleric"&&!s?e.cloth:e.trim;n(0,1.14,0,.56,.1,.5,r),n(0,1.185,0,.56,.03,.5,a),n(0,.92,-.24,.56,.56,.1,r),n(0,.98,-.295,.3,.4,.02,a);for(let o of[-1,1])n(o*.29,.9,-.02,.07,.5,.42,r),n(o*.3,1,0,.02,.06,.42,a);if(n(0,1.05,.21,.46,.06,.05,r),e.hairStyle!=="bald"){n(0,1,.205,.46,.07,.06,e.hair);for(let o of[-1,1])n(o*.2,.93,.205,.08,.14,.06,e.hair);e.hair2&&n(-.14,.96,.223,.06,.14,.04,e.hair2)}}if(t==="wizhat"){let r=s??e.cloth;n(0,1.12,0,.74,.05,.7,r),n(0,1.2,0,.46,.12,.44,r),n(0,1.31,-.02,.34,.1,.32,r),n(0,1.41,-.05,.22,.1,.2,r),n(.02,1.5,-.09,.12,.1,.12,r),n(0,1.15,0,.5,.04,.48,i)}if(t==="helm"){let r=s??zi;n(0,1.13,0,.54,.14,.5,r);for(let a of[-1,1])n(a*.265,.99,0,.04,.3,.44,r);n(0,.96,.235,.05,.2,.02,r),n(0,.95,-.235,.5,.3,.05,r),n(0,1.065,0,.545,.025,.505,i),n(0,1.24,0,.06,.1,.3,i)}if(t==="circlet"&&(n(0,1.085,0,.5,.03,.52,s??i),n(0,1.105,.262,.05,.07,.02,e.gem,!0),n(0,1.085,.262,.09,.02,.02,s??i)),t==="headband"){let r=s??e.accent??e.cloth2;n(0,1.05,0,.5,.05,.52,r),n(.26,1.05,-.04,.06,.1,.12,r),n(.285,.97,-.1,.04,.14,.06,r),n(.285,.91,-.12,.04,.08,.05,r)}if(t==="cap"){let r=s??e.cloth2;n(0,1.15,0,.52,.12,.48,r),n(0,1.09,.25,.5,.035,.12,sn(r,.8)),n(.2,1.23,-.05,.04,.18,.06,i),n(.22,1.33,-.07,.04,.1,.05,sn(i,.85))}if(t==="crown"){n(0,1.15,0,.5,.07,.46,s??i);for(let[r,a]of[[-.2,.06],[-.1,.09],[0,.06],[.1,.09],[.2,.06]])n(r,1.185+a/2,0,.07,a,.08,s??i);n(0,1.15,.232,.05,.05,.02,e.gem,!0)}}function py(n,e,t,i){let s=a=>e.accessories.includes(a),r=e.trim;if(s("earring")&&n(.245,.81,.03,.03,.07,.035,r),s("glasses")){for(let a of[-1,1]){let o=a*.1;n(o,.96,.238,.15,.02,.014,r),n(o,.82,.238,.15,.02,.014,r),n(o-.07,.89,.238,.02,.14,.014,r),n(o+.07,.89,.238,.02,.14,.014,r),n(a*.245,.9,.03,.02,.02,.34,r)}n(0,.9,.238,.05,.02,.014,r)}if(s("scarf")){let a=e.accent??e.cloth2;n(0,.7,0,t+.04,.07,.3,a),n(.1,.58,.15,.1,.22,.03,a),n(.1,.46,.15,.1,.03,.03,r)}if(s("amulet")&&(n(0,.64,.135,.16,.02,.012,r),n(0,.5,.145,.05,.06,.02,e.gem,!0),n(0,.56,.14,.02,.12,.012,r)),s("bracers"))for(let a of[-1,1])n(a*i,.47,0,.145,.08,.195,e.leather),n(a*i,.515,0,.15,.02,.2,r)}function my(n,e,t,i){let{classId:s,hands:r}=e,a=o=>r.includes(o);if(a("sword")&&(n(-.34,.38,.09,.055,.1,.055,e.leather),n(-.34,.45,.09,.17,.035,.075,i),n(-.34,.72,.09,.05,.5,.04,zi)),a("shield")){let o=s==="fighter"?e.cloth:e.p.cloth;n(.33,.5,.17,.27,.38,.05,i),n(.33,.5,.2,.21,.32,.03,o),n(.33,.5,.222,.03,.18,.02,i),n(.33,.53,.222,.13,.03,.02,i)}if(a("bow")){for(let o=0;o<5;o++)n(-.34-Math.abs(o-2)*-.02,.36+o*.12,.1,.06,.16,.05,10648640);n(-.4,.6,.1,.02,.6,.02,12957841)}a("staff")&&s==="wizard"&&(n(-.36,.62,.08,.05,.9,.05,Sh),n(-.36,1.1,.08,.13,.06,.13,i),n(-.36,1.2,.08,.09,.13,.09,e.gem,!0)),a("staff")&&s!=="wizard"&&(n(-.34,.58,.09,.05,.82,.05,Sh),n(-.34,1.04,.09,.15,.15,.15,mf),n(-.34,1.04,.09,.19,.04,.19,i),n(-.34,1.04,.09,.04,.19,.19,i)),e.book&&n(-.3,.45,.13,.13,.16,.045,8007471)}function gy(){let s=[],r=(a,o,l,c,d,u,h)=>s.push([a,o,l,c,d,u,h,!1]);r(0,.46,-.07,.43,.34,.63,6841435),r(0,.56,.16,.37,.33,.28,6841435);for(let a of[-.15,.15])for(let o of[-.26,.17])r(a,.255,o,.13,.27,.14,6841435),r(a,.13,o+.03,.16,.09,.19,4539711);r(0,.71,.32,.4,.36,.37,6841435),r(0,.6,.5,.24,.13,.2,11511440),r(0,.64,.61,.09,.06,.04,1645337);for(let a of[-.13,.13])r(a,.94,.28,.105,.16,.125,6841435),r(a,.947,.348,.047,.082,.014,11511440),r(a,.744,.514,.036,.044,.018,1645337);return r(0,.55,-.49,.13,.13,.31,4539711),s}function gf(n={},{texel:e=!0}={}){if(!n)return null;if(n.visual==="bandit"){let i=n.gen||{classId:"rogue",gender:"male",look:{},hands:["sword","empty"]},s=ia(5,{gen:i});return{visual:"bandit",spec:s,boxes:Rl(s,{texel:e})}}let t;if(n.visual==="beast")t=gy();else if(n.visual==="training")t=bl({},4).parts.map(i=>[i.x,i.y,i.z,i.w,i.h,i.d,parseInt(i.color.slice(1),16),!1]);else return null;return{visual:n.visual,boxes:e?[...t,...as(t,()=>n.visual==="beast"?"hair":"other")]:t}}function xf(n,e,t){let i=null,s=()=>{i=null};return n.addEventListener("pointerdown",s,!0),e.addEventListener("pointerdown",r=>{let a=r.target.closest("button[data-action]");i=a?{button:a,context:t()}:null,r.stopPropagation()}),e.addEventListener("pointercancel",s),{clear:s,accept(r,a){let o=r.detail===0||!!i&&i.button===a&&i.context===t();return s(),o}}}var xy=Xd(),Th=new Set,Mt=document.getElementById("viewport"),Vn=document.createElement("canvas");Vn.id="voxel-canvas";Vn.setAttribute("aria-label","\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430: \u0434\u0432\u0438\u0433\u0430\u0439\u0442\u0435 \u043E\u0434\u043D\u0438\u043C \u043F\u0430\u043B\u044C\u0446\u0435\u043C, \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0439\u0442\u0435 \u0434\u0432\u0443\u043C\u044F");Mt.prepend(Vn);var bt=document.createElement("div");bt.setAttribute("role","group");bt.tabIndex=-1;var ar=xf(document,bt,()=>{let n=window.objectPrompt?.p;return JSON.stringify([_e.state.world?.id,_e.state.scene,n?.id||[n?.x,n?.y],bt.dataset.signature])});bt.onclick=n=>{n.stopPropagation();let e=window.objectPrompt,t=n.target.closest("button[data-action]");if(!ar.accept(n,t))return;let i=t&&e?.actions?.find(s=>s.id===t.dataset.action);i?.enabled&&(_e.dismissMapActions(),i.run?.())};bt.addEventListener("keydown",n=>{n.key==="Escape"&&_e.mapTap(null)});bt.className="object-prompt";bt.hidden=!0;Mt.append(bt);var et;try{et=new Qr({canvas:Vn,antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(n){throw Vn.remove(),Mt.insertAdjacentHTML("afterbegin",'<p class="webgl-note">\u041E\u0431\u044A\u0451\u043C\u043D\u0430\u044F \u0441\u0446\u0435\u043D\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u041E\u0442\u043A\u0440\u044B\u0442 \u043F\u043B\u043E\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C.</p>'),n}et.setPixelRatio(Math.min(window.devicePixelRatio||1,1));et.shadowMap.enabled=!0;et.shadowMap.type=ts;et.outputColorSpace=St;et.toneMapping=Ks;et.toneMappingExposure=1.25;var kn=new In;kn.background=new Le("#0b1919");var Ot=new un(-4,4,6,-6,.1,80),hs=new qe,or=new qe,lr=new qe;kn.add(hs,or,lr);var Ol=new In,_f=new Ln({color:16777215,toneMapped:!1,side:Mn}),rr=new Xt(390,520,{depthBuffer:!0}),os=[];Ol.background=new Le(0);var bn=null,Eh="",pi=null,Il,yf,vf,Tf=new In,_y=new un(-1,1,1,-1,0,2),Wl=new $t({transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{mask:{value:rr.texture},texel:{value:new Ue(1/390,1/520)},gold:{value:new Le(16764534)}},vertexShader:"varying vec2 uvMask;void main(){uvMask=uv;gl_Position=vec4(position.xy,0.0,1.0);}",fragmentShader:"uniform sampler2D mask;uniform vec2 texel;uniform vec3 gold;varying vec2 uvMask;void main(){float center=texture2D(mask,uvMask).r;float edge=0.0;for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){edge=max(edge,texture2D(mask,uvMask+vec2(float(x),float(y))*texel).r);}}float alpha=step(0.4,edge)*(1.0-step(0.4,center));gl_FragColor=vec4(gold,alpha*0.95);}"});Tf.add(new je(new vn(2,2),Wl));function cr(n){let e=n?.userData.hinge||n||null;if(e!==bn){for(let t of os)Ol.remove(t),t.isInstancedMesh&&t.dispose();os.length=0,bn=e,Eh="",e&&(e.updateWorldMatrix(!0,!0),e.traverse(t=>{if(!t.isMesh||t.userData.contactShadow)return;for(let s=t;s&&s!==e.parent;s=s.parent)if(!s.visible)return;let i;if(t.isInstancedMesh){i=new cn(t.geometry,_f,t.count);for(let s=0;s<t.count;s++){let r=new We;t.getMatrixAt(s,r),i.setMatrixAt(s,r)}}else i=new je(t.geometry,_f);i.matrixAutoUpdate=!1,i.userData.source=t,Ol.add(i),os.push(i)}))}}var Ef=new hi(12507101,3159078,.38);kn.add(Ef);var Lh=new di(11912909,.5);Lh.position.set(3,10,5);kn.add(Lh);var Bl=document.createElement("canvas");Bl.width=Bl.height=64;var Dh=Bl.getContext("2d"),Xl=Dh.createRadialGradient(32,32,5,32,32,31);Xl.addColorStop(0,"rgba(12,18,20,.24)");Xl.addColorStop(.55,"rgba(12,18,20,.12)");Xl.addColorStop(1,"rgba(12,18,20,0)");Dh.fillStyle=Xl;Dh.fillRect(0,0,64,64);var yy=new Dn(Bl),vy=new Ln({map:yy,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});function Ah(n,e=.78,t=.65){let i=new je(new vn(e,t),vy);i.rotation.x=-Math.PI/2,i.position.y=.012,i.userData.contactShadow=!0,n.add(i)}var Vi=new yn(1,1,1),Dl=new Map,ut=new Map,_i=new Map,yi=[],gi=[],kl=new Map;et.shadowMap.autoUpdate=!1;var _e,Af="";var Ct=5.2,Qn={x:5.5,z:9.5},hr=!1,Pl=0;var mi;var Hi=(n,e=!1)=>{let t=n+":"+e;return Dl.has(t)||Dl.set(t,e?new Ln({color:n,toneMapped:!1}):new Kt({color:n,roughness:.92,metalness:n===12820556?.35:0})),Dl.get(t)};function ls(n,e,t,i,s,r,a,o,l=!1){let c=new je(Vi,Hi(o,l));return c.position.set(e,t,i),c.scale.set(s,r,a),c.castShadow=!l,c.receiveShadow=!l,n.add(c),c}function kt(n){for(let i of n.children.filter(s=>s.isGroup))kt(i);let e=n.children.filter(i=>i.isMesh&&!i.isInstancedMesh&&i.userData.decal);if(e.length){let i=new Kt({color:16777215,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),s=new cn(Vi,i,e.length);s.frustumCulled=!1,s.userData.disposeMaterial=!0,e.forEach((r,a)=>{r.updateMatrix(),s.setMatrixAt(a,r.matrix),s.setColorAt(a,r.material.color),n.remove(r)}),s.userData.decal=!0,s.castShadow=!1,s.receiveShadow=!0,s.instanceMatrix.needsUpdate=!0,s.instanceColor.needsUpdate=!0,n.add(s)}let t=new Map;for(let i of n.children.filter(s=>s.isMesh&&!s.isInstancedMesh&&!s.userData.decal&&s.geometry===Vi)){let s=i.material.uuid+":"+i.castShadow+":"+i.receiveShadow;t.has(s)||t.set(s,[]),t.get(s).push(i)}for(let i of t.values()){if(i.length<2)continue;let s=new cn(Vi,i[0].material,i.length);i.forEach((r,a)=>{r.updateMatrix(),s.setMatrixAt(a,r.matrix),n.remove(r)}),s.castShadow=i[0].castShadow,s.receiveShadow=i[0].receiveShadow,n.add(s)}return n}var Nl=n=>new Le(n).getHex();function Cf(n){let e=n>>16&255,t=n>>8&255,i=n&255;return[12820556,3752007,4278346,12109511,11782341,10203059,11581626,5524279].includes(n)?"metal":[7878449,7880250,8010038,8735040,5666672,8797013,11620717,6895950].includes(n)?"cloth":Math.abs(e-t)<18&&Math.abs(t-i)<18?"metal":"other"}function aa(n,e){let t=ls(n,...e.slice(0,8));return t.userData.decal=!0,t.castShadow=!1,t.userData.decalFace=e[8],t}function F(n,e,t,i,s,r,a,o,l=!1){let c=ls(n,e,t,i,s,r,a,o,l),d=[e,t,i,s,r,a,Nl(o),l];for(let u of as([d],Cf,Bi.size,{minDepth:.008}))aa(n,u);return c}var Ul=new Map,Fl=new Map;function cs(n,e=8){if(!Ul.has(e)){let i=document.createElement("canvas");i.width=i.height=e;let s=i.getContext("2d");for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a===0||o===0?255:a===e-1||o===e-1?218:(o*31+a*17)%11===0?232:248;s.fillStyle=`rgb(${l},${l},${l})`,s.fillRect(o,a,1,1)}let r=new Dn(i);r.colorSpace=St,r.magFilter=r.minFilter=yt,r.generateMipmaps=!1,Ul.set(e,r)}let t=n+":"+e;return Fl.has(t)||Fl.set(t,new Kt({color:n,map:Ul.get(e),roughness:1})),Fl.get(t)}function ql(n){return n.traverse(e=>{e.isMesh&&(e.castShadow=!1,e.receiveShadow=!1)}),n}function My(n){let e=new je(new Nn(.38,.4,.1,24),Hi(3749436));e.position.y=.08,e.castShadow=!0,e.receiveShadow=!0,n.add(e);let t=new je(new Nn(.395,.4,.035,24),Hi(5262419));t.position.y=.035,n.add(t)}function Sy(n,e){if(["chest","crate"].includes(e.type)){let s=e.type==="chest"?.263:.305;for(let r of[-.15,0,.15])F(n,r,.27,s,.012,.29,.007,6899502);if(e.type==="chest"){F(n,0,.33,.278,.03,.04,.015,3752007);for(let r of[-.24,.24])for(let a of[.14,.43])F(n,r,a,.263,.018,.018,.02,12820556);for(let r of[-.12,.04,.16])F(n,0,.553,r,.52,.009,.012,6899502)}}if(e.type==="barrel"){for(let s=0;s<12;s++){let r=s*Math.PI/6,a=ls(n,Math.sin(r)*.259,.285,Math.cos(r)*.259,.011,.5,.012,6899502);a.rotation.y=r}for(let s of[-.12,0,.12])F(n,s,.571,0,.009,.008,.33,6899502)}if(e.type==="books")for(let s=0;s<3;s++)for(let r=0;r<5;r++){let a=-.25+r*.12,o=.4+s*.38;for(let l of[-.075,.075])F(n,a,o+l,.233,.065,.016,.012,12820556);(r===1||r===4)&&F(n,a,o,.239,.038,.035,.009,13482893)}if(e.type==="desk"){for(let s of[-.21,-.06,.1,.23])F(n,0,.666,s,.76,.007,.01,6899502);F(n,.1,.71,.07,.011,.014,.23,8088650);for(let s=0;s<3;s++)for(let r of[-.02,.18])F(n,r,.709,-.004+s*.053,.06,.009,.008,8088650);F(n,.3,.713,-.2,.055,.1,.055,3752007),F(n,.27,.76,-.2,.015,.16,.015,13482893)}if(e.type==="door"||e.type==="portal"){let s=n.userData.hinge;for(let r of[.1,.21,.33,.44])F(s,r,.51,.056,.01,.89,.011,6899502);F(s,.28,.74,.06,.54,.055,.024,3752007);for(let r of[.08,.49])for(let a of[.38,.74])F(s,r,a,.084,.025,.025,.02,12820556)}if(e.type==="cover"){for(let s of[-.21,.21])F(n,s,.483,0,.018,.008,.29,5859403);F(n,0,.483,-.14,.42,.008,.015,5859403)}if(e.type==="chair"){for(let s of[-.14,.14])F(n,s,.81,-.144,.014,.14,.012,6899502);F(n,0,.49,0,.3,.012,.013,9125164)}if(e.type==="banner"){for(let s of[-.23,.23])F(n,s,.58,.043,.015,.54,.01,12820556);F(n,0,.29,.043,.48,.015,.01,12820556)}}function ca(n,e,t={}){let i=new qe;t.base!==!1&&My(i);let s=n===3?gf(e,{texel:t.texel??window.Characters?.RULES.texel??!0}):null,r=s?.spec||(n!==3&&n!==4?ia(n,e):null);if(s&&!r){i.userData.enemyVisual=s.visual;for(let a of s.boxes)a.length>8?aa(i,a):ls(i,...a)}else if(r){i.userData.characterStyle=r;let a;if(t.articulated){a={};for(let[o,l]of Object.entries({head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]})){let c=new qe;c.position.set(...l),i.add(c),a[o]=c}i.userData.rig=a}for(let o of s?.boxes||Rl(r,{texel:t.texel??window.Characters?.RULES.texel})){let l=[...o],c=i;if(a){let[d,u]=l,h=Math.abs(d)>.29||Math.abs(d)>.19&&u<.74?d<0?"armL":"armR":u>=.74?"head":u<.4?d<0?"legL":"legR":"torso";c=a[h],l[0]-=c.position.x,l[1]-=c.position.y,l[2]-=c.position.z}l.length>8?aa(c,l):ls(c,...l)}}else{let{profile:a,parts:o}=bl(e||{},n);i.userData.characterStyle=a;let l=[];for(let h of o){let p=ls(i,h.x,h.y,h.z,h.w,h.h,h.d,h.color);p.rotation.z=h.rz,h.rz||l.push([h.x,h.y,h.z,h.w,h.h,h.d,Nl(h.color),!1])}let c=Nl(a.skin),d=Nl(a.cloth),u=h=>n===3&&h===c?"skin":n===4&&h===d?"other":Cf(h);for(let h of as(l,u))aa(i,h)}return kt(i)}function Yl(){let n=new qe;F(n,0,.23,0,.05,.43,.05,5585186),F(n,0,.44,0,.09,.08,.09,5391923);let e=[];for(let t=0;t<3;t++){let i=F(n,0,.51+t*.085,0,.095-t*.025,.12,.085-t*.025,[15038244,16758855,16768133][t],!0);i.userData.rest=i.position.clone(),e.push(i)}return n.userData.flames=e,ql(n)}function Rf(){let n=new qe,e=[],t=new je(new qs(.38,.028,6,24),Hi(5524279));t.rotation.x=Math.PI/2,t.position.y=1.58,n.add(t);for(let i=0;i<6;i++){let s=i*Math.PI/3,r=Math.cos(s)*.38,a=Math.sin(s)*.38;F(n,r,1.68,a,.055,.19,.055,14534033);let o=F(n,r,1.83,a,.045,.1,.045,16764792,!0);o.userData.rest=o.position.clone(),e.push(o)}return n.userData.flames=e,ql(n),n.traverse(i=>{i.isMesh&&(i.userData.disposeMaterial=!0,i.material=new Ln({color:i.material.color.clone(),transparent:!0,depthWrite:!1,toneMapped:!1}))}),n}function If(n,e=!1){n.castShadow=e,n.shadow.autoUpdate=!1,n.shadow.needsUpdate=e,n.shadow.mapSize.set(128,128),n.shadow.radius=1.8,n.shadow.bias=-.001,n.shadow.normalBias=.035,n.shadow.camera.near=.06,n.shadow.camera.far=12}function by(n){let e=new qe,t=7886126,i=12820556,s=13352345,r=10203059;if(n===40)F(e,0,.55,0,.58,.69,.15,6895950),F(e,.02,.55,.09,.49,.58,.035,s),F(e,-.26,.55,.11,.07,.69,.04,8408420),F(e,.14,.51,.13,.11,.13,.025,i);else if(n===41){let a=new je(new Xs(.24),Hi(6530741));a.position.y=.75,e.add(a),F(e,0,.4,0,.13,.22,.13,i),F(e,0,.28,0,.34,.08,.29,t)}else if(n===42){F(e,0,.55,0,.57,.58,.25,7953470),F(e,0,.87,0,.48,.09,.28,9795409),F(e,0,.46,.15,.35,.23,.07,10453079);for(let a of[-.18,.18])F(e,a,.64,.15,.045,.5,.035,5192232),F(e,a,.67,.18,.07,.08,.025,i);F(e,0,.96,0,.23,.055,.08,t)}else if(n===43){F(e,-.15,.43,0,.28,.27,.25,3229524),F(e,-.15,.62,0,.16,.1,.15,r),F(e,.18,.58,0,.035,.61,.035,t);for(let a=0;a<5;a++)F(e,.18+a*.022,.75+a*.045,0,.08,.08,.035,s)}else if(n===44)F(e,0,.4,0,.57,.2,.36,s),F(e,.02,.59,0,.41,.16,.29,10056013),F(e,-.15,.74,.06,.2,.1,.12,12752737),F(e,.19,.72,0,.1,.15,.12,7685938),F(e,0,.41,.19,.06,.23,.025,t);else if(n===45)F(e,0,.62,0,.59,.58,.1,r),F(e,0,.38,0,.39,.18,.1,r),F(e,0,.6,.065,.48,.48,.03,4745336),F(e,0,.6,.095,.06,.5,.025,i),F(e,0,.6,.095,.42,.06,.025,i);else if(n===46){F(e,0,.63,0,.48,.53,.14,r);for(let a of[-.32,.32])F(e,a,.81,0,.19,.17,.18,r);F(e,0,.34,0,.53,.1,.18,t);for(let a=0;a<5;a++)for(let o=0;o<4;o++)F(e,-.18+o*.12,.43+a*.09,.085,.04,.026,.012,12634562)}else if(n===47){for(let a=0;a<4;a++){let o=new je(new qs(.23,.035,4,16),cs(12558699));o.position.set(0,.58,(a-1.5)*.055),e.add(o)}F(e,.22,.32,0,.04,.25,.04,12558699)}else if(n===48){F(e,0,.38,0,.54,.23,.17,t);for(let a=0;a<4;a++)F(e,-.18+a*.12,.62,.02,.025,.39,.025,r),F(e,-.15+a*.12,.81,.02,.08,.025,.025,r)}else if(n===49){F(e,0,.57,0,.59,.29,.25,6518117),F(e,0,.55,.15,.58,.2,.04,8557956);for(let a of[-.18,.18])F(e,a,.57,0,.035,.32,.29,t)}else if(n===50)F(e,0,.47,0,.56,.24,.25,t),F(e,-.12,.64,0,.24,.08,.16,r),F(e,.15,.63,0,.16,.13,.17,6252658),F(e,0,.34,.15,.38,.05,.035,i);else if(n===51)F(e,0,.48,0,.065,.7,.065,t),F(e,0,.88,0,.3,.24,.25,r),F(e,0,1.03,0,.09,.06,.09,i);else if(n===52)F(e,0,.6,0,.09,.64,.07,i),F(e,0,.73,0,.41,.085,.07,i),F(e,0,.29,0,.27,.08,.15,t);else if(n===53){F(e,0,.56,0,.49,.31,.22,s);for(let a=0;a<4;a++)F(e,0,.44+a*.07,.13,.45,.018,.02,15787468);F(e,0,.55,.15,.13,.13,.035,11363932)}else F(e,0,.57,0,.14,.53,.12,14736841);return kt(e)}function Pf(n){if(n>=40)return by(n);let e=new qe,t=12820556,i=7886126;if(n===37)return Yl();if(n===31){for(let s=0;s<9;s++){let r=.2+s*.085,a=.15*Math.sin(s/8*Math.PI);F(e,a,r,0,.045,.11,.05,i)}F(e,0,.55,0,.015,.7,.02,14141844)}else if(n===32)F(e,0,.72,0,.07,.65,.045,12109511),F(e,0,.39,0,.3,.055,.07,t),F(e,0,.25,0,.07,.23,.07,i);else if(n===33){F(e,0,.58,0,.055,.91,.055,i);let s=new je(new Xs(.15),Hi(6539481,!0));s.position.y=1.12,e.add(s)}else if(n===34)F(e,0,.46,0,.32,.37,.3,8797013),F(e,0,.47,.17,.22,.23,.025,11620717),F(e,0,.74,0,.15,.2,.14,11782341),F(e,0,.86,0,.18,.07,.17,i);else if(n===35)for(let s=0;s<6;s++){let r=new je(new Nn(.21,.21,.05,12),cs(t));r.position.set(s%2*.12-.06,.3+s*.055,s%3*.05),e.add(r)}else if(n===36){F(e,0,.47,0,.52,.66,.025,14140829);for(let s=0;s<5;s++)F(e,0,.64-s*.07,.022,.36-s%2*.08,.012,.008,8088650);F(e,.12,.28,.025,.1,.1,.025,9192504)}else F(e,0,.52,0,.075,.66,.075,t),F(e,0,.2,0,.18,.12,.18,t);return kt(e)}function ha(n){let e=new qe,t=6899502,i=12820556,s=8094328;if(n.model&&window.Props){let r=window.Props.build(n);if(r){for(let a of r)a.length>8?aa(e,a):ls(e,...a);return kt(e)}}if(n.portalKind){F(e,0,.035,0,.86,.07,.88,2304293);for(let r=0;r<4;r++){let a=n.portalKind==="stairs-up"?.16+r*.16:.08+r*.035;F(e,0,a/2+.07,.3-r*.2,.63,a,.18,t)}for(let r of[-.4,.4])F(e,r,.16,0,.08,.24,.96,9992270);return kt(e)}switch(n.type){case"tree":{F(e,0,.58,0,.22,1.16,.22,7360567);let r=[4750141,6521672,3765067][n.variant||0];return F(e,0,1.3,0,.9,.55,.88,r),F(e,-.12,1.7,.02,.68,.38,.65,r),F(e,.16,1.95,-.04,.42,.22,.42,r),kt(e)}case"shelf":for(let r of[-.38,.38])F(e,r,.58,-.26,.08,1.16,.12,t);for(let r of[.16,.56,.96]){F(e,0,r,0,.84,.07,.48,t);for(let a=0;a<3;a++)F(e,-.26+a*.26,r+.14,0,.15,.21,.22,[11901029,7901276,10841672][a])}return kt(e);case"stove":return F(e,0,.32,0,.86,.64,.76,7959144),F(e,0,.35,.39,.5,.35,.02,2696738),F(e,0,.25,.405,.34,.09,.02,14647605,!0),F(e,0,.68,0,.94,.08,.84,4803912),F(e,0,.83,0,.35,.23,.35,3751484),F(e,0,1.14,-.29,.3,.8,.24,7828070),kt(e);case"cart":F(e,0,.39,0,.63,.12,.8,t);for(let r of[-.3,.3])F(e,r,.6,0,.07,.36,.8,t);F(e,0,.57,-.37,.63,.32,.06,t);for(let r of[-.38,.38])for(let a of[-.25,.25])F(e,r,.24,a,.1,.3,.3,4278080);return F(e,-.12,.6,0,.25,.3,.34,11311473),F(e,.15,.58,.18,.22,.27,.26,9863254),kt(e);case"counter":F(e,0,.35,0,.96,.7,.66,t),F(e,0,.75,0,.99,.1,.8,9859915),F(e,0,.36,.34,.72,.48,.03,8608823),F(e,.23,.86,.1,.12,.13,.12,13482893);break;case"table":for(let r of[-.31,.31])for(let a of[-.26,.26])F(e,r,.28,a,.08,.56,.08,t);F(e,0,.61,0,.85,.12,.78,9859915),F(e,-.16,.71,.04,.24,.08,.17,12491365),F(e,.2,.76,-.16,.12,.18,.12,13482893);break;case"lantern":F(e,0,.06,0,.5,.12,.5,s),F(e,0,.65,0,.12,1.22,.12,t),F(e,0,1.4,0,.3,.36,.3,4278346),F(e,0,1.4,.16,.19,.24,.02,16763254,!0),F(e,0,1.62,0,.4,.08,.4,t),ql(e);break;case"waymark":F(e,0,.025,0,.74,.04,.74,9992270),F(e,0,.051,0,.52,.015,.06,i),F(e,0,.051,0,.06,.015,.52,i);break}if(["counter","table","lantern","waymark"].includes(n.type))return kt(e);switch(n.type){case"clue":for(let o=0;o<4;o++){let l=F(e,(o%2-.5)*.18,.014,(o-1.5)*.13,.075,.014,.11,8549474);l.castShadow=!1}return kt(e);case"torch":return Yl();case"chandelier":return Rf();case"barrel":{let o=new je(new Nn(.24,.26,.55,12),cs(7754290));o.position.y=.29,o.castShadow=!0,o.receiveShadow=!0,e.add(o);for(let l of[.13,.44]){let c=new je(new Nn(.255,.255,.045,12),Hi(4278346));c.position.y=l,e.add(c)}F(e,0,.58,0,.04,.012,.42,5782566);break}case"crate":F(e,0,.28,0,.61,.55,.55,7886135);for(let o of[-.24,.24])F(e,o,.28,.287,.055,.57,.025,10517322),F(e,o,.57,0,.055,.028,.56,10517322);for(let o of[.06,.5])F(e,0,o,.29,.6,.045,.025,10254407);break;case"chair":for(let o of[-.2,.2])for(let l of[-.17,.17])F(e,o,.2,l,.065,.4,.065,t);F(e,0,.41,0,.5,.08,.44,8411961),F(e,0,.465,0,.4,.04,.35,7880250);for(let o of[-.21,.21])F(e,o,.64,-.18,.065,.55,.065,t);F(e,0,.81,-.18,.47,.22,.055,8411961);break;case"planter":{let o=new je(new Nn(.22,.14,.3,12),cs(8540984));o.position.y=.17,o.castShadow=!0,o.receiveShadow=!0,e.add(o);for(let l=0;l<5;l++){let c=(l%3-1)*.09,d=(l%2-.5)*.15,u=.48+l%3*.07;F(e,c,.4,d,.025,.35,.025,5401661),F(e,c+.055,u,d,.13,.045,.055,6587210),n.id==="lilies"&&(F(e,c,u+.11,d,.12,.035,.055,14998957),F(e,c,u+.11,d,.055,.035,.12,15656635),F(e,c,u+.13,d,.035,.035,.035,i))}break}case"scrolls":F(e,0,.3,0,.61,.09,.45,8411702);for(let o of[-.24,.24])F(e,o,.15,0,.06,.29,.34,t);for(let o=0;o<3;o++){let l=new je(new Nn(.07,.07,.4,10),cs(13746588));l.rotation.z=Math.PI/2,l.position.set(0,.43+o*.07,(o-1)*.1),l.castShadow=!0,e.add(l)}break;case"rack":for(let o of[-.3,.3])F(e,o,.47,0,.08,.9,.12,t);F(e,0,.69,0,.69,.085,.12,9135937);for(let o of[-.18,.04])F(e,o,.52,.13,.055,.6,.045,11581626),F(e,o,.8,.13,.19,.045,.075,i),F(e,o,.88,.13,.045,.12,.05,t);F(e,.27,.4,.1,.22,.32,.07,3957378),F(e,.27,.4,.145,.025,.23,.018,i);break;case"banner":F(e,0,.9,0,.65,.055,.08,t),F(e,0,.58,.02,.52,.61,.035,8010038),F(e,0,.58,.043,.04,.33,.02,i),F(e,0,.64,.046,.21,.04,.022,i);break;case"ground-item":F(e,0,.12,0,.34,.22,.29,8807746),F(e,0,.24,0,.26,.04,.22,11703654),F(e,0,.25,0,.05,.02,.2,5587501);break;case"npc":return ca(5,{npcId:n.id,gen:n.npc});case"chest":F(e,0,.25,0,.64,.4,.45,t),F(e,0,.49,0,.62,.12,.43,8411193);for(let o of[-.24,.24])F(e,o,.3,.237,.05,.46,.035,i);F(e,0,.32,.25,.12,.13,.04,i);break;case"cover":F(e,0,.15,0,.7,.26,.65,4742496),F(e,0,.36,0,.64,.17,.57,s),F(e,0,.46,0,.47,.035,.4,9278855);break;case"altar":F(e,-.3,.3,0,.12,.5,.4,t),F(e,.3,.3,0,.12,.5,.4,t),F(e,0,.59,0,.86,.12,.58,11973019),F(e,0,.36,.3,.35,.43,.022,7878449);for(let o of[-.22,0,.22]){let l=F(e,o,.75,0,.05,.22,.05,14531961);l.castShadow=!1,l.receiveShadow=!1,F(e,o,.9,0,.05,.1,.05,16758594,!0)}break;case"books":F(e,0,.65,0,.65,1.25,.28,t);for(let o=0;o<3;o++){F(e,0,.25+o*.38,.2,.72,.065,.46,8674872);for(let l=0;l<5;l++)F(e,-.25+l*.12,.4+o*.38,.13,.08,.22+l%2*.05,.19,[8735040,5666672,11772783][l%3])}break;case"desk":for(let o of[-.32,.32])for(let l of[-.22,.22])F(e,o,.32,l,.075,.56,.075,t);F(e,0,.61,0,.86,.1,.64,8805950),F(e,.1,.68,.07,.35,.04,.28,13482893);let r=F(e,-.28,.76,-.14,.04,.24,.04,14927999);r.castShadow=!1,r.receiveShadow=!1;break;case"door":case"portal":F(e,-.37,.56,0,.15,1.12,.3,s),F(e,.37,.56,0,.15,1.12,.3,s),F(e,0,1.09,0,.72,.15,.31,s);let a=new qe;a.position.x=-.28,F(a,.28,.52,0,.56,1.02,.1,t),F(a,.28,.38,.06,.54,.06,.024,3752007),F(a,.45,.57,.075,.06,.07,.035,i),e.add(a),e.userData.hinge=a,e.userData.axis=n.axis,n.axis==="horizontal"&&(e.rotation.y=Math.PI/2);break;case"decor":F(e,0,.52,0,.55,.95,.17,s),F(e,0,.6,.1,.33,.67,.03,4685194),F(e,0,.58,.122,.025,.67,.024,9812405);break}return Sy(e,n),kt(e)}var sa;function wy(){if(sa)return sa;let n=document.createElement("canvas");n.width=256,n.height=384;let e=n.getContext("2d");e.fillStyle="#823c36",e.fillRect(0,0,256,384),e.strokeStyle="#c3a168",e.lineWidth=4,e.strokeRect(12,12,232,360),e.lineWidth=2,e.strokeRect(22,22,212,340),e.save(),e.translate(128,192),e.beginPath(),e.arc(0,0,40,0,Math.PI*2),e.stroke();for(let i=0;i<12;i++)e.save(),e.rotate(i*Math.PI/6),e.beginPath(),e.moveTo(-6,-49),e.lineTo(0,-65),e.lineTo(6,-49),e.closePath(),e.fillStyle="#c3a168",e.fill(),e.restore();e.restore();for(let i of[63,321])e.beginPath(),e.moveTo(128,i-22),e.lineTo(150,i),e.lineTo(128,i+22),e.lineTo(106,i),e.closePath(),e.stroke();let t=new Dn(n);return t.colorSpace=St,sa=new Kt({map:t,roughness:1}),sa}var zl,Bn=null,fn=null,Bt=null,Ch=null,Rh="",Nh=null,Lf=1,Df=0,wh=!1,Wi=new Map,xi=new Set,zn=document.createElement("button");zn.className="webgl-note";zn.hidden=!0;zn.type="button";zn.textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C";Mt.append(zn);zn.onclick=()=>{xi.clear(),zn.hidden=!0,ur(!0)};function Ty(n,e){return n.props.find(i=>i.id===(e.fixtureId||e.id))||{x:e.wallX??Math.floor(e.x),y:e.wallY??Math.floor(e.y)}}function Nf(n,e){if(n.visible=!(e.type==="chest"&&_e.state.loot[_e.state.scene+":"+e.id]),e.type==="npc"){let t=window.viewsDebug?.speaker,i=t&&(t.id?t.id===e.id:t.name===e.name);n.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][i?Yd(e,_e.active()):n.userData.idleFacing??0]}if(n.userData.hinge){let t=e.type==="door"&&_e.isOpen(e)||_e.departingNpc?.doorId===e.id?-Math.PI*.48:0;n.userData.hinge.userData.goal=t,(!n.parent||!_e.animate())&&(n.userData.hinge.rotation.y=t)}}function Mf(n,e){let t=n.visualSeed??_e.state.seed,i={root:new qe,models:new Map,doors:new Map,torches:[],batches:null,chunk:e};i.root.name="region:"+e.id;let s=r=>r.x>=e.x&&r.x<e.x+e.w&&r.y>=e.y&&r.y<e.y+e.h;try{let o=function(u,h,p,x,g,m,f,v=a){let A=v===null?f:"stone:"+v;r.has(A)||r.set(A,[]),r.get(A).push([u,h,p,x,g,m])},r=new Map,a=null;for(let u=e.y;u<e.y+e.h;u++)for(let h=e.x;h<e.x+e.w;h++){let p=World.tile(n,h,u),x=(h*113+u*71+t)%11/100;if(p==="floor"){let g=n.ground?.[u]?.[h]==="grass",m=window.WorldGen?.SURFACE_BY_CODE[n.surface?.[u]?.[h]];a=yl({surface:m,grass:g,outdoor:n.outdoor,id:n.id},h,u);let f=new Le(m?WorldGen.surfaceColor(m,h,u):g?5405500:n.id==="proc-tavern"?6836539:n.outdoor?9930866:4544347);f.offsetHSL(0,-x*.3,x*.24),o(h+.5,-.095,u+.5,1,.17,1,f.getHex());let v=(h*37+u*61+t)%17;(h*7+u*13)%19===0&&o(h+.7,.005,u+.24,.16,.007,.18,5859403,null)}else if(p==="wall"){if(a=yl({wall:!0,wallStyle:n.wallStyle},h,u),n.props.some(v=>["door","portal"].includes(v.type)&&v.x===h&&v.y===u)){o(h+.5,-.095,u+.5,1,.17,1,4544347,a===null?null:yl({},h,u));continue}if(n.outdoor&&u!==1){o(h+.5,.1,u+.5,.99,.2,.99,n.wallStyle?WorldGen.wallColor(n.wallStyle,h,u):7501415);continue}let g=World.tile(n,h,u-1)==="floor"&&!n.lights.some(v=>v.wallX===h&&v.wallY===u),m=g?.48:.94;for(let v=0;v<(g?2:4);v++){let A=new Le(n.wallStyle?WorldGen.wallColor(n.wallStyle,h,u):8486504);A.offsetHSL(0,-x,.01*(v%2)),v%2?(o(h+.125,.12+v*.235,u+.5,.22,.22,.97,A.getHex()),o(h+.5,.12+v*.235,u+.5,.47,.22,.97,A.getHex()),o(h+.875,.12+v*.235,u+.5,.22,.22,.97,A.getHex())):(o(h+.25,.12+v*.235,u+.5,.47,.22,.97,A.getHex()),o(h+.75,.12+v*.235,u+.5,.47,.22,.97,A.getHex()))}o(h+.5,m+.03,u+.5,.99,.06,.99,9671035),(h*19+u*43+t)%13===7&&o(h+.82,m+.064,u+.76,.11,.009,.08,7568982,null)}}for(let[u,h]of r){let p=typeof u=="string"?xy(Number(u.slice(6))):cs(u,h.some(f=>f[1]>.05)?2:8);typeof u=="string"&&Th.add(p);let x=new cn(Vi,p,h.length),g=new We,m=new _n;h.forEach(([f,v,A,S,T,E],R)=>{g.compose(new k(f,v,A),m,new k(S,T,E)),x.setMatrixAt(R,g)}),x.castShadow=h.some(f=>f[1]>.12),x.receiveShadow=!0,i.root.add(x)}let l=[],c=new Map(_e.props.map(u=>[u.id,u])),d=[...n.props,..._e.props.filter(u=>u.type==="ground-item"&&!n.props.some(h=>h.id===u.id))];for(let u of d.filter(s)){let h=c.get(u.id)||u;if(["torch","chandelier"].includes(h.type))continue;let p=ha(h);p.position.set(h.x+.5,0,h.y+.5),h.type==="npc"&&(p.userData.idleFacing=qd(n,h,_e.state.world?.gen?.seed||_e.state.procedural?.seed||_e.state.world?.id||"")),h.solid!==!1&&!["door","portal","decor","banner"].includes(h.type)&&Ah(p,.88,.78),p.userData.p=h,Nf(p,h),p.visible&&=c.has(h.id),i.root.add(p),i.models.set("prop:"+h.id,p),h.type==="door"&&i.doors.set(h.id,p),!["npc","door","portal","chest","ground-item","torch","chandelier"].includes(h.type)&&!h.container&&l.push(p)}i.batches=Zd(l,i.root);for(let u of l)u.userData.staticBatchOwner=i.batches;for(let u of(n.decor||[]).filter(s))if(u.kind==="bench"){let h=new qe;F(h,0,.35,0,.88,.13,.35,7950386),F(h,0,.56,-.15,.88,.32,.07,6833454);for(let p of[-.32,.32])F(h,p,.18,0,.095,.3,.33,5322275);kt(h),Ah(h,1,.55),h.position.set(u.x+.5,0,u.y+.5),i.root.add(h)}else{let h=new qe,p=new je(new vn(u.w-.08,u.h-.08),wy());p.rotation.x=-Math.PI/2,p.position.y=.016,p.receiveShadow=!0,h.add(p);for(let x of[-1,1])F(h,x*(u.w/2-.08),.017,0,.025,.006,u.h-.08,10979920);h.position.set(u.x-.5+u.w/2,0,u.y-.5+u.h/2),i.root.add(h)}for(let u of(n.lights||[]).filter(h=>s(Ty(n,h)))){let h=u.id==="altar",p=u.kind==="chandelier",x=u.kind==="fixture"?new qe:p?Rf():Yl(),g=x.userData.flames||[];if(u.kind==="wall"){x.position.set(u.x,.56,u.y);let f=new qe;F(f,-u.dx*.18,.26,-u.dy*.18,u.dx?.045:.15,.23,u.dy?.045:.15,3752007),F(f,-u.dx*.09,.11,-u.dy*.09,u.dx?.24:.045,.04,u.dy?.24:.045,3752007),kt(f),ql(f);let v=new qe;v.position.copy(x.position),x.position.set(0,0,0),v.add(f,x),v.userData.p=n.props.find(A=>A.id===u.fixtureId),v.userData.lightSource=u.id,i.root.add(v),i.models.set("prop:"+u.fixtureId,v)}else x.position.set(u.x,0,u.y),x.userData.lightSource=u.id,p&&(x.userData.p=n.props.find(f=>f.id===u.id),i.models.set("prop:"+u.id,x)),i.root.add(x);h&&(x.visible=!1);let m=new ui(16760192,u.intensity??(h?2:12),u.distance??8,2);m.position.set(u.x,u.height??(h?.96:1.22),u.y),If(m),i.root.add(m),i.torches.push({model:x,flames:g,light:m,source:u,chandelier:p})}return i}catch(r){throw vl(i.root,{sharedGeometries:new Set([Vi])}),r}}function Sf(n){hs.add(n.root);for(let[e,t]of n.models)t.userData.regionOwner=n.chunk.id,t.userData.regionAnchor={x:n.chunk.x,y:n.chunk.y},ut.set(e,t);for(let[e,t]of n.doors)kl.set(e,t);return yi.push(...n.torches),et.shadowMap.needsUpdate=!0,n}function Ey(n){if(!n)return;for(let[t,i]of n.models)(bn===i||bn===i.userData.hinge)&&cr(null),_i.delete(t),_i.delete(i.userData.p?.id),delete i.userData.tap,delete i.userData.strike,ut.get(t)===i&&ut.delete(t),kl.get(i.userData.p?.id)===i&&kl.delete(i.userData.p.id);for(let t of n.torches){let i=yi.indexOf(t);i>=0&&yi.splice(i,1)}let e=window.objectPrompt?.p;e&&n.models.has("prop:"+e.id)&&(bt.hidden=!0,ar.clear()),hs.remove(n.root),vl(n.root,{sharedGeometries:new Set([Vi])}),n.models.clear(),n.doors.clear(),n.torches.length=0,Wi.get(n.chunk.id)===n&&Wi.delete(n.chunk.id),et.shadowMap.needsUpdate=!0}function Ay(n){let e=new qe,t=document.createElement("canvas");t.width=n.W*2,t.height=n.H*2;let i=t.getContext("2d");for(let o=0;o<n.H;o++)for(let l=0;l<n.W;l++){let c=World.tile(n,l,o);if(c==="void")continue;let d=window.WorldGen?.SURFACE_BY_CODE[n.surface?.[o]?.[l]],u=c==="wall"?7828575:d?WorldGen.surfaceColor(d,l,o):n.ground?.[o]?.[l]==="grass"?5405500:9930866;i.fillStyle="#"+new Le(u).getHexString(),i.fillRect(l*2,o*2,2,2),i.fillStyle="rgba(0,0,0,.05)",i.fillRect(l*2+1,o*2+1,1,1)}for(let o of n.props)["tree","bush","bones"].includes(o.model)||["ground-item","npc","torch","chandelier"].includes(o.type)||(i.fillStyle=["door","portal","waymark"].includes(o.type)?"#d6b370":"#69584a",i.fillRect(o.x*2,o.y*2,2,2));let s=new Dn(t);s.colorSpace=St,s.magFilter=s.minFilter=yt,s.generateMipmaps=!1;let r=new Kt({map:s,transparent:!0,roughness:1}),a=new je(new vn(n.W,n.H),r);return a.rotation.x=-Math.PI/2,a.position.set(n.W/2,-.018,n.H/2),a.receiveShadow=!0,a.userData.disposeMaterial=!0,a.userData.disposeTexture=!0,e.add(a),e.name="region-overview",hs.add(e),e}function Cy(n){let e=2.25;for(let t of n.props)if(t.model&&window.Props)for(let i of window.Props.build(t,{texel:!1})||[])e=Math.max(e,Math.abs(i[0])+i[3]/2,Math.abs(i[2])+i[5]/2+(i[1]+i[4]/2)*.7);for(let t of n.decor||[])e=Math.max(e,t.w||1,t.h||1);return e}function ur(n=!1){if(!Bt?.enabled||!Bn||!_e||_e.scene!==Nh)return;Ch=ef(Qd(Ot),{padding:Lf,lights:_e.scene.lights||[]});let e=tf(_e,_i,gi,window.viewsDebug?.speaker,window.objectPrompt,ut),t=$d({width:_e.scene.W,height:_e.scene.H,bounds:Ch,pins:e,...Bt,previousMode:fn?.mode||"detail"}),i=t.mode+":"+t.chunks.map(s=>s.id+(s.pinned?"p":"")).join("|");fn=t;for(let s of xi)s!=="scheduler"&&!t.chunks.some(r=>r.id===s)&&xi.delete(s);zn.hidden=!xi.size,(i!==Rh||n)&&(Rh=i,Bn.update(t))}function Ry(){let n=_e.scene;Df++,wh=!0,Af=n.id+":"+(n.layoutKey||"")+":"+_e.state.party.map(e=>e.id).join(","),cr(null),bt.hidden=!0,ar.clear(),Bn?.reset(),Bn=null,Wi.clear(),fn=null,Rh="",Nh=n,xi.clear(),zn.hidden=!0;for(let e of yi)kn.remove(e.light),e.portable&&e.light.shadow.dispose();bf(hs),bf(or),Uf(),ut.clear(),kl.clear(),yi.length=0,_i.clear(),zl=null;for(let e of gi)e.el?.remove(),e.mesh&&(kn.remove(e.mesh),oa(e.mesh));gi.length=0,Bt=jd(n,window.location.search),Bt.enabled?(Lf=Cy(n),Ay(n),Bn=Kd({schedule:e=>{let t=requestAnimationFrame(e);return()=>cancelAnimationFrame(t)},build:e=>{let t=Mf(n,e);return xi.delete(e.id),Wi.set(e.id,t),Sf(t)},release:Ey,onChange:()=>{zn.hidden=!xi.size,!wh&&_e.scene===n&&(Ff(),ei())},onError:(e,t)=>{xi.add(t?.id||"scheduler"),zn.hidden=!1,console.error("Region loading failed",e)}}),vi(),ur(),Bn.flush(1)):zl=Sf(Mf(n,{id:"full",x:0,y:0,w:n.W,h:n.H})).batches;for(let e of _e.state.party){let t=new ui(16760192,12,10,2);If(t,!0),t.visible=!1,kn.add(t),yi.push({light:t,portable:!0,actorId:e.id,flames:[]})}et.shadowMap.needsUpdate=!0,hr=!0,wh=!1,document.body.classList.add("voxel-ready"),Fh()}function oa(n){vl(n,{sharedGeometries:new Set([Vi])})}function bf(n){oa(n),n.clear()}function Ll(n,e,t,i=.94){let s=[[-i/2,-i/2],[i/2,-i/2],[i/2,i/2],[-i/2,i/2],[-i/2,-i/2]].map(([a,o])=>new k(n+a,.025,e+o)),r=new Hs(new At().setFromPoints(s),new Qi({color:t,transparent:!0,opacity:.8}));return lr.add(r),r}function Uf(){for(;lr.children.length;){let n=lr.children[0];n.traverse(e=>{e.geometry&&!e.userData.silhouette&&e.geometry.dispose(),e.material&&e.material.dispose(),e.isInstancedMesh&&e.dispose()}),lr.remove(n)}}function Ff(){let n=_e.selected&&_e.props.find(i=>i.x===_e.selected.x&&i.y===_e.selected.y),e=_e.selected&&_e.all().find(i=>i.x===_e.selected.x&&i.y===_e.selected.y),t=n?ut.get("prop:"+n.id):e?ut.get(e.id):null;return cr(t),t}function Uh(){if(_e=window.gameDebug,!_e)return;(Nh!==_e.scene||Af!==_e.scene.id+":"+(_e.scene.layoutKey||"")+":"+_e.state.party.map(a=>a.id).join(","))&&Ry();let n=_e.props.filter(a=>a.type==="ground-item");for(let[a,o]of ut)o.userData.p?.type==="ground-item"&&!n.some(l=>"prop:"+l.id===a)&&((bn===o||bn===o.userData.hinge)&&cr(null),o.parent?.remove(o),oa(o),ut.delete(a),Wi.get(o.userData.regionOwner)?.models.delete(a));for(let a of n)if(!ut.has("prop:"+a.id)){let o=Bt?.enabled?Wi.get(yh(a.x,a.y,Bt.chunkSize)):null;if(Bt?.enabled&&!o)continue;let l=ha(a);l.position.set(a.x+.5,0,a.y+.5),l.userData.p=a,(o?.root||hs).add(l),o&&(o.models.set("prop:"+a.id,l),l.userData.regionOwner=o.chunk.id,l.userData.regionAnchor={x:o.chunk.x,y:o.chunk.y}),ut.set("prop:"+a.id,l)}let e=_e.all(),t=new Set(e.map(a=>a.id));for(let a of e){let o=ut.get(a.id),l=JSON.stringify([a.hands||[],a.appearance||null,a.classId,a.visual||null,a.gen||null]);if(o&&o.userData.loadout!==l&&(bn===o&&cr(null),or.remove(o),oa(o),ut.delete(a.id),o=null),o||(o=ca(a.dummy?4:a.kind,a),Ah(o,.8,.68),o.userData.loadout=l,or.add(o),ut.set(a.id,o)),_i.has(a.id)||(o.position.set(a.x+.5,0,a.y+.5),o.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][a.facing||0]),o.visible=!a.dead&&(a.kind<3||a.dummy||window.visibility?.canSee(_e.active(),a)!==!1),o.userData.p=a,a.kind<3){if(!o.userData.torch){let d=Yl();d.scale.setScalar(.7),d.position.set(a.hands?.indexOf("torch")===0?-.32:.32,.37,.07),o.add(d),o.userData.torch=d}let c=o.userData.torch;c.visible=!!a.hands?.includes("torch"),c.userData.flames.forEach(d=>d.visible=!!a.torch)}}for(let[a,o]of ut)!a.startsWith("prop:")&&!t.has(a)&&(bn===o&&cr(null),or.remove(o),oa(o),ut.delete(a));let i=new Map(_e.props.map(a=>[a.id,a]));for(let[a,o]of ut)if(a.startsWith("prop:")){let l=i.get(o.userData.p?.id);l?(o.userData.p=l,Nf(o,l)):o.visible=!1,o.userData.staticBatched&&o.userData.staticBatchOwner?.update(o)}Uf();let s=Ff(),r=_e.active();if(Ll(r.x+.5,r.y+.5,9481331,.74),_e.state.world?.gen)for(let a of window.WorldGen.Runtime.knownTraps(window.GeneratedWorlds.host(),_e.scene))Ll(a.x+.5,a.y+.5,14187064,.82);if(_e.selected){s||Ll(_e.selected.x+.5,_e.selected.y+.5,14925430);let a=_e.route||[];if(a.length){let l=new cn(new yn(.06,.025,.06),new Ln({color:13023111}),a.length);a.forEach((c,d)=>l.setMatrixAt(d,new We().makeTranslation(c.x+.5,.027,c.y+.5))),lr.add(l)}let o=a.at(-1);o&&Ll(o.x+.5,o.y+.5,10337165,.68)}Ef.intensity=_e.state.settings.lights?.65+_e.state.settings.ambient*.45:.85,Lh.intensity=_e.state.settings.lights?.43:.85,et.shadowMap.enabled=_e.state.settings.lights;for(let a of yi)a.portable&&(a.light.shadow.needsUpdate=!0);et.shadowMap.needsUpdate=!0,ur(),ei()}function vi(){let n=Mt.clientWidth||390,e=Mt.clientHeight||520,t=n/e;Ot.left=-Ct*t,Ot.right=Ct*t,Ot.top=Ct,Ot.bottom=-Ct;let i=Bt?.enabled?Math.max(12,Ct*1.4):12;Ot.far=Math.max(80,i+Ct*4),Ot.position.set(Qn.x,i,Qn.z+i*.7),Ot.lookAt(Qn.x,0,Qn.z),Ot.updateProjectionMatrix(),Ot.updateMatrixWorld(),ur()}function Fh(){let n=Mt.clientWidth||390,e=Mt.clientHeight||520;et.setSize(n,e,!1),rr.setSize(n,e),Wl.uniforms.texel.value.set(1/n,1/e),vi(),ei()}function Vl(n){Bt?.enabled&&fn?.mode==="overview"&&(Ct=4.8),Qn={x:n.x+.5,z:n.y+.5},vi(),ei()}function Oh(){let n=_e.scene,e=(Mt.clientWidth||390)/(Mt.clientHeight||520);Ct=Math.max(n.H*.5*.819,n.W*.5/e)+.5,Qn={x:n.W/2,z:n.H/2},vi(),ei()}function Zl(){Ct=4.8,Vl(_e.active())}function Iy(){let n=rr.width,e=rr.height,t=[n,e,...Ot.matrixWorld.elements,...Ot.projectionMatrix.elements,...os.flatMap(i=>i.matrix.elements)].join(",");t!==Eh&&((!pi||pi.image.width!==n||pi.image.height!==e)&&(pi?.dispose(),Il=new Uint8Array(n*e*4),yf=new Uint8Array(n*e),vf=new Int32Array(n*e),pi=new ji(Il,n,e,nn),pi.minFilter=pi.magFilter=yt,Wl.uniforms.mask.value=pi),et.setRenderTarget(rr),et.render(Ol,Ot),et.readRenderTargetPixels(rr,0,0,n,e,Il),rf(Il,n,e,yf,vf),pi.needsUpdate=!0,Eh=t)}function ei(){if(hr){if(window.CinematicMenu?.active){zf(performance.now());return}if(et.setRenderTarget(null),et.render(kn,Ot),bn&&bn.visible&&os.length){bn.updateWorldMatrix(!0,!0);for(let e of os)e.matrix.copy(e.userData.source.matrixWorld);Iy(),et.setRenderTarget(null);let n=et.autoClear;et.autoClear=!1,et.render(Tf,_y),et.autoClear=n}}}var Gl=new es,Py=new on(new k(0,1,0),0);function Of(n,e){let t=Mt.getBoundingClientRect();return Gl.setFromCamera(new Ue((n-t.left)/t.width*2-1,-(e-t.top)/t.height*2+1),Ot),Gl.ray.intersectPlane(Py,new k)}var pn=new Map;Gl.layers.enable(1);var la=!1,Gi,Ih,Bf=0,kf=0;Vn.addEventListener("pointerdown",n=>{if(Vn.setPointerCapture(n.pointerId),pn.set(n.pointerId,{x:n.clientX,y:n.clientY}),pn.size===1&&(Gi={x:n.clientX,y:n.clientY},Ih={...Qn},la=!1),pn.size===2){let[e,t]=[...pn.values()];Bf=Math.hypot(e.x-t.x,e.y-t.y),kf=Ct,la=!0}});Vn.addEventListener("pointermove",n=>{if(pn.has(n.pointerId)){if(pn.set(n.pointerId,{x:n.clientX,y:n.clientY}),pn.size===2){let[e,t]=[...pn.values()];Ct=dn.clamp(kf*Bf/Math.max(20,Math.hypot(e.x-t.x,e.y-t.y)),2.8,15)}else if(Gi){let e=n.clientX-Gi.x,t=n.clientY-Gi.y;Math.hypot(e,t)>5&&(la=!0),la&&(Qn.x=Ih.x-e*2*Ct/(Mt.clientHeight||520),Qn.z=Ih.z-t*2*Ct/(Mt.clientHeight||520)/.819)}vi(),ei()}});Vn.addEventListener("pointerup",n=>{if(!la&&pn.size===1){let e=Of(n.clientX,n.clientY),t=[...ut.values()].filter(s=>s.visible&&s.userData.p&&s.userData.p.type!=="chandelier"),i=Gl.intersectObjects(t,!0);if(fn?.mode!=="overview"&&i.length){let s=i[0].object;for(;s&&!s.userData.p;)s=s.parent;if(s){let r=s.userData.p;if(!ta(Bt,fn,Bn,r.x,r.y)){_e.mapTap(null),pn.delete(n.pointerId),Gi=null;return}_e.mapTap(r),pn.delete(n.pointerId),Gi=null;return}}e&&ta(Bt,fn,Bn,Math.floor(e.x),Math.floor(e.z))&&World.tile(_e.scene,Math.floor(e.x),Math.floor(e.z))!=="void"?_e.mapTap({x:Math.floor(e.x),y:Math.floor(e.z)}):_e.mapTap(null)}pn.delete(n.pointerId),Gi=null});Vn.addEventListener("pointercancel",n=>{pn.delete(n.pointerId),Gi=null});Vn.addEventListener("wheel",n=>{n.preventDefault(),Ct=dn.clamp(Ct*Math.exp(n.deltaY*.001),2.8,15),vi(),ei()},{passive:!1});for(let[n,e]of Object.entries({"zoom-in":()=>{Ct=Math.max(2.8,Ct*.8),vi(),ei()},"zoom-out":()=>{Ct=Math.min(15,Ct/.8),vi(),ei()},"camera-center":()=>Vl(_e.active()),"camera-fit":Oh}))document.getElementById(n).onclick=e;function Ly(n,e,t,i){let s=ut.get(n);s&&(_i.set(n,{from:{x:e.x+.5,z:e.y+.5},to:{x:t.x+.5,z:t.y+.5},start:performance.now(),duration:Math.max(1,i),m:s}),s.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][s.userData.p?.facing||0],ur())}function Ph(n,e,t=!1,i=!0,s="damage"){let r=document.createElement("span");r.className="voxel-damage "+(t?"critical ":"")+(s==="heal"?"healing":""),r.textContent=e===0?"0":String(e),Mt.append(r),gi.push({el:r,p:{x:n.x+.5,y:.9,z:n.y+.5},start:performance.now(),life:1100});let a=ut.get(n.id);a&&s!=="heal"&&(a.userData.hit=performance.now())}async function Dy(n,e,t){let i=ut.get(n.id);if(i&&(i.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][n.facing||0],i.userData.strike={start:performance.now(),dx:Math.sign(e.x-n.x),dz:Math.sign(e.y-n.y)}),Math.abs(e.x-n.x)+Math.abs(e.y-n.y)>1){let s=new je(new yn(.07,.07,.19),Hi(n.kind===1?7651315:13676131,!0));kn.add(s),gi.push({mesh:s,from:{x:n.x+.5,z:n.y+.5},to:{x:e.x+.5,z:e.y+.5},start:performance.now(),life:260})}t&&await new Promise(s=>setTimeout(s,260))}var sr=new Map;function wf(n,e,t,i=0){let s=JSON.stringify([ia(n,t)||vh(t||{},n),i])+n+":"+(e||"")+":"+(t?.portalKind||"")+":"+(t?.visual||"");if(!sr.has(s))try{mi||(mi=new Qr({alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),mi.setSize(360,450,!1),mi.setPixelRatio(1),mi.outputColorSpace=St,mi.toneMapping=Ks,mi.toneMappingExposure=1.25);let a=new In;a.add(new hi(14937574,6181693,2));let o=new di(16769716,2.8);o.position.set(-2,4,3),a.add(o);let l=e==="item"?Pf(n):e?ha({...t,type:e}):ca(n,t);l.rotation.y=i*Math.PI/2,a.add(l);let c=new un(-.68,.68,.98,-.72,.1,20);c.position.set(1.8,1.6,4),c.lookAt(0,.67,0),Sl(c,l),mi.render(a,c);let d=document.createElement("canvas");d.width=360,d.height=450,d.getContext("2d").drawImage(mi.domElement,0,0),sr.size>80&&sr.delete(sr.keys().next().value),sr.set(s,d),l.traverse(u=>{u.isInstancedMesh&&u.dispose()})}catch{return null}let r=document.createElement("canvas");return r.width=360,r.height=450,r.className="sprite",r.getContext("2d").drawImage(sr.get(s),0,0),r}function Ny(n){if(!n||!_e?.animate())return;let e=ut.get("prop:"+n.id)||ut.get(n.id);!e||n.type==="chandelier"||(e.userData.tap={start:performance.now(),type:n.type||"actor",baseY:e.userData.tap?.baseY??e.position.y,baseZ:e.userData.tap?.baseZ??e.rotation.z})}function ra(n){if(requestAnimationFrame(ra),window.CinematicMenu?.active&&hr&&!document.hidden){n-Pl>=30&&(Pl=n,zf(n));return}if(document.hidden||document.getElementById("map-view").hidden||!hr||n-Pl<30)return;Pl=n;let e=!ra.lastShadow||n-ra.lastShadow>80;e&&(ra.lastShadow=n);let t=_e.animate(),i=_e.active();ur();for(let[a,o]of _i){let l=Math.min(1,(n-o.start)/o.duration),c=1-(1-l)**3;o.m.position.set(dn.lerp(o.from.x,o.to.x,c),t?Math.sin(l*Math.PI)*.035:0,dn.lerp(o.from.z,o.to.z,c)),l===1&&(o.m.position.set(o.to.x,0,o.to.z),_i.delete(a))}for(let a of ut.values()){if(a.userData.tap){let o=a.userData.tap,l=(n-o.start)/360;if(l<1){let c=Math.sin(l*Math.PI)*Math.sin(l*Math.PI*2);a.position.y=o.baseY+Math.sin(l*Math.PI)*(["npc","actor"].includes(o.type)?.045:.022),a.rotation.z=o.baseZ+c*(["door","portal","books","barrel"].includes(o.type)?.035:.016)}else a.position.y=o.baseY,a.rotation.z=o.baseZ,delete a.userData.tap;a.userData.staticBatched&&a.userData.staticBatchOwner?.update(a)}if(a.userData.strike){let o=a.userData.strike,l=(n-o.start)/280;l<1?(a.position.x=a.userData.p.x+.5+o.dx*Math.sin(l*Math.PI)*.1,a.position.z=a.userData.p.y+.5+o.dz*Math.sin(l*Math.PI)*.1):(delete a.userData.strike,a.position.set(a.userData.p.x+.5,0,a.userData.p.y+.5))}if(a.userData.hinge){let o=a.userData.hinge;o.rotation.y=dn.lerp(o.rotation.y,o.userData.goal||0,.22)}}let s=new Set(window.Torches.lightSources().map(a=>a.id));for(let a of yi){let o=a.portable?_e.state.party.find(h=>h.id===a.actorId):null,l=a.source,c=l?.phase||2,d=!!_e.state.settings.lights&&(a.portable?!!o?.torch:s.has(l.id)),u=t?1+.035*Math.sin(n*.005+c)+.015*Math.sin(n*.012+c):1;if(a.light.visible=d,a.light.intensity=d?(l?.intensity??12)*(a.portable?.65:l?.id==="altar"?.22:a.chandelier?.3:.45)*_e.state.settings.intensity*u:0,a.portable&&d&&e&&(_i.size||gi.length||[...ut.values()].some(h=>h.userData.strike||h.userData.hinge&&Math.abs(h.userData.hinge.rotation.y-(h.userData.hinge.userData.goal||0))>.002)||!a.lastPosition||a.light.position.distanceToSquared(a.lastPosition)>1e-4)&&(a.light.shadow.needsUpdate=!0,et.shadowMap.needsUpdate=!0,a.lastPosition=a.light.position.clone()),a.portable){let h=ut.get(o?.id),p=h?.userData.torch;p&&(p.updateWorldMatrix(!0,!1),a.light.position.copy(p.localToWorld(new k(0,.64,0))),p.userData.flames.forEach((x,g)=>{x.position.copy(x.userData.rest),t&&(x.position.x+=Math.sin(n*.009+g)*.015)}))}else{if(l.kind==="wall"){let p=window.Torches.fixture(l.fixtureId).present;a.model.visible=p,a.flames.forEach(x=>x.visible=d)}let h=t?Math.sin(n*.008+c)*.018:0;if(a.light.position.x=l.x+h,a.light.position.z=l.y+h*.6,a.flames.forEach((p,x)=>{p.position.copy(p.userData.rest),t&&(p.position.x+=h*(x+1)*.5,p.position.y+=Math.sin(n*.009+c+x)*.018)}),a.chandelier){a.flames.forEach(x=>x.visible=d);let p=_e.state.party.some(x=>Math.hypot(x.x+.5-l.x,x.y+.5-l.y)<1.15);a.model.traverse(x=>{x.isMesh&&(x.material.opacity=dn.lerp(x.material.opacity,p?.28:1,.14))})}}}for(let a=gi.length-1;a>=0;a--){let o=gi[a],l=(n-o.start)/o.life;if(l>=1){o.el?.remove(),o.mesh&&(kn.remove(o.mesh),o.mesh.geometry.dispose()),gi.splice(a,1);continue}if(o.el){let c=new k(o.p.x,o.p.y+l*.7,o.p.z).project(Ot);o.el.style.left=(c.x+1)*Mt.clientWidth/2+"px",o.el.style.top=(-c.y+1)*Mt.clientHeight/2+"px",o.el.style.opacity=String(1-Math.max(0,(l-.6)/.4))}else o.mesh.position.set(dn.lerp(o.from.x,o.to.x,l),.65,dn.lerp(o.from.z,o.to.z,l)),o.mesh.rotation.y=Math.atan2(o.to.x-o.from.x,o.to.z-o.from.z)}let r=window.objectPrompt;if(bt.hidden=!r?.p||!ta(Bt,fn,Bn,r?.p?.x,r?.p?.y)||!document.getElementById("dialogue").hidden||!!window.CinematicMenu?.active,bt.hidden&&ar.clear(),r?.p){let a=r.p,o=new k(a.x+.5,.45,a.y+.5).project(Ot),l=(o.x+1)*Mt.clientWidth/2,c=(-o.y+1)*Mt.clientHeight/2,d=r.actions||[],u=JSON.stringify([a.name,d.map(v=>[v.id,v.label,v.enabled])]);if(bt.dataset.signature!==u){ar.clear(),bt.dataset.signature=u;let v=document.createElement("strong");v.textContent=a.name;let A=d.map(S=>{let T=document.createElement("button");return T.type="button",T.dataset.action=S.id,T.textContent=S.label,T.disabled=!S.enabled,T});bt.replaceChildren(v,...A),bt.setAttribute("aria-label","\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \xB7 "+a.name)}let h=bt.offsetWidth||190,p=bt.offsetHeight||125,x=Mt.getBoundingClientRect(),g=document.getElementById("play-dock")?.getBoundingClientRect(),m=Math.min(Mt.clientHeight-6,g&&g.height?g.top-x.top-6:Mt.clientHeight-6),f=c-p-24;f<76&&(f=c+24),f=Math.max(6,Math.min(m-p,f)),bt.hidden||=l<0||l>Mt.clientWidth||c<0||c>m||m<p,bt.hidden&&ar.clear(),bt.style.left=Math.max(h/2+6,Math.min(Mt.clientWidth-h/2-6,l))+"px",bt.style.top=f+"px"}ei()}new ResizeObserver(Fh).observe(Mt);window.camera={center:Vl,reset:Zl,fit:Oh,follow:n=>{_e.state.combat&&Vl(n)},zoom:n=>{Ct=dn.clamp(5/n,2.8,15),vi()},allowClick:()=>!0,get state(){return{scale:5/Ct,focus:Qn}}};window.fx={step:()=>{},strike:Dy,impact:Ph,door:()=>{},pulse:n=>Ph(n,"\u041E\u0442\u043A\u043B\u0438\u043A",!1,!0,"heal")};var Hl;function zf(n){Hl||=nf({figure:ca,propModel:ha,shadedBox:F,compact:kt,terrainMaterial:cs}),et.setRenderTarget(null),Hl.render(et,n,_e.state.settings,window.CinematicMenu.editor)}function Vf(){let n=Bn?.stats||{},e=Ml(hs);return{enabled:!!Bt?.enabled,mode:Bt?.enabled?fn?.mode||"detail":"full",chunkSize:Bt?.chunkSize,maxChunks:Bt?.maxChunks,budgetOverflow:fn?.budgetOverflow||0,ready:n.readyCount??(hr?1:0),readyIds:n.readyIds||[],queued:n.queuedCount||0,idle:!n.queuedCount,built:n.builtCount||0,released:n.releasedCount||0,generation:Df,streamGeneration:n.generation||0,errors:n.errors||0,lastError:n.lastError||null,lastBuildMs:n.lastBuildDuration||0,resources:e,actorResources:Ml(or),portableLights:yi.filter(t=>t.portable).length,groups:[...Wi.values()].map(t=>({id:t.chunk.id,...Ml(t.root)})),shared:{materials:Dl.size+Fl.size+Th.size,textures:Ul.size+(sa?1:0)+1+[...Th].filter(t=>t.map).length,geometries:1},gpu:{...et.info.memory,calls:et.info.render.calls,triangles:et.info.render.triangles},demand:{visibleKeys:fn?.visibleKeys||[],pinnedKeys:fn?.pinnedKeys||[],bounds:Ch},failedIds:[...xi]}}function Uy(n=1e4){let e=performance.now();return new Promise((t,i)=>{function s(){let r=Vf();if(r.idle)return t(r);if(performance.now()-e>n)return i(new Error("Region loading timed out"));requestAnimationFrame(s)}s()})}window.voxel={resize:Fh,get staticBatchStats(){let n=Bt?.enabled?[...Wi.values()].map(e=>e.batches):zl?[zl]:[];return n.length?n.reduce((e,t)=>({props:e.props+t.roots.length,sourceMeshes:e.sourceMeshes+t.sourceMeshes,drawMeshes:e.drawMeshes+t.meshes.length}),{props:0,sourceMeshes:0,drawMeshes:0}):null},get regionStats(){return Vf()},regionReady:(n,e)=>ta(Bt,fn,Bn,n,e),regionIdle:Uy,turnHero:n=>Hl?.turn(n),get menuDebug(){return Hl?.debug},buildModel:(n,e,t)=>ca(n,e,t),buildItem:Pf,buildProp:ha,compact:kt,shadedBox:F,heroPortrait:(n,e=0)=>wf(n.kind,null,n,e),portrait:wf,sync:Uh,move:Ly,impact:Ph,tap:Ny,reset:Zl,fit:Oh,ground:Of,get selectionMask(){return{root:bn,objects:os,material:Wl}},get ready(){return hr},get scene(){return kn},get camera(){return Ot},get models(){return ut},get renderer(){return et}};window.initCamera=()=>{Uh(),Zl()};requestAnimationFrame(ra);function Gf(){window.gameDebug?(Uh(),Zl(),_e.render(),window.Heroes?.refreshPortraits()):setTimeout(Gf,30)}Gf();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
