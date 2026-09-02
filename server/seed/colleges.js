/**
 * Seed script for the College Discovery Platform.
 *
 * IMPORTANT DATA DISCLAIMER:
 * College names below are real, publicly known institutions, but the fees,
 * ratings, placement figures, cutoffs, and reviews are SAMPLE / DEMO VALUES
 * created for development purposes only. They are illustrative approximations,
 * not official figures published by these institutions. Do not present this
 * data as authoritative in any real-world context.
 *
 * Run with: npm run seed
 */

require("dotenv").config();
const mongoose = require("mongoose");
const College = require("../models/College");

const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    location: { city: "Mumbai", state: "Maharashtra" },
    fees: 220000,
    rating: 4.8,
    overview:
      "Sample profile: A premier engineering institute known for strong research output, an active startup ecosystem, and consistently high placement outcomes across core and IT sectors.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 2400000, highestPackage: 12000000, placementPercentage: 97 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 150 }],
    reviews: [
      { author: "Aditya S.", rating: 5, comment: "Sample review: Excellent faculty and lab infrastructure." },
      { author: "Neha R.", rating: 4, comment: "Sample review: Rigorous coursework, great peer group." },
    ],
  },
  {
    name: "Indian Institute of Technology Delhi",
    location: { city: "New Delhi", state: "Delhi" },
    fees: 218000,
    rating: 4.8,
    overview:
      "Sample profile: A leading technical institute with strong industry ties in Delhi NCR and a wide range of interdisciplinary research centers.",
    courses: [
      { name: "B.Tech Electrical Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 2300000, highestPackage: 11000000, placementPercentage: 96 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 200 }],
    reviews: [
      { author: "Rohit K.", rating: 5, comment: "Sample review: Great exposure to research and internships." },
      { author: "Simran K.", rating: 4, comment: "Sample review: Campus life is intense but rewarding." },
    ],
  },
  {
    name: "Indian Institute of Technology Madras",
    location: { city: "Chennai", state: "Tamil Nadu" },
    fees: 215000,
    rating: 4.7,
    overview:
      "Sample profile: Known for its research culture and one of the largest technology incubation cells among Indian institutes.",
    courses: [
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 2200000, highestPackage: 10500000, placementPercentage: 95 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 350 }],
    reviews: [
      { author: "Priya V.", rating: 5, comment: "Sample review: Amazing research opportunities from year one." },
      { author: "Karthik M.", rating: 4, comment: "Sample review: Faculty is approachable and supportive." },
    ],
  },
  {
    name: "Indian Institute of Technology Kanpur",
    location: { city: "Kanpur", state: "Uttar Pradesh" },
    fees: 217000,
    rating: 4.6,
    overview:
      "Sample profile: Strong in core engineering disciplines with a sprawling green campus and active student technical societies.",
    courses: [
      { name: "B.Tech Aerospace Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 2100000, highestPackage: 9500000, placementPercentage: 94 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 500 }],
    reviews: [
      { author: "Ananya D.", rating: 4, comment: "Sample review: Good balance of academics and extracurriculars." },
      { author: "Vivek S.", rating: 4, comment: "Sample review: Winters are extreme but campus is beautiful." },
    ],
  },
  {
    name: "Indian Institute of Technology Kharagpur",
    location: { city: "Kharagpur", state: "West Bengal" },
    fees: 210000,
    rating: 4.6,
    overview:
      "Sample profile: One of the oldest IITs with the largest campus among them, offering a wide breadth of engineering and management programs.",
    courses: [
      { name: "B.Tech Metallurgical Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 2000000, highestPackage: 9000000, placementPercentage: 93 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 600 }],
    reviews: [
      { author: "Ishaan T.", rating: 4, comment: "Sample review: Huge campus, very active cultural fest." },
      { author: "Meera P.", rating: 4, comment: "Sample review: Diverse course options across departments." },
    ],
  },
  {
    name: "National Institute of Technology Tiruchirappalli",
    location: { city: "Tiruchirappalli", state: "Tamil Nadu" },
    fees: 165000,
    rating: 4.4,
    overview:
      "Sample profile: A top-ranked NIT with strong core engineering placements and a well-regarded computer science program.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Electronics and Communication", duration: "4 Years" },
    ],
    placements: { averagePackage: 1400000, highestPackage: 4500000, placementPercentage: 90 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 4500 }],
    reviews: [
      { author: "Divya N.", rating: 4, comment: "Sample review: Solid placement cell and alumni network." },
      { author: "Arjun B.", rating: 4, comment: "Sample review: Good hostel facilities and food." },
    ],
  },
  {
    name: "National Institute of Technology Surathkal",
    location: { city: "Mangalore", state: "Karnataka" },
    fees: 160000,
    rating: 4.4,
    overview:
      "Sample profile: A coastal-campus NIT known for its scenic location and consistent placement track record in IT and core sectors.",
    courses: [
      { name: "B.Tech Information Technology", duration: "4 Years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 1350000, highestPackage: 4200000, placementPercentage: 89 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 5200 }],
    reviews: [
      { author: "Sneha H.", rating: 4, comment: "Sample review: Beautiful beachside campus." },
      { author: "Rahul J.", rating: 3, comment: "Sample review: Academics are demanding but manageable." },
    ],
  },
  {
    name: "National Institute of Technology Warangal",
    location: { city: "Warangal", state: "Telangana" },
    fees: 158000,
    rating: 4.3,
    overview:
      "Sample profile: One of the oldest NITs with a strong reputation in mechanical and civil engineering along with growing CS placements.",
    courses: [
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 1300000, highestPackage: 4000000, placementPercentage: 88 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 5800 }],
    reviews: [
      { author: "Tanya G.", rating: 4, comment: "Sample review: Great core branch faculty." },
      { author: "Manish A.", rating: 4, comment: "Sample review: Campus infrastructure keeps improving." },
    ],
  },
  {
    name: "Delhi Technological University",
    location: { city: "New Delhi", state: "Delhi" },
    fees: 175000,
    rating: 4.3,
    overview:
      "Sample profile: A well-established state university in Delhi with strong industry connect and a large number of recruiters visiting each year.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Electrical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 1200000, highestPackage: 5500000, placementPercentage: 87 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 8000 }],
    reviews: [
      { author: "Kunal V.", rating: 4, comment: "Sample review: Good exposure to Delhi's startup scene." },
      { author: "Pooja S.", rating: 3, comment: "Sample review: Infrastructure is decent, could be better." },
    ],
  },
  {
    name: "Netaji Subhas University of Technology",
    location: { city: "New Delhi", state: "Delhi" },
    fees: 170000,
    rating: 4.2,
    overview:
      "Sample profile: A Delhi-based technical university with a compact campus and growing recognition in software placements.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Information Technology", duration: "4 Years" },
    ],
    placements: { averagePackage: 1150000, highestPackage: 4800000, placementPercentage: 85 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 9500 }],
    reviews: [
      { author: "Harsh D.", rating: 4, comment: "Sample review: Friendly faculty and active coding clubs." },
      { author: "Ritika M.", rating: 4, comment: "Sample review: Central Delhi location is a big plus." },
    ],
  },
  {
    name: "Vellore Institute of Technology",
    location: { city: "Vellore", state: "Tamil Nadu" },
    fees: 198000,
    rating: 4.1,
    overview:
      "Sample profile: A large private university with a flexible credit system and a wide variety of specialization tracks in engineering.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Biotechnology", duration: "4 Years" },
    ],
    placements: { averagePackage: 750000, highestPackage: 4100000, placementPercentage: 82 },
    exams: ["VITEEE"],
    cutoff: [{ exam: "VITEEE", closingRank: 12000 }],
    reviews: [
      { author: "Nikhil R.", rating: 4, comment: "Sample review: Huge campus with lots of clubs to join." },
      { author: "Swathi C.", rating: 3, comment: "Sample review: Class sizes can be large in first year." },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    location: { city: "Chennai", state: "Tamil Nadu" },
    fees: 210000,
    rating: 3.9,
    overview:
      "Sample profile: A private university with modern infrastructure and strong emphasis on industry-aligned electives.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 650000, highestPackage: 3500000, placementPercentage: 78 },
    exams: ["SRMJEEE"],
    cutoff: [{ exam: "SRMJEEE", closingRank: 15000 }],
    reviews: [
      { author: "Yash P.", rating: 4, comment: "Sample review: Modern labs and good hostel amenities." },
      { author: "Anjali T.", rating: 3, comment: "Sample review: Fee structure is on the higher side." },
    ],
  },
  {
    name: "Birla Institute of Technology and Science Pilani",
    location: { city: "Pilani", state: "Rajasthan" },
    fees: 225000,
    rating: 4.5,
    overview:
      "Sample profile: A well-regarded private institute known for academic flexibility, a no-detention policy, and strong software placements.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Electronics and Instrumentation", duration: "4 Years" },
    ],
    placements: { averagePackage: 1800000, highestPackage: 6200000, placementPercentage: 91 },
    exams: ["BITSAT"],
    cutoff: [{ exam: "BITSAT", closingRank: 320 }],
    reviews: [
      { author: "Devansh K.", rating: 5, comment: "Sample review: Flexible curriculum and strong alumni network." },
      { author: "Radhika S.", rating: 4, comment: "Sample review: Remote location but tight-knit community." },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: { city: "Manipal", state: "Karnataka" },
    fees: 195000,
    rating: 4.0,
    overview:
      "Sample profile: Part of a large multi-disciplinary university town, with a diverse student population and modern campus facilities.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Aeronautical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 800000, highestPackage: 4000000, placementPercentage: 83 },
    exams: ["MET"],
    cutoff: [{ exam: "MET", closingRank: 6000 }],
    reviews: [
      { author: "Aakash V.", rating: 4, comment: "Sample review: Lively campus with international students." },
      { author: "Bhavna R.", rating: 4, comment: "Sample review: Good balance of academics and social life." },
    ],
  },
  {
    name: "Jadavpur University",
    location: { city: "Kolkata", state: "West Bengal" },
    fees: 30000,
    rating: 4.3,
    overview:
      "Sample profile: A public university known for exceptionally low fees, strong academics, and a loyal alumni base in engineering and arts.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Electrical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 1000000, highestPackage: 4500000, placementPercentage: 86 },
    exams: ["WBJEE"],
    cutoff: [{ exam: "WBJEE", closingRank: 1200 }],
    reviews: [
      { author: "Sourav M.", rating: 5, comment: "Sample review: Incredible value for the fee paid." },
      { author: "Payel D.", rating: 4, comment: "Sample review: Strong academic culture and heritage campus." },
    ],
  },
  {
    name: "College of Engineering Pune",
    location: { city: "Pune", state: "Maharashtra" },
    fees: 95000,
    rating: 4.1,
    overview:
      "Sample profile: One of the oldest engineering colleges in Asia with autonomous status and consistent placement performance.",
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 Years" },
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 900000, highestPackage: 3800000, placementPercentage: 84 },
    exams: ["MHT CET"],
    cutoff: [{ exam: "MHT CET", closingRank: 2500 }],
    reviews: [
      { author: "Omkar J.", rating: 4, comment: "Sample review: Rich legacy and dedicated faculty." },
      { author: "Sakshi P.", rating: 4, comment: "Sample review: Central Pune location is convenient." },
    ],
  },
  {
    name: "Jamia Millia Islamia",
    location: { city: "New Delhi", state: "Delhi" },
    fees: 45000,
    rating: 4.0,
    overview:
      "Sample profile: A central university offering affordable engineering education with a diverse, inclusive campus community.",
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 Years" },
      { name: "B.Tech Electronics Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 700000, highestPackage: 3000000, placementPercentage: 79 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 18000 }],
    reviews: [
      { author: "Zoya A.", rating: 4, comment: "Sample review: Affordable and welcoming campus culture." },
      { author: "Imran S.", rating: 3, comment: "Sample review: Placement cell could be more proactive." },
    ],
  },
  {
    name: "Anna University",
    location: { city: "Chennai", state: "Tamil Nadu" },
    fees: 60000,
    rating: 3.9,
    overview:
      "Sample profile: A major public technical university in Tamil Nadu with numerous affiliated colleges and a large alumni network.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 650000, highestPackage: 2800000, placementPercentage: 77 },
    exams: ["TNEA"],
    cutoff: [{ exam: "TNEA", closingRank: 9000 }],
    reviews: [
      { author: "Vignesh R.", rating: 4, comment: "Sample review: Solid fundamentals-focused curriculum." },
      { author: "Preethi K.", rating: 3, comment: "Sample review: Facilities vary a lot by department." },
    ],
  },
  {
    name: "Thapar Institute of Engineering and Technology",
    location: { city: "Patiala", state: "Punjab" },
    fees: 205000,
    rating: 4.1,
    overview:
      "Sample profile: A private deemed university known for strong industry tie-ups and a green, well-maintained campus.",
    courses: [
      { name: "B.E. Computer Engineering", duration: "4 Years" },
      { name: "B.E. Electronics and Communication", duration: "4 Years" },
    ],
    placements: { averagePackage: 950000, highestPackage: 4300000, placementPercentage: 85 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 22000 }],
    reviews: [
      { author: "Gurpreet S.", rating: 4, comment: "Sample review: Well-organized placement drives." },
      { author: "Simran B.", rating: 4, comment: "Sample review: Clean, green campus with good hostels." },
    ],
  },
  {
    name: "Amrita Vishwa Vidyapeetham",
    location: { city: "Coimbatore", state: "Tamil Nadu" },
    fees: 185000,
    rating: 4.0,
    overview:
      "Sample profile: A multi-campus private university with a strong focus on research and community-oriented initiatives.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Electrical and Electronics", duration: "4 Years" },
    ],
    placements: { averagePackage: 780000, highestPackage: 3600000, placementPercentage: 81 },
    exams: ["AEEE"],
    cutoff: [{ exam: "AEEE", closingRank: 8000 }],
    reviews: [
      { author: "Lakshmi V.", rating: 4, comment: "Sample review: Scenic campus and supportive faculty." },
      { author: "Rajesh N.", rating: 4, comment: "Sample review: Good emphasis on holistic development." },
    ],
  },
  {
    name: "Institute of Chemical Technology Mumbai",
    location: { city: "Mumbai", state: "Maharashtra" },
    fees: 120000,
    rating: 4.4,
    overview:
      "Sample profile: A specialized institute renowned for chemical engineering and pharmaceutical sciences with strong core-sector placements.",
    courses: [
      { name: "B.Tech Chemical Engineering", duration: "4 Years" },
      { name: "B.Pharm", duration: "4 Years" },
    ],
    placements: { averagePackage: 1300000, highestPackage: 4700000, placementPercentage: 90 },
    exams: ["MHT CET", "JEE Main"],
    cutoff: [{ exam: "MHT CET", closingRank: 800 }],
    reviews: [
      { author: "Sanjana J.", rating: 5, comment: "Sample review: Best in India for chemical engineering." },
      { author: "Aniket M.", rating: 4, comment: "Sample review: Small but highly focused campus." },
    ],
  },
  {
    name: "Punjab Engineering College",
    location: { city: "Chandigarh", state: "Chandigarh" },
    fees: 130000,
    rating: 4.0,
    overview:
      "Sample profile: A well-established institute of national importance located in a planned city, with a strong civil and mechanical legacy.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 850000, highestPackage: 3400000, placementPercentage: 80 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 16000 }],
    reviews: [
      { author: "Kiran D.", rating: 4, comment: "Sample review: Clean campus in a well-planned city." },
      { author: "Naveen T.", rating: 3, comment: "Sample review: Hostel facilities need an upgrade." },
    ],
  },
  {
    name: "Indian Institute of Technology Roorkee",
    location: { city: "Roorkee", state: "Uttarakhand" },
    fees: 213000,
    rating: 4.6,
    overview:
      "Sample profile: One of the oldest technical institutions in Asia with a scenic riverside campus and strong civil engineering heritage.",
    courses: [
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 1900000, highestPackage: 8500000, placementPercentage: 92 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 700 }],
    reviews: [
      { author: "Yashika A.", rating: 5, comment: "Sample review: Beautiful campus with strong academics." },
      { author: "Deepak R.", rating: 4, comment: "Sample review: Great mix of heritage and modern facilities." },
    ],
  },
  {
    name: "Indian Institute of Technology Guwahati",
    location: { city: "Guwahati", state: "Assam" },
    fees: 212000,
    rating: 4.5,
    overview:
      "Sample profile: A picturesque campus by the Brahmaputra river, known for its close-knit community and growing research output.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Chemical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 1850000, highestPackage: 8000000, placementPercentage: 91 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 900 }],
    reviews: [
      { author: "Bhaskar N.", rating: 5, comment: "Sample review: Stunning campus and friendly community." },
      { author: "Trisha B.", rating: 4, comment: "Sample review: Slightly remote but very self-sufficient." },
    ],
  },
  {
    name: "National Institute of Technology Rourkela",
    location: { city: "Rourkela", state: "Odisha" },
    fees: 155000,
    rating: 4.2,
    overview:
      "Sample profile: A growing NIT with steadily improving placement records and a strong metallurgical engineering department.",
    courses: [
      { name: "B.Tech Metallurgical Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 1150000, highestPackage: 3900000, placementPercentage: 86 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 12000 }],
    reviews: [
      { author: "Subham P.", rating: 4, comment: "Sample review: Improving infrastructure year over year." },
      { author: "Ipsita M.", rating: 4, comment: "Sample review: Good support for higher studies aspirants." },
    ],
  },
  {
    name: "National Institute of Technology Calicut",
    location: { city: "Kozhikode", state: "Kerala" },
    fees: 150000,
    rating: 4.2,
    overview:
      "Sample profile: A well-regarded NIT with a strong architecture program alongside its core engineering disciplines.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Arch", duration: "5 Years" },
    ],
    placements: { averagePackage: 1250000, highestPackage: 4400000, placementPercentage: 87 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 6500 }],
    reviews: [
      { author: "Fathima R.", rating: 4, comment: "Sample review: Great architecture program reputation." },
      { author: "Vishnu S.", rating: 4, comment: "Sample review: Green campus close to the coast." },
    ],
  },
  {
    name: "Jaypee Institute of Information Technology",
    location: { city: "Noida", state: "Uttar Pradesh" },
    fees: 190000,
    rating: 3.8,
    overview:
      "Sample profile: A private institute focused specifically on IT and computer science education with proximity to Delhi NCR's tech industry.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Information Technology", duration: "4 Years" },
    ],
    placements: { averagePackage: 620000, highestPackage: 2900000, placementPercentage: 75 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 28000 }],
    reviews: [
      { author: "Abhinav L.", rating: 4, comment: "Sample review: Good access to NCR internship opportunities." },
      { author: "Ritu K.", rating: 3, comment: "Sample review: Class sizes could be smaller." },
    ],
  },
  {
    name: "PSG College of Technology",
    location: { city: "Coimbatore", state: "Tamil Nadu" },
    fees: 110000,
    rating: 4.3,
    overview:
      "Sample profile: A highly regarded autonomous engineering college in South India with excellent industry linkages and alumni support.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 880000, highestPackage: 3700000, placementPercentage: 88 },
    exams: ["TNEA"],
    cutoff: [{ exam: "TNEA", closingRank: 2200 }],
    reviews: [
      { author: "Gokul V.", rating: 5, comment: "Sample review: Strong alumni network across industries." },
      { author: "Nandhini S.", rating: 4, comment: "Sample review: Great labs and workshop facilities." },
    ],
  },
  {
    name: "R.V. College of Engineering",
    location: { city: "Bengaluru", state: "Karnataka" },
    fees: 200000,
    rating: 4.3,
    overview:
      "Sample profile: One of Bengaluru's top private engineering colleges with strong placement links to the city's IT industry.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Electronics and Communication", duration: "4 Years" },
    ],
    placements: { averagePackage: 1050000, highestPackage: 4200000, placementPercentage: 89 },
    exams: ["KCET"],
    cutoff: [{ exam: "KCET", closingRank: 1500 }],
    reviews: [
      { author: "Chirag H.", rating: 4, comment: "Sample review: Excellent connect with Bangalore tech companies." },
      { author: "Megha B.", rating: 4, comment: "Sample review: Competitive but rewarding environment." },
    ],
  },
  {
    name: "BMS College of Engineering",
    location: { city: "Bengaluru", state: "Karnataka" },
    fees: 190000,
    rating: 4.2,
    overview:
      "Sample profile: A long-established autonomous college in Bengaluru known for consistent academic performance and industry visits.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Civil Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 980000, highestPackage: 3900000, placementPercentage: 87 },
    exams: ["KCET"],
    cutoff: [{ exam: "KCET", closingRank: 1800 }],
    reviews: [
      { author: "Sagar N.", rating: 4, comment: "Sample review: Reputed faculty and legacy institution." },
      { author: "Vidya R.", rating: 4, comment: "Sample review: Good mix of academics and events." },
    ],
  },
  {
    name: "Motilal Nehru National Institute of Technology",
    location: { city: "Allahabad", state: "Uttar Pradesh" },
    fees: 152000,
    rating: 4.0,
    overview:
      "Sample profile: A central NIT with a compact campus and reasonably strong core-branch placement history.",
    courses: [
      { name: "B.Tech Electronics and Communication", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 1050000, highestPackage: 3600000, placementPercentage: 83 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 14000 }],
    reviews: [
      { author: "Utkarsh P.", rating: 4, comment: "Sample review: Decent placements, active student council." },
      { author: "Shreya V.", rating: 3, comment: "Sample review: Campus facilities are functional but basic." },
    ],
  },
  {
    name: "Indian Institute of Technology Hyderabad",
    location: { city: "Hyderabad", state: "Telangana" },
    fees: 214000,
    rating: 4.5,
    overview:
      "Sample profile: A newer-generation IIT with a modern campus, strong emphasis on interdisciplinary programs and design.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Engineering Physics", duration: "4 Years" },
    ],
    placements: { averagePackage: 1750000, highestPackage: 7200000, placementPercentage: 90 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 1200 }],
    reviews: [
      { author: "Aravind K.", rating: 4, comment: "Sample review: Modern infrastructure and design focus." },
      { author: "Nidhi G.", rating: 4, comment: "Sample review: Good research culture for a newer IIT." },
    ],
  },
  {
    name: "Indian Institute of Technology Indore",
    location: { city: "Indore", state: "Madhya Pradesh" },
    fees: 211000,
    rating: 4.3,
    overview:
      "Sample profile: A newer IIT campus in central India with a growing reputation and increasing recruiter participation.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 1600000, highestPackage: 6500000, placementPercentage: 88 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 1600 }],
    reviews: [
      { author: "Shivam T.", rating: 4, comment: "Sample review: Rapidly improving facilities and reputation." },
      { author: "Komal J.", rating: 4, comment: "Sample review: Good city with growing IT presence." },
    ],
  },
  {
    name: "Chandigarh University",
    location: { city: "Mohali", state: "Punjab" },
    fees: 168000,
    rating: 3.7,
    overview:
      "Sample profile: A large private university with an emphasis on high placement volume and industry certification tie-ups.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years" },
      { name: "B.E. Electronics and Communication", duration: "4 Years" },
    ],
    placements: { averagePackage: 580000, highestPackage: 4500000, placementPercentage: 76 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 45000 }],
    reviews: [
      { author: "Parth M.", rating: 3, comment: "Sample review: High placement drive volume, mixed quality." },
      { author: "Isha T.", rating: 4, comment: "Sample review: Large campus with lots of activities." },
    ],
  },
  {
    name: "Lovely Professional University",
    location: { city: "Phagwara", state: "Punjab" },
    fees: 172000,
    rating: 3.7,
    overview:
      "Sample profile: One of India's largest private universities offering a wide range of engineering and non-engineering programs.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 560000, highestPackage: 4200000, placementPercentage: 74 },
    exams: ["LPUNEST"],
    cutoff: [{ exam: "LPUNEST", closingRank: 30000 }],
    reviews: [
      { author: "Gagan S.", rating: 3, comment: "Sample review: Massive campus with many recruiters visiting." },
      { author: "Ayesha N.", rating: 3, comment: "Sample review: Quality varies a lot by program." },
    ],
  },
  {
    name: "Maulana Azad National Institute of Technology",
    location: { city: "Bhopal", state: "Madhya Pradesh" },
    fees: 156000,
    rating: 4.1,
    overview:
      "Sample profile: A central India NIT with solid infrastructure and steady placement performance in core and IT roles.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Architecture", duration: "5 Years" },
    ],
    placements: { averagePackage: 1080000, highestPackage: 3700000, placementPercentage: 84 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 13500 }],
    reviews: [
      { author: "Ankur B.", rating: 4, comment: "Sample review: Well-maintained campus and hostels." },
      { author: "Juhi P.", rating: 4, comment: "Sample review: Good architecture department reputation." },
    ],
  },
  {
    name: "Sardar Vallabhbhai National Institute of Technology",
    location: { city: "Surat", state: "Gujarat" },
    fees: 157000,
    rating: 4.2,
    overview:
      "Sample profile: A well-regarded NIT in Gujarat with strong industry connect to the state's manufacturing and textile sectors.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Chemical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 1180000, highestPackage: 4100000, placementPercentage: 86 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 9800 }],
    reviews: [
      { author: "Krishna P.", rating: 4, comment: "Sample review: Good balance between core and IT placements." },
      { author: "Foram D.", rating: 4, comment: "Sample review: Clean campus, active student clubs." },
    ],
  },
  {
    name: "Indian Institute of Engineering Science and Technology Shibpur",
    location: { city: "Howrah", state: "West Bengal" },
    fees: 145000,
    rating: 4.0,
    overview:
      "Sample profile: One of the oldest engineering institutes in India, with a historic campus and improving placement outcomes.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Civil Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 990000, highestPackage: 3500000, placementPercentage: 82 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 15500 }],
    reviews: [
      { author: "Soumya G.", rating: 4, comment: "Sample review: Historic campus with strong alumni legacy." },
      { author: "Rakesh D.", rating: 3, comment: "Sample review: Infrastructure could use modernization." },
    ],
  },
  {
    name: "Guru Gobind Singh Indraprastha University",
    location: { city: "New Delhi", state: "Delhi" },
    fees: 85000,
    rating: 3.8,
    overview:
      "Sample profile: A state university with several affiliated colleges offering affordable technical education in Delhi.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Information Technology", duration: "4 Years" },
    ],
    placements: { averagePackage: 640000, highestPackage: 2600000, placementPercentage: 76 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 32000 }],
    reviews: [
      { author: "Tanvi R.", rating: 4, comment: "Sample review: Affordable with decent teaching quality." },
      { author: "Aman G.", rating: 3, comment: "Sample review: Placement support varies by affiliated college." },
    ],
  },
  {
    name: "Symbiosis Institute of Technology",
    location: { city: "Pune", state: "Maharashtra" },
    fees: 380000,
    rating: 3.9,
    overview:
      "Sample profile: A private institute under the larger Symbiosis group, known for a modern campus and diverse student body.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years" },
    ],
    placements: { averagePackage: 720000, highestPackage: 3200000, placementPercentage: 79 },
    exams: ["SET"],
    cutoff: [{ exam: "SET", closingRank: 8000 }],
    reviews: [
      { author: "Rhea K.", rating: 4, comment: "Sample review: Diverse campus with strong extracurriculars." },
      { author: "Varun J.", rating: 3, comment: "Sample review: Fees are relatively high for the outcomes." },
    ],
  },
  {
    name: "Dhirubhai Ambani Institute of Information and Communication Technology",
    location: { city: "Gandhinagar", state: "Gujarat" },
    fees: 240000,
    rating: 4.3,
    overview:
      "Sample profile: A specialized ICT-focused institute with a strong research culture and close ties to the Indian IT industry.",
    courses: [
      { name: "B.Tech Information and Communication Technology", duration: "4 Years" },
      { name: "M.Tech Computer Science", duration: "2 Years" },
    ],
    placements: { averagePackage: 1450000, highestPackage: 5200000, placementPercentage: 89 },
    exams: ["JEE Main"],
    cutoff: [{ exam: "JEE Main", closingRank: 5500 }],
    reviews: [
      { author: "Mihir S.", rating: 4, comment: "Sample review: Highly focused ICT curriculum." },
      { author: "Ridhi A.", rating: 4, comment: "Sample review: Small campus but strong industry projects." },
    ],
  },
  {
    name: "Indian Institute of Technology (BHU) Varanasi",
    location: { city: "Varanasi", state: "Uttar Pradesh" },
    fees: 216000,
    rating: 4.4,
    overview:
      "Sample profile: A historic institute located within the Banaras Hindu University campus, with a strong core engineering legacy.",
    courses: [
      { name: "B.Tech Mining Engineering", duration: "4 Years" },
      { name: "B.Tech Computer Science", duration: "4 Years" },
    ],
    placements: { averagePackage: 1700000, highestPackage: 7000000, placementPercentage: 89 },
    exams: ["JEE Advanced"],
    cutoff: [{ exam: "JEE Advanced", closingRank: 1400 }],
    reviews: [
      { author: "Aditi V.", rating: 4, comment: "Sample review: Rich heritage combined with modern academics." },
      { author: "Saurabh Y.", rating: 4, comment: "Sample review: Vibrant campus life within BHU." },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    await College.deleteMany();
    console.log("Existing college documents cleared.");

    await College.insertMany(colleges);
    console.log(`${colleges.length} colleges inserted successfully.`);

    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
