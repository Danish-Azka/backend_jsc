import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export default {
  async up(queryInterface, Sequelize) {
  try {
    console.log("Seeder jalan...");
    console.log(process.env.ADMIN_EMAIL);

    const existingAdmin = await queryInterface.sequelize.query(
      `SELECT * FROM admin WHERE email = :email`,
      {
        replacements: { email: process.env.ADMIN_EMAIL },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    console.log("existingAdmin:", existingAdmin);

    if (existingAdmin.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await queryInterface.bulkInsert("admin", [
      {
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log("Admin berhasil dibuat");

  } catch (err) {
    console.error("ERROR SEEDER:", err);
  }
},

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admin", {
      email: process.env.ADMIN_EMAIL
    });
  }
};