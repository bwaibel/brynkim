// Templates
var _htmlReplacement = /\{([^{}]+)\}/g;
function Id()
{
    var m_id = null; m_this = this;
    this.toString=function()
    {
        return m_id||(m_id=Id.prefix+Id.current++);
    }
    
    this.getElementByCategory = function(category)
    {
		var sSuffix = category ? '_' + category : '';
		return document.getElementById(m_id.toString() + sSuffix);
    }
}
Id.current = 0;
Id.prefix = "_el_le_";

function ToHtml(obj,htmlInput)
{
    return function()
    {
        if(!htmlInput ) htmlInput = obj.constructor._htmlInput;
	    var html = htmlInput.replace(_htmlReplacement, match);
	    function match(s, name)
	    {
		    var names = name.split(".");
		    var value = obj[names[0]];
		    for(var i=1;value && i<names.length;i++)
			    value = value[names[i]];
		    if(!value)
			    return '';
		    return value instanceof Array?value.join(''):value.toString();
	    }
        return html;
    }
}


function SlideShowTemplate()
{
	var m_this = this;
	
	this.id = new Id();this.toString=ToHtml(this);
	this.unloaded = [];
	this.photos = [];
	this.addPhotos = function(photos)
	{
		for(var i=0;i<photos.length;i++)
		{
			this.unloaded.push(new SlideShowPhotoThumbnailTemplate());
			this.lower(photos[i],"small");
			this.lower(photos[i],"medium");
			this.lower(photos[i],"large");
			this.unloaded[i].photo = photos[i];
			this.unloaded[i].index = (this.photos.length+i)+'';
		}
	}
	
	this.lower=function(photo,size)
	{
	    photo.sizes[size].src = photo.sizes[size].src.toLowerCase();
	}
	
	this.createSlideShow=function(controlsEl)
	{
		var slideShow, controlsTemplate, listEl,photoEl,activePhoto,template = this,photoWindow,animation;

		slideShow = 
		{
			activatePhoto:function(num,animate)
			{
				var photo = listEl.childNodes[num].childNodes[0];
				this.scrollTo(photo,animate);
				if(null != activePhoto)
				{
					listEl.childNodes[activePhoto].childNodes[0].className = listEl.childNodes[activePhoto].childNodes[0].className.replace(/ active/gi,"");
				}
				activePhoto = num;
				listEl.childNodes[activePhoto].childNodes[0].className += " active";
				
				if(photoEl.filters&&photoEl.filters.length>0)
					photoEl.filters[0].Apply();                   
					photoEl.src = template.photos[num].photo.sizes.medium.src;
					photoEl.style.width = template.photos[num].photo.sizes.medium.width;
					photoEl.style.height = template.photos[num].photo.sizes.medium.width/template.photos[num].photo.sizes.medium.aspect;
				if(photoEl.filters&&photoEl.filters.length>0)
					photoEl.filters[0].Play();
			},
			launchPhoto:function()
			{
				var url = template.photos[activePhoto].photo.sizes.large.src;
				var top,left,width=template.photos[activePhoto].photo.sizes.large.width,height=template.photos[activePhoto].photo.sizes.large.width/template.photos[activePhoto].photo.sizes.large.aspect;
				left = (screen.width-width) / 2;
				top = (screen.height-height) / 2;
				var size = "height="+height+",width="+width+",top="+top+",left="+left;
				if(photoWindow)
					photoWindow.close();
				photoWindow = window.open(url,
					"pw",
					size+",resizable=no,scrollbars=no,status=no,toolbar=no,dependent=yes,chrome=no,dialog=yes,menubar=no");
				while(!photoWindow.document.body){}
				photoWindow.document.body.style.margin=0;
				photoWindow.document.body.style.backgroundColor="black";
				photoWindow.document.body.style.textAlign="center";
				photoWindow.focus();
			},
			scrollBy:function(num)
			{
				num = (num+activePhoto+template.photos.length)%template.photos.length;
				this.activatePhoto(num,true);		
			},
			scrollTo:function(el,animate)
			{
				if(animation)
					animation.stop();
				var width = listEl.childNodes[0].offsetWidth + 3;
				width = listEl.offsetWidth/2 -width/2;
				width = el.offsetLeft-width;
				if(animate==null||animate==true)
					setTimeout(an,150);
				else
					listEl.scrollLeft = width;
					
				function an()
				{
					animation = Animate(listEl.scrollLeft,width,200,setScroll);
				}
			},
			play:function()
			{
				playStep();
				playerTimeout = window.setInterval(playStep,3000);
			},
			stop:function()
			{
				this.activatePhoto(0,true);
				if(playerTimeout)
					clearInterval(playerTimeout);
			},
			pause:function()
			{
				if(playerTimeout)
					clearInterval(playerTimeout);
			}
		};
		
		listEl = this.id.getElementByCategory("list");
		photoEl = this.id.getElementByCategory("photo");
		listEl.onclick = thumbnailClick;
		photoEl.onclick = photoClick;
		
		function preloadImages()
		{
            var current = -1;
            setTimeout(next,0);
            function imgLoaded(img)
            {
                try{template.photos.push(img);
                var li = document.createElement("li");
                li.innerHTML = img.toString();
                listEl.appendChild(li);
                if(current==0)
        			slideShow.activatePhoto(0,false);
                }catch(e){}
                next();
            }
            function next()
            {
                if(current<template.unloaded.length-1)
                    template.unloaded[++current].load(imgLoaded);
                else
                    template.unloaded=[];
            }
		}
		
		var playerTimeout = null;
		function playStep()
		{
			if(activePhoto==template.photos.length-1)
				clearInterval(playerTimeout);
			slideShow.scrollBy(1);
		}
		
		function setScroll(width)
		{
			listEl.scrollLeft=width;
		}
		
		var leftControls = new ControlsTemplate();
		leftControls.addButtons(["prev"]);
		this.id.getElementByCategory("leftControls").innerHTML = leftControls.toString();
		leftControls.attach("prev",prevClick);
		
		var rightControls = new ControlsTemplate();
		rightControls.addButtons(["next","play","pause"]);
		this.id.getElementByCategory("rightControls").innerHTML = rightControls.toString();
		rightControls.hide("pause");
		rightControls.attach("next",nextClick);
		rightControls.attach("play",playClick);
		rightControls.attach("pause",pauseClick);
		
		
		
		function prevClick()
		{
			slideShow.scrollBy(-1);
		}
		
		function playClick()
		{
			rightControls.show("pause");
			rightControls.hide("play");
			slideShow.play();
		}
		
		function pauseClick()
		{
			rightControls.hide("pause");
			rightControls.show("play");
			slideShow.pause();
		}
		
		function nextClick()
		{
			slideShow.scrollBy(1);
		}
		
		function photoClick(e)
		{
			slideShow.launchPhoto();
		}
		
		function thumbnailClick(e)
		{
			var tg = e?e.target:event.srcElement;
			while(tg&&tg.tagName!="A")
				tg = tg.parentNode;
			if(!tg)return;
			
			if(tg.index)
			{
				slideShow.activatePhoto(Number(tg.index),true);
			}
			if(!e)
				event.returnValue = false;
			return false;
		}
		
		preloadImages();
		return slideShow;
	}
}
SlideShowTemplate._htmlInput = '<div class="photos"><div class="photo"><img id="{id}_photo" src="" /></div><div class="photonav"><div class="capL"><div class="capR"><div class="ctrlL" id="{id}_leftControls">l</div><div class="ctrlR" id="{id}_rightControls">r</div><ul class="list" id="{id}_list"></ul></div></div></div></div>';
	
