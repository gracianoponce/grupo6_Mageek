"use strict";
module.exports = (sequelize, DataTypes) => {
    const Foto = sequelize.define(
        "Fotos",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            url: {
                type: DataTypes.STRING(255),
                unique: true,
            },
            id_producto: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                unique: true,
            },
        },
        {
            tableName: "fotos",
            timestamps: false,
        }
    );
    Foto.associate = function (models) {
        Foto.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "id_producto",
        });
    };
    return Foto;
};
