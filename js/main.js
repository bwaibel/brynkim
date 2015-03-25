// JScript File
/*function RssMapper = {
    Application:
    {
    },
    Utilities:
    {
        getCenterPixel:function()
        {
        },
        panToPixel:function(pixel)
        {
        },
        panToLatLong:function(location)
        {
        },
        
    }
}
*/
var map = null;
var grid = null;
var slideShowController = null;
function init()         
{            
    setSize();
    window.onresize = setSize;
	grid = new NineGrid();
	grid.body = "";
    grid.setUp("/Europe/img/nine_{0}.png",14,22,22,14);
    document.getElementById("nine").innerHTML = grid.toString();
    startSlideShow(_album.photos);
    /*createMap(_album.location);/*
    //setTimeout(fo,2000);/**/
    //addControl();        
    
}   

function createMap(location)
{
	map = new VEMap('themap');
    map.LoadMap(null, 10 ,'h' ,false); 
    map.HideDashboard();/**/
    var ll = new VELatLong(location.x,location.y);
    map.SetCenter(ll);
    //
}

function startSlideShow(photos)
{
	if(slideShowController)
	{
		//dispose contents or memory will get out of control...
	}
	var ctEl = document.getElementById("controls");
	grid.body = new SlideShowTemplate();//{images:'<img style="border:solid 4px white;margin:0;display:block;" src="Resized/large0.jpg" />'};
    grid.body.addPhotos(photos);
    grid.invalidateElement(["body"]);
    slideShowController = grid.body.createSlideShow(ctEl);
    grid.fadeIn();
}

function fo()
{
	grid.fadeOut();
}

function setSize()
{
	var root = (document.compatMode=="CSS1Compat") ? (document.documentElement) : document.body;
    var tm = document.getElementById("themap");
	tm.style.width = root.clientWidth + "px";
	tm.style.height = root.clientHeight + "px";
}

function PanTo(value)
{
    //map.FindLocation("Europe");
    //var values = value.split(',');
    //map.Pan(values[0],values[1]);
    //map.FindNearby("wireless");
}

// use georss schema
var post = {
    title:"Europe via Tours and Cities",
    link:"",
    description:'<p>You\'re either here by accident, or because you\'re curious about the details of our trip. We\'re breaking it down into two basic types of travel. First, as is usual with a&nbsp; trip like this, there are some places in Europe&nbsp;where, inevitably, we must go. We\'ve whiddled these stops down to&nbsp;five European cities that we can\'t live without and we\'ll spend 2-4 days in each. The second type of travel will be&nbsp;our eight day backpacking tours, well, not specifically backpacking, but they\'ll be more rough and we\'re targeting the more quaint side of Europe in these tours, we\'re also trying not to over plan them, except that they\'ll cover a general area and focus on the pleasures in that area that we find most enticing. </p><h3>The Trip</h3><p><strong>London: </strong>London actually almost didn\'t make the list, but we\'re flying there direct via British Air and we are pretty confident that we can make an unforgettable few days there, if not we can always skip out early and start the rest of the trip. We\'ve also kept a few extra days in the schedule just in case we find a place that we can\'t bear to leave. If we don\'t use those up, London will have to take us for a bit longer before we go home. We\'ve already booked our room for October 10 and 11, but it\'s the only concrete plans we\'ve made so far. We\'re staying at the Ace Hotel in Kensington, we have a private double ensuite, so at least the bathroom&nbsp;will be&nbsp;ours alone. From London we\'ll take the chunnel to Brussels where we\'re going to head directly North to Amsterdam. Amsterdam will end up being the launching point for the first of our four tours.</p><p><strong>Draughts and Decadence: </strong>Also known as Germany, possibly a little Belgium and followed up by our second city Prague. This tour will most likely start at the Rhine, probably Koln, (sorry, i\'m too lazy to find the umlaut) where we\'ll spend a day or two before renting a eurovan and driving the romantic road from Frankfurt to Fussen, visit the fairy-tale Neuschwanstein castle and drive up to Munich where we\'ll return the sleeper beast and complete our tour of Germany. We\'re thinking&nbsp;eight days total, but that could stretch either way. After draught, it\'s time to christen our shiny new eurail passes on our way to...</p><p><strong>Prague:</strong>&nbsp;&nbsp;I have no idea what we\'re going to do here, we\'ve only got 3 days and i\'m told i\'ll want to cancel the rest of the trip and just stay there. I\'m sure that\'s true, but we have to move on to our 3rd city stop. </p><p><strong>Venice: </strong>Ahh Italy, I have to confess that both Hee Jung and I are most looking forward to Italy. We had trouble keeping it down to just 14 days, and I wouldn\'t be surprised if we stretch that once we get there. From what I understand, Venice is a town where the sea permeates the soul (and pretty much everything else too), if true I suspect I\'ll have something of a crush on its residents.</p><p><strong>Chianti or Bust:</strong> Finally time to sniff some grape vines, assuming we don\'t run into any ice vines in Germany. We\'re going to hike our way through Tuscany. Most likely based in Sienna, bussing and then agrotourism for three to four days, then&nbsp;a quick run through Florence&nbsp;and on to a likely 2 days in hike Cinque Terre.&nbsp;This is our Tuscan adventure and my stomach is growling just thinking about it.</p><p><strong>Rome:</strong> Certainly for more than a day, likely three in fact. Rome is simply a must see, I couldn\'t imagine leaving Europe without it.</p><p><strong>Tour de Provence:</strong> The wine tour, strictly speaking. There will be some Cotes du Rhone mixed in with a little Avignon and maybe Nime or Arles, who knows. Does anyone know how much wine can be legally shipped into the United States from Europe? You know, I hadn\'t thought of the name until just now, but renting bicycles on this tour could be a possibility... or maybe not.</p><p><strong>Flamenco and Tapas: </strong>Spain, probably the most night centric of the trips, where&nbsp;the majority of our time will be spent strolling at night&nbsp;listening for open&nbsp;doors that leading to music and dance. We\'ll be based in Madrid but have a couple of trips planned, one to Toledo and a longer excursion to Seville. </p><p><strong>Paris: </strong>The last of our must see cities, and the last of our planned destinations. Once we\'ve had enough of Paris, or we\'ve run out of money, we\'ll hop on the Chunnel again to London to wait for our plane home.</p>',
    georss_point:"51.506903 -0.127154",
    pubDate:"Saturday, ..."
}
    
