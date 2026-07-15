export const STATUS_CONFIG = {
  pending: { label: "Pending", class: "badge-warning" },
  approved: { label: "Approved", class: "badge-success" },
  rejected: { label: "Rejected", class: "badge-danger" },
  active: { label: "Active", class: "badge-success" },
  inactive: { label: "Inactive", class: "badge-neutral" },
  enrolled: { label: "Enrolled", class: "badge-success" },
  completed: { label: "Completed", class: "badge-success" },
  new: { label: "New", class: "badge-primary" },
  proposal: { label: "Proposal", class: "badge-warning" },
  discussion: { label: "Discussion", class: "badge-primary" },
  won: { label: "Won", class: "badge-success" },
  lost: { label: "Lost", class: "badge-danger" },
  verified: { label: "Verified", class: "badge-success" },
  paid: { label: "Paid", class: "badge-success" },
} as const;

export const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  contact: "Contact Form",
  "get-started": "Get Started",
  "corporate-training": "Corporate Training",
};

export const INTEREST_AREAS = [
  "Student Recruitment", "Corporate Training", "ISO Consulting",
  "Professional Membership", "Audit Projects", "Business Partnerships",
];

export const PROGRAM_CATEGORIES = [
  "Certification", "Training", "Workshop", "Consulting", "Membership",
];

export const LEAD_STATUSES = ["new", "proposal", "discussion", "won", "lost"];

export const PARTNERSHIP_TYPES = ["educational", "corporate", "government", "non-profit"];

export const INSTITUTIONS = [
  { label: "Global Institute of Auditing", value: "Global Institute of Auditing" },
  { label: "Global Institute of Management", value: "Global Institute of Management" },
  { label: "Institute of Finance & Investment", value: "Institute of Finance & Investment" },
  { label: "Global Leadership Institute", value: "Global Leadership Institute" },
  { label: "Global Institute of Hospitality, Tourism & Event Management", value: "Global Institute of Hospitality, Tourism & Event Management" },
  { label: "Global Institute of Corporate & Strategic Communication", value: "Global Institute of Corporate & Strategic Communication" },
  { label: "Global Institute of Human Capital & Resources", value: "Global Institute of Human Capital & Resources" },
  { label: "Business and Skill School", value: "Business and Skill School" },
  { label: "Institute of Business Startups & Growth", value: "Institute of Business Startups & Growth" },
  { label: "Institute of Artificial Intelligence & Digital Innovation", value: "Institute of Artificial Intelligence & Digital Innovation" },
  { label: "Institute of Project Management", value: "Institute of Project Management" },
  { label: "Global Institute of Supply Chain, Procurement & Logistics", value: "Global Institute of Supply Chain, Procurement & Logistics" },
  { label: "Global Institute of Data & Business Analytics", value: "Global Institute of Data & Business Analytics" },
  { label: "Global Institute of Cybersecurity & Information Assurance", value: "Global Institute of Cybersecurity & Information Assurance" },
  { label: "Institute of Strategic Marketing & Branding", value: "Institute of Strategic Marketing & Branding" },
  { label: "Global Institute of Public Relations & Customer Experience", value: "Global Institute of Public Relations & Customer Experience" },
  { label: "Institute of Sales, Revenue & Commercial Leadership", value: "Institute of Sales, Revenue & Commercial Leadership" },
  { label: "School of Business Administration and Operations", value: "School of Business Administration and Operations" },
  { label: "Global Executive Institute", value: "Global Executive Institute" },
  { label: "Institute of Data Protection, Governance, Privacy & Information Security", value: "Institute of Data Protection, Governance, Privacy & Information Security" },
];

export const FILE_ACCEPT_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
