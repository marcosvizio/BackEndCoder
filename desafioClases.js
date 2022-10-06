console.log("Desafio N° 1 - Clases");
//Creo el 'class' Usuario
class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return console.log(`El nombre del usuario es ${this.nombre} ${this.apellido}.`);
    }
    addMascota(mascota) {
        this.mascotas.push(mascota)
    }
    countMascotas() {
        return console.log(`Tienes un total de ${this.mascotas.length} mascotas.`);
    }
    addBook(titulo,autor) {
        this.libros.push({titulo:titulo,autor:autor})
    }
    getBooksNames() {
        return console.log(`Tienes estos libros: ${this.libros.map(libro => libro.titulo)}.`);
    }
}
//Creamos un usuario con 'new'
const usuario1 = new Usuario('Marcos','Vizio',[{titulo:'El principito', autor:'Antoine de Saint-Exupéry'}],['Milo','Floppy','Tyrion']);
//Usamos los metodos creados en el 'class'
console.log("USUARIO 1");
usuario1.addMascota('Cacho');
usuario1.getFullName();
usuario1.countMascotas();
usuario1.addBook('Harry Potter', 'J. K. Rowling');
usuario1.getBooksNames();
//Creamos un nuevo usuario con 'new'
const usuario2 = new Usuario('Agustina','Monzón',[{titulo:'El alquimista', autor:'Paulo Coelho'}],['Odin'])
//Usamos los metodos creados en el 'class'
console.log("USUARIO 2");
usuario2.addMascota('Nala');
usuario2.getFullName();
usuario2.countMascotas();
usuario2.addBook('Cien años de soledad','Gabriel García Márquez');
usuario2.getBooksNames();
