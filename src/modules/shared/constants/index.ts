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
  "corporate-training": "Home Care Enquiry",
};

export const INTEREST_AREAS = [
  "Elderly Care", "Companion Care", "Live-in Care",
  "Dementia Support", "Post-Surgical Recovery", "Home Care Referrals",
];

export const PROGRAM_CATEGORIES = [
  "Certification", "Training", "Workshop", "Consulting", "Membership",
];

export const LEAD_STATUSES = ["new", "proposal", "discussion", "won", "lost"];

export const PARTNERSHIP_TYPES = ["educational", "corporate", "government", "non-profit"];

export const INSTITUTIONS = [
  { label: "Elderly Companion Care", value: "Elderly Companion Care" },
  { label: "Live-in Care", value: "Live-in Care" },
  { label: "Dementia & Memory Support", value: "Dementia & Memory Support" },
  { label: "Post-Surgical Recovery Care", value: "Post-Surgical Recovery Care" },
  { label: "Personal Care & Hygiene", value: "Personal Care & Hygiene" },
  { label: "Mobility Support", value: "Mobility Support" },
  { label: "Meal Preparation & Nutrition", value: "Meal Preparation & Nutrition" },
  { label: "Medication Management", value: "Medication Management" },
  { label: "Chronic Condition Support", value: "Chronic Condition Support" },
  { label: "Palliative Care Support", value: "Palliative Care Support" },
  { label: "Transport & Errand Support", value: "Transport & Errand Support" },
  { label: "Respite Care for Families", value: "Respite Care for Families" },
  { label: "Newborn & Maternal Home Care", value: "Newborn & Maternal Home Care" },
  { label: "General Home Care Referral", value: "General Home Care Referral" },
];

export const FILE_ACCEPT_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
