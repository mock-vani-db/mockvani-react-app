import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockVani=pgTable('mockvani',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull()
})

export const UserAnswers=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAnswer:varchar('correctAnswer').notNull(),
    userAnswer:text('userAnswer'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail').notNull(),
    createdAt:varchar('createdAt').notNull()
})