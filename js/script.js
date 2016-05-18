var options={
  center: new google.maps.LatLng(36.0835,140.0766),
  zoom:11,
  mapTypeId:google.maps.MapTypeId.ROADMAP
};
var markerList=[
  {
    title:"Mount Tsukuba",
    lat:36.2258,
    long:140.1050,
    category:"Attractions"
  },
  {
    title:"Tsukuba Space Center",
    lat:36.0656,
    long:140.1281,
    category:"Science"
  },
  {
    title:"Lake Kasumigaura",
    lat:36.0491,
    long:140.3792,
    category:"Attractions"
  },
  {
    title:"Tsukuba-san Shrine",
    lat:36.2137,
    long:140.1013,
    category:"Culture"
  },
  {
    title:"Tsukuba Botanical Garden",
    lat:36.1019,
    long:140.1107,
    category:"Attractions"
  },
  {
    title:"Hirasawa Kanga Ruins",
    lat:36.1780556,
    long:140.10333333333332,
    category:"History"
  },
  {
    title:"Oda Castle",
    lat:36.151389,
    long:140.110833,
    category:"History"
  },
  {
    title:"Tsukuba Expo Center",
    lat:36.0867,
    long:140.1106,
    category:"Attractions"
  },
  {
    title:"Tsukuba Science City",
    lat:36.0835,
    long:140.0766,
    category:"Science"
  }

];
var map;
var categories=["Attractions", "Culture","History","Science"];

var ViewModel=function(){
  var self = this;
  self.mapProp=options;
  self.markers=[];
  self.categories=ko.observableArray(categories);
  self.searchKey=ko.observable();
  self.loadMap=function(){
    map = new google.maps.Map(document.getElementById('googleMap'),self.mapProp);
    markerList.forEach(function(marker){
      self.markers.push(new google.maps.Marker({
          map:map,
          draggable:true,
          title:marker.title,
          position:{lat:parseFloat(marker.lat), lng:parseFloat(marker.long)},
          category:marker.category,
          visible:false
      }));
    });
    self.markers.forEach(function(marker){
      marker.addListener('click',function(){
        self.showInfo(marker.title);
      });
    });
  };
  google.maps.event.addDomListener(window,'load',self.loadMap);
  self.showMarkers=function(cat){
    for (var i =0; i< self.markers.length; i++){
        (self.markers[i].category == cat)?self.markers[i].setVisible(true):self.markers[i].setVisible(false);
    }
  }
  self.searchMarkers=function(){
    for (var i =0; i< self.markers.length; i++){
      (self.markers[i].title.search(new RegExp(self.searchKey(),"i")) != -1)?self.markers[i].setVisible(true):self.markers[i].setVisible(false);
    }
  }
  self.showInfo=function(name){
    var url ='http://en.wikipedia.org/w/api.php?action=opensearch&search='+name;
    var wikis='';
    $.ajax({
      url:url,
      type:'get',
      dataType: 'jsonp',
      success:function(data){
        for(var i = 0; i < data[1].length; i ++){
          wikis+='<span><a href='+data[3][i]+'>'+data[1][i]+'</a></span><br/>';
        }
          $("#addtl").html(wikis);        
      }
    });
  }
};
ko.applyBindings(new ViewModel());
