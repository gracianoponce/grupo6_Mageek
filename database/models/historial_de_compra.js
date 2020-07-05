"use strict";
module.exports = (sequelize, DataTypes) => {
    const Historial_de_compra = sequelize.define(
        "Historial_de_compras",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            id_usuario: { type: DataTypes.INTEGER(12).UNSIGNED },
            id_producto: { type: DataTypes.INTEGER(12).UNSIGNED },
            id_factura: { type: DataTypes.INTEGER(12).UNSIGNED },
            cantidad: { type: DataTypes.INTEGER(12).UNSIGNED },
            borrado: { type: DataTypes.INTEGER(1) },
        },
        {
            tableName: "historial_de_compras",
            timestamps: false,
        }
    );
    Historial_de_compra.associate = function (models) {
        Historial_de_compra.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario",
        });
        Historial_de_compra.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "id_producto",
        });
        Historial_de_compra.belongsTo(models.Facturas, {
            as: "facturas",
            foreignKey: "id_factura",
        });
    };
    return Historial_de_compra;
};
