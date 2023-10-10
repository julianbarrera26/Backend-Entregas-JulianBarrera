const socketClient = io();

const form = document.getElementById("Form agregar producto");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputStatus = document.getElementById("status");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const formDelete = document.getElementById("Form delete product");
const inputIdDelete = document.getElementById("idDelete");




const listaDeProductosActualizados = (products) => {
  let divRealTimeProduct = document.getElementById("divRealTimeProduct");

  let html = "";

  products.forEach((product) => {
    html += `
             
              <h3>titulo: ${product.title}</h3>
              <p>ID: ${product.id}</p>
              <p>descripcion: ${product.description}</p>
              <p>precio: ${product.price}</p>
              <p>codigo: ${product.code}</p>
              <p>categoria: ${product.category}</p>
              <p>stock: ${product.stock}</p>
              <br></br>
      
          `;
    divRealTimeProduct.innerHTML = html;
  });
};


socketClient.on("productsInitial", (products) => {
  listaDeProductosActualizados(products);
});

form.onsubmit = (e) => {
  e.preventDefault();

  const title = inputTitle.value;
  const description = inputDescription.value;
  const status = inputStatus.value;
  const price = inputPrice.value;
  const code = inputCode.value;
  const stock = inputStock.value;
  const category = inputCategory.value;

  socketClient.emit("addProduct", {
    title,
    description,
    status,
    price,
    code,
    stock,
    category,
  });
  Swal.fire(
    'Producto agregado!',
    'Presiona el boton!',
    'success'
  )
  
};

socketClient.on("updateProduct", (products) => {
  listaDeProductosActualizados(products);
});



formDelete.onsubmit = (e) => {
  e.preventDefault();

  const idDelete = inputIdDelete.value;

  socketClient.emit("deleteProduct", idDelete);

  Swal.fire(
    'Producto eliminado!',
    'Presiona el boton!',
    'success'
  )
  
};

socketClient.on("productDelete", (products) => {
  listaDeProductosActualizados(products);
});