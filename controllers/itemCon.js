import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { checkItem, checkIdItem } from '../util/validator.js'

import Item from '../models/itemsModel.js'

// Necesario para ES6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
 * ==============
 * Crear Item
 * ==============
 */

export const createItem = async (req, res) => {
    let params = req.body

    try {
        checkItem(params)
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos por enviar.'
        })
    }

    try {
        if (req.file) {
            params.img = req.file.filename
        }

        const item = new Item(params)
        await item.save()


        return res.status(200).json({
            status: 'success',
            item: params,
            message: 'Item created successfully'
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: 'error',
            message: 'Error while creating item'
        })
    }

}

/*
 * ==============
 * Obtener Item
 * ==============
 */

export const getItems = async (req, res) => {
    try {
        response = Item.find({})

        if (req.params.last) {
            response = response.limit(req.params.last)
        }

        let result = await response.sort({ _id: -1 })

        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: 'Error fetching articles.'
            });
        }

        return res.status(200).json({
            status: 'success',
            counter: result.length,
            result,
        })

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error getting items from database.'
        })
    }
}

/*
 * ==============
 * Delete Item
 * ==============
 */
export const deleteItem = async (req, res) => {
    try {
        let itemId = req.params.id
        checkIdItem(itemId)

        let result = await Item.findOneAndDelete({ _id: itemId })

        if (!result) {
            return res.status(400).json({
                status: 'error',
                message: 'Failed to delete item'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Item deleted successfully.',
            item: result
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message:
                "No se ha podido borrar el artículo, revise los argumentos/atributos.",
        });
    }
}

/*
 * ==============
 * Edit Item
 * ==============
 */

export const editItem = async (req, res) => {
  let ItemId = req.params.id;
  let params = req.body;

  try {
    checkItem(params);

    let result = await Item.findOneAndUpdate(
      { _id: ItemId },
      params,
      { new: true }
    );

    if (!result) {
      return res.status(400).json({
        status: "error",
        message: "Failed to update item",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Item updated successfully",
      articulo: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Missing fields and data ",
    });
  }
};

/*
 * ==============
 * Upload Item Image
 * ==============
 */
export const upload = async (req, res) => {
  try {
    // Validar file
    if (!req.file) {
      return res.status(404).json({
        status: "error",
        message: "Petition Invalidated.",
      });
    }

    let archivo = req.file.originalname;
    let extension = archivo.split(".").pop().toLowerCase();

    // Validar extensión
    const allowed = ["png", "jpg", "jpeg", "webp"];

    if (!allowed.includes(extension)) {
      fs.unlink(req.file.path, () => {
        return res.status(400).json({
          status: "error",
          message: "Incorrect image format.",
        });
      });
    }

    let itemId = req.params.id;

    let result = await Item.findOneAndUpdate(
      { _id: itemId },
      { img: req.file.filename },
      { new: true }
    );

    if (!result) {
      return res.status(500).json({
        status: "error",
        message: "Failed to upload img for item",
      });
    }

    return res.status(200).json({
      status: "success",
      message: result,
      fichero: req.file,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error al actualizar",
    });
  }
};

/*
 * ==============
 * Serve Image
 * ==============
 */
export const image = (req, res) => {
  let fichero = req.params.fichero;
  let ruta = path.join(__dirname, "../assets/items", fichero);

  fs.stat(ruta, (err, exist) => {
    if (!err && exist) {
      return res.sendFile(path.resolve(ruta));
    }

    return res.status(404).json({
      status: "error",
      message: "Image doesn'7 exist, please verify.",
      fichero,
    });
  });
};


/*
 * ==============
 * Browser item
 * ==============
 */
export const browser = async (req, res) => {
  let search = req.params.busqueda; // si tu ruta tiene el typo, lo dejo igual

  let response = Item.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { desc: { $regex: search, $options: "i" } },
      {category: { $regex: search, $options: "i" }}
    ],
  });

  let result = await response.sort({ _id: -1 });

  if (!result || result.length <= 0) {
    return res.status(404).json({
      status: "error",
      mensaje: "No se han encontrado artículos",
    });
  }

  return res.status(200).json({
    status: "success",
    articulos: result,
  });
};