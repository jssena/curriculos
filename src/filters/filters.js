export default{
    formatData(v){
      let date = new Date(v)
      return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' - '+date.getHours()+':'+date.getMinutes()
    },
    categVagas (value, v) {
      if(!v) return 'sem vaga'
      let needle = v
      let newValue = value.filter(i => i.id === needle)
      return newValue[0].nome
    },
    getIdade (value) {
      let ano = value.split("/")
      return new Date().getFullYear() - ano[2];
    },
    formataLink(value,nome){
      //console.log(value)
      var  newValue =value
      var  link;
      if(value){
        if(newValue.includes("http")  ){
          return value
        }
        if(nome == 'face') link = "https://facebook.com/"+value //.replace(/[\(\)\.\s-]+/g,'');
        else if(nome == 'insta')  link = "https://instagram.com/"+value
        else if(nome == 'linke')  link = "https://linkedin.com/in/"+value
        return link
      }else{
        return value
      }
    },
    formataCelular(value){
      return value.replace(/[^\d]+/g,'')
    }
}