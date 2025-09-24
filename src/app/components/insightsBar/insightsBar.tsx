// components/insightsBar/insightsBar.tsx
"use client";
import { useState } from "react";

import { metricsRegistry } from "./metricsRegistry";
import samplePR from "./samplePR";

export default function InsightsBar() {

  // Default 3 Starting Metrics
  const [activeMetrics, setActiveMetrics] = useState([
    "timeToFirstReview",
    "avgMergeTime",
    "prAuthor",
  ]);

  const handleAdd = (id: string) => {
    if (!activeMetrics.includes(id)) {
      setActiveMetrics([...activeMetrics, id]);
    }
  };

  const handleRemove = (id: string) => {
    setActiveMetrics(activeMetrics.filter(metricId => metricId !== id));
  };

  return (
    <div className="
      w-[280px] 
      h-[calc(100vh-50px)] 
      flex 
      flex-col 
      gap-6 
      bg-gray-200 
      p-2 
      shadow-lg"
     >

      {/* Header + Add Dropdown */}
      <div className="flex items-center justify-center gap-4 mt-4 relative">

        <span className="text-lg font-bold">Insights</span>

        {/* Simple dropdown for add */}
        <div className="dropdown">

          <button tabIndex={0} className="btn btn-primary text-2xl">+</button>
          
          <ul 
            tabIndex={0} 
            className="
            dropdown-content 
            h-[110px]
            menu p-2 
            shadow 
            bg-white 
            rounded-lg w-52
            absolute 
            -translate-x-[59%]
            overflow-y-auto
            flex flex-col flex-nowrap
            "
          >
            {metricsRegistry.map(metric => (
              <li key={metric.id}>
                <button onClick={() => handleAdd(metric.id)}>
                  {metric.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Metrics Container */}
       <div className="flex flex-col mt-0 gap-3 overflow-y-auto items-center flex-1 p-2">
        {activeMetrics.length === 0 ? (
          <div className="text-center text-gray-600 text-sm mt-8 px-2">
            No Metrics Available. <br />
            Click on + button to add metrics.
          </div>
        ) : (
          activeMetrics.map(metricId => {
            const metric = metricsRegistry.find(m => m.id === metricId);
            if (!metric) return null;
            const Component = metric.component;
            return (
              <div key={metric.id} className="relative">
                <Component prData={samplePR} />
                {/* Close (X) button */}
                <button
                  onClick={() => handleRemove(metric.id)}
                  className="absolute top-1 right-1 btn btn-xs btn-circle min-h-[20px] h-[20px] w-[20px]"
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}