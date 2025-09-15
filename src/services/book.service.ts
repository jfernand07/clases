import {promises as fs } from "fs"
import { type IBook } from "../interfaces/book.interface.ts"
import {dirname, join } from "path"
import { fileURLToPath } from "url"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = join(__dirname, "../models/book.json")


const getBooks = async (): Promise<IBook[]> => {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data) as IBook[]
}

const getBooksID= async (id:string): Promise<IBook | null> => {
    const  books = await getBooks();
    const book = books.find(b => b.id === id)
    return book || null;
}

const createBook = async (newBook:IBook): Promise<IBook> => {
    const  books = await getBooks();
    books.push(newBook)
    await fs.writeFile(filePath, JSON.stringify(books, null, 4), "utf-8")
    return newBook;

}

const updateBooks = async (id:string, updateData: Partial<IBook>): Promise<IBook | null> => {
    const  books = await getBooks();
    const index = books.findIndex(b => b.id === id)
    if (index === -1) {
        return null
    }
    books[index] = {...books[index]!, ...updateData, id};
    await fs.writeFile(filePath, JSON.stringify(books,null,4), "utf-8")
    return books[index];

}

const deleteBooks = async (id:string): Promise<boolean> => {
    const books = await getBooks();
    const index = books.findIndex(b => b.id === id)
    if (index === -1) {
        return false
    }
    const [deleteBooks] = books.splice(index,1);
    await fs.writeFile(filePath, JSON.stringify(books,null,4), "utf-8")
    return true
}

export {getBooks, getBooksID, createBook, updateBooks, deleteBooks}
