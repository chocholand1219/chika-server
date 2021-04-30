import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateAuthModel1594095596942 implements MigrationInterface {
  // private tableForeignKey = new TableForeignKey({
  //   columnNames: ['user_id'],
  //   referencedColumnNames: ['id'],
  //   referencedTableName: 'User',
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'Auth',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'code',
          type: 'varchar',
          length: '20',
        },
        {
          name: 'phone',
          type: 'varchar',
          length: '11',
          isPrimary: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    })
    await queryRunner.createTable(table)
    // await queryRunner.createForeignKey('Auth', this.tableForeignKey)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('Auth', this.tableForeignKey)
    await queryRunner.dropTable('Auth')
  }
}
