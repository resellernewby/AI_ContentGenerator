"use client";
import { db } from "@/utils/db";
import React, { useEffect, useState } from "react";
import { AIOutput } from "@/utils/schema";


export interface AIOUTPUTDATA {
  id: number;
  formData: string;
  templateSlug: string;
  aiResponse: string | null;
  createdBy: string | null;
  createdAt: string | null;
}

function HistoryPage() {
  const [data, setData] = useState<AIOUTPUTDATA[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const retrieveAllFromDb = async () => {
      try {
        // Select query to retrieve all records
        const results = await db.select().from(AIOutput);
        console.log(results);
        setData(results);
        console.log(data);
      } catch (error: any) {
        console.log("Error in retrieving data", error);
        setError(error);
      }
    };

    retrieveAllFromDb();
  }, []);

  if (error) {
    return alert("Error: " + error.message);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Text copied to clipboard!");
    }).catch((error) => {
      console.error("Failed to copy text: ", error);
    });
  };

  return (
    <div className="bg-gray-300">
      <div className="bg-white p-10 w-{600px}">
        <div>
          <h1 className="font-bold text-3xl">History</h1>
          <p className="text-gray-500 text-m mb-6">Search your previous generate AI content</p>
          <table className="table-auto">
            <thead className="bg-gray-300">
              <tr >
                <th>TEMPLATE</th>
                <th>AI RESP</th>
                <th>DATE</th>
                <th>WORDS</th>
                <th>Copy</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, id) => (
                <tr key={id}>
                  <td>{item.templateSlug}</td>
                  <td>{item.aiResponse}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.aiResponse ? item.aiResponse.length : 0}</td>
                  <td> {item.aiResponse && (
                      <button onClick={() => copyToClipboard(item.aiResponse?item.aiResponse:'')}>
                        Copy
                      </button>
                    )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3></h3>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
