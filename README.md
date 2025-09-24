🌱 E-Shamba

E-Shamba is a digital platform that connects farmers in Kenya with certified vendors and markets. The platform aims to reduce food wastage, increase farmer incomes, and create efficient supply chain linkages by providing a centralized web-based system.

📌 Project Overview

In Kenya, approximately 40% of produce is lost due to poor market and vendor linkages (FAO, 2023). Farmers lack access to trusted markets, while vendors struggle to source quality produce. E-Shamba addresses this gap by creating a platform where:
Farmers can register, upload, and manage produce listings.
Vendors/Markets can browse, search, and order directly from farmers.
Admins can monitor users, approve produce listings, and manage the system.

🎯 Objectives

Develop a web-based platform for farmer registration and produce listing.
Enable vendors to browse, search, and order produce.
Implement a role-based user management system.
Provide order tracking and management via a central database.
Deliver an admin dashboard for monitoring and approvals.

📦 Project Scope
✅ Will Cover:
Farmer registration & CRUD produce listings.
Vendor registration, browsing & ordering.
Admin functions (user & produce management).
PostgreSQL database for users, produce & orders.

❌ Will Not Cover (future scope):
Integrated payment gateways.
Delivery services/logistics.
Mobile app version.

🛠️ Tech Stack
Frontend: React Vite
Backend: Django + Django templates (Bootstrap for rapid UI)
Database: PostgreSQL
Tools: VS Code, GitHub, Localhost servers
Data Sources: FAOstat, Kaggle (Kenya food prices dataset), self-created data

data

🏗️ System Design
Models: Users, Produce, Orders
Views: Farmer dashboards, Vendor browsing, Admin panel
Architecture: Django REST backend with React frontend

⚙️ Installation & Setup
Follow these steps to set up E-Shamba locally:

1. Clone the repository
    git clone https://github.com/Chantal-Marissa-Pande/E-shamba.git
    cd E-shamba

2. Backend Setup (Django)
# Create virtual environment
  python -m venv venv
  source venv/bin/activate   # On Windows: venv\Scripts\activate
# Install dependencies
  pip install -r requirements.txt
# Run migrations
  python manage.py migrate
# Start Django server
  python manage.py runserver
Django will run on:
👉 http://127.0.0.1:8000/

3. Frontend Setup (React)
Open a new terminal inside the project root:
  cd frontend
  npm install
  npm run dev
React will run on:
👉 http://localhost:5173/

🚀 Usage
Farmers: Register → Upload produce listings → Manage availability.
Vendors: Browse/search produce → Place orders → Track orders.
Admins: Approve farmer/vendor accounts → Monitor listings → Manage platform.

| Weeks | Tasks                                     |
| ----- | ----------------------------------------- |
| 1–2   | Requirement gathering & project design    |
| 3–4   | User authentication & role management     |
| 5–6   | Produce listing & vendor browsing modules |
| 7–8   | Order management module                   |
| 9–10  | UI enhancements & integration             |
| 11    | Testing                                   |
| 12    | Documentation & deployment                |
| 13    | Final presentation                        |

🚀 Expected Deliverables
A functional prototype web app: E-Shamba
  Farmer module
  Vendor module
  Admin module
Documentation (system design, user manual, test reports)
GitHub repository with full source code
Presentation materials

| Challenge            | Mitigation                              |
| -------------------- | --------------------------------------- |
| Deployment issues    | Use **PythonAnywhere** for free hosting |
| Database integration | Regular testing with PostgreSQL         |
| Time management      | Follow milestones & weekly tracking     |

👩‍💻 Author

Chantal Pande
ID: 667020

GitHub Repo: eshamba