// controls
/*
image thumbnails at top, next to title of post onright
next/prev image buttons, clicking an image opens the image over the post,
post gets hidden, and a close button shows up

height of the post window should be fixed. Scroll bar inside :( ugh. 
maybe paging controls instead and paging turns into next post later on
what if a page cuts an image in half?
http://local.live.com/default.aspx?v=2&cp=51.506903~-0.127154&style=r&lvl=9&sp=Point.sgpcpphkd5tg_Koln___~Point.sbm2m0hqphv4_Frankfurt___
* /
function getHotPoint()
{
    // TODO:: this should be smarter
    var center = new Point(744,118);
    return center;
}

function animatedPan(pixel)
{
    var current = getCurrentPixel();
    var newCenter = findCenterForPixel(pixel);
    var delta = new Point(newCenter.x - current.x,newCenter.y - current.y);
    var duration = 2000;
    var start = (new Date()).getTime();
    var current = new Point(0,0);
    var intervals = [window.setInterval(f,11),window.setInterval(f,17)];
    function f()
    {
        if(duration < (new Date()).getTime()-start)
        {
            clearInterval(intervals[0]);
            clearInterval(intervals[1]);
        }
        else
            map.Pan(50,0);
    }
}

function panToPixel(pixel)
{
    var center = findCenter(pixel);
    map.SetCenter(center);
}

function zoomTo(zoom)
{
    var current = getCurrentPixel();
    var ll = new VELatLong(current.x,current.y);
    map.SetZoomLevel(zoom);
    return;
    var pixel = map.LatLongToPixel(ll);
    ll = findCenter(pixel);
    map.SetCenter(ll);
}

function getCurrentPixel()
{
    var center = map.LatLongToPixel(map.GetCenter());
    center.x -= app.center.x;
    center.y -= app.center.y;
    return center;
}

function findCenterForPixel(pixel)
{
    var delta = getCurrentPixel();
    delta.x += pixel.x;
    delta.y += pixel.y;
    return delta;
}

function findCenter(pixel)
{
    var delta = findCenterForPixel(pixel);
    return map.PixelToLatLong(delta.x,delta.y);
}

var app = {};
function addControl()
{
    var el = document.createElement("div");
    app.tw = new ToolWindow(post);
    app.center = getHotPoint();
    el.innerHTML = app.tw.toString();
    
    
    map.AddControl(el);
    
    var body = app.tw.getElement("description");
    //body.style.height = document.body.clientHeight-100;
    
    var ll = new VELatLong(app.tw.Position.x,app.tw.Position.y);
    var pixel = map.LatLongToPixel(ll);
    panToPixel(pixel);

    var layerSpec = new VELayerSpecification();
    layerSpec.Type = VELayerType.GeoRSS;
    layerSpec.ID = "Ivan";
    layerSpec.IconUrl = "./assets/globe.png";
    layerSpec.LayerSource =  "http://api.flickr.com/services/feeds/photos_public.gne?tags=geotagged&format=rss_200&georss=1";
    layerSpec.Method = "get";
    layerSpec.FnCallback = layerAdded;
    map.AddLayer(layerSpec);
    function layerAdded(feed)
    {
        alert(join(feed[0]));
    }
    return;
}      
*/