import chai from "chai";
import supertest from "supertest";
import { app } from '../src/app.js'; 

const expect = chai.expect;
const request = supertest(app);

describe('Router de Productos', () => {
    const nuevoProducto = {
        title: 'motorola g20',
        description: 'lasfokisdjgoiafjgpoaskgpfosang',
        price: 120000,
        code: 'code-05',
        stock: 62,
        category: 'Celulares',
    };
    let productId; 

    it('POST /api/products: agregar un nuevo producto', async () => {
        const response = await request.post('/api/products').send(nuevoProducto);
        console.log('product', response.body);
        expect(response.body.status).to.equal('Succes');
        expect(response.body.product).to.have.property('_id');
        expect(response.body.product.title).to.be.ok;

        productId = response.body.product._id; 
    });

    it('PUT /api/products/:pid :  editar un producto', async () => {
        expect(productId).to.exist;
        const productoEditado = {
            title: 'samsung',
            description: 'Emjuihdifhdsopgkafamg klmao',
            price: 150000,
            stock: 50,
        };

    const editarResponse = await request.put(`/api/products/${productId}`).send(productoEditado);
    console.log('product editado', editarResponse.body);
    expect(editarResponse.status).to.equal(200);
    expect(editarResponse.body.status).to.equal('OK');
    expect(editarResponse.body.updatedProduct).to.have.property('title', productoEditado.title);
    });

    it('DELETE /api/products/:pid : debería eliminar un producto', async () => {
        expect(productId).to.exist;
        const testUser = {
            role: 'premiun',
            email: 'mail@mail.com',
        };
    
        try {
            const deleteResponse = await request.delete(`/api/products/${productId}`).send(testUser);
            console.log('Response:', deleteResponse.body.message);
            expect(deleteResponse).to.exist;
            expect(deleteResponse.status).to.be.oneOf([200, 404]);
    
            if (deleteResponse.status === 200) {
                expect(deleteResponse.body).to.exist;
                expect(deleteResponse.body.status).to.equal('Success');
                expect(deleteResponse.body.message).to.include(`producto ${productId} correctamente`);
            } else if (deleteResponse.status === 404) {
                expect(deleteResponse.text).to.exist;
                expect(deleteResponse.text).to.equal('{"status":"Error","message":"No tienes permisos para eliminar este producto"}');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });
});