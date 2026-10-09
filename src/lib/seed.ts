import { DBData } from './types';

export const initialData: DBData = {
  stats: {
    communityMembers: 12450,
    studentsPlaced: 480,
    eventsHosted: 135,
    partnerColleges: 52,
    volunteerHours: 18200
  },
  communityMembers: [
    {
      id: "cm-1",
      memberId: "SS-2026-0012",
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
      phone: "+91 98765 43210",
      college: "Osmania University College of Engineering",
      courseBranch: "B.Tech Computer Science & Engineering",
      year: "3rd Year",
      skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js",
      interests: "Web Development, Open Source, Startup Building",
      city: "Hyderabad",
      registeredAt: "2026-09-12T10:30:00Z"
    },
    {
      id: "cm-2",
      memberId: "SS-2026-0034",
      name: "Pooja Reddy",
      email: "pooja.reddy@gmail.com",
      phone: "+91 98123 45678",
      college: "Matrusri Engineering College",
      courseBranch: "B.E. Electrical & Electronics Engineering",
      year: "4th Year",
      skills: "Python, IoT, Arduino, Data Analysis",
      interests: "Clean Tech, Robotics, Core Engineering",
      city: "Hyderabad",
      registeredAt: "2026-09-15T14:20:00Z"
    },
    {
      id: "cm-3",
      memberId: "SS-2026-0089",
      name: "Rohan Varma",
      email: "rohan.varma@outlook.com",
      phone: "+91 99554 11223",
      college: "JNTU Hyderabad",
      courseBranch: "B.Tech Information Technology",
      year: "2nd Year",
      skills: "Figma, UI/UX Design, Graphic Design, Video Editing",
      interests: "Product Design, SS Band, Media Production",
      city: "Hyderabad",
      registeredAt: "2026-09-20T18:45:00Z"
    },
    {
      id: "cm-4",
      memberId: "SS-2026-0112",
      name: "Ananya Iyer",
      email: "ananya.iyer@gmail.com",
      phone: "+91 97441 23456",
      college: "Chaitanya Bharathi Institute of Technology (CBIT)",
      courseBranch: "B.Tech Artificial Intelligence & ML",
      year: "3rd Year",
      skills: "PyTorch, Scikit-Learn, Python, SQL, Prompt Engineering",
      interests: "AI Research, Hackathons, Public Speaking",
      city: "Hyderabad",
      registeredAt: "2026-09-28T09:15:00Z"
    }
  ],
  opportunities: [
    {
      id: "opp-1",
      title: "Frontend Developer Intern (Next.js & Tailwind)",
      category: "Internships",
      companyOrOrg: "SS Tech Labs x Fintech Partner",
      location: "Remote / Hybrid (Hyderabad)",
      type: "3 Months (PPO Potential)",
      stipendOrPerks: "₹25,000 / month + Mentorship",
      description: "Work directly on high-traffic fintech dashboards and student portals. You will build slick interfaces using Next.js 14, Tailwind CSS, and TanStack Query.",
      requirements: ["Strong hands-on experience in React or Next.js", "Solid CSS/Tailwind skills", "Git workflow familiarity", "Willingness to learn fast"],
      deadline: "2026-10-31",
      status: "Open",
      applicantsCount: 42,
      createdAt: "2026-10-01T08:00:00Z"
    },
    {
      id: "opp-2",
      title: "Junior Cloud Infrastructure Associate",
      category: "Jobs",
      companyOrOrg: "CloudScale Systems",
      location: "Hyderabad, Telangana",
      type: "Full-Time (Entry Level)",
      stipendOrPerks: "₹7.5 LPA - ₹9.0 LPA + Health Insurance",
      description: "Ideal for 2026 graduates. Manage cloud deployments, container orchestration using Docker/K8s, and automated CI/CD pipelines.",
      requirements: ["B.Tech/B.E in CS/IT/ECE (2025/2026 Batch)", "Basics of Linux and AWS/GCP", "Understanding of networking and APIs"],
      deadline: "2026-11-05",
      status: "Open",
      applicantsCount: 28,
      createdAt: "2026-10-02T11:00:00Z"
    },
    {
      id: "opp-3",
      title: "SS Campus Ambassador Leader (Cohort 2026-27)",
      category: "Campus Ambassador",
      companyOrOrg: "Struggle of Student (SS) Headquarters",
      location: "On-Campus (All Indian Colleges)",
      type: "Semester Long Fellowship",
      stipendOrPerks: "Performance Stipend + SS Official Merch + Leadership Certificate",
      description: "Be the official face and driving voice of Struggle of Student at your university campus. Lead tech workshops, cultural jam sessions, and placement drives.",
      requirements: ["Enrolled student at any recognized college", "High energy, networking drive, and proactive communication", "Passion for community building"],
      deadline: "2026-10-28",
      status: "Open",
      applicantsCount: 115,
      createdAt: "2026-09-25T14:00:00Z"
    },
    {
      id: "opp-4",
      title: "Lead Vocalist & Rhythm Guitarist",
      category: "Talent Showcase",
      companyOrOrg: "SS Band (Struggle of Student Musical Wing)",
      location: "Hyderabad Jam Rooms & College Fests",
      type: "Performance Contract & Band Member",
      stipendOrPerks: "Per Gig Remuneration + Studio Recording Time",
      description: "SS Band is expanding! We are scouting passionate student musicians who love rock, indie-fusion, and acoustic sets to perform at marquee college festivals.",
      requirements: ["Vocal range or acoustic/electric guitar proficiency", "Availability for weekend practice sessions", "Stage presence and passion"],
      deadline: "2026-11-10",
      status: "Open",
      applicantsCount: 19,
      createdAt: "2026-10-03T16:00:00Z"
    },
    {
      id: "opp-5",
      title: "Community Operations Lead",
      category: "Leadership",
      companyOrOrg: "Struggle of Student Core Council",
      location: "Hybrid (Hyderabad)",
      type: "Student Leadership Council",
      stipendOrPerks: "Executive Recommendation + Monthly Honorarium",
      description: "Coordinate cross-functional initiatives between student problem clinics, career mentorships, and our IT solution agency.",
      requirements: ["Previous club or fest coordination experience", "Organized and empathetic leadership style"],
      deadline: "2026-10-20",
      status: "Closed",
      applicantsCount: 54,
      createdAt: "2026-09-18T10:00:00Z"
    },
    {
      id: "opp-6",
      title: "AI Hackathon: Student Life Automation Challenge",
      category: "Projects",
      companyOrOrg: "SS IT Solutions x Google Developer Groups",
      location: "Virtual & In-Person Finale",
      type: "48-Hour Hackathon",
      stipendOrPerks: "₹1,00,000 Cash Pool + Cloud Credits",
      description: "Build AI-driven utilities that solve genuine student struggles — from smart exam prep assistants to campus roommate compatibility and budget trackers.",
      requirements: ["Teams of 2 to 4 students", "Working prototype with public GitHub repo"],
      deadline: "2026-11-15",
      status: "Open",
      applicantsCount: 88,
      createdAt: "2026-10-04T12:00:00Z"
    },
    {
      id: "opp-7",
      title: "Student Mental Health Peer Counselor",
      category: "Volunteering",
      companyOrOrg: "SS Student Guidance Cell",
      location: "Remote / Online Helpline",
      type: "Volunteer Commitment (4 hrs/week)",
      stipendOrPerks: "Certified Counseling Training + Social Impact Credential",
      description: "Trained under licensed psychologists to provide active listening, exam anxiety relief, and peer problem-solving to students in distress.",
      requirements: ["Empathetic, mature listener", "Completion of SS 3-day peer support orientation"],
      deadline: "2026-10-30",
      status: "Open",
      applicantsCount: 36,
      createdAt: "2026-10-01T09:00:00Z"
    },
    {
      id: "opp-8",
      title: "College Tech Fest Partner & Cross-Promotion",
      category: "Collaborations",
      companyOrOrg: "SS Event Management",
      location: "Pan-India",
      type: "Institutional Partnership",
      stipendOrPerks: "Stage Sponsorship + Live Band Performance + Ticketing Platform",
      description: "Colleges and student councils can partner with SS to supercharge their annual fests with our audio-visual setup, event management team, and SS Band.",
      requirements: ["Official college festival committee or student body approval"],
      deadline: "2026-12-01",
      status: "Open",
      applicantsCount: 14,
      createdAt: "2026-09-29T10:00:00Z"
    },
    {
      id: "opp-9",
      title: "System Design for College Placements Masterclass",
      category: "Workshops/Sessions",
      companyOrOrg: "SS Placement Mentorship Hub",
      location: "Interactive Online Live Session",
      type: "Weekend Bootcamp",
      stipendOrPerks: "Free Access + Curated Placement Sheet & Mock Interviews",
      description: "A 2-day deep dive by Senior Engineers from Amazon & Microsoft covering Low-Level and High-Level Design questions asked in campus interviews.",
      requirements: ["Open to 2nd, 3rd, and 4th year engineering students"],
      deadline: "2026-10-24",
      status: "Open",
      applicantsCount: 310,
      createdAt: "2026-10-05T09:00:00Z"
    }
  ],
  opportunityApplications: [
    {
      id: "app-1",
      opportunityId: "opp-1",
      opportunityTitle: "Frontend Developer Intern (Next.js & Tailwind)",
      name: "Sai Teja",
      email: "saiteja.dev@gmail.com",
      phone: "+91 99887 76655",
      college: "VNR VJIET",
      year: "3rd Year",
      resumeLink: "https://drive.google.com/file/d/example-resume-1",
      portfolio: "https://github.com/saiteja-dev",
      statement: "I have built 3 production apps with Next.js and Tailwind. I really align with SS's mission to solve student problems.",
      submittedAt: "2026-10-06T11:20:00Z",
      status: "Shortlisted"
    }
  ],
  events: [
    {
      id: "evt-1",
      title: "SS Mega Youth Summit & Cultural Fest 2026",
      date: "2026-10-28",
      time: "10:00 AM - 08:00 PM IST",
      location: "Shilpakala Vedika / Campus Auditorium, Hyderabad",
      type: "In-Person",
      description: "Our flagship annual festival bringing together 3,000+ students, top tech founders, placement recruiters, followed by an electrifying live concert by the SS Band!",
      bannerImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      maxCapacity: 1200,
      registeredCount: 840,
      volunteerCapacity: 15,
      volunteerFilled: 8,
      status: "Upcoming",
      speakers: [
        { name: "Dr. K. Srinivas", role: "Dean & EdTech Pioneer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
        { name: "Tanvi Saxena", role: "Staff Engineer @ Google", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
        { name: "Kunal Deshmukh", role: "Founder, SS Band", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
      ],
      createdAt: "2026-09-20T10:00:00Z"
    },
    {
      id: "evt-2",
      title: "Campus to Corporate: Cracking Top Tier Placements",
      date: "2026-10-22",
      time: "06:30 PM - 09:00 PM IST",
      location: "Virtual (SS Interactive Stage)",
      type: "Online",
      description: "Demystifying tech and non-tech placement rounds. Hear first-hand strategies from recent SS members who secured offers at Microsoft, Amazon, and Razorpay.",
      bannerImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      maxCapacity: 500,
      registeredCount: 420,
      volunteerCapacity: 12,
      volunteerFilled: 12,
      status: "Upcoming",
      speakers: [
        { name: "Vikram Nambiar", role: "SDE @ Microsoft", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { name: "Sneha Mukherjee", role: "Product Manager @ Razorpay", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
      ],
      createdAt: "2026-09-25T14:30:00Z"
    },
    {
      id: "evt-3",
      title: "Student Hackathon: Zero to MVP in 36 Hours",
      date: "2026-11-08",
      time: "09:00 AM IST onwards",
      location: "T-Hub Innovation Hub / Hybrid",
      type: "Hybrid",
      description: "Build full-stack solutions solving real student challenges. Mentorship by industry architects, free food, and instant prototype validation.",
      bannerImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      maxCapacity: 300,
      registeredCount: 185,
      volunteerCapacity: 20,
      volunteerFilled: 5,
      status: "Upcoming",
      speakers: [
        { name: "Harish Rao", role: "CTO, SS IT Solutions", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" }
      ],
      createdAt: "2026-10-01T08:00:00Z"
    }
  ],
  eventRegistrations: [
    {
      id: "ereg-1",
      eventId: "evt-1",
      eventTitle: "SS Mega Youth Summit & Cultural Fest 2026",
      name: "Gautam Krishna",
      email: "gautam.k@gmail.com",
      phone: "+91 91234 56789",
      college: "CBIT",
      ticketCode: "EVT-SS-9102",
      registeredAt: "2026-10-06T15:20:00Z"
    }
  ],
  volunteerApplications: [
    {
      id: "vol-1",
      eventId: "evt-1",
      eventTitle: "SS Mega Youth Summit & Cultural Fest 2026",
      name: "Neha Joshi",
      email: "neha.joshi@gmail.com",
      phone: "+91 93456 78120",
      college: "MECS Hyderabad",
      preferredRole: "Crowd Management & Guest Reception",
      experience: "Organized College Annual Day 2025 and managed stage coordination.",
      status: "Approved",
      appliedAt: "2026-10-02T10:15:00Z"
    },
    {
      id: "vol-2",
      eventId: "evt-1",
      eventTitle: "SS Mega Youth Summit & Cultural Fest 2026",
      name: "Aditya Roy",
      email: "aditya.roy@gmail.com",
      phone: "+91 98765 00112",
      college: "JNTUH",
      preferredRole: "Technical & Audio-Visual Crew",
      experience: "Sound engineer for university cultural club, familiar with mixers and live streaming.",
      status: "Approved",
      appliedAt: "2026-10-03T12:45:00Z"
    }
  ],
  onlineMeetings: [
    {
      id: "meet-1",
      title: "Mental Wellness & Overcoming College Anxiety AMA",
      description: "An open, safe, confidential peer session led by senior counselors discussing exam stress, backlog anxiety, and career pressure.",
      date: "2026-10-21",
      time: "07:00 PM IST",
      durationMinutes: 60,
      participantCapacity: 100,
      participantCount: 68,
      meetingLink: "https://meet.google.com/ss-wellness-circle",
      provider: "Manual",
      status: "Scheduled",
      createdAt: "2026-10-02T12:00:00Z"
    },
    {
      id: "meet-2",
      title: "Live Resume Roasting & LinkedIn Profile Optimization",
      description: "Get your resume reviewed live on screen. Real-time feedback on formatting, impactful bullet points, and ATS compliance.",
      date: "2026-10-26",
      time: "08:00 PM IST",
      durationMinutes: 75,
      participantCapacity: 250,
      participantCount: 194,
      meetingLink: "https://meet.google.com/ss-resume-clinic",
      provider: "Zoom",
      zoomMeetingId: "982 4410 8821",
      zoomPassword: "SS2026Session",
      status: "Scheduled",
      createdAt: "2026-10-03T15:00:00Z"
    }
  ],
  meetingRegistrations: [
    {
      id: "mreg-1",
      meetingId: "meet-1",
      meetingTitle: "Mental Wellness & Overcoming College Anxiety AMA",
      name: "Siddharth Rao",
      email: "siddharth.rao@gmail.com",
      college: "BVRIT",
      registeredAt: "2026-10-05T09:30:00Z"
    }
  ],
  services: [
    {
      id: "srv-band",
      name: "SS Band",
      tagline: "High-Energy Student Musical Experience & Live Gig Production",
      description: "SS Band is our celebrated youth musical wing! Combining passionate student talent across rock, indie-fusion, regional melodies, and unplugged acoustic sessions. We perform at premier college fests, graduation nights, and youth cultural festivals.",
      features: [
        "Dynamic live concert sets (Bollywood rock, indie pop, regional covers & originals)",
        "Professional stage audio gear and instrument setup included",
        "Engaging crowd interaction that turns any campus fest into an unforgettable celebration",
        "Custom acoustic sets for intimate campus evenings and cultural gatherings"
      ],
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
      badge: "Youth Music Wing",
      contactCta: "Book SS Band for Your Fest"
    },
    {
      id: "srv-events",
      name: "SS Event Management",
      tagline: "End-to-End College Fests, Hackathons & Youth Summits",
      description: "Planning a college fest, technical symposium, or sports carnival? Let SS handle the heavy lifting. From artist management and stage engineering to online ticketing and campus-wide footfall generation, we make events seamless.",
      features: [
        "End-to-end festival planning and timeline execution",
        "Stage fabrication, concert sound, dynamic lighting, and LED screens",
        "Celebrity & youth influencer coordination with zero hassle",
        "Digital ticketing, volunteer deployment, and crowd security management"
      ],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
      badge: "Premier Event Partner",
      contactCta: "Request Event Management Proposal"
    },
    {
      id: "srv-it",
      name: "SS IT Solutions",
      tagline: "Custom Web, Mobile & Software Solutions Built by Top Student Devs",
      description: "We help institutions, student startups, and clubs build modern, scalable web and mobile software. High-quality execution at student-friendly pricing, mentored by senior industry engineers.",
      features: [
        "Modern Responsive Websites (Next.js, React, Tailwind CSS)",
        "College Fest Portals, Online Registration & Payment Portals",
        "Student Community Management Systems and Mobile Apps",
        "SEO, Cloud Hosting Deployment, and Maintenance Support"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      badge: "Tech Development Wing",
      contactCta: "Get a Free Project Quote"
    },
    {
      id: "srv-guidance",
      name: "Student Problems & Guidance",
      tagline: "Confidential Academic, Career & Mental Well-being Support",
      description: "Students face immense unseen pressure: backlogs, attendance disputes, hostel issues, mental fatigue, and toxic peer comparison. The SS Guidance Cell provides safe, non-judgmental counseling and action steps.",
      features: [
        "1-on-1 confidential peer counseling and mental wellness listening rooms",
        "Academic crisis navigation (backlog clearing roadmaps, syllabus breakdown)",
        "Guidance on university regulations, re-evaluations, and administrative grievances",
        "Zero fees — 100% committed to student mental safety and happiness"
      ],
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
      badge: "24/7 Student Support",
      contactCta: "Speak Confidentially With a Mentor"
    },
    {
      id: "srv-career",
      name: "Career & Internship Opportunities",
      tagline: "Direct Corporate Placements, Verified Internships & Career Roadmaps",
      description: "Bridging the critical gap between college syllabus and industry demand. We partner with over 60+ tech startups, corporations, and research labs to bring vetted internships and job drives directly to you.",
      features: [
        "Direct referrals to hiring managers at partner companies",
        "1-on-1 Resume roast and ATS score optimization",
        "DSA, System Design, and Behavioral Mock Interviews with FAANG engineers",
        "Off-campus drive alerts with insider hiring tips"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      badge: "Career Launchpad",
      contactCta: "Explore Career Support"
    },
    {
      id: "srv-other",
      name: "Other Services",
      tagline: "Campus Merch, Club Sponsorships & Media Production",
      description: "Supporting student clubs and societies with high-grade custom oversized hoodies, t-shirts, badge printing, fest media production, and corporate sponsorship matching.",
      features: [
        "Custom college club apparel & merchandise manufacturing",
        "Drone cinematography and post-event aftermovie production",
        "Sponsorship pitch deck structuring and brand matching",
        "Equipment rentals (DSLR cameras, sound mixers, portable stages)"
      ],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      badge: "Campus Ecosystem",
      contactCta: "Enquire About Other Services"
    }
  ],
  serviceEnquiries: [
    {
      id: "enq-1",
      serviceId: "srv-band",
      serviceName: "SS Band",
      clientName: "Sanjay Gupta",
      email: "sanjay.fest@vardhaman.org",
      phone: "+91 94411 22334",
      organizationOrCollege: "Vardhaman College of Engineering",
      requirements: "Looking for an energetic 90-minute live performance for our Annual Cult Night on Nov 14th.",
      budgetOrTimeline: "Budget ₹40,000 | Event Date: 14 Nov 2026",
      status: "New",
      createdAt: "2026-10-06T14:10:00Z"
    }
  ],
  teamMembers: [
    {
      id: "tm-1",
      name: "Karthik Namboodiri",
      designation: "Head of Engineering",
      shortBio: "Final-year CS enthusiast passionate about distributed systems and building scalable tools for student empowerment.",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      department: "Technology",
      isActive: true,
      order: 1
    },
    {
      id: "tm-2",
      name: "Shruti Deshmukh",
      designation: "Lead, Community & College Outreach",
      shortBio: "Manages 45+ campus ambassadors, fostering peer study circles and organizing pan-college hackathons.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com",
      github: "",
      department: "Community",
      isActive: true,
      order: 2
    },
    {
      id: "tm-3",
      name: "Arjun Reddy",
      designation: "Lead Vocalist & Band Manager",
      shortBio: "Composer and vocalist steering the SS Band. Believes music has the power to unite and energize youth.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com",
      github: "",
      department: "SS Band",
      isActive: true,
      order: 3
    },
    {
      id: "tm-4",
      name: "Meera Nair",
      designation: "Director of Student Counseling & Well-being",
      shortBio: "Psychology postgraduate focusing on student mental resilience, exam stress alleviation, and peer counseling.",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com",
      github: "",
      department: "Student Guidance",
      isActive: true,
      order: 4
    },
    {
      id: "tm-5",
      name: "Varun Teja",
      designation: "Head of Corporate Relations & Placements",
      shortBio: "Connects leading startups and Fortune 500 hiring managers with vetted talent from the SS Community.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com",
      github: "",
      department: "Career & Placements",
      isActive: true,
      order: 5
    },
    {
      id: "tm-6",
      name: "Divya Prakash",
      designation: "Creative Director & Media Producer",
      shortBio: "Visual designer and motion artist shaping SS's brand identity, social reels, and festival stage visuals.",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com",
      github: "",
      department: "Media & Design",
      isActive: true,
      order: 6
    }
  ],
  leadership: [
    {
      id: "lead-1",
      name: "V. Sai Praneeth",
      designation: "Founder & Executive President",
      bio: "Founded Struggle of Student with the fundamental belief that no student should face academic anxiety or career roadblocks alone. Started as a small peer group in Hyderabad and scaled it into a movement touching 12,000+ students across multiple states.",
      responsibility: "Overall Vision, Strategic Institutional Partnerships, Community Governance, and National Expansion.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      order: 1
    },
    {
      id: "lead-2",
      name: "Ananya Mukherjee",
      designation: "Co-Founder & Director of Operations",
      bio: "Operational mastermind orchestrating campus programs, regional chapters, and volunteer battalions. Passionate about empowering underprivileged engineering students with free resources.",
      responsibility: "Campus Ambassador Network, Event Logistics, Volunteer Operations, and Pan-India Chapter Coordination.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      order: 2
    },
    {
      id: "lead-3",
      name: "Dr. Rakesh Chandran",
      designation: "Director of Academic & Career Development",
      bio: "Former Tech Architect turned Academic Evangelist with 15+ years in tier-1 tech and education consulting. Guides SS placement training and corporate onboarding.",
      responsibility: "Placement Alliances, Technical Curriculum Design, Corporate MoUs, and Career Mentorship Frameworks.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      order: 3
    }
  ],
  placements: [
    {
      id: "plc-1",
      studentName: "Manish Kumar",
      college: "MECS Hyderabad",
      company: "Google",
      role: "Software Engineering Intern",
      packageOrStipend: "₹1,25,000 / month",
      batch: "2026 Batch",
      successStory: "Coming from a tier-3 college, I had zero guidance on how to clear FAANG coding rounds. Through SS placement sprints and 1-on-1 mock interviews, I cracked Google!",
      studentPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      featured: true
    },
    {
      id: "plc-2",
      studentName: "Bhavana Rao",
      college: "CBIT Hyderabad",
      company: "Microsoft",
      role: "Associate Cloud Solutions Architect",
      packageOrStipend: "₹18.5 LPA",
      batch: "2025 Batch",
      successStory: "The system design live bootcamps organized by SS gave me the confidence to ace Microsoft's multi-stage rounds. Forever grateful to the SS mentors!",
      studentPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
      featured: true
    },
    {
      id: "plc-3",
      studentName: "Karthik Verma",
      college: "VNR VJIET",
      company: "Amazon",
      role: "Software Development Engineer - 1",
      packageOrStipend: "₹24.0 LPA",
      batch: "2025 Batch",
      successStory: "I struggled with DSA consistency until I joined the SS 100-Days Problem Solving Squad. The peer accountability made all the difference.",
      studentPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      featured: true
    },
    {
      id: "plc-4",
      studentName: "Sahithi V.",
      college: "JNTU College of Engineering",
      company: "Razorpay",
      role: "Frontend Engineer Intern",
      packageOrStipend: "₹45,000 / month",
      batch: "2026 Batch",
      successStory: "SS IT Solutions gave me my first live production codebase experience. When Razorpay interviewed me, my portfolio stood out completely.",
      studentPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
      featured: true
    },
    {
      id: "plc-5",
      studentName: "Abhishek Sen",
      college: "Gokaraju Rangaraju (GRIET)",
      company: "Zomato",
      role: "Product Growth Associate",
      packageOrStipend: "₹12.0 LPA",
      batch: "2025 Batch",
      successStory: "My experience coordinating large-scale campus events with SS Event Management became the anchor of my product management interviews.",
      studentPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      featured: true
    }
  ],
  contactMessages: [
    {
      id: "msg-1",
      name: "Suresh Pillai",
      email: "suresh.p@gmail.com",
      phone: "+91 99001 22334",
      subject: "Campus Ambassador inquiry for Kerala region",
      message: "Hello SS Team, we have a student circle in Kochi and would love to officially represent Struggle of Student here.",
      status: "Unread",
      createdAt: "2026-10-07T11:00:00Z"
    }
  ]
};
