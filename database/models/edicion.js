"use strict";
module.exports = (sequelize, DataTypes) => {
    const Edicion = sequelize.define(
        "Ediciones",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            anio: { type: DataTypes.STRING(50) },
            nombre: {
                type: DataTypes.INTEGER(3),
                unique: true,
            },
        },
        {
            tableName: "ediciones",
            timestamps: false,
        }
    );
    Edicion.associate = function (models) {
        Edicion.hasMany(models.Blisters, {
            as: "blisters",
            foreignKey: "id_edicion",
        });
        Edicion.hasMany(models.Cartas, {
            as: "cartas",
            foreignKey: "id_edicion",
        });
        Edicion.hasMany(models.Packs, {
            as: "packs",
            foreignKey: "id_edicion",
        });
    };
    return Edicion;
};
