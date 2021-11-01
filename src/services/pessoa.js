import db from "./common";

const ENTITY_NAME = "Pessoa";

export const getById = (id, params) => {
  return db.getById(ENTITY_NAME, id, params);
};
export const getByFilter = (filter, params) => {
  return db.getByFilter(ENTITY_NAME, filter, params);
};
export const getAndCountByFilter = (filter, params) => {
  return db.getAndCountByFilter(ENTITY_NAME, filter, params);
};
export const countByFilter = (filter, params) => {
  return db.countByFilter(ENTITY_NAME, filter, params);
};

export const findAll = () => {
  return db.findAll(ENTITY_NAME);
};
export const findAllPaginated = (currentPage, itensPerPage) => {
  return db.findAllPaginated(ENTITY_NAME, currentPage, itensPerPage);
};
export const findAllPaginatedByUser = (
  currentPage,
  itensPerPage,
  id_usuario
) => {
  return db.findAllPaginatedByUser(
    ENTITY_NAME,
    currentPage,
    itensPerPage,
    id_usuario
  );
};
export const create = (obj) => {
  return db.create(ENTITY_NAME, obj);
};

export const update = (obj, id) => {
  return db.update(ENTITY_NAME, obj, id);
};
export const deleteRecord = (id) => {
  return db.deleteRecord(ENTITY_NAME, id);
};
