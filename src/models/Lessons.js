export default function (sequelize, DataTypes) {
	return sequelize.define('Lessons', {
		userId: DataTypes.STRING,
		lessonId: DataTypes.STRING,
		value: DataTypes.STRING,
	}, {
		timestamps:  false,
	});
};