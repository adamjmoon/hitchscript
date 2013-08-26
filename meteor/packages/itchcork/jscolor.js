/*!
 * jscolor, JavaScript Color Picker
 *
 * @version 1.4.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2013-04-08
 * @link    http://jscolor.com
 */
;var jscolor={dir:"",bindClass:"color",binding:true,preloading:true,install:function(){jscolor.addEvent(window,"load",jscolor.init)},init:function(){if(jscolor.binding){jscolor.bind()}if(jscolor.preloading){jscolor.preload()}},getDir:function(){if(!jscolor.dir){var a=jscolor.detectDir();jscolor.dir=a!==false?a:"jscolor/"}return jscolor.dir},detectDir:function(){var c=location.href;var d=document.getElementsByTagName("base");for(var a=0;a<d.length;a+=1){if(d[a].href){c=d[a].href}}var d=document.getElementsByTagName("script");for(var a=0;a<d.length;a+=1){if(d[a].src&&/(^|\/)jscolor\.js([?#].*)?$/i.test(d[a].src)){var f=new jscolor.URI(d[a].src);var b=f.toAbsolute(c);b.path=b.path.replace(/[^\/]+$/,"");b.query=null;b.fragment=null;return b.toString()}}return false},bind:function(){var d=new RegExp("(^|\\s)("+jscolor.bindClass+")\\s*(\\{[^}]*\\})?","i");var f=document.getElementsByTagName("input");for(var c=0;c<f.length;c+=1){var b;if(!f[c].color&&f[c].className&&(b=f[c].className.match(d))){var g={};if(b[3]){try{g=(new Function("return ("+b[3]+")"))()}catch(a){}}f[c].color=new jscolor.color(f[c],g)}}},preload:function(){for(var a in jscolor.imgRequire){if(jscolor.imgRequire.hasOwnProperty(a)){jscolor.loadImage(a)}}},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(a){jscolor.imgRequire[a]=true},loadImage:function(a){if(!jscolor.imgLoaded[a]){jscolor.imgLoaded[a]=new Image();jscolor.imgLoaded[a].src=jscolor.getDir()+a}},fetchElement:function(a){return typeof a==="string"?document.getElementById(a):a},addEvent:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{if(a.attachEvent){a.attachEvent("on"+c,b)}}},fireEvent:function(a,c){if(!a){return}if(document.createEvent){var b=document.createEvent("HTMLEvents");b.initEvent(c,true,true);a.dispatchEvent(b)}else{if(document.createEventObject){var b=document.createEventObject();a.fireEvent("on"+c,b)}else{if(a["on"+c]){a["on"+c]()}}}},getElementPos:function(c){var d=c,b=c;var a=0,f=0;if(d.offsetParent){do{a+=d.offsetLeft;f+=d.offsetTop}while(d=d.offsetParent)}while((b=b.parentNode)&&b.nodeName.toUpperCase()!=="BODY"){a-=b.scrollLeft;f-=b.scrollTop}return[a,f]},getElementSize:function(a){return[a.offsetWidth,a.offsetHeight]},getRelMousePos:function(b){var a=0,c=0;if(!b){b=window.event}if(typeof b.offsetX==="number"){a=b.offsetX;c=b.offsetY}else{if(typeof b.layerX==="number"){a=b.layerX;c=b.layerY}}return{x:a,y:c}},getViewPos:function(){if(typeof window.pageYOffset==="number"){return[window.pageXOffset,window.pageYOffset]}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){return[document.body.scrollLeft,document.body.scrollTop]}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){return[document.documentElement.scrollLeft,document.documentElement.scrollTop]}else{return[0,0]}}}},getViewSize:function(){if(typeof window.innerWidth==="number"){return[window.innerWidth,window.innerHeight]}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){return[document.body.clientWidth,document.body.clientHeight]}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){return[document.documentElement.clientWidth,document.documentElement.clientHeight]}else{return[0,0]}}}},URI:function(a){this.scheme=null;this.authority=null;this.path="";this.query=null;this.fragment=null;this.parse=function(d){var c=d.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);this.scheme=c[3]?c[2]:null;this.authority=c[5]?c[6]:null;this.path=c[7];this.query=c[9]?c[10]:null;this.fragment=c[12]?c[13]:null;return this};this.toString=function(){var c="";if(this.scheme!==null){c=c+this.scheme+":"}if(this.authority!==null){c=c+"//"+this.authority}if(this.path!==null){c=c+this.path}if(this.query!==null){c=c+"?"+this.query}if(this.fragment!==null){c=c+"#"+this.fragment}return c};this.toAbsolute=function(e){var e=new jscolor.URI(e);var d=this;var c=new jscolor.URI;if(e.scheme===null){return false}if(d.scheme!==null&&d.scheme.toLowerCase()===e.scheme.toLowerCase()){d.scheme=null}if(d.scheme!==null){c.scheme=d.scheme;c.authority=d.authority;c.path=b(d.path);c.query=d.query}else{if(d.authority!==null){c.authority=d.authority;c.path=b(d.path);c.query=d.query}else{if(d.path===""){c.path=e.path;if(d.query!==null){c.query=d.query}else{c.query=e.query}}else{if(d.path.substr(0,1)==="/"){c.path=b(d.path)}else{if(e.authority!==null&&e.path===""){c.path="/"+d.path}else{c.path=e.path.replace(/[^\/]+$/,"")+d.path}c.path=b(c.path)}c.query=d.query}c.authority=e.authority}c.scheme=e.scheme}c.fragment=d.fragment;return c};function b(e){var c="";while(e){if(e.substr(0,3)==="../"||e.substr(0,2)==="./"){e=e.replace(/^\.+/,"").substr(1)}else{if(e.substr(0,3)==="/./"||e==="/."){e="/"+e.substr(3)}else{if(e.substr(0,4)==="/../"||e==="/.."){e="/"+e.substr(4);c=c.replace(/\/?[^\/]*$/,"")}else{if(e==="."||e===".."){e=""}else{var d=e.match(/^\/?[^\/]*/)[0];e=e.substr(d.length);c=c+d}}}}}return c}if(a){this.parse(a)}},color:function(B,d){this.required=true;this.adjust=true;this.hash=false;this.caps=true;this.slider=true;this.valueElement=B;this.styleElement=B;this.onImmediateChange=null;this.hsv=[0,0,1];this.rgb=[1,1,1];this.minH=0;this.maxH=6;this.minS=0;this.maxS=1;this.minV=0;this.maxV=1;this.pickerOnfocus=true;this.pickerMode="HSV";this.pickerPosition="bottom";this.pickerSmartPosition=true;this.pickerButtonHeight=20;this.pickerClosable=false;this.pickerCloseText="Close";this.pickerButtonColor="ButtonText";this.pickerFace=10;this.pickerFaceColor="ThreeDFace";this.pickerBorder=1;this.pickerBorderColor="ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight";this.pickerInset=1;this.pickerInsetColor="ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow";this.pickerZIndex=10000;for(var s in d){if(d.hasOwnProperty(s)){this[s]=d[s]}}this.hidePicker=function(){if(u()){g()}};this.showPicker=function(){if(!u()){var K=jscolor.getElementPos(B);var H=jscolor.getElementSize(B);var E=jscolor.getViewPos();var M=jscolor.getViewSize();var p=t(this);var L,J,I;switch(this.pickerPosition.toLowerCase()){case"left":L=1;J=0;I=-1;break;case"right":L=1;J=0;I=1;break;case"top":L=0;J=1;I=-1;break;default:L=0;J=1;I=1;break}var G=(H[J]+p[J])/2;if(!this.pickerSmartPosition){var F=[K[L],K[J]+H[J]-G+G*I]}else{var F=[-E[L]+K[L]+p[L]>M[L]?(-E[L]+K[L]+H[L]/2>M[L]/2&&K[L]+H[L]-p[L]>=0?K[L]+H[L]-p[L]:K[L]):K[L],-E[J]+K[J]+H[J]+p[J]-G+G*I>M[J]?(-E[J]+K[J]+H[J]/2>M[J]/2&&K[J]+H[J]-G-G*I>=0?K[J]+H[J]-G-G*I:K[J]+H[J]-G+G*I):(K[J]+H[J]-G+G*I>=0?K[J]+H[J]-G+G*I:K[J]+H[J]-G-G*I)]}k(F[L],F[J])}};this.importColor=function(){if(!a){this.exportColor()}else{if(!this.adjust){if(!this.fromString(a.value,x)){D.style.backgroundImage=D.jscStyle.backgroundImage;D.style.backgroundColor=D.jscStyle.backgroundColor;D.style.color=D.jscStyle.color;this.exportColor(x|C)}}else{if(!this.required&&/^\s*$/.test(a.value)){a.value="";D.style.backgroundImage=D.jscStyle.backgroundImage;D.style.backgroundColor=D.jscStyle.backgroundColor;D.style.color=D.jscStyle.color;this.exportColor(x|C)}else{if(this.fromString(a.value)){}else{this.exportColor()}}}}};this.exportColor=function(p){if(!(p&x)&&a){var E=this.toString();if(this.caps){E=E.toUpperCase()}if(this.hash){E="#"+E}a.value=E}if(!(p&C)&&D){D.style.backgroundImage="none";D.style.backgroundColor="#"+this.toString();D.style.color=0.213*this.rgb[0]+0.715*this.rgb[1]+0.072*this.rgb[2]<0.5?"#FFF":"#000"}if(!(p&v)&&u()){r()}if(!(p&e)&&u()){A()}};this.fromHSV=function(G,F,E,p){if(G!==null){G=Math.max(0,this.minH,Math.min(6,this.maxH,G))}if(F!==null){F=Math.max(0,this.minS,Math.min(1,this.maxS,F))}if(E!==null){E=Math.max(0,this.minV,Math.min(1,this.maxV,E))}this.rgb=h(G===null?this.hsv[0]:(this.hsv[0]=G),F===null?this.hsv[1]:(this.hsv[1]=F),E===null?this.hsv[2]:(this.hsv[2]=E));this.exportColor(p)};this.fromRGB=function(I,H,p,E){if(I!==null){I=Math.max(0,Math.min(1,I))}if(H!==null){H=Math.max(0,Math.min(1,H))}if(p!==null){p=Math.max(0,Math.min(1,p))}var G=y(I===null?this.rgb[0]:I,H===null?this.rgb[1]:H,p===null?this.rgb[2]:p);if(G[0]!==null){this.hsv[0]=Math.max(0,this.minH,Math.min(6,this.maxH,G[0]))}if(G[2]!==0){this.hsv[1]=G[1]===null?null:Math.max(0,this.minS,Math.min(1,this.maxS,G[1]))}this.hsv[2]=G[2]===null?null:Math.max(0,this.minV,Math.min(1,this.maxV,G[2]));var F=h(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=F[0];this.rgb[1]=F[1];this.rgb[2]=F[2];this.exportColor(E)};this.fromString=function(F,E){var p=F.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);if(!p){return false}else{if(p[1].length===6){this.fromRGB(parseInt(p[1].substr(0,2),16)/255,parseInt(p[1].substr(2,2),16)/255,parseInt(p[1].substr(4,2),16)/255,E)}else{this.fromRGB(parseInt(p[1].charAt(0)+p[1].charAt(0),16)/255,parseInt(p[1].charAt(1)+p[1].charAt(1),16)/255,parseInt(p[1].charAt(2)+p[1].charAt(2),16)/255,E)}return true}};this.toString=function(){return((256|Math.round(255*this.rgb[0])).toString(16).substr(1)+(256|Math.round(255*this.rgb[1])).toString(16).substr(1)+(256|Math.round(255*this.rgb[2])).toString(16).substr(1))};function y(I,H,E){var J=Math.min(Math.min(I,H),E);var F=Math.max(Math.max(I,H),E);var p=F-J;if(p===0){return[null,0,F]}var G=I===J?3+(E-H)/p:(H===J?5+(I-E)/p:1+(H-I)/p);return[G===6?0:G,p/F,F]}function h(H,G,E){if(H===null){return[E,E,E]}var F=Math.floor(H);var I=F%2?H-F:1-(H-F);var p=E*(1-G);var J=E*(1-G*I);switch(F){case 6:case 0:return[E,J,p];case 1:return[J,E,p];case 2:return[p,E,J];case 3:return[p,J,E];case 4:return[J,p,E];case 5:return[E,p,J]}}function g(){delete jscolor.picker.owner;document.getElementsByTagName("body")[0].removeChild(jscolor.picker.boxB)}function k(L,K){if(!jscolor.picker){jscolor.picker={box:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),btn:document.createElement("div"),btnS:document.createElement("span"),btnT:document.createTextNode(l.pickerCloseText)};for(var I=0,J=4;I<jscolor.images.sld[1];I+=J){var H=document.createElement("div");H.style.height=J+"px";H.style.fontSize="1px";H.style.lineHeight="0";jscolor.picker.sld.appendChild(H)}jscolor.picker.sldB.appendChild(jscolor.picker.sld);jscolor.picker.box.appendChild(jscolor.picker.sldB);jscolor.picker.box.appendChild(jscolor.picker.sldM);jscolor.picker.padB.appendChild(jscolor.picker.pad);jscolor.picker.box.appendChild(jscolor.picker.padB);jscolor.picker.box.appendChild(jscolor.picker.padM);jscolor.picker.btnS.appendChild(jscolor.picker.btnT);jscolor.picker.btn.appendChild(jscolor.picker.btnS);jscolor.picker.box.appendChild(jscolor.picker.btn);jscolor.picker.boxB.appendChild(jscolor.picker.box)}var E=jscolor.picker;E.box.onmouseup=E.box.onmouseout=function(){B.focus()};E.box.onmousedown=function(){n=true};E.box.onmousemove=function(p){if(c||o){c&&w(p);o&&i(p);if(document.selection){document.selection.empty()}else{if(window.getSelection){window.getSelection().removeAllRanges()}}f()}};if("ontouchstart" in window){E.box.addEventListener("touchmove",function(O){var p={offsetX:O.touches[0].pageX-j.X,offsetY:O.touches[0].pageY-j.Y};if(c||o){c&&w(p);o&&i(p);f()}O.stopPropagation();O.preventDefault()},false)}E.padM.onmouseup=E.padM.onmouseout=function(){if(c){c=false;jscolor.fireEvent(a,"change")}};E.padM.onmousedown=function(p){switch(b){case 0:if(l.hsv[2]===0){l.fromHSV(null,null,1)}break;case 1:if(l.hsv[1]===0){l.fromHSV(null,1,null)}break}o=false;c=true;w(p);f()};if("ontouchstart" in window){E.padM.addEventListener("touchstart",function(p){j={X:p.target.offsetParent.offsetLeft,Y:p.target.offsetParent.offsetTop};this.onmousedown({offsetX:p.touches[0].pageX-j.X,offsetY:p.touches[0].pageY-j.Y})})}E.sldM.onmouseup=E.sldM.onmouseout=function(){if(o){o=false;jscolor.fireEvent(a,"change")}};E.sldM.onmousedown=function(p){c=false;o=true;i(p);f()};if("ontouchstart" in window){E.sldM.addEventListener("touchstart",function(p){j={X:p.target.offsetParent.offsetLeft,Y:p.target.offsetParent.offsetTop};this.onmousedown({offsetX:p.touches[0].pageX-j.X,offsetY:p.touches[0].pageY-j.Y})})}var N=t(l);E.box.style.width=N[0]+"px";E.box.style.height=N[1]+"px";E.boxB.style.position="absolute";E.boxB.style.clear="both";E.boxB.style.left=L+"px";E.boxB.style.top=K+"px";E.boxB.style.zIndex=l.pickerZIndex;E.boxB.style.border=l.pickerBorder+"px solid";E.boxB.style.borderColor=l.pickerBorderColor;E.boxB.style.background=l.pickerFaceColor;E.pad.style.width=jscolor.images.pad[0]+"px";E.pad.style.height=jscolor.images.pad[1]+"px";E.padB.style.position="absolute";E.padB.style.left=l.pickerFace+"px";E.padB.style.top=l.pickerFace+"px";E.padB.style.border=l.pickerInset+"px solid";E.padB.style.borderColor=l.pickerInsetColor;E.padM.style.position="absolute";E.padM.style.left="0";E.padM.style.top="0";E.padM.style.width=l.pickerFace+2*l.pickerInset+jscolor.images.pad[0]+jscolor.images.arrow[0]+"px";E.padM.style.height=E.box.style.height;E.padM.style.cursor="crosshair";E.sld.style.overflow="hidden";E.sld.style.width=jscolor.images.sld[0]+"px";E.sld.style.height=jscolor.images.sld[1]+"px";E.sldB.style.display=l.slider?"block":"none";E.sldB.style.position="absolute";E.sldB.style.right=l.pickerFace+"px";E.sldB.style.top=l.pickerFace+"px";E.sldB.style.border=l.pickerInset+"px solid";E.sldB.style.borderColor=l.pickerInsetColor;E.sldM.style.display=l.slider?"block":"none";E.sldM.style.position="absolute";E.sldM.style.right="0";E.sldM.style.top="0";E.sldM.style.width=jscolor.images.sld[0]+jscolor.images.arrow[0]+l.pickerFace+2*l.pickerInset+"px";E.sldM.style.height=E.box.style.height;try{E.sldM.style.cursor="pointer"}catch(G){E.sldM.style.cursor="hand"}function M(){var p=l.pickerInsetColor.split(/\s+/);var O=p.length<2?p[0]:p[1]+" "+p[0]+" "+p[0]+" "+p[1];E.btn.style.borderColor=O}E.btn.style.display=l.pickerClosable?"block":"none";E.btn.style.position="absolute";E.btn.style.left=l.pickerFace+"px";E.btn.style.bottom=l.pickerFace+"px";E.btn.style.padding="0 15px";E.btn.style.height="18px";E.btn.style.border=l.pickerInset+"px solid";M();E.btn.style.color=l.pickerButtonColor;E.btn.style.font="12px sans-serif";E.btn.style.textAlign="center";try{E.btn.style.cursor="pointer"}catch(G){E.btn.style.cursor="hand"}E.btn.onmousedown=function(){l.hidePicker()};E.btnS.style.lineHeight=E.btn.style.height;switch(b){case 0:var F="hs.png";break;case 1:var F="hv.png";break}E.padM.style.backgroundImage="url('"+jscolor.getDir()+"cross.gif')";E.padM.style.backgroundRepeat="no-repeat";E.sldM.style.backgroundImage="url('"+jscolor.getDir()+"arrow.gif')";E.sldM.style.backgroundRepeat="no-repeat";E.pad.style.backgroundImage="url('"+jscolor.getDir()+F+"')";E.pad.style.backgroundRepeat="no-repeat";E.pad.style.backgroundPosition="0 0";r();A();jscolor.picker.owner=l;document.getElementsByTagName("body")[0].appendChild(E.boxB)}function t(E){var p=[2*E.pickerInset+2*E.pickerFace+jscolor.images.pad[0]+(E.slider?2*E.pickerInset+2*jscolor.images.arrow[0]+jscolor.images.sld[0]:0),E.pickerClosable?4*E.pickerInset+3*E.pickerFace+jscolor.images.pad[1]+E.pickerButtonHeight:2*E.pickerInset+2*E.pickerFace+jscolor.images.pad[1]];return p}function r(){switch(b){case 0:var G=1;break;case 1:var G=2;break}var K=Math.round((l.hsv[0]/6)*(jscolor.images.pad[0]-1));var J=Math.round((1-l.hsv[G])*(jscolor.images.pad[1]-1));jscolor.picker.padM.style.backgroundPosition=(l.pickerFace+l.pickerInset+K-Math.floor(jscolor.images.cross[0]/2))+"px "+(l.pickerFace+l.pickerInset+J-Math.floor(jscolor.images.cross[1]/2))+"px";var p=jscolor.picker.sld.childNodes;switch(b){case 0:var I=h(l.hsv[0],l.hsv[1],1);for(var E=0;E<p.length;E+=1){p[E].style.backgroundColor="rgb("+(I[0]*(1-E/p.length)*100)+"%,"+(I[1]*(1-E/p.length)*100)+"%,"+(I[2]*(1-E/p.length)*100)+"%)"}break;case 1:var I,L,H=[l.hsv[2],0,0];var E=Math.floor(l.hsv[0]);var F=E%2?l.hsv[0]-E:1-(l.hsv[0]-E);switch(E){case 6:case 0:I=[0,1,2];break;case 1:I=[1,0,2];break;case 2:I=[2,0,1];break;case 3:I=[2,1,0];break;case 4:I=[1,2,0];break;case 5:I=[0,2,1];break}for(var E=0;E<p.length;E+=1){L=1-1/(p.length-1)*E;H[1]=H[0]*(1-L*F);H[2]=H[0]*(1-L);p[E].style.backgroundColor="rgb("+(H[I[0]]*100)+"%,"+(H[I[1]]*100)+"%,"+(H[I[2]]*100)+"%)"}break}}function A(){switch(b){case 0:var p=2;break;case 1:var p=1;break}var E=Math.round((1-l.hsv[p])*(jscolor.images.sld[1]-1));jscolor.picker.sldM.style.backgroundPosition="0 "+(l.pickerFace+l.pickerInset+E-Math.floor(jscolor.images.arrow[1]/2))+"px"}function u(){return jscolor.picker&&jscolor.picker.owner===l}function q(){if(a===B){l.importColor()}if(l.pickerOnfocus){l.hidePicker()}}function m(){if(a!==B){l.importColor()}}function w(F){var E=jscolor.getRelMousePos(F);var p=E.x-l.pickerFace-l.pickerInset;var G=E.y-l.pickerFace-l.pickerInset;switch(b){case 0:l.fromHSV(p*(6/(jscolor.images.pad[0]-1)),1-G/(jscolor.images.pad[1]-1),null,e);break;case 1:l.fromHSV(p*(6/(jscolor.images.pad[0]-1)),null,1-G/(jscolor.images.pad[1]-1),e);break}}function i(E){var p=jscolor.getRelMousePos(E);var F=p.y-l.pickerFace-l.pickerInset;switch(b){case 0:l.fromHSV(null,null,1-F/(jscolor.images.sld[1]-1),v);break;case 1:l.fromHSV(null,1-F/(jscolor.images.sld[1]-1),null,v);break}}function f(){if(l.onImmediateChange){var p;if(typeof l.onImmediateChange==="string"){p=new Function(l.onImmediateChange)}else{p=l.onImmediateChange}p.call(l)}}var l=this;var b=this.pickerMode.toLowerCase()==="hvs"?1:0;var n=false;var a=jscolor.fetchElement(this.valueElement),D=jscolor.fetchElement(this.styleElement);var c=false,o=false,j={};var x=1<<0,C=1<<1,v=1<<2,e=1<<3;jscolor.addEvent(B,"focus",function(){if(l.pickerOnfocus){l.showPicker()}});jscolor.addEvent(B,"blur",function(){if(!n){window.setTimeout(function(){n||q();n=false},0)}else{n=false}});if(a){var z=function(){l.fromString(a.value,x);f()};jscolor.addEvent(a,"keyup",z);jscolor.addEvent(a,"input",z);jscolor.addEvent(a,"blur",m);a.setAttribute("autocomplete","off")}if(D){D.jscStyle={backgroundImage:D.style.backgroundImage,backgroundColor:D.style.backgroundColor,color:D.style.color}}switch(b){case 0:jscolor.requireImage("hs.png");break;case 1:jscolor.requireImage("hv.png");break}jscolor.requireImage("cross.gif");jscolor.requireImage("arrow.gif");this.importColor()}};