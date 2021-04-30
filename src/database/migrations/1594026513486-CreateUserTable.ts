import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateUsersModel1594026513486 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'User',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '255',
          isPrimary: true,
        },
        {
          name: 'email',
          type: 'varchar',
          length: '50',
          isPrimary: true,
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
          name: 'phone',
          type: 'varchar',
          length: '11',
        },
        {
          name: 'birth_date',
          type: 'timestamp',
        },
        {
          name: 'kakao_id',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'naver_id',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'facebook_id',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    })
    await queryRunner.createTable(table)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User')
  }
}
