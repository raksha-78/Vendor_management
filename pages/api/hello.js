// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectmongo from '../../database/conn.js'
import mongo from'../../database/conn.js'
export default function handler(req, res) {
  connectmongo() // here we access the databse to connect the databse un aour project
  res.status(200).json({ name: 'John Doe' })
}
