import React from "react";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
  return <div>
    {/* Search Section */}
    <SearchSection/>
    {/* Template list section */}
    <TemplateListSection/>
    
    </div>;
}

export default Dashboard;
