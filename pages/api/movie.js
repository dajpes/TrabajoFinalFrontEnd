import axios from "axios"

export default (req, res) => {
  console.log(req);
  res.status(200).json({ name: 'John Doe' })
}
