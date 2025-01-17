"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { AlertDestructive } from "../../_components/AlertDialog";
import { useRouter } from "next/navigation";


interface PROPS {
  params: {
    "template-slug": string;
  };
}
function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item?.slug == props.params["template-slug"]
  );
  const [loading,setLoading] = useState(false);
  const [aiOutput,setAiOutput] = useState<string>();
  const {user} = useUser();
  const router = useRouter();
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
  const GenerateAIContent = async(formData: any) => {
   
    setLoading(true);
    if(totalUsage>=10000){
      // <AlertDestructive/>
      console.log('Please upgrade');
      router.push('/dashboard/billing')
      return;
    }
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData)+", "+SelectedPrompt;

    console.log(FinalAIPrompt);


      try {
      const result = await chatSession.sendMessage(FinalAIPrompt);
      // console.log(result.response.candidates[0].content.parts[0].text);
      console.log(result.response.text());
      setAiOutput(result?.response.text());
      await SaveInDb(formData,selectedTemplate?.slug,result?.response.text());
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: any, slug: any, aiOutput: any) => {
    
    console.log('User data:', user);
   
  
    if (!user) {
      throw new Error('User is not authenticated');
    }
  
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiOutput,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD/MM/YYYY'),
      });
      console.log(result);
    } catch (error) {
      console.error('Error inserting data:', error);
      throw new Error('Failed to insert data');
    }
  };

  return (
    <div className="p-5">
      <Link href={'/dashboard'}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5 py-5">
        {/* FormSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading ={loading}
        />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput ={aiOutput || ''} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
