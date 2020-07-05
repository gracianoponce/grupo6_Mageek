"use strict";
module.exports = (sequelize, DataTypes) => {
    const Permiso = sequelize.define(
        "Permisos",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            permiso: {
                type: DataTypes.STRING(20),
                unique: true,
            },
        },
        {
            tableName: "permisos",
            timestamps: false,
        }
    );
    Permiso.associate = function (models) {
        Permiso.hasMany(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_permiso",
        });
    };
    return Permiso;
};
