export const REVIEW_CATEGORIES = [
  {
    id: "heart-anatomy",
    title: "Heart Anatomy",
    description: "Review chambers, valves, vessels, and basic cardiac structure.",
    icon: "/assets/icon-rhythms.svg",
  },
  {
    id: "medication",
    title: "Medication",
    description: "Quick review of common emergency cardiac medications.",
    icon: "/assets/icon-case-studies.svg",
  },
  {
    id: "heart-conditions",
    title: "Heart Conditions",
    description: "Test recognition of important cardiac-related conditions.",
    icon: "/assets/icon-reviews.svg",
  },
];

export const REVIEW_QUESTIONS = {
  "heart-anatomy": [
    {
      question: "Which chamber of the heart pumps oxygenated blood to the body?",
      choices: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
      correctAnswer: "Left ventricle",
    },
    {
      question: "Which valve sits between the left atrium and left ventricle?",
      choices: ["Tricuspid valve", "Pulmonary valve", "Mitral valve", "Aortic valve"],
      correctAnswer: "Mitral valve",
    },
    {
      question: "Which blood vessels carry blood away from the heart?",
      choices: ["Veins", "Arteries", "Capillaries", "Venules"],
      correctAnswer: "Arteries",
    },
    {
      question: "The right side of the heart primarily sends blood to the:",
      choices: ["Brain", "Lungs", "Liver", "Body tissues"],
      correctAnswer: "Lungs",
    },
    {
      question: "Which structure separates the right and left sides of the heart?",
      choices: ["Septum", "Pericardium", "Myocardium", "Atria"],
      correctAnswer: "Septum",
    },
    {
      question: "Which vessel carries oxygenated blood from the lungs to the heart?",
      choices: ["Pulmonary artery", "Superior vena cava", "Pulmonary vein", "Aorta"],
      correctAnswer: "Pulmonary vein",
    },
    {
      question: "What is the name of the outer sac surrounding the heart?",
      choices: ["Endocardium", "Pericardium", "Myocardium", "Pleura"],
      correctAnswer: "Pericardium",
    },
    {
      question: "The tricuspid valve is located between the:",
      choices: [
        "Left atrium and left ventricle",
        "Right atrium and right ventricle",
        "Left ventricle and aorta",
        "Right ventricle and pulmonary artery",
      ],
      correctAnswer: "Right atrium and right ventricle",
    },
    {
      question: "Which chamber receives deoxygenated blood from the body first?",
      choices: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
      correctAnswer: "Right atrium",
    },
    {
      question: "The aorta carries blood from the:",
      choices: [
        "Right ventricle to lungs",
        "Left ventricle to body",
        "Right atrium to lungs",
        "Left atrium to body",
      ],
      correctAnswer: "Left ventricle to body",
    },
  ],

  medication: [
    {
      question: "Which medication is commonly used in cardiac arrest according to ACLS protocols?",
      choices: ["Ibuprofen", "Epinephrine", "Metformin", "Amoxicillin"],
      correctAnswer: "Epinephrine",
    },
    {
      question: "Nitroglycerin is commonly used to help relieve:",
      choices: ["Chest pain", "Fever", "Infection", "Seizures"],
      correctAnswer: "Chest pain",
    },
    {
      question: "Aspirin is often given in suspected cardiac chest pain because it helps:",
      choices: ["Lower blood sugar", "Reduce clotting", "Increase pulse rate", "Reduce fever only"],
      correctAnswer: "Reduce clotting",
    },
    {
      question: "Amiodarone may be used for certain serious:",
      choices: ["Skin conditions", "Arrhythmias", "Broken bones", "Asthma attacks"],
      correctAnswer: "Arrhythmias",
    },
    {
      question: "Atropine is commonly associated with treatment of:",
      choices: ["Bradycardia", "Hypertension", "Hyperglycemia", "Stroke"],
      correctAnswer: "Bradycardia",
    },
    {
      question: "A medication that helps open blocked coronary arteries in some emergencies is called a:",
      choices: ["Bronchodilator", "Thrombolytic", "Sedative", "Diuretic"],
      correctAnswer: "Thrombolytic",
    },
    {
      question: "Before giving nitroglycerin, a major concern is the patient’s:",
      choices: ["Blood pressure", "Hair color", "Height", "Blood type"],
      correctAnswer: "Blood pressure",
    },
    {
      question: "Epinephrine primarily supports cardiac arrest care by causing:",
      choices: ["Vasoconstriction", "Bone growth", "Lower temperature", "Sedation"],
      correctAnswer: "Vasoconstriction",
    },
    {
      question: "Which medication is an antiarrhythmic?",
      choices: ["Amiodarone", "Acetaminophen", "Insulin", "Diphenhydramine"],
      correctAnswer: "Amiodarone",
    },
    {
      question: "Aspirin is typically avoided if the patient has a serious:",
      choices: ["Paper cut", "Allergy to aspirin", "Cold hand", "Mild headache"],
      correctAnswer: "Allergy to aspirin",
    },
  ],

  "heart-conditions": [
    {
      question: "Myocardial infarction is another term for:",
      choices: ["Heart attack", "Stroke", "Asthma", "Pneumonia"],
      correctAnswer: "Heart attack",
    },
    {
      question: "Bradycardia means the heart rate is:",
      choices: ["Too fast", "Too slow", "Irregular only", "Normal"],
      correctAnswer: "Too slow",
    },
    {
      question: "Tachycardia means the heart rate is:",
      choices: ["Too slow", "Too fast", "Absent", "Weak only"],
      correctAnswer: "Too fast",
    },
    {
      question: "Congestive heart failure often causes fluid buildup and:",
      choices: ["Shortness of breath", "Hearing loss", "Rash", "Broken bones"],
      correctAnswer: "Shortness of breath",
    },
    {
      question: "Atrial fibrillation is a type of:",
      choices: ["Fracture", "Arrhythmia", "Infection", "Valve replacement"],
      correctAnswer: "Arrhythmia",
    },
    {
      question: "Cardiac arrest means the heart has:",
      choices: ["Stopped effective pumping", "A mild murmur", "Low cholesterol", "A blocked airway"],
      correctAnswer: "Stopped effective pumping",
    },
    {
      question: "Angina is best described as:",
      choices: [
        "A skin infection",
        "Chest discomfort from reduced blood flow",
        "A broken rib",
        "A seizure disorder",
      ],
      correctAnswer: "Chest discomfort from reduced blood flow",
    },
    {
      question: "Hypertension means:",
      choices: ["Low blood sugar", "High blood pressure", "Low heart rate", "High temperature"],
      correctAnswer: "High blood pressure",
    },
    {
      question: "A patient with poor blood flow to heart muscle may develop:",
      choices: ["Ischemia", "Appendicitis", "Migraine only", "Kidney stones"],
      correctAnswer: "Ischemia",
    },
    {
      question: "Ventricular fibrillation is considered a:",
      choices: ["Life-threatening rhythm", "Normal rhythm", "Sleep disorder", "Minor muscle strain"],
      correctAnswer: "Life-threatening rhythm",
    },
  ],
};