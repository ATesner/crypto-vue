webpackJsonp([0],{0:function(t,e){},A0nz:function(t,e){},M93x:function(t,e,s){"use strict";var r=s("xJD8"),n=s.n(r),a=s("hYiK");var c=function(t){s("A0nz")},o=s("VU/8")(n.a,a.a,!1,c,null,null);e.default=o.exports},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("7+uW"),n=s("M93x"),a=s("8+8L");r.a.config.productionTip=!1,r.a.use(a.a),r.a.http.options.root="https://rest.coinapi.io/",r.a.http.headers.common["X-CoinAPI-Key"]="67A6161D-F28A-4CAC-944D-8D392FEEC26B",r.a.http.headers.common.Accept="application/json",r.a.component("app-item",{props:["name","symbol"],template:"<div><strong>{{name}}</strong>  ({{symbol}})</div>"}),new r.a({el:"#app",components:{App:n.default},template:"<App/>"})},hYiK:function(t,e,s){"use strict";var r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("nav",{attrs:{id:"navbar"}},[s("h1",[t._v("CRYPTO VUE")]),t._v(" "),s("div",{staticClass:"search-form"},[s("form",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.txtSearch,expression:"txtSearch"}],attrs:{id:"search-input",type:"text",maxlength:"10",placeholder:"Search Crypto"},domProps:{value:t.txtSearch},on:{blur:t.blurSearch,focus:t.focusSearch,keyup:t.searchCrypto,input:function(e){e.target.composing||(t.txtSearch=e.target.value)}}}),t._v(" "),s("button",{on:{click:t.clickSearch}}),t._v(" "),s("ul",{staticClass:"instant-result-list"},t._l(t.resultSearch,function(t,e){return s("li",{key:e,staticClass:"instant-result-item"},[s("app-item",{attrs:{name:t.name,symbol:t.asset_id}})],1)}))]),t._v(" "),s("h2",{attrs:{id:"search-label"},on:{click:t.clickSearch}},[t._v("Search")])])])])},staticRenderFns:[]};e.a=r},xJD8:function(t,e){t.exports={data:function(){return{cryptoAssets:[],resultSearch:[],txtSearch:""}},created:function(){var t=this;this.$http.get("v1/assets").then(function(e){console.log("all assets",e),t.cryptoAssets=e.body})},methods:{searchCrypto:function(t){var e=this;this.cryptoAssets.length>0&&this.txtSearch.length>=2?(document.querySelector(".instant-result-list").style.display="block",this.resultSearch=this.cryptoAssets.filter(function(t){return t.name.toLowerCase().includes(e.txtSearch.toLowerCase())||t.asset_id.toLowerCase().includes(e.txtSearch.toLowerCase())}),console.log("Asset Find",this.resultSearch)):(this.resultSearch=[],document.querySelector(".instant-result-list").style.display="none")},clickSearch:function(t){t.preventDefault(),document.querySelector(".search-form").classList.toggle("active"),document.querySelector(".instant-result-list").style.display="none",document.querySelector("input").focus()},blurSearch:function(){document.querySelector(".instant-result-list").style.display="none",0==document.querySelector("#search-input").value.length&&document.querySelector(".search-form").classList.remove("active")},focusSearch:function(){document.querySelector("#search-input").value.length>2&&document.querySelector(".search-form").classList.contains("active")&&(document.querySelector(".instant-result-list").style.display="block")}}}}},["NHnr"]);
//# sourceMappingURL=app.b74e76501758d9b9bd1e.js.map