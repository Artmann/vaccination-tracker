import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database';

export class Report extends Model {}

Report.init({
  numberOfDoses: DataTypes.INTEGER,
  timestamp: DataTypes.STRING
}, { sequelize, modelName: 'report' });
