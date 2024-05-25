import { promises as fs } from 'fs';
import path from 'path';

const usersFile = path.resolve('data', 'users.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersFile, 'utf8'));

    if (users[username]) {
      return res.status(400).json({ message: 'User already exists' });
    }

    users[username] = { password };
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User created' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
