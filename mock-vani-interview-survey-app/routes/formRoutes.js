import express from "express";
import rateLimit from "express-rate-limit";
import sql from "mssql";
import dbConfig from "../db/config.js";
import { Filter } from "bad-words";
import xss from "xss";

const router = express.Router();
const filter = new Filter();

const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 submissions per 10 minutes
  message: "Too many submissions from this IP, please try again later",
});

router.post("/", submitLimiter, async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const {
      email,
      askedQuestion: {
        question: interestingQuestionAsked,
        industry: interviewForIndustry,
        company: interviewForCompany,
        designation: interviewForDesignation,
        yearsExperience: interviewForYearsExperience,
        year: interviewForYear,
      },
      receivedQuestion: {
        question: interestingQuestionGiven,
        industry: givenForIndustry,
        company: givenForCompany,
        designation: givenForDesignation,
        yearsExperience: givenForYearsExperience,
        year: givenForYear,
      },
      receiveUpdates,
    } = req.body;

    // Sanitize inputs
    const sanitizedEmail = xss(email);
    const sanitizedAskedQuestion = xss(interestingQuestionAsked);
    const sanitizedAskedIndustry = xss(interviewForIndustry);
    const sanitizedAskedCompany = xss(interviewForCompany);
    const sanitizedAskedDesignation = xss(interviewForDesignation);
    const sanitizedAskedYearsExperience = xss(interviewForYearsExperience.toString()); // Convert numbers to strings for sanitation
    const sanitizedAskedYear = xss(interviewForYear.toString()); // Convert numbers to strings for sanitation

    const sanitizedReceivedQuestion = xss(interestingQuestionGiven);
    const sanitizedReceivedIndustry = xss(givenForIndustry);
    const sanitizedReceivedCompany = xss(givenForCompany);
    const sanitizedReceivedDesignation = xss(givenForDesignation);
    const sanitizedReceivedYearsExperience = xss(givenForYearsExperience.toString()); // Convert numbers to strings for sanitation
    const sanitizedReceivedYear = xss(givenForYear.toString()); // Convert numbers to strings for sanitation

    // Check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).send("Invalid email address.");
    }

    // Check for profanity
    if (
      filter.isProfane(sanitizedAskedQuestion) ||
      filter.isProfane(sanitizedAskedIndustry) ||
      filter.isProfane(sanitizedAskedCompany) ||
      filter.isProfane(sanitizedAskedDesignation) ||
      filter.isProfane(sanitizedAskedYearsExperience) ||
      filter.isProfane(sanitizedAskedYear) ||
      filter.isProfane(sanitizedReceivedQuestion) ||
      filter.isProfane(sanitizedReceivedIndustry) ||
      filter.isProfane(sanitizedReceivedCompany) ||
      filter.isProfane(sanitizedReceivedDesignation) ||
      filter.isProfane(sanitizedReceivedYearsExperience) ||
      filter.isProfane(sanitizedReceivedYear)
    ) {
      return res.status(400).send("Profanity is not allowed in submissions.");
    }

    const query = `
      INSERT INTO InterviewQuestions
      (EmailAddress, InterestingQuestionAsked, InterviewForIndustry, InterviewForCompany, InterviewForDesignation, InterviewForYearsExperience, InterviewForYear,
       InterestingQuestionGiven, GivenForIndustry, GivenForCompany, GivenForDesignation, GivenForYearsExperience, GivenForYear, ReceiveUpdates)
      VALUES (@EmailAddress, @InterestingQuestionAsked, @InterviewForIndustry, @InterviewForCompany, @InterviewForDesignation, @InterviewForYearsExperience, @InterviewForYear,
      @InterestingQuestionGiven, @GivenForIndustry, @GivenForCompany, @GivenForDesignation, @GivenForYearsExperience, @GivenForYear, @ReceiveUpdates)
    `;

    // console.log("Constructed SQL Query:", query);

    const request = pool.request();
    request.input("EmailAddress", sql.VarChar, email);
    request.input("InterestingQuestionAsked", sql.VarChar, interestingQuestionAsked);
    request.input("InterviewForIndustry", sql.VarChar, interviewForIndustry);
    request.input("InterviewForCompany", sql.VarChar, interviewForCompany);
    request.input("InterviewForDesignation", sql.VarChar, interviewForDesignation);
    request.input("InterviewForYearsExperience", sql.Int, interviewForYearsExperience);
    request.input("InterviewForYear", sql.Int, interviewForYear);
    request.input("InterestingQuestionGiven", sql.VarChar, interestingQuestionGiven);
    request.input("GivenForIndustry", sql.VarChar, givenForIndustry);
    request.input("GivenForCompany", sql.VarChar, givenForCompany);
    request.input("GivenForDesignation", sql.VarChar, givenForDesignation);
    request.input("GivenForYearsExperience", sql.Int, givenForYearsExperience);
    request.input("GivenForYear", sql.Int, givenForYear);
    request.input("ReceiveUpdates", sql.Bit, receiveUpdates ? 1 : 0);

    await request.query(query);
    res.status(200).send("Submission successful");
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Export the router using export default
export default router;
