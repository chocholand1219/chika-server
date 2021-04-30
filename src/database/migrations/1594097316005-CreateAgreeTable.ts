import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateAgreeTable1594097316005 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'Agree',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '255',
          isPrimary: true,
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['sms', 'email'],
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'birth_date',
          type: 'datetime',
        },
      ],
    })
    await queryRunner.createTable(table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Agree')
  }
}
