import DB from "../../../db.json"

export default defineEventHandler((event) => {
  return DB.products
})