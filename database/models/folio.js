"use strict";
module.exports = (sequelize, DataTypes) => {
    const Folio = sequelize.define(
        "Folios",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            id_producto: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                unique: true,
            },
            color: { type: DataTypes.STRING(50) },
        },
        {
            tableName: "folios",
            timestamps: false,
        }
    );
    Folio.associate = function (models) {
        Folio.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "id_producto",
        });
    };
    return Folio;
};
