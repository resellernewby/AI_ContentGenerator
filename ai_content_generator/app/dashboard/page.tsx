"use client"

import React, { useState } from "react";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
  const [userSearchInput,setUserSeachInput] = useState<string>();
  return <div>
    {/* Search Section */}
    <SearchSection onSearchInput={(value:string)=>setUserSeachInput(value)}/>
    {/* Template list section */}
    <TemplateListSection userSearchInput={userSearchInput}/>
    
    </div>;
}

export default Dashboard;
