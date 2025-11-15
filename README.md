QualDash-PM: Healthcare management app

Course: Mini-Project Submission
Author: Neeraj
Inspiration: IEEE "QualDash: A Dashboard for Clinical Quality of Care Assessment"

1. Problem Statement

In modern healthcare, clinics and hospitals collect vast amounts of patient data (EHRs). However, this data is often difficult to analyze in real-time. Clinical managers and physicians lack a simple, high-level view to answer critical questions, such as:

"Are we meeting our quality-of-care goals?"

"Which of our patients are at high risk or non-compliant?"

"Where are the bottlenecks in our patient-care process?"

This project, inspired by the 'QualDash' framework, aims to solve this by creating a prototype dashboard for Practice Managers (PMs) to visualize key performance indicators (KPIs) and improve patient outcomes.

2. User Persona

The system is designed for Dr.Admin, a Clinical Practice Manager.

Role: Manages patients data and generates report. Represents data visually.

Goals: Ensure high-quality patient care, meet clinic-wide performance metrics, and efficiently allocate resources.

Frustrations: "I spend hours pulling reports from our clunky EHR. I don't know if my patients are taking their medication, and I can't easily see which doctor's patients have the best outcomes."

3. Solution: The QualDash-PM Dashboard

This project is a React-based web application that provides Dr.Admin with a real-time, "at-a-glance" view of their clinic's performance.

Key Features

KPI Dashboard: A high-level view of the most critical metrics:

Patient Outcomes: Visualizing Recovery vs. Mortality rates.

Admissions & Occupancy: Tracking admission trends and daily bed occupancy.

Departmental Load: Breaking down patient volume by clinical department.

Patient List & Filtering: A detailed, searchable, and filterable list of all patients. This allows the manager to "drill down" from a high-level KPI to a specific list of patients.

Accessible Interface: Features like collapsible sidebar, accessible sorting headers (keyboard-navigable), and clear pagination.

4. Technical Stack

Frontend: React (Vite)

Routing: React Router DOM

Styling: Tailwind CSS

Animation: Framer Motion

Icons: Lucide-React

Data Visualization: Recharts

Data: Static patients.json (as a mock database)

5. How to Run

Clone the repository.

Install dependencies: npm install

Run the development server: npm run dev

6. Future Work

While this prototype focuses on data visualization from a static source, the next logical steps would be:

Integration: Connect to a live database (like Firebase) or a FHIR API instead of static mock data.

Task Management: Allow the manager to assign tasks (e.g., "Nurse, follow up with Patient X") directly from the dashboard.

Patient Portal: Create a patient-facing view for appointment booking.
