const dbConfig = {
  user: "mockvaniadmin",
  password: "MockVani@123",
  server: "mockvani-crowd-sourced-interview-questions.database.windows.net",
  database: "CrowdSourcedInterviewData",
  options: {
      encrypt: true, // Use encryption for Azure SQL Database
  },
};

export default dbConfig;
