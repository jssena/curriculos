(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"4d65":function(t,a,e){},"83ae":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"q-pa-md full-width"},[e("q-table",{staticStyle:{"text-transform":"uppercase"},attrs:{filter:t.filter,data:t.data,columns:t.columns,color:"amber","selected-rows-label":t.getSelectedString,pagination:t.pagination,loading:t.loading,"row-key":"id",grid:t.list,"hide-header":t.list},on:{"update:pagination":function(a){t.pagination=a},request:t.onRequest},scopedSlots:t._u([{key:"item",fn:function(a){return[e("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-12 col-lg-12 grid-style-transition",style:a.selected?"transform: scale(0.95);":""},[e("q-card",{staticClass:"text-weight-medium",class:a.selected?"bg-grey-2":""},[e("q-card-section",{attrs:{horizontal:""}},[e("q-card-section",{staticClass:" flex flex-center",staticStyle:{width:"100px"}},[e("q-img",{staticClass:"rounded-borders",attrs:{src:a.row.foto}})],1),e("q-card-section",{staticClass:"col q-pt-xs"},[e("div",{staticClass:"text-caption"},[e("q-badge",[t._v(t._s(t._f("categVagas")(t.optionsVagas,a.row.vaga_id)))])],1),e("div",{staticClass:"text-h5 q-mt-sm q-mb-xs"},[t._v(t._s(a.row.nome)+", "),a.row.dataNascimento?[t._v(t._s(t._f("getIdade")(a.row.dataNascimento)))]:t._e()],2),e("div",{staticClass:"text-caption text-grey"},[t._v("\n               "+t._s(a.row.nacionalidade)+", "+t._s(a.row.estadoCivil)),e("br"),t._v("\n                "+t._s(a.row.endereco)),e("br"),t._v(t._s(a.row.cidade)+"\n              ")])]),e("div",{staticClass:"col-auto  q-pa-md"},[e("q-radio",{attrs:{"keep-color":"",val:1,color:"teal"},on:{input:function(e){return t.atualizaStatus(a.row)}},model:{value:a.row.status,callback:function(e){t.$set(a.row,"status",e)},expression:"props.row.status"}}),e("q-radio",{attrs:{"keep-color":"",val:2,color:"orange"},on:{input:function(e){return t.atualizaStatus(a.row)}},model:{value:a.row.status,callback:function(e){t.$set(a.row,"status",e)},expression:"props.row.status"}}),e("q-radio",{attrs:{"keep-color":"",val:3,color:"red"},on:{input:function(e){return t.atualizaStatus(a.row)}},model:{value:a.row.status,callback:function(e){t.$set(a.row,"status",e)},expression:"props.row.status"}})],1)],1),e("q-separator"),e("q-card-actions",[e("q-btn",{attrs:{flat:"",disable:""}},[e("q-icon",{attrs:{name:"settings_cell",color:"primary"}}),t._v("\n            "+t._s(a.row.telefoneCelular)+"\n            ")],1),e("q-btn",{attrs:{flat:""}},[e("q-icon",{attrs:{name:"mail",color:"primary"}}),t._v("\n              "+t._s(a.row.email)+"\n            ")],1),e("q-btn",{attrs:{flat:"",disable:""}},[e("q-icon",{attrs:{name:"phone",color:"primary"}}),t._v("\n              "+t._s(a.row.telefoneResidencial)+"\n            ")],1),e("q-btn",{attrs:{flat:"",disable:""}},[e("q-icon",{attrs:{name:"contact_phone",color:"primary"}}),t._v("\n              "+t._s(a.row.telefoneRecado)+"\n            ")],1),e("q-item",[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:"drive_eta",color:"primary"}})],1),e("q-item-section",[e("q-item-label",{staticClass:"text-weight-medium"},[a.row.cnh?[t._v(" \n\n                        Cat. "+t._s(a.row.categoria)+"/\n                        "),a.row.dirige?[t._v(" \n                          Dirijo\n                        ")]:[t._v(" \n                        Não Dirijo\n                        ")],t._v("/\n                        "),a.row.veiculoProprio?[t._v(" \n                          tenho veículo\n                        ")]:[t._v(" \n                          não tenho veículo\n                        ")]]:[t._v("Não")]],2)],1),e("q-avatar",{attrs:{icon:"check",color:"positive","text-color":"white",size:"24px"}})],1)],1),e("q-separator"),e("q-card-section",{attrs:{horizontal:""}},[e("q-card-section",{staticClass:"col"},[e("q-list",{attrs:{separator:""}},[e("q-item",{attrs:{disable:0==a.row.formacoes.length}},[e("q-item-section",{attrs:{avatar:""}},[e("q-avatar",{attrs:{color:"primary","text-color":"white",size:"24px"}},[t._v("\n                        "+t._s(a.row.formacoes.length)+"\n                      ")])],1),e("q-item-section",[e("q-item-label",[t._v("Formação")]),e("q-item-label",{attrs:{caption:"",lines:"2"}},[t._v(t._s(a.row.formacao)+",\n                        "),1==a.row.completo?[t._v("completo")]:[t._v("Não completo")]],2)],1)],1),t._l(a.row.formacoes,(function(a,i){return e("q-item",{key:i},[e("q-item-section",[e("q-item-label",[t._v(t._s(a.curso)+", "),e("span",{staticClass:"text-caption"},[t._v(t._s(a.instituicao))])]),e("q-item-label",{attrs:{caption:""}},[t._v("Ano de conclusão: "+t._s(a.anoConclusao))]),e("q-item-label",{attrs:{caption:"",lines:"2"}},[t._v(" "+t._s(a.habilidades))])],1)],1)}))],2)],1),e("q-separator",{attrs:{vertical:""}}),e("q-card-section",{staticClass:"col"},[e("q-list",{attrs:{separator:""}},[e("q-item",{attrs:{disable:0==a.row.cursos.length}},[e("q-item-section",{attrs:{avatar:""}},[e("q-avatar",{attrs:{color:"primary","text-color":"white",size:"24px"}},[t._v("\n                        "+t._s(a.row.cursos.length)+"\n                      ")])],1),e("q-item-section",[t._v("\n                      Cursos \n                    ")])],1),t._l(a.row.cursos,(function(a,i){return e("q-item",{key:i},[e("q-item-section",[e("q-item-label",[t._v(t._s(a.curso)+", "),e("span",{staticClass:"text-caption"},[t._v(t._s(a.instituicao))])]),e("q-item-label",{attrs:{caption:""}},[t._v("Ano de conclusão: "+t._s(a.anoConclusao)+" - Carga horária: "+t._s(a.cargaHoraria))]),e("q-item-label",{attrs:{caption:"",lines:"2"}},[t._v(" "+t._s(a.habilidades))])],1)],1)}))],2)],1),e("q-card-section",{staticClass:"col-3"},[e("q-list",{attrs:{separator:""}},[e("q-item",{attrs:{dense:"",disable:0==a.row.idiomas.length}},[e("q-item-section",{attrs:{avatar:""}},[e("q-avatar",{attrs:{color:"primary","text-color":"white",size:"24px"}},[t._v("\n                      "+t._s(a.row.idiomas.length)+"\n                    ")])],1),e("q-item-section",[t._v("\n                    Idiomas\n                  ")])],1),t._l(a.row.idiomas,(function(a,i){return e("q-item",{key:i},[e("q-item-section",[e("q-item-label",[t._v(t._s(a.idioma))]),e("q-item-label",{attrs:{caption:""}},[t._v(t._s(a.instituicao))])],1),e("q-item-section",{attrs:{side:""}},[e("div",{staticClass:"row items-center"},["Básico"==a.fluencia||"Intermediário"==a.fluencia?e("q-icon",{attrs:{name:"star",color:"orange",size:"24px"}}):t._e(),"Intermediário"==a.fluencia||"Avançado"==a.fluencia?e("q-icon",{attrs:{name:"star",color:"orange",size:"24px"}}):t._e(),"Avançado"==a.fluencia?e("q-icon",{attrs:{name:"star",color:"orange",size:"24px"}}):t._e()],1)])],1)}))],2)],1)],1),e("q-separator"),e("q-card-section",{attrs:{horizontal:""}},[e("q-separator",{attrs:{vertical:""}}),e("q-card-section",{staticClass:"col"},[e("q-list",{attrs:{separator:""}},[e("q-item",{attrs:{dense:"",disable:0==a.row.experiencias.length}},[e("q-item-section",{attrs:{avatar:""}},[e("q-avatar",{attrs:{color:"primary","text-color":"white",size:"24px"}},[t._v("\n                      "+t._s(a.row.experiencias.length)+"\n                    ")])],1),e("q-item-section",[t._v("\n                    Experiências\n                  ")])],1),t._l(a.row.experiencias,(function(a,i){return e("q-item",{key:i},[e("q-item-section",[e("q-item-label",[t._v(t._s(a.cargo)+", "),e("span",{staticClass:"text-caption"},[t._v(t._s(a.empresa))])]),e("q-item-label",{attrs:{caption:""}},[t._v(t._s(a.responsabilidades))]),e("q-item-label",{attrs:{caption:"",lines:"5"}},[t._v(t._s(a.comente))])],1),e("q-item-section",{attrs:{side:""}},[e("q-item-label",{attrs:{caption:""}},[t._v("entrada")]),e("q-item-label",[t._v(t._s(a.anoEntrada))]),"1"==a.atual?e("q-item-label",{attrs:{caption:""}},[t._v("Emprego atual")]):[e("q-item-label",{attrs:{caption:""}},[t._v("saída")]),e("q-item-label",[t._v(t._s(a.anoSaida))])]],2)],1)}))],2)],1),e("q-separator",{attrs:{vertical:""}}),e("q-card-section",{staticClass:"col"},[e("q-list",{attrs:{separator:""}},[e("q-item",[e("q-item-section",[t._v("\n                    Pesquisa\n                  ")])],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Como ficou sabendo da vaga?")])],1),e("q-item-section",{attrs:{side:""}},[e("q-item-label",[t._v(t._s(a.row.pesquisa1))]),a.row.pesquisa1_texto1?e("q-item-label",[t._v(t._s(a.row.pesquisa1_texto1))]):t._e(),a.row.pesquisa1_texto2?e("q-item-label",[t._v(t._s(a.row.pesquisa1_texto2))]):t._e()],1)],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Está disposto a mudar de cidade?")])],1),e("q-item-section",{attrs:{side:""}},[1==a.row.pesquisa2?e("q-icon",{attrs:{name:"check",color:"primary"}}):t._e(),0==a.row.pesquisa2?e("q-icon",{attrs:{name:"close",color:"negative"}}):t._e()],1)],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Tem recursos próprios para isso?")])],1),e("q-item-section",{attrs:{side:""}},[1==a.row.pesquisa3?e("q-icon",{attrs:{name:"check",color:"primary"}}):t._e(),0==a.row.pesquisa3?e("q-icon",{attrs:{name:"close",color:"negative"}}):t._e()],1)],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Tem amigos ou familiares em Blumenau ou proximidades?")])],1),e("q-item-section",{attrs:{side:""}},[1==a.row.pesquisa4?e("q-icon",{attrs:{name:"check",color:"primary"}}):t._e(),0==a.row.pesquisa4?e("q-icon",{attrs:{name:"close",color:"negative"}}):t._e()],1)],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Fuma?")])],1),e("q-item-section",{attrs:{side:""}},[1==a.row.pesquisa5?e("q-icon",{attrs:{name:"check",color:"primary"}}):t._e(),0==a.row.pesquisa5?e("q-icon",{attrs:{name:"close",color:"negative"}}):t._e()],1)],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Pratica exercícios físicos regularmente?")])],1),e("q-item-section",{attrs:{side:""}},[1==a.row.pesquisa6?e("q-icon",{attrs:{name:"check",color:"primary"}}):t._e(),0==a.row.pesquisa6?e("q-icon",{attrs:{name:"close",color:"negative"}}):t._e()],1)],1),e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Teve contato direto com o Corona")])],1),e("q-item-section",{attrs:{side:""}},[1==a.row.pesquisa7?e("q-icon",{attrs:{name:"check",color:"primary"}}):t._e(),0==a.row.pesquisa7?e("q-icon",{attrs:{name:"close",color:"negative"}}):t._e()],1)],1)],1)],1)],1),e("q-separator"),e("q-card-actions",{attrs:{align:"right"}},[e("q-btn",{attrs:{flat:"",type:"a",icon:"fab fa-whatsapp",color:"primary",disabled:!a.row.whatsapp,href:a.row.whatsapp?"https://api.whatsapp.com/send?phone=+55"+a.row.whatsapp+"&text=Olá":"",target:"_blank"}}),e("q-btn",{attrs:{flat:"",type:"a",icon:"fab fa-facebook",color:"blue",disabled:!a.row.facebook,href:t._f("formataLink")(a.row.facebook,"face"),target:"_blank"}}),e("q-btn",{attrs:{flat:"",type:"a",icon:"fab fa-linkedin",color:"blue-10",disabled:!a.row.linkedin,href:t._f("formataLink")(a.row.linkedin,"linke"),target:"_blank"}}),e("q-btn",{attrs:{flat:"",type:"a",icon:"fab fa-instagram",color:"pink",disabled:!a.row.instagram,href:t._f("formataLink")(a.row.instagram,"insta"),target:"_blank"}})],1)],1)],1)]}},{key:"pagination",fn:function(a){return[e("q-page-sticky",{attrs:{position:"top-left",offset:[18,300]}},[e("q-btn",{attrs:{icon:"chevron_left",color:"secondary",round:"",disable:a.isFirstPage},on:{click:a.prevPage}})],1),e("q-page-sticky",{attrs:{position:"top-right",offset:[18,300]}},[e("q-btn",{attrs:{icon:"chevron_right",color:"secondary",round:"",disable:a.isLastPage},on:{click:a.nextPage}})],1),e("div",{staticClass:"q-pa-sm"},[e("span",{staticStyle:{"font-family":"Arial, Helvetica, sans-serif"}},[t._v(t._s(a.pagination.page))]),t._v(" de "),e("span",{staticStyle:{"font-family":"Arial, Helvetica, sans-serif"}},[t._v(t._s(a.pagination.rowsNumber))])]),e("q-btn",{attrs:{icon:"chevron_left",color:"grey-8",round:"",dense:"",flat:"",disable:a.isFirstPage},on:{click:a.prevPage}}),e("q-btn",{attrs:{icon:"chevron_right",color:"grey-8",round:"",dense:"",flat:"",disable:a.isLastPage},on:{click:a.nextPage}})]}}])}),e("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:t.dialog.persistent,callback:function(a){t.$set(t.dialog,"persistent",a)},expression:"dialog.persistent"}},[e("q-card",{staticClass:"bg-red text-white",staticStyle:{width:"320px"}},[e("q-card-section",{staticClass:"column no-wrap flex-center"},[e("q-icon",{attrs:{name:"fa fa-trash",size:"30px"}}),e("p",[t._v(t._s(t.dialog.tituloRemove))]),e("div",{staticClass:"text-h6"},[t._v(t._s(t.dialog.nome))])],1),e("q-card-actions",{staticClass:"bg-white text-red",attrs:{align:"right"}},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:" cancelar "}}),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"remover "},on:{click:function(a){return t.removeItem()}}})],1)],1)],1)],1)},s=[],o=(e("a434"),e("ddb0"),e("bc3a"),e("fabd"),{name:"PageIndex",filters:{categVagas(t,a){let e=a,i=t.filter((t=>t.value===e));return i[0].label},getIdade(t){let a=t.split("/");return(new Date).getFullYear()-a[2]},formataLink(t,a){console.log(t);var e,i=t;return t?i.includes("http")?t:("face"==a?e="https://facebook.com/"+t:"insta"==a?e="https://instagram.com/"+t:"linke"==a&&(e="https://linkedin.com/in/"+t),e):t}},data(){return{pagina:"candidatos",funcao:"",vaga_id:0,optionsVagas:[{value:0,label:"Todos"},{value:1,label:"Recepcionista"},{value:2,label:"Concierge"},{value:3,label:"Maleiro"},{value:4,label:"Manobrista"},{value:5,label:"Mensageiro"},{value:6,label:"Garçom"},{value:7,label:"Maitre"},{value:8,label:"Barman"},{value:9,label:"Cozinheiro"},{value:10,label:"Auxiliar de cozinha"},{value:11,label:"Camareira"},{value:12,label:"Governanta"},{value:13,label:"Auxiliar de limpeza"},{value:14,label:"Zelador"},{value:15,label:"Auxiliar de manutenção"}],dialog:{id:0,nome:"",persistent:!1,tituloRemove:this.$t("temCertezaRemover")},list:!0,optionsCategoria:[],selected:[],filter:{vaga:0,status:0},text:"",loading:!1,tituloRemove:this.$t("temCertezaRemover"),pagination:{sortBy:"nome",descending:!1,page:1,rowsPerPage:1,rowsNumber:1},columns:[{name:"nome",required:!0,label:"Nome",align:"left",field:t=>t.nome,format:t=>""+t},{name:"celular",required:!0,label:"Celular",align:"left"},{name:"vaga",required:!0,label:"Vaga",align:"left"},{name:"email",required:!0,label:"E-mail",align:"left"},{name:"cnh",required:!0,label:"CNH/Categoria/Dirige?",align:"left"},{name:"redesSociais",required:!0,label:"Redes Sociais",align:"left"}],data:[]}},methods:{enviaObjParaEditar(t){this.$store.commit("admin/editarObjeto",t)},atualizaStatus(t){this.$store.dispatch("admin/update",{id:t.id,status:t.status,pagina:"candidatosStatus"}).then((t=>{this.requestPagination()}))},dialogItem(t,a){this.dialog.persistent=!0,this.dialog.nome=t,this.dialog.id=a},removeItem(){this.$store.dispatch("admin/deleteUsuario",this.dialog.id).then((t=>{this.requestPagination()}))},getSelectedString(){return 0===this.selected.length?"":`${this.selected.length} record${this.selected.length>1?"s":""} selected of ${this.data.length}`},requestPagination(){this.onRequest({pagination:this.pagination,filter:this.filter})},onRequest(t){let a=t.pagination.descending,e=t.pagination.page,i=t.pagination.rowsPerPage,s=t.pagination.rowsNumber,o=t.pagination.sortBy,r=t.filter;this.loading=!0;let n=0===i?s:i,l=(e-1)*i;this.$store.dispatch("admin/curriculos",{offset:l,limit:n,vaga_id:r.vaga,status:r.status}).then((t=>{let s=t.data.result,r=t.data.total;this.data.splice(0,this.data.length,...s),this.pagination.rowsNumber=r,this.pagination.page=e,this.pagination.rowsPerPage=i,this.pagination.sortBy=o,this.pagination.descending=a,this.loading=!1}))}},created(){"fase2"==this.$route.params.pagina&&(this.filter.status=1),this.$route.params.id&&(this.pagination.page=this.$route.params.id[0]),this.requestPagination()}}),r=o,n=(e("fd76"),e("2877")),l=e("eaac"),c=e("f09f"),d=e("a370"),m=e("068f"),p=e("58a81"),u=e("3786"),q=e("eb85"),g=e("4b7e"),v=e("9c40"),_=e("0016"),b=e("66e5"),f=e("4074"),h=e("0170"),w=e("cb32"),x=e("1c1c"),k=e("de5e"),y=e("24e8"),C=e("7f67"),P=e("eebe"),S=e.n(P),z=Object(n["a"])(r,i,s,!1,null,null,null);a["default"]=z.exports;S()(z,"components",{QTable:l["a"],QCard:c["a"],QCardSection:d["a"],QImg:m["a"],QBadge:p["a"],QRadio:u["a"],QSeparator:q["a"],QCardActions:g["a"],QBtn:v["a"],QIcon:_["a"],QItem:b["a"],QItemSection:f["a"],QItemLabel:h["a"],QAvatar:w["a"],QList:x["a"],QPageSticky:k["a"],QDialog:y["a"]}),S()(z,"directives",{ClosePopup:C["a"]})},fd76:function(t,a,e){"use strict";var i=e("4d65"),s=e.n(i);s.a}}]);