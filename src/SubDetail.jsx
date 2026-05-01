import { Link, useParams } from "react-router-dom";
import { getChartData } from "./dataStore";
import "./App.css";

const COURSE_PROFILES = [
  {
    keywords: ["c.a.", "chartered accountancy"],
    overview:
      "Chartered Accountancy is a professional commerce qualification focused on accounting, auditing, taxation, finance, and business law.",
    eligibility: "Usually starts after 12th Commerce through CA Foundation, followed by Intermediate, articleship, and Final.",
    selection: "ICAI CA Foundation, Intermediate, practical training, and Final examinations.",
    scope: "Chartered Accountant, auditor, tax consultant, finance manager, compliance advisor, or independent practitioner.",
    nextSteps: "Register for CA Foundation, strengthen accounts and law basics, and plan for articleship after Intermediate."
  },
  {
    keywords: ["c.m.a.", "cost"],
    overview:
      "CMA focuses on cost accounting, management accounting, budgeting, audit, taxation, and financial decision-making for businesses.",
    eligibility: "Open after 12th through CMA Foundation, then Intermediate and Final levels.",
    selection: "Institute-level CMA Foundation, Intermediate, and Final examinations.",
    scope: "Cost accountant, management accountant, financial analyst, internal auditor, pricing analyst, or corporate finance professional.",
    nextSteps: "Start with CMA Foundation and build strong accounting, costing, statistics, and business law fundamentals."
  },
  {
    keywords: ["c.s.", "company secretary"],
    overview:
      "Company Secretary is a governance and compliance profession covering company law, corporate filings, board processes, and legal documentation.",
    eligibility: "Students can begin after 12th through the CSEET route, then Executive and Professional levels.",
    selection: "ICSI CSEET, Executive Programme, practical training, and Professional Programme.",
    scope: "Company Secretary, compliance officer, governance professional, legal documentation executive, or corporate advisor.",
    nextSteps: "Prepare for CSEET and develop comfort with business law, communication, and corporate compliance."
  },
  {
    keywords: ["m.b.b.s.", "mbbs"],
    overview:
      "MBBS is the primary medical degree for becoming an allopathic doctor. It includes pre-clinical, para-clinical, clinical subjects, and internship.",
    eligibility: "12th Science with Physics, Chemistry, Biology, and NEET-UG qualification as per current admission rules.",
    selection: "NEET-UG followed by counselling for government, private, deemed, or other medical colleges.",
    scope: "Doctor, medical officer, hospital resident, public health professional, or postgraduate specialist through MD/MS.",
    nextSteps: "Focus on NEET Biology, Chemistry, and Physics, then plan internship and postgraduate specialization options."
  },
  {
    keywords: ["b.d.s.", "bds", "m.d.s.", "mds"],
    overview:
      "Dental education trains students in oral health, dental surgery, prosthodontics, orthodontics, periodontics, and preventive dentistry.",
    eligibility: "12th Science PCB with NEET-UG for BDS; BDS is required for MDS.",
    selection: "NEET-UG for BDS and NEET-MDS or equivalent postgraduate counselling for MDS.",
    scope: "Dentist, oral surgeon, orthodontic assistant/specialist, dental clinic owner, hospital dentist, or academician.",
    nextSteps: "Prepare for NEET-UG, build clinical hand skills, and explore MDS specializations after BDS."
  },
  {
    keywords: ["b.a.m.s.", "ayur"],
    overview:
      "BAMS combines Ayurvedic medical science with modern anatomy, physiology, diagnosis, and clinical practice.",
    eligibility: "12th Science PCB with NEET-UG qualification for most recognized Ayurveda colleges.",
    selection: "NEET-UG and AYUSH counselling where applicable.",
    scope: "Ayurvedic doctor, wellness consultant, hospital practitioner, researcher, medical officer, or postgraduate Ayurveda specialist.",
    nextSteps: "Prepare for NEET-UG and understand AYUSH counselling, internships, and MD Ayurveda options."
  },
  {
    keywords: ["b.h.m.s.", "homeopathy", "homoeopathy"],
    overview:
      "BHMS trains students in homeopathic medicine, patient diagnosis, pathology, materia medica, pharmacy, and clinical practice.",
    eligibility: "12th Science PCB with NEET-UG qualification for recognized homeopathy colleges.",
    selection: "NEET-UG and AYUSH counselling where applicable.",
    scope: "Homeopathic doctor, clinic practitioner, hospital consultant, researcher, or postgraduate homeopathy specialist.",
    nextSteps: "Prepare for NEET-UG and compare BHMS colleges, internship structure, and MD Homeopathy routes."
  },
  {
    keywords: ["nursing", "b.p.th", "bpt", "paramedical", "b.m.l.t.", "bmlt", "d.m.l.t.", "mlt", "laboratory technician"],
    overview:
      "Nursing, physiotherapy, lab technology, and paramedical courses prepare students for direct patient care, diagnostics, rehabilitation, and hospital support services.",
    eligibility: "Usually 12th Science, often PCB, with college or state-level admission rules depending on the course.",
    selection: "NEET, state CET, institute entrance, or merit-based admission depending on the program and institution.",
    scope: "Nurse, physiotherapist, lab technologist, hospital technician, rehabilitation assistant, diagnostic center professional, or public health worker.",
    nextSteps: "Check the exact course approval, internship/clinical training, registration requirements, and hospital placement record."
  },
  {
    keywords: ["b.pharm", "pharmacy", "m.pharm"],
    overview:
      "Pharmacy courses cover medicines, pharmacology, pharmaceutical chemistry, formulation, quality control, and patient-facing pharmacy practice.",
    eligibility: "12th Science with PCM or PCB for B.Pharm; B.Pharm is required for M.Pharm.",
    selection: "State CET, institute entrance, or merit-based admission depending on the state and college.",
    scope: "Pharmacist, production executive, quality analyst, medical representative, clinical research associate, regulatory affairs executive, or M.Pharm specialist.",
    nextSteps: "Study chemistry and biology well, compare PCI-approved colleges, and decide between industry, hospital, or research pathways."
  },
  {
    keywords: ["b.e.", "b.tech", "engineering", "i.i.t", "iit", "n.i.t", "nit", "m.tech", "m.e.", "a.m.i.e"],
    overview:
      "Engineering builds technical skills for designing, building, operating, and improving systems across civil, mechanical, electrical, computer, electronics, and allied branches.",
    eligibility: "12th Science PCM for degree engineering; 10th or 12th routes may apply for diploma engineering.",
    selection: "JEE, MHT-CET, state CET, diploma lateral entry, or institute counselling depending on the route.",
    scope: "Engineer, software developer, project engineer, site engineer, analyst, design engineer, government technical officer, or postgraduate specialist.",
    nextSteps: "Choose a branch carefully, prepare for entrance exams, and compare colleges by labs, placements, accreditation, and internships."
  },
  {
    keywords: ["b.arch", "m.arch", "planning", "landscape", "interior"],
    overview:
      "Architecture, planning, and interior design focus on designing functional spaces, buildings, layouts, interiors, and built environments.",
    eligibility: "12th with required subjects for architecture; diploma or 12th routes may apply for interior and design programs.",
    selection: "NATA/JEE Paper 2 for architecture, or institute/state entrance for design and interior programs.",
    scope: "Architect, interior designer, planner, landscape designer, drafter, visualization specialist, or design consultant.",
    nextSteps: "Build a portfolio, learn drawing and design software, and verify council/college recognition where required."
  },
  {
    keywords: ["b.com", "b.b.a.", "m.b.a", "manager", "businessman", "management"],
    overview:
      "Commerce and management courses develop business, accounting, marketing, finance, operations, communication, and leadership skills.",
    eligibility: "12th Commerce is common, though many BBA/management programs accept students from any stream.",
    selection: "Merit-based admission, university entrance, CET, or management entrance tests depending on level and institution.",
    scope: "Business executive, manager, entrepreneur, finance assistant, marketing executive, HR executive, operations coordinator, or MBA professional.",
    nextSteps: "Build Excel, communication, accounts, and presentation skills, then choose a specialization such as finance, marketing, HR, or operations."
  },
  {
    keywords: ["b.c.a.", "m.c.a.", "computer", "software", "tally", "ms-cit", "data entry", "b.c.s", "it"],
    overview:
      "Computer and IT courses build digital skills in programming, databases, office tools, accounting software, data entry, web development, and software systems.",
    eligibility: "Eligibility varies from 10th for basic computer courses to 12th or graduation for BCA/MCA and advanced programs.",
    selection: "Usually merit-based or entrance-based depending on the college; short courses may have direct admission.",
    scope: "Software developer, data entry operator, IT support executive, web developer, database assistant, accountant using Tally, or computer operator.",
    nextSteps: "Practice typing, spreadsheets, programming basics, and project work; keep a portfolio of practical assignments."
  },
  {
    keywords: ["l.l.b", "llb", "l.l.m", "law", "d.t.l", "d.d.i"],
    overview:
      "Law courses prepare students for legal practice, judiciary support, corporate compliance, taxation law, documentation, and public service.",
    eligibility: "12th for 5-year integrated law courses; graduation for 3-year LLB; LLB for LLM.",
    selection: "CLAT, MH CET Law, LSAT India, university entrance, or merit-based admission depending on the institution.",
    scope: "Lawyer, legal associate, corporate counsel, compliance officer, tax law assistant, legal researcher, or judicial services aspirant.",
    nextSteps: "Improve reading, writing, reasoning, and current affairs, then select between litigation, corporate, tax, or public law tracks."
  },
  {
    keywords: ["d.ed", "b.ed", "m.ed", "teacher", "b.p.ed", "m.p.ed"],
    overview:
      "Teacher education courses prepare students for classroom teaching, pedagogy, child development, lesson planning, assessment, and education administration.",
    eligibility: "D.Ed often follows 12th; B.Ed usually follows graduation; M.Ed follows B.Ed. Physical education programs have fitness criteria.",
    selection: "State CET, university entrance, merit, and document verification depending on the course.",
    scope: "School teacher, PT teacher, education coordinator, tutor, academic counsellor, curriculum assistant, or higher education professional.",
    nextSteps: "Check teacher eligibility requirements, prepare for CET/TET where applicable, and build subject knowledge plus classroom skills."
  },
  {
    keywords: ["b.a.", "m.a.", "b.s.w", "m.s.w", "mass communication", "journalism", "mass media", "foreign languages", "drama"],
    overview:
      "Arts, social work, communication, language, and humanities programs develop analysis, writing, public communication, social understanding, and creative expression.",
    eligibility: "Usually 12th pass for bachelor courses; relevant graduation is required for master-level study.",
    selection: "Merit, CUET/university entrance, portfolio, audition, or interview depending on the course.",
    scope: "Journalist, social worker, content writer, communication executive, language specialist, civil service aspirant, researcher, or creative professional.",
    nextSteps: "Build writing samples, reading habits, communication skills, internships, and a portfolio for media or creative courses."
  },
  {
    keywords: ["hotel", "air hostess", "flight steward", "travel", "tourism"],
    overview:
      "Hospitality, travel, tourism, and aviation service courses prepare students for guest handling, operations, customer service, food and beverage, front office, and travel coordination.",
    eligibility: "Usually 12th pass; aviation service roles may have communication, grooming, fitness, and age criteria.",
    selection: "Institute entrance, interviews, merit, or skill assessment depending on the program.",
    scope: "Hotel manager, front office executive, travel consultant, airline cabin crew, flight steward, event coordinator, or hospitality entrepreneur.",
    nextSteps: "Improve English communication, grooming, customer-service skills, and compare institutes by internships and placement partners."
  },
  {
    keywords: ["film", "television", "ftii", "editing", "cinematography", "acting"],
    overview:
      "Film, television, acting, editing, and cinematography courses train students in visual storytelling, production, direction, camera, post-production, and performance.",
    eligibility: "Eligibility varies by diploma or degree; many institutes require 12th or graduation plus portfolio/audition.",
    selection: "Entrance test, portfolio review, interview, audition, or institute-level creative assessment.",
    scope: "Film editor, cinematographer, actor, assistant director, production assistant, content creator, or media studio professional.",
    nextSteps: "Create sample work, learn editing/camera basics, watch cinema analytically, and prepare a portfolio or audition piece."
  },
  {
    keywords: ["nda", "cds", "afcat", "army", "navy", "airforce", "defence", "soldier", "navik", "airmen", "sub inspector", "police"],
    overview:
      "Defence and police routes prepare candidates for disciplined service in the Army, Navy, Air Force, police, paramilitary, and security forces.",
    eligibility: "Eligibility depends on exam and post, including age, education, nationality, medical standards, and physical fitness.",
    selection: "Written exam, physical test, medical test, SSB/interview, document verification, and merit list depending on the role.",
    scope: "Officer, soldier, airman, sailor, police constable, sub inspector, paramilitary personnel, or defence technical entry candidate.",
    nextSteps: "Track official notifications, train for fitness daily, prepare reasoning/GK/maths/English, and verify medical standards early."
  },
  {
    keywords: ["mpsc", "upsc", "ias", "ips", "ies", "government", "clerical", "clerk", "r.t.o", "bank", "insurance", "l.i.c"],
    overview:
      "Government, banking, insurance, and public-service exams lead to stable administrative, clerical, officer, technical, and field roles.",
    eligibility: "Eligibility varies by post; many clerical routes need 10th/12th, while officer exams often require graduation.",
    selection: "Written exam, mains/interview where applicable, skill test, physical test for some posts, and document verification.",
    scope: "Government clerk, officer, bank employee, insurance officer, RTO inspector, civil servant, or public-sector professional.",
    nextSteps: "Read official notifications, prepare aptitude/GK/English, practice previous papers, and maintain required documents."
  },
  {
    keywords: ["pilot", "aviation", "nautical"],
    overview:
      "Pilot and aviation courses train students for flying, aviation operations, navigation, safety procedures, and related technical aviation careers.",
    eligibility: "Usually 12th Science with required subjects for pilot routes; medical fitness and DGCA requirements apply for licences.",
    selection: "Flying school admission, medical fitness, DGCA exams, flight training hours, and licence completion.",
    scope: "Student pilot, commercial pilot trainee, airline pilot pathway, aviation operations assistant, or nautical science professional.",
    nextSteps: "Check DGCA medical fitness, compare flying schools, budget training costs, and plan licence stages carefully."
  },
  {
    keywords: ["merchant navy", "marine"],
    overview:
      "Merchant Navy and marine engineering routes prepare students for technical, navigation, and operational work on commercial ships.",
    eligibility: "Usually 10th/12th Science depending on entry route, with strict medical and eyesight standards.",
    selection: "IMU-CET or institute process, medical fitness, sponsorship/training requirements, and document verification.",
    scope: "Deck cadet, marine engineer, ship officer pathway, shipping operations professional, or maritime technical worker.",
    nextSteps: "Verify approved institutes, medical standards, sponsorship details, and sea-time requirements before admission."
  },
  {
    keywords: ["iti", "fitter", "welder", "machinist", "diesel mechanic"],
    overview:
      "ITI trade courses build hands-on technical skills for industrial, workshop, maintenance, manufacturing, and repair jobs.",
    eligibility: "Usually 10th pass, with trade-specific requirements.",
    selection: "ITI admission through state process, merit, or institute-level rules.",
    scope: "Technician, fitter, welder, machinist, mechanic, workshop assistant, industrial trainee, or self-employed trade professional.",
    nextSteps: "Choose a trade with strong local demand, complete practical training, and pursue apprenticeship opportunities."
  },
  {
    keywords: ["design", "fine art", "commercial art", "garment", "beauty", "hair"],
    overview:
      "Design, fine art, fashion, beauty, and commercial art courses develop creative, visual, styling, presentation, and client-service skills.",
    eligibility: "Usually 10th or 12th depending on diploma/degree level; portfolio may be required for design and art programs.",
    selection: "Merit, portfolio, aptitude test, studio test, or institute entrance depending on the course.",
    scope: "Designer, artist, stylist, beautician, fashion assistant, visualizer, illustrator, salon professional, or creative entrepreneur.",
    nextSteps: "Build a portfolio, practice drawing/design tools, and compare institutes by practical training and placement exposure."
  },
  {
    keywords: ["agriculture", "dairy", "animal husbandry", "veterinary", "b.v.sc"],
    overview:
      "Agriculture, dairy, animal husbandry, and veterinary routes focus on farming systems, animal health, food production, agribusiness, and rural development.",
    eligibility: "Usually 12th Science, often PCB/PCMB, depending on the program.",
    selection: "State agriculture CET, NEET for veterinary in many cases, ICAR/university process, or merit-based admission.",
    scope: "Agriculture officer, dairy technologist, veterinary doctor, animal husbandry officer, agribusiness professional, or researcher.",
    nextSteps: "Check state admission rules, field-work components, internship requirements, and government job pathways."
  },
  {
    keywords: ["b.sc", "m.sc", "biotechnology", "microbiology", "botany", "zoology", "chemistry", "physics", "maths", "forensic", "home science"],
    overview:
      "Science degree routes build subject expertise for research, laboratory work, teaching, analytics, health sciences, forensics, and higher study.",
    eligibility: "12th Science with relevant subject combination; graduation is required for M.Sc. and research routes.",
    selection: "Merit, CUET, university entrance, or state admission process depending on the college.",
    scope: "Lab assistant, researcher, teacher, analyst, forensic assistant, biotech professional, nutrition assistant, or postgraduate scholar.",
    nextSteps: "Choose subjects based on long-term goals, gain lab experience, and plan for M.Sc., competitive exams, or industry internships."
  }
];

