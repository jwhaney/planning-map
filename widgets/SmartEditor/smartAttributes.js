// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-class dojo/on dojo/query dijit/registry jimu/filterUtils jimu/BaseWidgetSetting".split(" "),function(n,p,m,f,c,q,l,r,s,t){return p([t],{_attrInspector:null,_fieldValidation:null,_feature:null,_fieldInfo:null,_gdbRequiredFields:null,_notEditableFields:null,_fieldNameToAlias:null,_fieldsWithRules:null,_attTable:null,_filterUtils:null,_mapLayer:null,OPERATORS:null,constructor:function(){this.inherited(arguments);m.mixin(this,arguments[0]);
this._mapLayer=this._feature.getLayer();this._processLayer();this._filterUtils=new s;this.OPERATORS=m.clone(this._filterUtils.OPERATORS);this._attTable=l("td.atiLabel",this._attrInspector.domNode);void 0===this._attTable||null===this._attTable||this._bindEvents()},_processLayer:function(){this._gdbRequiredFields=[];this._notEditableFields=[];this._fieldsWithRules=[];f.forEach(this._fieldInfo,function(a){var b=a.label;0<=b.indexOf('\x3ca class\x3d"asteriskIndicator"\x3e *\x3c/a\x3e')&&(b=b.replace('\x3ca class\x3d"asteriskIndicator"\x3e *\x3c/a\x3e',
""));!1===a.nullable&&!0===a.isEditable&&this._gdbRequiredFields.push(b);(!1===a.isEditable||!1===a.isEditableSettingInWebmap)&&this._notEditableFields.push(b);this._fieldValidation&&this._fieldValidation.hasOwnProperty(a.fieldName)&&this._fieldsWithRules.push(b)},this)},toggleFields:function(){if(!(void 0===this._attTable||null===this._attTable))if(!(void 0===this._fieldValidation||null===this._fieldValidation))if(!(void 0===this._feature||null===this._feature)){var a=null,b=[],d;f.forEach(this._fieldInfo,
m.hitch(this,function(c){var g=c.label;0<=g.indexOf('\x3ca class\x3d"asteriskIndicator"\x3e *\x3c/a\x3e')&&(g=g.replace('\x3ca class\x3d"asteriskIndicator"\x3e *\x3c/a\x3e',""));a=null;d=this.validateField(c.fieldName);a=d[1];!1===d[2]&&b.push({fieldName:c.fieldName});!0===d[0]&&this.toggleFieldOnAttributeInspector(g,a,d[2])}));return b}},validateField:function(a){var b=null;if(this._fieldValidation.hasOwnProperty(a)){if(0===this._fieldValidation[a].length)return[!1,null,!0];var d=[!1,null,null];
f.some(this._fieldValidation[a],function(c){if(void 0!==c.filter&&null!==c.filter&&(b=c.filter,d=[!0,null,null],this.processFilter(b,this._feature)))return"Required"===c.actionName?!1===this._feature.attributes.hasOwnProperty(a)?(d=[!0,c.actionName,!1],!0):null===this._feature.attributes[a]||""===this._feature.attributes[a]||Number.isNaN(this._feature.attributes[a])?(d=[!0,c.actionName,!1],!0):(d=[!0,c.actionName,!0],!0):(d=[!0,c.actionName,null,c.submitWhenHidden],!0)},this);return d}return[!1,null,
null]},_bindEvents:function(){void 0===this._attTable||null===this._attTable||0<this._attTable.length&&f.forEach(this._attTable,function(a){a=this._getRowInfo(a);-1!==this._fieldsWithRules.indexOf(a[3])&&"dijit.form.FilteringSelect"===a[2].declaredClass&&q(a[2],"change",m.hitch(this,this._smartComboValidate()))},this)},processFilter:function(a){var b=[];f.forEach(a.parts,function(a){if(a.hasOwnProperty("parts"))b.push(this.processFilter(a,this._feature));else{var c=null,g=null;a.valueObj.hasOwnProperty("value")&&
(c=a.valueObj.value);a.valueObj.hasOwnProperty("value1")&&(c=a.valueObj.value1);a.valueObj.hasOwnProperty("value2")&&(g=a.valueObj.value2);switch(a.valueObj.type){case "value":case "unique":b.push(this.validatePart(a.operator,this._feature.attributes[a.fieldObj.name],c,g,a.caseSensitive));break;case "field":b.push(this.validatePart(a.operator,this._feature.attributes[a.fieldObj.name],c,g,a.caseSensitive))}}},this);return this.ruleValid(b,a.logicalOperator)},ruleValid:function(a,b){var d=!1;if(void 0===
b||null===b)b="OR";f.some(a,function(a){if("OR"===b){if(!0===a)return d=!0;d=!1}else{if(!1===a)return d=!1,!0;d=!0}});return d},_isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},validatePart:function(a,b,d,c,g){var h=null;if(void 0===a||null===a)return!1;0===a.lastIndexOf("string",0)?!1===g&&(void 0!==b&&null!==b&&(b=String(b).toUpperCase()),void 0!==d&&null!==d&&(d=String(d).toUpperCase()),void 0!==c&&null!==c&&(c=String(c).toUpperCase())):0===a.lastIndexOf("date",0)&&(void 0!==d&&
null!==d&&(d=new Date(d)),void 0!==c&&null!==c&&(c=new Date(c)));switch(a){case this.OPERATORS.stringOperatorIs:if(b===d)return!0;break;case this.OPERATORS.stringOperatorIsNot:if(b!==d)return!0;break;case this.OPERATORS.stringOperatorStartsWith:if(null===b&&null===d)return!0;if(null===b&&null!==d)break;if(null!==b&&null===d)break;if(0===b.lastIndexOf(d,0))return!0;break;case this.OPERATORS.stringOperatorEndsWith:if(null===b&&null===d)return!0;if(null===b&&null!==d)break;if(null!==b&&null===d)break;
return this._endsWith(b,d);case this.OPERATORS.stringOperatorContains:if(null===b&&null===d)return!0;if(null===b&&null!==d)break;if(null!==b&&null===d)break;if(0<=String(b).toUpperCase().indexOf(d.toUpperCase()))return!0;break;case this.OPERATORS.stringOperatorDoesNotContain:if(null===b&&null===d)break;if(null===b&&null!==d||null!==b&&null===d)return!0;String(b).toUpperCase().indexOf(d.toUpperCase());break;case this.OPERATORS.stringOperatorIsBlank:return void 0===b||null===b||""===b;case this.OPERATORS.stringOperatorIsNotBlank:return void 0!==
b&&null!==b&&""!==b;case this.OPERATORS.numberOperatorIs:if(this._isNumeric(b))return String(b)===String(d);break;case this.OPERATORS.numberOperatorIsNot:if(this._isNumeric(b))return String(b)!==String(d);break;case this.OPERATORS.numberOperatorIsAtLeast:if(this._isNumeric(b)&&this._isNumeric(d))return Number(b)>=Number(d);break;case this.OPERATORS.numberOperatorIsLessThan:if(this._isNumeric(b)&&this._isNumeric(d))return Number(b)<Number(d);break;case this.OPERATORS.numberOperatorIsAtMost:if(this._isNumeric(b)&&
this._isNumeric(d))return Number(b)<=Number(d);break;case this.OPERATORS.numberOperatorIsGreaterThan:if(this._isNumeric(b)&&this._isNumeric(d))return Number(b)>Number(d);break;case this.OPERATORS.numberOperatorIsBetween:if(this._isNumeric(b)&&this._isNumeric(d)&&this._isNumeric(c))return Number(b)>Number(d)&&Number(b)<Number(c);break;case this.OPERATORS.numberOperatorIsNotBetween:if(this._isNumeric(b)&&this._isNumeric(d)&&this._isNumeric(c))return Number(b)<=Number(d)||Number(b)>=Number(c);break;
case this.OPERATORS.numberOperatorIsBlank:if(null===b||void 0===b||!1===this._isNumeric(b))return!0;break;case this.OPERATORS.numberOperatorIsNotBlank:if(null!==b&&void 0!==b&&!0===this._isNumeric(b))return!0;break;case this.OPERATORS.dateOperatorIsOn:if(void 0===b||null===b)break;if(void 0===d||null===d)break;h=new Date(b);return d.toDateString()===h.toDateString();case this.OPERATORS.dateOperatorIsNotOn:if(void 0===b||null===b)break;if(void 0===d||null===d)break;h=new Date(b);return d.toDateString()!==
h.toDateString();case this.OPERATORS.dateOperatorIsBefore:if(null===b||void 0===b)break;if(void 0===d||null===d)break;return b<d.getTime();case this.OPERATORS.dateOperatorIsAfter:if(null===b||void 0===b)break;if(void 0===d||null===d)break;return b>d.getTime();case this.OPERATORS.dateOperatorIsBetween:if(null===b||void 0===b)break;if(void 0===d||null===d)break;if(void 0===c||null===c)break;return b>d.getTime()&&b<c.getTime();case this.OPERATORS.dateOperatorIsNotBetween:if(null===b||void 0===b)break;
if(void 0===d||null===d)break;if(void 0===c||null===c)break;return b<=d.getTime()||b>=c.getTime();case this.OPERATORS.dateOperatorIsBlank:if(null===b||void 0===b)return!0;break;case this.OPERATORS.dateOperatorIsNotBlank:if(null!==b&&void 0!==b)return!0}return!1},_processChildNodes:function(a,b){a.disabled=b;!0===b?a.style&&(a.style.pointerEvents="none"):a.style&&(a.style.pointerEvents="auto");f.forEach(a.childNodes,function(a){a.disabled=b;!0===b?a.style&&(a.style.pointerEvents="none"):a.style&&(a.style.pointerEvents=
"auto");0<a.childNodes.length&&this._processChildNodes(a,b)},this)},_smartComboValidate:function(){this.toggleFields()},_getRowInfo:function(a){var b=a.parentNode.childNodes[1].childNodes[0],c=null;1<a.parentNode.childNodes[1].childNodes.length&&(c=a.parentNode.childNodes[1].childNodes[1]);var e=a.childNodes[0].data;a=a.parentNode;var g=r.getEnclosingWidget(b);return[b,a,g,e,c]},_removeRequireFieldMarkings:function(a,b,d){var e=null;void 0===d||null===d?(c.contains(a,"dijitComboBoxError")&&c.remove(a,
"dijitComboBoxError"),c.contains(a,"dijitTextBoxError")&&c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitValidationTextBox")&&c.remove(a,"dijitValidationTextBox"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError"),e=l(".dijitValidationContainer",b),f.forEach(e,function(a){a.parentNode.removeChild(a)})):(e=m.isFunction(d.isValid)?d.isValid():!0,"dijit.form.TextBox"===d.declaredClass&&!0===e?(c.contains(a,"dijitTextBoxError")&&
c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitValidationTextBox")&&c.remove(a,"dijitValidationTextBox"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError"),e=l(".dijitValidationContainer",b),f.forEach(e,function(a){a.parentNode.removeChild(a)})):"dijit.form.ValidationTextBox"===d.declaredClass&&!0===e?(c.contains(a,"dijitTextBoxError")&&c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitTextBoxDisabled")&&
c.remove(a,"dijitTextBoxDisabled"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError")):"dijit.form.DateTextBox"===d.declaredClass&&!0===e?(c.contains(a,"dijitTextBoxError")&&c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitValidationTextBox")&&c.remove(a,"dijitValidationTextBox"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError"),
e=l(".dijitValidationContainer",b),f.forEach(e,function(a){a.parentNode.removeChild(a)})):"dijit.form.TimeTextBox"===d.declaredClass&&!0===e?(c.contains(a,"dijitTextBoxError")&&c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitValidationTextBox")&&c.remove(a,"dijitValidationTextBox"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError"),e=l(".dijitValidationContainer",b),f.forEach(e,function(a){a.parentNode.removeChild(a)})):
"dijit.form.FilteringSelect"===d.declaredClass&&!0===e?(c.contains(a,"dijitTextBoxError")&&c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitComboBoxError")&&c.remove(a,"dijitComboBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError")):!0===e&&(c.contains(a,"dijitComboBoxError")&&c.remove(a,"dijitComboBoxError"),c.contains(a,"dijitTextBoxError")&&c.remove(a,"dijitTextBoxError"),c.contains(a,"dijitValidationTextBox")&&
c.remove(a,"dijitValidationTextBox"),c.contains(a,"dijitValidationTextBoxError")&&c.remove(a,"dijitValidationTextBoxError"),c.contains(a,"dijitError")&&c.remove(a,"dijitError"),e=l(".dijitValidationContainer",b),f.forEach(e,function(a){a.parentNode.removeChild(a)})))},_removeRedAst:function(a,b){if(-1===this._gdbRequiredFields.indexOf(b)){var c=l("a.asteriskIndicator",a);0<c.length&&f.forEach(c,function(a){a.parentNode.removeChild(a)})}},_removeHideRule:function(a){c.contains(a,"hideField")&&c.remove(a,
"hideField")},_removeDisableRule:function(a,b){-1===this._notEditableFields.indexOf(a)&&(c.contains(b,"dijitTextBoxDisabled")&&c.remove(b,"dijitTextBoxDisabled"),c.contains(b,"dijitComboBoxDisabled")&&c.remove(b,"dijitComboBoxDisabled"),c.contains(b,"dijitValidationTextBoxDisabled")&&c.remove(b,"dijitValidationTextBoxDisabled"),c.contains(b,"dijitDisabled")&&c.remove(b,"dijitDisabled"));this._processChildNodes(b,!1)},_remove:function(a,b,c,e,g){this._removeRequireFieldMarkings(c,e,g);this._removeRedAst(a[0],
b);this._removeDisableRule(b,c);this._removeHideRule(e)},toggleFieldOnAttributeInspector:function(a,b,d){if(void 0===this._gdbRequiredFields||null===this._gdbRequiredFields)this._gdbRequiredFields=[];if(void 0===this._notEditableFields||null===this._notEditableFields)this._notEditableFields=[];if(!(void 0===this._attTable||null===this._attTable)&&0<this._attTable.length){var e=n.filter(this._attTable,m.hitch(this,function(b){return b.childNodes&&0<b.childNodes.length&&b.childNodes[0].data?b.childNodes[0].data===
a:!1})),g=null;if(null!==e&&0<e.length){var h=this._getRowInfo(e[0]),k=h[0],g=h[4],f=h[1],h=h[2];if(void 0!==h&&null!==h)switch(b){case "Hide":this._removeRequireFieldMarkings(k,f,h);this._removeRedAst(e[0],a);this._removeDisableRule(a,k);c.add(f,"hideField");break;case "Disabled":this._removeRedAst(e[0],a);this._removeHideRule(f);this._removeRequireFieldMarkings(k,f,h);c.add(k,["dijitValidationTextBox","dijitTextBoxDisabled","dijitComboBoxDisabled","dijitValidationTextBoxDisabled","dijitDisabled"]);
this._processChildNodes(k,!0);null!==g&&(this._removeRequireFieldMarkings(g,f,h),c.add(g,["dijitValidationTextBox","dijitTextBoxDisabled","dijitComboBoxDisabled","dijitValidationTextBoxDisabled","dijitDisabled"]),this._processChildNodes(g,!0));break;case "Required":this._removeDisableRule(a,k);this._removeHideRule(f);!0===d?this._removeRequireFieldMarkings(k,f,h):"dijit.form.TextBox"===h.declaredClass?(g=l(".dijitValidationContainer",f),0===g.length&&(b=document.createElement("div"),b.setAttribute("class",
"dijitReset dijitValidationContainer"),d=document.createElement("input"),d.setAttribute("class","dijitReset dijitInputField dijitValidationIcon dijitValidationInner"),d.setAttribute("value","x"),d.setAttribute("type","text"),d.setAttribute("tabindex","-1"),d.setAttribute("readonly","readonly"),d.setAttribute("role","presentation"),b.appendChild(d),k.insertBefore(b,k.childNodes[0])),c.add(k,["dijitTextBoxError","dijitValidationTextBox","dijitValidationTextBoxError","dijitError"])):"dijit.form.ValidationTextBox"===
h.declaredClass?(g=l(".dijitValidationContainer",f),c.add(k,["dijitTextBoxError","dijitValidationTextBox","dijitValidationTextBoxError","dijitError"])):"dijit.form.FilteringSelect"===h.declaredClass?c.add(k,["dijitTextBoxError","dijitComboBoxError","dijitError","dijitValidationTextBoxError"]):c.add(k,["dijitTextBoxError","dijitError"]);0===l("a.asteriskIndicator",e[0]).length&&(k=document.createElement("a"),k.setAttribute("class","asteriskIndicator"),k.innerHTML=" *",e[0].appendChild(k));break;case "Value":break;
default:this._remove(e,a,k,f,h)}}}}})});