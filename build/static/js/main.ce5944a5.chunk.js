(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{154:function(e,t,n){(function(e){function r(e){return e&&"object"===typeof e&&"default"in e?e.default:e}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=r(o),a=r(n(12)),l=n(169),s=n(149),c=r(n(296)),d=r(n(91)),u=r(n(97)),h=r(n(92)),p=r(n(84)),m=n(88),f=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t},g=function(e){var t=e.style,n=e.node,r=e.handlers,o=e.theme;if(t.width<=0||t.height<=0)return null;var a=n.label&&t.orientLabel&&t.height>t.width;return i.createElement("g",{transform:"translate("+t.x+","+t.y+")"},i.createElement("rect",b({width:t.width,height:t.height,fill:t.fill?t.fill:t.color,strokeWidth:t.borderWidth,stroke:t.borderColor},r)),n.label&&i.createElement("text",{textAnchor:"middle",alignmentBaseline:"central",style:b({},o.labels.text,{fontSize:t.width<=t.height&&t.height<=55?"6px":t.width<=t.height&&t.height<=80?"9px":t.width<=t.height&&t.width<=13?"9px":t.width>=t.height&&t.width<=55?"6px":t.width>=t.height&&t.height<=13?"9px":t.width>=t.height&&t.width<=80?"9px":"12px",fill:t.labelTextColor,pointerEvents:"none"}),transform:"translate("+t.width/2+","+t.height/2+") rotate("+(a?-90:0)+")"},n.label))};g.propTypes={node:a.object.isRequired,style:a.shape({x:a.number.isRequired,y:a.number.isRequired,width:a.number.isRequired,height:a.number.isRequired,color:a.string.isRequired,borderWidth:a.number.isRequired,borderColor:a.string.isRequired,labelTextColor:a.string.isRequired,orientLabel:a.bool.isRequired}).isRequired,handlers:a.object.isRequired,theme:l.themePropType.isRequired};var y=function(e){var t=e.node,n=e.style,r=e.handlers;if(n.width<=0||n.height<=0)return null;var o=t.label&&n.orientLabel&&n.height>n.width;return i.createElement("div",b({id:(t.data&&t.data.id?t.data.id:t.id).replace(/[^\w]/gi,"-"),style:{boxSizing:"border-box",position:"absolute",top:n.y,left:n.x,width:n.width,height:n.height,background:n.color,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",borderWidth:n.borderWidth,borderStyle:"solid",borderColor:n.borderColor}},r),!1!==t.label&&i.createElement("span",{style:{color:n.labelTextColor,transform:"rotate("+(o?"-90":"0")+"deg)",WebkitUserSelect:"none",MozUserSelect:"none",MsUserSelect:"none",userSelect:"none"}},t.label))};y.propTypes={node:a.object.isRequired,style:a.shape({x:a.number.isRequired,y:a.number.isRequired,width:a.number.isRequired,height:a.number.isRequired,color:a.string.isRequired,borderWidth:a.number.isRequired,borderColor:a.string.isRequired,labelTextColor:a.string.isRequired,orientLabel:a.bool.isRequired}).isRequired,handlers:a.object.isRequired};var C={identity:a.oneOfType([a.string,a.func]).isRequired,leavesOnly:a.bool.isRequired,tile:l.treeMapTilePropType.isRequired,innerPadding:a.number.isRequired,outerPadding:a.number.isRequired,enableLabel:a.bool.isRequired,label:a.oneOfType([a.string,a.func]).isRequired,labelFormat:a.string,labelSkipSize:a.number.isRequired,orientLabel:a.bool.isRequired,borderWidth:a.number.isRequired,borderColor:a.any.isRequired,isInteractive:a.bool.isRequired,onClick:a.func.isRequired,tooltip:a.func},w=b({},C,{nodeComponent:a.func.isRequired},l.defsPropTypes),x=b({},C,{nodeComponent:a.func.isRequired}),T=b({},C,{pixelRatio:a.number.isRequired}),k={identity:"id",tile:"squarify",leavesOnly:!1,enableLabel:!0,label:"id",labelSkipSize:0,labelTextColor:"inherit:darker(1)",orientLabel:!0,innerPadding:0,outerPadding:0,borderWidth:0,borderColor:"inherit",isInteractive:!0,onClick:l.noop},E=b({},k,{nodeComponent:g,defs:[],fill:[]}),R=b({},k,{nodeComponent:y}),M=b({},k,{pixelRatio:e.window&&e.window.devicePixelRatio?e.window.devicePixelRatio:1}),L=Object.freeze({TreeMapPropTypes:w,TreeMapHtmlPropTypes:x,TreeMapCanvasPropTypes:T,TreeMapDefaultProps:E,TreeMapHtmlDefaultProps:R,TreeMapCanvasDefaultProps:M}),q=[l.withHierarchy(),l.withDimensions(),l.withColors({defaultColorBy:"depth"}),l.withTheme(),l.withMotion(),h(["identity"],function(e){var t=e.identity;return{getIdentity:l.getAccessorFor(t)}}),h(["borderColor"],function(e){var t=e.borderColor;return{getBorderColor:l.getInheritedColorGenerator(t)}}),h(["label","labelFormat"],function(e){var t=e.label,n=e.labelFormat;return{getLabel:l.getLabelGenerator(t,n)}}),h(["labelTextColor"],function(e){var t=e.labelTextColor;return{getLabelTextColor:l.getInheritedColorGenerator(t)}}),h(["width","height","tile","innerPadding","outerPadding"],function(e){var t=e.width,n=e.height,r=e.tile,o=e.innerPadding,i=e.outerPadding;return{treemap:s.treemap().size([t,n]).tile(l.treeMapTileFromProp(r)).round(!0).paddingInner(o).paddingOuter(i)}}),h(["root","treemap","leavesOnly","getIdentity","getColor"],function(e){var t=e.root,n=e.treemap,r=e.leavesOnly,o=e.getIdentity,i=e.getColor,a=c(t);n(a);var l=r?a.leaves():a.descendants();return{nodes:l=l.map(function(e){return e.path=function(e,t){return e.ancestors().map(function(e){return t(e.data)}).join(".")}(e,o),e.nodeHeight=e.height,e.x=e.x0,e.y=e.y0,e.width=e.x1-e.x0,e.height=e.y1-e.y0,e.data.color=e.color=i(b({},e.data,{depth:e.depth})),e.data.id=e.id=o(e.data),e.data.value=e.value,e})}}),h(["enableLabel","nodes","getLabel","labelSkipSize"],function(e){var t=e.enableLabel,n=e.nodes,r=e.getLabel,o=e.labelSkipSize;if(t)return{nodes:n.map(function(e){return e.nodeHeight>0||0!==o&&Math.min(e.width,e.height)<=o?e:b({},e,{label:r(e.data)})})}})],S=[h(["nodes","defs","fill"],function(e){var t=e.nodes,n=e.defs,r=e.fill;return{defs:l.bindDefs(n,t,r,{targetKey:"fill"})}})],P=function(e){var t=L[e.displayName+"DefaultProps"];switch(e.displayName){case"TreeMap":return d.apply(void 0,[u(t)].concat(q,S,[l.withMotion(),p]))(e);case"TreeMapHtml":return d.apply(void 0,[u(t)].concat(q,[l.withMotion(),p]))(e);case"TreeMapCanvas":return d.apply(void 0,[u(t)].concat(q,[p]))(e)}return e},O=function(e){var t=e.data;return b({x:t.x,y:t.y,width:t.width,height:t.height},l.colorMotionSpring(t.color))},j=function(e){return function(t){var n=t.data;return b({x:m.spring(n.x+n.width/2,e),y:m.spring(n.y+n.height/2,e),width:m.spring(0,e),height:m.spring(0,e)},l.colorMotionSpring(n.color,e))}},W=function(e){var t=e.node,n=e.theme,r=e.tooltip;return i.createElement(l.BasicTooltip,{id:t.id,value:t.value,enableChip:!0,color:t.color,theme:n,renderContent:"function"===typeof r?r.bind(null,b({node:t},t)):null})};W.propTypes={node:a.shape({id:a.oneOfType([a.string,a.number]).isRequired,value:a.number.isRequired,color:a.string.isRequired}).isRequired,theme:a.object.isRequired,tooltip:a.func};var N=p(W),I=function(e,t){var n=t.isInteractive,r=t.onClick,o=t.showTooltip,a=t.hideTooltip,l=t.theme,s=t.tooltip;if(!n)return{};var c=function(t){o(i.createElement(N,{node:e,theme:l,tooltip:s}),t)};return{onMouseEnter:c,onMouseMove:c,onMouseLeave:a,onClick:function(t){return r(e,t)}}},D=function(e){var t=e.nodes,n=e.nodeComponent,r=e.margin,o=e.outerWidth,a=e.outerHeight,s=e.theme,c=e.borderWidth,d=e.getBorderColor,u=e.defs,h=e.getLabelTextColor,p=e.orientLabel,f=e.animate,v=e.motionStiffness,g=e.motionDamping,y=e.isInteractive,C=e.onClick,w=e.tooltipFormat,x=e.tooltip,T={stiffness:v,damping:g},k=function(e,t,n){return I(e,{isInteractive:y,onClick:C,showTooltip:t,hideTooltip:n,theme:s,tooltipFormat:w,tooltip:x})};return i.createElement(l.Container,{isInteractive:y,theme:s},function(e){var v=e.showTooltip,g=e.hideTooltip;return i.createElement(l.SvgWrapper,{width:o,height:a,margin:r,defs:u,theme:s},!f&&i.createElement("g",null,t.map(function(e){return i.createElement(n,{key:e.path,node:e,style:{fill:e.fill,x:e.x0,y:e.y0,width:e.width,height:e.height,color:e.color,borderWidth:c,borderColor:d(e),labelTextColor:h(e),orientLabel:p},handlers:k(e,v,g),theme:s})})),f&&i.createElement(m.TransitionMotion,{willEnter:O,willLeave:j(T),styles:t.map(function(e){return{key:e.path,data:e,style:b({x:m.spring(e.x,T),y:m.spring(e.y,T),width:m.spring(e.width,T),height:m.spring(e.height,T)},l.colorMotionSpring(e.color,T))}})},function(e){return i.createElement("g",null,e.map(function(e){var t=e.style,r=e.data;return t.color=l.getInterpolatedColor(t),i.createElement(n,{key:r.path,node:r,style:b({},t,{fill:r.fill,borderWidth:c,borderColor:d(t),labelTextColor:h(t),orientLabel:p}),handlers:k(r,v,g),theme:s})}))}))})};D.propTypes=w,D.displayName="TreeMap";var H=P(D);H.displayName="TreeMap";var A=function(e){var t=e.nodes,n=e.nodeComponent,r=e.margin,o=e.outerWidth,a=e.outerHeight,s=e.theme,c=e.borderWidth,d=e.getBorderColor,u=e.getLabelTextColor,h=e.orientLabel,p=e.animate,f=e.motionStiffness,v=e.motionDamping,g=e.isInteractive,y=e.onClick,C=e.tooltipFormat,w=e.tooltip,x={stiffness:f,damping:v},T=function(e,t,n){return I(e,{isInteractive:g,onClick:y,showTooltip:t,hideTooltip:n,theme:s,tooltipFormat:C,tooltip:w})};return i.createElement(l.Container,{theme:s},function(e){var s=e.showTooltip,f=e.hideTooltip;return i.createElement("div",{style:{position:"relative",width:o,height:a}},!p&&i.createElement("div",{style:{position:"absolute",top:r.top,left:r.left}},t.map(function(e){return i.createElement(n,{key:e.path,node:e,style:{x:e.x,y:e.y,width:e.width,height:e.height,color:e.color,borderWidth:c,borderColor:d(e),labelTextColor:u(e),orientLabel:h},handlers:T(e,s,f)})})),p&&i.createElement(m.TransitionMotion,{willEnter:O,willLeave:j(x),styles:t.map(function(e){return{key:e.path,data:e,style:b({x:m.spring(e.x,x),y:m.spring(e.y,x),width:m.spring(e.width,x),height:m.spring(e.height,x)},l.colorMotionSpring(e.color,x))}})},function(e){return i.createElement("div",{style:{position:"absolute",top:r.top,left:r.left}},e.map(function(e){var t=e.style,r=e.data;return t.color=l.getInterpolatedColor(t),i.createElement(n,{key:r.path,node:r,style:b({},t,{fill:r.fill,borderWidth:c,borderColor:d(t),labelTextColor:u(t),orientLabel:h}),handlers:T(r,s,f)})}))}))})};A.propTypes=x,A.displayName="TreeMapHtml";var B=P(A);B.displayName="TreeMapHtml";var F=function(e,t,n,r){return e.find(function(e){return l.isCursorInRect(e.x+t.left,e.y+t.top,e.width,e.height,n,r)})},z=function(e){function t(){var n,r;f(this,t);for(var o=arguments.length,a=Array(o),s=0;s<o;s++)a[s]=arguments[s];return n=r=v(this,e.call.apply(e,[this].concat(a))),r.handleMouseHover=function(e,t){return function(n){var o=r.props,a=o.isInteractive,s=o.nodes,c=o.margin,d=o.theme;if(a){var u=l.getRelativeCursor(r.surface,n),h=u[0],p=u[1],m=F(s,c,h,p);void 0!==m?e(i.createElement(N,{node:m,theme:d}),n):t()}}},r.handleMouseLeave=function(e){return function(){e()}},r.handleClick=function(e){var t=r.props,n=t.isInteractive,o=t.nodes,i=t.margin,a=t.onClick;if(n){var s=l.getRelativeCursor(r.surface,e),c=s[0],d=s[1],u=F(o,i,c,d);void 0!==u&&a(u,e)}},v(r,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.componentDidMount=function(){this.ctx=this.surface.getContext("2d"),this.draw(this.props)},t.prototype.componentDidUpdate=function(){this.ctx=this.surface.getContext("2d"),this.draw(this.props)},t.prototype.draw=function(e){var t=this,n=e.nodes,r=e.pixelRatio,o=e.margin,i=e.outerWidth,a=e.outerHeight,s=e.borderWidth,c=e.getBorderColor,d=e.enableLabel,u=e.getLabelTextColor,h=e.orientLabel,p=e.theme;this.surface.width=i*r,this.surface.height=a*r,this.ctx.scale(r,r),this.ctx.fillStyle=p.background,this.ctx.fillRect(0,0,i,a),this.ctx.translate(o.left,o.top),n.forEach(function(e){t.ctx.fillStyle=e.color,t.ctx.fillRect(e.x,e.y,e.width,e.height),s>0&&(t.ctx.strokeStyle=c(e),t.ctx.lineWidth=s,t.ctx.strokeRect(e.x,e.y,e.width,e.height))}),d&&(this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.font=p.labels.text.fontSize+"px sans-serif",n.filter(function(e){return void 0!==e.label}).forEach(function(e){var n=u(e),r=h&&e.height>e.width;t.ctx.save(),t.ctx.translate(e.x+e.width/2,e.y+e.height/2),t.ctx.rotate(l.degreesToRadians(r?-90:0)),t.ctx.fillStyle=n,t.ctx.fillText(e.label,0,0),t.ctx.restore()}))},t.prototype.render=function(){var e=this,t=this.props,n=t.outerWidth,r=t.outerHeight,o=t.pixelRatio,a=t.isInteractive,s=t.theme;return i.createElement(l.Container,{isInteractive:a,theme:s},function(t){var a=t.showTooltip,l=t.hideTooltip;return i.createElement("canvas",{ref:function(t){e.surface=t},width:n*o,height:r*o,style:{width:n,height:r},onMouseEnter:e.handleMouseHover(a,l),onMouseMove:e.handleMouseHover(a,l),onMouseLeave:e.handleMouseLeave(l),onClick:e.handleClick})})},t}(o.Component);z.propTypes=T,z.displayName="TreeMapCanvas";var _=P(z);_.displayName="TreeMapCanvas";t.TreeMap=H,t.ResponsiveTreeMap=function(e){return i.createElement(l.ResponsiveWrapper,null,function(t){var n=t.width,r=t.height;return i.createElement(H,b({width:n,height:r},e))})},t.TreeMapHtml=B,t.ResponsiveTreeMapHtml=function(e){return i.createElement(l.ResponsiveWrapper,null,function(t){var n=t.width,r=t.height;return i.createElement(B,b({width:n,height:r},e))})},t.TreeMapCanvas=_,t.ResponsiveTreeMapCanvas=function(e){return i.createElement(l.ResponsiveWrapper,null,function(t){var n=t.width,r=t.height;return i.createElement(_,b({width:n,height:r},e))})},t.TreeMapPropTypes=w,t.TreeMapHtmlPropTypes=x,t.TreeMapCanvasPropTypes=T,t.TreeMapDefaultProps=E,t.TreeMapHtmlDefaultProps=R,t.TreeMapCanvasDefaultProps=M}).call(this,n(3))},160:function(e,t,n){e.exports=n(395)},165:function(e,t,n){},335:function(e,t){},390:function(e,t,n){},395:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i=n(150),a=n.n(i),l=(n(165),n(11)),s=n(151),c=n(152),d=n(159),u=n(153),h=n(158),p=n(25),m=n(154),f=function(e){var t=e.data;return o.a.createElement(m.ResponsiveTreeMap,{root:{name:"crypto-signal",color:"#f3f9ef",children:t},identity:"name",value:"loc",innerPadding:3,outerPadding:4,label:function(e){return"".concat(e.name," ").concat(e.prch?e.prch+"% ":"")},labelSkipSize:8,labelTextColor:"inherit:darker(2.8)",colorBy:function(e){return e.color},borderWidth:1,borderColor:"inherit:darker(2.3)",motionDamping:35,motionStiffness:300,animate:!1,tooltip:function(e){return o.a.createElement("p",{style:{color:e.data.color}}," ","".concat(e.data.name," ").concat(e.data.loc?e.data.loc+"x":"")," ")},theme:{tooltip:{container:{color:"#fff",background:"#333"}}}})},b=n(155),v=n.n(b),g=n(49),y=n.n(g),C=n(156),w=n.n(C),x=(n(357),n(157)),T=n.n(x),k=function(e){var t=e.isLive,n=e.isActive,r=e.selected,i=e.handleClick,a=e.handleLiveClick;return o.a.createElement("header",{className:"App-header"},o.a.createElement("div",{className:"btn-group","data-toggle":"buttons",role:"group"},o.a.createElement("button",{value:"Live",onClick:a,className:"live btn  ".concat(t?"active btn-danger":"btn-primary")},"Live",t?o.a.createElement("div",{style:{color:"#ffffff"},className:"la-ball-scale-multiple la-dark la-sm"},o.a.createElement("div",null),o.a.createElement("div",null),o.a.createElement("div",null)):null),o.a.createElement("button",{disabled:!n,value:"5m",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["5m"])},"5m"),o.a.createElement("button",{disabled:!n,value:"15m",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["15m"])},"15m"),o.a.createElement("button",{disabled:!n,value:"30m",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["30m"])},"30m"),o.a.createElement("button",{disabled:!n,value:"1h",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["1h"])},"1H"),o.a.createElement("button",{disabled:!n,value:"4h",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["4h"])},"4H"),o.a.createElement("button",{disabled:!n,value:"8h",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["8h"])},"8H"),o.a.createElement("button",{disabled:!n,value:"1d",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["1d"])},"1D"),o.a.createElement("button",{disabled:!n,value:"1w",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["1w"])},"1W"),o.a.createElement("button",{disabled:!n,value:"1M",onClick:i,type:"button",className:"btn btn-secondary ".concat(r["1M"])},"1M")))},E=(n(390),{isActive:!0,selected:{"4h":"active"},isLive:!1,socket:null,nr:"",period:"",periodFormatted:"",totalCoins:0,data:{},_liveData:[]}),R=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).computeLimit=function(e){switch(e){case"5m":return 48;case"15m":return 16;case"30m":return 8;case"1h":case"4h":return 5;case"8h":case"1d":return 4;case"1w":case"1M":return 2}},n.connectSocket=function(e){var t=v()("http://localhost:3231/");n.setState({socket:t}),"string"!==typeof e&&n.setState({isLive:!n.state.isLive}),t.on("retrieve",function(e){var t=e[e.symbol],r=Object.keys(t),o=r[r.length-1],i=n.state.data[e.symbol].length-1,a=w()(n.state,{data:Object(l.a)({},e.symbol,Object(l.a)({},i,{volume:{$set:t[o].volume}}))});n.setState({data:a.data})});var r=Object.keys(n.state.selected)[0];y.a.post("http://localhost:3231/",{timestamp:e||r,limit:n.computeLimit(e||r)}).catch(function(e){return e})},n.getTreemapData=function(){var e=n.state.data,t=Object.keys(e);return t.length?t.map(function(t){var r=t,o=e[t][e[t].length-1],i=e[t][0],a=e[t].slice(0,-1),l=a.reduce(function(e,t,n,r){return e+=Number(t.volume)},0)/a.length,s=0!==l?(o.volume/l).toFixed(3):0,c=s>0?Math.round(100*s)/100:0,d=o.open,u=o.close,h=Math.abs(o.time-i.time)/36e5,p=d<u?u/d*100-100:100-d/u*100,m=n.computeColor(p);return{time:h,open:d,name:"USDT"==r.slice(-4)?r.slice(0,-4):r.slice(0,-3),loc:c,prch:p.toFixed(2),color:m}}):{name:"g",loc:32,prch:3,color:"red"}},n.computeColor=function(e){return e<0?e<-3?e<-6?e<-15?"#DB4B38":"#E97253":"#EE9778":"#fcd3bf":e>3?e>10?e>15?"#5FA964":"#ACD6A0":"#CDE7C2":"#e4efdc"},n.handleLiveClick=function(e){if(n.state.isLive)return n.state.socket.disconnect(),void n.setState({isLive:!1});n.connectSocket()},n.handleClick=function(e){var t=Object(p.a)(Object(p.a)(n));n.setState({selected:Object(l.a)({},e.target.value,"active"),isActive:!1}),n.state.isLive&&(n.state.socket.disconnect(),n.connectSocket(e.target.value)),y.a.get("http://localhost:3231/api/coins",{params:{timestamp:e.target.value}}).then(function(e){var n=e.data.result.reduce(function(e,t,n){return e[t.symbol]=t[t.symbol],e},{});t.setState({data:n,isActive:!0})}).catch(function(e){})},n.state=E,n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.a.get("http://localhost:3231/api/coins",{params:{timestamp:"4h"}}).then(function(t){var n=t.data.result.reduce(function(e,t,n){return e[t.symbol]=t[t.symbol],e},{});e.setState({data:n})}).catch(function(e){return e})}},{key:"render",value:function(){var e=this.state,t=e.isLive,n=e.isActive,r=e.selected,i=this.getTreemapData();return o.a.createElement("div",{className:"App"},o.a.createElement(k,{isLive:t,isActive:n,selected:r,handleClick:this.handleClick,handleLiveClick:this.handleLiveClick}),i.length>90&&n?o.a.createElement("div",{className:"tree"},o.a.createElement(f,{data:i})):o.a.createElement(T.a,{fadeIn:"none",className:"spinner"}))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[160,2,1]]]);
//# sourceMappingURL=main.ce5944a5.chunk.js.map