const extractDuration = (title) => {
  const match = title.match(/\(([^)]*(?:yr|yrs|year|years|month|months)[^)]*)\)/i);
  return match ? match[1].trim() : "Varies by institution and course level";
};

const getProfile = (title) => {
  const normalized = title.toLowerCase();
  return COURSE_PROFILES.find((profile) =>
    profile.keywords.some((keyword) => normalized.includes(keyword))
  );
};

const getSubItemMeta = (subItem, parentTitle) => {
  const makeMeta = (title, description = "", imageUrl = "") => {
    const profile = getProfile(title);

    return {
      title,
      description:
        description ||
        profile?.overview ||
        `${title} is one of the career or course options listed under ${parentTitle} in the Vidyarthi Mitra career chart. Use this path to compare eligibility, duration, entrance exams, and the next study or job step for this option.`,
      duration: extractDuration(title),
      eligibility:
        profile?.eligibility ||
        `Start by checking the exact eligibility for ${title}. It generally depends on whether the route begins after 10th, 12th, diploma, or graduation.`,
      selection:
        profile?.selection ||
        "Admission or selection may be merit-based, entrance-based, interview-based, or through an official recruitment exam depending on the institution or authority.",
      scope:
        profile?.scope ||
        `${title} can lead to higher studies, skill-based roles, government exams, private-sector jobs, or self-employment depending on the course level.`,
      nextSteps:
        profile?.nextSteps ||
        "Confirm the latest eligibility, duration, fees, recognized institutes, entrance dates, and placement or job pathway before applying.",
      imageUrl
    };
  };

  if (typeof subItem === "string") {
    return makeMeta(subItem);
  }

  if (subItem && typeof subItem === "object") {
    const title = subItem.title || subItem.label || "Sub Course";
    return {
      ...makeMeta(title, subItem.description, subItem.imageUrl || ""),
      duration: subItem.duration || makeMeta(title).duration,
      eligibility: subItem.eligibility || makeMeta(title).eligibility,
      selection: subItem.selection || makeMeta(title).selection,
      scope: subItem.scope || makeMeta(title).scope,
      nextSteps: subItem.nextSteps || makeMeta(title).nextSteps
    };
  }

  return makeMeta("Sub Course", `This is a sub course under ${parentTitle}.`);
};