function SlideShowPhotoThumbnailTemplate()
{
	this.id = new Id();this.toString=ToHtml(this);
	var m_this = this;
	this.photo = {};
	this.index = '0';
	this.load=function(cb)
	{
        var num = 0;
        var thumb = new Image();
    	thumb.onload=loaded;
		thumb.src=this.photo.sizes["small"].src;
		
		var img = new Image();
    	img.onload=img.onerror=loaded;
		img.src=this.photo.sizes["medium"].src;
		
		function loaded(i)
		{
			num++;
			if(num==2)
			    cb(m_this);
		}
	}
}
SlideShowPhotoThumbnailTemplate._htmlInput = '<a index="{index}" href="#"><img src="{photo.sizes.small.src}" alt="{photo.title}" /></a>';


function ButtonTemplate()
{
	this.id = new Id();this.toString=ToHtml(this);
	var m_this = this;
	this.name = "";
	this.parent = {};
	
}
ButtonTemplate._htmlInput = '<a id="{parent.id}_{name}" style="" class="button {name}"><img alt="{name}" src="http://brynkim.com/img/button_{name}.png" /></a>';
//ButtonTemplate._htmlInput = '<a id="{parent.id}_{name}" style="" class="button {name}"><img alt="{name}" src="img/button_{name}.png" /></a>';

function ControlsTemplate()
{
	this.id = new Id();this.toString=ToHtml(this);
	var m_this = this;
	this.buttons = [];
	this.addButtons = function(buttons)
	{
		for(var i=0;i<buttons.length;i++)
		{
			this.buttons.push(new ButtonTemplate());
			this.buttons[i].name = buttons[i];
			this.buttons[i].parent = this;
		}
	}
	this.attach=function(name,handler)
	{
		this.id.getElementByCategory(name).onclick = handler;
	}
	this.hide=function(name)
	{
		this.id.getElementByCategory(name).style.display="none";
	}
	this.show=function(name)
	{
		this.id.getElementByCategory(name).style.display="inline";
	}
}
ControlsTemplate._htmlInput = "{buttons}";

// todo: pool intervals to allow for fade/slide combos
function Animate(from,to,duration,cb)
{
	if(!cb) return;
	cb(from);
	var size = to-from;
	var start = gt();
	var interval = window.setInterval(step,16);
	function step(stop)
	{
		var tick = gt()-start;
		if(stop || tick >= duration)
		{
			cb(to);
			clearInterval(interval);
		}
		else
		{
			tick = tick/duration;
			cb(from + (size*tick));
		}
	}
	function gt()
	{
		return (new Date()).getTime();
	}
	
	return{stop:function(){clearInterval(interval);}};
}
