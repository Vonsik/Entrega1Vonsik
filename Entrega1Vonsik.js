class TicketManager {
    constructor() {
      this.eventos = [];
      let precioBaseDeGanancia = 0; 
      this.productos = []; 
  
      Object.defineProperty(this, 'precioBaseDeGanancia', {
        get: function() {
          return precioBaseDeGanancia;
        },
        set: function(value) {
          precioBaseDeGanancia = value;
        }
      });
    }
  
    getEvento() {
      return this.eventos;
    }
  
    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date().toISOString().slice(0, 10)) {
      precio += precio * 0.15; // Agregar costo adicional al precio
  
      const evento = {
        nombre,
        lugar,
        precio,
        capacidad,
        fecha
      };
  
      this.eventos.push(evento);
    }
  
    idUsuario(idEvento, idUsuario) {
      const evento = this.eventos.find(evento => evento.id === idEvento);
      if (evento) {
        evento.participantes = evento.participantes || [];
        evento.participantes.push(idUsuario);
      }
    }
  
    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
      const eventoExistente = this.eventos.find(evento => evento.id === idEvento);
      if (eventoExistente) {
        const eventoCopia = {
          ...eventoExistente,
          localidad: nuevaLocalidad,
          fecha: nuevaFecha,
          id: Math.random().toString(36).substring(2, 15) 
        };
        eventoCopia.participantes = []; 
        this.eventos.push(eventoCopia);
      }
    }
  
    addProduct(producto) {
      this.productos.push(producto);
    }
  
    getProduct() {
      return this.productos;
    }
  
    getProductById(id) {
      return this.productos.find(producto => producto.id === id);
    }
  }

  

  const ticketManager = new TicketManager();

ticketManager.agregarEvento('Coldplay', 'Estadio Velez', 100);
ticketManager.agregarEvento('Sisnes Negros', 'Teatro Colón', 80, 200, '2023-07-20');

console.log(ticketManager.getEvento());

ticketManager.idUsuario(1, 'user1');
ticketManager.idUsuario(2, 'user2');

console.log(ticketManager.getEvento());

ticketManager.ponerEventoEnGira(1, 'Monumental', '2023-08-10');

console.log(ticketManager.getEvento());

ticketManager.addProduct({ id: 1, nombre: 'Camiseta', precio: 20 });
ticketManager.addProduct({ id: 2, nombre: 'Entrada VIP', precio: 50 });

console.log(ticketManager.getProduct());

console.log(ticketManager.getProductById(2));
