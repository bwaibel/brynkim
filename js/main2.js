var map = null;
var grid = null;
var slideShowController = null;
function init()         
{            
    setSize();
    window.onresize = setSize;
    newLocation();
	setTimeout(setupNav,1);
	var globe = new ControlsTemplate();
	var ctrls = document.getElementById("controls");
	globe.setParent(ctrls);
	globe.addButtons(["globe"]);
	globe.render();
}   

function setupNav()
{
	var navd = document.getElementById("navdispatch");
	navd.onscroll = newLocation;
	var nav = [];
	for(var i=0;i<_locations.length;i++)
	{
		nav.push('<a style="display:block;margin-top:100px;" name="')
		nav.push(i+'');
		nav.push('">item</a>');
	}
	navd.innerHTML = nav.join('');
}

function setSize()
{
	var root = (document.compatMode=="CSS1Compat") ? (document.documentElement) : document.body;
    var main = document.getElementById("content");
    var footer = document.getElementById("footer");
    var h = (root.clientHeight-80);
    main.style.height = h + "px";
    main.style.marginBottom = "60px";
    footer.style.top = h;
}

function newLocation()
{
	var item = Number(location.hash.substring(1));
    if(item=="")
		item=0;
	loadLocation(item);
}

function loadLocation(i)
{
	var l = _locations[i];
	var ptEl = document.getElementById("photos");
	var postEl = document.getElementById("post");
	if(l.albums.length!=0)
	{
		var root = (document.compatMode=="CSS1Compat") ? (document.documentElement) : document.body;
    	var scriptEl = document.getElementById("album");
		scriptEl.onreadystatechange = scriptEl.onload = scriptEl.onerror = loadalbum;
		scriptEl.src = "Albums/" + l.albums[0].name + "/album.js";
	}
	else
	{
		ptEl.style.display="none";
	}
	
	
	if(_locations[i].posts.length!=0)
	{
		postEl.innerHTML = _locations[i].posts[0].description;
		postEl.style.display="block";
	}
	else
	{
		postEl.style.display="none";
	}
}

var slideShowController;
function loadalbum()
{
	if(!window["_album"])
		return;

	var ctEl = document.getElementById("controls");
	var ptEl = document.getElementById("photos");
	var ss = new SlideShowTemplate();
	ss.setParent(ptEl);
	ss.addPhotos(window["_album"].photos);
    ss.render();
    slideShowController = ss.createSlideShow(ctEl);
    ptEl.style.display="block";

	window["_album"] = null;
}

/*

function dispatchClick(ev)
{
	var target = ev.target = ev.target||ev.srcElement;
	while(target && !handlers[target.id])
		target = target.parentNode;
	if(target)
		handlers[target.id](ev);
}

var handlers = {
	tags:function(ev)
	{
		alert();
	},
	types:function(ev)
	{
		if(-1 == ev.target.className.indexOf("type"))
			return;
		global.select(ev.target,document.getElementById("types"));
	},
	items:function(ev)
	{
		while(ev.target&&ev.target.className.indexOf("item")==-1)
			ev.target = ev.target.parentNode;
		if(!ev.target)	return;
		ev.cancelBubble = true;
		global.select(ev.target,document.getElementById("items"));
		if(_locations[ev.target.index].albums.length!=0)
		{
			el = document.getElementById("album");
			el.onload = el.onerror = loadalbum;
			el.src = "Albums/" + _locations[ev.target.index].albums[0].name + "/album.js";
			alert("Albums/" + _locations[ev.target.index].albums[0].name + "/album.js");
		}
		if(_locations[ev.target.index].posts.length!=0)
			document.getElementById("body").innerHTML = _locations[ev.target.index].posts[0].description;
	}
};
var global = {
	select:function(el,scope)
	{
		for(var i=0;i<scope.childNodes.length;i++)
		{
			scope.childNodes[i].className = scope.childNodes[i].className.replace(" selected","");
		}
		el.className += " selected";
	}
}

function msg(m,e)
{
	alert(m);
}*/