export default function SubDetail() {
  const { id, subIndex } = useParams();
  const data = getChartData();

  const point = data.find((item) => item.id === id);
  const parsedIndex = Number(subIndex);
  const subItem =
    point && Number.isInteger(parsedIndex) && parsedIndex >= 0
      ? point.subItems?.[parsedIndex]
      : undefined;

  if (!point || subItem === undefined) {
    return <div className="not-found">Point Not Found</div>;
  }

  const meta = getSubItemMeta(subItem, point.title);

  return (
    <div className="detail-shell">
      <article className="detail-card">
        <header className="detail-hero">
          <Link className="back-link" to={`/chart/${point.id}`}>
            Back to {point.title}
          </Link>
          <span className="detail-pill">Sub Course</span>
          <h1 className="detail-title">{meta.title}</h1>
          <p className="detail-subtitle">Parent Path: {point.title}</p>
          <div className="detail-metrics">
            <div>
              <strong>{meta.duration === "Varies by institution and course level" ? "Varies" : meta.duration}</strong>
              <span>Duration</span>
            </div>
            <div>
              <strong>{String(parsedIndex + 1).padStart(2, "0")}</strong>
              <span>Chart order</span>
            </div>
            <div>
              <strong>{point.subItems?.length || 0}</strong>
              <span>Parent options</span>
            </div>
          </div>
        </header>
        <section className="detail-body">
          <div className="sub-overview">
            <h2 className="detail-section-title">Overview</h2>
            <p className="detail-text">{meta.description}</p>
          </div>
          <div className="sub-detail-grid">
            <div className="sub-detail-box">
              <h3>Duration</h3>
              <p>{meta.duration}</p>
            </div>
            <div className="sub-detail-box">
              <h3>Eligibility</h3>
              <p>{meta.eligibility}</p>
            </div>
            <div className="sub-detail-box">
              <h3>Entrance / Selection</h3>
              <p>{meta.selection}</p>
            </div>
            <div className="sub-detail-box">
              <h3>Career Scope</h3>
              <p>{meta.scope}</p>
            </div>
            <div className="sub-detail-box sub-detail-box--wide">
              <h3>Recommended Next Step</h3>
              <p>{meta.nextSteps}</p>
            </div>
          </div>
          {meta.imageUrl ? (
            <img className="detail-image" src={meta.imageUrl} alt={meta.title} />
          ) : null}
        </section>
      </article>
    </div>
  );
}
