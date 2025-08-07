import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import Employee from './employee.model';

@Table({
    tableName: 'attendances',
    timestamps: true,
})
export default class Attendance extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => Employee)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    employeeId!: number;

    @BelongsTo(() => Employee)
    employee!: Employee;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        comment: 'Date of attendance',
    })
    date!: string;

    @Column({
        type: DataType.ENUM('Present', 'Absent', 'Holiday', 'Late', 'Leave'),
        allowNull: false,
        defaultValue: 'Absent',
        comment: 'Mark as Present/Absent/Holiday',
    })
    status!: 'Present' | 'Absent' | 'Holiday' | 'Late' | 'Leave';

    @Column({
        type: DataType.TIME,
        allowNull: true,
        comment: 'Check-in (In Time)',
    })
    inTime?: string;

    @Column({
        type: DataType.TIME,
        allowNull: true,
        comment: 'Check-out (Out Time)',
    })
    outTime?: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}
