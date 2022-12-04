export default function (sequelize, DataTypes) {
	return sequelize.define('Schedules', {
		userId: DataTypes.STRING,
		dayId: DataTypes.STRING,
		value: DataTypes.STRING
	}, {
		timestamps:  false,
	});
};