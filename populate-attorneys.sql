-- Populate Attorneys Table with Sample Data
-- Run this in Supabase SQL Editor or via psql

-- Clear existing attorneys (optional - remove this line if you want to keep existing data)
-- DELETE FROM attorneys;

-- Insert Sample Attorneys
INSERT INTO attorneys (
  id,
  name,
  slug,
  title,
  specialty,
  education,
  experience,
  email,
  phone,
  photo,
  bio,
  "practiceAreas",
  "barAdmissions",
  languages,
  status,
  "order",
  "createdAt",
  "updatedAt"
) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  'Michael Anderson',
  'michael-anderson',
  'Senior Partner',
  'Corporate Law',
  '["Harvard Law School, J.D., 2005", "Yale University, B.A. Economics, 2002"]'::jsonb,
  '18 years of experience in corporate law and mergers & acquisitions',
  'manderson@regaliuslaw.com',
  '+1 (555) 123-4567',
  '/placeholder-user.jpg',
  'Michael Anderson is a distinguished corporate attorney with over 18 years of experience advising Fortune 500 companies on complex mergers, acquisitions, and corporate governance matters. He has successfully closed deals worth over $5 billion and is known for his strategic approach to business transactions. Michael graduated magna cum laude from Harvard Law School and has been recognized as a leading corporate lawyer by Best Lawyers in America for five consecutive years.',
  '["Corporate Law", "Mergers & Acquisitions", "Securities Law", "Corporate Governance"]'::jsonb,
  '["New York State Bar", "California State Bar", "U.S. District Court Southern District of New York"]'::jsonb,
  '["English", "Spanish"]'::jsonb,
  'active',
  1,
  NOW(),
  NOW()
),
(
  '10000000-0000-0000-0000-000000000002',
  'Sarah Chen',
  'sarah-chen',
  'Partner',
  'Intellectual Property',
  '["Stanford Law School, J.D., 2008", "MIT, B.S. Computer Science, 2005"]'::jsonb,
  '15 years of experience in intellectual property and technology law',
  'schen@regaliuslaw.com',
  '+1 (555) 123-4568',
  '/placeholder-user.jpg',
  'Sarah Chen combines her technical background in computer science with extensive legal expertise in intellectual property law. She specializes in patent litigation, trademark prosecution, and technology licensing. Sarah has successfully represented major tech companies in high-stakes patent disputes and has secured hundreds of patents for innovative technologies. Her unique blend of technical and legal knowledge makes her an invaluable asset to clients in the technology sector.',
  '["Intellectual Property", "Patent Law", "Technology Law", "Trade Secrets"]'::jsonb,
  '["California State Bar", "U.S. Patent and Trademark Office", "Federal Circuit Court of Appeals"]'::jsonb,
  '["English", "Mandarin"]'::jsonb,
  'active',
  2,
  NOW(),
  NOW()
),
(
  '10000000-0000-0000-0000-000000000003',
  'David Martinez',
  'david-martinez',
  'Partner',
  'Real Estate Law',
  '["Columbia Law School, J.D., 2007", "University of Pennsylvania, B.A. Finance, 2004"]'::jsonb,
  '16 years of experience in commercial real estate and property law',
  'dmartinez@regaliuslaw.com',
  '+1 (555) 123-4569',
  '/placeholder-user.jpg',
  'David Martinez is a highly respected real estate attorney specializing in complex commercial transactions, development projects, and property litigation. He has represented major developers, institutional investors, and real estate investment trusts in transactions exceeding $3 billion. David is particularly skilled in navigating zoning regulations, environmental compliance, and financing structures. His clients appreciate his practical approach and ability to close deals efficiently.',
  '["Real Estate Law", "Commercial Transactions", "Property Development", "Land Use"]'::jsonb,
  '["New York State Bar", "New Jersey State Bar", "American College of Real Estate Lawyers"]'::jsonb,
  '["English", "Spanish", "Portuguese"]'::jsonb,
  'active',
  3,
  NOW(),
  NOW()
),
(
  '10000000-0000-0000-0000-000000000004',
  'Emily Thompson',
  'emily-thompson',
  'Senior Associate',
  'Employment Law',
  '["Georgetown University Law Center, J.D., 2012", "Duke University, B.A. Political Science, 2009"]'::jsonb,
  '12 years of experience in employment and labor law',
  'ethompson@regaliuslaw.com',
  '+1 (555) 123-4570',
  '/placeholder-user.jpg',
  'Emily Thompson is a dedicated employment law attorney who advocates for both employers and employees in workplace disputes. She handles cases involving discrimination, wrongful termination, wage and hour disputes, and employment contract negotiations. Emily has successfully represented clients before the EEOC, state labor boards, and in federal court. She is known for her compassionate approach and commitment to achieving fair outcomes for her clients.',
  '["Employment Law", "Labor Relations", "Discrimination Cases", "Workplace Compliance"]'::jsonb,
  '["District of Columbia Bar", "Virginia State Bar", "U.S. District Court District of Columbia"]'::jsonb,
  '["English", "French"]'::jsonb,
  'active',
  4,
  NOW(),
  NOW()
),
(
  '10000000-0000-0000-0000-000000000005',
  'Robert Kim',
  'robert-kim',
  'Associate',
  'Tax Law',
  '["NYU School of Law, LL.M. Taxation, 2015", "Boston University, J.D., 2014", "Cornell University, B.S. Accounting, 2011"]'::jsonb,
  '9 years of experience in tax planning and litigation',
  'rkim@regaliuslaw.com',
  '+1 (555) 123-4571',
  '/placeholder-user.jpg',
  'Robert Kim specializes in complex tax matters for individuals, businesses, and trusts. His practice includes tax planning, IRS audits, tax litigation, and international tax compliance. Robert holds an LL.M. in Taxation from NYU and is a certified public accountant. He regularly advises clients on tax-efficient business structures, estate planning, and cross-border transactions. His analytical skills and attention to detail have saved clients millions in tax liabilities.',
  '["Tax Law", "Tax Planning", "IRS Audits", "International Tax"]'::jsonb,
  '["New York State Bar", "Certified Public Accountant", "U.S. Tax Court"]'::jsonb,
  '["English", "Korean"]'::jsonb,
  'active',
  5,
  NOW(),
  NOW()
),
(
  '10000000-0000-0000-0000-000000000006',
  'Jennifer Walsh',
  'jennifer-walsh',
  'Partner',
  'Family Law',
  '["University of Chicago Law School, J.D., 2006", "Northwestern University, B.A. Psychology, 2003"]'::jsonb,
  '17 years of experience in family law and mediation',
  'jwalsh@regaliuslaw.com',
  '+1 (555) 123-4572',
  '/placeholder-user.jpg',
  'Jennifer Walsh is a compassionate family law attorney with extensive experience in divorce, custody disputes, prenuptial agreements, and domestic relations matters. She is a certified mediator and strongly advocates for collaborative law approaches when possible. Jennifer understands the emotional challenges families face and works to achieve resolutions that prioritize the best interests of children while protecting her clients rights. She has been named a Super Lawyer in Family Law for the past seven years.',
  '["Family Law", "Divorce", "Child Custody", "Mediation"]'::jsonb,
  '["Illinois State Bar", "Certified Family Law Mediator", "American Academy of Matrimonial Lawyers"]'::jsonb,
  '["English"]'::jsonb,
  'active',
  6,
  NOW(),
  NOW()
);

-- Verify the insert
SELECT 
  name, 
  title, 
  specialty, 
  status,
  "order"
FROM attorneys
ORDER BY "order";

-- Show count
SELECT COUNT(*) as total_attorneys FROM attorneys;

