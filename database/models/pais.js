"use strict";
module.exports = (sequelize, DataTypes) => {
    const Pais = sequelize.define(
        "Paises",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            pais: {
                type: DataTypes.STRING(40),
                unique: true,
            },
        },
        {
            tableName: "paises",
            timestamps: false,
        }
    );
    Pais.associate = function (models) {
        Pais.hasMany(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_pais",
        });
    };
    return Pais;
};
