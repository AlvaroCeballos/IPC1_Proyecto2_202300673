class Usuario{

  constructor(codigo, nombre, edad, facultad, password){
      this.codigo = codigo;
      this.nombre = nombre;
      this.edad = edad;
      this.facultad = facultad;
      this.password = password;
  }
  
  
  saludar() {
      console.log(`¡Hola! Soy ${this.nombre} y estudio en la facultad de ${this.facultad}.`);
    }
  }
  
  module.exports = Usuario;
  