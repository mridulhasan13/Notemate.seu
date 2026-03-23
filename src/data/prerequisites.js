export const courseCodes = {
    'Computer Fundamentals': 'CSE 101',
    'Programming Language I': 'CSE 141',
    'Discrete Mathematics': 'CSE 161',
    'Differential & Integral Calculus': 'MAT 101',
    'Coordinate Geometry and Vector Analysis': 'MAT 141',
    'Data Structures': 'CSE 181',
    'Algorithm': 'CSE 241',
    'Digital Logic Design': 'CSE 261',
    'Computer Architecture': 'CSE 263',
    'Theory of Computing': 'CSE 265',
    'Database Design': 'CSE 281',
    'Operating Systems': 'CSE 343',
    'Advanced Algorithm': 'CSE 411',
    'Information System Design & Software Engineering': 'CSE 281',
    'Electronic Devices & Circuits I': 'EEE 181',
    'Electrical Circuits Design I': 'EEE 241',
    'Statistical Methods & Probability': 'STA 201',
    'Physics - I': 'PHY 101',
    'Physics II': 'PHY 161',
    'Basic Composition': 'ENG 101',
    'Intermediate Composition': 'ENG 102',
    'Advanced English Skills': 'ENG 103',
    'Public Speaking': 'ENG 201'
};

export const reverseMapping = Object.fromEntries(
    Object.entries(courseCodes).map(([name, code]) => [code, name])
);

export const prerequisitesData = {
    'Computer Fundamentals': [],
    'Basic Composition': [],
    'Programming Language I': ['CSE 101'],
    'Discrete Mathematics': ['CSE 141'],
    'Data Structures': ['CSE 161'],
    'Algorithm': ['CSE 181'],
    'Digital Logic Design': ['CSE 141'],
    'Computer Architecture': ['CSE 161', 'CSE 261'],
    'Database Design': ['CSE 181'],
    'Operating Systems': ['CSE 181', 'CSE 263'],
    'Theory of Computing': ['CSE 161'],
    'Project OR Internship': ['CSE 459'],
    'Intermediate Composition': ['ENG 101'],
    'Advanced English Skills': ['ENG 102'],
    'Physics II': ['PHY 101'],
    'Differential & Integral Calculus': [],
    'Coordinate Geometry and Vector Analysis': ['MAT 101']
};
