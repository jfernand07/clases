import { Router, type Request, type Response } from 'express'
import { createBook, getBook, getBooks, updateBooks } from '../controllers/books.ts'
import { deleteBooks } from '../services/book.service.ts'

const router:Router = Router()
/**
 * http://localhost:3002/books
 */

router.get("/", (req:Request, res:Response)=> {
    console.log("vamos ok")
    getBooks(req, res)
})
router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.delete("/:id", deleteBooks);
router.put("/:id", updateBooks);

export { router }