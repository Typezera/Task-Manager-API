export type DatabaseType =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'cockroachdb'
  | 'sqlite'
  | 'mssql'
  | 'sap'
  | 'oracle'
  | 'cordova'
  | 'nativescript'
  | 'react-native'
  | 'sqljs'
  | 'mongodb'
  | 'aurora-mysql'
  | 'aurora-postgres'
  | 'expo'
  | 'better-sqlite3';

export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
