module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_usuario",
      },
      email: {
        type: DataTypes.STRING(100),
        field: "email_usuario",
      },
      senha: {
        type: DataTypes.STRING(),
        field: "senha_usuario",
      },
    },
    {
      timestamps: false,
      tableName: "NEG_USUARIO",
    }
  );

  return Usuario;
};
