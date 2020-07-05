"use strict";
module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define(
        "Facturas",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            id_usuario: { type: DataTypes.INTEGER(12).UNSIGNED },
            monto: { type: DataTypes.DECIMAL(20, 2) },
            fecha_de_pago: { type: DataTypes.DATE },
            detalle: { type: DataTypes.STRING(200) },
            borrado: { type: DataTypes.INTEGER(1) },
        },
        {
            tableName: "facturas",
            timestamps: false,
        }
    );
    Factura.associate = function (models) {
        Factura.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "id_usuario",
        });
        Factura.hasMany(models.Historial_de_compras, {
            as: "historial_de_compra",
            foreignKey: "id_factura",
        });
    };
    return Factura;
};
