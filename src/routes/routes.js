import { auth } from "../middleware/auth";
import { pessoa, usuario } from "../services";
import chain from "./chain";

const express = require("express");
const router = express.Router();

// PERSONS ROUTES
router.get(
  `/person/:id(\\d+)`,
  auth,
  chain(async (req, res, next) => {
    const pessoaModel = await pessoa.getById(req.params.id);
    res.send(pessoaModel);
  })
);
router.get(
  `/person`,
  auth,
  chain(async (req, res, next) => {
    const { itensPerPage, currentPage } = req.query;
    const pessoaModel = await pessoa.findAllPaginated(
      itensPerPage,
      currentPage
    );

    res.send(pessoaModel);
  })
);
router.get(
  `/mypeople`,
  auth,
  chain(async (req, res, next) => {
    const { user_id } = req;
    const { itensPerPage, currentPage } = req.query;
    const pessoaModel = await pessoa.findAllPaginatedByUser(
      itensPerPage,
      currentPage,
      user_id
    );

    res.send(pessoaModel);
  })
);
router.post(
  `/person`,
  auth,
  chain(async (req, res, next) => {
    const { user_id } = req;

    const obj = req.body;
    const pessoaModel = await pessoa.create({ ...obj, id_usuario: user_id });

    res.send(pessoaModel);
  })
);

router.put(
  `/person/:id`,
  auth,

  chain(async (req, res, next) => {
    const obj = req.body;
    const { id } = req.params;

    const pessoaModel = await pessoa.update(obj, id);

    res.send(pessoaModel);
  })
);

router.delete(
  `/person/:id`,
  auth,
  chain(async (req, res, next) => {
    const { id } = req.params;
    await pessoa.deleteRecord(id);
    res.sendStatus(204);
  })
);

// USERS ROUTES
router.post(
  `/users`,
  chain(async (req, res, next) => {
    try {
      const { email, senha } = req.body;
      const pessoaModel = await usuario.createUser(email, senha);
      res.send(pessoaModel);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  })
);
router.post(
  `/login`,
  chain(async (req, res, next) => {
    try {
      const { email, senha } = req.body;

      const pessoaModel = await usuario.login(email, senha);

      res.send(pessoaModel);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  })
);

export default router;
