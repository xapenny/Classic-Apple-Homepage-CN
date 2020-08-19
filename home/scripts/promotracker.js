var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

Event.onDOMReady(function() {
    var promoSets,
        promos;
    if(promoSets = $('promos')) {
		if(promos = promoSets.select('a')) {
			promos.each(function(promo, i) {
				promo.writeAttribute('position', i+1);
			});
		}
    }

    var promoDiv;
    if(promoDiv=$('promos')){
        promoDiv.observe('mousedown', function(evt) {
			var element=null,
				position=null,
				image=null;
			if (element = evt.findElement('div a')){
				position = element.readAttribute('position');
			}
			if(image = evt.findElement('img')){
				image = image.src;
				image = image.substring(image.lastIndexOf('/')+1, image.length);
			}
			if(position!=null && image!=null){
				AC.Tracking.trackClick({
					prop2: position,
					prop3: 'p@' + image + ' - ' + AC.Tracking.pageName()
				}, this, 'o', 'p@' + image + ' - ' + AC.Tracking.pageName());
			}
    	});
    }
    
    var heros,
        img=null,
        link=null;
    if(heros=$('billboard')){
        heros.observe('mousedown', function(evt) {
            if(img = evt.findElement('img')){
                img = img.src;
                img = img.substring(img.lastIndexOf('/')+1, img.length);
            }
            if(img==null){
                if(link = evt.findElement('a')){
                    link = link.readAttribute('href');
                }
            }
            if(img!=null){
                AC.Tracking.trackClick({
                    prop3: 'h@' + img + ' - ' + AC.Tracking.pageName()
                }, this, 'o', 'h@' + img + ' - ' + AC.Tracking.pageName());
            } else if (link!=null){
                AC.Tracking.trackClick({
                    prop3: 'h@' + link + ' - ' + AC.Tracking.pageName()
                }, this, 'o', 'h@' + link + ' - ' + AC.Tracking.pageName());
            }
        });
    }
});


}