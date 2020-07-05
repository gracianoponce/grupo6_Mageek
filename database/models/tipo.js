"use strict";
module.exports = (sequelize, DataTypes) => {
    const Tipo = sequelize.define(
        "Tipos",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            tipo: {
                type: DataTypes.STRING(50),
                unique: true,
            },
        },
        {
            tableName: "tipos",
            timestamps: false,
        }
    );
    Tipo.associate = function (models) {
        Tipo.hasMany(models.Cartas, {
            as: "Cartas",
            foreignKey: "id_tipo",
        });
    };
    return Tipo;
};
