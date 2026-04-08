import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'files', createdAt: 'created_at', updatedAt: 'updated_at' })
class File extends Model<File> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING(255) })
    filename: string;

    @Column({ type: DataType.STRING(255) })
    originalname: string;

    @Column({ type: DataType.STRING(150) })
    mimetype: string;

    @Column({ type: DataType.STRING(500) })
    path: string;

    @Column({ type: DataType.INTEGER })
    size: number;

    @Column({ type: DataType.STRING(50) })
    encoding: string;

    @Column({ type: DataType.DATE, defaultValue: new Date() })
    created_at?: Date;

    @Column({ type: DataType.DATE, defaultValue: new Date() })
    updated_at?: Date;
}

// Export the File model for use elsewhere in the application.
export default File;
