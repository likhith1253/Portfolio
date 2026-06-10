export interface Experience {
  type: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  responsibilities: string[];
  tools: string[];
  projectsCompleted?: string;
  keyLearnings: string;
}

export const experience: Experience[] = [
  {
    type: "Internship",
    company: "Bluestock Fintech Pvt. Ltd.",
    role: "Data Analyst Intern",
    duration: "April 2026 – June 2026",
    location: "Hyderabad, India",
    responsibilities: [
      "Designed ETL pipelines using Python, Pandas, and SQLAlchemy for financial data ingestion and transformation.",
      "Processed 46,000+ mutual fund NAV records and 32,000+ investor transactions from public financial datasets.",
      "Designed normalized star-schema databases supporting analytics across 40 mutual fund schemes and multiple benchmark indices.",
      "Built risk and performance analytics workflows covering Sharpe Ratio, Sortino Ratio, Alpha, Beta, Value at Risk (VaR), and Maximum Drawdown.",
      "Developed Power BI dashboards visualizing fund performance, investor demographics, SIP growth, portfolio exposure, and benchmark comparisons.",
      "Performed exploratory data analysis and generated 15+ analytical visualizations for business insights.",
      "Worked with relational database design, schema planning, indexing strategies, and financial data modeling.",
      "Conducted benchmark analysis comparing mutual fund performance against Nifty 50, Nifty 100, and other market indices.",
    ],
    tools: [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "SQLite",
      "PostgreSQL",
      "SQLAlchemy",
      "Power BI",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Git",
      "GitHub",
    ],
    projectsCompleted:
      "Processed 46,000+ NAV records; ingested 32,000+ transactions; modeled data for 40 mutual fund schemes; delivered a 4-page Power BI dashboard and 15+ analytical visualizations.",
    keyLearnings:
      "Strengthened database design and dimensional modeling skills, built production-like ETL workflows, and gained practical experience in financial analytics and BI dashboarding to support business decision-making.",
  },
];
