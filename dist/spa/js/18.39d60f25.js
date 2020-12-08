(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{"81fb":function(e,a,t){e.exports=t.p+"img/logo-top-villa-do-vale-boutique-hotel-e-bistro.ae67bd53.png"},"8b24":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("q-page",{staticClass:"flex flex-center column bg-primary"},[s("img",{attrs:{src:t("81fb")}}),s("h3",{staticClass:"titulo text-secondary text-center"},[e._v("Trabalhe Conosco")]),s("div",{staticClass:"q-pa-md"},[s("div",{staticClass:"q-gutter-y-md",staticStyle:{"max-width":"600px"}},[s("q-card",[s("q-tabs",{staticClass:"bg-grey-3 text-grey-7 titulo",attrs:{"active-color":"secondary","indicator-color":"secondary",align:"justify"},model:{value:e.tab,callback:function(a){e.tab=a},expression:"tab"}},[s("q-tab",{attrs:{name:"cadastre",label:"Cadastre-se"}}),s("q-tab",{attrs:{name:"login",label:"Faça o seu login"}})],1),s("q-tab-panels",{staticClass:"bg-white text-grey",attrs:{animated:""},model:{value:e.tab,callback:function(a){e.tab=a},expression:"tab"}},[s("q-tab-panel",{attrs:{name:"cadastre"}},[s("q-form",{ref:"formCadastro",staticClass:"q-gutter-md",on:{reset:function(a){return a.preventDefault(),a.stopPropagation(),e.onReset(a)}}},[s("div",{staticClass:"text-h5 titulo text-secondary"},[e._v("Cadastre o seu currículo no nosso sistema")]),s("q-select",{attrs:{filled:"","option-value":"id","option-label":"nome","option-disable":"disponivel","emit-value":"","map-options":"",options:e.optionsVagas,"lazy-rules":"",rules:[e.$rules.required("Selecione a vaga")],label:"Vagas disponíveis"},model:{value:e.cadastro.vaga_id,callback:function(a){e.$set(e.cadastro,"vaga_id",a)},expression:"cadastro.vaga_id"}}),s("q-input",{attrs:{filled:"",label:"E-mail *","lazy-rules":"",rules:[e.$rules.required("Digite seu e-mail"),e.$rules.email("E-mail inválido")]},model:{value:e.cadastro.email,callback:function(a){e.$set(e.cadastro,"email",a)},expression:"cadastro.email"}}),s("q-input",{ref:"senhaCadastro",attrs:{filled:"",label:"Senha *","lazy-rules":"",type:e.isPwd1?"password":"text",rules:[e.$rules.required("Digite a senha"),e.$rules.minLength(5,"Sua senha deve ter ao menos 5 letras"),e.$rules.maxLength(10,"Sua senha não pode ser maior que 10 letras")]},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd1?"visibility_off":"visibility"},on:{click:function(a){e.isPwd1=!e.isPwd1}}})]},proxy:!0}]),model:{value:e.cadastro.senha,callback:function(a){e.$set(e.cadastro,"senha",a)},expression:"cadastro.senha"}}),s("q-input",{ref:"confirmaSenha",attrs:{filled:"",label:"Confirme a senha *","lazy-rules":"",type:e.isPwd2?"password":"text",rules:[e.$rules.required("Confirme a sua senha"),e.$rules.minLength(5,"Sua senha deve ter ao menos 5 letras"),e.$rules.maxLength(10,"Sua senha não pode ser maior que 10 letras"),e.$rules.sameAs(this.cadastro.senha,"A senha está diferente")]},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd2?"visibility_off":"visibility"},on:{click:function(a){e.isPwd2=!e.isPwd2}}})]},proxy:!0}]),model:{value:e.confirma_senha,callback:function(a){e.confirma_senha=a},expression:"confirma_senha"}}),s("div",{staticClass:"row justify-end"},[s("q-btn",{staticClass:"q-mt-md q-mt-md titulo",attrs:{type:"submit",loading:e.submitting,label:"Cadastrar",color:"primary","text-color":"secondary"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),e.onSubmitCadastro(a)}},scopedSlots:e._u([{key:"loading",fn:function(){return[s("q-spinner-facebook")]},proxy:!0}])})],1)],1)],1),s("q-tab-panel",{attrs:{name:"login"}},[s("q-form",{ref:"formLogin",staticClass:"q-gutter-md",on:{reset:function(a){return a.preventDefault(),a.stopPropagation(),e.onReset(a)}}},[s("div",{staticClass:"text-h6 titulo text-secondary"},[e._v("Acesse o nosso painel para você atualizar seu currículo")]),s("q-input",{attrs:{filled:"",label:"E-mail *","lazy-rules":"",rules:[e.$rules.required("Digite o seu e-mail"),e.$rules.email("E-mail inválido")]},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"mail"}})]},proxy:!0}]),model:{value:e.login.email,callback:function(a){e.$set(e.login,"email",a)},expression:"login.email"}}),s("q-input",{ref:"password",staticClass:"q-mt-md",attrs:{filled:"",label:"Senha",type:e.isPwd?"password":"text","lazy-rules":"",rules:[e.$rules.required("Digite a sua senha"),e.$rules.minLength(5,"Sua senha deve ter ao menos 5 letras"),e.$rules.maxLength(10,"Sua senha não pode ser maior que 10 letras")]},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"lock"}})]},proxy:!0},{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(a){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.login.senha,callback:function(a){e.$set(e.login,"senha",a)},expression:"login.senha"}}),s("router-link",{attrs:{to:"/esqueci-senha"}},[e._v("\n             esqueci a senha\n            ")]),s("div",{staticClass:"row justify-end"},[s("q-btn",{staticClass:"q-mt-md titulo",attrs:{type:"submit",loading:e.submitting,label:"Entrar",color:"primary","text-color":"secondary"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),e.onSubmitLogin(a)}},scopedSlots:e._u([{key:"loading",fn:function(){return[s("q-spinner-facebook")]},proxy:!0}])})],1)],1)],1)],1)],1)],1)])])},i=[],o={name:"PageIndex",computed:{requiredSenha(){return[e=>e&&e.length>5||"Sua senha deve ser > que 5 caracteres"]}},data(){return{isPwd:"password",isPwd1:"password",isPwd2:"password",tab:"cadastre",submitting:!1,confirma_senha:"",cadastro:{vaga_id:"",email:"",senha:""},login:{email:"",senha:""},optionsVagas:[]}},methods:{confirmaSenha(e){return e=>e!=this.$refs.senha.value||"Sua senha deve ser > que 5 caracteres"},isValidEmail(e){const a=/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;return a.test(e)||"E-mail inválido"},onSubmitCadastro(){this.submitting=!0,this.$refs.formCadastro.validate().then((e=>{if(e){let e=this.cadastro;this.$store.dispatch("user/cadastrar",{cadastro:e}).then((e=>{console.log(e),e.data.error?(console.log(e),this.$q.notify({icon:"warning",color:"negative",message:e.data.error}),this.submitting=!1,this.$refs.formCadastro.resetValidation()):this.$router.push("/formulario")})).catch((e=>{console.log(e),this.submitting=!1}))}else console.log("entrou no erro"),this.submitting=!1}))},onSubmitLogin(){this.submitting=!0,console.log(this.$refs.formLogin),this.$refs.formLogin.validate().then((e=>{if(e){let e=this.login;this.$store.dispatch("user/login",e).then((e=>{this.submitting=!1,e.data.error?(this.$q.notify({icon:"warning",color:"negative",message:e.data.error}),this.$refs.formCadastro.resetValidation()):this.$router.push("/formulario")})).catch((e=>{console.log(e),this.submitting=!1}))}else console.log("entrou no erro"),this.submitting=!1}))}},created(){this.$axios.get("vagasHome").then((e=>{this.optionsVagas=e.data})).catch((e=>{}))}},n=o,r=t("2877"),l=t("9989"),u=t("f09f"),c=t("429b"),d=t("7460"),m=t("adad"),p=t("823b"),f=t("0378"),h=t("ddd8"),g=t("27f9"),b=t("0016"),v=t("9c40"),y=t("e669"),q=t("eebe"),x=t.n(q),$=Object(r["a"])(n,s,i,!1,null,null,null);a["default"]=$.exports;x()($,"components",{QPage:l["a"],QCard:u["a"],QTabs:c["a"],QTab:d["a"],QTabPanels:m["a"],QTabPanel:p["a"],QForm:f["a"],QSelect:h["a"],QInput:g["a"],QIcon:b["a"],QBtn:v["a"],QSpinnerFacebook:y["a"]})}}]);