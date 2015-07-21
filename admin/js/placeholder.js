(function () {
  var ie = !!(window.attachEvent && !window.opera);
  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
  var fn = [];
  var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
  var d = document;
  d.ready = function (f) {
    if (!ie && !wk && d.addEventListener)
      return d.addEventListener('DOMContentLoaded', f, false);
    if (fn.push(f) > 1) return;
    if (ie)
      (function () {
        try { d.documentElement.doScroll('left'); run(); }
        catch (err) { setTimeout(arguments.callee, 0); }
      })();
    else if (wk)
      var t = setInterval(function () {
        if (/^(loaded|complete)$/.test(d.readyState))
          clearInterval(t), run();
      }, 0);
  };
})();



//判断是否支持placeholder 
function isPlaceholer(){ 
var input = document.createElement('input'); 
return "placeholder" in input; 
} 
 
function Placeholder(obj){ 
this.input = obj; 
this.label = document.createElement('label'); 
this.label.innerHTML = obj.getAttribute('placeholder'); 
this.label.style.cssText = 'position:absolute; text-indent:6px;color:#999999;padding-top:2px;cursor:pointer'; 
if(obj.value != ''){ 
this.label.style.display = 'none'; 
} 
this.init(); 
} 
Placeholder.prototype = { 
//取位置 
getxy : function(obj){ 
var left, top; 
if(document.documentElement.getBoundingClientRect){ 
var html = document.documentElement, 
body = document.body, 
pos = obj.getBoundingClientRect(), 
st = html.scrollTop || body.scrollTop, 
sl = html.scrollLeft || body.scrollLeft, 
ct = html.clientTop || body.clientTop, 
cl = html.clientLeft || body.clientLeft; 
left = pos.left + sl - cl; 
top = pos.top + st - ct; 
} 
else{ 
while(obj){ 
left += obj.offsetLeft; 
top += obj.offsetTop; 
obj = obj.offsetParent; 
} 
} 
return{ 
left: left, 
top : top 
} 
}, 
//取宽高 
getwh : function(obj){ 
return { 
w : obj.offsetWidth, 
h : obj.offsetHeight 
} 
}, 
//添加宽高值方法 
setStyles : function(obj,styles){ 
for(var p in styles){ 
obj.style[p] = styles[p]+'px'; 
} 
}, 
init : function(){ 
var label = this.label, 
input = this.input, 
xy = this.getxy(input), 
wh = this.getwh(input); 
this.setStyles(label, {'width':wh.w, 'height':wh.h, 'lineHeight':20, 'left':xy.left, 'top':xy.top}); 
document.body.appendChild(label); 
label.onclick = function(){ 
this.style.display = "none"; 
input.focus();
input.click(); 
} 
input.onfocus = function(){ 
label.style.display = "none"; 
}; 
input.onblur = function(){ 
document.getElementById('tcal').onclick=function(){label.style.display = "none";};
if(this.value == ""){ 
label.style.display = "block"; 
} 
}; 
} 
} 
function toArray(coll){ 
for(var i = 0, a = [], len = coll.length; i < len; i++){ 
a[i] = coll[i]; 
} 
return a; 
} 
function runPlaceholder(){
if(!isPlaceholer()){ 
var inpColl = document.getElementsByTagName('input'), 
textColl = document.getElementsByTagName('textarea'); 
var inpArr = toArray(inpColl), 
textArr = toArray(textColl), 
placeholderArr = inpArr.concat(textArr); 
for (var i = 0; i < placeholderArr.length; i++){ 
if (placeholderArr[i].getAttribute('placeholder')){ 
new Placeholder(placeholderArr[i]); 
} 
} 
}


}

 document.ready(function(){
  runPlaceholder();
});



 