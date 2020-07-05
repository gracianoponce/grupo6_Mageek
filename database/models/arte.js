"use strict";
module.exports = (sequelize, DataTypes) => {
    const Arte = sequelize.define(
        "Artes",
        {
            id: {
                type: DataTypes.INTEGER(12).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
            artista: {
                type: DataTypes.STRING(70),
                unique: true,
            },
        },
        {
            tableName: "artes",
            timestamps: false,
        }
    );
    Arte.associate = function (models) {
        Arte.hasMany(models.Cartas, {
            as: "cartas",
            foreignKey: "id_arte",
        });
    };
    return Arte;
};
