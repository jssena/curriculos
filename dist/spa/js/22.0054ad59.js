(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[22],{"4ca5":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"q-pa-md full-width row content-start bg-white"},[e("div",{staticClass:"q-pa-md col-md-4"},[e("q-date",{staticStyle:{width:"100%"},attrs:{events:t.optionsData,mask:"DD/MM/YYYY"},on:{input:t.optionsFn},model:{value:t.days,callback:function(a){t.days=a},expression:"days"}})],1),e("div",{staticClass:"q-pa-md  col-md-4 col-xs-12 row content-center "},[e("q-list",{staticStyle:{width:"100%"},attrs:{dense:"",bordered:"",separator:""}},[e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"}},[e("q-item-section",[e("q-item-label",[t._v("Horários")])],1)],1),t._l(t.optionsHorarios,(function(a,s){return e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:s,attrs:{tag:"label"}},[e("q-item-section",[e("q-item-label",[t._v(t._s(a.horario))])],1),e("q-item-section",{attrs:{side:"",top:""}},[e("q-toggle",{attrs:{color:"primary","true-value":a.horario,val:a.horario},model:{value:t.horarios,callback:function(a){t.horarios=a},expression:"horarios"}})],1)],1)}))],2),e("div",{staticClass:"flex col-xs-12 justify-end"},[e("q-btn",{attrs:{name:"add",fill:"",color:"primary",label:"inserir na agenda"},on:{click:function(a){return t.insertAgenda()}}})],1)],1),e("div",{staticClass:"q-pa-md  col-md-4 col-xs-12 row"},[e("q-table",{staticClass:"col-md-12 col-xs-12",staticStyle:{"max-width":"100%"},attrs:{title:"Datas cadastradas",dense:"",data:t.data,columns:t.columns},scopedSlots:t._u([{key:"body",fn:function(a){return[e("q-tr",{attrs:{props:a}},[e("q-td",{key:"data"},[t._v("\n            "+t._s(a.row.data)+"\n          ")]),e("q-td",{key:"horarios"},[t._v("\n            "+t._s(a.row.horarios.length)+"\n          ")]),e("q-td",{key:"opcoes",staticClass:"q-gutter-sm",attrs:{props:a}},[e("q-btn",{staticClass:"q-ml-md float-right",attrs:{dense:"",flat:"",round:"",size:"sm",color:"negative",icon:"fas fa-trash"},on:{click:function(e){return t.deleteAgenda(a.row)}}})],1)],1)]}}])})],1)])},i=[],o=(e("26e9"),e("e6cf"),e("bc3a"),e("fabd"),e("18d6"),e("933b"));const r=[{horario:"13:30"},{horario:"14:00"},{horario:"14:30"},{horario:"15:00"},{horario:"15:30"},{horario:"16:00"},{horario:"16:30"},{horario:"17:00"},{horario:"17:30"}];var n={name:"PageIndex",filters:o["a"],computed:{list:{get(){return this.$store.getters["admin/list"]},set(t){this.$store.dispatch("admin/updateList",t)}}},data(){return{pagina:"agendamento",optionsHorarios:r,optionsData:[],days:"",horarios:[],data:[],columns:[{name:"data",required:!0,label:"Data",align:"left",field:t=>t.data,format:t=>""+t},{name:"horarios",align:"left",label:"Horários",field:t=>t.horarios.length},{name:"opcoes",align:"left",label:"Opcoes"}]}},methods:{insertAgenda(){if(""===this.days)this.$q.notify({icon:"warning",color:"positive",message:"Escolha uma data"});else{let t={};t.data=this.days,t.horarios=this.horarios,this.$store.dispatch("admin/addAgenda",t).then((t=>{this.getAgenda()}))}},deleteAgenda(t){let a={};a.id=t.id,this.$store.dispatch("admin/deleteAgenda",a).then((t=>{this.getAgenda()}))},getAgenda(){this.$store.dispatch("admin/getAgenda").then((t=>{this.data=t.data.result,setTimeout((()=>{this.optionsData=[],this.data.map((t=>{this.optionsData.push(this.convertDigitIn(t.data))}))}),300)}))},convertDigitIn(t){return t.split("/").reverse().join("/")},async optionsFn(t,a,e){console.log(t,a,e)}},created(){r.map((t=>this.horarios.push(t.horario))),this.getAgenda()}},l=n,d=e("2877"),c=e("52ee"),h=e("1c1c"),m=e("66e5"),p=e("4074"),u=e("0170"),g=e("9564"),f=e("9c40"),b=e("eaac"),v=e("bd08"),q=e("db86"),w=e("714f"),y=e("eebe"),k=e.n(y),D=Object(d["a"])(l,s,i,!1,null,null,null);a["default"]=D.exports;k()(D,"components",{QDate:c["a"],QList:h["a"],QItem:m["a"],QItemSection:p["a"],QItemLabel:u["a"],QToggle:g["a"],QBtn:f["a"],QTable:b["a"],QTr:v["a"],QTd:q["a"]}),k()(D,"directives",{Ripple:w["a"]})},"933b":function(t,a,e){"use strict";e("5319");a["a"]={formatData(t){let a=new Date(t);return a.getDate()+"/"+a.getMonth()+"/"+a.getFullYear()+" - "+a.getHours()+":"+a.getMinutes()},categVagas(t,a){if(!a)return"sem vaga";let e=a,s=t.filter((t=>t.id===e));return s[0].nome},getIdade(t){let a=t.split("/");return(new Date).getFullYear()-a[2]},formataLink(t,a){var e,s=t;return t?s.includes("http")?t:("face"==a?e="https://facebook.com/"+t:"insta"==a?e="https://instagram.com/"+t:"linke"==a&&(e="https://linkedin.com/in/"+t),e):t},formataCelular(t){return t.replace(/[^\d]+/g,"")}}}}]);