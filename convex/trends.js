import { query } from "./_generated/server";

export const getCampusData = query({
  handler: async (ctx) => {
    // 1. Fetch all records from the database
    const allRecords = await ctx.db.query("records").collect();

    // 2. Initialize our data structures based on your spec
    const summary = {
      totalRecords: allRecords.length,
      bmiData: { Underweight: 0, 'Normal Weight': 0, Overweight: 0, Obese: 0 },
      bpData: { Normal: 0, Elevated: 0, 'High BP (Stage 1)': 0, 'High BP (Stage 2)': 0, 'Hypertensive Crisis': 0 },
      risks: {}
    };

    // 3. Process the data
    allRecords.forEach(record => {
      // BMI Distribution
      if (record.module === 'BMI' && summary.bmiData[record.category] !== undefined) {
        summary.bmiData[record.category]++;
      }
      
      // BP Distribution
      if (record.module === 'Blood Pressure' && summary.bpData[record.category] !== undefined) {
        summary.bpData[record.category]++;
      }

      // Tallying Top Risks (e.g., Obese, Hypertension, Mild Stress)
      if (['Obese', 'Overweight', 'High BP (Stage 1)', 'High BP (Stage 2)', 'Hypertensive Crisis', 'Mild Stress', 'High Stress / Burnout', 'Action Required', 'Risky', 'High Risk'].includes(record.category)) {
          summary.risks[record.category] = (summary.risks[record.category] || 0) + 1;
      }
    });

    // 4. Format for Recharts (Arrays of objects)
    const formatForPie = (dataObj) => {
      return Object.entries(dataObj)
        .filter(([_, value]) => value > 0) // Only show categories that have data
        .map(([name, value]) => ({ name, value }));
    };

    // Format Top Risks for Bar Chart
    const topRisksArray = Object.entries(summary.risks)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count) // Sort highest to lowest
        .slice(0, 5); // Take top 5

    return {
      totalRecords: summary.totalRecords,
      bmiChartData: formatForPie(summary.bmiData),
      bpChartData: formatForPie(summary.bpData),
      topRisksData: topRisksArray,
    };
  },
});