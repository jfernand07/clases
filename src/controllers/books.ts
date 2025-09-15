import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/error.handler.ts'
import { type HttpErrorStatus } from '../types/types.ts'
import { getBooks as getBooksService } from '../services/book.service.ts';
import { deleteBooks as deleteBookService } from '../services/book.service.ts';
import { createBook as createBookService } from '../services/book.service.ts';
import { updateBooks as NewUpdateBook } from '../services/book.service.ts';
import type { IBook } from '../interfaces/book.interface.ts';

const getBook = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        const { id } = req.params
        if (id) {
            getBooks(req, res)
        }
    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const getBooks = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        getBooksService().then((response) => {
            console.log(response)
            res.send(response)
        })
    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}

const deleteBooks = (req: Request, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    try {
        const { id } = req.params
        if (id) {
            deleteBookService(id).then((response) => {
                console.log(response)
                res.send(response)
            })
        }

    } catch (err) {
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}


const createBook = async (req: Request, res: Response) => {
  try {
    const { id, author, name,ouwner }:IBook = req.body;

    if (!id || !author || !name || !ouwner) {
      return res.status(400).json({ error: "Missing required fields: title, author, year" });
    }

    if (typeof id !== "string" || typeof author !== "string" || typeof name !== "string" || typeof ouwner !== "string") {
      return res.status(400).json({ error: "Invalid data types for title, author or year" });
    }

    const newBook = await createBookService({ id, author, name, ouwner });
    console.log("Libro creado:");
            console.log(Response)
            res.send(Response)
    return res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBooks =  (req: Request, res: Response) => {
    let statusCode:HttpErrorStatus = 500;
    try {
         const { id } = req.params
        if (id) {
            const data = req.body;
            const updatedBook = NewUpdateBook(id, data);
            res.send(updatedBook);
        }
    }catch(err){
        handleHttp(res, "Something crashed your app", statusCode, err)
    }
}
export { getBook, getBooks, deleteBooks, createBook, updateBooks}