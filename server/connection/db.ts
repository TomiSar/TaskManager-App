import { DataSource } from 'typeorm';
import { Task } from '../models/taskEntity';
import colors from 'colors';
import mysql from 'mysql2/promise';

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });

  // Create DB if not exists
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`,
  );
  await connection.end();
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Task],
  synchronize: true,
});

export async function initializeDatabase() {
  await createDatabaseIfNotExists();
  try {
    await AppDataSource.initialize();
    console.log(
      colors.america('Data Source has been initialized!'),
    );
  } catch (error) {
    console.error(
      'Error during Data Source initialization:',
      error,
    );
  }
}
