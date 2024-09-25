"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { UserAnswers } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../../../components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import { useRouter } from 'next/navigation'
  
function Feedback({params}) {

    const [feedbackList, setFeedbackList]=useState();
    const router=useRouter();

    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswers)
        .where(eq(UserAnswers.mockIdRef, params.interviewId))
        .orderBy(UserAnswers.id);

        setFeedbackList(result);
    }
  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your Interview feedback</h2>
        <h2 className='text-primary text-lg my-3'>Your overall Interview Rating: <strong>7/10</strong></h2>

        <h2 className='text-sm text-gray-500'>Find below Interview Questions with Correct Answer, Your Answer and Feedback for Improving</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary font-bold rounded my-2 align-baseline text-left flex justify-between gap-7 w-full'>
            {item.question}<ChevronsUpDownIcon></ChevronsUpDownIcon>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: {item.rating}</strong></h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong> {item.userAnswer}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong> {item.correctAnswer}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong> {item.feedback}</h2>
            </div>
            </CollapsibleContent>
          </Collapsible>
        )
        )}


        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback