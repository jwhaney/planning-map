// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/on dojo/Evented dojo/_base/html dojo/_base/lang jimu/symbolUtils jimu/dijit/DrawBox jimu/dijit/SearchDistance esri/graphic esri/symbols/jsonUtils esri/layers/GraphicsLayer esri/renderers/SimpleRenderer esri/geometry/geometryEngine".split(" "),function(h,k,l,m,c,n,d,e,p,q,r,s,g,t,u,f){return h([k,l,m,n],{baseClass:"jimu-query-spatial-filter-drawing",templateString:'\x3cdiv\x3e\x3cdiv data-dojo-attach-point\x3d"drawBoxDiv"\x3e\x3c/div\x3e\x3cdiv class\x3d"search-distance-div" data-dojo-attach-point\x3d"searchDistanceDiv"\x3e\x3c/div\x3e\x3c/div\x3e',
map:null,bufferLayer:null,drawBoxOption:null,nls:null,enableBuffer:!0,distance:0,unit:"",postCreate:function(){this.inherited(arguments);this.map=this.drawBoxOption.map;this.bufferLayer=new t;var a=g.fromJson({style:"esriSFSSolid",color:[79,129,189,77],type:"esriSFS",outline:{style:"esriSLSSolid",color:[54,93,141,255],width:1.5,type:"esriSLS"}}),b=new u(a);this.bufferLayer.setRenderer(b);this.map.addLayer(this.bufferLayer);this.drawBoxOption.showClear=!0;this.drawBoxOption.keepOneGraphic=!0;this.drawBox=
new q(this.drawBoxOption);this.drawBox.setPolygonSymbol(a);a=p.getGreyPinMarkerSymbol();this.drawBox.setPointSymbol(a);this.drawBox.setLineSymbol(g.fromJson({color:[79,129,189,255],width:1.5,type:"esriSLS",style:"esriSLSDash"}));this.drawBox.placeAt(this.drawBoxDiv);this.own(c(this.drawBox,"user-clear",e.hitch(this,this._onDrawBoxClear)));this.own(c(this.drawBox,"draw-end",e.hitch(this,this._onDrawEnd)));this.drawBox.btnClear?d.removeClass(this.drawBox.btnClear,"jimu-float-trailing"):d.addClass(this.drawBox.btnClear,
"jimu-float-leading");this.searchDistance=new r({distance:this.distance,unit:this.unit});this.searchDistance.placeAt(this.searchDistanceDiv);this.enableBuffer?(this.searchDistance.enable(),this.own(c(this.searchDistance,"change",e.hitch(this,this._onSearchDistanceChange)))):(this.searchDistance.disable(),d.setStyle(this.searchDistanceDiv,"display","none"))},reset:function(a){this.drawBox.reset();this.clearAllGraphics();a&&(this.searchDistance.reset(),this.searchDistance.setDistance(this.distance),
this.searchDistance.setUnit(this.unit))},clearAllGraphics:function(){this.drawBox.clear();this._clearBufferLayer()},hideTempLayers:function(){this.bufferLayer&&this.bufferLayer.hide();this.drawBox&&this.drawBox.hideLayer()},showTempLayers:function(){this.bufferLayer&&this.bufferLayer.show();this.drawBox&&this.drawBox.showLayer()},deactivate:function(){this.drawBox&&this.drawBox.deactivate()},getGeometryInfo:function(){var a={status:0,geometry:null},b=this._getStatusOfSearchDistance();0>b?(a.status=
-1,a.geometry=null,this.searchDistance.tryShowValidationError()):0===b?(a.geometry=this._getGeometryFromDrawBox(),a.status=a.geometry?1:0):0<b&&(0<this.bufferLayer.graphics.length&&(a.geometry=this.bufferLayer.graphics[0].geometry),a.status=a.geometry?1:0);return a},_getGeometryFromDrawBox:function(){var a=null,b=this.drawBox.getFirstGraphic();b&&(a=b.geometry);return a},_getGeometryFromBufferLayer:function(){var a=null;0<this.bufferLayer.graphics.length&&(a=this.bufferLayer.graphics[0].geometry);
return a},_getStatusOfSearchDistance:function(){return this.searchDistance.getStatus()},_onSearchDistanceChange:function(){this._updateBuffer()},_onDrawBoxClear:function(){this._clearBufferLayer()},_onDrawEnd:function(){this._updateBuffer()},_clearBufferLayer:function(){this.bufferLayer&&this.bufferLayer.clear()},_updateBuffer:function(){this._clearBufferLayer();if(0<this._getStatusOfSearchDistance()){var a=this._getGeometryFromDrawBox();if(a){var b=this.searchDistance.getData(),a=f.simplify(a),c=
a.spatialReference,d=null,d=c.isWebMercator()||4326===c.wkid?f.geodesicBuffer(a,b.distance,b.bufferUnit,!0):f.buffer(a,b.distance,b.bufferUnit,!0),a=new s(d);this.bufferLayer.add(a)}}},destroy:function(){this.bufferLayer&&this.map.removeLayer(this.bufferLayer);this.bufferLayer=null;this.inherited(arguments)}})});