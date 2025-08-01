import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
    tableName: 'user'
})
class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 100] 
        }
    })
    declare username: string;

    @Column({
        type: DataType.STRING(),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true 
        }
    })
    declare email: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100] 
        }
    })
    declare password: string;

    @Column({
        type: DataType.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
    })
    declare role: 'user' | 'admin';

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isActive: boolean;

}

export default User;