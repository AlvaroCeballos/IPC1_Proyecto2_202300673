class PublicacionObj {

  constructor(codigo, user, descripcion, imagen, categoria, anonimo) {
      this.codigo = codigo
      this.user = user 
      this.descripcion = descripcion;
      this.imagen = imagen;
      this.categoria= categoria;
      this.anonimo = anonimo;
      this.fechaHora = new Date();
      this.comentarios=[];
   
     
  }
}

module.exports = PublicacionObj;
