import { DataTypes } from "sequelize";
import { sequelize as DB } from "../database";

const Users = DB.define('users', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDay: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "waiting"
    }
});

export interface UsersInterface {
    id: number;
    firstName: string;
    lastName: string;
    birthDay: string;
    location: string;
    email: string;
    status: string;
}

export default Users;
















