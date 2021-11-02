module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    "Pessoa",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_pessoa",
      },
      nome: {
        type: DataTypes.STRING(100),
        field: "nm_pessoa",
      },
      dataNascimento: {
        type: DataTypes.DATEONLY,
        filed: "dt_pessoa",
      },
      idade: {
        type: DataTypes.INTEGER,
        filed: "idd_pessoa",
      },
      cep: {
        type: DataTypes.STRING(8),
        field: "cep_pessoa",
      },
      cidade: {
        type: DataTypes.STRING(100),
        field: "cdd_pessoa",
      },
      uf: {
        type: DataTypes.STRING(2),
        field: "uf_pessoa",
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { model: "NEG_USUARIO", key: "id_usuario" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: false,
      tableName: "NEG_PESSOA",
    }
  );

  return Pessoa;
};
