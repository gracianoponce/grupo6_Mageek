"use strict";
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        "Categorias",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            categoria: {
                type: DataTypes.STRING(40),
                unique: true,
            },
        },
        {
            tableName: "categorias",
            timestamps: false,
        }
    );
    Categoria.associate = function (models) {
        Categoria.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "id_categoria",
        });
    };
    return Categoria;
};
