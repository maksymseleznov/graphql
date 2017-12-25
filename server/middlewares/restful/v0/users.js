
export const LIST = (req, res, next) => {
  res.status(200).json({ version: 0, method: 'LIST' })
}

export const GET = (req, res, next) => {
  res.status(200).json({ version: 0, method: 'GET' })    
}

export const POST = (req, res, next) => {
  res.status(200).json({ version: 0, method: 'POST' })
}

export const PUT = (req, res, next) => {
  res.status(200).json({ version: 0, method: 'PUT' })
}

export const DELETE = (req, res, next) => {
  res.status(200).json({ version: 0, method: 'DELETE' })
}

export default { LIST, GET, POST, PUT, DELETE }