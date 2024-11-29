import express from "express";
import { Router } from "express";
import sql from "mssql";
import dbConfig from "../db/config.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    // Query for total submissions
    const totalSubmissionsResult = await pool
      .request()
      .query("SELECT COUNT(*) AS totalSubmissions FROM InterviewQuestions");
    const totalSubmissions = totalSubmissionsResult.recordset[0].totalSubmissions;

    // Query for industry spread
    const industrySpreadResult = await pool
      .request()
      .query(
        "SELECT InterviewForIndustry, COUNT(*) AS count FROM InterviewQuestions GROUP BY InterviewForIndustry"
      );
    const industrySpread = industrySpreadResult.recordset;

    // Query for top companies
    const topCompaniesResult = await pool
      .request()
      .query(
        "SELECT InterviewForCompany, COUNT(*) AS count FROM InterviewQuestions GROUP BY InterviewForCompany ORDER BY count DESC"
      );
    const topCompanies = topCompaniesResult.recordset;

    // Query for most interesting questions
    const topQuestionsResult = await pool
      .request()
      .query("SELECT InterestingQuestionAsked, InterviewForCompany FROM InterviewQuestions");
    const topQuestions = topQuestionsResult.recordset;

    // Send the aggregated data as a response
    res.status(200).json({
      totalSubmissions,
      industrySpread,
      topCompanies,
      topQuestions,
    });
  } catch (err) {
    console.error("Error fetching insights:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router using export default
export default router;