export default function (sequelize, DataTypes) {
	return sequelize.define('Users', {
		userId: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	}, {
		timestamps:  false,
	});
};