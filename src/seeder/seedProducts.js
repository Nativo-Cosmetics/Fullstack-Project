import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Product from '../models/Product.js'

dotenv.config()

const seedProducts = async () => {
  try {
    await connectDB()

    const products = [
      { nombreProducto: 'Shampoo Nutritivo', descripcionProducto: 'Shampoo nutritivo para cabello seco.', precio: 8500, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Shampoo+Nutritivo' },
      { nombreProducto: 'Acondicionador Suave', descripcionProducto: 'Acondicionador para uso diario.', precio: 7200, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Acondicionador+Suave' },
      { nombreProducto: 'Jabón de Manos', descripcionProducto: 'Jabón líquido suave para manos.', precio: 2400, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Jab%C3%B3n+de+Manos' },
      { nombreProducto: 'Crema Hidratante Facial', descripcionProducto: 'Hidratación profunda para todo tipo de piel.', precio: 14500, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=Crema+Hidratante+Facial' },
      { nombreProducto: 'Shampoo Anticaspa', descripcionProducto: 'Control de caspa y fuerza capilar.', precio: 9800, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Shampoo+Anticaspa' },
      { nombreProducto: 'Jabón Exfoliante', descripcionProducto: 'Exfoliante corporal con micropartículas.', precio: 6500, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Jab%C3%B3n+Exfoliante' },
      { nombreProducto: 'Mascarilla Repara', descripcionProducto: 'Mascarilla intensiva reparadora.', precio: 21000, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Mascarilla+Repara' },
      { nombreProducto: 'Crema Corporal Suave', descripcionProducto: 'Aroma natural y rápida absorción.', precio: 9900, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=Crema+Corporal+Suave' },
      { nombreProducto: 'Desodorante Natural', descripcionProducto: 'Protección diaria sin sales de aluminio.', precio: 6400, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Desodorante+Natural' },
      { nombreProducto: 'Acondicionador Reparador', descripcionProducto: 'Restaura y desenreda el cabello.', precio: 12500, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Acondicionador+Reparador' },
      { nombreProducto: 'Aceite Nutritivo', descripcionProducto: 'Aceite para puntas y piel seca.', precio: 13200, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=Aceite+Nutritivo' },
      { nombreProducto: 'Jabón en Barra', descripcionProducto: 'Jabón artesanal en barra.', precio: 2100, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Jab%C3%B3n+en+Barra' },
      { nombreProducto: 'Shampoo Suave para Bebés', descripcionProducto: 'Formulado para piel sensible.', precio: 7600, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Shampoo+Beb%C3%A9s' },
      { nombreProducto: 'Crema Antiarrugas', descripcionProducto: 'Reduce líneas de expresión.', precio: 22500, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=Crema+Antiarrugas' },
      { nombreProducto: 'Gel Antibacterial', descripcionProducto: 'Limpia y desinfecta sin resecar.', precio: 3200, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Gel+Antibacterial' },
      { nombreProducto: 'Shampoo Volumen', descripcionProducto: 'Aporta volumen y movimiento.', precio: 8900, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Shampoo+Volumen' },
      { nombreProducto: 'Protector Solar Facial', descripcionProducto: 'SPF 50, textura ligera.', precio: 17800, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=Protector+Solar+Facial' },
      { nombreProducto: 'Acondicionador Sin Enjuague', descripcionProducto: 'Spray desenredante y protector.', precio: 11500, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=Acondicionador+Sin+Enjuague' },
      { nombreProducto: 'Jabón Íntimo', descripcionProducto: 'Cuidado delicado diario.', precio: 4300, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Jab%C3%B3n+%C3%8Dntimo' },
      { nombreProducto: 'Exfoliante Facial Suave', descripcionProducto: 'Renueva la piel con suavidad.', precio: 10200, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=Exfoliante+Facial' },
      { nombreProducto: 'Sérum Capilar', descripcionProducto: 'Sérum ligero para brillo intenso.', precio: 14200, categoria: 'Capilar', imagen: 'https://via.placeholder.com/800x800.png?text=S%C3%A9rum+Capilar' },
      { nombreProducto: 'Bálsamo Labial', descripcionProducto: 'Hidratación y protección labial.', precio: 1800, categoria: 'Cremas', imagen: 'https://via.placeholder.com/800x800.png?text=B%C3%A1lsamo+Labial' },
      { nombreProducto: 'Jabón Líquido Corporal', descripcionProducto: 'Limpieza suave y espumosa.', precio: 5400, categoria: 'Higiene', imagen: 'https://via.placeholder.com/800x800.png?text=Jab%C3%B3n+L%C3%ADquido+Corporal' }
    ]

    const bulkOps = products.map((p) => ({
      updateOne: {
        filter: { nombreProducto: p.nombreProducto },
        update: { $set: p },
        upsert: true,
      },
    }))

    const result = await Product.bulkWrite(bulkOps)
    console.log('Seed completado. Operaciones realizadas:', result.nUpserted || result.nModified || result.nMatched || result)
    process.exit(0)
  } catch (error) {
    console.error('Error al insertar productos de prueba:', error)
    process.exit(1)
  }
}

seedProducts()
