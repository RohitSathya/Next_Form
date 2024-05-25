import { promises as fs } from 'fs';
import path from 'path';

const usersFile = path.resolve('data', 'users.json');


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersFile, 'utf8'));

    if (!users[username] || users[username].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful',dat1:username,dat2:password });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
