import models from "../models";

export const getById = (entity, id, params) => {
  if (!id || id === 0) {
    throw new Error('Param "id" not found');
  }

  return models[entity].findByPk(id, params);
};

export const getByFilter = (entity, filter, params) => {
  return models[entity].scope(filter).findAll(params);
};
export const getAndCountByFilter = (entity, filter, params) => {
  return models[entity].scope(filter).findAndCountAll(params);
};
export const countByFilter = (entity, filter, params) => {
  return models[entity].scope(filter).count(params);
};
export const findAll = (entity) => {
  return models[entity].findAll();
};
export const findAllPaginated = async (
  entity,
  itensPerPage = 5,
  currentPage = 0
) => {
  const offset = itensPerPage * (currentPage - 1);
  const count = await models[entity].count();
  const hasNext = count / itensPerPage > currentPage;
  const results = await models[entity].findAll({
    limit: itensPerPage,
    offset: offset,
  });

  return {
    count,
    data: results,
    hasNext,
  };
};
export const findAllPaginatedByUser = async (
  entity,
  itensPerPage = 5,
  currentPage = 0,
  id_usuario
) => {
  const offset = itensPerPage * (currentPage - 1);
  const count = await models[entity].count({
    where: { id_usuario: id_usuario },
  });
  const hasNext = count / itensPerPage > currentPage;
  const results = await models[entity].findAll({
    where: { id_usuario },
    limit: itensPerPage,
    offset: offset,
  });

  return {
    count,
    data: results,
    hasNext,
  };
};

export const deleteRecord = (entity, id) => {
  return models[entity].destroy({ where: { id: id } });
};

export const create = (entity, obj) => {
  return models[entity].create(obj);
};

export const update = (entity, obj, id) => {
  return models[entity].update(obj, { where: { id: id } });
};

export const findByEmail = (entity, email) => {
  return models[entity].findOne({ where: { email: email } });
};

const raw = () => {
  return models.sql;
};

export default {
  getById,
  getByFilter,
  getAndCountByFilter,
  countByFilter,
  raw,
  findAll,
  findAllPaginated,
  findAllPaginatedByUser,
  create,
  update,
  deleteRecord,
  findByEmail,
};
