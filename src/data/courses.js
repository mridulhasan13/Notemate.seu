export const courseData = {
    CSE: {
        note: [
            'CSE375 Advanced Algorithm',
            'CSE351 Advanced Java',
            'CSE347 Advanced Networking',
            'CSE161 Programming Language I',
            'CSE265 Algorithm',
            'CSE365 Artificial Intelligence',
            'ENG101 Basic Composition',
            'CSE341 Computer Networking',
            'CSE343 Computer Architecture',
            'CSE141 Computer Fundamentals',
            'CSE443 Computer Graphics & Animation',
            'CSE477 Cloud Computing',
            'CSE469 Compiler Construction',
            'MAT161 Coordinate Geometry and Vector Analysis',
            'CSE479 Cryptography & Network Security',
            'MAT241 Complex Variables and Transforms (Laplace & Fourier)',
            'CSE383 Database Design',
            'CSE241 Data Structures',
            'MAT141 Differential & Integral Calculus',
            'CSE261 Digital Logic Design',
            'CSE181 Discrete Mathematics',
            'CSE467 E-Commerce & E-Governance',
            'EEE181 Electrical Circuits Design I',
            'EEE241 Electronic Devices & Circuits I',
            'SOC341 Engineering Ethics',
            'CSE359 Graph Theory',
            'CSE355 Image Processing',
            'CSE467 E-Commerce & E-Governance',
            'ENG105 Public Speaking',
            'CSE361 Operating Systems',
            'CSE441 Theory of Computing',
            'CSE345 Information System Design & Software Engineering',
            'CSE489 Project OR Internship',
            'CSE465 Parallel and Distributed Computing',
            'PHY161 Physics - I',
            'PHY181 Physics II',
            'MAT261 Linear Algebra and Matrices',
            'MGT281 Introduction to Business & Management',
            'STA281 Statistical Methods & Probability',
            'CSE445 Smart Device App Development',
            'CSE473 Software Development and Project Management',
            'ETE281 Communication Theory',
            'ETE357 Telecommunication Engineering',
            'ETE399 Digital Communication',
            'ETE451 Digital Signal Processing',
            'ACT141 Introduction to Accounting',
            'ECO461 Introduction to Economics'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [
            'CSE376 Advanced Algorithm Lab',
            'CSE352 Advanced Java Lab',
            'CSE348 Advanced Networking Lab',
            'CSE162 Programming Language I Lab',
            'CSE242 Data Structures Lab',
            'CSE264 Digital Logic Design Lab',
            'CSE266 Algorithm Lab',
            'CSE282 Introduction to Programming Language II (Java) Lab',
            'CSE342 Computer Networking Lab',
            'CSE346 Information System Design & Software Engineering Lab',
            'CSE362 Operating Systems Lab',
            'CSE364 Microprocessor Design & Assembly Language Programming Lab',
            'CSE382 Introduction to Embedded Systems Lab',
            'CSE384 Database Design Lab',
            'CSE444 Computer Graphics & Animation Lab',
            'CSE458 Advanced Embedded Systems Lab',
            'CSE466 Parallel and Distributed Computing Lab',
            'CSE472 Web and Internet Programming Lab',
            'CSE474 Software Development and Project Management Lab',
            'EEE182 Electrical Circuits Design I Lab',
            'EEE242 Electronic Devices & Circuits I Lab',
            'EEE456 VLSI Design Lab',
            'ETE282 Communication Lab',
            'ETE358 Telecommunication Engineering Lab',
            'ETE452 Digital Signal Processing Lab',
            'PHY182 Physics II Lab'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    EEE: {
        note: [
            'EEE101 Basic Electrical Engineering',
            'EEE309 Control Engineering',
            'EEE209 Digital Electronics',
            'EEE301 Electromagnetic Fields',
            'EEE205 Electrical Machines I',
            'EEE101 Basic Electrical Engineering',
            'EEE401 Microprocessors and Interfacing',
            'EEE305 Power System Analysis',
            'EEE201 Signals and Systems',
            'MAT103 Engineering Mathematics I',
            'PHY101 Engineering Physics'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [
            'EEE102 Basic Electrical Lab',
            'EEE202 Digital Electronics Lab',
            'EEE206 Electrical Machines Lab',
            'EEE402 Microprocessor Lab'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    TE: {
        note: [
            'TE401 Apparel Manufacturing Technology',
            'CHEM101 Engineering Chemistry',
            'TE205 Fabric Manufacturing Technology I',
            'TE405 Industrial Management in Textiles',
            'MAT105 Engineering Mathematics II',
            'TE201 Textile Raw Materials I',
            'TE309 Textile Testing & Quality Control',
            'TE305 Wet Processing Technology I',
            'TE301 Yarn Manufacturing Technology II'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [
            'TE202 Fabric Lab I',
            'TE102 Textile Lab I',
            'TE306 Wet Processing Lab I',
            'TE302 Yarn Lab II'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    Arch: {
        note: [
            'ARC201 Architectural History I',
            'ARC305 Building Services I',
            'ARC205 Climate and Design',
            'MAT107 Geometry for Architects',
            'ARC405 Interior Design Foundation',
            'ARC303 Landscape Architecture',
            'ARC301 Structures in Architecture I',
            'ARC401 Urban Design Principles',
            'ARC203 Visual Communication',
            'ARC101 Introduction to Architecture'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [
            'ARC102 Design Studio I',
            'ARC202 Design Studio III',
            'ARC302 Design Studio V',
            'ARC402 Design Studio VII'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    Economics: {
        note: [
            'ECO401 Econometrics',
            'ECO405 Environmental Economics',
            'ECO203 History of Economic Thought',
            'ECO301 International Trade',
            'ECO102 Macroeconomics I',
            'ECO101 Microeconomics I',
            'ECO201 Mathematical Economics',
            'ECO303 Monetary Economics',
            'ECO305 Development Economics',
            'ECO205 Statistics for Economics'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [], assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    English: {
        note: [
            'ENG415 American Literature',
            'ENG211 English Drama',
            'ENG112 English Language Skills I',
            'ENG215 History of English Language',
            'ENG111 Introduction to English Literature',
            'ENG315 Literary Theory and Criticism',
            'ENG313 Phonetics and Phonology',
            'ENG411 Post-colonial Literature',
            'ENG213 Romantic Poetry',
            'ENG311 Victorian Poetry and Fiction'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [], assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    Bangla: {
        note: [
            'BNG305 Bangla Drama I',
            'BNG301 Bangla Fiction I',
            'BNG101 Bangla Language and Culture',
            'BNG303 Bangla Non-fictional Prose',
            'BNG201 Bangla Poetry: Ancient and Medieval',
            'BNG405 Folk Literature of Bangladesh',
            'BNG102 History of Bangla Literature I',
            'BNG401 Linguistics and Stylistics',
            'BNG203 Modern Bangla Poetry',
            'BNG205 Rhetoric and Prosody'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [], assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    BBA: {
        note: [
            'BUS303 Business Communication',
            'FIN301 Corporate Finance',
            'ACT101 Financial Accounting',
            'HRM301 Human Resource Management',
            'BUS101 Introduction to Business',
            'ECO201 Managerial Economics',
            'MIS301 Management Information Systems',
            'MGT201 Principles of Management',
            'MKT201 Principles of Marketing',
            'SCM401 Supply Chain Management'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [], assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    Law: {
        note: [
            'LAW102 Constitutional Law I',
            'LAW301 Criminal Law',
            'LAW303 Family Law',
            'LAW401 International Law',
            'LAW101 Introduction to Legal System',
            'LAW405 Jurisprudence',
            'LAW201 Law of Contract',
            'LAW203 Law of Tort',
            'LAW205 Muslim Law',
            'LAW305 Land Laws of Bangladesh'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [], assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    Pharmacy: {
        note: [
            'BIO101 Biology for Pharmacy',
            'PHR103 Human Anatomy and Physiology I',
            'PHR101 Inorganic Pharmaceutical Chemistry',
            'PHR201 Organic Pharmaceutical Chemistry',
            'PHR301 Pharmacology I',
            'PHR305 Pharmacognosy I',
            'PHR405 Pharmaceutical Microbiology',
            'PHR203 Pharmaceutical Analysis',
            'PHR401 Pharmaceutics III (Advanced)',
            'PHR205 Physical Pharmacy I'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [
            'PHR102 Chemistry Lab I',
            'PHR406 Microbiology Lab',
            'PHR302 Pharmacology Lab I',
            'PHR104 Physiology Lab I'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        assignment: [], presentation: [], 'question-bank': [], syllabus: []
    },
    ICT: {
        note: [
            'ICT405 Cloud Computing and IoT',
            'ICT205 Database Management Systems',
            'ICT301 Data Communication',
            'MATH101 Discrete Mathematics for ICT',
            'ICT101 Introduction to ICT',
            'ICT303 Mobile Application Development',
            'ICT401 Network Security',
            'ICT305 Software Engineering',
            'ICT201 Structured Programming',
            'ICT203 Web Technologies'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        'lab-report': [
            'ICT206 Database Lab I',
            'ICT302 Networking Lab',
            'ICT102 Programming Lab I',
            'ICT406 Security Lab'
        ].sort((a, b) => a.split(' ').slice(1).join(' ').localeCompare(b.split(' ').slice(1).join(' '))),
        assignment: [], presentation: [], 'question-bank': [], syllabus: []
    }
};

export const resourceTypes = [
    { id: 'note', name: 'Note' },
    { id: 'lab-report', name: 'Lab Report' },
    { id: 'assignment', name: 'Assignment' },
    { id: 'presentation', name: 'Presentation' },
    { id: 'question-bank', name: 'Question Bank' },
    { id: 'syllabus', name: 'Syllabus' }
];
