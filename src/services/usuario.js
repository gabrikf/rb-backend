import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "./common";

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;
const ENTITY_NAME = "Usuario";

export const createUser = async (email, senha) => {
  const hashPasswd = bcrypt.hashSync(senha, salt);
  const exists = await db.findByEmail(ENTITY_NAME, email);
  if (exists) {
    throw new Error("esse email ja está em uso. Use outro, por favor...");
  }
  const newUser = await db.create(ENTITY_NAME, { email, senha: hashPasswd });
  const token = sign(
    {
      email,
      id: newUser.id,
    },
    secret,
    { expiresIn: "2 days" }
  );
  return {
    token,
    email,
  };
};

export const login = async (emailDigitado, senhaDigitada) => {
  try {
    const { email, senha, id } = await db.findByEmail(
      ENTITY_NAME,
      emailDigitado
    );
    if (bcrypt.compareSync(senhaDigitada, senha)) {
      const token = sign(
        {
          email,
          id,
        },
        secret,
        { expiresIn: "2 days" }
      );
      return {
        success: true,
        token,
        email,
      };
    }
    throw new error();
  } catch (e) {
    return {
      error: { messege: "wrong credentials." },
      success: false,
    };
  }
};
