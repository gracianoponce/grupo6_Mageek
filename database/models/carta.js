"use strict";
module.exports = (sequelize, DataTypes) => {
    const Carta = sequelize.define(
        "Cartas",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            oracle: { type: DataTypes.STRING(200) },
            flavortext: { type: DataTypes.STRING(200) },
            mana: { type: DataTypes.STRING(30) },
            ataque: { type: DataTypes.STRING(10) },
            defensa: { type: DataTypes.STRING(10) },
            limitado: { type: DataTypes.INTEGER(1) },
            subtipo: { type: DataTypes.STRING(50) },
            id_arte: { type: DataTypes.INTEGER(12).UNSIGNED },
            id_tipo: { type: DataTypes.INTEGER(12).UNSIGNED },
            id_color: { type: DataTypes.INTEGER(12).UNSIGNED },
            id_edicion: { type: DataTypes.INTEGER(12).UNSIGNED },
            id_producto: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                unique: true,
            },
        },
        {
            tableName: "cartas",
            timestamps: false,
        }
    );
    Carta.associate = function (models) {
        Carta.belongsTo(models.Artes, {
            as: "artes",
            foreignKey: "id_arte",
        });
        Carta.belongsTo(models.Tipos, {
            as: "tipos",
            foreignKey: "id_tipo",
        });
        Carta.belongsTo(models.Colores, {
            as: "colores",
            foreignKey: "id_color",
        });
        Carta.belongsTo(models.Ediciones, {
            as: "ediciones",
            foreignKey: "id_edicion",
        });
        Carta.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "id_producto",
        });
    };
    return Carta;
};
