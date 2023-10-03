import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../modules/db";

export const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const valid = await comparePasswords(req.body.password, user.password);

  if (!valid) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
